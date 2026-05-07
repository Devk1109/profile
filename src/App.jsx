import { useEffect, useMemo, useRef, useState } from 'react';

const memories=[{emoji:'🌟',bg:'#1a3060',caption:'The day we first laughed until we cried'},{emoji:'🌊',bg:'#0d3050',caption:"That adventure we'll never forget"},{emoji:'🌸',bg:'#2a1540',caption:'Spring walks & silly conversations'},{emoji:'🎵',bg:'#1a0d40',caption:"Dancing like nobody's watching"},{emoji:'☕',bg:'#1a1a0d',caption:'Late night chats over warm drinks'},{emoji:'🌙',bg:'#0d1a3a',caption:'Every midnight secret shared'},{emoji:'🎉',bg:'#2a1a0d',caption:'Celebrations made better with you'}];

export default function App(){
  const [page,setPage]=useState(0); const [loader,setLoader]=useState(true); const [opening,setOpening]=useState(false);
  const [candlesLit,setCandlesLit]=useState([false,false,false]); const [matchLit,setMatchLit]=useState(false); const [showBlow,setShowBlow]=useState(false);
  const [letter,setLetter]=useState(''); const [sig,setSig]=useState(false); const [galleryBuilt,setGalleryBuilt]=useState(false);
  const canvasRef=useRef(null); const matchRef=useRef(null);
  useEffect(()=>{const t=setTimeout(()=>setLoader(false),2200);return()=>clearTimeout(t)},[]);
  useEffect(()=>{ if(page===2) setGalleryBuilt(true); if(page===3){const txt=`My dearest friend,\n\nToday, I want you to know how incredibly special you are to me.\n\nHappy Birthday, my love. 🎂💙`; let i=0; const id=setInterval(()=>{i++; setLetter(txt.slice(0,i)); if(i>=txt.length){clearInterval(id); setSig(true);}},28); return()=>clearInterval(id);} },[page]);
  useEffect(()=>{const c=canvasRef.current,ctx=c.getContext('2d');let w,h,stars=Array.from({length:80},()=>({x:0,y:0,r:0,p:0,s:0})); const rs=()=>{w=c.width=innerWidth;h=c.height=innerHeight;stars=stars.map(()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.2+.3,p:Math.random()*6,s:Math.random()*.02+.01}))};rs(); addEventListener('resize',rs); let raf; const draw=()=>{ctx.clearRect(0,0,w,h); stars.forEach(st=>{st.p+=st.s; ctx.fillStyle=`rgba(180,210,255,${0.3+0.6*Math.abs(Math.sin(st.p))})`; ctx.beginPath(); ctx.arc(st.x,st.y,st.r,0,Math.PI*2); ctx.fill();}); raf=requestAnimationFrame(draw)}; draw(); return()=>{cancelAnimationFrame(raf); removeEventListener('resize',rs);} },[]);
  const active=(n)=>`page ${page===n?'active':''}`;
  const litCount=useMemo(()=>candlesLit.filter(Boolean).length,[candlesLit]);
  const openEnvelope=()=>{if(opening) return; setOpening(true); setTimeout(()=>setPage(1),2200);};
  const light=i=>{if(candlesLit[i]) return; const next=[...candlesLit]; next[i]=true; setCandlesLit(next); if(next.every(Boolean)) setTimeout(()=>setShowBlow(true),600);};
  const onDrag=(e)=>{if(!matchRef.current||page!==1) return; const r=e.currentTarget.getBoundingClientRect(); const x=e.clientX-r.left,y=e.clientY-r.top; if(!matchLit&&x>50&&x<290&&y>150&&y<260) setMatchLit(true); if(matchLit){const zones=[[125,65],[155,60],[185,65]]; zones.forEach((z,i)=>Math.hypot(x-z[0],y-z[1])<30&&light(i));}}
  const blow=()=>{setShowBlow(false); setCandlesLit([false,false,false]); setTimeout(()=>setPage(2),1800)};

  return <>
    <canvas id='particles' ref={canvasRef}/>
    {loader&&<div id='loader'><div className='loader-heart'>💙</div><div className='loader-text'>Preparing your surprise...</div><div className='loader-bar'><div className='loader-bar-fill'/></div></div>}
    <div className='nav-dots'>{[0,1,2,3].map(n=><div key={n} className={`nav-dot ${page===n?'active':''}`} onClick={()=>setPage(n)}/>)}</div>
    <div id='page1' className={active(0)}><p className='floating-hint'>A little surprise for you ❤️</p><div className={`envelope-wrap ${opening?'opening':''}`} onClick={openEnvelope}><div className='envelope-body'><div className='envelope-bottom-flap'/><div className='envelope-left-flap'/><div className='envelope-right-flap'/><div className='envelope-top-flap'/><div className='envelope-seal'>💌</div><div className='letter-rising'><div className='letter-rising-text'>Something beautiful<br/>awaits you inside…</div></div></div></div><p className='click-hint'>Click to open</p></div>
    <div id='page2' className={active(1)}><p className='cake-title'>Make a wish 🕯️</p><div className='cake-area' onMouseMove={onDrag} ref={matchRef}><svg width='340' height='280'><circle cx='170' cy='240' r='70' fill='#122560'/><g id='flame1' className={`candle-flame ${candlesLit[0]?'lit':''}`}/><g id='flame2' className={`candle-flame ${candlesLit[1]?'lit':''}`}/><g id='flame3' className={`candle-flame ${candlesLit[2]?'lit':''}`}/></svg><div className='match-wrap'><div className='match-stick'><div className={`match-head ${matchLit?'lit':''}`}/></div></div></div><p>Drag match to candles 🔥 ({litCount}/3)</p><button className={`blow-btn ${showBlow?'visible':''}`} onClick={blow}>💨 Blow Out the Candles</button></div>
    <div id='page3' className={active(2)}><p className='gallery-title'>Every moment, cherished forever</p><div className='polaroids-wrap'>{galleryBuilt&&memories.map((m,i)=><div className='polaroid' key={i}><div className='polaroid-img' style={{background:m.bg}}>{m.emoji}</div><div className='polaroid-caption'>{m.caption}</div></div>)}</div><button className='gallery-next-btn' onClick={()=>setPage(3)}>One Last Thing ❤️</button></div>
    <div id='page4' className={active(3)}><div className='letter-page-wrap'><div className='letter-paper'><div>{new Date().toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}</div><div className='letter-body'>{letter}</div><div className={`letter-signature ${sig?'visible':''}`}>With all my love 💙</div></div><button className='restart-btn' onClick={()=>{setPage(0);setOpening(false);setSig(false);setLetter('');}}>↩ Relive the magic</button></div></div>
  </>;
}
