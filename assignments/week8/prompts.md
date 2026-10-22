# 피그마 과제: 사용한 프롬프트

- 피그마 파일: https://www.figma.com/design/pBcYNrcHfAOoEClr46me2K
- 포트폴리오 사이트: https://yurim-portfolio-azure.vercel.app
- 도구: Claude Code + Figma 플러그인(Figma MCP), Figma AI 이미지 생성(gemini-3.1-flash-image)

---

## 1. 플러그인 연결

Claude Code에서 Figma 플러그인을 설치하고 Figma 계정으로 로그인했다.

> 피그마 과제 먼저 해줘
> Figma 플러그인 설치하고 로그인까지 했어. 이어서 진행해줘.

## 2. 레이아웃 3종 도안 (Claude Code → Figma)

Claude Code가 포트폴리오 사이트를 먼저 읽고 색, 폰트, 섹션 구성을 뽑았다. 그 값으로 Figma에 도안을 그렸다.

- 폰트: Cinzel(로고), Gowun Batang(제목), Noto Sans KR · DM Sans(본문)
- 색 토큰: ink `#25203A`, primary `#3F3563`, lavender `#B8A4D8`, pink `#EBB9CB`, sky `#A9BEE0`, bg `#F7F4FB`
- 공통 컴포넌트: Chip, Button(Primary/Secondary), StatTile, ProjectCard, TopBar(Mobile/Tablet), TabBar(Phone)

| 레이아웃 | 크기 | 구성 |
|---|---|---|
| 1. 모바일 웹 | 390px 폭 | 상단바 → 히어로(Play first. / Prove it later.) → 프로필 카드 + 통계 → 연구용 게임 → 오락 게임 → 논문 → 과제 → 푸터 |
| 2. 아이패드 | 834px 폭 | 가로 내비 → 2단 히어로(텍스트 + 프로필) → 프로젝트 카드 2열 그리드 → 논문 / 과제 2단 → 푸터 |
| 3. Phone UI | 393×852 | 앱 형태: 상태바 → 인사 헤더 + 아바타 → Featured 카드 → 통계 → 세그먼트 필터 → 프로젝트 리스트 → 하단 탭바(홈·게임·논문·과제·소개) |

## 3. 로고 (이미지 생성)

Figma `generate_image`에 넣은 프롬프트:

```
Minimal logo mark for a game designer and researcher named Yurim Jang. A single elegant symbol combining a four-pointed sparkle star and a stylized eye whose pupil is a small game controller d-pad, drawn with thin refined lines. Soft pastel gradient from lavender (#B8A4D8) through dusty pink (#EBB9CB) to powder blue (#A9BEE0), with a deep plum (#3F3563) accent outline. Centered on a plain off-white (#F7F4FB) background, lots of empty space, flat vector style, no text, no letters, no mockup, no shadows.
```

의도: "눈으로 하는 게임"(시선 추적) + 사이트의 ✦ 반짝임 + 게임(십자키)

## 4. 명함 2장 (AI 이미지 생성 + Figma, 90×50mm 비율, PNG @2x)

요청한 방향(2차 수정 반영):

> 1. 도트 스타일. 명함 자체가 노트북의 앞면·뒷면이다. 노트북이 명함을 꽉 채우고 배경은 없어야 한다. 앞면은 앞에서 살짝 위로 본 모습이라 키보드가 잘리지 않고 기울어져 보인다. 뒷면은 그냥 뒷면. 노트북 색은 실버
> 2. 인적 정보: 성균관대학교 앵커사업단 PM / 성균관대학교 게임디자인학과 박사과정 / 전화번호 / 이메일 / 포트폴리오 사이트 QR코드, 그 밑에 '더보기'라는 단어를 버튼처럼
> 3. 뒷면: 햄스터, 친칠라, 스타듀밸리, 심즈, 마인크래프트, 배틀그라운드, 롤토체스, 성균관대학교 로고(가운데 가장 크게) 도트 스티커가 여기저기 붙어 있음

### 앞면: 명함을 꽉 채운 실버 노트북 (키보드는 기울어져 보이게)

처음에는 원근을 그대로 살렸더니 키보드 받침이 화면보다 넓어져서 명함 모서리에 배경이 생겼다. 그래서 화면과 키보드 너비를 같게 하고, 키보드 줄의 높이만 앞으로 올수록 커지게 해서 기울어진 느낌을 냈다. 이 버전은 gpt-image 모델이 지시를 더 잘 따랐다.

