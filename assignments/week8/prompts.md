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

요청한 방향(최종 수정까지 반영):

> 1. 도트 스타일. 명함 자체가 노트북의 앞면·뒷면이다. 노트북이 명함을 꽉 채우고 배경은 없어야 한다. 앞면은 키보드 없이 모니터만, 뒷면은 그냥 뒷면. 노트북 색은 실버
> 2. 인적 정보: 성균관대학교 앵커사업단 PM / 성균관대학교 게임디자인학과 박사과정 / 전화번호 / 이메일 / 포트폴리오 사이트 QR코드, 그 밑에 '더보기'라는 단어를 버튼처럼
> 3. 앞면 화면은 윈도우 정석 배경화면처럼 파란 하늘과 초원. 각 인적 사항 왼쪽에 바탕화면 아이콘 같은 폴더·전화·이메일 아이콘. 마우스 커서가 '더보기' 버튼 위에 올라가 있음. 한글 폰트도 도트 디자인과 어울리게
> 4. 뒷면: 햄스터, 친칠라, 스타듀밸리, 심즈, 마인크래프트, 배틀그라운드, 롤토체스, 성균관대학교 로고(가운데 가장 크게) 도트 스티커가 여기저기 붙어 있음

### 앞면: 실버 모니터 속 바탕화면

명함 전체가 실버 모니터이고, 화면 안은 컴퓨터 바탕화면처럼 꾸몄다.

1) 모니터. Figma `generate_image`(gpt-image-2.5-sunburst)에 넣은 프롬프트:

```
16-bit pixel art of the display of a silver laptop, straight-on front view, that completely fills a wide rectangular image edge to edge like a full-bleed business card. ONLY the monitor: no keyboard, no hinge, no base, no stand. The silhouette is exactly the image rectangle: NO background anywhere, no white, no desk, no shadow, no empty or rounded corners. A brushed-silver aluminum bezel (light silver #E6E8EE / #C9CDD6 with dark grey #5A5F6B pixel outlines) runs along all four image edges, slightly thicker at the bottom, with a tiny webcam dot at the top center. Inside the bezel is a very large EMPTY dark navy (#1E1A33) screen with faint horizontal scanlines and nothing on it — no text, no icons, no UI. Clean pixel art, no logos, no watermark.
```

2) 바탕화면(파란 하늘과 초원). 특정 사진을 베끼지 않고 새로 그리게 했다. `generate_image`(gemini-3.1-flash-image):

```
16-bit pixel art desktop wallpaper, wide landscape, full frame with no border: a bright saturated blue sky with a few soft fluffy white clouds, and one big smooth rolling bright green grassy hill sweeping across the lower 40% of the image with a gentle curve, lush meadow texture in pixel dithering. Classic, calm, cheerful computer desktop wallpaper mood. Simple composition, nothing else: no trees, no people, no buildings, no text, no icons, no UI, no logos, no watermark.
```

3) Figma에서 얹은 것
- 한글 도트 폰트: Figma에는 한글 도트 폰트가 없었다. 굴림을 작게 렌더링해서 픽셀로 바꿔 봤지만 획이 뭉개졌다. 그래서 오픈소스(OFL) 한글 도트 폰트 **Neo둥근모**로 16px 비트맵을 만들고, 픽셀 하나하나를 벡터 사각형으로 바꿔 2~3배 키웠다. 영문과 숫자는 VT323, Press Start 2P를 썼다.
- 아이콘: 16×16 픽셀 격자로 직접 그렸다. 이름은 사람, 앵커사업단은 노란 폴더, 박사과정은 학사모, 전화는 휴대폰, 이메일은 편지봉투 아이콘이다.
- 글자와 아이콘에는 바탕화면 아이콘 라벨처럼 2px 남색 픽셀 그림자를 넣었다.
- QR 아래 '▶ 더보기' 버튼에 클래식 화살표 마우스 커서(12×19 픽셀)가 올라가 있다.
- QR: 포트폴리오 주소로 만든 실제 QR을 사각형 도형으로 넣었다. 내보낸 이미지에서 모듈 841칸이 원본과 모두 일치했다.
- 생성된 모니터 이미지 네 모서리에 둥글게 남은 흰 픽셀은 이미지 자르기(CROP)로 6px씩 잘라 냈다.

### 뒷면: 명함을 꽉 채운 실버 덮개와 스티커

```
16-bit pixel art, full-bleed texture: the image IS the outer back of a closed silver laptop lid, cropped so tightly that the brushed aluminum surface fills the entire image edge to edge. No background, no margin, no table, no laptop outline or corners visible — every pixel is silver lid surface (light silver #E6E8EE to #C9CDD6 with subtle brushed horizontal pixel streaks and a soft diagonal pixel highlight). Cute pixel-art die-cut stickers are stuck all over it, each with a white sticker border and a slight drop shadow. The LARGEST sticker in the exact center is a big round dark-green university emblem badge with a stylized ginkgo leaf and the letters "SKKU" in bold pixel letters. Around it, smaller stickers: a chubby golden hamster, a fluffy grey chinchilla, a green diamond plumbob crystal (The Sims), a grass-and-dirt cube block and a green creeper-style face (Minecraft), a cozy farm chicken and a parsnip (Stardew Valley style), a battle-royale level-3 military helmet with a frying pan and an airdrop supply crate (PUBG battlegrounds style), a golden hexagon game-board tile with a tiny cute round penguin mascot (Teamfight Tactics style), plus tiny pixel hearts and sparkle stars. Stickers spread over the whole surface at playful angles, none cut off by the image edges, not overlapping the center emblem. Clean pixels, no other text, no watermark.
```

