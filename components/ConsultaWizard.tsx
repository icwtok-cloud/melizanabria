"use client";

/**
 * ConsultaWizard
 * -----------------------------------------------------------------------
 * Adaptado del wizard de comprador de PROPOMI (BuyerIdentityModal.tsx +
 * OfferModal.tsx): mismo flujo de pasos con controles cerrados (slider +
 * chips, sin texto libre), pero acá no hay backend/marketplace en el
 * medio — el paso final arma un mensaje prolijo y abre WhatsApp directo
 * con el número de Meli (lib/whatsapp.ts).
 *
 * Se agregó un paso de "intención" (Comprar / Alquilar / Tasar la mía /
 * Solo consulta) porque, a diferencia de Propomi (que solo maneja
 * ofertas de compra en un marketplace), Meli necesita cubrir los 4
 * casos de uso desde el mismo botón "Consultar" de cada propiedad.
 *
 * Si la propiedad no tiene precio numérico (sortPrice), se omite el
 * paso de "cuánto ofrecés" y se pasa directo a capital/forma de pago.
 */

import { useMemo, useState } from "react";
import { Property } from "@/lib/properties";
import { MELISA_PHONE, buildWhatsAppLink } from "@/lib/whatsapp";

type Intent = "COMPRAR" | "ALQUILAR" | "TASAR" | "CONSULTA";

const CAPITAL_BUCKETS = [
  { label: "Menos de USD 50.000", value: 30000 },
  { label: "USD 50.000 – 80.000", value: 50000 },
  { label: "USD 80.000 – 120.000", value: 80000 },
  { label: "Más de USD 120.000", value: 120000 },
];
const PAYMENT_FORMS = [
  { label: "Contado", value: "CASH" },
  { label: "Mixta", value: "MIXED" },
  { label: "Financiación", value: "FINANCING" },
];
const TIMEFRAMES = ["0-30 días", "30-60 días", "60-90 días", "Más de 90 días"];
const CONDITIONS = [
  "Sujeto a aprobación de crédito",
  "Necesito escritura rápida",
  "Busco flexibilidad de mudanza",
  "Evalúo otras propiedades",
  "Sin condicionantes particulares",
];
const INTENT_OPTIONS: { value: Intent; label: string }[] = [
  { value: "COMPRAR", label: "Quiero comprarla" },
  { value: "ALQUILAR", label: "Me interesa alquilarla" },
  { value: "TASAR", label: "Quiero tasar la mía" },
  { value: "CONSULTA", label: "Solo tengo una consulta" },
];

function intentLabel(intent: Intent | null) {
  return (
    {
      COMPRAR: "Quiero hacer una propuesta de compra",
      ALQUILAR: "Me interesa alquilar",
      TASAR: "Quiero tasar mi propiedad",
      CONSULTA: "Solo quiero hacer una consulta",
    }[intent || "CONSULTA"] || "Consulta general"
  );
}

function fmt(n: number) {
  return Math.round(n).toLocaleString("en-US");
}

