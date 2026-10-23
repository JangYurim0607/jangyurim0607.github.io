from PIL import Image, ImageDraw, ImageFilter
import random, collections
random.seed(7)
src=Image.open('/Users/jang-yurim/Projects/jangyurim0607.github.io/assignments/week8/card-back.png').convert('RGBA')
mask=Image.open('back_mask.png').resize(src.size, Image.NEAREST)  # 255 = sticker/outline
def cut(b, pad=14):
    x0,y0,x1,y1=[v*2 for v in b]; x0-=pad;y0-=pad;x1+=pad+2;y1+=pad+2
    s=src.crop((x0,y0,x1,y1)); m=mask.crop((x0,y0,x1,y1))
    # keep only the component connected to the centre-ish region: flood from bbox centre
    w,h=m.size; mp=m.load(); keep=Image.new('L',(w,h),0); kp=keep.load()
    cx,cy=w//2,h//2
    seeds=[(x,y) for x in range(w) for y in range(h) if mp[x,y]>0 and abs(x-cx)<w//4 and abs(y-cy)<h//4]
    st=seeds[:]; 
    for x,y in st: kp[x,y]=255
    while st:
        x,y=st.pop()
        for a,b2 in ((x+1,y),(x-1,y),(x,y+1),(x,y-1)):
            if 0<=a<w and 0<=b2<h and mp[a,b2]>0 and not kp[a,b2]: kp[a,b2]=255; st.append((a,b2))
    s.putalpha(keep); return s.crop(s.getbbox())
B={'hamster':(67,42,204,210),'chin':(253,49,424,208),'sims':(719,32,810,197),'grass':(883,35,1024,178),
 'creeper':(51,251,171,369),'chick1':(221,244,348,371),'skku':(409,170,669,431),'chick2':(736,244,863,371),
 'parsnip':(919,221,1028,360),'helmet':(60,421,208,548),'pan':(278,421,440,560),'drop':(646,412,806,566),'hex':(864,391,1051,569),
 'heart1':(205,35,259,82),'heart2':(809,192,855,233),'spark1':(436,69,460,98),'spark2':(188,387,224,427),'spark3':(1018,183,1044,209)}
P={k:cut(v, 6 if k.startswith(('heart','spark')) else 14) for k,v in B.items()}
for k,v in P.items(): print(k,v.size)
W,H=1206,2160
# silver lid
bg=Image.new('RGB',(W,H)); d=ImageDraw.Draw(bg)
for y in range(H):
    t=y/H; c=tuple(int(a+(b-a)*t) for a,b in zip((214,218,230),(198,202,216))); d.line([(0,y),(W,y)],fill=c)
sheen=Image.new('L',(W,H),0); sd=ImageDraw.Draw(sheen)
sd.polygon([(W*0.15,H),(W*0.55,H),(W*1.0,H*0.35),(W*1.0,0),(W*0.85,0)],fill=70)
sd.polygon([(0,H*0.62),(0,H*0.78),(W*0.9,0),(W*0.7,0)],fill=40)
sheen=sheen.filter(ImageFilter.GaussianBlur(90))
bg=Image.composite(Image.new('RGB',(W,H),(238,240,247)),bg,sheen)
streak=Image.new('L',(W,H),0); st=ImageDraw.Draw(streak)
for _ in range(900):
    y=random.randrange(H); x=random.randrange(-200,W); L=random.randrange(60,420)
    st.line([(x,y),(x+L,y)],fill=random.randrange(10,35),width=random.choice((1,2)))
streak=streak.filter(ImageFilter.GaussianBlur(1.2))
bg=Image.composite(Image.new('RGB',(W,H),(250,251,255)),bg,streak)
bg=bg.convert('RGBA'); d=ImageDraw.Draw(bg)
d.rounded_rectangle([3,3,W-4,H-4],radius=26,outline=(176,182,198),width=4)
d.rounded_rectangle([10,10,W-11,H-11],radius=20,outline=(236,238,245),width=3)
def put(k,cx,cy,scale=1.0):
    im=P[k]
    if scale!=1: im=im.resize((int(im.width*scale),int(im.height*scale)),Image.NEAREST)
    bg.alpha_composite(im,(int(cx-im.width/2),int(cy-im.height/2)))
cols=[W*0.20,W*0.50,W*0.80]
rows=[[('hamster',),('chin',),('sims',)],[('creeper',),('chick1',),('grass',)]]
put('hamster',cols[0],270); put('chin',cols[1]+20,270); put('sims',cols[2]+20,270)
put('creeper',cols[0],650); put('chick1',cols[1],660); put('grass',cols[2],650)
put('skku',W/2,1080)
put('chick2',cols[0],1500); put('parsnip',cols[1],1500); put('drop',cols[2],1500)
put('helmet',cols[0],1880); put('pan',cols[1]+10,1880); put('hex',cols[2]-10,1870,0.94)
for k,(x,y) in {'heart1':(1050,110),'heart2':(130,850),'spark1':(560,470),'spark3b':(1080,860),'spark1b':(250,1320),
                'heart2b':(1000,1320)}.items():
    put(k[:-1] if k.endswith('b') else k, x,y)
bg.save('back_v.png')
