import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function normalizePhoneCO(input: string) {
  const digits = String(input ?? "").replace(/\D/g, "");
  return digits.startsWith("57") ? digits.slice(2) : digits; // deja 3XXXXXXXXX
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const nombre = String(body.nombre ?? "").trim();
    const apellido = String(body.apellido ?? "").trim();
    const identificacion = String(body.identificacion ?? "").trim();
    const telefono = normalizePhoneCO(body.telefono);
    const fecha_nacimiento = String(body.fecha_nacimiento ?? "").trim();
    const sede_id = body.sede_id; // puede venir string desde el <select>
    const objetivo = String(body.objetivo ?? "").trim();

    // Validación backend (Colombia móvil: 10 dígitos, empieza por 3)
    const telefonoRegex = /^3\d{9}$/;
    if (!telefonoRegex.test(telefono)) {
      return NextResponse.json(
        { error: "Número de teléfono inválido. Usa un celular de Colombia (10 dígitos que empiece por 3)." },
        { status: 400 }
      );
    }

    // Insert Supabase
    const { error } = await supabase.from("leads").insert([
      {
        nombre,
        apellido,
        identificacion: identificacion || null,
        telefono,
        fecha_nacimiento,
        sede_id: Number(sede_id),
        objetivo,
        estado: "nuevo",
      },
    ]);

    if (error) {
      // Duplicado (constraint unique)
      if ((error as any).code === "23505") {
        return NextResponse.json(
          { error: "Este número ya está registrado." },
          { status: 409 }
        );
      }

      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // ✅ Enviar a Google Sheets (NO bloquea si falla)
    const sheetsUrl = process.env.SHEETS_WEBHOOK_URL;
    const sheetsToken = process.env.SHEETS_WEBHOOK_TOKEN;

    if (sheetsUrl && sheetsToken) {
      // lookup para mandar nombre de sede (opcional)
      let sedeNombre: string | null = null;

      const sedeRes = await supabase
        .from("sedes")
        .select("nombre")
        .eq("id", Number(sede_id))
        .maybeSingle();

      if (!sedeRes.error && sedeRes.data?.nombre) {
        sedeNombre = sedeRes.data.nombre;
      }

      fetch(sheetsUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: sheetsToken,
          created_at: new Date().toISOString(),
          nombre,
          apellido,
          identificacion,
          telefono,
          fecha_nacimiento,
          sede: sedeNombre ?? String(sede_id),
          objetivo,
          estado: "nuevo",
        }),
      }).catch(() => {});
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Server error" },
      { status: 500 }
    );
  }
}