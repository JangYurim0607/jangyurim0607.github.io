  /* ===================================================================
     그림일기 — Supabase에 저장되어 방문자에게도 보입니다
     =================================================================== */
  (function(){
    const AREAS = ["기획","개발","아트","사운드","연구","PR"];
    const WEATHERS = ["☀️","🌤","☁️","🌧","⛄"];

    const overlay   = document.getElementById('diaryOverlay');
    const deckEl    = document.getElementById('deck');
    const deckView  = document.getElementById('diaryDeckView');
    const writeView = document.getElementById('diaryWrite');
    const titleEl   = document.getElementById('diaryTitle');
    const projSel   = document.getElementById('diaryProject');
    const countEl   = document.getElementById('deckCount');
    const fProject  = document.getElementById('fProject');
    const fAreas    = document.getElementById('fAreas');
    const fWeather  = document.getElementById('fWeather');
    const fDate     = document.getElementById('fDate');
    const fDid      = document.getElementById('fDid');
    const fFeel     = document.getElementById('fFeel');
    const hintEl    = document.getElementById('diaryHint');
    const newBtn    = document.getElementById('newEntry');

    let view = [], cursor = 0, filter = '전체', editing = null;

    fAreas.innerHTML = AREAS.map(a=>`<label><input type="checkbox" value="${a}">${a}</label>`).join('');
    fWeather.innerHTML = WEATHERS.map((w,i)=>
      `<label class="${i===1?'on':''}"><input type="radio" name="wx" value="${w}" ${i===1?'checked':''}>${w}</label>`).join('');
    [fAreas,fWeather].forEach(box => box.addEventListener('change', ()=>{
      box.querySelectorAll('label').forEach(l=>l.classList.toggle('on', l.querySelector('input').checked));
    }));

    function projectNames(){ return store.projects.map(p=>p.title); }
    function fillSelects(){
      const names = projectNames();
      projSel.innerHTML = ['전체', ...names].map(n=>`<option>${esc(n)}</option>`).join('');
      fProject.innerHTML = (names.length ? names : ['(프로젝트 없음)']).map(n=>`<option>${esc(n)}</option>`).join('');
      projSel.value = filter;
    }

    /* 프로젝트 카드마다 일지 버튼 */
    window.attachDiaryButtons = function(){
      document.querySelectorAll('.project-card').forEach(card=>{
        if(card.querySelector('.diary-open') || card.closest('#assignments-grid')) return;
        const name = card.querySelector('.card-title').textContent.trim();
        const links = card.querySelector('.links');
        if(!links) return;
        const b = document.createElement('button');
        b.className = 'chip-link diary-open';
        b.type = 'button';
        b.textContent = '📔 일지';
        b.addEventListener('click', ()=> open(name));
        links.appendChild(b);
      });
    };

    function open(project){
      filter = project || '전체';
      fillSelects();
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      showDeck(); render();
    }
    window.openDiary = open;
    window.refreshDiary = ()=>{ if(overlay.classList.contains('open')) { fillSelects(); render(); } };

    function close(){ overlay.classList.remove('open'); document.body.style.overflow=''; }
    function showDeck(){ deckView.style.display=''; writeView.style.display='none'; }
    function showWrite(){ deckView.style.display='none'; writeView.style.display=''; }

    document.getElementById('diaryClose').addEventListener('click', close);
    overlay.addEventListener('click', e=>{ if(e.target === overlay) close(); });
    projSel.addEventListener('change', ()=>{ filter = projSel.value; cursor = 0; render(); });

    const weekday = d => ['일','월','화','수','목','금','토'][new Date(d+'T00:00').getDay()];

    function render(){
      titleEl.textContent = filter === '전체' ? '프로젝트 일지' : filter + ' 일지';
      newBtn.style.display = store.session ? '' : 'none';
      hintEl.textContent = '일지는 Supabase에 저장되어 방문자에게도 보입니다.';

      view = store.logs.filter(l => filter === '전체' || l.project === filter);
      if(cursor >= view.length) cursor = Math.max(0, view.length - 1);

      deckEl.innerHTML = '';
      if(!view.length){
        deckEl.innerHTML = `<div class="deck-empty"><div><b>아직 붙인 일지가 없어요</b>
          <span>${store.session ? '아래 버튼으로 첫 장을 써 보세요' : '관리자가 로그인하면 쓸 수 있습니다'}</span></div></div>`;
        countEl.textContent = '0 / 0';
        return;
      }

      view.forEach((l,i)=>{
        const d = i - cursor;
        if(d < -1 || d > 4) return;
        const el = document.createElement('article');
        el.className = 'sheet' + (d === 0 ? ' front' : '');
        el.style.zIndex = 100 - Math.abs(d);
        if(d < 0){ el.style.transform = 'translateX(-118%) rotate(-11deg)'; el.style.opacity = '0'; }
        else{
          const tilt = ((i*37)%5 - 2) * 0.6;
          el.style.transform = `translateY(${d*11}px) translateX(${d*5}px) scale(${1-d*0.035}) rotate(${d===0?0:tilt}deg)`;
          el.style.opacity = d > 3 ? '0' : '1';
        }
        el.innerHTML = `
          <div class="sheet-inner">
            <div class="sheet-head">
              <div class="d">${esc(l.log_date)} ${weekday(l.log_date)}요일 · ${esc(l.project)}</div>
              <div class="w">${esc(l.weather || '🌤')}</div>
            </div>
            <div class="sheet-art">
              ${l.art_url ? `<img src="${esc(l.art_url)}" alt="그날의 그림" onerror="this.remove()">` : '<span class="empty">✎</span>'}
            </div>
            <div class="sheet-areas">${arr(l.areas).map(a=>`<span class="area-tag" data-a="${esc(a)}">${esc(a)}</span>`).join('')}</div>
            <div class="sheet-body">
              <p><span class="lab">한 일</span>${esc(l.did)}</p>
              <p class="feel"><span class="lab">감상</span>${esc(l.feel)}</p>
            </div>
            ${store.session ? `<div class="sheet-tools">
              <button data-edit="${l.id}">고치기</button>
              <button data-del="${l.id}">떼어내기</button></div>` : ''}
          </div>`;
        deckEl.appendChild(el);
      });
      countEl.textContent = `${cursor+1} / ${view.length}`;
      bindFront();
    }

    function go(n){ if(!view.length) return; cursor = Math.min(Math.max(0,cursor+n), view.length-1); render(); }
    document.getElementById('nextSheet').addEventListener('click', ()=>go(1));
    document.getElementById('prevSheet').addEventListener('click', ()=>go(-1));
    document.addEventListener('keydown', e=>{
      if(!overlay.classList.contains('open')) return;
      if(e.key === 'Escape') close();
      if(writeView.style.display !== 'none') return;
      if(e.key === 'ArrowRight') go(1);
      if(e.key === 'ArrowLeft')  go(-1);
    });

    function bindFront(){
      const front = deckEl.querySelector('.sheet.front');
      if(!front) return;
      front.querySelectorAll('[data-del]').forEach(b=> b.addEventListener('click', async e=>{
        e.stopPropagation();
        if(!confirm('이 장을 떼어낼까요?')) return;
        const { error } = await sb.from('logs').delete().eq('id', b.dataset.del);
        if(error){ alert('지우지 못했습니다 · ' + error.message); return; }
        await loadAll(); render();
      }));
      front.querySelectorAll('[data-edit]').forEach(b=> b.addEventListener('click', e=>{
        e.stopPropagation();
        openForm(store.logs.find(l=>String(l.id)===b.dataset.edit));
      }));

      let x0 = null;
      front.addEventListener('pointerdown', e=>{
        if(e.target.closest('button')) return;
        x0 = e.clientX; front.classList.add('dragging'); front.setPointerCapture(e.pointerId);
      });
      front.addEventListener('pointermove', e=>{
        if(x0 === null) return;
        const dx = e.clientX - x0;
        front.style.transform = `translateX(${dx}px) rotate(${dx/26}deg)`;
      });
      const end = e=>{
        if(x0 === null) return;
        const dx = e.clientX - x0; x0 = null;
        front.classList.remove('dragging');
        if(dx < -70) go(1); else if(dx > 70) go(-1); else render();
      };
      front.addEventListener('pointerup', end);
      front.addEventListener('pointercancel', ()=>{ x0=null; front.classList.remove('dragging'); render(); });
    }

    /* ---- 그림판 ---- */
    const pad = document.getElementById('pad');
    const ctx = pad.getContext('2d');
    let color = '#3a3a52', erasing = false, drawing = false, dirty = false;
    function clearPad(){ ctx.fillStyle = '#fffef9'; ctx.fillRect(0,0,pad.width,pad.height); dirty = false; }
    clearPad(); ctx.lineCap = ctx.lineJoin = 'round';
    const padPos = e => { const r = pad.getBoundingClientRect();
      return { x:(e.clientX-r.left)*pad.width/r.width, y:(e.clientY-r.top)*pad.height/r.height }; };
    pad.addEventListener('pointerdown', e=>{
      drawing = true; dirty = true; pad.setPointerCapture(e.pointerId);
      const p = padPos(e);
      ctx.beginPath(); ctx.moveTo(p.x,p.y);
      ctx.strokeStyle = erasing ? '#fffef9' : color;
      ctx.lineWidth = erasing ? 34 : 4;
      ctx.lineTo(p.x+.1,p.y+.1); ctx.stroke();
    });
    pad.addEventListener('pointermove', e=>{ if(!drawing) return; const p = padPos(e); ctx.lineTo(p.x,p.y); ctx.stroke(); });
    ['pointerup','pointercancel','pointerleave'].forEach(ev => pad.addEventListener(ev, ()=>{ drawing = false; }));
    document.getElementById('padTools').addEventListener('click', e=>{
      const sw = e.target.closest('.swatch');
      if(sw){ color = sw.dataset.c; erasing = false;
        document.querySelectorAll('.swatch').forEach(s=>s.classList.toggle('on', s===sw)); }
    });
    document.getElementById('padErase').addEventListener('click', ()=>{ erasing = true; });
    document.getElementById('padClear').addEventListener('click', clearPad);

    /* ---- 쓰기 ---- */
    function openForm(entry){
      editing = entry || null;
      document.getElementById('writeTitle').textContent = entry ? '일지 고치기' : '새 일지';
      fillSelects();
      fDate.value = entry ? entry.log_date : new Date().toISOString().slice(0,10);
      if(entry) fProject.value = entry.project;
      else if(filter !== '전체') fProject.value = filter;
      fDid.value = entry ? entry.did : '';
      fFeel.value = entry ? entry.feel : '';
      fAreas.querySelectorAll('input').forEach(i=> i.checked = entry ? arr(entry.areas).includes(i.value) : false);
      const wx = entry ? entry.weather : '🌤';
      fWeather.querySelectorAll('input').forEach(i=> i.checked = (i.value === wx));
      [fAreas,fWeather].forEach(box => box.querySelectorAll('label').forEach(l=>
        l.classList.toggle('on', l.querySelector('input').checked)));
      clearPad();
      if(entry && entry.art_url){
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = ()=>{ ctx.drawImage(img,0,0,pad.width,pad.height); dirty = false; };
        img.src = entry.art_url;
      }
      showWrite();
    }

    newBtn.addEventListener('click', ()=> openForm(null));
    document.getElementById('cancelEntry').addEventListener('click', ()=>{ showDeck(); render(); });

    document.getElementById('saveEntry').addEventListener('click', async ()=>{
      if(!store.session){ alert('먼저 관리자로 로그인해 주세요.'); return; }
      const did = fDid.value.trim();
      if(!did){ fDid.focus(); alert('한 일을 한 줄만 적어 주세요.'); return; }

      const btn = document.getElementById('saveEntry');
      btn.disabled = true; btn.textContent = '저장하는 중…';
      let uploadedPath = null;
      try{
        let art_url = editing ? editing.art_url : null;
        if(dirty){
          const blob = await new Promise(r => pad.toBlob(r, 'image/webp', 0.75));
          const path = `logs/${Date.now()}-${Math.random().toString(36).slice(2,7)}.webp`;
          const { error } = await sb.storage.from(STORAGE_BUCKET).upload(path, blob);
          if(error) throw new Error('그림을 올리지 못했습니다 · ' + error.message);
          uploadedPath = path;
          art_url = sb.storage.from(STORAGE_BUCKET).getPublicUrl(path).data.publicUrl;
        }

        const payload = {
          project: fProject.value,
          log_date: fDate.value || new Date().toISOString().slice(0,10),
          weather: fWeather.querySelector('input:checked').value,
          areas: [...fAreas.querySelectorAll('input:checked')].map(i=>i.value),
          did,
          feel: fFeel.value.trim(),
          art_url
        };
        const res = editing
          ? await sb.from('logs').update(payload).eq('id', editing.id)
          : await sb.from('logs').insert(payload);
        if(res.error) throw res.error;

        await loadAll();
        filter = payload.project; cursor = 0;
        fillSelects();
        showDeck(); render();
      }catch(e){
        if(uploadedPath) await sb.storage.from(STORAGE_BUCKET).remove([uploadedPath]);
        alert('저장하지 못했습니다.\n\n' + (e.message || ''));
      }
      btn.disabled = false; btn.textContent = '일지 붙이기';
    });

    fillSelects();
  })();
