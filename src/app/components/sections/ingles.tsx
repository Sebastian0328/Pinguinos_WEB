import Image from "next/image";
import { Container } from "../container";

export function InglesSection() {
  return (
    <section className="bg-brand-navy text-white">
      <Container>
        <div className="grid items-center gap-10 py-14 md:grid-cols-2 md:py-16">
          <div className="relative mx-auto h-[240px] w-[240px] md:h-[445px] md:w-[445px]">
            <Image src="/PinProIn.png" alt="Pingüino" fill className="object-contain"  sizes="(min-width: 768px) 320px, 240px"
    priority />
          </div>

          <div className="text-center md:text-left">
            <p className="text-4xl font-semibold opacity-80">Dos logros que vas a celebrar:</p>
            <h2 className="mt-2 text-4xl font-semibold leading-tight md:text-5xl">
              NATACIÓN + <span className="text-brand-yellow">INGLÉS</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base/7 opacity-90 md:mx-0">
              Entrena en el agua y refuerza inglés de forma natural, con una experiencia dinámica y enfocada en avanzar.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

