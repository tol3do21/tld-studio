const puppeteer = require('puppeteer');
const path = require('path');

const paginas = [
  { nombre: 'somos',        url: 'https://tol3do21.github.io/somos-specialty-coffee-web/', scroll: 0 },
  { nombre: 'cafeteria',    url: 'http://localhost:3000/mockups/cafeteria.html',            scroll: 320 },
  { nombre: 'restaurante',  url: 'http://localhost:3000/mockups/restaurante.html',          scroll: 0 },
  { nombre: 'hotel',        url: 'http://localhost:3000/mockups/hotel.html',                scroll: 0 },
  { nombre: 'arquitectura', url: 'http://localhost:3000/mockups/arquitectura.html',         scroll: 0 },
  { nombre: 'institucional',url: 'http://localhost:3000/mockups/institucional.html',        scroll: 0 },
];

async function capturar() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  for (const { nombre, url, scroll } of paginas) {
    console.log(`📸 Capturando ${nombre}...`);
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 20000 });
      await new Promise(r => setTimeout(r, 1500));
      if (scroll > 0) await page.evaluate(y => window.scrollTo(0, y), scroll);
      await new Promise(r => setTimeout(r, 400));

      const dest = path.join(__dirname, 'img', 'portfolio', `${nombre}.jpg`);
      await page.screenshot({ path: dest, type: 'jpeg', quality: 90 });
      console.log(`  ✅ img/portfolio/${nombre}.jpg`);
    } catch (e) {
      console.log(`  ⚠️  Error: ${e.message}`);
    }
  }

  await browser.close();
  console.log('\n✅ Listo.');
}

capturar().catch(console.error);
