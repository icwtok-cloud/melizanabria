"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Property } from "@/lib/properties";
import ConsultaWizard from "@/components/ConsultaWizard";

export default function PropertyGallery({
  properties,
  variant = "slider",
}: {
  properties: Property[];
  /** "slider": carrusel horizontal (home). "grid": grilla completa (página /propiedades). */
  variant?: "slider" | "grid";
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [consultaOpen, setConsultaOpen] = useState(false);

  // Deep-link: si alguien entra con ?propiedad=slug, abrimos el detalle directo
  useEffect(() => {
    const fromUrl = searchParams.get("propiedad");
    if (fromUrl) {
      setActiveSlug(fromUrl);
      setPhotoIndex(0);
    }
  }, [searchParams]);

  const active = useMemo(
    () => properties.find((p) => p.slug === activeSlug) || null,
    [activeSlug, properties]
  );

  function openProperty(slug: string) {
    setActiveSlug(slug);
    setPhotoIndex(0);
    router.replace(`?propiedad=${slug}`, { scroll: false });
  }

  function closeProperty() {
    setActiveSlug(null);
    setConsultaOpen(false);
    router.replace(window.location.pathname, { scroll: false });
  }

  return (
    <>
      <div className={variant === "grid" ? "properties-grid-full" : "slider"} role="list">
        {properties.map((p) => (
          <button
            key={p.slug}
            className="prop-card"
            role="listitem"
            onClick={() => openProperty(p.slug)}
            aria-label={`Ver detalle de ${p.title}`}
          >
            <div className="prop-card-img">
              <img src={p.images[0]} alt={p.title} loading="lazy" />
              <span className="prop-tag">{p.operation}</span>
            </div>
            <div className="prop-card-body">
              <span className="prop-type">{p.type}</span>
              <h3>{p.title}</h3>
              <p className="prop-loc">
                <MapPin size={14} strokeWidth={2} /> {p.location}
              </p>
              <p className="prop-facts">
                {[p.surface, p.rooms, p.baths].filter(Boolean).join(" · ")}
              </p>
              {p.price && <p className="prop-price">{p.price}</p>}
            </div>
          </button>
        ))}
      </div>

      {active && !consultaOpen && (
        <div className="modal-backdrop" onClick={closeProperty}>
          <div
            className="modal-sheet"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <button className="modal-close" onClick={closeProperty} aria-label="Cerrar">
              <X size={20} />
            </button>

            <div className="modal-gallery">
              <img src={active.images[photoIndex]} alt={active.title} />
              {active.images.length > 1 && (
                <>
                  <button
                    className="modal-nav modal-nav-prev"
                    onClick={() =>
                      setPhotoIndex((i) => (i === 0 ? active.images.length - 1 : i - 1))
                    }
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    className="modal-nav modal-nav-next"
                    onClick={() =>
                      setPhotoIndex((i) => (i === active.images.length - 1 ? 0 : i + 1))
                    }
                    aria-label="Foto siguiente"
                  >
                    <ChevronRight size={22} />
                  </button>
                  <div className="modal-dots">
                    {active.images.map((_, i) => (
                      <span key={i} className={i === photoIndex ? "dot dot-active" : "dot"} />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="modal-content">
              <span className="prop-type">{active.type}</span>
              <h2>{active.title}</h2>
              <p className="prop-loc">
                <MapPin size={15} strokeWidth={2} /> {active.location}
              </p>
              <p className="prop-facts modal-facts">
                {[active.surface, active.covered, active.rooms, active.baths, active.extra]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
              {active.price && <p className="modal-price">{active.price}</p>}
              <p className="modal-description">{active.description}</p>

              {active.features.length > 0 && (
                <ul className="modal-features">
                  {active.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              )}

              <button className="btn btn-primary modal-cta" onClick={() => setConsultaOpen(true)}>
                Consultar por esta propiedad
              </button>
            </div>
          </div>
        </div>
      )}

      {active && consultaOpen && (
        <ConsultaWizard property={active} onClose={() => setConsultaOpen(false)} />
      )}
    </>
  );
}
