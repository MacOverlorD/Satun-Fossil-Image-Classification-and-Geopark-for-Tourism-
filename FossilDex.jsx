import { useState } from "react";

const C = {
  bg:'#0D0D0C', panel:'#151513', card:'#1D1D1B',
  border:'rgba(255,255,255,0.08)', borderMd:'rgba(255,255,255,0.14)',
  text:'#DEDCD4', muted:'#78756F', dim:'#3A3835',
  amber:'#EFA020', amberBg:'rgba(239,160,32,0.11)',
  teal:'#18A070', tealBg:'rgba(24,160,112,0.11)',
  blue:'#3888DC', blueBg:'rgba(56,136,220,0.11)',
  green:'#58961A', greenBg:'rgba(88,150,26,0.11)',
  red:'#DC4444', redBg:'rgba(220,68,68,0.11)',
  purple:'#8878E4', purpleBg:'rgba(136,120,228,0.11)',
};
const MONO = '"JetBrains Mono",Consolas,monospace';
const RC = { common:C.green, uncommon:C.blue, rare:C.purple, 'ultra-rare':C.amber };

const SPECIES = [
  {id:0,e:'🦀',name:'Trilobite',th:'ไทรโลไบต์',era:'Ordovician',found:true,rarity:'common'},
  {id:1,e:'〰',name:'Graptolite',th:'แกรปโทไลต์',era:'Ordovician',found:true,rarity:'uncommon'},
  {id:2,e:'🐚',name:'Nautiloid',th:'นอติลอยด์',era:'Silurian',found:true,rarity:'common'},
  {id:3,e:'🌀',name:'Stromatolite',th:'สโตรมาโทไลต์',era:'Cambrian',found:false,rarity:'rare'},
  {id:4,e:'🌸',name:'Crinoid',th:'ไครนอยด์',era:'Carboniferous',found:true,rarity:'common'},
  {id:5,e:'🔱',name:'Horn Coral',th:'ปะการังเขา',era:'Silurian',found:false,rarity:'uncommon'},
  {id:6,e:'🍥',name:'Ammonoid',th:'แอมโมนอยด์',era:'Devonian',found:false,rarity:'uncommon'},
  {id:7,e:'🦪',name:'Brachiopod',th:'แบรคิโอพอด',era:'Ordovician',found:true,rarity:'common'},
  {id:8,e:'📍',name:'Belemnite',th:'เบเลมไนต์',era:'Devonian',found:false,rarity:'rare'},
  {id:9,e:'🪸',name:'Rugose Coral',th:'ปะการังรูโกส',era:'Silurian',found:false,rarity:'uncommon'},
  {id:10,e:'⬡',name:'Tabulate Coral',th:'ปะการังแทบูเลต',era:'Ordovician',found:false,rarity:'uncommon'},
  {id:11,e:'🐌',name:'Gastropod',th:'แกสโทรพอด',era:'Carboniferous',found:true,rarity:'common'},
  {id:12,e:'🫧',name:'Pelecypod',th:'เพเลซิโพด',era:'Devonian',found:false,rarity:'common'},
  {id:13,e:'◇',name:'Conodont',th:'โคโนดอนต์',era:'Silurian',found:false,rarity:'ultra-rare'},
  {id:14,e:'🪲',name:'Bryozoan',th:'ไบรโอโซอัน',era:'Ordovician',found:false,rarity:'uncommon'},
  {id:15,e:'⭐',name:'Echinoderm',th:'อีไคโนเดิร์ม',era:'Carboniferous',found:false,rarity:'rare'},
  {id:16,e:'🫘',name:'Ostracod',th:'ออสตราโคด',era:'Ordovician',found:false,rarity:'uncommon'},
  {id:17,e:'🧽',name:'Sponge',th:'ฟองน้ำฟอสซิล',era:'Cambrian',found:false,rarity:'rare'},
];

const FEATURES = [
  {id:1,code:'F01',label:'Scanner',color:C.teal},
  {id:2,code:'F02',label:'Fossil Dex',color:C.amber},
  {id:3,code:'F03',label:'Gamification',color:C.amber},
  {id:4,code:'F04',label:'Map',color:C.blue},
  {id:5,code:'F05',label:'Education',color:C.teal},
  {id:6,code:'F06',label:'Timeline',color:C.amber},
  {id:7,code:'F07',label:'AI Guide',color:C.blue},
  {id:8,code:'F08',label:'Teacher',color:C.green},
  {id:9,code:'F09',label:'Cards',color:C.purple},
  {id:10,code:'F10',label:'Daily',color:C.green},
  {id:11,code:'F11',label:'AR',color:C.blue},
  {id:12,code:'F12',label:'Community',color:C.teal},
  {id:13,code:'F13',label:'Settings',color:C.muted},
  {id:14,code:'F14',label:'Onboarding',color:C.teal},
  {id:15,code:'F15',label:'Feedback',color:C.red},
];

// ── PRIMITIVES ──────────────────────────────────────────────
const PBar = ({v,max=100,c,h=4}) => (
  <div style={{background:'rgba(255,255,255,0.07)',borderRadius:3,height:h,overflow:'hidden'}}>
    <div style={{width:`${Math.min(100,v/max*100)}%`,height:'100%',background:c,borderRadius:3}}/>
  </div>
);
const Tag = ({t,c}) => (
  <span style={{fontSize:9,fontWeight:600,color:c,background:c+'20',padding:'2px 7px',borderRadius:4,letterSpacing:.04,whiteSpace:'nowrap',display:'inline-block'}}>{t}</span>
);
const SLbl = ({t,c=C.muted}) => (
  <div style={{fontSize:9,fontWeight:600,letterSpacing:.1,textTransform:'uppercase',color:c,marginBottom:6,fontFamily:MONO}}>{t}</div>
);
const Panel = ({children,bc,style={}}) => (
  <div style={{background:C.card,border:`1px solid ${bc||C.border}`,borderRadius:8,padding:'12px 14px',...style}}>{children}</div>
);
const Grid2 = ({children,gap=12}) => (
  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap}}>{children}</div>
);

// ── SPOTLIGHTS ──────────────────────────────────────────────
function S01() {
  return (
    <Grid2>
      <Panel>
        <SLbl t="Confidence thresholds"/>
        {[
          {r:'≥ 80%', l:'Confirmed', note:'"Add to Dex" unlocked', c:C.green},
          {r:'50–79%', l:'Uncertain', note:'"Try a different angle"', c:C.amber},
          {r:'< 50%', l:'Not detected', note:'Neutral message shown', c:C.muted},
        ].map(x=>(
          <div key={x.r} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 0',borderBottom:`1px solid ${C.border}`}}>
            <span style={{fontSize:11,fontFamily:MONO,color:x.c,minWidth:58,fontWeight:600}}>{x.r}</span>
            <div>
              <div style={{fontSize:12,color:C.text,fontWeight:500}}>{x.l}</div>
              <div style={{fontSize:10,color:C.muted}}>{x.note}</div>
            </div>
          </div>
        ))}
      </Panel>
      <Panel>
        <SLbl t="Edge cases"/>
        {[
          {icon:'🌑', t:'Too dark', d:'Avg brightness < 30/255 → overlay warning'},
          {icon:'📵', t:'No camera permission', d:'Deep-link to Settings + explanation'},
          {icon:'🔋', t:'No NPU (old device)', d:'CPU TFLite fallback, one-time notice'},
          {icon:'💧', t:'Wet / dirty rock', d:'Model generalises — no special handling'},
        ].map(x=>(
          <div key={x.t} style={{display:'flex',gap:10,padding:'7px 0',borderBottom:`1px solid ${C.border}`,alignItems:'flex-start'}}>
            <span style={{fontSize:15}}>{x.icon}</span>
            <div>
              <div style={{fontSize:11,fontWeight:600,color:C.text}}>{x.t}</div>
              <div style={{fontSize:10,color:C.muted,lineHeight:1.4}}>{x.d}</div>
            </div>
          </div>
        ))}
      </Panel>
    </Grid2>
  );
}

