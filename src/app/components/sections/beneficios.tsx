// src/components/sections/beneficios.tsx
import Image from "next/image";
import { Container } from "../container";

const topBenefits = [
  {
    title: "100% Calidad",
    desc: "Metodología clara por niveles, seguimiento real y progreso visible desde las primeras clases.",
    icon: "/icons/quality.svg",
  },
  {
    title: "Instructores Certificados",
    desc: "Profes entrenados para enseñar (no solo para nadar). Técnica, correcciones y acompañamiento con paciencia.",
    icon: "/icons/shield.svg",
  },
  {
    title: "Ambiente Seguro",
    desc: "Clases organizadas, supervisión constante y una experiencia tranquila para niños, jóvenes y adultos.",
    icon: "/icons/safety.svg",
  },
];

const cards = [
  {
    eyebrow: "Salud",
    title: "Mejora cardiovascular",
    desc: "Fortalece el corazón y los pulmones naturalmente.",
    variant: "mini",
    image: "/mejora_cardiovascular.png",
  },
  {
    eyebrow: "Confianza",
    title: "Seguridad en el agua",
    desc: "Domina el medio acuático sin miedo ni dudas.",
    variant: "mini",
    image: "/seguridad.png",
  },
  {
    eyebrow: "Desarrollo",
    title: "Crecimiento integral del cuerpo y la mente",
    desc: "Disciplina, hábitos y seguridad que se notan dentro y fuera del agua.",
    variant: "feature",
    image: "/Desarrollo.png",
  },
];

function TopBenefitItem({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: string;
}) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center">
        <Image src={icon} alt="" width={40} height={40} />
      </div>
      <h3 className="font-display text-sm font-semibold text-slate-900">{title}</h3>
      <p className="mx-auto mt-2 max-w-xs text-xs leading-5 text-slate-600">{desc}</p>
    </div>
  );
}

function MiniCard({
  eyebrow,
  title,
  desc,
  image,
}: {
  eyebrow: string;
  title: string;
  desc: string;
  image: string;
}) {
  return (
    <div
      className="group h-full rounded-2xl border border-brand-navy/20 bg-white shadow-sm shadow-black/5
                 transition-all duration-300 ease-out
                 hover:-translate-y-1 hover:shadow-md hover:shadow-black/10 hover:border-brand-cyan/60"
    >
      {/* franja superior: imagen (aquí sí overflow hidden) */}
      <div className="relative h-24 overflow-hidden rounded-t-2xl">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover object-center"
          sizes="(min-width: 768px) 260px, 100vw"
        />
        <div className="absolute inset-0 bg-brand-navy/15" />
      </div>

      {/* contenido flotando */}
      <div className="relative z-10 px-5 pb-5 pt-6">
        <div
          className="relative -mt-12 rounded-xl bg-white p-5 shadow-sm shadow-black/5 ring-1 ring-black/5
                 transition-transform duration-300 ease-out group-hover:-translate-y-[2px]"
        >
          <div className="text-xs text-slate-500">{eyebrow}</div>
          <div className="mt-1 font-display text-lg font-semibold leading-snug text-slate-900">
            {title}
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
        </div>
      </div>
    </div>
  );
}


function FeatureCard({
  eyebrow,
  title,
  desc,
  image,
}: {
  eyebrow: string;
  title: string;
  desc: string;
  image: string;
}) {
  return (
    <div
      className="group grid overflow-hidden rounded-2xl border-2 border-brand-yellow/80 md:grid-cols-2
                 shadow-sm shadow-black/5 transition-all duration-300 ease-out
                 hover:-translate-y-1 hover:shadow-md hover:shadow-black/10"
    >
      <div className="relative min-h-[220px] overflow-hidden bg-slate-100">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          sizes="(min-width: 768px) 520px, 100vw"
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.22) 45%, transparent 65%)",
          }}
        />
      </div>

      <div className="bg-brand-yellow p-7">
        <div className="text-xs font-medium text-slate-900/70">{eyebrow}</div>
        <div className="mt-2 font-display text-2xl font-semibold leading-snug text-slate-900">
          {title}
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-900/80">{desc}</p>
      </div>
    </div>
  );
}

export function BeneficiosSection() {
  return (
    <section id="beneficios" className="scroll-mt-24 py-16 md:py-20">
      <Container>
        <h2 className="font-display text-3xl font-semibold text-slate-900">
        El método Pingüinos: ¿Por qué elegirnos?
        </h2>
        <p className="mt-3 max-w-2xl text-slate-600">
        No somos solo una piscina. Creamos un entorno donde la técnica, la seguridad y el desarrollo humano avanzan al mismo tiempo..
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {topBenefits.map((b) => (
            <TopBenefitItem key={b.title} title={b.title} desc={b.desc} icon={b.icon} />
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-12">
  <div className="h-full md:col-span-3">
    <MiniCard
      eyebrow={cards[0].eyebrow}
      title={cards[0].title}
      desc={cards[0].desc}
      image={cards[0].image}
    />
  </div>

  <div className="h-full md:col-span-3">
    <MiniCard
      eyebrow={cards[1].eyebrow}
      title={cards[1].title}
      desc={cards[1].desc}
      image={cards[1].image}
    />
  </div>

  <div className="md:col-span-6">
    <FeatureCard
      eyebrow={cards[2].eyebrow}
      title={cards[2].title}
      desc={cards[2].desc}
      image={cards[2].image}
    />
  </div>
</div>

      </Container>
    </section>
  );
}
