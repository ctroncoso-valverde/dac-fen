/* search-patch.js — v1.0: Global search overlay (Cmd+K / click) */
(function(){

/* ===== 1. INJECT BUTTON + OVERLAY ===== */
var hdr=document.querySelector('.hdr-actions');
if(hdr){
var btn=document.createElement('button');
btn.innerHTML='\ud83d\udd0d Buscar';
btn.onclick=function(){openSearch()};
hdr.prepend(btn);
}

var ov=document.createElement('div');
ov.id='searchOverlay';
ov.innerHTML='<div id="searchBox"><div style="display:flex;align-items:center;gap:8px;margin-bottom:12px"><input id="searchInput" type="text" placeholder="Buscar en todo el dashboard... (Esc para cerrar)" autocomplete="off"><button id="searchClose" title="Cerrar">\u2715</button></div><div id="searchResults"></div><div id="searchEmpty" style="display:none;text-align:center;padding:2rem 0;color:var(--tx3);font-size:13px">Sin resultados. Prueba con otro t\u00e9rmino.</div><div id="searchHint" style="text-align:center;padding:2rem 0;color:var(--tx3);font-size:12px">Escribe para buscar en tareas DAC, compromisos AACSB, iniciativas estrat\u00e9gicas y ciclo 2026.<br><span style="font-size:11px">Atajo: <kbd style="padding:1px 5px;border:1px solid var(--bd);border-radius:3px;font-family:monospace;background:var(--bg2)">Cmd+K</kbd></span></div></div>';
document.body.appendChild(ov);

/* ===== 2. STYLES ===== */
var sty=document.createElement('style');
sty.textContent='#searchOverlay{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:2000;display:none;align-items:flex-start;justify-content:center;padding-top:min(12vh,100px)}#searchOverlay.open{display:flex}#searchBox{background:var(--bg);border-radius:14px;width:95%;max-width:640px;max-height:75vh;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,.2);overflow:hidden;padding:16px}#searchInput{flex:1;font-size:15px;padding:10px 14px;border:1px solid var(--bd);border-radius:8px;font-family:inherit;background:var(--bg3);color:var(--tx);outline:none}#searchInput:focus{border-color:var(--accent);box-shadow:0 0 0 2px rgba(127,119,221,.15)}#searchClose{font-size:16px;width:36px;height:36px;border:1px solid var(--bd);border-radius:8px;background:var(--bg3);cursor:pointer;color:var(--tx3);display:flex;align-items:center;justify-content:center;flex-shrink:0}#searchClose:hover{background:var(--bg2)}#searchResults{overflow-y:auto;flex:1}';
sty.textContent+='.sr-group{margin-bottom:12px}.sr-group-h{font-size:11px;text-transform:uppercase;letter-spacing:.5px;color:var(--tx3);font-weight:600;padding:4px 0;margin-bottom:4px;border-bottom:1px solid var(--bg2)}.sr-item{display:flex;gap:10px;padding:8px 10px;border-radius:8px;cursor:pointer;transition:background .1s;align-items:flex-start}.sr-item:hover{background:var(--bg2)}.sr-pill{font-size:10px;font-weight:600;padding:2px 8px;border-radius:4px;white-space:nowrap;flex-shrink:0;margin-top:2px}.sr-body{flex:1;min-width:0}.sr-title{font-size:13px;font-weight:500;line-height:1.4}.sr-title mark{background:#FEF08A;color:var(--tx);border-radius:2px;padding:0 1px}.sr-desc{font-size:11px;color:var(--tx3);margin-top:2px;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.sr-desc mark{background:#FEF08A;color:var(--tx2);border-radius:2px;padding:0 1px}.sr-st{font-size:10px;font-weight:600;padding:2px 6px;border-radius:4px;flex-shrink:0;margin-top:2px}';
document.head.appendChild(sty);

/* ===== 3. OPEN / CLOSE ===== */
function openSearch(){ov.classList.add('open');var inp=document.getElementById('searchInput');inp.value='';inp.focus();document.getElementById('searchResults').innerHTML='';document.getElementById('searchEmpty').style.display='none';document.getElementById('searchHint').style.display='block'}
function closeSearch(){ov.classList.remove('open')}
window.openSearch=openSearch;

ov.addEventListener('click',function(e){if(e.target===ov)closeSearch()});
document.getElementById('searchClose').addEventListener('click',closeSearch);
document.addEventListener('keydown',function(e){
if((e.metaKey||e.ctrlKey)&&e.key==='k'){e.preventDefault();if(ov.classList.contains('open'))closeSearch();else openSearch()}
if(e.key==='Escape'&&ov.classList.contains('open'))closeSearch();
});

/* ===== 4. SEARCH LOGIC ===== */
document.getElementById('searchInput').addEventListener('input',function(){
var q=this.value.trim().toLowerCase();
if(!q){document.getElementById('searchResults').innerHTML='';document.getElementById('searchEmpty').style.display='none';document.getElementById('searchHint').style.display='block';return}
document.getElementById('searchHint').style.display='none';
var results=[];

/* 4a. DAC Tasks */
T.forEach(function(t,i){
var haystack=[t.n,t.desc||'',t.nt||'',t.tags||''].join(' ').toLowerCase();
/* Also search notes */
var dn=window.dacNotes||{};
if(dn[i])dn[i].forEach(function(n){haystack+=' '+n.text.toLowerCase()});
if(haystack.indexOf(q)>=0){
var st=state[i]||t.b;
results.push({src:'dac',dim:t.d,label:DN[t.d],title:t.n,desc:t.desc||t.nt||'',status:st,action:function(){closeSearch();showTab(2);setTimeout(function(){var el=document.getElementById('cu'+t.d);if(el&&!el.classList.contains('open'))el.classList.add('open');var tk=document.getElementById('cut'+i);if(tk){tk.classList.add('expanded');tk.scrollIntoView({behavior:'smooth',block:'center'})}},150)}})
}
});

/* 4b. AACSB Commitments */
AA.forEach(function(c){
var haystack=[c.id,c.n,c.desc||'',c.ref||'',c.resp||''].join(' ').toLowerCase();
var an=aaState.commits[c.id];
if(an&&an.notes)an.notes.forEach(function(n){haystack+=' '+n.text.toLowerCase()});
if(haystack.indexOf(q)>=0){
var st=getAASt(c.id);
results.push({src:'aa',dim:-1,label:'AACSB '+AA_STDN[c.std],title:c.id+' '+c.n,desc:c.desc||'',status:st,action:function(){closeSearch();showTab(4);setTimeout(function(){var subs=document.querySelectorAll('#aaSubs .sub-tab');if(subs[1])setAAView('track',subs[1]);setTimeout(function(){var el=document.getElementById('aac_'+c.id)||document.getElementById('trk_'+c.id);if(el){el.classList.add('expanded');el.scrollIntoView({behavior:'smooth',block:'center'})}},200)},150)}})
}
});

/* 4c. Strategic Initiatives */
STRAT.forEach(function(s){
var haystack=[s.n,s.o,s.lb].join(' ').toLowerCase();
var sn=stratState[s.id];
if(sn&&sn.notes)sn.notes.forEach(function(n){haystack+=' '+n.text.toLowerCase()});
if(haystack.indexOf(q)>=0){
var st=getStratStatus(s.id);
results.push({src:'strat',dim:-1,label:'Estrat\u00e9gica \u00b7 '+s.lb,title:s.n,desc:'Responsable: '+s.o,status:st,action:function(){closeSearch();showTab(5);setTimeout(function(){var se=document.getElementById('se_'+s.id);if(se)se.classList.add('open')},200)}})
}
});

/* 4d. Cycle 2026 */
for(var key in HT){
var tks=HT[key];
tks.forEach(function(tk){
if(tk.t.toLowerCase().indexOf(q)>=0){
var p=key.split('-');
var m=+p[0],d=+p[1];
results.push({src:'cycle',dim:d,label:'Ciclo '+MN[m]+' \u00b7 '+DN[d],title:tk.t,desc:'Fecha: '+tk.dt+' \u00b7 '+MF[m],status:tk.s==='aae'?'AAE':tk.s==='cna'?'CNA':tk.s==='new'?'nuevo':'SAIC',action:function(){var kk=key;return function(){closeSearch();showTab(3);setTimeout(function(){showCD(kk)},200)}}()})
}
});
}

renderResults(results,q);
});

/* ===== 5. RENDER RESULTS ===== */
function renderResults(results,q){
var cont=document.getElementById('searchResults');
var empty=document.getElementById('searchEmpty');
if(!results.length){cont.innerHTML='';empty.style.display='block';return}
empty.style.display='none';

/* Group by source */
var groups={dac:[],aa:[],strat:[],cycle:[]};
results.forEach(function(r){groups[r.src].push(r)});
var srcNames={dac:'Tareas DAC',aa:'Compromisos AACSB',strat:'Iniciativas estrat\u00e9gicas',cycle:'Ciclo 2026'};
var srcOrder=['dac','aa','strat','cycle'];

var h='';
srcOrder.forEach(function(src){
if(!groups[src].length)return;
h+='<div class="sr-group"><div class="sr-group-h">'+srcNames[src]+' ('+groups[src].length+')</div>';
groups[src].forEach(function(r,ri){
var pillBg,pillTx;
if(r.src==='dac'){pillBg=DCB[r.dim];pillTx=DCT[r.dim]}
else if(r.src==='aa'){pillBg='var(--info)';pillTx='var(--infot)'}
else if(r.src==='strat'){pillBg='#F3E5F5';pillTx='#6A1B9A'}
else{pillBg=r.dim>=0?DCB[r.dim]:'var(--bg2)';pillTx=r.dim>=0?DCT[r.dim]:'var(--tx2)'}
var stSc=r.src==='dac'?stColor(r.status):r.src==='aa'?aaStColor(r.status):['var(--bg2)','var(--tx2)'];
h+='<div class="sr-item" data-sri="'+src+'_'+ri+'">';
h+='<div class="sr-pill" style="background:'+pillBg+';color:'+pillTx+'">'+r.label+'</div>';
h+='<div class="sr-body"><div class="sr-title">'+highlight(r.title,q)+'</div>';
if(r.desc)h+='<div class="sr-desc">'+highlight(r.desc,q)+'</div>';
h+='</div>';
h+='<div class="sr-st" style="background:'+stSc[0]+';color:'+stSc[1]+'">'+r.status+'</div>';
h+='</div>';
});
h+='</div>';
});
cont.innerHTML=h;

/* Bind click handlers */
var allItems=cont.querySelectorAll('.sr-item');
var flat=[];
srcOrder.forEach(function(src){groups[src].forEach(function(r){flat.push(r)})});
allItems.forEach(function(el,i){
el.addEventListener('click',function(){if(flat[i]&&flat[i].action)flat[i].action()});
});
}

function highlight(text,q){
if(!q)return text;
var re=new RegExp('('+q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')','gi');
return text.replace(re,'<mark>$1</mark>');
}

})();
