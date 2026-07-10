const { createCanvas } = require('canvas');
const fs = require('fs');

const W = 1080, H = 1080;
const canvas = createCanvas(W, H);
const ctx = canvas.getContext('2d');

// Colors
const BLACK   = '#0C0C0B';
const WHITE   = '#FAFAF8';
const AMBER   = '#C8893A';
const MUTED   = '#9C9891';
const SURFACE = '#F3F1EE';
const BORDER  = '#E2DED8';
const TEXT    = '#2A2926';

// Background
ctx.fillStyle = SURFACE;
ctx.fillRect(0, 0, W, H);

// Subtle grid lines (very faint)
ctx.strokeStyle = 'rgba(0,0,0,0.04)';
ctx.lineWidth = 1;
for (let x = 0; x <= W; x += 108) {
  ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
}
for (let y = 0; y <= H; y += 108) {
  ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
}

const LEFT = 162; // ~15% from left

// TOP LABEL — "SUCRE, BOLIVIA"
ctx.fillStyle = MUTED;
ctx.font = '500 22px sans-serif';
ctx.fillText('SUCRE, BOLIVIA', LEFT, 162);

// YEAR — right side
ctx.fillStyle = MUTED;
ctx.font = '300 20px sans-serif';
ctx.textAlign = 'right';
ctx.fillText('2026', W - 162, 162);
ctx.textAlign = 'left';

// MAIN HEADLINE — "Diseño web"
ctx.fillStyle = TEXT;
ctx.font = 'italic 900 112px serif';
ctx.fillText('Diseño web', LEFT, 440);

// MAIN HEADLINE LINE 2 — "que convierte."
ctx.fillStyle = TEXT;
ctx.font = 'italic 900 112px serif';
ctx.fillText('que convierte.', LEFT, 572);

// AMBER LINE
ctx.fillStyle = AMBER;
ctx.fillRect(LEFT, 618, 220, 3);

// SUBTITLE
ctx.fillStyle = MUTED;
ctx.font = '300 26px sans-serif';
ctx.fillText('Sitios a medida para negocios bolivianos.', LEFT, 680);

// BOTTOM — TLD Studio.
ctx.fillStyle = AMBER;
ctx.font = '500 38px sans-serif';
ctx.fillText('TLD Studio.', LEFT, 920);

// BOTTOM RIGHT — @tldstudio.bo
ctx.fillStyle = MUTED;
ctx.font = '300 22px sans-serif';
ctx.textAlign = 'right';
ctx.fillText('@tldstudio.bo', W - 162, 920);
ctx.textAlign = 'left';

// Save
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('post-presentacion.png', buffer);
console.log('✓ post-presentacion.png generado');
