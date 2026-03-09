import { Container } from "../container";
import { mapsLink } from "../../lib/maps";

type Sede = {
  id: number;
  nombre: string;
  direccion: string;
  horarios: string;
  edades: string;
  cta?: string;
};

const sedes: Sede[] = [
  {
    id: 1,
    nombre: "Meissen",
    direccion: "Cl. 62 Bis Sur #16c-40, Bogotá, Colombia",
    horarios: "Horarios: Sab-Domin  8:00–12:00",
    edades: "Edades: Bebés · Niños · Jóvenes · Adultos",
    cta: "Cómo llegar",
  },
  {
    id: 2,
    nombre: "Sociego Sur",
    direccion: "Cra. 11 #26-12, Rafael Uribe Uribe, Bogotá, Colombia",
    horarios: "Horarios: Mier–Vier-Sab-Domin  8:00–12:00",
    edades: "Edades: Bebés · Niños · Jóvenes · Adultos",
    cta: "Cómo llegar",
  },
  {
    id: 3,
    nombre: "Servita",
    direccion: "Calle 165 N. 07-52, Bogotá, Colombia",
    horarios: "Horarios:  Sab-Domin  8:00–12:00",
    edades: "Edades: Bebés · Niños · Jóvenes · Adultos",
    cta: "Cómo llegar",
  },
];

export function SedesSection() {
  return (
    <section id="sedes" className="scroll-mt-24 py-16 md:py-20">
      <Container>
        <h2 className="text-3xl font-semibold">Nuestras sedes</h2>

        <p className="mt-3 max-w-2xl opacity-80">
          Cada sede cuenta con su propio equipo de profesores y horarios
          especializados para cada edad.
        </p>
        <p className="mt-3 max-w-2xl opacity-80">
        Encuentra tu sede más cercana y agenda una Clase Prueba guiada hoy mismo.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {sedes.map((sede) => (
            <div key={sede.id} className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="text-xs font-medium opacity-60">Sede {sede.id}</div>
              <div className="mt-1 text-lg font-semibold">{sede.nombre}</div>

              <div className="mt-3 space-y-1 text-sm opacity-75">
                <div>{sede.direccion}</div>
                <div>{sede.horarios}</div>
                <div>{sede.edades}</div>
              </div>

              <a
                href={mapsLink(sede.direccion)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex rounded-full bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:opacity-95"
              >
                {sede.cta ?? "Cómo llegar"}
              </a>
            </div>
          ))}
        </div>

        <p className="mt-6 max-w-2xl opacity-80">
          ¿No encuentras tu sede? Contacta con nosotros y te ayudaremos a encontrar la más cercana a ti.
        </p>
      </Container>
    </section>
  );
}
