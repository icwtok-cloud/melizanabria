import { Suspense } from "react";
import {
  Home as HomeIcon,
  KeyRound,
  Landmark,
  Building2,
  Globe2,
  TrendingUp,
  MessageCircle,
  Instagram,
  Facebook,
} from "lucide-react";
import Nav from "@/components/Nav";
import PropertyGallery from "@/components/PropertyGallery";
import ContactFooterForm from "@/components/ContactFooter";
import { properties } from "@/lib/properties";
import { MELISA_PHONE, buildWhatsAppLink } from "@/lib/whatsapp";

const SERVICES = [
  { icon: HomeIcon, label: "Compra y venta" },
  { icon: KeyRound, label: "Alquileres" },
  { icon: Landmark, label: "Créditos hipotecarios" },
  { icon: Building2, label: "Departamentos en pozo" },
  { icon: Globe2, label: "Adquisiciones en el exterior" },
  { icon: TrendingUp, label: "Inversiones inmobiliarias" },
];

export default function Home() {
  const heroWa = buildWhatsAppLink(
    MELISA_PHONE,
    "Hola Meli! Te escribo desde tu web, quiero hacerte una consulta."
  );

  return (
    <>
      <Nav />

      <main id="top">
        {/* HERO */}
        <header className="hero">
          <div className="wrap hero-inner">
            <div className="hero-copy">
              <span className="eyebrow">Agente inmobiliaria · Santa Fe Capital</span>
              <h1>
                Tu próxima propiedad,
                <br />
                con el respaldo de <span className="hl">APL</span>
              </h1>
              <p className="hero-lead">
                Soy Melisa Zanabria, agente inmobiliaria en Santa Fe. Te acompaño en compra,
                venta, alquileres, créditos hipotecarios, departamentos en pozo, inversiones y
                adquisiciones en el exterior — con el respaldo de APL Inmobiliaria &amp;
                Desarrollos.
              </p>
              <div className="hero-actions">
                <a
                  className="btn btn-primary"
                  href={heroWa}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={17} strokeWidth={2.2} />
                  Hablemos por WhatsApp
                </a>
                <a className="btn btn-ghost" href="#propiedades">
                  Ver propiedades
                </a>
              </div>
            </div>

            <div className="hero-photo">
              {/* TODO: reemplazar por una foto profesional real de Melisa (retrato, buena luz, fondo simple).
                  Formato sugerido: JPG/WEBP vertical, mínimo 900x1100px, en /public/melisa.jpg */}
              <div className="hero-photo-frame">
                <div className="hero-photo-placeholder">
                  <svg viewBox="0 0 64 64" fill="none" className="hero-clover">
                    <path
                      d="M32 30c-6-10-20-10-20 2 0 8 9 10 20-2Zm0 0c6-10 20-10 20 2 0 8-9 10-20-2Zm0 0c-10-6-10-20 2-20 8 0 10 9-2 20Zm0 0c10-6 10-20-2-20-8 0-10 9 2 20Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>Foto de Melisa próximamente</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* SERVICIOS */}
        <section id="servicios" className="services">
          <div className="wrap">
            <div className="services-grid">
              {SERVICES.map(({ icon: Icon, label }) => (
                <div className="service-chip" key={label}>
                  <Icon size={20} strokeWidth={2} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROPIEDADES */}
        <section id="propiedades" className="properties">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">Propiedades en venta</span>
              <h2>Una selección para empezar a mirar</h2>
              <p className="section-sub">
                Tocá cualquier propiedad para ver fotos, detalles y consultar por WhatsApp.
              </p>
            </div>
          </div>
          <div className="wrap wrap-slider">
            <Suspense fallback={<div className="slider-skeleton" />}>
              <PropertyGallery properties={properties} />
            </Suspense>
          </div>
        </section>

        {/* INVERSIONES / POZO / CRÉDITOS */}
        <section className="invest">
          <div className="wrap invest-inner">
            <div>
              <span className="eyebrow eyebrow-light">Para ir un paso más allá</span>
              <h2>Invertir no es solo comprar, es proyectar tu futuro</h2>
              <p>
                Si estás pensando en un departamento en pozo, una inversión inmobiliaria o
                necesitás asesoramiento sobre créditos hipotecarios, dejame tu nombre y
                seguimos la conversación por WhatsApp.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
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
