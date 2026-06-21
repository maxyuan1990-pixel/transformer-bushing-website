const { readFileSync, readdirSync, renameSync, existsSync, statSync } = require('fs');
const { join, extname } = require('path');

const dir = __dirname;

// projects.js data - the web naming convention we want to match
const projectImageMap = {
  "220kV-Bushing-in-Operation-on-the-Lhasa-Nyingchi-Railway": {
    slug: "lhasa-nyingchi-railway",
    images: [
      "220kV-Bushing-in-Operation-on-the-Lhasa-Nyingchi-Railway-1.jpg",
      "220kV-Bushing-in-Operation-on-the-Lhasa-Nyingchi-Railway-2.png",
      "220kV-Bushing-in-Operation-on-the-Lhasa-Nyingchi-Railway-3.jpg",
      "220kV-Bushing-in-Operation-on-the-Lhasa-Nyingchi-Railway-4.jpg"
    ]
  },
  "252kV-Transformer-Bushing-in-Operation-at-Sichuan-Batang-Substation--China-State-Grid-Project-": {
    slug: "sichuan-batang-substation",
    images: [
      "252kV-Transformer-Bushing-in-Operation-at-Sichuan-Batang-Substation-China-State-Grid-Project-1.png",
      "252kV-Transformer-Bushing-in-Operation-at-Sichuan-Batang-Substation-China-State-Grid-Project-2.png",
      "252kV-Transformer-Bushing-in-Operation-at-Sichuan-Batang-Substation-China-State-Grid-Project-3.png"
    ]
  },
  "252kV-Transformer-Bushing-in-Operation-at-Hebei-Project": {
    slug: "hebei-project",
    images: [
      "252kV-Transformer-Bushing-in-Operation-at-Hebei-Project-1.png",
      "252kV-Transformer-Bushing-in-Operation-at-Hebei-Project-2.png"
    ]
  },
  "126kV-Transformer-Bushing-in-Operation-at-Hejing-Yixin-Photovoltaic-Grid-Connected-Power-Station": {
    slug: "hejing-yixin-photovoltaic",
    images: [
      "126kV-Transformer-Bushing-in-Operation-at-Hejing-Yixin-Photovoltaic-Grid-Connected-Power-Station-1.png",
      "126kV-Transformer-Bushing-in-Operation-at-Hejing-Yixin-Photovoltaic-Grid-Connected-Power-Station-2.png",
      "126kV-Transformer-Bushing-in-Operation-at-Hejing-Yixin-Photovoltaic-Grid-Connected-Power-Station-3.png",
      "126kV-Transformer-Bushing-in-Operation-at-Hejing-Yixin-Photovoltaic-Grid-Connected-Power-Station-4.png"
    ]
  },
  "330kV-Transformer-Bushing-in-Operation-at-the-Energy-Storage-Power-Station-of-the-Gansu-Longyuan-Linze-Banqiao-Beitan-500MW-Photovoltaic-Desert-Control-Project-": {
    slug: "gansu-longyuan-solar-storage",
    images: [
      "330kV-Transformer-Bushing-for-Gansu-Longyuan-500MW-Photovoltaic-Desert-Control-Project-1.jpg",
      "330kV-Transformer-Bushing-for-Gansu-Longyuan-500MW-Photovoltaic-Desert-Control-Project-2.png"
    ]
  },
  "126kV-GIS-Bushing-in-Operation-at-Ningxia-Dadi-Tire-Project": {
    slug: "ningxia-dadi-tire",
    images: [
      "126kV-GIS-Bushing-in-Operation-at-Ningxia-Dadi-Tire-Project-1.png",
      "126kV-GIS-Bushing-in-Operation-at-Ningxia-Dadi-Tire-Project-2.png",
      "126kV-GIS-Bushing-in-Operation-at-Ningxia-Dadi-Tire-Project-3.png",
      "126kV-GIS-Bushing-in-Operation-at-Ningxia-Dadi-Tire-Project-4.png",
      "126kV-GIS-Bushing-in-Operation-at-Ningxia-Dadi-Tire-Project-5.png"
    ]
  },
  "110kV-Transformer-Bushing-in-Operation-at-Yunnan-Huayou-Youtian-Project": {
    slug: "yunnan-huayou-youtian",
    images: [
      "110kV-Transformer-Bushing-in-Operation-at-Yunnan-Huayou-Youtian-Project-1.png"
    ]
  },
  "330kV-GIS-Bushing-in-Operation-at-Shaanxi-Linyou-2-350MW-Low-Calorific-Value-Coal-Fired-Power-Plant": {
    slug: "shaanxi-linyou-coal-power",
    images: [
      "330kV-GIS-Bushing-in-Operation-at-Shaanxi-Linyou-2x350MW-Coal-Fired-Power-Plant-1.png",
      "330kV-GIS-Bushing-in-Operation-at-Shaanxi-Linyou-2x350MW-Coal-Fired-Power-Plant-2.png",
      "330kV-GIS-Bushing-in-Operation-at-Shaanxi-Linyou-2x350MW-Coal-Fired-Power-Plant-3.png",
      "330kV-GIS-Bushing-in-Operation-at-Shaanxi-Linyou-2x350MW-Coal-Fired-Power-Plant-4.png",
      "330kV-GIS-Bushing-in-Operation-at-Shaanxi-Linyou-2x350MW-Coal-Fired-Power-Plant-5.png",
      "330kV-GIS-Bushing-in-Operation-at-Shaanxi-Linyou-2x350MW-Coal-Fired-Power-Plant-6.png",
      "330kV-GIS-Bushing-in-Operation-at-Shaanxi-Linyou-2x350MW-Coal-Fired-Power-Plant-7.png"
    ]
  },
  "126kV-Oil-SF6-Bushing-in-Operation-at-Jiangxi-Jiepai-Hydropower-Station": {
    slug: "jiangxi-jiepai-hydropower",
    images: [
      "126kV-Oil-SF6-Bushing-in-Operation-at-Jiangxi-Jiepai-Hydropower-Station-1.png",
      "126kV-Oil-SF6-Bushing-in-Operation-at-Jiangxi-Jiepai-Hydropower-Station-2.png",
      "126kV-Oil-SF6-Bushing-in-Operation-at-Jiangxi-Jiepai-Hydropower-Station-3.png",
      "126kV-Oil-SF6-Bushing-in-Operation-at-Jiangxi-Jiepai-Hydropower-Station-4.png"
    ]
  },
  "126kV-Transformer-Bushing-in-Operation-at-Xinjiang-Project": {
    slug: "xinjiang-project",
    images: [
      "126kV-Transformer-Bushing-in-Operation-at-Xinjiang-Project-1.png",
      "126kV-Transformer-Bushing-in-Operation-at-Xinjiang-Project-2.png",
      "126kV-Transformer-Bushing-in-Operation-at-Xinjiang-Project-3.png",
      "126kV-Transformer-Bushing-in-Operation-at-Xinjiang-Project-4.png",
      "126kV-Transformer-Bushing-in-Operation-at-Xinjiang-Project-5.png",
      "126kV-Transformer-Bushing-in-Operation-at-Xinjiang-Project-6.png"
    ]
  },
  "252kV-Transformer-Bushing-in-Operation-on-the-Chengdu-Chongqing-High-Speed-Railway": {
    slug: "chengdu-chongqing-railway",
    images: [
      "252kV-Transformer-Bushing-in-Operation-on-the-Chengdu-Chongqing-High-Speed-Railway-1.png",
      "252kV-Transformer-Bushing-in-Operation-on-the-Chengdu-Chongqing-High-Speed-Railway-2.png"
    ]
  },
  "220kV-Transformer-Bushing-in-Operation-at-Wuhai-Power-Supply-Bureau-s-220-Baoshan-Substation": {
    slug: "wuhai-baoshan-substation",
    images: [
      "220kV-Transformer-Bushing-in-Operation-at-Wuhai-Power-Supply-Bureaus-220kV-Baoshan-Substation-1.png"
    ]
  }
};

