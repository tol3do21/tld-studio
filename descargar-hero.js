const https = require('https');
const fs = require('fs');
const path = require('path');

// Foto editorial: workspace minimalista con laptop y café — estilo neutro y limpio
const url = 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1400&q=85&fm=jpg&fit=crop&crop=center';
const dest = path.join(__dirname, 'img', 'hero.jpg');

console.log('Descargando imagen hero...');

const file = fs.createWriteStream(dest);
https.get(url, res => {
  if (res.statusCode === 200) {
    res.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log('✅ Guardada en img/hero.jpg');
    });
  } else if (res.statusCode === 301 || res.statusCode === 302) {
    // Redireccion
    https.get(res.headers.location, res2 => {
      res2.pipe(file);
      file.on('finish', () => { file.close(); console.log('✅ Guardada en img/hero.jpg'); });
    });
  } else {
    console.log('❌ Error:', res.statusCode);
  }
}).on('error', e => console.error('Error:', e.message));