Figma `generate_image`(gpt-image-2.5-sunburst)에 넣은 프롬프트:

```
16-bit pixel art of an open silver laptop that completely fills a wide rectangular image edge to edge, like a full-bleed business card. The laptop silhouette is exactly the image rectangle: NO background anywhere, no white, no desk, no shadow, no empty corners. Top 60% of the image: the display, its brushed-silver bezel (light silver #E6E8EE / #C9CDD6, dark grey #5A5F6B pixel outlines) touching the top, left and right edges, tiny webcam dot at top center, and a large EMPTY dark navy (#1E1A33) screen with faint scanlines and nothing on it. Bottom 40%: the whole silver keyboard deck seen tilted back from slightly above — the key rows are foreshortened (thin rows near the hinge getting taller toward the front), all keys fully visible in dark grey, a trackpad at the front center — and the deck is EXACTLY as wide as the screen so its left and right sides are the image's left and right edges and its front lip is the image's bottom edge. Nothing is cut off. Clean pixel art, no text, no logos, no watermark.
```

이미지 생성 모델은 한글과 전화번호를 자주 틀리게 그린다. 그래서 인적 정보는 Figma에서 비워 둔 화면 위에 텍스트로 얹었다.
- 폰트: Press Start 2P(라벨), VT323(전화·이메일), DotumChe(한글)
- 내용: ▶ PLAYER PROFILE / 장유림 YURIM JANG / 소속 2줄 / TEL·MAIL
- QR: 포트폴리오 주소로 실제 생성한 QR(segno)을 사각형 도형으로 그려 넣었다. 내보낸 이미지에서 모듈 841칸이 원본과 모두 일치하는지 확인했다
- QR 아래에 도트 버튼 모양의 '▶ 더보기'

### 뒷면: 명함을 꽉 채운 실버 덮개와 스티커

```
16-bit pixel art, full-bleed texture: the image IS the outer back of a closed silver laptop lid, cropped so tightly that the brushed aluminum surface fills the entire image edge to edge. No background, no margin, no table, no laptop outline or corners visible — every pixel is silver lid surface (light silver #E6E8EE to #C9CDD6 with subtle brushed horizontal pixel streaks and a soft diagonal pixel highlight). Cute pixel-art die-cut stickers are stuck all over it, each with a white sticker border and a slight drop shadow. The LARGEST sticker in the exact center is a big round dark-green university emblem badge with a stylized ginkgo leaf and the letters "SKKU" in bold pixel letters. Around it, smaller stickers: a chubby golden hamster, a fluffy grey chinchilla, a green diamond plumbob crystal (The Sims), a grass-and-dirt cube block and a green creeper-style face (Minecraft), a cozy farm chicken and a parsnip (Stardew Valley style), a battle-royale level-3 military helmet with a frying pan and an airdrop supply crate (PUBG battlegrounds style), a golden hexagon game-board tile with a tiny cute round penguin mascot (Teamfight Tactics style), plus tiny pixel hearts and sparkle stars. Stickers spread over the whole surface at playful angles, none cut off by the image edges, not overlapping the center emblem. Clean pixels, no other text, no watermark.
```

생성된 이미지 모서리에 남은 흰 여백은 Figma에서 이미지 자르기(CROP)로 잘라 냈다. 명함 테두리 픽셀에 배경색이 하나도 없는 위치를 계산해서 잘랐다.

가운데 성균관대 스티커는 AI가 은행잎과 SKKU 글자로 해석해서 그린 것이다. 공식 로고 파일은 쓰지 않았다. 배틀그라운드는 3레벨 헬멧·프라이팬·보급상자로, 롤토체스는 황금 육각 타일과 펭구 꼬마 전설이로 표현했다.

이전 시안(1차 Figma 디자인, 2차 라벤더 도트 모니터, 3차 배경 있는 실버 노트북)은 Figma 파일에 '(이전)' 표시로 남겨 두었다.

## 5. 브로슈어 1장 (A4, PDF)

포트폴리오 사이트를 중심에 둔 한 장짜리 소개서:
- 상단: 로고, 이름, URL, 슬로건, 자기소개. 오른쪽에는 위에서 만든 아이패드·폰 도안을 축소해 디바이스 목업으로 배치
- Selected Work: Eye can do it / Head·Hand·Eye Playground / 똑딱이의 원고 대작전
- Publications, Tools & Focus 태그
- Next: 안과와 해보고 싶은 것
- 하단 띠: 이름, 소속, URL, 이메일
