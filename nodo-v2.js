const body=document.body, html=document.documentElement;
const menuButton=document.querySelector('[data-menu-trigger]');
const menu=document.getElementById('mobile-menu');
const main=document.querySelector('main');
const footer=document.querySelector('.footer-v2');
const headerInactive=[...document.querySelectorAll('.site-header > *:not(.menu-trigger)')];
let lockedY=0;
function setBackgroundInert(on){
  [main,footer,...headerInactive].forEach(el=>{if(!el)return;if(on)el.setAttribute('inert','');else el.removeAttribute('inert')});
}
function lock(){
  lockedY=scrollY;
  body.classList.add('menu-open');
  Object.assign(body.style,{position:'fixed',top:`-${lockedY}px`,left:'0',right:'0',width:'100%'});
  html.style.overflow='hidden';
  setBackgroundInert(true);
  requestAnimationFrame(()=>menu?.querySelector('a')?.focus());
}
function unlock(){
  body.classList.remove('menu-open');
  Object.assign(body.style,{position:'',top:'',left:'',right:'',width:''});
  html.style.overflow='';
  setBackgroundInert(false);
  scrollTo(0,lockedY);
}
function closeMenu({restoreFocus=true}={}){
  if(!body.classList.contains('menu-open'))return;
  menu?.setAttribute('aria-hidden','true');
  menuButton?.setAttribute('aria-expanded','false');
  unlock();
  if(restoreFocus)requestAnimationFrame(()=>menuButton?.focus());
}
menuButton?.addEventListener('click',()=>{
  if(body.classList.contains('menu-open'))return closeMenu();
  menu?.setAttribute('aria-hidden','false');
  menuButton.setAttribute('aria-expanded','true');
  lock();
});
menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>closeMenu({restoreFocus:false})));
addEventListener('keydown',e=>{
  if(e.key==='Escape')return closeMenu();
  if(e.key!=='Tab'||!body.classList.contains('menu-open'))return;
  const focusables=[menuButton,...(menu?[...menu.querySelectorAll('a')]:[])].filter(Boolean);
  if(!focusables.length)return;
  const first=focusables[0],last=focusables[focusables.length-1],active=document.activeElement;
  if(e.shiftKey&&active===first){e.preventDefault();last.focus()}
  else if(!e.shiftKey&&active===last){e.preventDefault();first.focus()}
});

const world=document.querySelector('[data-orientation-world]');
const cards=[...document.querySelectorAll('[data-orientation-card]')];
const worldTitle=document.querySelector('[data-world-title]');
const worldText=document.querySelector('[data-world-text]');
const resultTitle=document.querySelector('[data-result-title]');
const resultText=document.querySelector('[data-result-text]');
const states=[
  {title:'Valutare senza scegliere da soli.',text:'Parti da domande, benefici e limiti generali. La valutazione individuale stabilisce cosa abbia senso discutere.',result:'Sto valutando un trattamento',detail:'Vai alla NODO Guide per capire quali domande fare prima di concentrarti su una singola soluzione.'},
  {title:'Sapere cosa succede riduce l’incertezza.',text:'La prima visita viene raccontata come un percorso: prima, durante e dopo, senza promettere esami o procedure standard.',result:'È la mia prima visita',detail:'Apri la pagina Prima visita: cosa preparare, cosa non devi decidere prima e quali domande puoi portare con te.'},
  {title:'Informarsi come genitore, senza anticipare il clinico.',text:'Il percorso separa orientamento, aspettative e valutazione professionale.',result:'Cerco informazioni per mio figlio o mia figlia',detail:'La guida dedica contenuti a genitori e tutori, distinguendo informazione generale da indicazione clinica individuale.'},
  {title:'Continuità, non diagnosi online.',text:'I contenuti di supporto possono accompagnare un percorso già iniziato e rimandare al team quando serve.',result:'Ho già un trattamento in corso',detail:'Il Care Loop mostra come promemoria e contenuti approvati potrebbero integrarsi ai sistemi reali dello studio.'},
  {title:'Non serve sapere già la risposta.',text:'Puoi partire da una domanda vaga. Il sito serve a orientare la conversazione, non a trasformarti in un esperto.',result:'Non so da dove partire',detail:'Usa Orientarsi oppure richiedi un incontro con una domanda generale. Nessuna diagnosi viene richiesta nel form demo.'}
];
function setState(i){
  const s=states[i]||states[4];
  if(world)world.dataset.state=String(i+1);
  cards.forEach((c,n)=>{c.classList.toggle('is-active',n===i);c.setAttribute('aria-pressed',String(n===i))});
  if(worldTitle)worldTitle.textContent=s.title;
  if(worldText)worldText.textContent=s.text;
  if(resultTitle)resultTitle.textContent=s.result;
  if(resultText)resultText.textContent=s.detail;
}
cards.forEach((c,i)=>c.addEventListener('click',()=>setState(i)));
if(cards.length)setState(4);

document.querySelectorAll('[data-select-group]').forEach(group=>{
  group.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>{
    group.querySelectorAll('button').forEach(b=>{b.classList.remove('is-selected');b.setAttribute('aria-pressed','false')});
    btn.classList.add('is-selected');btn.setAttribute('aria-pressed','true');
  }));
});

document.querySelector('[data-demo-form]')?.addEventListener('submit',e=>{
  e.preventDefault();
  const panel=e.currentTarget.closest('.contact-panel');
  if(panel)panel.innerHTML='<p class="micro">DEMO PORTFOLIO</p><h2>Richiesta simulata.</h2><p class="lede">Nessun dato è stato inviato o salvato. In un progetto reale il flusso verrebbe collegato al sistema scelto dallo studio e revisionato per privacy, sicurezza e conformità.</p><a class="pill" href="./">Torna alla home</a>';
});