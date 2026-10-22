  /* ===================================================================
     관리자 페이지 — 로그인 / 업로드 / 수정 / 삭제
     =================================================================== */
  (function(){
    const SCHEMA = {
      profile: { label:'소개', single:true, fields:[
        {k:'eyebrow',  t:'text',     label:'맨 윗줄'},
        {k:'subline',  t:'text',     label:'제목 아래 한 줄'},
        {k:'bio',      t:'textarea', label:'소개 글'},
        {k:'skills',   t:'list',     label:'관심 분야', hint:'쉼표로 구분'},
        {k:'tools',    t:'list',     label:'사용 툴',   hint:'쉼표로 구분'},
        {k:'email',    t:'text',     label:'공개 이메일'},
        {k:'links',    t:'links',    label:'링크', hint:'한 줄에 하나씩 · 이름|주소'},
        {k:'photo_url',t:'file',     label:'프로필 사진', accept:'image/*'}
      ]},
      projects: { label:'게임', title:'title', fields:[
        {k:'kind',        t:'select', label:'구분', opts:[['research','연구용 게임'],['entertainment','오락 게임']]},
        {k:'title',       t:'text',   label:'제목', req:true},
        {k:'status',      t:'select', label:'상태', opts:[['done','개발 완료'],['beta','베타 테스트'],['proto','프로토타입'],['planning','기획 단계']]},
        {k:'status_label',t:'text',   label:'카드에 쓸 상태 문구', hint:'비우면 상태값이 그대로 나옵니다'},
        {k:'description', t:'textarea', label:'설명'},
        {k:'tags',        t:'list',   label:'태그', hint:'쉼표로 구분'},
        {k:'role',        t:'text',   label:'역할'},
        {k:'meta_label',  t:'text',   label:'추가 항목 이름', hint:'예: Status, Team, 쓰임'},
        {k:'meta_value',  t:'text',   label:'추가 항목 값'},
        {k:'progress',    t:'number', label:'진행률 (0~100)'},
        {k:'cover_url',   t:'file',   label:'대표 이미지', accept:'image/*'},
        {k:'youtube_url', t:'text',   label:'유튜브 링크', hint:'영상이 있으면 이미지보다 먼저 나옵니다'},
        {k:'video_url',   t:'file',   label:'영상 파일 (mp4)', accept:'video/mp4'},
        {k:'links',       t:'links',  label:'링크', hint:'한 줄에 하나씩 · 이름|주소'},
        {k:'notes_title', t:'text',   label:'덧붙임 제목', hint:'예: 👁 안과와 해보고 싶은 것'},
        {k:'notes',       t:'lines',  label:'덧붙임 내용', hint:'한 줄에 하나씩'},
        {k:'notes_badge', t:'text',   label:'덧붙임 배지'},
        {k:'sort_order',  t:'number', label:'정렬 순서', hint:'작을수록 먼저'}
      ]},
      papers: { label:'논문', title:'title', fields:[
        {k:'state',        t:'select', label:'구분', opts:[['wip','쓰는 중'],['published','등재 · 게재']]},
        {k:'year',         t:'text',   label:'연도'},
        {k:'title',        t:'text',   label:'제목', req:true},
        {k:'authors_venue',t:'text',   label:'저자 · 학회 · 상태'},
        {k:'abstract',     t:'textarea', label:'설명', hint:'쓰는 중인 논문에만 나옵니다'},
        {k:'tags',         t:'list',   label:'태그', hint:'쉼표로 구분'},
        {k:'progress',     t:'number', label:'진행률 (0~100)'},
        {k:'steps',        t:'lines',  label:'진행 상황', hint:'한 줄에 하나씩'},
        {k:'url',          t:'text',   label:'논문 주소 / DOI'},
        {k:'sort_order',   t:'number', label:'정렬 순서'}
      ]},
      events: { label:'전시·발표', title:'title', fields:[
        {k:'date_label', t:'text', label:'날짜 표시', hint:'예: OCT · 2026'},
        {k:'title',      t:'text', label:'제목', req:true},
        {k:'description',t:'textarea', label:'설명'},
        {k:'url',        t:'text', label:'링크'},
        {k:'sort_order', t:'number', label:'정렬 순서'}
      ]},
      logs: { label:'일지', title:'did', fields:[
        {k:'log_date', t:'date',  label:'날짜'},
        {k:'project',  t:'text',  label:'프로젝트'},
        {k:'weather',  t:'text',  label:'날씨'},
        {k:'areas',    t:'list',  label:'영역', hint:'쉼표로 구분'},
        {k:'did',      t:'text',  label:'한 일'},
        {k:'feel',     t:'textarea', label:'감상'},
        {k:'art_url',  t:'file',  label:'그림', accept:'image/*'}
      ]}
    };

    const overlay = document.getElementById('adminOverlay');
    const loginEl = document.getElementById('adminLogin');
    const panelEl = document.getElementById('adminPanel');
    const tabsEl  = document.getElementById('adminTabs');
    const bodyEl  = document.getElementById('adminBody');
    const whoEl   = document.getElementById('adminWho');
    const logoutB = document.getElementById('adminLogout');
    let tab = 'profile';

    /* ---- 열고 닫기 ---- */
    window.openAdmin = async function(){
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      const { data } = await sb.auth.getSession();
      store.session = data.session;
      paint();
    };
    function close(){
      overlay.classList.remove('open');
      document.body.style.overflow = '';
      if(location.hash === '#admin') history.replaceState(null,'','#home');
    }
    document.getElementById('adminFab').addEventListener('click', openAdmin);
    document.getElementById('adminClose').addEventListener('click', close);
    overlay.addEventListener('click', e=>{ if(e.target === overlay) close(); });
    if(location.hash === '#admin') setTimeout(openAdmin, 300);

    /* ---- 로그인 ---- */
    function msg(el, kind, text){ el.innerHTML = `<div class="admin-msg ${kind}">${esc(text)}</div>`; }

    document.getElementById('lgGo').addEventListener('click', async ()=>{
      const email = document.getElementById('lgEmail').value.trim();
      const password = document.getElementById('lgPw').value;
      const box = document.getElementById('loginMsg');
      if(!email || !password){ msg(box,'no','이메일과 비밀번호를 넣어주세요.'); return; }
      msg(box,'ok','확인하는 중…');
      const { data, error } = await sb.auth.signInWithPassword({ email, password });
      if(error){ msg(box,'no','로그인하지 못했습니다 · ' + error.message); return; }
      store.session = data.session;
      document.getElementById('lgPw').value = '';
      box.innerHTML = '';
      paint();
    });
    document.getElementById('lgPw').addEventListener('keydown', e=>{
      if(e.key === 'Enter') document.getElementById('lgGo').click();
    });

    logoutB.addEventListener('click', async ()=>{
      await sb.auth.signOut();
      store.session = null;
      paint();
    });

    function paint(){
      const on = !!store.session;
      loginEl.style.display = on ? 'none' : '';
      panelEl.style.display = on ? '' : 'none';
      logoutB.style.display = on ? '' : 'none';
      whoEl.textContent = on ? store.session.user.email : '';
      if(on) renderTabs();
    }

    function renderTabs(){
      tabsEl.innerHTML = Object.entries(SCHEMA).map(([k,v])=>
        `<button data-tab="${k}" class="${k===tab?'on':''}">${v.label}</button>`).join('');
      tabsEl.querySelectorAll('button').forEach(b=>{
        b.addEventListener('click', ()=>{ tab = b.dataset.tab; renderTabs(); renderList(); });
      });
      renderList();
    }

    /* ---- 목록 ---- */
    function rowsOf(t){
      return t === 'profile' ? (store.profile ? [store.profile] : [])
           : t === 'projects' ? store.projects
           : t === 'papers'   ? store.papers
           : t === 'events'   ? store.events
           : store.logs;
    }

    function renderList(){
      const cfg = SCHEMA[tab];
      const rows = rowsOf(tab);
      if(cfg.single){ renderForm(rows[0] || {}); return; }

      bodyEl.innerHTML =
        `<div class="admin-actions" style="justify-content:flex-start;margin:0 0 14px">
           <button class="btn primary" id="addNew">＋ 새로 추가</button>
         </div>` +
        (rows.length ? rows.map(r=>`
          <div class="row-item">
            <div class="rt">
              <b>${esc(r[cfg.title] || '(제목 없음)')}</b>
              <small>${esc(r.kind || r.state || r.log_date || r.date_label || '')}</small>
            </div>
            <button data-edit="${r.id}">수정</button>
            <button class="del" data-del="${r.id}">삭제</button>
          </div>`).join('')
        : `<div class="state-msg"><b>아직 없습니다</b><span>위 버튼으로 추가해 보세요</span></div>`);

      document.getElementById('addNew').addEventListener('click', ()=> renderForm({}));
      bodyEl.querySelectorAll('[data-edit]').forEach(b=>
        b.addEventListener('click', ()=> renderForm(rows.find(r=>String(r.id)===b.dataset.edit))));
      bodyEl.querySelectorAll('[data-del]').forEach(b=>
        b.addEventListener('click', ()=> remove(b.dataset.del)));
    }

    /* ---- 폼 ---- */
    function valueFor(f, row){
      const v = row[f.k];
      if(f.t === 'list')  return arr(v).join(', ');
      if(f.t === 'lines') return arr(v).join('\n');
      if(f.t === 'links') return arr(v).map(l=>`${l.label}|${l.url}`).join('\n');
      return v ?? '';
    }

    function renderForm(row){
      const cfg = SCHEMA[tab];
      const isNew = !row.id && !cfg.single;
      bodyEl.innerHTML = `
        <div class="admin-form">
          <div id="formMsg"></div>
          ${cfg.fields.map(f=>{
            const v = valueFor(f, row);
            if(f.t === 'file') return `
              <div class="field">
                <label>${esc(f.label)}</label>
                <input type="file" data-file="${f.k}" accept="${f.accept||''}">
                ${v ? `<img class="thumb" src="${esc(v)}" onerror="this.remove()">
                       <div class="hint">이미 올린 파일이 있습니다. 새로 고르면 교체됩니다.</div>` : ''}
                <input type="hidden" data-k="${f.k}" value="${esc(v)}">
              </div>`;
            if(f.t === 'select') return `
              <div class="field">
                <label>${esc(f.label)}</label>
                <select data-k="${f.k}">
                  ${f.opts.map(([val,lab])=>`<option value="${val}" ${val===v?'selected':''}>${esc(lab)}</option>`).join('')}
                </select>
              </div>`;
            const multi = (f.t === 'textarea' || f.t === 'lines' || f.t === 'links');
            const type = f.t === 'number' ? 'number' : f.t === 'date' ? 'date' : 'text';
            return `
              <div class="field">
                <label>${esc(f.label)}${f.req?' *':''}</label>
                ${multi
                  ? `<textarea data-k="${f.k}" data-t="${f.t}">${esc(v)}</textarea>`
                  : `<input type="${type}" data-k="${f.k}" data-t="${f.t}" value="${esc(v)}">`}
                ${f.hint ? `<div class="hint">${esc(f.hint)}</div>` : ''}
              </div>`;
          }).join('')}
          <div class="admin-actions">
            ${cfg.single ? '' : '<button class="btn secondary" id="formBack">목록으로</button>'}
            <button class="btn primary" id="formSave">${isNew ? '추가' : '저장'}</button>
          </div>
        </div>`;

      if(!cfg.single) document.getElementById('formBack').addEventListener('click', renderList);
      document.getElementById('formSave').addEventListener('click', ()=> save(row));
    }

    function collect(){
      const cfg = SCHEMA[tab];
      const out = {};
      cfg.fields.forEach(f=>{
        const el = bodyEl.querySelector(`[data-k="${f.k}"]`);
        if(!el) return;
        const raw = el.value.trim();
        if(f.t === 'list')       out[f.k] = raw ? raw.split(',').map(s=>s.trim()).filter(Boolean) : [];
        else if(f.t === 'lines') out[f.k] = raw ? raw.split('\n').map(s=>s.trim()).filter(Boolean) : [];
        else if(f.t === 'links') out[f.k] = raw ? raw.split('\n').map(s=>{
                                     const [label, ...rest] = s.split('|');
                                     return { label:(label||'').trim(), url:rest.join('|').trim() };
                                   }).filter(l=>l.label || l.url) : [];
        else if(f.t === 'number') out[f.k] = Number(raw) || 0;
        else if(f.t === 'date')   out[f.k] = raw || new Date().toISOString().slice(0,10);
        else out[f.k] = raw;
      });
      return out;
    }

    async function uploadFiles(){
      const uploaded = [];
      for(const input of bodyEl.querySelectorAll('[data-file]')){
        const file = input.files && input.files[0];
        if(!file) continue;
        const ext = (file.name.split('.').pop() || 'bin').toLowerCase();
        const path = `${tab}/${Date.now()}-${Math.random().toString(36).slice(2,7)}.${ext}`;
        const { error } = await sb.storage.from(STORAGE_BUCKET).upload(path, file, { upsert:false });
        if(error) throw new Error('파일을 올리지 못했습니다 · ' + error.message);
        const { data } = sb.storage.from(STORAGE_BUCKET).getPublicUrl(path);
        bodyEl.querySelector(`[data-k="${input.dataset.file}"]`).value = data.publicUrl;
        uploaded.push(path);
      }
      return uploaded;
    }

    async function save(row){
      const cfg = SCHEMA[tab];
      const box = document.getElementById('formMsg');
      const btn = document.getElementById('formSave');
      btn.disabled = true;
      msg(box,'ok','저장하는 중…');
      let uploaded = [];
      try{
        uploaded = await uploadFiles();
        const payload = collect();

        const missing = cfg.fields.find(f=>f.req && !payload[f.k]);
        if(missing) throw new Error(missing.label + ' 항목을 채워주세요');

        let res;
        if(cfg.single)        res = await sb.from(tab).update(payload).eq('id',1);
        else if(row && row.id) res = await sb.from(tab).update(payload).eq('id', row.id);
        else                   res = await sb.from(tab).insert(payload);
        if(res.error) throw res.error;

        await loadAll();
        msg(box,'ok','저장했습니다');
        if(!cfg.single) renderList();
        else renderForm(store.profile || {});
      }catch(e){
        // 저장에 실패하면 방금 올린 파일은 지웁니다
        if(uploaded.length) await sb.storage.from(STORAGE_BUCKET).remove(uploaded);
        msg(box,'no','저장하지 못했습니다 · ' + (e.message || ''));
      }
      btn.disabled = false;
    }

    async function remove(id){
      if(!confirm('정말 지울까요? 되돌릴 수 없습니다.')) return;
      const { error } = await sb.from(tab).delete().eq('id', id);
      if(error){ alert('지우지 못했습니다 · ' + error.message); return; }
      await loadAll();
      renderList();
    }

    sb.auth.onAuthStateChange((_e, session)=>{ store.session = session; if(overlay.classList.contains('open')) paint(); });
  })();
