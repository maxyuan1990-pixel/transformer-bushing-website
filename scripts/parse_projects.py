import re, os, glob

pages_dir = "/tmp/projects"

for filepath in sorted(glob.glob(os.path.join(pages_dir, "*.html"))):
    fname = os.path.basename(filepath)
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        html = f.read()
    
    print(f"===== {fname} =====")
    
    # Title
    title_m = re.search(r'<title>(.*?)</title>', html)
    title = title_m.group(1).strip() if title_m else "N/A"
    title = re.sub(r'\s*[-|]\s*Shandong Qixing.*$', '', title).strip()
    print(f"Title: {title}")
    
    # Find all hkimg image IDs
    img_ids = set()
    for m in re.finditer(r'hkimg[^"]*/(\d+)\.(png|jpg|jpeg)', html):
        img_ids.add(m.group(1))
    for m in re.finditer(r'data-src="[^"]*hkimg[^"]*/(\d+)\.(png|jpg|jpeg)', html):
        img_ids.add(m.group(1))
    for m in re.finditer(r'src="[^"]*hkimg[^"]*/(\d+)\.(png|jpg|jpeg)', html):
        img_ids.add(m.group(1))
    
    print(f"Image IDs: {sorted(img_ids)}")
    
    # Strip all tags for text
    body = re.sub(r'<script[^>]*>.*?</script>', '', html, flags=re.DOTALL)
    body = re.sub(r'<style[^>]*>.*?</style>', '', body, flags=re.DOTALL)
    body = re.sub(r'<[^>]+>', ' ', body)
    body = re.sub(r'\s+', ' ', body).strip()
    
    # Find key info
    for key in ['Customer', 'Project', 'Products', 'Operation']:
        m = re.search(rf'{key}[:\s]*([^.!?\n]{{15,200}})', body)
        if m:
            val = m.group(1).strip()
            val = re.sub(r'^\s*(:|-|—)\s*', '', val)
            print(f"  {key}: {val[:180]}")
    
    # First meaningful paragraph
    chunks = [s.strip() for s in body.split('.') if len(s.strip()) > 40]
    if chunks:
        print(f"  Text: {chunks[0][:250]}...")
    
    print()