생성된 이미지 모서리에 남은 흰 여백은 Figma에서 이미지 자르기(CROP)로 잘라 냈다. 명함 테두리 픽셀에 배경색이 하나도 없는 위치를 계산해서 잘랐다.

가운데 성균관대 스티커는 AI가 은행잎과 SKKU 글자로 해석해서 그린 것이다. 공식 로고 파일은 쓰지 않았다. 배틀그라운드는 3레벨 헬멧·프라이팬·보급상자로, 롤토체스는 황금 육각 타일과 펭구 꼬마 전설이로 표현했다.

이전 시안(1차 Figma 디자인, 2차 라벤더 도트 모니터, 3차 배경 있는 실버 노트북, 4차 키보드가 기울어진 노트북, 5차 빈 화면의 모니터)은 Figma 파일에 '(이전)' 표시로 남겨 두었다.

## 5. 브로슈어 1장 (A4, PDF)

포트폴리오 사이트를 중심에 둔 한 장짜리 소개서:
- 상단: 로고, 이름, URL, 슬로건, 자기소개. 오른쪽에는 위에서 만든 아이패드·폰 도안을 축소해 디바이스 목업으로 배치
- Selected Work: Eye can do it / Head·Hand·Eye Playground / 똑딱이의 원고 대작전
- Publications, Tools & Focus 태그
- Next: 안과와 해보고 싶은 것
- 하단 띠: 이름, 소속, URL, 이메일

## 6. 사이트 도트 리디자인 반영 (레이아웃 3종 · 브로슈어 다시 만들기)

명함을 도트 디자인으로 바꾼 뒤, 과제 공지의 "필요시 자신의 포트폴리오사이트를 이미지 생성하여 업그레이드"에 맞춰 사이트도 같은 디자인으로 개편했다. 레이아웃 도안과 브로슈어도 새 디자인으로 다시 만들었다.

요청:

> 포트폴리오 사이트 디자인은 명함처럼 도트 디자인으로 바꿔주고, 홈페이지 타이틀도 Time Out!으로 바꿔줘
> 피그마 과제에도 반영해야지

사이트에서 바꾼 것
- 홈: 명함 앞면과 같은 파란 하늘·초원 도트 바탕화면(Figma AI 생성 이미지 재사용), 그 위에 `TIME_OUT.EXE`·`PROFILE.PNG` 창과 바탕화면 아이콘 7개(소개·연구용 게임·오락 게임·논문·전시·발표·과제·일지)
- 메뉴는 은색 작업 표시줄, 카드는 보라색 제목줄이 달린 창, 태그·버튼·진행 막대는 각진 도트 스타일
- 폰트: 한글 Neo둥근모(OFL, 사이트에 직접 포함), 영문 Press Start 2P·VT323
- 마우스 커서: 도트 화살표, 링크 위에서는 도트 손가락
- 홈 큰 제목을 "Time Out!"으로 고정

피그마에 반영한 방법
- 무료(Starter) 요금제의 Figma MCP 호출 한도(월 20회)를 다 써서, 개편 뒤에는 MCP로 피그마 파일을 고칠 수 없었다.
- 대신 Chrome에서 연 Figma 웹 편집기의 디자인 API(`figma` 객체)로 스크립트를 실행해 편집 가능한 레이어로 다시 만들었다.
  - 한글은 Figma에 Neo둥근모가 없어서, Neo둥근모 16px 비트맵을 픽셀 벡터로 바꾼 데이터(`assignments/week8/pixel/figma-text.json`)를 사이트에 올려 두고 Figma에서 불러왔다. 영문은 Press Start 2P, VT323 텍스트 레이어다.
  - 색은 `Pixel Tokens` 변수 컬렉션으로 묶었고, 창 제목줄(WinBar, 제목 텍스트 속성), 버튼 4종, 바탕화면 아이콘 7종은 컴포넌트로 만들어 레이아웃에서 인스턴스로 썼다.
- 01 레이아웃 도안: Components · 도트 공통 부품 / Layout 1 · Mobile Web (390, 홈 바탕화면 + 과제 페이지) / Layout 2 · iPad (834, 홈 + 연구용 게임 페이지) / Layout 3 · Phone UI (393×852, 바탕화면 아이콘 홈 화면)
- 02 로고 · 명함 · 브로슈어: 브로슈어를 도트 버전(A4)으로 새로 만들었다. 1.5배 크기로 짠 뒤 A4로 줄여서 도트 글자가 인쇄 크기에 맞게 했다. 브로슈어와 명함 QR은 Figma 안에서 다시 스캔해 포트폴리오 주소가 나오는지 확인했다.
- 03 참고 · 실제 사이트 캡처: 개편한 실제 사이트를 모바일·아이패드 폭으로 캡처한 이미지
- 00 이전 파스텔 시안 (보관): 처음 만든 파스텔 레이아웃·브로슈어와 이전 명함 시안들
- 피그마 파일 이름도 "8주차 과제"로 고쳤다.
- 이전 파스텔 버전 레이아웃·브로슈어는 `assignments/week8/v1/`에 남겨 두었다.
- Phone UI와 브로슈어 원본 HTML: `assignments/week8/pixel/phone-ui.html`, `assignments/week8/pixel/brochure.html`
