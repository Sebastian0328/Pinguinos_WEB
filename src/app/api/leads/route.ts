import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function normalizePhoneCO(input: string) {
  const digits = String(input ?? "").replace(/\D/g, "");
  return digits.startsWith("57") ? digits.slice(2) : digits; 
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. CAPTURAR Y NORMALIZAR DATOS
    const nombre = String(body.nombre ?? "").trim();
    const apellido = String(body.apellido ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase(); 
    const identificacion = String(body.identificacion ?? "").trim();
    const telefono = normalizePhoneCO(body.telefono);
    const fecha_nacimiento = String(body.fecha_nacimiento ?? "").trim();
    const sede_id = body.sede_id; 
    const objetivo = String(body.objetivo ?? "").trim();

    // Validación de teléfono
    const telefonoRegex = /^3\d{9}$/;
    if (!telefonoRegex.test(telefono)) {
      return NextResponse.json(
        { error: "Número de teléfono inválido (10 dígitos empezando por 3)." },
        { status: 400 }
      );
    }

    // 2. INSERTAR EN SUPABASE
    const { error: dbError } = await supabase.from("leads").insert([
      {
        nombre,
        apellido,
        email, 
        identificacion: identificacion || null,
        telefono,
        fecha_nacimiento,
        sede_id: Number(sede_id),
        objetivo,
        estado: "nuevo",
      },
    ]);

    if (dbError) {
      if ((dbError as any).code === "23505") {
        return NextResponse.json({ error: "Este número ya está registrado." }, { status: 409 });
      }
      return NextResponse.json({ error: dbError.message }, { status: 400 });
    }

    // --- PREPARACIÓN DE URL PARA LLAMADAS INTERNAS ---
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const host = req.headers.get("host"); 
    const baseUrl = `${protocol}://${host}`;

   // Creamos la promesa del correo
   const emailPromise = fetch(`${baseUrl}/api/send_email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      email: email, 
      name: nombre 
    }),
  })
  .then(async (r) => {
    if (!r.ok) {
      const text = await r.text();
      console.error("Error en la respuesta de email:", text);
    }
    return r.json().catch(() => ({}));
  })
  .catch(err => console.error("Error de conexión con send_email:", err));

    // ✅ 4. ENVIAR A GOOGLE SHEETS
    const sheetsUrl = process.env.SHEETS_WEBHOOK_URL;
    const sheetsToken = process.env.SHEETS_WEBHOOK_TOKEN;

    if (sheetsUrl && sheetsToken) {
      let sedeNombre: string | null = null;

      // Obtener nombre de sede para el Sheet
      const sedeRes = await supabase
        .from("sedes")
        .select("nombre")
        .eq("id", Number(sede_id))
        .maybeSingle();

      if (!sedeRes.error && sedeRes.data?.nombre) {
        sedeNombre = sedeRes.data.nombre;
      }

      const sheetsPromise = fetch(sheetsUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: sheetsToken,
          created_at: new Date().toISOString(),
          nombre,
          apellido,
          email, 
          identificacion,
          telefono,
          fecha_nacimiento,
          sede: sedeNombre ?? String(sede_id),
          objetivo,
          estado: "nuevo",
        }),
      }).catch(err => console.error("Error en Sheets:", err));

      // Esperamos ambas para que Vercel no mate el proceso antes de tiempo
      await Promise.all([emailPromise, sheetsPromise]);
    }

    return NextResponse.json({ success: true });

  } catch (err: any) {
    console.error("Server Error:", err);
    return NextResponse.json(
      { error: err?.message ?? "Server error" },
      { status: 500 }
    );
  }
}