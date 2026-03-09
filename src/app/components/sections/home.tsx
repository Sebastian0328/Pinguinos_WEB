// src/components/sections/home.tsx
import Link from "next/link";
import { Container } from "../container";
import Image from "next/image";

export function HomeSection() {
  return (
    <section
      id="home"
      className="relative scroll-mt-24 overflow-hidden"
    >
      {/* Fondo */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/PisinaFondo.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <Container>
        <div className="grid min-h-[85vh] items-center gap-10 pt-32 pb-20 md:grid-cols-2">
          
          {/* Texto */}
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl font-medium leading-[1.05] text-white md:text-6xl">
            Mucho más que natación: <br /> <span className="text-brand-yellow">Confianza y progreso</span> en el agua
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-white/85 md:text-base">
            Transformamos el tiempo en el agua en desarrollo real. Desde matronatación hasta adultos, combinamos técnica, bienestar y un método único para que cada logro se note.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/#inscripcion"
                className="inline-flex items-center justify-center rounded-sm bg-brand-yellow px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-[1px]"
              >
                Agendar Clase Prueba
              </Link>

              <Link
                href="/#programas"
                className="inline-flex items-center justify-center rounded-sm bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-[1px]"
              >
                Ver programas
              </Link>
            </div>
          </div>

          {/* Imagen derecha (solo desktop) */}
          <div className="relative hidden md:flex justify-end -mr-10 lg:-mr-16">
            <Image
              src="/swimmer.png"
              alt="Nadador"
              width={1000}
              height={1000}
              className="object-contain"
              priority
            />
          </div>

        </div>
      </Container>
    </section>
  );
}