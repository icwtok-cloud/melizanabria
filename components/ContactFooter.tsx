"use client";

import { useState } from "react";
import { MELISA_PHONE, buildWhatsAppLink } from "@/lib/whatsapp";

export default function ContactFooterForm() {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("Inversiones inmobiliarias");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    const message = `Hola Meli, soy ${name.trim()}. Quiero recibir información sobre ${topic.toLowerCase()}.`;
    const url = buildWhatsAppLink(MELISA_PHONE, message);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form-row">
        <label htmlFor="topic">Me interesa</label>
        <select id="topic" value={topic} onChange={(e) => setTopic(e.target.value)}>
          <option>Inversiones inmobiliarias</option>
          <option>Departamentos en pozo</option>
          <option>Créditos hipotecarios</option>
        </select>
      </div>
      <div className="contact-form-row">
        <label htmlFor="name">Tu nombre</label>
        <input
          id="name"
          type="text"
          placeholder="Nombre y apellido"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary contact-submit">
        Hablar por WhatsApp
      </button>
    </form>
  );
}
