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

// Background
ctx.fillStyle = BLACK;
ctx.fillRect(0, 0, W, H);

// Subtle grid lines (very faint white for dark mode)
ctx.strokeStyle = 'rgba(255,255,255,0.04)';
ctx.lineWidth = 1;
for (let x = 0; x <= W; x += 108) {
  ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
}
for (let y = 0; y <= H; y += 108) {
  ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
}

const LEFT = 162; // ~15% from left

// TOP LABEL
ctx.fillStyle = MUTED;
ctx.font = '500 22px sans-serif';
ctx.fillText('ESTRATEGIA / SEO', LEFT, 162);

// YEAR — right side
ctx.fillStyle = MUTED;
ctx.font = '300 20px sans-serif';
ctx.textAlign = 'right';
ctx.fillText('2026', W - 162, 162);
ctx.textAlign = 'left';

// MAIN HEADLINE
ctx.fillStyle = WHITE;
ctx.font = 'italic 900 78px serif';
ctx.fillText('Las redes', LEFT, 380);
ctx.fillText('sociales son', LEFT, 480);
ctx.fillText('para que te', LEFT, 580);
ctx.fillStyle = MUTED;
ctx.fillText('descubran.', LEFT, 680);

// SECOND PART (Google)
ctx.fillStyle = AMBER;
ctx.fillText('Google', LEFT, 820);
ctx.fillStyle = WHITE;
ctx.font = 'italic 900 52px serif';
ctx.fillText('es para que', LEFT + 260, 805);
ctx.fillText('te compren.', LEFT + 260, 865);

// BOTTOM — TLD Studio.
ctx.fillStyle = AMBER;
ctx.font = '500 38px sans-serif';
ctx.fillText('TLD Studio.', LEFT, 980);

// BOTTOM RIGHT — @tldstudio.bo
ctx.fillStyle = MUTED;
ctx.font = '300 22px sans-serif';
ctx.textAlign = 'right';
ctx.fillText('@tldstudio.bo', W - 162, 980);
ctx.textAlign = 'left';

// Save
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('post-educativo.png', buffer);
console.log('✓ post-educativo.png generado');
