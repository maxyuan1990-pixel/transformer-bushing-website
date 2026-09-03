import fs from 'fs';
const f = 'src/styles/global.css';
let s = fs.readFileSync(f, 'utf8');

const oldBg = `  background:
    linear-gradient(90deg, rgba(17, 26, 36, 0.96), rgba(17, 26, 36, 0.78)),
    url("/assets/hv-bushing-transformer-yard.jpg") center / cover;`;

const newBg = `  background: linear-gradient(90deg, #111a24, #1a2637);`;

if (s.includes(oldBg)) {
  s = s.replace(oldBg, newBg);
  fs.writeFileSync(f, s);
  console.log('cta-panel background image removed:', !s.includes('hv-bushing-transformer-yard.jpg'));
} else {
  console.log('exact block NOT found');
}
