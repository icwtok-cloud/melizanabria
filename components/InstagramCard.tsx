import Image from "next/image";
import { Instagram } from "lucide-react";

export default function InstagramCard() {
  return (
    <a
      href="https://www.instagram.com/apl.melizanabria"
      target="_blank"
      rel="noopener noreferrer"
      className="ig-card"
    >
      <span className="ig-card-avatar">
        <Image src="/melisa.jpg" alt="Melisa Zanabria" width={72} height={72} />
        <span className="ig-card-badge">
          <Instagram size={14} strokeWidth={2.4} />
        </span>
      </span>
      <span className="ig-card-text">
        <strong>@apl.melizanabria</strong>
        <span>Seguime en Instagram para ver las últimas propiedades</span>
      </span>
    </a>
  );
}
