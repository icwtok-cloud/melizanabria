# melizanabria.com.ar

Sitio personal de Melisa Zanabria — agente inmobiliaria en APL Inmobiliaria & Desarrollos (Santa Fe).

## Antes de publicar

1. **Foto profesional**: reemplazá el placeholder verde del hero y de `/links` por una foto real
   de Melisa. Guardala en `public/melisa.jpg` y actualizá:
   - `app/page.tsx` → sección `.hero-photo-frame`
   - `app/links/page.tsx` → sección `.links-avatar`
2. **Logo oficial de APL**: por ahora el trébol es una versión simplificada dibujada en SVG.
   Si tenés el archivo vectorial oficial (mencionado como "repositorio" en el manual de marca),
   reemplazalo en los mismos lugares donde aparece `<svg className="clover">`.
3. **Propiedades**: los datos de `lib/properties.ts` se tomaron del sitio público de APL
   (aplinmobiliaria.com) al momento de crear el sitio. Antes de publicar, confirmá que sigan
   vigentes o actualizalas ahí mismo.

## Desarrollo local

```bash
npm install
npm run dev
```

Abrí http://localhost:3000

## Deploy

Pensado para Vercel (mismo flujo que alterego-site). Conectá el repo de GitHub a un proyecto
nuevo en Vercel y agregá el dominio `melizanabria.com.ar` desde Settings → Domains.
