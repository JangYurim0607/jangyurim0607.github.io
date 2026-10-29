  /* ===================================================================
     Supabase에서 내용을 불러와 화면에 그립니다
     =================================================================== */
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const arr = v => Array.isArray(v) ? v : [];

  function stateBox(el, kind, title, sub){
    el.innerHTML = `<div class="state-msg ${kind === 'err' ? 'err' : ''}"><b>${esc(title)}</b><span>${esc(sub||'')}</span></div>`;
  }

  function mediaBlock(p){
    if(p.youtube_url){
      const id = (p.youtube_url.match(/(?:v=|youtu\.be\/|shorts\/|embed\/)([\w-]{11})/) || [])[1];
      if(id) return `<div class="media"><iframe src="https://www.youtube.com/embed/${id}" title="${esc(p.title)}" allowfullscreen></iframe></div>`;
    }
    if(p.video_url) return `<div class="media"><video src="${esc(p.video_url)}" controls playsinline style="width:100%;height:100%;object-fit:cover"></video></div>`;
    if(p.cover_url) return `<div class="media"><img src="${esc(p.cover_url)}" alt="${esc(p.title)}" style="width:100%;height:100%;object-fit:cover" onerror="this.remove()"></div>`;
    return `<div class="media"><span>이미지 또는 영상이 아직 없습니다</span></div>`;
  }

  function projectCard(p){
    const links = arr(p.links).map(l =>
      `<a class="chip-link" href="${esc(l.url||'#')}" target="_blank" rel="noopener">${esc(l.label||'링크')}</a>`).join('');
    const notes = arr(p.notes);
    const notesBlock = notes.length ? `
      <div class="plan-box">
        ${p.notes_title ? `<h4>${esc(p.notes_title)}</h4>` : ''}
        <ul>${notes.map(n=>`<li>${esc(n)}</li>`).join('')}</ul>
        ${p.notes_badge ? `<span class="plan-status">${esc(p.notes_badge)}</span>` : ''}
      </div>` : '';

    return `
      <article class="project-card" data-status="${esc(p.status)}">
        ${mediaBlock(p)}
        <div class="card-body">
          <div class="card-top">
            <h3 class="card-title">${esc(p.title)}</h3>
            <span class="status ${esc(p.status)}">${esc(p.status_label || p.status)}</span>
          </div>
          ${p.description ? `<p class="project-desc">${esc(p.description)}</p>` : ''}
          <div class="tagrow">${arr(p.tags).map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div>
          <div class="meta">
            <div><small>Role</small><b>${esc(p.role||'—')}</b></div>
            <div><small>${esc(p.meta_label||'Status')}</small><b>${esc(p.meta_value||'—')}</b></div>
          </div>
          <div class="progress-row">
            <div class="progress"><span style="width:${Number(p.progress)||0}%"></span></div>
            <div class="progress-label">${Number(p.progress)||0}%</div>
          </div>
          ${links ? `<div class="links">${links}</div>` : '<div class="links"></div>'}
          ${notesBlock}
        </div>
      </article>`;
  }

  const STATIC_GAME = {
    kind:'entertainment', status:'done', status_label:'개발 완료',
    title:'똑딱이의 원고 대작전',
    description:'숲속 동물마을의 서점 주인 딱따구리 똑딱이가 작가들의 집을 돌며 원고를 받아오는 브라우저 게임. Claude Code로 제작한 HTML 단일 파일 게임입니다.',
    tags:['HTML5 Canvas','Claude Code','Web'],
    role:'기획 · 프롬프트 설계', meta_label:'Platform', meta_value:'Web (PC/모바일)', progress:100,
    links:[{label:'플레이하기',url:'https://coffee-delivery-game-week3-bookstor.vercel.app'},{label:'GitHub',url:'https://github.com/JangYurim0607/coffee-delivery-game-week3-bookstore'}]
  };

  /* ===== 과제 (정적 목록) — 새 과제는 이 배열에 한 줄씩 추가하세요 ===== */
  const ASSIGNMENTS = [
    { week:'2주차', title:'포트폴리오 사이트 만들기',
      description:'지금 보고 계신 포트폴리오 사이트입니다. 연구용·오락 게임, 논문, 전시·발표, 일지를 한곳에 모았습니다.',
      tags:['HTML','CSS','JavaScript','Supabase','Vercel'],
      links:[{label:'사이트 보기',url:'https://yurim-portfolio-azure.vercel.app'},{label:'GitHub',url:'https://github.com/JangYurim0607/jangyurim0607.github.io'}] },
    { week:'3주차', title:'관리자 페이지 만들기',
      description:'2주차 포트폴리오에 관리자 페이지를 붙였습니다. Supabase 로그인으로 들어가면 소개·게임·논문·전시·일지를 추가하고 고치고 지울 수 있고, 사진과 영상은 Supabase 저장소에 바로 올라갑니다. 오른쪽 아래 ⚙ 버튼으로 열 수 있습니다.',
      tags:['Supabase Auth','Supabase Storage','관리자 콘솔','Vercel'],
      links:[{label:'관리자 화면 열기',url:'https://yurim-portfolio-azure.vercel.app/#admin'},{label:'admin.js',url:'https://github.com/JangYurim0607/jangyurim0607.github.io/blob/main/src/admin.js'},{label:'Supabase 구성(md)',url:'https://github.com/JangYurim0607/jangyurim0607.github.io/blob/main/supabase/README.md'}] },
    { week:'4주차', title:'추석 휴강 · 커피 배달 게임 고도화로 대체',
      description:'4주차는 추석이라 휴강했습니다. 대신 3주차 수업에서 한 커피 배달 게임 고도화 과제를 5주차 수업 전까지 제출했고, 결과물은 아래 5주차 카드 두 개(똑딱이의 원고 대작전, 달빛 커피 배달단)에 있습니다.',
      tags:['휴강','5주차 과제로 이어짐'],
      links:[{label:'원본 수업 저장소',url:'https://github.com/Sjsj-prompt/coffee-delivery-game-week3'}] },
    { week:'5주차', title:'똑딱이의 원고 대작전',
      description:'Week3 커피 배달 게임 고도화 과제(5주차 과제). 서점 주인 딱따구리 똑딱이가 작가들의 집을 돌며 원고를 받아오는 브라우저 게임으로, 구조화한 프롬프트(B)로 Claude Code에서 만들었습니다.',
      tags:['HTML5 Canvas','Claude Code','Web'],
      links:[{label:'플레이하기',url:'https://coffee-delivery-game-week3-bookstor.vercel.app'},{label:'GitHub',url:'https://github.com/JangYurim0607/coffee-delivery-game-week3-bookstore'},{label:'실습 로그지(md)',url:'https://github.com/JangYurim0607/coffee-delivery-game-week3-bookstore/blob/main/WORKSHEET.md'}] },
    { week:'5주차', title:'달빛 커피 배달단',
      description:'Week3 커피 배달 게임 고도화 과제(5주차 과제). 프롬프트 구조화 실습으로 만든 별빛타운 커피 배달 경영 게임. 주문을 받고, 직접 만들고, 두 발로 배달해 4주 뒤 카페 랭킹 1위를 노립니다.',
      tags:['HTML','Claude Code','프롬프트 구조화'],
      links:[{label:'플레이하기',url:'https://yurim-portfolio-azure.vercel.app/moonlight-coffee.html'},{label:'GitHub',url:'https://github.com/JangYurim0607/coffee-delivery-game-week3-moonlight'}] }
    ,
    { week:'6주차', title:'송민서 학생 게임 똑같이 만들기',
      description:'송민서 학생의 커피 배달 게임(달동네 커피) 결과물을 프롬프트만으로 똑같이 재현하는 과제입니다. 시스템 프롬프트와 사용자 프롬프트를 고쳐 가며 만들었고, 최종 프롬프트로 두 번 생성한 결과가 상대방 테스트 8개를 모두 통과하고 비교 항목 38개가 모두 일치했습니다.',
      tags:['프롬프트 엔지니어링','Claude Code','HTML5','재현 실험'],
      links:[{label:'플레이하기',url:'https://yurim-portfolio-azure.vercel.app/%EC%86%A1%EB%AF%BC%EC%84%9C.html'},{label:'송민서.html',url:'https://github.com/JangYurim0607/jangyurim0607.github.io/blob/main/%EC%86%A1%EB%AF%BC%EC%84%9C.html'},{label:'프롬프트와 과정(md)',url:'https://github.com/JangYurim0607/jangyurim0607.github.io/blob/main/assignments/week6/%EC%86%A1%EB%AF%BC%EC%84%9C.md'}] },
    ,
    { week:'7주차', title:'스킬 만들기: 로블록스 숏츠 키워드 분석 + 스토리보드',
      description:'같은 과제(로블록스 숏츠 키워드 분석 PDF와 3편짜리 스토리보드 PDF)를 스킬 없이(A) 한 번, 오픈소스 스킬 7개와 직접 만든 한국어 스킬 1개를 묶은 패키지로(B) 한 번 만들어 비교했습니다. 프롬프트는 md, 결과물은 PDF로 올렸습니다.',
      tags:['Claude Skills','프롬프트(md)','키워드 분석','PDF','A/B 비교'],
      links:[{label:'GitHub',url:'https://github.com/JangYurim0607/week6_skills_package'},{label:'A 키워드 분석(PDF)',url:'https://github.com/JangYurim0607/week6_skills_package/blob/main/A_baseline/output/keyword_analysis.pdf'},{label:'A 스토리보드(PDF)',url:'https://github.com/JangYurim0607/week6_skills_package/blob/main/A_baseline/output/storyboard.pdf'},{label:'B 키워드 분석(PDF)',url:'https://github.com/JangYurim0607/week6_skills_package/blob/main/B_skills/output/keyword_analysis.pdf'},{label:'B 스토리보드(PDF)',url:'https://github.com/JangYurim0607/week6_skills_package/blob/main/B_skills/output/storyboard.pdf'},{label:'A 프롬프트(md)',url:'https://github.com/JangYurim0607/week6_skills_package/blob/main/A_baseline/prompt.md'},{label:'B 프롬프트(md)',url:'https://github.com/JangYurim0607/week6_skills_package/blob/main/B_skills/prompt.md'},{label:'A/B 비교(md)',url:'https://github.com/JangYurim0607/week6_skills_package/blob/main/compare/COMPARISON.md'}] }
    ,
    { week:'8주차', title:'피그마로 포트폴리오 디자인: 레이아웃 3종 · 브로슈어 · 명함',
      description:'Claude Code에 Figma 플러그인을 연결해 사이트의 색과 폰트를 토큰·컴포넌트로 옮기고 레이아웃 3종을 그린 뒤, 명함과 같은 도트 디자인으로 사이트 자체를 개편했습니다(홈 제목 Time Out!). 개편한 모바일 웹·아이패드·Phone UI 레이아웃은 피그마 01 페이지, 도트 브로슈어는 02 페이지에 있습니다. 로고는 Figma AI로 생성했습니다. 명함은 AI로 만든 실버 도트 노트북이 명함 전체를 채우게 했습니다. 앞면은 모니터 속 파란 하늘·초원 바탕화면에 픽셀 아이콘, 한글 도트 폰트(Neo둥근모)로 쓴 인적 정보, 포트폴리오 QR과 마우스 커서를 넣었고, 뒷면은 게임·학교 스티커가 붙은 덮개입니다. 그리고 사이트를 중심으로 한 A4 브로슈어 1장도 만들었습니다.',
      tags:['Figma','Claude Code','Figma MCP','이미지 생성','도트 리디자인','브로슈어','명함'],
      links:[{label:'피그마 페이지',url:'https://www.figma.com/design/pBcYNrcHfAOoEClr46me2K'},{label:'프롬프트(md)',url:'https://github.com/JangYurim0607/jangyurim0607.github.io/blob/main/assignments/week8/prompts.md'},{label:'브로슈어(PDF)',url:'https://yurim-portfolio-azure.vercel.app/assignments/week8/brochure.pdf'},{label:'명함 앞면',url:'https://yurim-portfolio-azure.vercel.app/assignments/week8/card-front.png'},{label:'명함 뒷면',url:'https://yurim-portfolio-azure.vercel.app/assignments/week8/card-back.png'},{label:'세로 명함 앞면',url:'https://yurim-portfolio-azure.vercel.app/assignments/week8/card-front-vertical.png'},{label:'세로 명함 뒷면',url:'https://yurim-portfolio-azure.vercel.app/assignments/week8/card-back-vertical.png'},{label:'로고',url:'https://yurim-portfolio-azure.vercel.app/assignments/week8/logo.png'},{label:'모바일 웹',url:'https://yurim-portfolio-azure.vercel.app/assignments/week8/layout-mobile.png'},{label:'아이패드',url:'https://yurim-portfolio-azure.vercel.app/assignments/week8/layout-ipad.png'},{label:'Phone UI',url:'https://yurim-portfolio-azure.vercel.app/assignments/week8/layout-phone-ui.png'},{label:'Phone UI(웹)',url:'https://yurim-portfolio-azure.vercel.app/assignments/week8/pixel/phone-ui.html'},{label:'브로슈어(웹)',url:'https://yurim-portfolio-azure.vercel.app/assignments/week8/pixel/brochure.html'},{label:'이전 파스텔 시안',url:'https://github.com/JangYurim0607/jangyurim0607.github.io/tree/main/assignments/week8/v1'}] }
    ,
    { week:'8주차', title:'영상 생성: 내가 랜딩페이지를 소개한다 (숏폼)',
      description:'세미나에서 다룬 인물 중심 숏폼입니다. Runway(Seedance 2.5)로 만든 12초 세로(9:16) 원테이크 영상으로, 도트 디자인으로 바꾼 이 포트폴리오 사이트 안에서 인물이 사이트를 소개합니다.',
      tags:['Runway','Seedance 2.5','Reference to Video','Image to Video','Frame to Frame','9:16 숏폼'],
      video:{src:'/assignments/week8/video/landing-shortform.mp4',poster:'/assignments/week8/video/poster.jpg'},
      links:[{label:'영상 파일(mp4)',url:'https://yurim-portfolio-azure.vercel.app/assignments/week8/video/landing-shortform.mp4'},{label:'프롬프트(md)',url:'https://github.com/JangYurim0607/jangyurim0607.github.io/blob/main/assignments/week8/video/prompt.md'},{label:'워크플로우 이미지',url:'https://yurim-portfolio-azure.vercel.app/assignments/week8/video/workflow.png'},{label:'워크플로우(웹)',url:'https://yurim-portfolio-azure.vercel.app/assignments/week8/video/workflow.html'}] }
    ,
    { week:'9주차 중간 프로젝트', title:'뱁새 발표 앱: 커서를 따라다니며 화면을 발표하는 캐릭터',
      description:'마우스 커서를 따라다니는 뱁새가 커서를 댄 곳을 미리 읽어 두었다가, 클릭하면 청중 앞에서 발표하듯 "~입니다" 발표체로 설명해 주는 데스크톱 앱(Electron + Claude)입니다. 학술적인 내용은 책, 재미있는 내용은 마이크, 중요한 내용은 확성기를 들고 설명하고, 욕설·개인정보는 새소리로 바꿉니다. 더블클릭하면 중단하고, 뱁새를 우클릭하면 마이크를 건네며 청중 질문을 받습니다. 캐릭터는 직접 만든 시트 3장에서 포즈를 잘라 썼습니다.',
      tags:['Electron','Claude API','비전','캐릭터 시트','TTS','발표 앱'],
      video:{src:'/assignments/week9/demo-30s.mp4',poster:'/assignments/week9/poster.jpg',wide:true},
      links:[{label:'시연 영상 30초(mp4)',url:'https://yurim-portfolio-azure.vercel.app/assignments/week9/demo-30s.mp4'},{label:'시연 원본 영상(mp4)',url:'https://yurim-portfolio-azure.vercel.app/assignments/week9/demo-original.mp4'},{label:'GitHub',url:'https://github.com/JangYurim0607/baepsae-presenter'},{label:'프롬프트와 과정(md)',url:'https://github.com/JangYurim0607/jangyurim0607.github.io/blob/main/assignments/week9/prompts.md'},{label:'캐릭터 시트(안경)',url:'https://yurim-portfolio-azure.vercel.app/assignments/week9/sheet-glasses.webp'},{label:'캐릭터 시트(마이크)',url:'https://yurim-portfolio-azure.vercel.app/assignments/week9/sheet-mic.webp'},{label:'캐릭터 시트(확성기)',url:'https://yurim-portfolio-azure.vercel.app/assignments/week9/sheet-megaphone.webp'}] }
  ];

  function renderAssignments(){
    const el = document.getElementById('assignments-grid');
    if(!el) return;
    el.innerHTML = ASSIGNMENTS.map(a => `
      <article class="project-card">
        ${a.video ? (a.video.wide ? `<div class="media" style="aspect-ratio:auto;background:var(--ink)"><video src="${esc(a.video.src)}" poster="${esc(a.video.poster||'')}" controls playsinline preload="metadata" style="display:block;width:100%;height:auto"></video></div>` : `<div class="media vertical"><video src="${esc(a.video.src)}" poster="${esc(a.video.poster||'')}" controls playsinline preload="metadata"></video></div>`) : ''}
        <div class="card-body">
          <div class="card-top">
            <h3 class="card-title">${esc(a.title)}</h3>
            <span class="status done">${esc(a.week)}</span>
          </div>
          <p class="project-desc">${esc(a.description)}</p>
          <div class="tagrow">${a.tags.map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div>
          <div class="links">${a.links.map(l=>`<a class="chip-link" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join('')}</div>
        </div>
      </article>`).join('');
  }
  renderAssignments();

  function renderProjects(){
    [['research','research-grid'],['entertainment','games-grid']].forEach(([kind,id])=>{
      const el = document.getElementById(id);
      const list = store.projects.filter(p => p.kind === kind);
      if(kind === 'entertainment') list.push(STATIC_GAME);
      if(!list.length){
        stateBox(el, 'empty', '아직 등록된 게임이 없습니다', '관리자 화면에서 추가할 수 있습니다');
        return;
      }
      el.innerHTML = list.map(projectCard).join('');
    });
    if(window.attachDiaryButtons) window.attachDiaryButtons();
  }

  function renderPapers(){
    const wipEl = document.getElementById('papers-wip');
    const pubEl = document.getElementById('papers-pub');
    const wip = store.papers.filter(p => p.state === 'wip');
    const pub = store.papers.filter(p => p.state === 'published');

    wipEl.innerHTML = wip.length ? `<div class="subhead">쓰는 중</div>` + wip.map(p=>`
      <article class="wip">
        <div class="wip-main">
          <span class="wip-label">집필 중${p.year ? ' · ' + esc(p.year) : ''}</span>
          <h3>${esc(p.title)}</h3>
          ${p.abstract ? `<p>${esc(p.abstract)}</p>` : ''}
          <div class="tagrow">${arr(p.tags).map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div>
          <div class="progress-row">
            <div class="progress"><span style="width:${Number(p.progress)||0}%"></span></div>
            <div class="progress-label">${Number(p.progress)||0}%</div>
          </div>
        </div>
        <div class="wip-side">
          <h4>진행 상황</h4>
          <ol>${arr(p.steps).map(s=>`<li>${esc(s)}</li>`).join('')}</ol>
        </div>
      </article>`).join('') : '';

    pubEl.innerHTML = pub.length
      ? `<div class="subhead">등재 · 게재</div><div class="paper-list">` + pub.map(p=>`
          <article class="paper">
            <div class="year">${esc(p.year)}</div>
            <div><h3>${esc(p.title)}</h3><p>${esc(p.authors_venue)}</p></div>
            ${p.url ? `<a href="${esc(p.url)}" target="_blank" rel="noopener">Paper ↗</a>` : '<span></span>'}
          </article>`).join('') + `</div>`
      : (wip.length ? '' : `<div class="paper-list"><div class="state-msg"><b>아직 등록된 논문이 없습니다</b><span>관리자 화면에서 추가할 수 있습니다</span></div></div>`);
  }

  function renderEvents(){
    const el = document.getElementById('events-list');
    if(!store.events.length){
      stateBox(el, 'empty', '아직 등록된 전시·발표가 없습니다', '관리자 화면에서 추가할 수 있습니다');
      return;
    }
    el.innerHTML = store.events.map(e=>`
      <article class="event">
        <div class="date">${esc(e.date_label)}</div>
        <div><h3>${esc(e.title)}</h3><p>${esc(e.description)}</p></div>
        ${e.url ? `<a href="${esc(e.url)}" target="_blank" rel="noopener">View ↗</a>` : '<span></span>'}
      </article>`).join('');
  }

  function renderProfile(){
    const p = store.profile;
    if(!p) return;
    document.getElementById('pEyebrow').textContent = p.eyebrow || '';
    // 큰 제목 "Time Out!" 과 그 아래 소개 한 줄은 도트 디자인의 일부라 index.html 에 고정해 두었습니다
    document.getElementById('pBio').textContent = p.bio || '';

    document.getElementById('pSkills').innerHTML = arr(p.skills).map(s=>`<span class="tag">${esc(s)}</span>`).join('');
    document.getElementById('pTools').innerHTML  = arr(p.tools ).map(s=>`<span class="tag">${esc(s)}</span>`).join('');

    const links = arr(p.links);
    document.getElementById('pLinks').innerHTML = links.map(l=>
      `<a class="chip-link" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join('');
    document.getElementById('fLinks').innerHTML =
      (p.email ? `<a href="mailto:${esc(p.email)}">${esc(p.email)}</a>` : '') +
      links.map(l=>`<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join('');

    if(p.photo_url){
      document.getElementById('pPhoto').innerHTML =
        `<img src="${esc(p.photo_url)}" alt="프로필 사진" style="width:100%;height:100%;object-fit:cover;border-radius:22px">`;
    }

    const research = store.projects.filter(x=>x.kind==='research').length;
    const pub = store.papers.filter(x=>x.state==='published').length;
    const wip = store.papers.filter(x=>x.state==='wip').length;
    document.getElementById('pStats').innerHTML = `
      <div class="mini-stat"><b>${research}</b><span>연구용 게임</span></div>
      <div class="mini-stat"><b>${pub}</b><span>등재 논문</span></div>
      <div class="mini-stat"><b>${wip}</b><span>집필 중</span></div>`;
  }

  async function loadAll(){
    ['research-grid','games-grid','events-list'].forEach(id =>
      stateBox(document.getElementById(id), 'load', '불러오는 중…', ''));

    try{
      const [pf, pj, pp, ev, lg] = await Promise.all([
        sb.from('profile').select('*').eq('id',1).maybeSingle(),
        sb.from('projects').select('*').order('sort_order').order('created_at'),
        sb.from('papers').select('*').order('sort_order').order('created_at'),
        sb.from('events').select('*').order('sort_order').order('created_at'),
        sb.from('logs').select('*').order('log_date', {ascending:false})
      ]);
      const err = [pf,pj,pp,ev,lg].find(r => r.error);
      if(err) throw err.error;

      store.profile  = pf.data;
      store.projects = pj.data || [];
      store.papers   = pp.data || [];
      store.events   = ev.data || [];
      store.logs     = lg.data || [];

      renderProfile(); renderProjects(); renderPapers(); renderEvents();
      if(window.refreshDiary) window.refreshDiary();
    }catch(e){
      ['research-grid','games-grid','events-list'].forEach(id =>
        stateBox(document.getElementById(id), 'err', '내용을 불러오지 못했습니다',
          '데이터베이스 연결을 확인해 주세요 · ' + (e.message || '')));
      document.getElementById('pBio').textContent = '내용을 불러오지 못했습니다.';
      console.error(e);
    }
  }
