  /* ===================================================================
     페이지 이동
     =================================================================== */
  (function(){
    const body = document.body;
    const sections = [...document.querySelectorAll('.section')];
    const navItems = [...document.querySelectorAll('.navlinks a')];

    window.showHome = function(pushHash = true){
      body.className = 'home-mode';
      sections.forEach(s => s.classList.remove('active-section'));
      navItems.forEach(a => a.classList.remove('active'));
      window.scrollTo({top:0, behavior:'smooth'});
      if(pushHash && location.hash !== '#home') history.pushState(null,'','#home');
    };

    window.showSection = function(id, pushHash = true){
      const target = document.getElementById(id);
      if(!target) return showHome(pushHash);
      body.className = `page-mode theme-${id}`;
      sections.forEach(s => s.classList.toggle('active-section', s.id === id));
      navItems.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
      window.scrollTo({top:0, behavior:'smooth'});
      if(pushHash && location.hash !== `#${id}`) history.pushState(null,'',`#${id}`);
    };

    document.querySelector('.brand').addEventListener('click', e=>{ e.preventDefault(); showHome(); });

    navItems.forEach(a=>{
      a.addEventListener('click', e=>{
        e.preventDefault();
        if(a.hasAttribute('data-diary')){ window.openDiary && window.openDiary('전체'); return; }
        showSection(a.getAttribute('href').slice(1));
      });
    });

    document.querySelectorAll('.desk-icon').forEach(a=>{
      a.addEventListener('click', e=>{
        e.preventDefault();
        if(a.hasAttribute('data-diary')){ window.openDiary && window.openDiary('전체'); return; }
        showSection(a.getAttribute('href').slice(1));
      });
    });

    document.querySelectorAll('.page-back').forEach(a=>{
      a.addEventListener('click', e=>{ e.preventDefault(); showHome(); });
    });

    window.addEventListener('popstate', ()=>{
      const id = location.hash.replace('#','');
      if(!id || id === 'home') showHome(false);
      else if(id === 'admin') { showHome(false); window.openAdmin && window.openAdmin(); }
      else showSection(id, false);
    });

    // 필터는 카드가 그려진 뒤에도 동작하도록 위임 방식으로 처리합니다
    document.querySelectorAll('.filterbar').forEach(bar=>{
      bar.addEventListener('click', e=>{
        const btn = e.target.closest('.filter');
        if(!btn) return;
        bar.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        document.getElementById(bar.dataset.target)
          .querySelectorAll('.project-card')
          .forEach(card=>{
            card.style.display = (f === 'all' || card.dataset.status === f) ? 'block' : 'none';
          });
      });
    });

    const initial = location.hash.replace('#','');
    if(initial && initial !== 'home' && initial !== 'admin') showSection(initial, false);
    else showHome(false);
  })();
