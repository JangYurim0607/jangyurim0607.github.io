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

요청한 방향:

> 1. 도트스타일 게임 모니터 안에 인적 정보가 적혀있는거야
> 2. 인적 정보: 성균관대학교 앵커사업단 PM / 성균관대학교 게임디자인학과 박사과정 / 전화번호 / 이메일 / 포트폴리오 사이트 QR코드 넣고 밑에 '더보기'라는 단어 버튼처럼 넣어줘
> 3. 뒷면디자인: 도트스타일 노트북 모니터 뒷면이고 햄스터, 친칠라, 스타듀밸리, 심즈, 마인크래프트, 성균관대학교 로고(제일 크게 가운데) 도트 스티커가 여기저기 붙어있음

### 앞면: 도트 게임 모니터

Figma `generate_image`에 넣은 프롬프트(화면 안쪽은 비워 두고 생성):

```
16-bit pixel art illustration, straight-on front view of a cute retro game monitor (chunky CRT-style computer screen) that fills almost the whole wide horizontal canvas. Thick rounded pastel lavender plastic bezel with crisp pixel outlines in deep plum (#3F3563), small pixel power LED and two tiny buttons on the bottom bezel, a small pixel sparkle star on the top-left corner of the bezel. The screen area is very large (about 85% of the image width), completely EMPTY and flat: a solid dark navy (#1E1A33) screen with only very faint horizontal scanlines, no text, no icons, no UI, nothing inside the screen. Background around the monitor: soft pastel pink-to-lavender pixel gradient with a few tiny pixel stars. Clean, limited palette (lavender #B8A4D8, pink #EBB9CB, powder blue #A9BEE0, plum #3F3563, navy #1E1A33). No letters, no words, no logos, no watermark.
```

이미지 생성 모델은 한글과 전화번호를 자주 틀리게 그린다. 그래서 인적 정보는 Figma에서 비워 둔 화면 위에 텍스트로 얹었다.
- 폰트: Press Start 2P(라벨), VT323(전화·이메일), DotumChe(한글)
- 내용: ▶ PLAYER PROFILE / 장유림 YURIM JANG / 소속 2줄 / TEL·MAIL
- QR: 포트폴리오 주소로 실제 생성한 QR(segno)을 넣었고, 브라우저에서 스캔되는지 확인했다
- QR 아래에 도트 버튼 모양의 '▶ 더보기'

### 뒷면: 스티커 붙은 도트 노트북

```
16-bit pixel art illustration, straight-on view of the BACK of a closed laptop lid (the outside of the laptop screen) filling the whole wide horizontal canvas, pastel lavender matte lid with crisp deep plum pixel outlines and a soft pixel highlight. The lid is covered with cute pixel-art die-cut stickers scattered around, each with a white sticker border and a slight drop shadow: the LARGEST sticker in the exact center is a big round dark-green university emblem badge with a stylized ginkgo leaf and the letters "SKKU" in bold pixel letters; around it smaller stickers: a chubby golden hamster, a fluffy grey chinchilla, a green diamond plumbob crystal (The Sims), a grass-and-dirt cube block and a green pixel creeper-style face (Minecraft), a cozy farm chicken, a parsnip and a little farmhouse (Stardew Valley style), plus tiny pixel hearts and sparkle stars. Stickers placed playfully at slight angles, not overlapping the center emblem. Limited cozy palette, clean pixels, no other text, no watermark.
```

가운데 성균관대 스티커는 AI가 은행잎과 SKKU 글자로 해석해서 그린 것이다. 공식 로고 파일은 쓰지 않았다.

## 5. 브로슈어 1장 (A4, PDF)

포트폴리오 사이트를 중심에 둔 한 장짜리 소개서:
- 상단: 로고, 이름, URL, 슬로건, 자기소개. 오른쪽에는 위에서 만든 아이패드·폰 도안을 축소해 디바이스 목업으로 배치
- Selected Work: Eye can do it / Head·Hand·Eye Playground / 똑딱이의 원고 대작전
- Publications, Tools & Focus 태그
- Next: 안과와 해보고 싶은 것
- 하단 띠: 이름, 소속, URL, 이메일
