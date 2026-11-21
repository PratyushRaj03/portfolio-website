import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

os.makedirs('assets/images', exist_ok=True)
os.makedirs('scripts', exist_ok=True)

# 1. Convert profile avatar to WebP and optimized JPG
src_avatar = 'assets/images/1730058357156.jpg'
if os.path.exists(src_avatar):
    with Image.open(src_avatar) as img:
        img_rgb = img.convert('RGB')
        img_rgb.save('assets/images/pratyush-raj-srivastava.webp', 'WEBP', quality=88, method=6)
        img_rgb.save('assets/images/pratyush-raj-srivastava.jpg', 'JPEG', quality=90, optimize=True)
        print('Avatar WebP and JPG generated successfully.')

# 2. Generate Favicon SVG
svg_favicon = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="16" fill="#0e0e0c"/>
  <rect x="1.5" y="1.5" width="61" height="61" rx="14.5" fill="none" stroke="rgba(255,245,220,0.12)" stroke-width="1.5"/>
  <circle cx="32" cy="32" r="18" fill="none" stroke="url(#goldGrad)" stroke-width="3"/>
  <circle cx="32" cy="32" r="6" fill="#e8a020"/>
  <path d="M32 16 L32 23 M32 41 L32 48 M16 32 L23 32 M41 32 L48 32" stroke="#e8a020" stroke-width="2.5" stroke-linecap="round"/>
</svg>"""

with open('favicon.svg', 'w', encoding='utf-8') as f:
    f.write(svg_favicon)

# 3. Create Favicon PNG 32x32, 192x192, and Apple Touch Icon 180x180
def make_icon(size):
    im = Image.new('RGBA', (size, size), (14, 14, 12, 255))
    draw = ImageDraw.Draw(im)
    draw.rounded_rectangle([1, 1, size-2, size-2], radius=int(size*0.25), outline=(255, 245, 220, 35), width=max(1, int(size*0.03)))
    margin = size * 0.22
    draw.ellipse([margin, margin, size - margin, size - margin], outline=(232, 160, 32, 240), width=max(2, int(size*0.06)))
    dot_m = size * 0.40
    draw.ellipse([dot_m, dot_m, size - dot_m, size - dot_m], fill=(232, 160, 32, 255))
    return im

fav_32 = make_icon(32)
fav_32.save('favicon.png', 'PNG')
fav_32.save('favicon.ico', format='ICO', sizes=[(32, 32)])

fav_192 = make_icon(192)
fav_192.save('assets/images/icon-192.png', 'PNG')

fav_512 = make_icon(512)
fav_512.save('assets/images/icon-512.png', 'PNG')

apple_icon = make_icon(180)
apple_icon.save('apple-touch-icon.png', 'PNG')
print('Favicons and touch icons generated.')

# 4. Generate OG Image (1200 x 630)
og_width, og_height = 1200, 630
og = Image.new('RGB', (og_width, og_height), (14, 14, 12))
og_draw = ImageDraw.Draw(og)

# Ambient glow orbs
glow_layer = Image.new('RGBA', (og_width, og_height), (0, 0, 0, 0))
g_draw = ImageDraw.Draw(glow_layer)
g_draw.ellipse([750, -100, 1350, 450], fill=(232, 160, 32, 45))
g_draw.ellipse([-100, 350, 450, 850], fill=(217, 119, 6, 30))
glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(70))
og.paste(Image.composite(glow_layer, Image.new('RGBA', (og_width, og_height), (14, 14, 12, 255)), glow_layer), (0,0))

og_draw = ImageDraw.Draw(og)

# Outer card border
og_draw.rounded_rectangle([32, 32, og_width - 32, og_height - 32], radius=24, outline=(255, 245, 220, 25), width=2)

# Grid lines background accent
for x in range(60, og_width - 60, 48):
    og_draw.line([(x, 60), (x, og_height - 60)], fill=(255, 255, 255, 10), width=1)
for y in range(60, og_height - 60, 48):
    og_draw.line([(60, y), (og_width - 60, y)], fill=(255, 255, 255, 10), width=1)

# Badge: OPEN TO OPPORTUNITIES
og_draw.rounded_rectangle([75, 75, 410, 115], radius=20, fill=(232, 160, 32, 28), outline=(232, 160, 32, 90), width=1)
og_draw.ellipse([92, 92, 100, 100], fill=(34, 197, 94, 255))

# Include profile photo inside circle if available
if os.path.exists(src_avatar):
    with Image.open(src_avatar) as av:
        av_resized = av.resize((260, 260), Image.Resampling.LANCZOS).convert('RGBA')
        mask = Image.new('L', (260, 260), 0)
        m_draw = ImageDraw.Draw(mask)
        m_draw.ellipse([0, 0, 260, 260], fill=255)
        
        # Border ring around avatar
        og_draw.ellipse([845, 175, 1125, 455], outline=(232, 160, 32, 220), width=5)
        og_draw.ellipse([835, 165, 1135, 465], outline=(255, 245, 220, 35), width=1)
        og.paste(av_resized, (855, 185), mask)

# Typography on OG banner
try:
    font_large = ImageFont.truetype('arial.ttf', 54)
    font_sub = ImageFont.truetype('arial.ttf', 28)
    font_body = ImageFont.truetype('arial.ttf', 20)
    font_tag = ImageFont.truetype('arial.ttf', 16)
except Exception:
    font_large = ImageFont.load_default()
    font_sub = font_large
    font_body = font_large
    font_tag = font_large

og_draw.text((112, 86), "OPEN TO OPPORTUNITIES", fill=(232, 160, 32), font=font_tag)
og_draw.text((75, 160), "Pratyush Raj Srivastava", fill=(245, 240, 232), font=font_large)
og_draw.text((75, 235), "AI/ML Engineer & Software Developer", fill=(232, 160, 32), font=font_sub)
og_draw.text((75, 305), "Computer Vision  |  Deep Learning  |  Full Stack  |  Geospatial", fill=(158, 154, 144), font=font_body)

# Tech stack pills
pills = ["PyTorch", "YOLOv8", "Python", "JavaScript", "Cloud Firestore", "OpenCV"]
px = 75
py = 370
for pill in pills:
    pill_w = len(pill) * 11 + 24
    og_draw.rounded_rectangle([px, py, px + pill_w, py + 36], radius=8, fill=(255, 255, 255, 12), outline=(255, 245, 220, 25), width=1)
    og_draw.text((px + 12, py + 8), pill, fill=(245, 240, 232), font=font_tag)
    px += pill_w + 12

# Domain URL pill at bottom
og_draw.rounded_rectangle([75, 520, 520, 565], radius=10, fill=(18, 18, 15), outline=(232, 160, 32, 70), width=1)
og_draw.text((95, 532), "pratyush-raj-srivastava-two.vercel.app", fill=(232, 160, 32), font=font_body)

og.save('assets/images/og-image.png', 'PNG', quality=92, optimize=True)
print('OG Image (1200x630) generated successfully.')
