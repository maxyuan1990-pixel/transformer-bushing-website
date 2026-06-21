const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');
const { execSync } = require('child_process');

const assetsDir = 'D:/website/public/assets/projects';
const projectsFile = 'D:/website/src/data/projects.js';

// Read the projects data
let projectsContent = readFileSync(projectsFile, 'utf-8');

// Parse the projects array manually (avoid eval)
// Extract title and images arrays
const projectPattern = /\{\s*slug:\s*"([^"]+)"[^}]*title:\s*"([^"]+)"[^}]*images:\s*\[([^\]]*)\]/gs;
const projects = [];
let m;
while ((m = projectPattern.exec(projectsContent)) !== null) {
    const slug = m[1];
    const title = m[2];
    const imagesStr = m[3];
    const images = [...imagesStr.matchAll(/"([^"]+)"/g)].map(x => x[1]);
    projects.push({ slug, title, images });
}

console.log('Found ' + projects.length + ' projects\n');

// For each project, rename its images
for (const proj of projects) {
    console.log('--- ' + proj.title.substring(0, 70) + ' ---');
    
    // Create clean filename prefix from title
    // Remove special chars, keep alphanumeric and spaces
    let prefix = proj.title
        .replace(/[×]/g, 'x')       // × → x
        .replace(/[^\w\s-]/g, '')   // remove special chars
        .replace(/\s+/g, '-')       // spaces → dashes
        .replace(/-+/g, '-')        // collapse dashes
        .replace(/^-|-$/g, '');     // trim dashes
    
    const newNames = [];
    
    for (let i = 0; i < proj.images.length; i++) {
        const oldName = proj.images[i];
        const ext = oldName.split('.').pop();
        const newName = `${prefix}-${i + 1}.${ext}`;
        
        const oldPath = join(assetsDir, oldName);
        const newPath = join(assetsDir, newName);
        
        try {
            execSync(`mv "${oldPath}" "${newPath}"`);
            console.log(`  ${oldName}  →  ${newName}`);
            newNames.push(newName);
        } catch (e) {
            console.log(`  SKIP ${oldName} (already renamed or not found)`);
            // Check if new name already exists
            try {
                const test = readFileSync(newPath);
                newNames.push(newName);
                console.log(`    (using existing: ${newName})`);
            } catch {
                newNames.push(oldName); // keep old name
            }
        }
    }
    
    // Update the images array in the source file
    const oldImagesStr = JSON.stringify(proj.images);
    const newImagesStr = JSON.stringify(newNames);
    if (oldImagesStr !== newImagesStr) {
        projectsContent = projectsContent.replace(oldImagesStr, newImagesStr);
        console.log('  Updated projects.js');
    }
    
    console.log();
}

// Write updated projects.js
writeFileSync(projectsFile, projectsContent);
console.log('=== DONE ===');
console.log('projects.js updated');
console.log('Images renamed in: ' + assetsDir);
