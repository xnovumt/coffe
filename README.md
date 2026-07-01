# Coloquial ☕ — Café de Especialidad

Sitio web para **Coloquial**, un café de especialidad en San Sebastián de Mariquita (Tolima, Colombia). Construido con **Angular 21** y **Tailwind CSS v4**, con modo claro/oscuro, diseño responsive y un carrito de pedidos que finaliza por WhatsApp.

## ✨ Características

- **Diseño responsive** (mobile-first) con navegación de escritorio y menú hamburguesa en móvil.
- **Modo claro/oscuro** con toggle y persistencia en `localStorage` (respeta la preferencia del sistema en el primer arranque).
- **Hero / carrusel** con transición crossfade y autoplay (se pausa con `prefers-reduced-motion`).
- **Menú por categorías** que carga desde una API y, si no hay backend, usa un menú demo local automáticamente.
- **Carrito de pedidos** con contador, panel lateral, cantidades y **checkout por WhatsApp** (persistente en `localStorage`).
- **Formulario de contacto** con validación básica.
- **Accesibilidad**: contraste WCAG AA, foco visible por teclado, `aria-label`s y soporte de movimiento reducido.

## 🛠️ Tecnologías

- [Angular 21](https://angular.dev) — componentes standalone y **signals**
- [Tailwind CSS v4](https://tailwindcss.com) — configuración CSS-first en `src/styles.css`
- TypeScript
- Fuentes: Playfair Display + Plus Jakarta Sans (Google Fonts)
- Iconos: Font Awesome (CDN)

## 📋 Requisitos

- **Node.js** ≥ 20.19 (recomendado 22.x)
- **npm**

## 🚀 Instalación y desarrollo

```bash
npm install
npm start          # ng serve → http://localhost:4200
```

El servidor recarga automáticamente al modificar los archivos fuente.

## 📦 Build de producción

```bash
npm run build      # genera dist/coffe_shop_angular
```

## ⚙️ Configuración

| Qué | Dónde |
|-----|-------|
| Número de WhatsApp del carrito | [`src/app/services/cart.service.ts`](src/app/services/cart.service.ts) → `whatsappPhone` |
| URL de la API del menú | [`src/app/services/menu.service.ts`](src/app/services/menu.service.ts) → `apiUrl` (por defecto `http://localhost:3000/api/menu`) |

> Si la API del menú no responde, la app carga un **menú demo local** automáticamente (modo demostración), así que corre sin backend.

## 📁 Estructura

```
src/
├─ app/
│  ├─ components/     # navbar, footer, image-slider, product-card, cart-drawer
│  ├─ pages/          # home, menu, about, contact
│  ├─ services/       # theme, menu, cart
│  ├─ app.routes.ts   # rutas
│  └─ app.ts          # componente raíz
├─ styles.css         # tema: paleta café, modo oscuro, tokens de Tailwind
└─ index.html
public/               # logo (coloquial_logo.svg), favicon
```

## 📜 Scripts

| Comando | Descripción |
|---------|-------------|
| `npm start` | Servidor de desarrollo (`ng serve`) |
| `npm run build` | Compila para producción en `dist/` |
| `npm run watch` | Build incremental en modo desarrollo |
| `npm test` | Ejecuta pruebas unitarias (`ng test`) — aún no hay pruebas |

## 📄 Licencia

Proyecto privado. Todos los derechos reservados © Coloquial.