function S02({sel,setSel}) {
  const sp = SPECIES[sel];
  return (
    <div style={{display:'grid',gridTemplateColumns:'1fr 260px',gap:12}}>
      <Panel>
        <SLbl t="All 18 species — select to inspect"/>
        <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:5,marginBottom:10}}>
          {SPECIES.map(s=>(
            <div key={s.id} onClick={()=>setSel(s.id)} style={{
              background:sel===s.id?C.amber+'18':C.card,
              border:`1px solid ${sel===s.id?C.amber+'80':C.border}`,
              borderRadius:6,padding:'7px 3px',textAlign:'center',cursor:'pointer',
              opacity:s.found?1:.38,filter:s.found?'none':'grayscale(.9)',transition:'all .12s'
            }}>
              <div style={{fontSize:s.found?16:11}}>{s.found?s.e:'?'}</div>
              <div style={{fontSize:7.5,color:C.muted,marginTop:2,overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis',padding:'0 2px'}}>{s.name}</div>
            </div>
          ))}
        </div>
        <div style={{background:C.amber+'08',border:`1px solid ${C.amber}30`,borderRadius:6,padding:'6px 10px',fontSize:10,color:C.amber}}>
          {SPECIES.filter(s=>s.found).length} / 18 discovered · Click any tile to see detail →
        </div>
      </Panel>
      <Panel bc={sp.found?C.teal+'40':C.border}>
        <div style={{textAlign:'center',marginBottom:10}}>
          <div style={{fontSize:40,marginBottom:6,filter:sp.found?'none':'grayscale(1) opacity(.25)'}}>{sp.found?sp.e:'🔒'}</div>
          <div style={{fontWeight:700,fontSize:14,color:C.text}}>{sp.name}</div>
          <div style={{fontSize:11,color:C.muted,marginTop:2}}>{sp.th}</div>
        </div>
        <div style={{display:'flex',justifyContent:'center',gap:5,marginBottom:10,flexWrap:'wrap'}}>
          <Tag t={sp.era} c={C.blue}/>
          <Tag t={sp.rarity} c={RC[sp.rarity]}/>
          {sp.found&&<Tag t="✓ Found" c={C.green}/>}
        </div>
        {sp.found ? (
          <>
            <div style={{fontSize:11,color:C.muted,lineHeight:1.5,marginBottom:10}}>Found in Ko Tarutao zone · 2 days ago · Scan attempt #3 matched this species.</div>
            <button style={{width:'100%',background:C.teal,color:'#fff',border:'none',borderRadius:6,padding:'8px',fontSize:11,fontWeight:600,cursor:'pointer'}}>View Trading Card →</button>
          </>
        ) : (
          <div style={{fontSize:11,color:C.muted,textAlign:'center',lineHeight:1.6}}>Not yet discovered.<br/>Hint: Visit <span style={{color:C.amber}}>Thale Ban Zone</span>.</div>
        )}
      </Panel>
    </div>
  );
}

function S03() {
  const badges = [
    {e:'🏅',n:'First Find',d:'Scanned first fossil',ok:true,c:C.amber},
    {e:'🔬',n:'Tri-Expert',d:'Found 3 trilobites',ok:true,c:C.teal},
    {e:'🌍',n:'Geo Guardian',d:'10 scans, 0 removed',ok:true,c:C.blue},
    {e:'⚡',n:'3-Day Streak',d:'Logged in 3 days',ok:true,c:C.green},
    {e:'🗺',n:'Zone Walker',d:'Visit all 5 zones',ok:false,c:C.amber},
    {e:'🎓',n:'Satun Scholar',d:'20 quiz correct',ok:false,c:C.purple},
  ];
  return (
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12}}>
      <Panel>
        <SLbl t="Level system"/>
        {[['Stone','0'],['Shale','500'],['Limestone','1,200'],['Sandstone ◀','2,500'],['Granite','4,500'],['Fossil Master','20,000']].map(([n,xp])=>{
          const active=n.includes('◀');
          return (
            <div key={n} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:`1px solid ${C.border}`,background:active?C.amber+'08':'transparent',borderRadius:active?4:0,paddingLeft:active?6:0}}>
              <span style={{fontSize:11,color:active?C.amber:C.muted,fontWeight:active?700:400}}>{n.replace(' ◀','')}{active?' ◀':''}</span>
              <span style={{fontSize:10,color:C.dim,fontFamily:MONO}}>{xp} XP</span>
            </div>
          );
        })}
      </Panel>
      <Panel>
        <SLbl t="Badges — 4/30 earned"/>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
          {badges.map(b=>(
            <div key={b.n} style={{background:b.ok?b.c+'12':C.card,border:`1px solid ${b.ok?b.c+'40':C.border}`,borderRadius:7,padding:'8px',opacity:b.ok?1:.42}}>
              <div style={{fontSize:18,marginBottom:3}}>{b.e}</div>
              <div style={{fontSize:10,fontWeight:600,color:b.ok?C.text:C.muted}}>{b.n}</div>
              <div style={{fontSize:9,color:C.muted,lineHeight:1.3}}>{b.d}</div>
            </div>
          ))}
        </div>
      </Panel>
      <Panel>
        <SLbl t="Active quests"/>
        {[
          {n:'Find a Stromatolite',v:0,max:1,xp:200,zone:'Ko Tarutao'},
          {n:'Answer 5 quiz correctly',v:3,max:5,xp:250},
          {n:'Visit 3 geopark zones',v:2,max:3,xp:300},
        ].map(q=>(
          <div key={q.n} style={{marginBottom:12}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:3}}>
              <span style={{fontSize:11,color:C.text,fontWeight:500,flex:1,paddingRight:4}}>{q.n}</span>
              <span style={{fontSize:9,fontFamily:MONO,color:C.amber}}>{q.v}/{q.max}</span>
            </div>
            <PBar v={q.v} max={q.max} c={C.amber} h={3}/>
            <div style={{fontSize:9,color:C.green,marginTop:3}}>+{q.xp} XP on complete</div>
          </div>
        ))}
        <div style={{background:C.purple+'12',border:`1px solid ${C.purple}30`,borderRadius:6,padding:'7px 10px',fontSize:11,color:C.purple,marginTop:4}}>
          🏆 Leaderboard · You: <strong>#12</strong> · Top: Pranee T. 3,480 XP
        </div>
      </Panel>
    </div>
  );
}

