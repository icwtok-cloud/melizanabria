import { Suspense } from "react";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import PropertyGallery from "@/components/PropertyGallery";
import ContactFooterForm from "@/components/ContactFooter";
import { sortedProperties } from "@/lib/properties";
import { MELISA_PHONE, buildWhatsAppLink } from "@/lib/whatsapp";
import { MessageCircle, Instagram, Facebook } from "lucide-react";

export const metadata: Metadata = {
  title: "Propiedades en venta · Melisa Zanabria",
  description:
    "Todas las propiedades publicadas por Melisa Zanabria: terrenos, casas, departamentos y más en Santa Fe y alrededores. Consultá por WhatsApp en segundos.",
};

export default function PropiedadesPage() {
  return (
    <>
      <Nav />

      <main id="top" className="properties-page">
        <header className="properties-page-hero">
          <div className="wrap">
            <span className="eyebrow">Propiedades en venta</span>
            <h1>Todas las publicaciones</h1>
            <p className="section-sub">
              {sortedProperties.length} propiedades disponibles. Tocá cualquiera para ver fotos,
              detalles y dejar tu consulta.
            </p>
          </div>
        </header>

        <section className="properties">
          <div className="wrap wrap-slider">
            <Suspense fallback={<div className="slider-skeleton" />}>
              <PropertyGallery properties={sortedProperties} variant="grid" />
            </Suspense>
          </div>
        </section>
      </main>

      {/* FOOTER (idéntico al de home, para mantener consistencia de navegación) */}
      <footer id="contacto" className="footer">
        <div className="wrap footer-inner">
          <div className="footer-brand">
            <span className="clover" aria-hidden="true">
              <svg viewBox="0 0 64 64" fill="none">
                <path
                  d="M32 30c-6-10-20-10-20 2 0 8 9 10 20-2Zm0 0c6-10 20-10 20 2 0 8-9 10-20-2Zm0 0c-10-6-10-20 2-20 8 0 10 9-2 20Zm0 0c10-6 10-20-2-20-8 0-10 9 2 20Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <div>
              <h3>Melisa Zanabria</h3>
              <p className="footer-badge">En alianza con APL Inmobiliaria &amp; Desarrollos</p>
            </div>
            <div className="footer-socials">
              <a
                href="https://www.instagram.com/apl.melizanabria"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram size={20} strokeWidth={2} />
              </a>
              <a
                href="https://www.facebook.com/melisazanabria_apl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook size={20} strokeWidth={2} />
              </a>
              <a
                href={buildWhatsAppLink(MELISA_PHONE, "Hola Meli! Te escribo desde tu web.")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} strokeWidth={2} />
              </a>
            </div>
            <a href="/links" className="footer-links-page">
              Ver todos mis links →
            </a>
          </div>

          <div className="footer-form-wrap">
            <h4>¿Inversiones, pozo o créditos hipotecarios?</h4>
            <p>Dejame tu nombre y seguimos por WhatsApp.</p>
            <ContactFooterForm />
          </div>
        </div>
        <div className="wrap footer-bottom">
          <span>© {new Date().getFullYear()} Melisa Zanabria · Santa Fe, Argentina</span>
        </div>
      </footer>
    </>
  );
}
