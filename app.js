(function(){
const K=window.KEYTYPE,LANGS=K.langs,$=id=>document.getElementById(id);
const store={get(k,d){try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const slug=t=>t.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
// Build one flat pool: 10 course levels per language + the DSA set.
const items=[];
LANGS.forEach(L=>K.course[L.k].forEach((code,i)=>{const lv=K.levels[i],sg=i===9?K.sig[L.k]:null;
  items.push({id:L.k+i,lang:L.k,ll:L.n,cat:'syntax',diff:i<3?'easy':i<7?'medium':'hard',level:i+1,file:String(i+1).padStart(2,'0')+'.'+L.x,title:sg?sg[0]:lv.t,code,exp:sg?sg[1]:lv.e,meta:''})}));
K.dsa.forEach(d=>{const L=LANGS.find(l=>l.k===d.l);items.push({id:'dsa'+d.t,lang:d.l,ll:L.n,cat:'dsa',diff:d.d,level:0,file:slug(d.t)+'.'+L.x,title:d.t,code:d.c,exp:d.e,meta:d.m||''})});
let mode='course',cLang='javascript',pDiff='all',pType='all',pLang='all',cur,typed='',t0=null,done=false,tick;
const prog=()=>store.get('kt_prog',{});
function pills(box,list,sel,fn,cls){box.innerHTML='';list.forEach(([k,l])=>{const b=document.createElement('button');b.className='pill '+(cls&&k!=='all'?k+' ':'')+(sel===k?'on':'');b.textContent=l;b.onclick=()=>fn(k);box.appendChild(b)})}
function setMode(m){mode=m;$('tabCourse').className=m==='course'?'on':'';$('tabPractice').className=m==='practice'?'on':'';
  $('courseCtl').hidden=m!=='course';$('practiceCtl').hidden=m!=='practice';
  if(m==='course'){courseUI();loadLevel(Math.min((prog()[cLang]||0)+1,10))}else{practiceUI();pick()}}
function courseUI(){pills($('cLangs'),LANGS.map(l=>[l.k,l.n]),cLang,k=>{cLang=k;courseUI();loadLevel(Math.min((prog()[cLang]||0)+1,10))});track()}
function track(){const d=prog()[cLang]||0,t=$('track');t.innerHTML='';
  for(let l=1;l<=10;l++){const n=document.createElement('div');const st=l<=d?'done':l===d+1?'open':'lock';
    n.className='node '+st+(cur&&cur.level===l&&cur.lang===cLang?' cur':'');n.textContent=st==='done'?'✓':l;
    if(st!=='lock')n.onclick=()=>loadLevel(l);t.appendChild(n)}
  const nm=LANGS.find(l=>l.k===cLang).n;
  $('plabel').innerHTML=d>=10?nm+' course complete: <b>10 / 10</b>. Replay any level or pick another language.':nm+' progress: <b>'+d+' / 10</b> levels (levels unlock in order)'}
function loadLevel(l){cur=items.find(i=>i.lang===cLang&&i.level===l);track();reset()}
function practiceUI(){
  pills($('pDiff'),[['all','All'],['easy','Easy'],['medium','Medium'],['hard','Hard']],pDiff,k=>{pDiff=k;practiceUI();pick()},1);
  pills($('pType'),[['all','All'],['syntax','Syntax'],['dsa','DSA']],pType,k=>{pType=k;practiceUI();pick()});
  pills($('pLangs'),[['all','All languages']].concat(LANGS.map(l=>[l.k,l.n])),pLang,k=>{pLang=k;practiceUI();pick()})}
function pool(){return items.filter(i=>(pDiff==='all'||i.diff===pDiff)&&(pType==='all'||i.cat===pType)&&(pLang==='all'||i.lang===pLang))}
function pick(){const p=pool(),c=p.filter(i=>!cur||i.id!==cur.id),l=c.length?c:p;cur=l.length?l[Math.floor(Math.random()*l.length)]:items[0];reset()}
const esc=c=>c==='<'?'&lt;':c==='>'?'&gt;':c==='&'?'&amp;':c;
function reset(){typed='';t0=null;done=false;clearInterval(tick);$('input').value='';$('concept').classList.remove('open');
  $('hint').textContent='click the code and start typing';$('wpm').textContent='0';$('acc').textContent='100%';$('time').textContent='0.0s';render();$('input').focus()}
function render(){$('fname').textContent=cur.file;
  $('badges').innerHTML='<span class="badge">'+(cur.level?'Level '+cur.level+'/10 · ':'DSA · ')+cur.ll+'</span><span class="badge '+cur.diff+'">'+cur.diff+'</span>';
  const lines=cur.code.split('\n');$('gutter').innerHTML=lines.map((_,i)=>'<div>'+(i+1)+'</div>').join('');
  let h='';for(let i=0;i<cur.code.length;i++){const t=cur.code[i];let c='ch';
    if(i<typed.length)c+=typed[i]===t?' ok':' bad';else if(i===typed.length)c+=' cur';h+='<span class="'+c+'">'+esc(t)+'</span>'}
  $('code').innerHTML=h;const ln=(cur.code.slice(0,typed.length).match(/\n/g)||[]).length;
  [].forEach.call($('gutter').children,(c,i)=>c.className=i===ln?'cl':'')}
function stats(){const ms=t0?Date.now()-t0:0,min=Math.max(ms/60000,1/1200);let ok=0;
  for(let i=0;i<typed.length;i++)if(typed[i]===cur.code[i])ok++;
  $('wpm').textContent=Math.round(ok/5/min)||0;$('acc').textContent=(typed.length?Math.round(ok/typed.length*100):100)+'%';$('time').textContent=(ms/1000).toFixed(1)+'s'}
$('input').addEventListener('input',()=>{if(done){$('input').value='';return}
  typed=$('input').value.slice(0,cur.code.length);
  if(t0===null&&typed.length){t0=Date.now();tick=setInterval(stats,200);$('hint').textContent='typing…'}
  render();stats();if(typed.length===cur.code.length)finish()});
function finish(){done=true;clearInterval(tick);stats();$('hint').textContent='done: read the explanation below';
  const h=store.get('kt_hist',{n:0,best:0,acc:0});h.n++;h.best=Math.max(h.best,+$('wpm').textContent||0);h.acc+=parseInt($('acc').textContent)||100;store.set('kt_hist',h);foot();
  if(mode==='course'&&cur.level){const p=prog();if(cur.level===(p[cur.lang]||0)+1){p[cur.lang]=cur.level;store.set('kt_prog',p);track()}}
  $('cTitle').textContent=cur.title;$('cBody').textContent=cur.exp;
  $('cMeta').innerHTML=cur.meta?'<span class="chip">'+cur.meta+'</span>':'';$('concept').classList.add('open')}
function foot(){const h=store.get('kt_hist',{n:0,best:0,acc:0});$('foot').innerHTML='<span><b>'+h.n+'</b> completed</span><span><b>'+h.best+'</b> best wpm</span><span><b>'+(h.n?Math.round(h.acc/h.n):100)+'%</b> avg accuracy</span>'}
function next(){mode==='course'?loadLevel(Math.min(cur.level+1,10)):pick()}
$('area').onclick=()=>$('input').focus();
document.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();reset()}});
$('restart').onclick=reset;$('next').onclick=next;$('next2').onclick=next;
$('tabCourse').onclick=()=>setMode('course');$('tabPractice').onclick=()=>setMode('practice');
$('themeBtn').onclick=()=>{const n=document.documentElement.getAttribute('data-theme')==='light'?'dark':'light';document.documentElement.setAttribute('data-theme',n);try{localStorage.setItem('kt_theme',n)}catch(e){}};
try{const t=localStorage.getItem('kt_theme');if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}
foot();setMode('course');
})();
