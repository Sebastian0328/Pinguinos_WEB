// src/components/sections/cta-final.tsx
import Image from "next/image";
import { Container } from "../container";

export function CtaFinalSection() {
  return (
    <section id="cta" className="py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl font-semibold text-slate-900">
          Dale a tu familia el nivel que se merece.
          </h2>
          <p className="mt-3 text-sm text-slate-600">
          Desarrollo, seguridad e inglés en un solo lugar. Únete a las familias que ya confían en el método Pingüinos.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <a
              href="/#inscripcion"
              className="inline-flex rounded-full bg-brand-yellow px-6 py-3 text-sm font-semibold text-slate-900"
            >
              Agendar Clase Prueba
            </a>
            <a
              href="https://wa.me/573242478437?text=Hola, quiero agendar una clase en Pingüinos 🐧"
              className="inline-flex rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white hover:opacity-95"
            >
              Hablemos por WhatsApp
            </a>
          </div>
        </div>

        {/* Bloque (mismo tamaño) pero con imagen */}
        <div className="relative mx-auto mt-10 h-[260px] max-w-5xl overflow-hidden rounded-2xl bg-brand-navy md:h-[340px]">

          <Image
            src="/equipo.jpeg" // pon aquí el nombre real en /public
            alt="Equipo competitivo Pingüinos"
            fill
            className="object-cover object-center"
            sizes="(min-width: 1024px) 1024px, 100vw"
          />
        </div>
      </Container>
    </section>
  );
}
