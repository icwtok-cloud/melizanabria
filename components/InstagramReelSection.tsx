"use client";

import Script from "next/script";
import { MessageCircle } from "lucide-react";
import { MELISA_PHONE, buildWhatsAppLink } from "@/lib/whatsapp";

const REEL_URL = "https://www.instagram.com/reel/DV1sOY1O_b3/";

export default function InstagramReelSection() {
  const wa = buildWhatsAppLink(
    MELISA_PHONE,
    "Hola Meli! Vi tu reel en Instagram y quiero más info."
  );

  return (
    <div className="pozo-card">
      <div className="pozo-card-video reel-embed">
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={`${REEL_URL}?utm_source=ig_embed&utm_campaign=loading`}
          data-instgrm-version="14"
          style={{
            background: "#FFF",
            border: 0,
            margin: 0,
            width: "100%",
          }}
        >
          <a href="https://www.instagram.com/apl.melizanabria" target="_blank" rel="noopener noreferrer">
            Ver este reel en Instagram
          </a>
        </blockquote>
        <Script
          src="https://www.instagram.com/embed.js"
          strategy="lazyOnload"
          onLoad={() => {
            // @ts-expect-error -- instgrm se inyecta en window por el script de Instagram
            if (window.instgrm) window.instgrm.Embeds.process();
          }}
        />
      </div>
      <div className="pozo-card-body">
        <span className="prop-type">Desde Instagram</span>
        <h3>Mirá este reel</h3>
        <p>Contenido directo desde @apl.melizanabria. Escribime si querés más info sobre lo que ves acá.</p>
        <a className="btn btn-primary" href={wa} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={17} strokeWidth={2.2} />
          Consultar por WhatsApp
        </a>
      </div>
    </div>
  );
}
