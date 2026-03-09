import Image from "next/image";

export function WhatsAppFloat() {
  const phone = "573242478437"; // <-- cambia (sin +, sin espacios)
  const text = encodeURIComponent("Hola, quiero agendar una clase en Pingüinos 🐧");
  const href = `https://wa.me/${phone}?text=${text}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg shadow-black/20 transition-transform hover:-translate-y-0.5"
      aria-label="WhatsApp"
    >
      <Image src="/icons/whatsapp.svg" alt="WhatsApp" width={56} height={56} />
    </a>
  );
}
