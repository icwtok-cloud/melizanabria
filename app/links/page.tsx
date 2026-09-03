import type { Metadata } from "next";
import { Instagram, Facebook, MessageCircle, ArrowLeft } from "lucide-react";
import { MELISA_PHONE, buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Links · Melisa Zanabria",
  description: "Todos los links de Melisa Zanabria, agente inmobiliaria en APL.",
};

const LINKS = [
  {
    label: "Instagram",
    handle: "@apl.melizanabria",
    href: "https://www.instagram.com/apl.melizanabria",
    icon: Instagram,
  },
  {
    label: "Facebook",
    handle: "melisazanabria_apl",
    href: "https://www.facebook.com/melisazanabria_apl",
    icon: Facebook,
  },
  {
    label: "WhatsApp",
    handle: "+54 9 342 508-8763",
    href: buildWhatsAppLink(MELISA_PHONE, "Hola Meli! Te escribo desde tu web."),
    icon: MessageCircle,
  },
];

export default function LinksPage() {
  return (
    <main className="links-page">
      <div className="links-card">
        <a href="/" className="links-back">
          <ArrowLeft size={16} /> melizanabria.com.ar
        </a>

        <div className="links-avatar">
          {/* TODO: reemplazar por foto real de Melisa en /public/melisa.jpg */}
          <svg viewBox="0 0 64 64" fill="none" className="links-clover">
            <path
              d="M32 30c-6-10-20-10-20 2 0 8 9 10 20-2Zm0 0c6-10 20-10 20 2 0 8-9 10-20-2Zm0 0c-10-6-10-20 2-20 8 0 10 9-2 20Zm0 0c10-6 10-20-2-20-8 0-10 9 2 20Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <h1>Melisa Zanabria</h1>
        <p className="links-sub">APL Inmobiliaria &amp; Desarrollos · Santa Fe Capital</p>

        <div className="links-list">
          {LINKS.map(({ label, handle, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-item"
            >
              <span className="link-icon">
                <Icon size={20} strokeWidth={2} />
              </span>
              <span className="link-text">
                <strong>{label}</strong>
                <small>{handle}</small>
              </span>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
