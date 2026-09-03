import fs from 'fs';
const read = (f) => fs.readFileSync(f, 'utf8');
const write = (f, s) => fs.writeFileSync(f, s, 'utf8');

let idx = read('src/pages/index.astro');

// 1. Remove factoryStats array (from "const factoryStats = [" to its "];")
const ds = idx.indexOf('const factoryStats = [');
if (ds >= 0) {
  const de = idx.indexOf('];', ds);
  if (de >= 0) {
    idx = idx.slice(0, ds) + idx.slice(de + '];'.length);
    console.log('factoryStats array removed:', !idx.includes('factoryStats'));
  }
}

// 2. Remove factory-overview section block
const ss = idx.indexOf('    <section class="section factory-overview">');
if (ss >= 0) {
  const se = idx.indexOf('    </section>\n', ss);
  if (se >= 0) {
    idx = idx.slice(0, ss) + idx.slice(se + '    </section>\n'.length);
    console.log('factory-overview section removed:', !idx.includes('factory-overview'));
  }
}

write('src/pages/index.astro', idx);
console.log('remaining factory refs in index:', idx.split('\n').filter(l=>/factory|Manufacturing capability/.test(l)).length);

// 3. Delete factory images
const imgs = [
  'public/assets/factory/factory-550kv-rip-production-building.png',
  'public/assets/factory/factory-quality-inspection.png',
  'public/assets/factory/factory-ehv-testing-lab.png',
];
for (const f of imgs) {
  if (fs.existsSync(f)) { fs.rmSync(f); console.log('deleted', f); }
  else console.log('missing', f);
}
console.log('DONE');
