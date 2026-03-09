import { InglesSection } from "./components/sections/ingles";
import { SedesSection } from "./components/sections/sedes";
import { HomeSection } from "./components/sections/home";
import { BeneficiosSection } from "./components/sections/beneficios";
import { ServiciosSection } from "./components/sections/servicios";
import { PreguntasSection } from "./components/sections/preguntas";
import { CtaFinalSection } from "./components/sections/cta-final";
import { FormInscripcion } from "./components/sections/form-inscripcion";


export default function HomePage() {
  return (
    <>
      <HomeSection   />
      <InglesSection />
      <SedesSection />
      <BeneficiosSection />
      <ServiciosSection />
      <PreguntasSection />
      <FormInscripcion/>
      <CtaFinalSection />
      {/* <ProgramasSection /> */}
      {/* <ContactoSection /> */}
    </>
  );
}
