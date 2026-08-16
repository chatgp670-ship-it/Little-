const audio=document.getElementById('memoryAudio');
const soundBtn=document.getElementById('soundBtn');
const playMain=document.getElementById('playMain');
const disc=document.getElementById('disc');

function toggleAudio(){
  if(audio.paused){audio.play().catch(()=>{}); soundBtn.innerHTML='Ⅱ <span>memory playing</span>'; disc.classList.add('playing');}
  else{audio.pause(); soundBtn.innerHTML='♪ <span>soft memory</span>'; disc.classList.remove('playing');}
}
soundBtn.addEventListener('click',toggleAudio);
playMain.addEventListener('click',toggleAudio);
disc.addEventListener('click',toggleAudio);
audio.addEventListener('timeupdate',()=>{
  const s=Math.floor(audio.currentTime||0), m=Math.floor(s/60), sec=String(s%60).padStart(2,'0');
  playMain.textContent=(audio.paused?'play the memory · ':'pause the memory · ')+`${String(m).padStart(2,'0')}:${sec}`;
});
audio.addEventListener('ended',()=>{soundBtn.innerHTML='♪ <span>soft memory</span>';disc.classList.remove('playing')});

const lb=document.getElementById('lightbox'), lbImg=document.getElementById('lightboxImg'), cap=document.getElementById('lightboxCaption');
document.querySelectorAll('.drawing,.animal-card').forEach(el=>{
  el.addEventListener('click',()=>{
    const img=el.dataset.img || el.querySelector('img').src;
    lbImg.src=img;
    cap.textContent=el.dataset.caption || 'a small piece of her world';
    lb.classList.add('open'); lb.setAttribute('aria-hidden','false');
  });
});
document.querySelector('.close').addEventListener('click',closeLb);
lb.addEventListener('click',e=>{if(e.target===lb)closeLb()});
function closeLb(){lb.classList.remove('open');lb.setAttribute('aria-hidden','true')}

const sections=[...document.querySelectorAll('.scene')];
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('seen')})
},{threshold:.18});
sections.forEach(s=>io.observe(s));

// Max chapter: as the visitor lingers, a few warm points of light rise from the photograph.
const maxSection=document.getElementById('max');
const maxSky=document.getElementById('maxConstellation');
if(maxSection && maxSky){
  for(let i=0;i<34;i++){
    const star=document.createElement('span');
    star.style.left=(18+Math.random()*64)+'%';
    star.style.top=(18+Math.random()*64)+'%';
    star.style.opacity=(.15+Math.random()*.7).toFixed(2);
    star.style.transform=`translateY(${8+Math.random()*28}px) scale(${.5+Math.random()*.9})`;
    maxSky.appendChild(star);
  }
  const maxIO=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        maxSection.classList.add('lit');
        [...maxSky.children].forEach((star,i)=>{
          setTimeout(()=>{star.style.transform='translateY(0) scale(1)';},i*32);
        });
      }
    });
  },{threshold:.58});
  maxIO.observe(maxSection);
}

document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLb()});

const finale=document.getElementById('finale');
const finaleSky=document.getElementById('finaleSky');
const canonAudio=document.getElementById('canonAudio');
const canonBtn=document.getElementById('canonBtn');
const quote=document.getElementById('finaleQuote');
const sub=document.getElementById('finaleSub');
const finaleTitle=document.getElementById('finaleTitle');
const finaleText=document.getElementById('finaleText');

function makeStar(x,y){
  const s=document.createElement('span');
  s.textContent=Math.random()>.88?'✦':'·';
  s.style.cssText=`position:absolute;left:${x}%;top:${y}%;font-size:${6+Math.random()*12}px;color:rgba(255,240,220,${.3+Math.random()*.7});text-shadow:0 0 12px rgba(255,225,190,.8);transition:all 1.4s ease;`;
  finaleSky.appendChild(s);
}
for(let i=0;i<110;i++) makeStar(Math.random()*100,Math.random()*100);

let last=0;
finale.addEventListener('pointermove',e=>{
  const r=finale.getBoundingClientRect();
  const x=(e.clientX-r.left)/r.width*100, y=(e.clientY-r.top)/r.height*100;
  const stars=finaleSky.children;
  const now=performance.now();
  if(now-last<70) return; last=now;
  for(let i=0;i<3;i++){
    const idx=Math.floor(Math.random()*stars.length), s=stars[idx];
    s.style.left=Math.max(0,Math.min(100,x+(Math.random()-.5)*10))+'%';
    s.style.top=Math.max(0,Math.min(100,y+(Math.random()-.5)*10))+'%';
    s.style.transform='scale(1.8)';
    setTimeout(()=>s.style.transform='scale(1)',700);
  }
});

canonBtn.addEventListener('click',()=>{
  if(canonAudio.paused){
    canonAudio.currentTime=0;
    canonAudio.play().catch(()=>{});
    canonBtn.textContent='Ⅱ  the sky is playing';
    finale.classList.add('done');
    setTimeout(()=>{quote.classList.add('show');sub.classList.add('show')},1800);
  }else{
    canonAudio.pause();
    canonBtn.textContent='♫ enter the last room';
  }
});
canonAudio.addEventListener('ended',()=>canonBtn.textContent='♫ play it again');
