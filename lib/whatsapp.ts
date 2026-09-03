// Número de Melisa en formato internacional sin signos (+54 9 342 508-8763)
export const MELISA_PHONE = "5493425088763";

export function buildWhatsAppLink(phone: string, message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}

export function propertyWhatsAppMessage(propertyUrl: string, propertyTitle: string) {
  return `Vi esta propiedad en tu web y quiero más info por favor..\n\n${propertyTitle}\n${propertyUrl}`;
}
