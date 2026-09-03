import fs from 'fs';
const read = (f) => fs.readFileSync(f, 'utf8');
const write = (f, s) => fs.writeFileSync(f, s, 'utf8');

const pages = ['gis', 'oil-air', 'oil-oil', 'oil-sf6', 'wall'];
for (const key of pages) {
  const file = `src/pages/products/${key}-bushing.astro`;
  let s = read(file);
  const block = `  <div class="tech-diagram">\n    <img src="/assets/products/tech-diagram-${key}.png" alt="${key.replace('oil-','').toUpperCase()} Bushing Technical Diagram" loading="lazy" />\n  </div>\n`;
  // build alt variants
  const altMap = {
    'gis': 'GIS Outlet Bushing Technical Diagram',
    'oil-air': 'Oil-Air Transformer Bushing Technical Diagram',
    'oil-oil': 'Oil-Oil Transformer Bushing Technical Diagram',
    'oil-sf6': 'Oil-SF6 Transformer Bushing Technical Diagram',
    'wall': 'Wall Bushing Technical Diagram',
  };
  const alt = altMap[key];
  const exact = `  <div class="tech-diagram">\n    <img src="/assets/products/tech-diagram-${key}.png" alt="${alt}" loading="lazy" />\n  </div>\n`;
  if (s.includes(exact)) {
    s = s.replace(exact, '');
    write(file, s);
    console.log(`removed tech-diagram block in ${key}: true`);
  } else {
    console.log(`tech-diagram block NOT exact-match in ${key}`);
  }
}

// delete the 5 image files
const files = [
  'public/assets/products/tech-diagram-gis.png',
  'public/assets/products/tech-diagram-oil-air.png',
  'public/assets/products/tech-diagram-oil-oil.png',
  'public/assets/products/tech-diagram-oil-sf6.png',
  'public/assets/products/tech-diagram-wall.png',
];
for (const f of files) {
  if (fs.existsSync(f)) { fs.rmSync(f); console.log('deleted', f); }
  else console.log('missing', f);
}
console.log('DONE');
