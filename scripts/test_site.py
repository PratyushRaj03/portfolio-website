import xml.etree.ElementTree as ET
import json
import os
import re

print("--- RUNNING AUTOMATED AUDIT & VALIDATION SUITE ---")

# 1. Validate XML
try:
    tree = ET.parse('sitemap.xml')
    print('✅ sitemap.xml is structurally valid XML. Entries count:', len(list(tree.getroot())))
except Exception as e:
    print('❌ sitemap.xml error:', e)

# 2. Validate robots.txt
if os.path.exists('robots.txt'):
    with open('robots.txt', 'r', encoding='utf-8') as f:
        robots_content = f.read()
    if 'User-agent:' in robots_content and 'Sitemap:' in robots_content:
        print('✅ robots.txt is present and configured with sitemap directives.')
    else:
        print('⚠️ robots.txt is missing standard directives.')

# 3. Validate JSON files
for jf in ['site.webmanifest', 'vercel.json', 'package.json']:
    try:
        with open(jf, 'r', encoding='utf-8') as f:
            json.load(f)
        print(f'✅ {jf} is valid JSON.')
    except Exception as e:
        print(f'❌ {jf} error:', e)

# 4. Check assets referenced in index.html and 404.html
for doc in ['index.html', '404.html']:
    with open(doc, 'r', encoding='utf-8') as f:
        html = f.read()
    refs = re.findall(r'(?:href|src|srcset)=["\']([^"\']+)["\']', html)
    missing = []
    for ref in refs:
        # Check first part of srcset if space separated
        target = ref.split(' ')[0]
        if target.startswith('http') or target.startswith('#') or target.startswith('mailto:') or target.startswith('tel:'):
            continue
        clean_ref = target.split('?')[0].lstrip('/')
        if not os.path.exists(clean_ref):
            missing.append(target)
    if missing:
        print(f'❌ Missing local assets in {doc}:', missing)
    else:
        print(f'✅ All local assets referenced in {doc} exist on disk!')

print("--- VALIDATION SUITE COMPLETED ---")
