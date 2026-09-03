"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, MessageCircle } from "lucide-react";
import { MELISA_PHONE, buildWhatsAppLink } from "@/lib/whatsapp";

const NAV_LINKS = [
  { href: "#propiedades", label: "Propiedades" },
  { href: "#servicios", label: "Servicios" },
  { href: "#contacto", label: "Contacto" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const waLink = buildWhatsAppLink(
    MELISA_PHONE,
    "Hola Meli! Te escribo desde tu web, quiero hacerte una consulta."
  );

  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <a href="#top" className="nav-brand">
          <span className="clover" aria-hidden="true">
            <svg viewBox="0 0 64 64" fill="none">
              <path
                d="M32 30c-6-10-20-10-20 2 0 8 9 10 20-2Zm0 0c6-10 20-10 20 2 0 8-9 10-20-2Zm0 0c-10-6-10-20 2-20 8 0 10 9-2 20Zm0 0c10-6 10-20-2-20-8 0-10 9 2 20Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className="nav-brand-text">
            Melisa Zanabria
            <small>APL Inmobiliaria &amp; Desarrollos</small>
          </span>
        </a>

        <div className="nav-links-desktop">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
          <Link href="/links">Links</Link>
        </div>

        <a
          className="btn btn-primary nav-cta"
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle size={17} strokeWidth={2.2} />
          WhatsApp
        </a>

        <button
          className="nav-burger"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="nav-mobile">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <Link href="/links" onClick={() => setOpen(false)}>
            Links
          </Link>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Hablar por WhatsApp
          </a>
        </div>
      )}
    </nav>
  );
}
