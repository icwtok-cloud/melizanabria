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
          <img src="/melisa.jpg" alt="Melisa Zanabria" className="links-avatar-img" />
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
