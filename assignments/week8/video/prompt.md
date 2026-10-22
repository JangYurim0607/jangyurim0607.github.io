# 8주차 영상 과제: 내가 랜딩페이지를 소개한다 (숏폼)

- 도구: Runway (Seedance 2.5)
- 결과물: 세로 9:16, 12초, 720×1280, 배경음악 없음, 한국어 여성 음성
- 영상: [landing-shortform.mp4](landing-shortform.mp4)
- 워크플로우 소개 이미지: [workflow.png](workflow.png) · [웹 페이지](workflow.html)

## 넣은 레퍼런스

| 구분 | 내용 | 역할 |
|---|---|---|
| 인물 | 캐릭터 시트 1장 | 얼굴·머리·의상·체형을 영상 내내 같게 유지 (Reference to Video) |
| 환경 | 포트폴리오 사이트 스크린샷 9장 ([refs/](refs/)) | 홈, 소개, 연구용 게임, 오락 게임, 논문, 과제 화면을 그대로 배경으로 사용 |

## 장면 흐름과 실제 결과

| 시간 | 프롬프트 지시 | 대사 | 결과 프레임 |
|---|---|---|---|
| 0:00–0:03 | "Time Out!" 제목 옆에 등장, 카메라를 보며 인사 | 안녕하세요, 장유림의 포트폴리오입니다. | [frame-1.0.jpg](frames/frame-1.0.jpg) |
| 0:03–0:06 | 상단 메뉴 쪽으로 걸어가 메뉴를 가리킴 | 게임 개발과 연구 작업을 이곳에 모아두었습니다. | [frame-4.5.jpg](frames/frame-4.5.jpg) |
| 0:06–0:09 | 연구용 게임 페이지로 넘어가 카드를 가리킴 | 연구용 게임, 오락 게임, 논문, 과제를 살펴볼 수 있어요. | [frame-7.5.jpg](frames/frame-7.5.jpg) |
| 0:09–0:12 | 정면을 보고 웃으며 손을 흔듦 | 천천히 둘러봐 주세요. | [frame-11.0.jpg](frames/frame-11.0.jpg) |

## 프롬프트 (Runway에 넣은 원문)

```text
Create a short vertical 9:16 AI video, around 8 to 12 seconds long, with no background music.

Use the uploaded character sheet as the strict identity reference for the main character.

She is a young adult woman with realistic human body proportions and a stylized 3D avatar-like face.

She has large violet eyes, shoulder-length wavy black hair with subtle blue streaks, drop earrings, a small beauty mark near her mouth, a charcoal blazer, white top, black tailored trousers, and low-heeled black shoes.

Keep the same face, hair, outfit, body proportions, and overall identity consistent throughout the entire video.

Use the uploaded website screenshots as the strict visual reference for the environment.

The video must take place INSIDE the actual portfolio website, preserving the real UI design, layout, typography, colors, menu labels, windows, buttons, pixel-art style, and page structure exactly as shown in the uploaded screenshots.

Do not replace the website with a generic website.

Do not redesign the page.

Do not simplify the interface too much.

The website should remain recognizable as the same portfolio.

Official website reference:

https://yurim-portfolio-azure.vercel.app/#home

Core concept:

The character is a tiny virtual guide living inside her own portfolio website.

She physically walks on the website interface, stands on buttons or page sections, and gestures naturally while introducing the site.

The portfolio website itself is the world of the video.

Visual style:

A mixed-media video that combines the real retro pixel-art portfolio website with the stylized 3D female avatar character.

The character should feel like a small person inside a large digital interface.

Use believable scale, natural foot placement, soft contact shadows, and subtle depth.

Keep the website sharp and readable.

No unnecessary effects.

Scene flow:

Start from the real homepage of the portfolio website.

Show the blue sky pixel-art background, the "TIME_OUT.EXE" window, the "Time Out!" title, and the top navigation bar with menu items such as 소개, 연구용 게임, 오락 게임, 논문, 전시·발표, 과제, 일지.

0:00–0:03

The tiny female character appears near the "Time Out!" title on the homepage.

She steps forward naturally, looks at the camera, and gives a small welcoming gesture.

She says in Korean: "안녕하세요, 장유림의 포트폴리오입니다."

0:03–0:06

She walks toward the top navigation bar and lightly touches or points to the site menus while the camera follows her.

The website remains the same actual portfolio.

The motion is smooth and simple.

She says in Korean: "게임 개발과 연구 작업을 이곳에 모아두었습니다."

0:06–0:09

The view smoothly shifts to another actual section of the uploaded website, such as 소개, 연구용 게임, 오락 게임, 논문, or 과제, while preserving the real screenshot layout.

The character stands inside the page and gestures toward the content cards or text panels.

She says in Korean: "연구용 게임, 오락 게임, 논문, 과제를 살펴볼 수 있어요."

0:09–0:12

The character returns to a clear featured area of the site, faces the viewer, smiles softly, and waves.

She says in Korean: "천천히 둘러봐 주세요."

Camera:

Use one smooth continuous take or a nearly continuous seamless motion.

Vertical 9:16 format.

Gentle panning or zooming is allowed, but avoid dramatic camera motion.

The camera should help the viewer feel like they are traveling inside the website.

Audio:

Natural Korean female voice.

Friendly, calm, and professional tone.

No background music.

Only subtle interface ambience or light movement sounds if needed.

Strict requirements:

Preserve the uploaded website screenshots faithfully.

Preserve the uploaded character identity faithfully.

No extra characters.

No random subtitles.

No unrelated objects.

No scene outside the website.

No generic office or studio background.

No gameplay cutaways.

No distorted hands.

No broken anatomy.

No outfit changes.

The website itself must remain the main environment.

Final output:

A short vertical AI video of a tiny female guide walking and introducing her own portfolio website from inside the real website interface.
```
