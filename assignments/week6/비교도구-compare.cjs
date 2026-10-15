// 사용법: node 비교도구-compare.cjs <상대방 index.html> <내 index.html> [차이 표시 줄 수]
// Compare a generated index.html against the partner's after/index.html:
// (1) exported constants/data, (2) state traces under scripted input, (3) canvas drawing ops.
const fs=require('fs'),vm=require('vm');
function load(file){const html=fs.readFileSync(file,'utf8');const script=html.match(/<script>([\s\S]*?)<\/script>/)[1];
 const core=script.slice(0,script.indexOf('const game=Daldongne.mount'));const ctx={module:{exports:{}}};vm.runInNewContext(core,ctx);
 return {g:ctx.module.exports,html,tail:script.slice(script.indexOf('const game=Daldongne.mount')),head:html.slice(0,html.indexOf('<script>'))}}
const A=load(process.argv[2]),B=load(process.argv[3]);const out=[];let fails=0;
const J=v=>JSON.stringify(v,(k,x)=>typeof x==='number'?Math.round(x*1e9)/1e9:typeof x==='function'?'fn':x);
function check(name,a,b){a=String(a);b=String(b);const ok=a===b;if(!ok)fails++;out.push((ok?'OK   ':'DIFF ')+name);if(!ok){let i=0;while(i<a.length&&a[i]===b[i])i++;out.push('   partner: …'+a.slice(Math.max(0,i-60),i+140));out.push('   mine   : …'+b.slice(Math.max(0,i-60),i+140))}}
check('HTML/CSS before <script>',A.head,B.head);
check('DOM wiring after mount',A.tail,B.tail);
check('export names',J(Object.keys(A.g).sort()),J(Object.keys(B.g).sort()));
for(const k of ['W','H','R','ROUND_TIME','FX_TIME','CHAR_SIZE','ZONE_R','HAZARD','SEASONS','SITES','ORDERS','CAFE'])check('const '+k,J(A.g[k]),J(B.g[k]));
check('grade 0..16',J(Array.from({length:17},(_,i)=>A.g.grade&&A.g.grade(i))),J(Array.from({length:17},(_,i)=>B.g.grade&&B.g.grade(i))));
// Scripted play: identical inputs, compare full state after every step.
function trace(g,plan){const s=g.newGame(),log=[J(s)];const frame=g.math.frame;
 for(const op of plan){if(op[0]==='start')g.start(s);else if(op[0]==='pause')g.pause(s);else if(op[0]==='step'){for(let i=0;i<op[1];i++)g.step(s,op[2]??.05,op[3]||{})}
  else if(op[0]==='tp'){s.n=typeof op[1]==='function'?op[1](g,s):op[1];s.north=frame(s.n).u}else if(op[0]==='act')g.interact(s);else if(op[0]==='time')s.roundTime=op[1];log.push(op[0]+' '+J(s))}
 return {s,log}}
const deliver=n=>[['tp',g=>g.CAFE.door],['act'],...[0,1,2,3].slice(0,n).flatMap(i=>[['tp',g=>g.ORDERS[i].door],['act'],['act']])];
const zone0=['tp',(g,s)=>g.zonesOf(s)[0].n];
const plans={
 'walk+pause':[['step',5,.05,{x:1}],['start'],['step',40,.05,{x:1,y:.5}],['pause'],['step',5],['pause'],['step',40,.05,{x:-1,y:1}]],
 'full game 4/3/0/2':[['start'],...deliver(4),['step',3],['start'],['step',10,.05,{y:1}],...deliver(3),['time',39.99],['step',2],['start'],zone0,['step',1],['step',30,.05,{x:1}],['time',39.99],['step',2],['start'],...deliver(2),zone0,['step',4,.05,{y:-1}],['time',39.99],['step',2],['step',3,.05,{x:1}],['start']],
 'perfect':[['start'],...deliver(4),['start'],...deliver(4),['start'],...deliver(4),['start'],...deliver(4)],
 'hazard fx each season':[['start'],zone0,['step',2],['tp',g=>g.math.at(-.13,-.025)],['step',12,.05,{x:1}],['time',39.99],['step',2],['start'],zone0,['step',2,.05,{x:1}],['tp',g=>g.math.at(-.13,-.025)],['step',12,.05,{y:1}],['time',39.99],['step',2],['start'],['step',200,.05,{x:1}],['time',39.99],['step',2],['start'],zone0,['step',3],['tp',g=>g.math.at(-.13,-.025)],['step',12]],
 'natural timeout':[['start'],['step',805,.05,{x:.3,y:-1}]],
};
for(const [name,plan] of Object.entries(plans)){let a,b;try{a=trace(A.g,plan).log.join('\n')}catch(e){a='ERR '+e.message}try{b=trace(B.g,plan).log.join('\n')}catch(e){b='ERR '+e.message}check('state trace: '+name,a,b)}
// Canvas recorder: every paint op is logged with the effective style.
function rec(){const ops=[];let st={fillStyle:'#000',strokeStyle:'#000',font:'10px sans-serif',textAlign:'start',globalAlpha:1,lineWidth:1,lineCap:'butt'},stack=[],pathOps=[],tf=[];
 const r=v=>typeof v==='number'?Math.round(v*100)/100:v;
 const c={save(){stack.push({...st,tf:[...tf]})},restore(){const p=stack.pop();if(p){tf=p.tf;delete p.tf;st=p}},
  beginPath(){pathOps=[]},closePath(){pathOps.push('Z')},moveTo(x,y){pathOps.push('M'+r(x)+','+r(y))},lineTo(x,y){pathOps.push('L'+r(x)+','+r(y))},
  arc(...a){pathOps.push('arc('+a.map(r)+')')},roundRect(...a){pathOps.push('rr('+a.map(r)+')')},rect(...a){pathOps.push('rect('+a.map(r)+')')},ellipse(...a){pathOps.push('el('+a.map(r)+')')},quadraticCurveTo(...a){pathOps.push('Q'+a.map(r))},bezierCurveTo(...a){pathOps.push('C'+a.map(r))},
  translate(...a){tf.push('t'+a.map(r))},rotate(a){tf.push('r'+r(a))},scale(...a){tf.push('s'+a.map(r))},setTransform(){tf=[]},
  fill(){ops.push(['fill',st.fillStyle,st.globalAlpha,tf.join(' '),pathOps.join(' ')].join('|'))},stroke(){ops.push(['stroke',st.strokeStyle,st.lineWidth,st.lineCap,st.globalAlpha,tf.join(' '),pathOps.join(' ')].join('|'))},
  fillRect(...a){ops.push(['fillRect',st.fillStyle,st.globalAlpha,tf.join(' '),a.map(r)].join('|'))},clearRect(){},strokeRect(...a){ops.push(['strokeRect',st.strokeStyle,a.map(r)].join('|'))},
  fillText(t,x,y){ops.push(['text',t,r(x),r(y),st.font,st.textAlign,st.fillStyle,st.globalAlpha,tf.join(' ')].join('|'))},
  measureText(t){return{width:[...String(t)].length*9}},createLinearGradient(){return{addColorStop(){}}},createRadialGradient(){return{addColorStop(){}}},clip(){},setLineDash(){},drawImage(){},canvas:{width:1200,height:800}};
 for(const k of Object.keys(st))Object.defineProperty(c,k,{get:()=>st[k],set:v=>{st[k]=v}});return {c,ops}}