export default function ConsultaWizard({
  property,
  onClose,
}: {
  property: Property;
  onClose: () => void;
}) {
  const hasPrice = typeof property.sortPrice === "number";
  const STEP_COUNT = 4;

  const [step, setStep] = useState(0); // 0 = identidad, 1..4 = wizard
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [intent, setIntent] = useState<Intent | null>(null);
  const [pct, setPct] = useState(8);
  const [capitalIdx, setCapitalIdx] = useState<number | null>(null);
  const [paymentIdx, setPaymentIdx] = useState<number | null>(null);
  const [timeframe, setTimeframe] = useState<string | null>(null);
  const [conditions, setConditions] = useState<string[]>([]);

  const amount = useMemo(() => {
    if (!hasPrice) return null;
    return Math.round((property.sortPrice as number) * (1 - pct / 100));
  }, [hasPrice, property.sortPrice, pct]);

  function toggleCondition(c: string) {
    setConditions((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  }

  function submitIdentity() {
    if (name.trim().length < 2) {
      setError("Ingresá tu nombre y apellido.");
      return;
    }
    if (phone.trim().length < 6) {
      setError("Ingresá un celular válido.");
      return;
    }
    setError(null);
    setStep(1);
  }

  function continueFromIntent() {
    if (!intent) return;
    // Si no es una propuesta de compra, saltamos directo al resumen
    setStep(intent === "COMPRAR" ? 2 : 4);
  }

  function buildMessage() {
    const lines: string[] = [];
    lines.push(`Hola Meli! Te escribo por esta propiedad:`);
    lines.push(`${property.title}`);
    if (property.price) lines.push(`Precio publicado: ${property.price}`);
    lines.push("");
    lines.push(`Mi consulta es: ${intentLabel(intent)}`);

    if (intent === "COMPRAR") {
      if (amount !== null) lines.push(`Ofrezco: USD ${fmt(amount)}`);
      if (capitalIdx !== null) lines.push(`Capital disponible: ${CAPITAL_BUCKETS[capitalIdx].label}`);
      if (paymentIdx !== null) lines.push(`Forma de pago: ${PAYMENT_FORMS[paymentIdx].label}`);
      if (timeframe) lines.push(`Plazo estimado: ${timeframe}`);
      if (conditions.length) lines.push(`Aclaraciones: ${conditions.join(", ")}`);
    }

    lines.push("");
    lines.push(`Mis datos:`);
    lines.push(`Nombre: ${name}`);
    lines.push(`Celular: ${phone}`);

    return lines.join("\n");
  }

  function sendWhatsApp() {
    const url = buildWhatsAppLink(MELISA_PHONE, buildMessage());
    window.open(url, "_blank", "noopener");
    onClose();
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-sheet wizard-sheet"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Consultar por ${property.title}`}
      >
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">
          ×
        </button>

        <div className="wizard-content">
          <div className="modalhead">
            <span className="eyebrow">Consulta</span>
            <h2>{step === 0 ? "¿Cómo te contactamos?" : "Contanos qué necesitás"}</h2>
            <p className="muted">
              {property.title}
              {property.price ? ` · ${property.price}` : ""}
            </p>
          </div>

          {step > 0 && (
            <div className="wizprogress">
              {Array.from({ length: STEP_COUNT }).map((_, i) => (
                <span key={i} className={i < step ? "done" : ""} />
              ))}
            </div>
          )}

          {/* Paso 0: identidad */}
          {step === 0 && (
            <div className="wizstep">
              <div className="qlabel">Nombre y apellido</div>
              <div className="formgrid">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: María Fernández"
                  autoFocus
                />
              </div>
              <div className="qlabel" style={{ marginTop: 14 }}>
                Celular
              </div>
              <div className="formgrid">
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ej: 342 508-8763"
                  inputMode="tel"
                />
              </div>
              {error && <div className="notice notice-error">{error}</div>}
              <div className="notice">
                🔒 Esto se usa solo para que Meli te responda por WhatsApp. No se comparte con nadie más.
              </div>
              <div className="wizactions">
                <button className="btn btn-ghost" onClick={onClose}>
                  Cancelar
                </button>
                <button className="btn btn-primary" onClick={submitIdentity}>
                  Continuar
                </button>
              </div>
            </div>
          )}

          {/* Paso 1: intención */}
          {step === 1 && (
            <div className="wizstep">
              <div className="qlabel">¿Qué te gustaría hacer?</div>
              <div className="chipgrid">
                {INTENT_OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    className={intent === o.value ? "wchip selected" : "wchip"}
                    onClick={() => setIntent(o.value)}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
              <div className="wizactions">
                <button className="btn btn-ghost" onClick={() => setStep(0)}>
                  Volver
                </button>
                <button className="btn btn-primary" disabled={!intent} onClick={continueFromIntent}>
                  Continuar
                </button>
              </div>
            </div>
          )}

          {/* Paso 2: monto + capital + forma de pago (solo COMPRAR) */}
          {step === 2 && (
            <div className="wizstep">
              {hasPrice && (
                <>
                  <div className="qlabel">¿Cuánto querés ofrecer?</div>
                  <div className="qhelp">Ajustá el control — sin escribir montos a mano.</div>
                  <div className="sliderbox">
                    <div className="slidervalue">USD {fmt(amount as number)}</div>
                    <div className="sliderref">
                      {pct === 0 ? "Precio pedido" : `${pct}% por debajo del pedido (${property.price})`}
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={15}
                      step={1}
                      value={pct}
                      onChange={(e) => setPct(Number(e.target.value))}
                    />
                    <div className="quickrow">
                      {[0, 5, 8, 12, 15].map((v) => (
                        <button
                          key={v}
                          className={pct === v ? "quickbtn active" : "quickbtn"}
                          onClick={() => setPct(v)}
                        >
                          {v === 0 ? "Pedido" : `-${v}%`}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
              <div className="qlabel" style={{ marginTop: hasPrice ? 18 : 0 }}>
                ¿Con cuánto capital disponible contás?
              </div>
              <div className="qhelp small">Es un rango, no necesitás el monto exacto.</div>
              <div className="chipgrid">
                {CAPITAL_BUCKETS.map((c, i) => (
                  <button
                    key={c.label}
                    className={capitalIdx === i ? "wchip selected" : "wchip"}
                    onClick={() => setCapitalIdx(i)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              <div className="qlabel">¿Cómo pensás pagar?</div>
              <div className="chipgrid triple">
                {PAYMENT_FORMS.map((f, i) => (
                  <button
                    key={f.label}
                    className={paymentIdx === i ? "wchip selected" : "wchip"}
                    onClick={() => setPaymentIdx(i)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <div className="wizactions">
                <button className="btn btn-ghost" onClick={() => setStep(1)}>
                  Volver
                </button>
                <button
                  className="btn btn-primary"
                  disabled={capitalIdx === null || paymentIdx === null}
                  onClick={() => setStep(3)}
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {/* Paso 3: plazo + condicionantes (solo COMPRAR) */}
          {step === 3 && (
            <div className="wizstep">
              <div className="qlabel">¿En qué plazo podrías cerrar la operación?</div>
              <div className="chipgrid">
                {TIMEFRAMES.map((t) => (
                  <button
                    key={t}
                    className={timeframe === t ? "wchip selected" : "wchip"}
                    onClick={() => setTimeframe(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="qlabel">¿Hay algo que quieras aclarar?</div>
              <div className="qhelp small">Opcional · elegí todas las que apliquen</div>
              <div className="chipgrid">
                {CONDITIONS.map((c) => (
                  <button
                    key={c}
                    className={
                      (conditions.includes(c) ? "wchip selected" : "wchip") +
                      (c === "Sin condicionantes particulares" ? " wide" : "")
                    }
                    onClick={() => toggleCondition(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="wizactions">
                <button className="btn btn-ghost" onClick={() => setStep(2)}>
                  Volver
                </button>
                <button className="btn btn-primary" disabled={!timeframe} onClick={() => setStep(4)}>
                  Continuar
                </button>
              </div>
            </div>
          )}

          {/* Paso 4: resumen y envío */}
          {step === 4 && (
            <div className="wizstep">
              <div className="qlabel">Así queda tu consulta</div>
              <div className="summarycard">
                <div className="summaryrow">
                  <span>Motivo</span>
                  <b>{intentLabel(intent)}</b>
                </div>
                {intent === "COMPRAR" && (
                  <>
                    {amount !== null && (
                      <div className="summaryrow">
                        <span>Monto ofertado</span>
                        <b>USD {fmt(amount)}</b>
                      </div>
                    )}
                    <div className="summaryrow">
                      <span>Capital disponible</span>
                      <b>{capitalIdx !== null ? CAPITAL_BUCKETS[capitalIdx].label : "—"}</b>
                    </div>
                    <div className="summaryrow">
                      <span>Forma de pago</span>
                      <b>{paymentIdx !== null ? PAYMENT_FORMS[paymentIdx].label : "—"}</b>
                    </div>
                    <div className="summaryrow">
                      <span>Plazo</span>
                      <b>{timeframe || "—"}</b>
                    </div>
                    <div className="summaryrow">
                      <span>Aclaraciones</span>
                      <b>{conditions.length ? conditions.join(", ") : "Ninguna"}</b>
                    </div>
                  </>
                )}
                <div className="summaryrow">
                  <span>Nombre</span>
                  <b>{name}</b>
                </div>
                <div className="summaryrow">
                  <span>Celular</span>
                  <b>{phone}</b>
                </div>
              </div>
              <div className="notice">
                📲 Al continuar se abre WhatsApp con el mensaje ya redactado — vos solo tenés que enviarlo.
              </div>
              <div className="wizactions">
                <button className="btn btn-ghost" onClick={() => setStep(intent === "COMPRAR" ? 3 : 1)}>
                  Volver
                </button>
                <button className="btn btn-primary" onClick={sendWhatsApp}>
                  Enviar por WhatsApp
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
