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

## 4. 명함 2장 (Figma, 90×50mm 비율, PNG @2x)

- 앞면: 파스텔 그라데이션 배경, 가운데에 로고, YURIM JANG(Cinzel), "Play first. Prove it later."
- 뒷면: 딥 플럼 그라데이션, 왼쪽에 이름·직함·소속, 오른쪽에 포트폴리오 URL·이메일·관심 분야, 오른쪽 아래에 로고 배지

## 5. 브로슈어 1장 (A4, PDF)

포트폴리오 사이트를 중심에 둔 한 장짜리 소개서:
- 상단: 로고, 이름, URL, 슬로건, 자기소개. 오른쪽에는 위에서 만든 아이패드·폰 도안을 축소해 디바이스 목업으로 배치
- Selected Work: Eye can do it / Head·Hand·Eye Playground / 똑딱이의 원고 대작전
- Publications, Tools & Focus 태그
- Next: 안과와 해보고 싶은 것
- 하단 띠: 이름, 소속, URL, 이메일