function S04() {
  const zones = [
    {code:'KT',name:'Ko Tarutao',fossils:['Trilobite','Nautiloid'],c:C.teal,x:50,y:70},
    {code:'TB',name:'Thale Ban',fossils:['Stromatolite','Graptolite'],c:C.amber,x:170,y:50},
    {code:'WP',name:'Wang Prachan',fossils:['Crinoid','Belemnite'],c:C.blue,x:280,y:100},
    {code:'MP',name:'Mu Ko Phetra',fossils:['Horn Coral','Brachiopod'],c:C.green,x:120,y:160},
    {code:'KL',name:'Khao Lakorn',fossils:['Conodont'],c:C.purple,x:240,y:190},
  ];
  const [sel,setSel] = useState('KT');
  const zone = zones.find(z=>z.code===sel);
  return (
    <div style={{display:'grid',gridTemplateColumns:'1fr 250px',gap:12}}>
      <Panel>
        <SLbl t="Satun Geopark zones — offline tiles loaded"/>
        <div style={{background:'#080808',borderRadius:8,height:220,position:'relative',overflow:'hidden',border:`1px solid ${C.border}`}}>
          {[20,40,60,80].map(p=><div key={'h'+p} style={{position:'absolute',top:`${p}%`,left:0,right:0,height:1,background:'rgba(255,255,255,0.04)'}}/>)}
          {[20,40,60,80].map(p=><div key={'v'+p} style={{position:'absolute',left:`${p}%`,top:0,bottom:0,width:1,background:'rgba(255,255,255,0.04)'}}/>)}
          {zones.map(z=>(
            <div key={z.code} onClick={()=>setSel(z.code)} style={{
              position:'absolute',left:z.x,top:z.y,
              background:sel===z.code?z.c:z.c+'55',
              color:'#fff',fontSize:9,fontWeight:700,
              padding:'3px 6px',borderRadius:4,cursor:'pointer',
              border:`1px solid ${z.c}`,fontFamily:MONO,
              transform:sel===z.code?'scale(1.1)':'scale(1)',
              transition:'all .12s',boxShadow:sel===z.code?`0 0 8px ${z.c}60`:'none',
            }}>{z.code}</div>
          ))}
          <div style={{position:'absolute',bottom:8,right:8,fontSize:9,color:C.teal,background:'rgba(0,0,0,0.75)',padding:'3px 7px',borderRadius:4,border:`1px solid ${C.teal}40`,fontFamily:MONO}}>◉ Offline tiles</div>
          <div style={{position:'absolute',top:8,left:8,fontSize:9,color:C.muted,background:'rgba(0,0,0,0.75)',padding:'3px 7px',borderRadius:4}}>Satun Province, TH</div>
        </div>
      </Panel>
      <Panel bc={zone.c+'50'}>
        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}>
          <div style={{width:30,height:30,borderRadius:6,background:zone.c+'20',border:`1px solid ${zone.c}40`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,color:zone.c,fontFamily:MONO}}>{zone.code}</div>
          <div>
            <div style={{fontSize:13,fontWeight:600,color:C.text}}>{zone.name}</div>
            <div style={{fontSize:10,color:C.muted}}>Satun Geopark</div>
          </div>
        </div>
        <SLbl t="Species here"/>
        {zone.fossils.map(f=>{
          const sp=SPECIES.find(s=>s.name===f);
          return (
            <div key={f} style={{display:'flex',alignItems:'center',gap:8,padding:'5px 0',borderBottom:`1px solid ${C.border}`}}>
              <span style={{fontSize:14}}>{sp?sp.e:'🦴'}</span>
              <span style={{fontSize:11,color:C.text}}>{f}</span>
            </div>
          );
        })}
        <div style={{marginTop:10,background:C.green+'12',border:`1px solid ${C.green}30`,borderRadius:6,padding:'6px 8px',fontSize:10,color:C.green}}>◉ Active quest in this zone</div>
      </Panel>
    </div>
  );
}

function S05() {
  const [tab,setTab] = useState('story');
  return (
    <Panel>
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
        <span style={{fontSize:30}}>🦀</span>
        <div style={{flex:1}}>
          <div style={{fontWeight:700,fontSize:15,color:C.text}}>Trilobite <span style={{color:C.muted,fontSize:12,fontWeight:400}}>Asaphellus cf. asaphoides</span></div>
          <div style={{fontSize:11,color:C.muted}}>ไทรโลไบต์ · Ordovician · 458–485 Ma</div>
        </div>
        <Tag t="common" c={C.green}/><Tag t="✓ Found" c={C.teal}/>
      </div>
      <div style={{display:'flex',gap:0,borderBottom:`1px solid ${C.border}`,marginBottom:12}}>
        {['story','facts','quiz','satun'].map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{
            background:'transparent',border:'none',borderBottom:`2px solid ${tab===t?C.teal:'transparent'}`,
            color:tab===t?C.teal:C.muted,padding:'6px 14px',fontSize:11,fontWeight:tab===t?600:400,
            cursor:'pointer',textTransform:'capitalize',letterSpacing:.03,transition:'color .1s'
          }}>{t}</button>
        ))}
      </div>
      {tab==='story'&&<p style={{fontSize:12,color:C.text,lineHeight:1.75}}>Trilobites ruled the Ordovician seafloor ~470 million years ago. These three-lobed arthropods were among the first complex animals on Earth — with compound eyes, articulated bodies, and the ability to roll into a defensive ball. Satun's limestone outcrops near Ko Tarutao preserve exceptional specimens from this era.</p>}
      {tab==='facts'&&<ul style={{paddingLeft:18,color:C.text,fontSize:12,lineHeight:2.1}}>
        {['Survived for 270 million years (longer than dinosaurs)','Compound eyes — among the first in evolutionary history','Could enroll into a ball for defence against predators','Over 500 genera and 10,000 species known','Used as index fossils to date rock strata globally'].map(f=><li key={f}>{f}</li>)}
      </ul>}
      {tab==='quiz'&&(
        <div>
          <div style={{fontSize:12,fontWeight:600,color:C.text,marginBottom:10}}>How long ago did trilobites first appear on Earth?</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
            {['~270 Ma','~520 Ma ✓','~100 Ma','~1,000 Ma'].map((o,i)=>(
              <div key={o} style={{background:i===1?C.green+'20':C.card,border:`1px solid ${i===1?C.green+'60':C.border}`,borderRadius:6,padding:'9px 12px',fontSize:11,color:i===1?C.green:C.muted,cursor:'pointer'}}>{o}</div>
            ))}
          </div>
        </div>
      )}
      {tab==='satun'&&<p style={{fontSize:12,color:C.text,lineHeight:1.75}}>Ko Tarutao and Wang Prachan Valley preserve well-exposed Ordovician limestone with trilobite fragments and occasional whole specimens. Satun's Ordovician paleolatitude was approximately 30°S — a warm, shallow epicontinental sea ideal for trilobite habitat. Local guides refer to them as <em style={{color:C.amber}}>"หินตา"</em> — "stone eyes."</p>}
    </Panel>
  );
}

