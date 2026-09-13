"use client";

/**
 * ConsultaWizard
 * -----------------------------------------------------------------------
 * Wizard de consulta del comprador. Diseñado con foco en comportamiento
 * de oferta y demanda para maximizar la tasa de finalización hasta el
 * envío del WhatsApp:
 *
 * 1) Arranca directo por "intención" (sin pedir datos personales antes).
 *    Pedir un dato personal como primer paso es la principal fuente de
 *    abandono en formularios — la gente entra "a mirar" y un muro de
 *    nombre/celular la espanta. Acá el primer tap es gratis y fácil.
 *
 * 2) Solo maneja intención de COMPRA (más consulta/tasación como
 *    salidas rápidas). No hay opción de alquiler: este es el embudo de
 *    comprador de propiedades, y mezclar alquiler diluye la conversión
 *    y ensucia el mensaje que le llega a Meli.
 *
 * 3) El dato de contacto (nombre + celular) se pide recién en el paso
 *    final, junto al resumen y el botón de enviar. Para ese punto la
 *    persona ya "invirtió" 2-3 respuestas — el efecto de compromiso
 *    progresivo (foot-in-the-door / sunk cost) hace que dejar el dato
 *    se sienta como el paso lógico para no perder lo que ya avanzó, en
 *    vez de una barrera de entrada.
 *
 * 4) Barra de progreso visible desde el primer paso con 1 segmento ya
 *    completado ("endowed progress effect": arrancar con una porción
 *    de la barra ya llena aumenta la tasa de finalización aunque no
 *    haya trabajo real hecho todavía).
 *
 * 5) El camino corto (consulta / tasación) salta directo casi al final,
 *    mostrando la barra casi completa — refuerza "ya casi termino" y
 *    baja la percepción de esfuerzo restante (gradiente de meta).
 *
 * Si la propiedad no tiene precio numérico (sortPrice), se omite el
 * slider de oferta y se pasa directo a capital/forma de pago.
 */

import { useMemo, useState } from "react";
import { Property } from "@/lib/properties";
import { MELISA_PHONE, buildWhatsAppLink } from "@/lib/whatsapp";

type Intent = "COMPRAR" | "TASAR" | "CONSULTA";

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
const INTENT_OPTIONS: { value: Intent; label: string; helper: string }[] = [
  { value: "COMPRAR", label: "Quiero comprarla", helper: "Armamos una propuesta en 3 pasos rápidos" },
  { value: "TASAR", label: "Quiero tasar la mía", helper: "Te contactamos con una valuación" },
  { value: "CONSULTA", label: "Solo tengo una consulta", helper: "Sin compromiso, respondemos rápido" },
];

function intentLabel(intent: Intent | null) {
  return (
    {
      COMPRAR: "Quiero hacer una propuesta de compra",
      TASAR: "Quiero tasar mi propiedad",
      CONSULTA: "Solo quiero hacer una consulta",
    }[intent || "CONSULTA"] || "Consulta general"
  );
}

function fmt(n: number) {
  return Math.round(n).toLocaleString("en-US");
}

// Pasos del camino "compra" completo. El camino corto (tasar/consulta)
// salta de INTENCION directo a RESUMEN.
const STEPS = ["INTENCION", "OFERTA", "PLAZO", "RESUMEN"] as const;
type Step = (typeof STEPS)[number];

export default function ConsultaWizard({
  property,
  onClose,
}: {
  property: Property;
  onClose: () => void;
}) {
  const hasPrice = typeof property.sortPrice === "number";

  const [step, setStep] = useState<Step>("INTENCION");
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

  // Progreso: en INTENCION ya mostramos 1 segmento lleno (endowed
  // progress). En el camino corto, saltar a RESUMEN llena casi toda la
  // barra de una, reforzando "ya casi termino".
  const stepIndex = STEPS.indexOf(step);
  const filledDots = step === "INTENCION" ? 1 : stepIndex + 1;

  function toggleCondition(c: string) {
    setConditions((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  }

  function chooseIntent(value: Intent) {
    setIntent(value);
    // Avanza solo, sin pedir un "Continuar" extra: menos taps, más inercia.
    setStep(value === "COMPRAR" ? "OFERTA" : "RESUMEN");
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
    if (name.trim().length < 2) {
      setError("Ingresá tu nombre y apellido.");
      return;
    }
    if (phone.trim().length < 6) {
      setError("Ingresá un celular válido.");
      return;
    }
    setError(null);
    const url = buildWhatsAppLink(MELISA_PHONE, buildMessage());
    window.open(url, "_blank", "noopener");
    onClose();
  }

  const titles: Record<Step, string> = {
    INTENCION: "¿Qué te gustaría hacer?",
    OFERTA: "¿Cuánto querés ofrecer?",
    PLAZO: "Contanos los detalles",
    RESUMEN: "Último paso: así queda tu consulta",
  };

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
            <h2>{titles[step]}</h2>
            <p className="muted">
              {property.title}
              {property.price ? ` · ${property.price}` : ""}
            </p>
          </div>

          <div className="wizprogress">
            {STEPS.map((_, i) => (
              <span key={i} className={i < filledDots ? "done" : ""} />
            ))}
          </div>

          {/* Paso 1: intención (arranca acá, sin pedir datos) */}
          {step === "INTENCION" && (
            <div className="wizstep">
              <div className="qlabel">Elegí una opción para empezar</div>
              <div className="chipgrid">
                {INTENT_OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    className={intent === o.value ? "wchip selected" : "wchip"}
                    onClick={() => chooseIntent(o.value)}
                  >
                    <span>{o.label}</span>
                  </button>
                ))}
              </div>
              <div className="notice">⚡ Es rápido: no te pedimos ningún dato todavía.</div>
            </div>
          )}

          {/* Paso 2: monto + capital + forma de pago (solo COMPRAR) */}
          {step === "OFERTA" && (
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
                <button className="btn btn-ghost" onClick={() => setStep("INTENCION")}>
                  Volver
                </button>
                <button
                  className="btn btn-primary"
                  disabled={capitalIdx === null || paymentIdx === null}
                  onClick={() => setStep("PLAZO")}
                >
                  Ya casi termino →
                </button>
              </div>
            </div>
          )}

          {/* Paso 3: plazo + condicionantes (solo COMPRAR) */}
          {step === "PLAZO" && (
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
                <button className="btn btn-ghost" onClick={() => setStep("OFERTA")}>
                  Volver
                </button>
                <button className="btn btn-primary" disabled={!timeframe} onClick={() => setStep("RESUMEN")}>
                  Ver resumen y enviar →
                </button>
              </div>
            </div>
          )}

          {/* Paso 4: resumen + datos de contacto + envío */}
          {step === "RESUMEN" && (
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
              </div>

              <div className="qlabel" style={{ marginTop: 16 }}>
                ¿A dónde te contestamos?
              </div>
              <div className="qhelp small">Es lo último que falta — con esto Meli te responde directo.</div>
              <div className="formgrid">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nombre y apellido"
                  autoFocus
                />
              </div>
              <div className="formgrid" style={{ marginTop: 10 }}>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Celular (Ej: 342 508-8763)"
                  inputMode="tel"
                />
              </div>
              {error && <div className="notice notice-error">{error}</div>}
              <div className="notice">
                🔒 Solo se usa para que Meli te responda por WhatsApp. No se comparte con nadie más. Meli suele
                responder el mismo día.
              </div>
              <div className="wizactions">
                <button
                  className="btn btn-ghost"
                  onClick={() => setStep(intent === "COMPRAR" ? "PLAZO" : "INTENCION")}
                >
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
