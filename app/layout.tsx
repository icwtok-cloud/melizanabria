import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Melisa Zanabria · APL Inmobiliaria & Desarrollos",
  description:
    "Compra, venta, alquileres, créditos hipotecarios, departamentos en pozo, inversiones y adquisiciones en el exterior. Melisa Zanabria, agente inmobiliaria en Santa Fe, en alianza con APL Inmobiliaria & Desarrollos.",
  metadataBase: new URL("https://melizanabria.com.ar"),
  openGraph: {
    title: "Melisa Zanabria · APL Inmobiliaria & Desarrollos",
    description:
      "Asesoramiento integral en compra, venta, alquileres, créditos hipotecarios, pozo e inversiones inmobiliarias en Santa Fe.",
    url: "https://melizanabria.com.ar",
    siteName: "Melisa Zanabria",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR">
      <body>{children}</body>
    </html>
  );
}
