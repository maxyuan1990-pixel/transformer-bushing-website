const { readFileSync, readdirSync, writeFileSync } = require('fs');
const { join, basename } = require('path');

const dir = __dirname;
const files = readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'support-page.html');

const projects = [];

for (const fname of files) {
    const html = readFileSync(join(dir, fname), 'utf-8');
    
    const titleM = html.match(/<title>(.*?)<\/title>/);
    let pageTitle = titleM ? titleM[1].trim() : 'N/A';
    pageTitle = pageTitle.replace(/\s*[-|]\s*Shandong Qixing.*$/, '').trim();
    
    const imgIds = new Set();
    const imgRegex = /hkimg[^"]*\/(\d+)\.(png|jpg|jpeg)/g;
    let m;
    while ((m = imgRegex.exec(html)) !== null) {
        imgIds.add(m[1]);
    }
    
    // Strip tags for text
    let body = html.replace(/<script[^>]*>[\s\S]*?<\/script>/g, '');
    body = body.replace(/<style[^>]*>[\s\S]*?<\/style>/g, '');
    body = body.replace(/<[^>]+>/g, ' ');
    body = body.replace(/&nbsp;/g, ' ');
    body = body.replace(/\s+/g, ' ').trim();
    
    const meta = {};
    for (const key of ['Customer', 'Project', 'Products', 'Operation']) {
        const re = new RegExp(key + '[\\s:]*([^.!?\\n]{15,200})');
        const infoM = body.match(re);
        if (infoM) {
            meta[key] = infoM[1].trim().replace(/^\s*(:|-|—)\s*/, '');
        }
    }
    
    // Extract some description text (after the key fields)
    const descM = body.match(/Operation[^.]*\.\s*([^.]{100,500}\.)/);
    let description = descM ? descM[1].trim() : '';
    
    projects.push({
        file: fname,
        title: pageTitle,
        customer: meta.Customer || '',
        project: meta.Project || '',
        products: meta.Products || '',
        operationTime: meta.Operation || '',
        description: description,
        images: [...imgIds].sort()
    });
    
    console.log('--- ' + fname + ' ---');
    console.log('Title: ' + pageTitle);
    console.log('Customer: ' + (meta.Customer || 'N/A'));
    console.log('Project: ' + (meta.Project || 'N/A'));
    console.log('Products: ' + (meta.Products || 'N/A'));
    console.log('Operation: ' + (meta.Operation || 'N/A'));
    console.log('Images: [' + [...imgIds].join(', ') + ']');
    console.log();
}

// Save as JSON
writeFileSync(join(dir, 'projects_data.json'), JSON.stringify(projects, null, 2));
console.log('Saved projects_data.json with ' + projects.length + ' projects');
