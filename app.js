const body=document.body,html=document.documentElement;
const header=document.querySelector('[data-header]');
const menuButton=document.querySelector('[data-menu-trigger]');
const menu=document.getElementById('mobile-menu');
let lockedY=0;
const lock=()=>{lockedY=scrollY;body.classList.add('menu-open');Object.assign(body.style,{position:'fixed',top:`-${lockedY}px`,left:'0',right:'0',width:'100%'});html.style.overflow='hidden'};
const unlock=()=>{body.classList.remove('menu-open');Object.assign(body.style,{position:'',top:'',left:'',right:'',width:''});html.style.overflow='';const prev=html.style.scrollBehavior;html.style.scrollBehavior='auto';scrollTo(0,lockedY);requestAnimationFrame(()=>html.style.scrollBehavior=prev)};
const closeMenu=()=>{if(!body.classList.contains('menu-open'))return;menu?.setAttribute('aria-hidden','true');menuButton?.setAttribute('aria-expanded','false');unlock()};
menuButton?.addEventListener('click',()=>{if(body.classList.contains('menu-open'))return closeMenu();menu?.setAttribute('aria-hidden','false');menuButton.setAttribute('aria-expanded','true');lock()});
menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
const syncHeader=()=>header?.classList.toggle('is-scrolled',scrollY>32);syncHeader();addEventListener('scroll',syncHeader,{passive:true});

const stage=document.querySelector('[data-relationship-stage]');
const phases=[...document.querySelectorAll('button[data-phase]')];
const phaseCaption=document.querySelector('[data-phase-caption]');
const phaseLabels=['01 / ALLINEAMENTO','02 / FUNZIONE','03 / STRUTTURA','04 / SUPERFICIE'];
const setPhase=i=>{if(!stage)return;stage.dataset.phase=String(i+1);phases.forEach((p,n)=>{p.classList.toggle('is-active',n===i);p.setAttribute('aria-pressed',String(n===i))});if(phaseCaption)phaseCaption.textContent=phaseLabels[i]};
phases.forEach((p,i)=>p.addEventListener('click',()=>setPhase(i)));
if(stage && !matchMedia('(prefers-reduced-motion: reduce)').matches){let drag=false,sx=0,sy=0,rx=-2,ry=0;const apply=()=>{stage.style.setProperty('--rx',`${rx}deg`);stage.style.setProperty('--ry',`${ry}deg`)};stage.addEventListener('pointerdown',e=>{drag=true;sx=e.clientX;sy=e.clientY;stage.classList.add('is-dragging');stage.setPointerCapture?.(e.pointerId)});stage.addEventListener('pointermove',e=>{if(!drag)return;ry=Math.max(-16,Math.min(16,ry+(e.clientX-sx)*.08));rx=Math.max(-10,Math.min(10,rx-(e.clientY-sy)*.05));sx=e.clientX;sy=e.clientY;apply()});const end=()=>{drag=false;stage.classList.remove('is-dragging')};stage.addEventListener('pointerup',end);stage.addEventListener('pointercancel',end);apply()}

const flow=document.querySelector('[data-flow]');
if(flow){const steps=[...flow.querySelectorAll('.flow-step')];const dots=[...flow.querySelectorAll('.flow-progress i')];let current=0;const show=i=>{current=Math.max(0,Math.min(steps.length-1,i));steps.forEach((s,n)=>s.classList.toggle('is-active',n===current));dots.forEach((d,n)=>d.classList.toggle('on',n<=current));flow.querySelector('[data-step-label]')?.replaceChildren(document.createTextNode(`RICHIESTA / 0${current+1} DI 04`))};flow.querySelectorAll('.choice').forEach(c=>c.addEventListener('click',()=>{const group=c.closest('.choice-grid');group?.querySelectorAll('.choice').forEach(x=>x.classList.remove('is-selected'));c.classList.add('is-selected')}));flow.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>show(current+1)));flow.querySelectorAll('[data-prev]').forEach(b=>b.addEventListener('click',()=>show(current-1)));flow.querySelector('form')?.addEventListener('submit',e=>{e.preventDefault();show(3);const final=steps[3];final.innerHTML='<div class="success"><p class="micro">DEMO PORTFOLIO</p><h2>Richiesta simulata.</h2><p>Nessun dato è stato inviato e nessun appuntamento è stato confermato. In un progetto reale, questo passaggio verrebbe collegato al flusso scelto dallo studio.</p><a class="arrow-link" href="./">Torna alla home <span>↗</span></a></div>'});show(0)}
