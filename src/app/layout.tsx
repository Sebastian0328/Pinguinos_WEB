import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "./components/navbar";
import { Container } from "./components/container";
import Image from "next/image";
import Link from "next/link";
import { WhatsAppFloat } from "./components/whatsapp-float";

export const metadata: Metadata = {
  title: "Pingüinos | Escuela de natación",
  description: "Clases de natación para niños, jóvenes y adultos. Sedes, programas y contacto.",
};

const socialLinks = [
  { label: "Síguenos en Instagram", href: "https://instagram.com/pinguinos.i.d", external: true },
  { label: "Nuestra comunidad en Facebook", href: "https://facebook.com/pinguinos.industriadeportiva", external: true },
];

const actionLinks = [
  { label: "Agendar Clase Prueba", href: "/#inscripcion", external: false },
  { label: "Preguntas Frecuentes", href: "/#preguntas", external: false },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const year = new Date().getFullYear();

  return (
    <html lang="es" className="scroll-smooth">
      <body className="min-h-dvh">
        <Navbar />
        <main id="contenido">{children}</main>

        {/* FOOTER COMPLETO */}
        <footer id="contacto" className="border-t border-slate-200 bg-white">
          <Container>
            {/* Top */}
            <div className="grid gap-10 py-12 md:grid-cols-3">
              
              {/* Col 1: Logo + contacto */}
              <div>
                <div className="flex items-start gap-3">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full bg-brand-yellow">
                    {/* Cambia a tu logo real */}
                    <Image
                      src="/logo.png"
                      alt="Pingüinos"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                </div>

                <div className="mt-8 space-y-8 text-sm text-slate-700">
                  <div>
                    <div className="font-semibold text-slate-900">Dirección</div>
                    <div className="mt-2 opacity-80">
                      Bogotá, Colombia. Encuentra tu sede más cercana en la sección de Sedes.
                    </div>
                  </div>

                  <div>
                    <div className="font-semibold text-slate-900">Teléfonos</div>
                    <div className="flex mt-2 opacity-80 gap-4">
                      <a className="hover:underline" href="tel:+573242478437">
                        +57 324 247 8437
                      </a>
                      <a className="hover:underline" href="tel:+573124912885">
                        +57 312 491 2885
                      </a>
                    </div>
                  </div>
                </div>
              </div> {/* <-- ESTE DIV CERRABA LA COLUMNA 1 */}

              {/* Col 2/3: Comunidad y Acción */}
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:col-span-2 md:justify-items-end">
                
                {/* Columna 1: Redes Sociales */}
                <div className="space-y-3 text-sm text-slate-800 md:text-right">
                  <div className="font-semibold text-slate-900 mb-4">Mundo Pingüinos</div>
                  {socialLinks.map((l) => (
                    <a 
                      key={l.href} 
                      href={l.href} 
                      target={l.external ? "_blank" : "_self"}
                      rel={l.external ? "noopener noreferrer" : ""}
                      className="block hover:text-brand-cyan hover:underline transition"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>

                {/* Columna 2: Links clave */}
                <div className="space-y-3 text-sm text-slate-800 md:text-right">
                  <div className="font-semibold text-slate-900 mb-4">Empieza hoy</div>
                  {actionLinks.map((l) => (
                    <Link 
                      key={l.href} 
                      href={l.href} 
                      className="block hover:text-brand-cyan hover:underline transition"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>

              </div> {/* <-- ESTE DIV CIERRA LA COL 2/3 */}
            </div> {/* <-- ESTE DIV CIERRA EL GRID PRINCIPAL (Top) */}

            {/* Divider (negra como en tu referencia) */}
            <div className="h-px w-full bg-slate-900" />

            {/* Bottom */}
            <div className="flex flex-col gap-4 py-6 text-sm text-slate-800 md:flex-row md:items-center md:justify-between">
              <div>© {year} Pingüinos. Todos los derechos reservados.</div>

              <div className="flex flex-wrap gap-x-10 gap-y-2">
                <Link href="/privacidad" className="underline underline-offset-4">
                  Política de privacidad
                </Link>
                <Link href="/terminos" className="underline underline-offset-4">
                  Términos de servicio
                </Link>
                <Link href="/cookies" className="underline underline-offset-4">
                  Configuración de cookies
                </Link>
              </div>
            </div>
          </Container>
        </footer>
        
        <WhatsAppFloat />
      </body>
    </html>
  );
}