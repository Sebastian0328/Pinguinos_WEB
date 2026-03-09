"use client";

import { useEffect, useMemo, useState } from "react";

type Sede = {
  id: string;   // viene de /api/sedes
  nombre: string;
};

const objetivos = [
  "Aprender desde cero",
  "Perder el miedo",
  "Mejorar técnica",
  "Entrenamiento competitivo",
  "Salud / acondicionamiento",
] as const;

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="flex items-end justify-between gap-3">
        <span className="text-sm font-semibold text-slate-900">{label}</span>
        {hint ? <span className="text-xs text-slate-500">{hint}</span> : null}
      </div>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={[
        "w-full rounded-xl border border-brand-navy/15 bg-white px-4 py-3 text-sm text-slate-900",
        "shadow-sm shadow-black/5 outline-none transition",
        "placeholder:text-slate-400",
        "focus:border-brand-cyan/70 focus:ring-4 focus:ring-brand-cyan/15",
        "disabled:cursor-not-allowed disabled:opacity-60",
        props.className ?? "",
      ].join(" ")}
    />
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={[
        "w-full appearance-none rounded-xl border border-brand-navy/15 bg-white px-4 py-3 text-sm text-slate-900",
        "shadow-sm shadow-black/5 outline-none transition",
        "focus:border-brand-cyan/70 focus:ring-4 focus:ring-brand-cyan/15",
        props.className ?? "",
      ].join(" ")}
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={[
        "w-full rounded-xl border border-brand-navy/15 bg-white px-4 py-3 text-sm text-slate-900",
        "shadow-sm shadow-black/5 outline-none transition",
        "placeholder:text-slate-400",
        "focus:border-brand-cyan/70 focus:ring-4 focus:ring-brand-cyan/15",
        props.className ?? "",
      ].join(" ")}
    />
  );
}

export function FormInscripcion() {
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    identificacion: "",
    telefono: "",
    fecha_nacimiento: "",
    sede_id: "",
    objetivo: "",
  });

  // Traer sedes (igual que tu versión 1)
  useEffect(() => {
    let mounted = true;
  
    async function fetchSedes() {
      try {
        setError(null);
  
        const res = await fetch("/api/sedes", { cache: "no-store" });
        const data = await res.json();
  
        if (!res.ok) {
          throw new Error(data?.error || "No se pudieron cargar las sedes.");
        }
  
        if (!Array.isArray(data)) {
          throw new Error("Respuesta inválida de sedes.");
        }
  
        if (mounted) setSedes(data);
      } catch (err: any) {
        if (mounted) setError(err.message || "Error cargando sedes.");
      }
    }
  
    fetchSedes();
    return () => {
      mounted = false;
    };
  }, []);

  // Validación teléfono CO (tu lógica)
  const telefonoNormalizado = useMemo(() => {
    const digits = form.telefono.replace(/\D/g, "");
    return digits.startsWith("57") ? digits.slice(2) : digits;
  }, [form.telefono]);

  const telefonoValidoCO = useMemo(() => {
    return /^3\d{9}$/.test(telefonoNormalizado);
  }, [telefonoNormalizado]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!telefonoValidoCO) {
      setError("Teléfono inválido (Colombia). Debe tener 10 dígitos y empezar por 3.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        nombre: form.nombre,
        apellido: form.apellido,
        identificacion: form.identificacion,
        telefono: form.telefono,
        fecha_nacimiento: form.fecha_nacimiento,
        sede_id: form.sede_id,
        objetivo: form.objetivo,
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(result?.error ?? "No se pudo enviar. Intenta de nuevo.");
        return;
      }

      setSuccess(true);
      setForm({
        nombre: "",
        apellido: "",
        identificacion: "",
        telefono: "",
        fecha_nacimiento: "",
        sede_id: "",
        objetivo: "",
      });
    } finally {
      setLoading(false);
    }
  }

  // Success UI (bonito, dentro del mismo diseño)
  if (success) {
    return (
      <section id="inscripcion" className="scroll-mt-24 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="rounded-3xl border border-brand-navy/15 bg-brand-navy p-10 text-center text-white shadow-sm shadow-black/10">
            <h3 className="font-display text-3xl font-semibold">
              ¡Recibimos tu información! 🐧
            </h3>
            <p className="mt-3 text-sm text-white/85">
              Nuestro equipo te contactará muy pronto para confirmar sede, horario y nivel.
            </p>

            <button
              onClick={() => setSuccess(false)}
              className="mt-6 inline-flex rounded-full bg-brand-yellow px-6 py-3 text-sm font-semibold text-slate-900 hover:brightness-95"
            >
              Enviar otro registro
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="inscripcion" className="scroll-mt-24 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-8 md:grid-cols-12 md:items-start">
          {/* Card principal */}
          <div className="md:col-span-7">
            <div className="overflow-hidden rounded-3xl border border-brand-navy/15 bg-white shadow-sm shadow-black/5">
              {/* Header */}
              <div className="relative bg-gradient-to-r from-brand-navy to-brand-blue px-7 py-7 text-white">
                <div className="max-w-xl">
                  <p className="text-xs font-semibold uppercase tracking-wide text-white/80">
                    Inscripción
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-semibold leading-tight">
                  Da el primer paso hoy
                  </h2>
                  <p className="mt-2 text-sm text-white/85">
                  Déjanos tus datos para agendar una Clase Prueba o resolver tus dudas. Cero presiones, 100% acompañamiento Pingüinos.
                  </p>
                </div>
                <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-brand-yellow/25 blur-2xl" />
              </div>

              {/* Form */}
              <form onSubmit={onSubmit} className="p-7">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Nombre">
                    <Input
                      value={form.nombre}
                      onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                      placeholder="Ej: Juan"
                      autoComplete="given-name"
                      required
                    />
                  </Field>

                  <Field label="Apellido">
                    <Input
                      value={form.apellido}
                      onChange={(e) => setForm({ ...form, apellido: e.target.value })}
                      placeholder="Ej: Pérez"
                      autoComplete="family-name"
                      required
                    />
                  </Field>

                  <Field label="Identificación" hint="CC / TI">
                    <Input
                      value={form.identificacion}
                      onChange={(e) => setForm({ ...form, identificacion: e.target.value })}
                      placeholder="Ej: 1020..."
                      inputMode="numeric"
                      required
                    />
                  </Field>

                  <Field
                    label="Teléfono (Colombia)"
                    hint={telefonoValidoCO ? "✓ válido" : "Ej: 3001234567"}
                  >
                    <Input
                      value={form.telefono}
                      onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                      placeholder="300 123 4567"
                      inputMode="tel"
                      autoComplete="tel"
                      className={telefonoValidoCO ? "border-emerald-500/40" : ""}
                      required
                    />
                    {!telefonoValidoCO && form.telefono.length > 0 ? (
                      <p className="mt-2 text-xs text-rose-600">
                        El número debe ser móvil colombiano (10 dígitos, empieza por 3).
                      </p>
                    ) : null}
                  </Field>

                  <Field label="Fecha de nacimiento">
                    <Input
                      type="date"
                      value={form.fecha_nacimiento}
                      onChange={(e) =>
                        setForm({ ...form, fecha_nacimiento: e.target.value })
                      }
                      required
                    />
                  </Field>

                  <Field label="Sede">
                    <Select
                      value={form.sede_id}
                      onChange={(e) => setForm({ ...form, sede_id: e.target.value })}
                      required
                    >
                      <option value="" disabled>
                        Selecciona una sede
                      </option>
                      {sedes.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.nombre}
                        </option>
                      ))}
                    </Select>
                    {sedes.length === 0 && !error ? (
  <p className="mt-2 text-xs text-slate-500">Cargando sedes…</p>
) : null}

