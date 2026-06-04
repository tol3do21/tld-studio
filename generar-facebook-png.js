const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const outputDir = path.join(__dirname, 'marca');

// ── 1. PERFIL (500×500) ──────────────────────────────────────
const svgPerfil = `
<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">
  <rect width="500" height="500" fill="#0C0C0B"/>
  <text x="80" y="310" font-family="Arial Black, Helvetica Neue, sans-serif"
        font-weight="900" font-size="200" fill="#FAFAF8" letter-spacing="-8">TL</text>
  <circle cx="420" cy="310" r="30" fill="#C8893A"/>
</svg>`;

// ── 2. PORTADA FACEBOOK (820×312) ────────────────────────────
const svgPortada = `
<svg xmlns="http://www.w3.org/2000/svg" width="820" height="312" viewBox="0 0 820 312">
  <rect width="820" height="312" fill="#0C0C0B"/>

  <!-- Borde sutil -->
  <rect x="20" y="20" width="780" height="272" fill="none" stroke="#C8893A" stroke-width="0.8" opacity="0.25"/>

  <!-- Círculos decorativos -->
  <circle cx="680" cy="156" r="160" fill="none" stroke="#C8893A" stroke-width="0.8" opacity="0.12"/>
  <circle cx="680" cy="156" r="100" fill="none" stroke="#C8893A" stroke-width="0.8" opacity="0.08"/>

  <!-- Logo TLD -->
  <text x="60" y="180" font-family="Arial Black, Helvetica Neue, sans-serif"
        font-weight="900" font-size="120" fill="#FAFAF8" letter-spacing="-4">TLD</text>
  <circle cx="487" cy="105" r="12" fill="#C8893A"/>

  <!-- Línea divisoria -->
  <line x1="60" y1="210" x2="560" y2="210" stroke="#C8893A" stroke-width="0.8" opacity="0.4"/>

  <!-- Subtítulo -->
  <text x="60" y="240" font-family="Arial, Helvetica Neue, sans-serif"
        font-size="14" fill="#9C9891" letter-spacing="6">STUDIO.</text>

  <!-- Tagline -->
  <text x="60" y="272" font-family="Arial, Helvetica Neue, sans-serif"
        font-size="16" fill="#6B6863">Diseño web · Frontend · SEO · IA · Bolivia</text>
</svg>`;

// ── 3. POST FACEBOOK (1200×630) ──────────────────────────────
const svgPost = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0C0C0B"/>

  <!-- Borde -->
  <rect x="40" y="40" width="1120" height="550" fill="none" stroke="#C8893A" stroke-width="1" opacity="0.25"/>

  <!-- Círculos decorativos lado derecho -->
  <circle cx="950" cy="315" r="250" fill="none" stroke="#C8893A" stroke-width="1" opacity="0.1"/>
  <circle cx="950" cy="315" r="160" fill="none" stroke="#C8893A" stroke-width="1" opacity="0.07"/>
  <circle cx="950" cy="315" r="20" fill="#C8893A" opacity="0.6"/>

  <!-- TLD grande -->
  <text x="100" y="370" font-family="Arial Black, Helvetica Neue, sans-serif"
        font-weight="900" font-size="260" fill="#FAFAF8" letter-spacing="-10">TLD</text>
  <circle cx="910" cy="190" r="22" fill="#C8893A"/>

  <!-- Línea -->
  <line x1="100" y1="420" x2="1100" y2="420" stroke="#C8893A" stroke-width="1" opacity="0.35"/>

  <!-- STUDIO -->
  <text x="100" y="475" font-family="Arial, Helvetica Neue, sans-serif"
        font-size="22" fill="#9C9891" letter-spacing="10">STUDIO.</text>

  <!-- Tagline -->
  <text x="100" y="530" font-family="Arial, Helvetica Neue, sans-serif"
        font-size="30" fill="#FAFAF8" letter-spacing="-0.5">Diseño web con propósito.</text>

  <!-- URL -->
  <text x="100" y="575" font-family="Arial, Helvetica Neue, sans-serif"
        font-size="18" fill="#C8893A" letter-spacing="2">tldstudio.netlify.app</text>
</svg>`;

async function generar() {
  // Renderizamos al doble de resolución para nitidez en pantallas retina y Facebook
  const archivos = [
    { nombre: 'facebook-perfil.png',   svg: svgPerfil,   w: 1000, h: 1000 },
    { nombre: 'facebook-portada.png',  svg: svgPortada,  w: 1640, h: 624  },
    { nombre: 'facebook-post.png',     svg: svgPost,     w: 2400, h: 1260 },
  ];

  for (const { nombre, svg, w, h } of archivos) {
    const dest = path.join(outputDir, nombre);
    await sharp(Buffer.from(svg), { density: 300 })
      .resize(w, h)
      .png({ quality: 100, compressionLevel: 1 })
      .toFile(dest);
    console.log(`✅ ${nombre} (${w}×${h}px)`);
  }

  console.log('\nTodos los archivos guardados en /marca/');
}

generar().catch(console.error);
