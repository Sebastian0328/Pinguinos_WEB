// src/components/sections/servicios.tsx
import Image from "next/image";
import { Container } from "../container";

type Servicio = {
  title: string;
  desc: string;
  tag?: string;
  image: string;
  href?: string; // si luego quieres linkear a contacto
};

const servicios: Servicio[] = [
  {
    title: "Matronatación y Niños",
    desc: "Estimulación temprana, juegos y seguridad. Desarrollamos su confianza en el agua mientras interactúan de forma natural con el inglés.",
    image: "/clase_infantil.png",
    href: "/#contacto",
  },
  {
    title: "Jóvenes y Adultos",
    desc: "Nunca es tarde para aprender o perder el miedo. Perfecciona tu técnica a tu ritmo, con acompañamiento paciente y enfocado en resultados.",
    image: "/clases_adultos.png",
    href: "/#contacto",
  },
  {
    title: "Entrenamiento Avanzado",
    desc: "Para quienes buscan un nivel competitivo. Disciplina, técnica superior, resistencia y seguimiento de rendimiento con objetivos claros.",
    image: "/Competencia2.png",
    href: "/#contacto",
  },
];

function ServicioCard({ s }: { s: Servicio }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm shadow-black/5">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-slate-100">
        <Image src={s.image} alt={s.title} fill className="object-cover" sizes="(min-width: 768px) 420px, 100vw" />
      </div>

      <div className="p-5">
        <div className="font-display text-lg font-semibold text-slate-900">{s.title}</div>
        <p className="mt-2 text-sm leading-6 text-slate-600">{s.desc}</p>

        {/* {s.href && (
          <a
            href={s.href}
            className="mt-4 inline-flex rounded-full bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:opacity-95"
          >
            Ver detalles
          </a>
        )}*/}
      </div>
    </div>
  );
}

export function ServiciosSection() {
  return (
    <section id="programas" className="scroll-mt-24 py-16 md:py-20">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          {/* Columna izquierda (texto) */}
          <div className="md:sticky md:top-28">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Servicios
            </p>

            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-slate-900">
            Una experiencia para cada etapa de tu familia
            </h2>

            <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
            Desde los primeros chapoteos del bebé hasta el perfeccionamiento de adultos. Diseñamos espacios que combinan técnica, desarrollo personal y contacto con el inglés a tu propio ritmo.
            </p>

            <a
              href="/#inscripcion"
              className="mt-6 inline-flex rounded-full bg-brand-yellow px-5 py-3 text-sm font-semibold text-slate-900"
            >
              Consultar horarios
            </a>
          </div>

          {/* Columna derecha (cards 2x2) */}
          <div className="grid gap-6 sm:grid-cols-2">
            <ServicioCard s={servicios[0]} />
            <ServicioCard s={servicios[1]} />
            <div className="sm:col-span-2">
              <ServicioCard s={servicios[2]} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
