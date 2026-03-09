import Link from "next/link";
import { Container } from "./container";
import Image from "next/image";

const navItems = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Sedes", href: "/#sedes" },
  { label: "Programas", href: "/#programas" },
  { label: "Contacto", href: "/#contacto" }
];

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50
        border-b border-white/10
        bg-white/10 backdrop-blur-md">
      <Container>
        <nav className="flex items-center justify-between py-4">
          
          <Link href="/#inicio" className="font-semibold tracking-tight">
            <Image src="/logo.png" alt="Pingüinos" width={100} height={100} />
          </Link>

          <div className="hidden items-center gap-7 text-sm font-medium md:flex">
            {navItems.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                className="opacity-80 hover:opacity-100"
              >
                {it.label}
              </Link>
            ))}

            {/* Reservar -> Formulario */}
            <Link
              href="/#inscripcion"
              className="rounded-full bg-brand-yellow px-4 py-2 text-slate-900 font-semibold hover:opacity-95 transition"
            >
              Reservar
            </Link>
          </div>

          {/* Mobile */}
          <Link
            href="/#inscripcion"
            className="rounded-full bg-brand-yellow px-4 py-2 text-sm font-semibold text-slate-900 md:hidden"
          >
            Reservar
          </Link>

        </nav>
      </Container>
    </header>
  );
}