function S06() {
  const eras = [
    {n:'Cambrian',ma:'541–485',c:'#2A8A88',w:150,chips:['🧽','🌀']},
    {n:'Ordovician',ma:'485–444',c:'#2A7A3A',w:170,chips:['🦀','〰','🦪','⬡','🫘','🪲']},
    {n:'Silurian',ma:'444–419',c:'#6A8820',w:130,chips:['🐚','🔱','🪸','◇']},
    {n:'Devonian',ma:'419–359',c:'#8A6418',w:150,chips:['🍥','📍','🫧']},
    {n:'Carboniferous',ma:'359–299',c:'#6A4214',w:180,chips:['🌸','🐌','⭐']},
  ];
  return (
    <Panel>
      <SLbl t="Geological time · 541–299 Ma · your finds pin to their era"/>
      <div style={{overflowX:'auto',paddingBottom:6}}>
        <div style={{display:'flex',gap:3,minWidth:'max-content',marginBottom:6}}>
          {eras.map(era=>(
            <div key={era.n} style={{width:era.w,background:era.c+'18',border:`1px solid ${era.c}50`,borderRadius:7,padding:'8px'}}>
              <div style={{fontSize:10,fontWeight:700,color:era.c,marginBottom:1,fontFamily:MONO}}>{era.n}</div>
              <div style={{fontSize:8,color:C.muted,marginBottom:7}}>{era.ma} Ma</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
                {era.chips.map(f=>(
                  <span key={f} title={SPECIES.find(s=>s.e===f)?.name||f} style={{fontSize:15,background:'rgba(0,0,0,0.3)',borderRadius:4,padding:2,cursor:'default'}}>{f}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{display:'flex',gap:0,minWidth:'max-content',paddingLeft:4}}>
          {['541 Ma','500','450','419','359','299 Ma'].map(m=>(
            <span key={m} style={{fontSize:8,color:C.dim,fontFamily:MONO,width:m.includes('–')||m.includes('M')?80:80}}>{m}</span>
          ))}
        </div>
      </div>
      <div style={{marginTop:10,background:C.amber+'10',border:`1px solid ${C.amber}30`,borderRadius:6,padding:'6px 10px',fontSize:10,color:C.amber}}>
        ↑ Each fossil you discover drops a pin on its era — makes deep time personal
      </div>
    </Panel>
  );
}

function S07() {
  const msgs = [
    {u:false,t:'Can I take this fossil home with me?'},
    {u:true,t:'Take a photo only! 📸 Fossils stay in place so every visitor can find them. That\'s the Fossil-Dex way.'},
    {u:false,t:'What era is this trilobite from?'},
    {u:true,t:'That\'s an Ordovician trilobite — about 470 million years old! 🌊 Satun was a warm shallow sea back then.'},
  ];
  return (
    <div style={{display:'grid',gridTemplateColumns:'1fr 250px',gap:12}}>
      <Panel>
        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:14}}>
          <div style={{width:36,height:36,borderRadius:8,background:C.blue+'20',border:`1px solid ${C.blue}40`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>🦕</div>
          <div>
            <div style={{fontWeight:700,fontSize:13,color:C.text}}>Paleo Pete</div>
            <div style={{fontSize:10,color:C.teal,fontFamily:MONO}}>◉ Offline · Always available</div>
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {msgs.map((m,i)=>(
            <div key={i} style={{display:'flex',justifyContent:m.u?'flex-end':'flex-start'}}>
              <div style={{
                maxWidth:'76%',background:m.u?C.teal+'22':C.card,
                border:`1px solid ${m.u?C.teal+'50':C.border}`,
                borderRadius:8,padding:'7px 10px',fontSize:11,color:C.text,lineHeight:1.55
              }}>{m.t}</div>
            </div>
          ))}
        </div>
      </Panel>
      <Panel>
        <SLbl t="Pete covers"/>
        {['Species facts & biology','Conservation rules','Where to find each species','Geopark zone information','Quiz hints & clues','Local Satun folklore & stories'].map(t=>(
          <div key={t} style={{padding:'6px 0',borderBottom:`1px solid ${C.border}`,fontSize:11,color:C.text}}>
            <span style={{color:C.teal,marginRight:6}}>›</span>{t}
          </div>
        ))}
        <div style={{marginTop:10,background:C.green+'12',border:`1px solid ${C.green}30`,borderRadius:6,padding:'6px 8px',fontSize:10,color:C.green}}>
          Phase 2: Claude Haiku API for complex queries
        </div>
      </Panel>
    </div>
  );
}

function S08() {
  const students = [
    {n:'Ploy S.',found:6,xp:820,done:true},
    {n:'Arm T.',found:4,xp:610,done:false},
    {n:'Mint K.',found:5,xp:740,done:true},
    {n:'Pat W.',found:2,xp:300,done:false},
  ];
  return (
    <div style={{display:'grid',gridTemplateColumns:'260px 1fr',gap:12}}>
      <Panel>
        <SLbl t="Class setup"/>
        <div style={{textAlign:'center',marginBottom:12}}>
          <div style={{fontSize:32,letterSpacing:5,fontFamily:MONO,fontWeight:700,color:C.amber,marginBottom:4}}>FD-4821</div>
          <div style={{fontSize:10,color:C.muted,marginBottom:10}}>Join code · Share with students</div>
          <div style={{background:'#fff',borderRadius:6,width:70,height:70,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,color:'#555'}}>QR Code</div>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:C.muted,marginBottom:10}}>
          <span>4 students joined</span><span style={{color:C.teal,fontFamily:MONO}}>◉ Synced</span>
        </div>
        {['✅ Safety briefing','▶ Group scan session','○ Reflection quiz'].map((t,i)=>(
          <div key={t} style={{padding:'5px 0',fontSize:11,color:i===0?C.green:i===1?C.amber:C.muted}}>{t}</div>
        ))}
      </Panel>
      <Panel>
        <SLbl t="Student progress — Today's quest: 8 species"/>
        {students.map(s=>(
          <div key={s.n} style={{display:'flex',alignItems:'center',gap:10,padding:'9px 0',borderBottom:`1px solid ${C.border}`}}>
            <div style={{width:28,height:28,borderRadius:6,background:s.done?C.green+'20':C.amber+'15',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,color:s.done?C.green:C.amber}}>{s.n[0]}</div>
            <div style={{flex:1}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                <span style={{fontSize:12,fontWeight:500,color:C.text}}>{s.n}</span>
                <span style={{fontSize:10,fontFamily:MONO,color:C.amber}}>{s.xp} XP</span>
              </div>
              <PBar v={s.found} max={8} c={s.done?C.green:C.amber} h={3}/>
              <div style={{fontSize:9,color:C.muted,marginTop:2}}>{s.found}/8 species</div>
            </div>
            {s.done&&<span style={{fontSize:18}}>✅</span>}
          </div>
        ))}
      </Panel>
    </div>
  );
}

function S09() {
  const cards = [
    {sp:SPECIES[0],seq:7,zone:'Ko Tarutao',date:'2024-12-01',shine:C.amber},
    {sp:SPECIES[1],seq:3,zone:'Thale Ban',date:'2024-12-02',shine:C.blue},
    {sp:SPECIES[13],seq:1,zone:'???',date:'Undiscovered',shine:C.purple,lock:true},
  ];
  return (
    <div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginBottom:12}}>
        {cards.map((cd,i)=>(
          <div key={i} style={{
            background:`linear-gradient(140deg,${C.card},${cd.shine}0A)`,
            border:`1.5px solid ${cd.lock?C.border:cd.shine+'70'}`,
            borderRadius:10,padding:'14px',textAlign:'center',
            opacity:cd.lock?.45:1,filter:cd.lock?'grayscale(.8)':'none',position:'relative',overflow:'hidden'
          }}>
            <div style={{position:'absolute',top:8,left:8}}><Tag t={cd.sp.rarity} c={RC[cd.sp.rarity]}/></div>
            <div style={{fontSize:44,margin:'14px 0 8px'}}>{cd.lock?'🔒':cd.sp.e}</div>
            <div style={{fontWeight:700,fontSize:13,color:C.text}}>{cd.sp.name}</div>
            <div style={{fontSize:10,color:C.muted,marginTop:2}}>{cd.sp.th}</div>
            <div style={{height:1,background:C.border,margin:'8px 0'}}/>
            <div style={{fontSize:9,color:C.muted,fontFamily:MONO,lineHeight:1.9}}>
              #{String(cd.seq).padStart(4,'0')} · {cd.sp.era}<br/>
              {cd.zone} · {cd.date}
            </div>
          </div>
        ))}
      </div>
      <div style={{background:C.purple+'10',border:`1px solid ${C.purple}30`,borderRadius:6,padding:'8px 12px',fontSize:11,color:C.purple,textAlign:'center'}}>
        Each card is unique and shareable · QR links to Satun Geopark species page · Share to Line, Instagram, etc.
      </div>
    </div>
  );
}

function S10() {
  const [chk,setChk] = useState([false,false,false]);
  const tasks = ['Scan any fossil in Ko Tarutao zone','Answer 1 quiz question correctly','Share a trading card'];
  const done = chk.filter(Boolean).length;
  return (
    <div style={{display:'grid',gridTemplateColumns:'1fr 220px',gap:12}}>
      <Panel>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
          <div>
            <div style={{fontWeight:700,fontSize:14,color:C.text}}>Today's Challenge</div>
            <div style={{fontSize:10,color:C.muted,marginTop:2}}>Resets in 06:42:17 · Monday</div>
          </div>
          <Tag t={`${done}/3 done`} c={done===3?C.green:C.amber}/>
        </div>
        <PBar v={done} max={3} c={done===3?C.green:C.amber} h={5}/>
        <div style={{marginTop:12,display:'flex',flexDirection:'column',gap:6}}>
          {tasks.map((t,i)=>(
            <div key={t} onClick={()=>{const n=[...chk];n[i]=!n[i];setChk(n);}} style={{
              display:'flex',alignItems:'center',gap:10,padding:'9px 10px',
              background:chk[i]?C.green+'10':C.card,
              border:`1px solid ${chk[i]?C.green+'50':C.border}`,
              borderRadius:6,cursor:'pointer',transition:'all .12s'
            }}>
              <div style={{width:16,height:16,borderRadius:4,border:`1.5px solid ${chk[i]?C.green:C.muted}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,color:C.green,flexShrink:0}}>{chk[i]?'✓':''}</div>
              <span style={{fontSize:11,color:chk[i]?C.green:C.text,textDecoration:chk[i]?'line-through':'none'}}>{t}</span>
            </div>
          ))}
        </div>
        {done===3&&<div style={{marginTop:10,background:C.green+'18',border:`1px solid ${C.green}50`,borderRadius:6,padding:'8px 12px',fontSize:11,color:C.green,textAlign:'center',fontWeight:600}}>🎉 Complete! +100 XP claimed</div>}
      </Panel>
      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        <Panel>
          <SLbl t="Streak"/>
          <div style={{fontSize:30,fontWeight:700,color:C.amber,fontFamily:MONO,textAlign:'center',margin:'4px 0'}}>🔥 3</div>
          <div style={{textAlign:'center',fontSize:10,color:C.muted,marginBottom:8}}>consecutive days</div>
          <div style={{display:'flex',gap:3,justifyContent:'center'}}>
            {['M','T','W','T','F','S','S'].map((d,i)=>(
              <div key={d+i} style={{width:22,height:22,borderRadius:4,background:i<3?C.amber+'30':C.card,border:`1px solid ${i<3?C.amber+'60':C.border}`,fontSize:8,display:'flex',alignItems:'center',justifyContent:'center',color:i<3?C.amber:C.muted}}>{d}</div>
            ))}
          </div>
        </Panel>
        <Panel>
          <div style={{fontSize:10,color:C.muted,marginBottom:4}}>Complete all 3 to earn:</div>
          <div style={{fontSize:14,fontWeight:700,color:C.amber,fontFamily:MONO}}>+100 XP</div>
          <div style={{fontSize:9,color:C.muted,marginTop:2}}>+ Daily Badge (Day 3)</div>
        </Panel>
      </div>
    </div>
  );
}

function S11() {
  return (
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
      <Panel>
        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}>
          <Tag t="PHASE 2" c={C.blue}/>
          <div style={{fontSize:11,color:C.muted}}>Not in v1 · Coming in Phase 3</div>
        </div>
        <div style={{background:'#060606',borderRadius:8,height:200,position:'relative',overflow:'hidden',border:`1px solid ${C.border}`}}>
          <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,#060606 20%,#0A1A14 60%,#0A1A20)'}}/>
          <div style={{position:'absolute',bottom:0,left:0,right:0,height:'55%',background:`linear-gradient(180deg,transparent,${C.teal}06,${C.blue}10)`}}/>
          <div style={{position:'absolute',top:'30%',left:'50%',transform:'translate(-50%,-50%)',textAlign:'center'}}>
            <div style={{fontSize:42,filter:`drop-shadow(0 0 14px ${C.teal}90)`}}>🦀</div>
            <div style={{fontSize:8,color:C.teal,fontFamily:MONO,marginTop:4,background:'rgba(0,0,0,0.75)',padding:'2px 8px',borderRadius:10}}>Ordovician Sea · 470 Ma</div>
          </div>
          {['🐟','🪼','🦑'].map((e,i)=>(
            <div key={e} style={{position:'absolute',top:`${35+i*18}%`,left:`${12+i*28}%`,fontSize:14,opacity:.35,filter:`drop-shadow(0 0 5px ${C.teal}50)`}}>{e}</div>
          ))}
          <div style={{position:'absolute',top:8,left:8,fontSize:9,color:C.blue,background:'rgba(0,0,0,0.8)',padding:'2px 6px',borderRadius:4,border:`1px solid ${C.blue}40`,fontFamily:MONO}}>◉ AR Active</div>
          <div style={{position:'absolute',bottom:8,right:8,fontSize:9,color:C.amber,background:'rgba(0,0,0,0.8)',padding:'3px 8px',borderRadius:4,border:`1px solid ${C.amber}60`,fontWeight:700,fontFamily:MONO}}>PHASE 2</div>
        </div>
      </Panel>
      <Panel>
        <SLbl t="AR feature plan"/>
        {[
          {e:'🌊',t:'Paleo-sea overlay',d:'See the ancient ocean via camera'},
          {e:'🪼',t:'Ancient creatures',d:'Low-poly animated sea life per species'},
          {e:'🔊',t:'Audio narration',d:'Pete voiceover + underwater ambience'},
          {e:'📱',t:'ARKit + ARCore',d:'iOS 11+ · Android 7+ · 15 MB/scene'},
          {e:'🔁',t:'Fallback mode',d:'2D animated illustration if AR unavailable'},
        ].map(x=>(
          <div key={x.t} style={{display:'flex',gap:10,padding:'7px 0',borderBottom:`1px solid ${C.border}`,alignItems:'flex-start'}}>
            <span style={{fontSize:15}}>{x.e}</span>
            <div>
              <div style={{fontSize:11,fontWeight:600,color:C.text}}>{x.t}</div>
              <div style={{fontSize:10,color:C.muted}}>{x.d}</div>
            </div>
          </div>
        ))}
      </Panel>
    </div>
  );
}

function S12() {
  return (
    <div style={{display:'grid',gridTemplateColumns:'1fr 260px',gap:12}}>
      <Panel>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
          <SLbl t="Community sightings heatmap"/>
          <Tag t="⚠ Exact GPS hidden" c={C.red}/>
        </div>
        <div style={{background:'#060606',borderRadius:8,height:190,position:'relative',overflow:'hidden',border:`1px solid ${C.border}`}}>
          {[{x:60,y:60,r:65,c:C.teal},{x:200,y:75,r:55,c:C.amber},{x:135,y:140,r:45,c:C.blue},{x:280,y:130,r:40,c:C.teal}].map((h,i)=>(
            <div key={i} style={{position:'absolute',left:h.x-h.r/2,top:h.y-h.r/2,width:h.r,height:h.r,borderRadius:'50%',background:`radial-gradient(circle,${h.c}55 0%,transparent 70%)`}}/>
          ))}
          {[25,50,75].map(p=><div key={p} style={{position:'absolute',left:`${p}%`,top:0,bottom:0,width:1,background:'rgba(255,255,255,0.04)'}}/>)}
          {[25,50,75].map(p=><div key={p} style={{position:'absolute',top:`${p}%`,left:0,right:0,height:1,background:'rgba(255,255,255,0.04)'}}/>)}
          <div style={{position:'absolute',bottom:8,left:8,fontSize:9,color:C.muted,fontFamily:MONO}}>500 m grid · Last 90 days</div>
        </div>
        <div style={{marginTop:8,fontSize:10,color:C.muted,lineHeight:1.5}}>Tapping hotspot shows: most reported species, count, last date. No usernames, no exact location.</div>
      </Panel>
      <Panel>
        <SLbl t="Privacy controls"/>
        {[
          {l:'Share my location',s:'Snapped to 500m grid only',on:false,c:C.red},
          {l:'Contribute sightings',s:'Anonymous, opt-in after 5th find',on:false,c:C.amber},
          {l:'View community map',s:'Always available, read-only',on:true,c:C.teal},
        ].map(p=>(
          <div key={p.l} style={{display:'flex',alignItems:'center',gap:10,padding:'9px 0',borderBottom:`1px solid ${C.border}`}}>
            <div style={{flex:1}}>
              <div style={{fontSize:11,fontWeight:500,color:C.text}}>{p.l}</div>
              <div style={{fontSize:9,color:C.muted}}>{p.s}</div>
            </div>
            <div style={{width:34,height:18,borderRadius:9,background:p.on?C.teal+'60':C.border,border:`1px solid ${p.on?C.teal:C.border}`,position:'relative',flexShrink:0}}>
              <div style={{position:'absolute',top:2,left:p.on?15:2,width:12,height:12,borderRadius:'50%',background:p.on?C.teal:C.muted,transition:'left .15s'}}/>
            </div>
          </div>
        ))}
        <div style={{marginTop:10,background:C.red+'10',border:`1px solid ${C.red}30`,borderRadius:6,padding:'6px 8px',fontSize:10,color:C.red}}>
          ⚠ Exact GPS is never stored server-side. Privacy by design.
        </div>
      </Panel>
    </div>
  );
}

function S13() {
  const rows = [
    {s:'App',items:[{i:'🌐',l:'Language',v:'English'},{i:'🎨',l:'Theme',v:'Dark · Field'}]},
    {s:'Content',items:[{i:'📦',l:'Offline tiles',v:'78.4 MB · OK'},{i:'🤖',l:'AI model',v:'v1.2.0 · 9.8 MB'}]},
    {s:'Privacy',items:[{i:'📍',l:'Location sharing',v:'Off'},{i:'📸',l:'Correction uploads',v:'Wi-Fi only'},{i:'🗑',l:'Delete all data',v:'',danger:true}]},
    {s:'About',items:[{i:'ℹ',l:'App version',v:'1.0.0 (42)'},{i:'⚖',l:'Licences',v:''}]},
  ];
  return (
    <Panel style={{maxWidth:460}}>
      {rows.map(sec=>(
        <div key={sec.s} style={{marginBottom:16}}>
          <SLbl t={sec.s}/>
          {sec.items.map((item,i)=>(
            <div key={item.l} style={{display:'flex',alignItems:'center',gap:10,padding:'9px 0',borderBottom:`1px solid ${i<sec.items.length-1?C.border:'transparent'}`,cursor:'pointer'}}>
              <span style={{fontSize:15,width:24,textAlign:'center'}}>{item.i}</span>
              <span style={{flex:1,fontSize:12,color:item.danger?C.red:C.text}}>{item.l}</span>
              <span style={{fontSize:11,color:C.muted}}>{item.v}</span>
              <span style={{color:C.dim,fontSize:11}}>›</span>
            </div>
          ))}
        </div>
      ))}
    </Panel>
  );
}

function S14() {
  const steps = [
    {i:'👀',t:'Look only',s:'Observe and photograph. Never dig, chip, or remove any geological material.',c:C.teal},
    {i:'📶',t:'Works offline',s:'Scanning, collecting, maps, and Pete all work without internet signal.',c:C.blue},
    {i:'📸',t:'Scan safely',s:'Point camera at rock surface. All science happens through observation.',c:C.amber},
  ];
  return (
    <div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginBottom:12}}>
        {steps.map((s,i)=>(
          <Panel key={s.t} bc={s.c+'50'}>
            <div style={{fontSize:9,fontWeight:700,color:s.c,letterSpacing:.1,textTransform:'uppercase',marginBottom:6,fontFamily:MONO}}>STEP {i+1}</div>
            <div style={{fontSize:32,marginBottom:8}}>{s.i}</div>
            <div style={{fontWeight:700,fontSize:13,color:C.text,marginBottom:5}}>{s.t}</div>
            <div style={{fontSize:11,color:C.muted,lineHeight:1.55}}>{s.s}</div>
          </Panel>
        ))}
      </div>
      <Panel bc={C.teal+'40'}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <span style={{fontSize:24}}>🌿</span>
          <div style={{flex:1}}>
            <div style={{fontWeight:700,fontSize:12,color:C.teal,marginBottom:3}}>Conservation Pledge</div>
            <div style={{fontSize:11,color:C.text,lineHeight:1.55,fontStyle:'italic'}}>"I will observe and photograph fossils in place. I will not remove, damage, or mark any geological feature. The geopark belongs to everyone."</div>
          </div>
          <button style={{background:C.teal,color:'#fff',border:'none',borderRadius:6,padding:'9px 16px',fontSize:11,fontWeight:600,cursor:'pointer',whiteSpace:'nowrap'}}>I Agree →</button>
        </div>
      </Panel>
    </div>
  );
}

function S15() {
  const [step,setStep] = useState(0);
  const opts = ['Graptolite','Stromatolite','Horn Coral','Brachiopod','Not a fossil','Unsure'];
  return (
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
      <Panel>
        <SLbl t={`Correction flow · step ${step+1} of 3`}/>
        {step===0&&(
          <div>
            <div style={{background:C.red+'10',border:`1px solid ${C.red}30`,borderRadius:8,padding:'10px 12px',marginBottom:12}}>
              <div style={{fontSize:10,color:C.muted,marginBottom:4}}>Detected as:</div>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <span style={{fontSize:22}}>🦀</span>
                <div>
                  <div style={{fontWeight:700,fontSize:12,color:C.text}}>Trilobite</div>
                  <div style={{fontSize:10,color:C.red}}>Confidence 42% — possible error</div>
                </div>
              </div>
            </div>
            <SLbl t="What did you actually see?"/>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
              {opts.map(o=>(
                <div key={o} onClick={()=>setStep(1)} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:6,padding:'7px 10px',fontSize:11,color:C.text,cursor:'pointer',textAlign:'center',transition:'border-color .1s'}}>{o}</div>
              ))}
            </div>
          </div>
        )}
        {step===1&&(
          <div>
            <div style={{fontSize:12,color:C.text,marginBottom:8}}>Optionally add a clearer photo:</div>
            <div style={{background:'#060606',borderRadius:7,height:80,border:`1px dashed ${C.border}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,color:C.muted,cursor:'pointer',marginBottom:12}}>📷 Take comparison photo</div>
            <div style={{display:'flex',gap:8}}>
              <button onClick={()=>setStep(2)} style={{flex:1,background:C.teal,color:'#fff',border:'none',borderRadius:6,padding:'8px',fontSize:11,fontWeight:600,cursor:'pointer'}}>Save offline</button>
              <button onClick={()=>setStep(0)} style={{flex:1,background:'transparent',color:C.muted,border:`1px solid ${C.border}`,borderRadius:6,padding:'8px',fontSize:11,cursor:'pointer'}}>Back</button>
            </div>
          </div>
        )}
        {step===2&&(
          <div>
            <div style={{background:C.green+'12',border:`1px solid ${C.green}30`,borderRadius:8,padding:'10px 12px',marginBottom:10}}>
              <div style={{fontWeight:700,fontSize:12,color:C.green,marginBottom:3}}>✓ Saved offline</div>
              <div style={{fontSize:11,color:C.muted}}>Will upload on next Wi-Fi (with consent).</div>
            </div>
            <div style={{background:C.amber+'10',border:`1px solid ${C.amber}30`,borderRadius:6,padding:'7px 10px',marginBottom:10,fontSize:10,color:C.amber}}>
              If accepted by review team → +100 XP awarded
            </div>
            <button onClick={()=>setStep(0)} style={{width:'100%',background:'transparent',color:C.muted,border:`1px solid ${C.border}`,borderRadius:6,padding:'7px',fontSize:11,cursor:'pointer'}}>Start over</button>
          </div>
        )}
      </Panel>
      <Panel>
        <SLbl t="Privacy & consent"/>
        {[
          {i:'💾',t:'Save offline',c:C.teal,d:'Local only — zero upload unless you choose'},
          {i:'☁',t:'Share with consent',c:C.blue,d:'Asked each time · Wi-Fi only by default'},
          {i:'🔒',t:'No personal data',c:C.green,d:'Image only — no GPS, no account linked'},
          {i:'👁',t:'Human review',c:C.amber,d:'Every image reviewed before model use'},
          {i:'❌',t:'Withdraw anytime',c:C.red,d:'Settings → Privacy → Delete submissions'},
        ].map(x=>(
          <div key={x.t} style={{display:'flex',gap:10,padding:'7px 0',borderBottom:`1px solid ${C.border}`,alignItems:'flex-start'}}>
            <span style={{fontSize:14}}>{x.i}</span>
            <div>
              <div style={{fontSize:11,fontWeight:600,color:x.c}}>{x.t}</div>
              <div style={{fontSize:10,color:C.muted,lineHeight:1.4}}>{x.d}</div>
            </div>
          </div>
        ))}
      </Panel>
    </div>
  );
}

// ── MAIN APP ────────────────────────────────────────────────
export default function FossilDex() {
  const [feat,setFeat] = useState(1);
  const [selSp,setSelSp] = useState(0);
  const found = SPECIES.filter(s=>s.found).length;

  const SPOTS = {
    1:<S01/>,2:<S02 sel={selSp} setSel={setSelSp}/>,3:<S03/>,
    4:<S04/>,5:<S05/>,6:<S06/>,7:<S07/>,8:<S08/>,
    9:<S09/>,10:<S10/>,11:<S11/>,12:<S12/>,
    13:<S13/>,14:<S14/>,15:<S15/>
  };

  return (
    <div style={{background:C.bg,minHeight:'100vh',fontFamily:`"DM Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif`,fontSize:13,color:C.text}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=DM+Sans:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes scan{0%{top:7px;opacity:1}85%{opacity:1}100%{top:170px;opacity:0}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.25}}
        @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.07)}}
        .ftab:hover{background:rgba(255,255,255,0.05)!important}
        .sptile:hover{border-color:rgba(239,160,32,.45)!important;background:rgba(239,160,32,.04)!important}
        ::-webkit-scrollbar{width:3px;height:3px}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,.14);border-radius:2px}
      `}</style>

      {/* ── HEADER ── */}
      <div style={{background:C.panel,borderBottom:`1px solid ${C.border}`,padding:'10px 18px',display:'flex',alignItems:'center',gap:12,position:'sticky',top:0,zIndex:10}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <span style={{fontSize:20}}>🦀</span>
          <div>
            <span style={{fontWeight:700,fontSize:15,color:C.text}}>Fossil</span>
            <span style={{fontWeight:700,fontSize:15,color:C.amber}}>-Dex</span>
            <span style={{fontSize:10,color:C.muted,marginLeft:8}}>Satun UNESCO Global Geopark</span>
          </div>
        </div>
        <span style={{fontSize:11,color:C.muted,fontStyle:'italic',marginLeft:4}}>Discover, do not dig.</span>
        <div style={{marginLeft:'auto',display:'flex',gap:6}}>
          {[['◉ Offline ready',C.teal],['18 species',C.amber],['EN / TH',C.blue]].map(([l,c])=>(
            <span key={l} style={{fontSize:9,color:c,border:`1px solid ${c}40`,padding:'3px 8px',borderRadius:12,fontFamily:MONO,whiteSpace:'nowrap'}}>{l}</span>
          ))}
        </div>
      </div>

      {/* ── MAIN 3-COL DASHBOARD ── */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1.15fr 0.75fr',borderBottom:`1px solid ${C.border}`}}>

        {/* COL 1 — SCANNER */}
        <div style={{background:C.panel,padding:'13px 14px',borderRight:`1px solid ${C.border}`}}>
          <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:10}}>
            <div style={{width:6,height:6,borderRadius:'50%',background:C.teal,animation:'blink 2s infinite',flexShrink:0}}/>
            <span style={{fontWeight:600,fontSize:10,color:C.teal,letterSpacing:.09,textTransform:'uppercase',fontFamily:MONO}}>Scanner</span>
            <span style={{fontSize:9,color:C.teal,border:`1px solid ${C.teal}40`,padding:'1px 6px',borderRadius:10,fontFamily:MONO}}>Offline</span>
          </div>
          {/* Viewfinder */}
          <div style={{background:'#070707',borderRadius:8,height:178,position:'relative',overflow:'hidden',border:`1px solid ${C.border}`,marginBottom:10}}>
            {[{top:7,left:7,borderTop:`2px solid ${C.teal}`,borderLeft:`2px solid ${C.teal}`},{top:7,right:7,borderTop:`2px solid ${C.teal}`,borderRight:`2px solid ${C.teal}`},{bottom:7,left:7,borderBottom:`2px solid ${C.teal}`,borderLeft:`2px solid ${C.teal}`},{bottom:7,right:7,borderBottom:`2px solid ${C.teal}`,borderRight:`2px solid ${C.teal}`}].map((s,i)=>(
              <div key={i} style={{position:'absolute',width:13,height:13,...s}}/>
            ))}
            <div style={{position:'absolute',left:8,right:8,height:1.5,background:C.teal,boxShadow:`0 0 8px ${C.teal}`,animation:'scan 2.4s linear infinite'}}/>
            <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:4}}>
              <div style={{fontSize:38,animation:'pulse 3s ease-in-out infinite'}}>🦀</div>
              <div style={{fontSize:8,color:C.teal,fontFamily:MONO,background:'rgba(0,0,0,.8)',padding:'2px 8px',borderRadius:10}}>ANALYZING...</div>
            </div>
            <div style={{position:'absolute',top:9,right:9,display:'flex',flexDirection:'column',gap:3,alignItems:'flex-end'}}>
              {[['☀ Good light','#8aff8a'],['No upload',C.muted]].map(([l,c])=>(
                <span key={l} style={{fontSize:7.5,color:c,background:'rgba(0,0,0,.75)',padding:'1px 5px',borderRadius:3,fontFamily:MONO}}>{l}</span>
              ))}
            </div>
            <div style={{position:'absolute',bottom:8,left:9,right:9}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:3}}>
                <span style={{fontSize:7.5,color:C.muted,fontFamily:MONO}}>confidence</span>
                <span style={{fontSize:7.5,color:'#FAC775',fontFamily:MONO,fontWeight:700}}>92%</span>
              </div>
              <PBar v={92} c={C.teal} h={3}/>
            </div>
          </div>
          {/* Result card */}
          <div style={{background:C.card,borderRadius:8,padding:'9px 11px',border:`1px solid ${C.teal}30`}}>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
              <span style={{fontSize:20}}>🦀</span>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:600,fontSize:11}}>Trilobite · ไทรโลไบต์</div>
                <div style={{fontSize:9.5,color:C.muted}}>Ordovician · ~470 Ma</div>
              </div>
              <Tag t="92%" c={C.teal}/>
            </div>
            <div style={{display:'flex',gap:5}}>
              <button style={{flex:1,background:C.teal,color:'#fff',border:'none',borderRadius:5,padding:'5px 0',fontSize:9.5,fontWeight:600,cursor:'pointer'}}>Add to Dex</button>
              <button style={{flex:1,background:'transparent',color:C.text,border:`1px solid ${C.border}`,borderRadius:5,padding:'5px 0',fontSize:9.5,cursor:'pointer'}}>Learn More</button>
              <button style={{background:'transparent',color:C.muted,border:`1px solid ${C.border}`,borderRadius:5,padding:'5px 7px',fontSize:9.5,cursor:'pointer'}}>Wrong ID?</button>
            </div>
          </div>
        </div>

        {/* COL 2 — FOSSIL DEX */}
        <div style={{background:C.panel,padding:'13px 14px',borderRight:`1px solid ${C.border}`}}>
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}>
            <span style={{fontWeight:600,fontSize:10,color:C.amber,letterSpacing:.09,textTransform:'uppercase',fontFamily:MONO}}>Fossil Dex</span>
            <span style={{fontSize:10,color:C.muted}}>{found} / 18</span>
            <div style={{flex:1}}><PBar v={found} max={18} c={C.amber} h={3}/></div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:5,marginBottom:10}}>
            {SPECIES.map(s=>(
              <div key={s.id} className="sptile" onClick={()=>setSelSp(s.id)} style={{
                background:selSp===s.id?C.amber+'14':C.card,
                border:`1px solid ${selSp===s.id?C.amber+'80':C.border}`,
                borderRadius:6,padding:'6px 2px',textAlign:'center',
                opacity:s.found?1:.35,filter:s.found?'none':'grayscale(.9)',
                transition:'all .12s',cursor:'pointer'
              }}>
                <div style={{fontSize:s.found?15:10}}>{s.found?s.e:'?'}</div>
                <div style={{fontSize:7,color:C.muted,marginTop:2,overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis',padding:'0 1px'}}>{s.name}</div>
              </div>
            ))}
          </div>
          {(() => {
            const s = SPECIES[selSp];
            return (
              <div style={{background:C.card,borderRadius:7,padding:'9px 11px',border:`1px solid ${s.found?C.teal+'30':C.border}`,animation:'fadeUp .15s ease'}}>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <span style={{fontSize:22,filter:s.found?'none':'grayscale(1) opacity(.25)'}}>{s.found?s.e:'🔒'}</span>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontWeight:600,fontSize:12,color:C.text}}>{s.name}</div>
                    <div style={{fontSize:10,color:C.muted}}>{s.th} · {s.era}</div>
                  </div>
                  <div style={{display:'flex',flexDirection:'column',gap:3,alignItems:'flex-end'}}>
                    <Tag t={s.rarity} c={RC[s.rarity]}/>
                    {s.found&&<Tag t="✓ Found" c={C.green}/>}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* COL 3 — PROFILE */}
        <div style={{background:C.panel,padding:'13px 13px'}}>
          <div style={{fontWeight:600,fontSize:10,color:C.muted,letterSpacing:.09,textTransform:'uppercase',marginBottom:10,fontFamily:MONO}}>Field Profile</div>
          <div style={{background:C.card,borderRadius:7,padding:'9px 10px',marginBottom:8,border:`1px solid ${C.border}`}}>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <div style={{width:32,height:32,borderRadius:6,background:C.amber+'16',border:`1px solid ${C.amber}40`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,flexShrink:0}}>🪨</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:10.5,fontWeight:700,color:C.text,marginBottom:3}}>Lv.4 Sandstone</div>
                <PBar v={1240} max={2500} c={C.amber} h={3}/>
                <div style={{fontSize:8,color:C.muted,marginTop:2,fontFamily:MONO}}>1,240 / 2,500 XP</div>
              </div>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:5,marginBottom:8}}>
            {[['7','Species'],['1,240','XP'],['3','Streak'],['4','Badges']].map(([v,l])=>(
              <div key={l} style={{background:C.card,borderRadius:6,padding:'6px 8px',border:`1px solid ${C.border}`}}>
                <div style={{fontSize:16,fontWeight:700,color:C.amber,fontFamily:MONO}}>{v}</div>
                <div style={{fontSize:8,color:C.muted}}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{fontSize:9,color:C.dim,letterSpacing:.08,textTransform:'uppercase',marginBottom:5,fontFamily:MONO}}>Recent badges</div>
          <div style={{display:'flex',gap:4,marginBottom:8}}>
            {[['🏅',C.amber],['🔬',C.teal],['🌍',C.blue],['⚡',C.green]].map(([e,c])=>(
              <div key={e} style={{flex:1,background:C.card,border:`1px solid ${c}28`,borderRadius:6,padding:'5px',textAlign:'center',fontSize:15}}>{e}</div>
            ))}
          </div>
          <div style={{background:C.green+'14',border:`1px solid ${C.green}28`,borderRadius:6,padding:'6px 8px'}}>
            <div style={{fontSize:9,color:C.green}}>+200 XP · New species</div>
            <div style={{fontSize:8,color:C.muted,marginTop:1}}>Trilobite · Ko Tarutao · now</div>
          </div>
        </div>
      </div>

      {/* ── FEATURE TABS ── */}
      <div style={{background:C.panel,borderBottom:`1px solid ${C.border}`,display:'flex',overflowX:'auto',padding:'0 10px',flexShrink:0}}>
        {FEATURES.map(f=>(
          <button key={f.id} className="ftab" onClick={()=>setFeat(f.id)} style={{
            background:'transparent',border:'none',
            borderBottom:`2px solid ${feat===f.id?f.color:'transparent'}`,
            color:feat===f.id?f.color:C.muted,
            padding:'9px 10px',fontSize:10.5,fontWeight:feat===f.id?600:400,
            cursor:'pointer',whiteSpace:'nowrap',transition:'all .1s',letterSpacing:.02,flexShrink:0
          }}>
            <span style={{fontFamily:MONO,fontSize:8.5,marginRight:4,color:feat===f.id?f.color:C.dim}}>{f.code}</span>
            {f.label}
          </button>
        ))}
      </div>

      {/* ── SPOTLIGHT PANEL ── */}
      <div style={{padding:'16px 18px',animation:'fadeUp .18s ease'}} key={feat}>
        <div style={{fontSize:9,color:C.muted,fontFamily:MONO,marginBottom:10,letterSpacing:.08,textTransform:'uppercase'}}>
          {FEATURES[feat-1].code} · {FEATURES[feat-1].label}
        </div>
        {SPOTS[feat]}
      </div>
    </div>
  );
}