function shot(g,setup){const s=g.newGame();setup(g,s);const {c,ops}=rec();g.draw(c,s,true);return ops.join('\n')}
const START=g=>g.math.at(-.13,-.025);const tp=(g,s,n)=>{s.n=n;s.north=g.math.frame(n).u};
const run=(g,s,plan)=>{for(const n of plan){g.start(s);if(n==='t'){s.roundTime=39.99;g.step(s,.05);continue}tp(g,s,g.CAFE.door);if(n)g.interact(s);for(const o of g.ORDERS.slice(0,n)){tp(g,s,o.door);g.interact(s)}if(s.status==='playing'){s.roundTime=39.99;g.step(s,.05)}}};
const shots={
 'ready overlay':()=>{},
 'playing spring t=0':(g,s)=>{g.start(s);g.step(s,.05)},
 'playing spring t=27 (ring orange)':(g,s)=>{g.start(s);s.roundTime=27;g.step(s,.05)},
 'playing spring t=35 (ring red)':(g,s)=>{g.start(s);s.roundTime=35;g.step(s,.05)},
 'paused':(g,s)=>{g.start(s);s.roundTime=12.3;g.step(s,.05);g.pause(s)},
 'in dust zone (fx)':(g,s)=>{g.start(s);tp(g,s,g.zonesOf(s)[0].n);g.step(s,.05)},
 'fx fading':(g,s)=>{g.start(s);tp(g,s,g.zonesOf(s)[0].n);g.step(s,.05);tp(g,s,START(g));for(let i=0;i<6;i++)g.step(s,.05)},
 'roundEnd clear spring':(g,s)=>run(g,s,[4]),
 'roundEnd timeout 2':(g,s)=>run(g,s,[2]),
 'roundEnd timeout 1':(g,s)=>run(g,s,[1]),
 'roundEnd timeout 0':(g,s)=>run(g,s,['t']),
 'summer playing in heat':(g,s)=>{run(g,s,[4]);g.start(s);tp(g,s,g.zonesOf(s)[0].n);g.step(s,.05)},
 'autumn roundEnd':(g,s)=>run(g,s,[4,3,1]),
 'winter playing in cold':(g,s)=>{run(g,s,[4,3,1]);g.start(s);tp(g,s,g.zonesOf(s)[0].n);g.step(s,.05)},
 'over PERFECT':(g,s)=>run(g,s,[4,4,4,4]),
 'over GREAT':(g,s)=>run(g,s,[4,3,2,1]),
 'over GOOD':(g,s)=>run(g,s,[4,3,0,2]),
};
for(const [name,f] of Object.entries(shots)){let a,b;try{a=shot(A.g,f)}catch(e){a='ERR '+e.message}try{b=shot(B.g,f)}catch(e){b='ERR '+e.message}
 const la=a.split('\n'),lb=b.split('\n');const sa=new Set(la),sb=new Set(lb);const onlyA=la.filter(x=>!sb.has(x)),onlyB=lb.filter(x=>!sa.has(x));
 const ok=a===b;if(!ok)fails++;out.push((ok?'OK   ':'DIFF ')+'draw ops: '+name+'  ('+la.length+' vs '+lb.length+' ops'+(ok?'':', only-partner '+onlyA.length+', only-mine '+onlyB.length+(onlyA.length+onlyB.length?'':', order differs'))+')');
 if(!ok&&process.argv[4]){onlyA.slice(0,+process.argv[4]).forEach(x=>out.push('   partner: '+x.slice(0,230)));onlyB.slice(0,+process.argv[4]).forEach(x=>out.push('   mine   : '+x.slice(0,230)))}}
console.log(out.join('\n'));console.log('\nTOTAL DIFFS: '+fails);
