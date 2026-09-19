const body=document.body;
const menuButton=document.querySelector('[data-menu-toggle]');
const menu=document.getElementById('mobile-panel');
const main=document.querySelector('main');
const footer=document.querySelector('.site-footer');
let scrollLock=0;

function setInert(on){
  [main,footer,...document.querySelectorAll('.site-header > *:not(.menu-toggle)')].forEach(el=>{
    if(!el)return;
    if(on)el.setAttribute('inert',''); else el.removeAttribute('inert');
  });
}
function openMenu(){
  scrollLock=scrollY;
  body.classList.add('menu-open');
  menu?.setAttribute('aria-hidden','false');
  menuButton?.setAttribute('aria-expanded','true');
  setInert(true);
  requestAnimationFrame(()=>menu?.querySelector('a')?.focus());
}
function closeMenu({restore=true}={}){
  if(!body.classList.contains('menu-open'))return;
  body.classList.remove('menu-open');
  menu?.setAttribute('aria-hidden','true');
  menuButton?.setAttribute('aria-expanded','false');
  setInert(false);
  if(restore)requestAnimationFrame(()=>menuButton?.focus());
}
menuButton?.addEventListener('click',()=>body.classList.contains('menu-open')?closeMenu():openMenu());
menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>closeMenu({restore:false})));
addEventListener('keydown',e=>{
  if(e.key==='Escape')closeMenu();
  if(e.key!=='Tab'||!body.classList.contains('menu-open'))return;
  const focusables=[menuButton,...(menu?[...menu.querySelectorAll('a')]:[])].filter(Boolean);
  const first=focusables[0],last=focusables.at(-1),active=document.activeElement;
  if(e.shiftKey&&active===first){e.preventDefault();last.focus()}
  else if(!e.shiftKey&&active===last){e.preventDefault();first.focus()}
});

const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals=[...document.querySelectorAll('.reveal')];
if(reduce){
  reveals.forEach(el=>el.classList.add('is-visible'));
}else{
  const io=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('is-visible');io.unobserve(entry.target)}
    });
  },{threshold:.12,rootMargin:'0px 0px -5% 0px'});
  reveals.forEach(el=>io.observe(el));
}

document.querySelector('[data-demo-contact]')?.addEventListener('click',e=>{
  const panel=e.currentTarget.closest('.contact-form');
  if(!panel)return;
  panel.innerHTML='<p class="kicker">CONCEPT PORTFOLIO</p><h2>Richiesta simulata.</h2><p class="lede">Nessun dato è stato inviato o salvato. In un progetto reale questa area verrebbe collegata al gestionale o sistema di prenotazione scelto dallo studio.</p><a class="cta-light" href="./">Torna alla home</a>';
});