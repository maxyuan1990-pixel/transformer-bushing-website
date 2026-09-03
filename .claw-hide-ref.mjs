import fs from 'fs';
const read = (f) => fs.readFileSync(f, 'utf8');
const write = (f, s) => fs.writeFileSync(f, s, 'utf8');

// ---------- 1. site.js navItems ----------
let site = read('src/data/site.js');
site = site.replace(`  { label: "Reference Projects", href: "/applications/" },\n`, '');
write('src/data/site.js', site);
console.log('navItems Reference Projects removed:', !site.includes('/applications/'));

// ---------- 2. BaseLayout nav + footer + mobile ----------
let bl = read('src/layouts/BaseLayout.astro');
bl = bl.replace(`  { label: "Reference Projects", href: "/applications/" },\n`, '');
bl = bl.replace(`          <a href="/applications/">Reference Projects</a>\n`, '');
bl = bl.replace(`        <a href="/applications/">Reference Projects</a>\n`, '');
write('src/layouts/BaseLayout.astro', bl);
console.log('BaseLayout reference removed:', !bl.includes('/applications/'));

// ---------- 3. index.astro: remove cases array + cases-preview section ----------
let idx = read('src/pages/index.astro');
// remove the const cases = [...]; block
const casesStart = idx.indexOf('const cases = [');
if (casesStart >= 0) {
  const casesEnd = idx.indexOf('];', casesStart);
  if (casesEnd >= 0) {
    idx = idx.slice(0, casesStart) + idx.slice(casesEnd + '];'.length);
    console.log('cases array removed');
  }
}
// remove the cases-preview section block
const secStart = idx.indexOf('    <section class="section cases-preview">');
if (secStart >= 0) {
  const secEnd = idx.indexOf('    </section>\n', secStart);
  if (secEnd >= 0) {
    idx = idx.slice(0, secStart) + idx.slice(secEnd + '    </section>\n'.length);
    console.log('cases-preview section removed');
  }
}
write('src/pages/index.astro', idx);
console.log('index /applications refs left:', idx.split('\n').filter(l=>l.includes('/applications/')).length);
