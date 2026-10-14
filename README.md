# 장유림 포트폴리오

게임 개발과 연구를 모아둔 포트폴리오 사이트입니다.

**사이트 보기:** https://yurim-portfolio-azure.vercel.app

## 구성
소개 · 연구용 게임 · 오락 게임 · 논문 · 전시·발표 · 과제 · 일지

## 기술
HTML, CSS, JavaScript, Supabase(DB·로그인·파일 저장소), Vercel(배포)

## 폴더 구조
```
.
├── index.html          # 페이지 뼈대 (메뉴와 각 섹션)
├── src/
│   ├── styles.css      # 전체 스타일
│   ├── config.js       # Supabase 연결 설정
│   ├── nav.js          # 메뉴·페이지 이동
│   ├── data.js         # 데이터 불러오기·카드 그리기, 과제 목록(ASSIGNMENTS)
│   ├── admin.js        # 관리자 화면
│   ├── diary.js        # 일지(그림일기)
│   └── main.js         # 시작 지점
├── supabase/
│   └── README.md       # 테이블 구성 설명
├── .env.example        # 환경 변수 예시
└── .gitignore
```

## 과제 추가하는 법
`src/data.js` 의 `ASSIGNMENTS` 목록에 항목을 한 덩어리 추가하면 "과제" 페이지에 카드가 생깁니다.

## 배포
`main` 브랜치에 푸시하면 Vercel이 자동으로 배포합니다.