{error ? (
  <p className="mt-2 text-xs text-rose-600">{error}</p>
) : null}
                  </Field>

                  <div className="md:col-span-2">
                    <Field label="Objetivo">
                      <Select
                        value={form.objetivo}
                        onChange={(e) => setForm({ ...form, objetivo: e.target.value })}
                        required
                      >
                        <option value="" disabled>
                          ¿Qué quieres lograr?
                        </option>
                        {objetivos.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </Select>
                    </Field>
                  </div>

                  <div className="md:col-span-2">
                    <Field label="Notas (opcional)" hint="Ej: horario preferido">
                      <Textarea
                        rows={3}
                        placeholder="Ej: Preferimos sábados en la mañana. Niño con experiencia previa..."
                      />
                    </Field>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-slate-500">
                    Al enviar, aceptas ser contactado por Pingüinos para gestionar tu inscripción.
                  </p>

                  <button
                    type="submit"
                    disabled={loading || !telefonoValidoCO}
                    className={[
                      "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold",
                      "bg-brand-yellow text-slate-900 shadow-sm shadow-black/10",
                      "transition-transform duration-200 hover:-translate-y-[1px]",
                      "disabled:opacity-60 disabled:hover:translate-y-0",
                    ].join(" ")}
                  >
                    {loading ? "Enviando..." : "Agendar Clase Prueba"}
                  </button>
                </div>

                {error ? (
                  <p className="mt-3 text-sm text-rose-600">{error}</p>
                ) : null}
              </form>
            </div>
          </div>

          {/* Panel lateral (solo desktop) */}
          <aside className="hidden md:col-span-5 md:block">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-3xl border border-brand-navy/10 bg-white p-6 shadow-sm shadow-black/5">
                <h3 className="font-display text-xl font-semibold text-slate-900">
                  ¿Qué pasa después?
                </h3>

                <ol className="mt-4 space-y-3 text-sm text-slate-600">
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-cyan/15 text-brand-navy">
                      1
                    </span>
                    Te escribimos por WhatsApp para entender qué buscas y confirmar la sede.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-cyan/15 text-brand-navy">
                      2
                    </span>
                    Te sugerimos el nivel ideal y los horarios disponibles.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-cyan/15 text-brand-navy">
                      3
                    </span>
                    Agendamos tu primera clase guiada para que vivas la experiencia Pingüinos.
                  </li>
                </ol>
              </div>

              <div className="rounded-3xl border border-brand-navy/10 bg-brand-navy p-6 text-white shadow-sm shadow-black/5">
                <h3 className="font-display text-xl font-semibold">Datos protegidos</h3>
                <p className="mt-2 text-sm text-white/80">
                  Usamos tu información solo para contacto e inscripción. Sin spam.
                </p>
                <div className="mt-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-semibold">
                  Estado inicial: <span className="ml-2 text-brand-yellow">nuevo</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}