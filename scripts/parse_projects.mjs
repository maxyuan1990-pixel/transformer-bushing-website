import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const dir = '/tmp/projects';
const files = readdirSync(dir).filter(f => f.endsWith('.html'));

for (const fname of files) {
    const html = readFileSync(join(dir, fname), 'utf-8');
    
    console.log(`===== ${fname} =====`);
    
    // Title
    const titleM = html.match(/<title>(.*?)<\/title>/);
    let title = titleM ? titleM[1].trim() : 'N/A';
    title = title.replace(/\s*[-|]\s*Shandong Qixing.*$/, '').trim();
    console.log(`Title: ${title}`);
    
    // Find all hkimg image IDs
    const imgIds = new Set();
    const imgRegex = /hkimg[^"]*\/(\d+)\.(png|jpg|jpeg)/g;
    let m;
    while ((m = imgRegex.exec(html)) !== null) {
        imgIds.add(m[1]);
    }
    console.log(`Image IDs: [${[...imgIds].sort().join(', ')}]`);
    
    // Strip all tags for text
    let body = html.replace(/<script[^>]*>[\s\S]*?<\/script>/g, '');
    body = body.replace(/<style[^>]*>[\s\S]*?<\/style>/g, '');
    body = body.replace(/<[^>]+>/g, ' ');
    body = body.replace(/\s+/g, ' ').trim();
    
    // Find key info
    for (const key of ['Customer', 'Project', 'Products', 'Operation']) {
        const infoM = body.match(new RegExp(`${key}[\\s:]*([^.!?\\n]{15,200})`));
        if (infoM) {
            let val = infoM[1].trim().replace(/^\s*(:|-|—)\s*/, '');
            console.log(`  ${key}: ${val.substring(0, 180)}`);
        }
    }
    
    console.log();
}