// Shared image IDs that appear in all projects
const sharedIds = new Set([
  "1731894078716949488901574656",
  "1731894930716953063098699776",
  "1768468846870355185425739776",
  "1768524315870587839131742208",
  "1768811237871791276305608704",
  "1769394598874238072085098496"
]);

// Read the projects_data.json
const projectsData = JSON.parse(readFileSync(join(dir, 'projects_data.json'), 'utf-8'));

// Build mapping: numeric_id → target_filename
const mapping = {};

for (const project of projectsData) {
  const htmlFile = project.file.replace('.html', '');
  const projInfo = projectImageMap[htmlFile];
  
  if (!projInfo) {
    console.log(`SKIP: ${htmlFile} — not in projectImageMap`);
    continue;
  }

  // Get unique image IDs (not shared)
  const uniqueIds = project.images.filter(id => !sharedIds.has(id));
  
  console.log(`\n=== ${htmlFile} ===`);
  console.log(`  Total images: ${project.images.length}, Unique: ${uniqueIds.length}, Expected: ${projInfo.images.length}`);
  
  if (uniqueIds.length !== projInfo.images.length) {
    console.log(`  WARNING: unique count (${uniqueIds.length}) != expected (${projInfo.images.length})`);
  }

  // Map unique IDs → target names
  for (let i = 0; i < Math.min(uniqueIds.length, projInfo.images.length); i++) {
    const numId = uniqueIds[i];
    const targetName = projInfo.images[i];
    mapping[numId] = targetName;
    console.log(`  ${numId} → ${targetName}`);
  }
}

console.log(`\n=== Total mappings: ${Object.keys(mapping).length} ===`);

// Now rename the files
const allFiles = readdirSync(dir);
let renamed = 0;
let skipped = 0;
let errors = 0;

for (const [numId, targetName] of Object.entries(mapping)) {
  // Find the file with this numeric ID
  const candidates = allFiles.filter(f => f.startsWith(numId + '.'));
  
  if (candidates.length === 0) {
    console.log(`NOT FOUND: ${numId}.* (target: ${targetName})`);
    errors++;
    continue;
  }
  
  const srcFile = candidates[0];
  const srcPath = join(dir, srcFile);
  const dstPath = join(dir, targetName);
  
  if (existsSync(dstPath)) {
    console.log(`EXISTS: ${targetName} — skipping`);
    skipped++;
    continue;
  }
  
  try {
    renameSync(srcPath, dstPath);
    console.log(`RENAMED: ${srcFile} → ${targetName}`);
    renamed++;
  } catch (err) {
    console.log(`ERROR: ${srcFile} → ${targetName}: ${err.message}`);
    errors++;
  }
}

console.log(`\n=== Done: ${renamed} renamed, ${skipped} skipped, ${errors} errors ===`);
