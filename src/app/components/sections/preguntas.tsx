// src/components/sections/preguntas.tsx
"use client";

import { useState } from "react";
import { Container } from "../container";

type FAQ = {
  q: string;
  a: string;
};

const faqs: FAQ[] = [
  {
    q: "¿A qué edad puedo empezar?",
    a: "Aceptamos bebés desde los 6 meses en clases especiales con padres. Niños, jóvenes y adultos tienen programas por niveles. No hay límite de edad para aprender a nadar.",
  },
  {
    q: "¿Cuál es la duración de las clases?",
    a: "Las clases regulares duran 45 minutos para niños y 60 minutos para adultos. Esto permite trabajar técnica sin cansar excesivamente. Las clases personalizadas se adaptan a tu disponibilidad.",
  },
  {
    q: "¿Necesito saber nadar previamente?",
    a: "No es necesario. Comenzamos desde cero con quienes no tienen experiencia. Nuestros instructores construyen confianza y técnica desde el primer día.",
  },
  {
    q: "¿Cuáles son los horarios disponibles?",
    a: "Ofrecemos clases de lunes a sábado en múltiples franjas horarias. Contamos con turnos matutinos, vespertinos y nocturnos. Puedes consultar disponibilidad según tu sede.",
  },
  {
    q: "¿Qué incluye la inscripción?",
    a: "Incluye acceso a las instalaciones, uso de vestuarios y evaluación inicial. En algunos programas se incluyen materiales didácticos. Los detalles varían según el curso elegido.",
  },
];

function PlusIcon({ open }: { open: boolean }) {
  return (
    <span
      className={[
        "relative inline-flex h-7 w-7 items-center justify-center rounded-md",
        "text-brand-cyan",
      ].join(" ")}
      aria-hidden="true"
    >
      <span className="absolute h-[2px] w-4 bg-current" />
      <span
        className={[
          "absolute h-4 w-[2px] bg-current transition-transform duration-200",
          open ? "scale-y-0" : "scale-y-100",
        ].join(" ")}
      />
    </span>
  );
}

function FAQItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white px-6 py-5 shadow-sm shadow-black/10">

      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 text-left"
        aria-expanded={isOpen}
      >
        <div className="font-display text-base font-semibold text-slate-900">
          {item.q}
        </div>
        <PlusIcon open={isOpen} />
      </button>

      <div
        className={[
          "grid transition-[grid-template-rows,opacity] duration-200 ease-out",
          isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0 mt-0",
        ].join(" ")}
      >
        <div className="overflow-hidden text-sm leading-6 text-slate-600">
          {item.a}
        </div>
      </div>
    </div>
  );
}

export function PreguntasSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="preguntas" className="scroll-mt-24 py-16 md:py-20 bg-brand-navy">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-4xl font-semibold text-white">
  Preguntas
</h2>
<p className="mt-3 text-sm text-white/80">
  Resolvemos tus dudas sobre inscripción, horarios, requisitos y cómo empezar.
</p>

        </div>

        <div className="mx-auto mt-10 grid max-w-3xl gap-4">
          {faqs.map((item, i) => (
            <FAQItem
              key={item.q}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-3xl text-center">
        <h3 className="font-display text-3xl font-semibold text-white">
  ¿Tienes más dudas?
</h3>
<p className="mt-2 text-sm text-white/80">
  Nuestro equipo está listo para responder cualquier pregunta que tengas.
</p>

          <a
            href="/#contacto"
            className="mt-6 inline-flex rounded-full bg-brand-yellow px-6 py-3 text-sm font-semibold text-slate-900 hover:brightness-95"
          >
            Contactar
          </a>
        </div>
      </Container>
    </section>
  );
}
