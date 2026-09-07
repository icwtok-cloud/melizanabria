import { pozoInvestment } from "@/lib/properties";
import { MELISA_PHONE, buildWhatsAppLink } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

export default function PozoInvestmentCard() {
  const wa = buildWhatsAppLink(
    MELISA_PHONE,
    `Hola Meli! Vi el video de "${pozoInvestment.title}" y quiero más info sobre las unidades disponibles.`
  );

  return (
    <div className="pozo-card">
      <div className="pozo-card-video">
        <video
          src={pozoInvestment.video}
          controls
          playsInline
          preload="metadata"
        />
      </div>
      <div className="pozo-card-body">
        <span className="prop-type">Departamentos en pozo</span>
        <h3>{pozoInvestment.title}</h3>
        <p>{pozoInvestment.description}</p>
        <a className="btn btn-primary" href={wa} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={17} strokeWidth={2.2} />
          Consultar por WhatsApp
        </a>
      </div>
    </div>
  );
}
