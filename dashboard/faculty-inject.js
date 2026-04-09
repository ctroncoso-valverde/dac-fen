/* faculty-inject.js — Faculty data sub-tab for AACSB section
   Loaded dynamically by the dashboard. Adds a 4th sub-tab "Faculty data"
   that decrypts and displays snapshot_aacsb.enc in read-only mode. */
(function(){
'use strict';
var facSnapshot=null;

/* ══════ CRYPTO ══════ */
async function decryptData(buf,password){
var salt=buf.slice(0,16),iv=buf.slice(16,28),ct=buf.slice(28);
var enc=new TextEncoder();
var km=await crypto.subtle.importKey('raw',enc.encode(password),'PBKDF2',false,['deriveKey']);
var key=await crypto.subtle.deriveKey({name:'PBKDF2',salt:salt,iterations:100000,hash:'SHA-256'},km,{name:'AES-GCM',length:256},false,['decrypt']);
var dec=await crypto.subtle.decrypt({name:'AES-GCM',iv:iv},key,ct);
return JSON.parse(new TextDecoder().decode(dec));
}

/* ══════ INJECT SUB-TAB ══════ */
function inject(){
var subs=document.getElementById('aaSubs');
if(!subs||document.getElementById('facBtn'))return;
var btn=document.createElement('button');
btn.id='facBtn';btn.className='sub-tab';btn.textContent='Faculty data';
btn.onclick=function(){setAAView('faculty',btn)};
subs.appendChild(btn);

var facDiv=document.createElement('div');
facDiv.id='aaFaculty';facDiv.style.display='none';
var execDiv=document.getElementById('aaExec');
if(execDiv)execDiv.parentNode.insertBefore(facDiv,execDiv.nextSibling);

var origSet=window.setAAView;
window.setAAView=function(v,b){
origSet(v,b);
facDiv.style.display=v==='faculty'?'block':'none';
if(v==='faculty')buildFacultyView();
};
}

/* ══════ BADGE HELPERS ══════ */
var CLASIF_COLORS={SA:['#dbeafe','#1d4ed8'],PA:['#ede9fe','#6d28d9'],SP:['#e0f2fe','#0369a1'],IP:['#ffedd5','#c2410c'],A:['#fee2e2','#dc2626']};
var SUF_COLORS={Participating:['#dcfce7','#166534'],Supporting:['#f3f4f6','#6b7280']};
function badge(text,bg,tx){return'<span style="font-size:10px;padding:1px 6px;border-radius:4px;font-weight:600;background:'+bg+';color:'+tx+'">'+text+'</span>'}
function clasifBadge(c){var col=CLASIF_COLORS[c]||['#f3f4f6','#6b7280'];return badge(c,col[0],col[1])}
function sufBadge(s){var col=SUF_COLORS[s]||['#f3f4f6','#6b7280'];return badge(s==='Participating'?'P':'S',col[0],col[1])}
function listaBadge(l){if(!l||l==='NINGUNA')return'<span style="color:#9ca3af;font-size:10px">—</span>';var m={LISTA_I:['I','#dcfce7','#166534'],LISTA_II:['II','#dbeafe','#1e40af'],LISTA_III:['III','#fef3c7','#92400e']};var v=m[l];if(!v)return badge(l,'#f3f4f6','#6b7280');return badge(v[0],v[1],v[2])}

/* ══════ BUILD VIEW ══════ */
function buildFacultyView(){
var el=document.getElementById('aaFaculty');
if(!el)return;
if(facSnapshot){renderFacultyDashboard(el,facSnapshot);return}
// Login screen
el.innerHTML='<div style="background:var(--bg2);border-radius:12px;padding:48px 24px;text-align:center;margin-top:8px">'+
'<div style="font-size:36px;margin-bottom:12px">🔒</div>'+
'<div style="font-size:15px;font-weight:600;margin-bottom:4px">Datos faculty encriptados</div>'+
'<div style="font-size:12px;color:var(--tx2);margin-bottom:16px;max-width:420px;margin-left:auto;margin-right:auto">Snapshot exportado desde la app de gestión local. Clasificaciones, evidencias y ratios AACSB. Solo lectura.</div>'+
'<div style="display:flex;gap:8px;justify-content:center;align-items:center;max-width:320px;margin:0 auto">'+
'<input type="password" id="facRut" placeholder="Ingresa tu RUT" style="flex:1;padding:8px 12px;border:1px solid var(--bd);border-radius:6px;font-size:13px;font-family:inherit;text-align:center">'+
'<button onclick="doFacDecrypt()" style="padding:8px 16px;border:1px solid var(--bd2);border-radius:6px;background:var(--bg3);cursor:pointer;font-family:inherit;font-size:12px;font-weight:600">Desencriptar</button></div>'+
'<div id="facStatus" style="font-size:11px;color:var(--tx3);margin-top:8px"></div></div>';
}

window.doFacDecrypt=async function(){
var rut=document.getElementById('facRut').value.trim();
var st=document.getElementById('facStatus');
if(!rut){st.innerHTML='<span style="color:var(--nonet)">Ingresa un RUT</span>';return}
st.textContent='Cargando snapshot...';
try{
var resp=await fetch('snapshot_aacsb.enc');
if(!resp.ok)throw new Error('No se encontró snapshot_aacsb.enc ('+resp.status+'). ¿Ya lo exportaste y subiste al repo?');
var buf=new Uint8Array(await resp.arrayBuffer());
st.textContent='Desencriptando...';
facSnapshot=await decryptData(buf,rut);
// Also update AACSB metrics in the dashboard
if(facSnapshot.ratios&&facSnapshot.ratios.global&&window.aaState){
var g=facSnapshot.ratios.global;
aaState.metrics.sa=g.sa;aaState.metrics.qual=g.qual;aaState.metrics.part=g.part;aaState.metrics.pci=g.pci;
if(typeof saveAAState==='function')saveAAState();
}
renderFacultyDashboard(document.getElementById('aaFaculty'),facSnapshot);
}catch(err){
st.innerHTML='<span style="color:var(--nonet)">'+err.message+'</span>';
}};

function renderFacultyDashboard(el,snap){
var g=snap.ratios.global,m=snap.meta;
var h='';
// KPIs
h+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:16px">';
var kpis=[
{v:g.sa+'%',l:'SA (PTDM)',col:g.sa>=40?'var(--donet)':'var(--nonet)'},
{v:g.qual+'%',l:'Qualified (PTDM)',col:g.qual>=90?'var(--donet)':'var(--nonet)'},
{v:g.part+'%',l:'P/(P+S) SCH',col:g.part>=75?'var(--donet)':'var(--partialt)'},
{v:m.total,l:m.regulares+' reg. · '+m.adjuntos+' adj.',col:'var(--tx)'}
];
kpis.forEach(function(k){h+='<div style="padding:14px;border:1px solid var(--bd);border-radius:10px;background:var(--bg3);text-align:center"><div style="font-size:22px;font-weight:700;color:'+k.col+'">'+k.v+'</div><div style="font-size:10px;color:var(--tx2);margin-top:2px">'+k.l+'</div></div>'});
h+='</div>';
// Ratios by discipline
h+='<div style="font-size:12px;font-weight:600;color:var(--tx2);margin-bottom:8px">Ratios por disciplina</div>';
h+='<div style="border:1px solid var(--bd);border-radius:10px;overflow:hidden;background:var(--bg3);margin-bottom:16px"><table style="width:100%;border-collapse:collapse;font-size:12px">';
h+='<tr style="background:var(--bg2)"><th style="text-align:left;padding:8px 12px;font-size:11px;font-weight:500;color:var(--tx2)">Disciplina</th><th style="text-align:right;padding:8px;font-size:11px;color:var(--tx2)">SA%</th><th style="text-align:right;padding:8px;font-size:11px;color:var(--tx2)">Qual%</th><th style="text-align:right;padding:8px;font-size:11px;color:var(--tx2)">P/(P+S)</th><th style="text-align:right;padding:8px 12px;font-size:11px;color:var(--tx2)">PTDM</th></tr>';
var dNames={ADM_NI_INN:'Adm., Neg. Intl. e Innovación',ECON_GP:'Economía y Gestión Pública',CON_FIN_TRI:'Contabilidad, Finanzas y Trib.',AD_MKT_TUR:'Analítica, Marketing y Turismo'};
(snap.ratios.byDisc||[]).forEach(function(d){
var saCol=d.sa>=40?'var(--donet)':'var(--nonet)';
h+='<tr><td style="padding:6px 12px;border-top:1px solid var(--bg2)">'+(dNames[d.code]||d.code)+'</td><td style="text-align:right;padding:6px 8px;border-top:1px solid var(--bg2);color:'+saCol+';font-weight:600">'+d.sa+'%</td><td style="text-align:right;padding:6px 8px;border-top:1px solid var(--bg2)">'+d.qual+'%</td><td style="text-align:right;padding:6px 8px;border-top:1px solid var(--bg2)">'+d.part+'%</td><td style="text-align:right;padding:6px 12px;border-top:1px solid var(--bg2);color:var(--tx2)">'+d.ptdm+'</td></tr>'});
h+='</table></div>';
// Filters
h+='<div style="display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap;align-items:center">';
h+='<input type="text" id="facSearch" placeholder="Buscar por nombre..." style="padding:6px 10px;border:1px solid var(--bd);border-radius:6px;font-size:12px;font-family:inherit;max-width:200px" oninput="filterFaculty()">';
h+='<select id="facFClasif" style="padding:5px 8px;border:1px solid var(--bd);border-radius:6px;font-size:11px;font-family:inherit" onchange="filterFaculty()"><option value="">Todas las clasif.</option><option>SA</option><option>PA</option><option>SP</option><option>IP</option><option>A</option></select>';
h+='<select id="facFDisc" style="padding:5px 8px;border:1px solid var(--bd);border-radius:6px;font-size:11px;font-family:inherit" onchange="filterFaculty()"><option value="">Todas las disciplinas</option><option>ADM_NI_INN</option><option>ECON_GP</option><option>CON_FIN_TRI</option><option>AD_MKT_TUR</option></select>';
h+='<select id="facFPlanta" style="padding:5px 8px;border:1px solid var(--bd);border-radius:6px;font-size:11px;font-family:inherit" onchange="filterFaculty()"><option value="">Todos</option><option>Regular</option><option>Adjunto</option></select>';
h+='<span id="facCount" style="font-size:11px;color:var(--tx3);margin-left:auto"></span></div>';
// Table
h+='<div id="facTable"></div>';
// Footer
h+='<div style="margin-top:12px;padding:10px 12px;background:var(--bg2);border-radius:8px;font-size:11px;color:var(--tx3)">Snapshot de solo lectura · Generado '+new Date(m.fecha).toLocaleDateString('es-CL')+' · Año evaluación: '+m.anioEval+' · Para editar, usar la app local</div>';
el.innerHTML=h;
filterFaculty();
}

window.filterFaculty=function(){
if(!facSnapshot)return;
var q=(document.getElementById('facSearch').value||'').toLowerCase();
var fc=document.getElementById('facFClasif').value;
var fd=document.getElementById('facFDisc').value;
var fp=document.getElementById('facFPlanta').value;
var filtered=facSnapshot.academicos.filter(function(a){
if(q&&!a.nombre.toLowerCase().includes(q))return false;
if(fc&&a.clasificacion!==fc)return false;
if(fd&&a.disciplina!==fd)return false;
if(fp){var isReg=(a.planta||'').toLowerCase().includes('regular');if(fp==='Regular'&&!isReg)return false;if(fp==='Adjunto'&&isReg)return false}
return true;
});
document.getElementById('facCount').textContent=filtered.length+' de '+facSnapshot.academicos.length;
var h='<div style="border:1px solid var(--bd);border-radius:10px;overflow:hidden;background:var(--bg3)">';
h+='<table style="width:100%;border-collapse:collapse;font-size:12px"><tr style="background:var(--bg2)"><th style="text-align:left;padding:8px 10px;font-size:11px;color:var(--tx2)">Nombre</th><th style="text-align:center;padding:8px 6px;font-size:11px;color:var(--tx2)">Planta</th><th style="text-align:center;padding:8px 6px;font-size:11px;color:var(--tx2)">Grado</th><th style="text-align:center;padding:8px 6px;font-size:11px;color:var(--tx2)">Clasif.</th><th style="text-align:center;padding:8px 6px;font-size:11px;color:var(--tx2)">Suf.</th><th style="text-align:center;padding:8px 6px;font-size:11px;color:var(--tx2)">Disciplina</th><th style="text-align:right;padding:8px 10px;font-size:11px;color:var(--tx2)">PTDM</th></tr>';
filtered.forEach(function(a,i){
var isReg=(a.planta||'').toLowerCase().includes('regular');
var plantaBadge=isReg?badge('Regular','#E1F5EE','#085041'):badge('Adjunto','#f3f4f6','#6b7280');
h+='<tr style="cursor:pointer;transition:background .1s" onmouseover="this.style.background=\'var(--bg2)\'" onmouseout="this.style.background=\'\'" onclick="toggleFacDetail(\''+a.nombre.replace(/'/g,"\\'")+'\')">';
h+='<td style="padding:6px 10px;border-top:1px solid var(--bg2);font-weight:500">'+a.nombre+'</td>';
h+='<td style="text-align:center;padding:6px;border-top:1px solid var(--bg2)">'+plantaBadge+'</td>';
h+='<td style="text-align:center;padding:6px;border-top:1px solid var(--bg2);font-size:11px">'+(a.grado||'—')+'</td>';
h+='<td style="text-align:center;padding:6px;border-top:1px solid var(--bg2)">'+clasifBadge(a.clasificacion)+'</td>';
h+='<td style="text-align:center;padding:6px;border-top:1px solid var(--bg2)">'+sufBadge(a.suficiencia)+'</td>';
h+='<td style="text-align:center;padding:6px;border-top:1px solid var(--bg2);font-size:11px">'+(a.disciplina||'—')+'</td>';
h+='<td style="text-align:right;padding:6px 10px;border-top:1px solid var(--bg2)">'+(a.ptdm||0)+'</td></tr>';
h+='<tr id="facDet_'+i+'" style="display:none"><td colspan="7" style="padding:0;border:none"><div id="facDetC_'+i+'" style="padding:12px 14px;background:var(--bg2);border-bottom:2px solid var(--bd)"></div></td></tr>';
});
h+='</table></div>';
document.getElementById('facTable').innerHTML=h;
};

window.toggleFacDetail=function(nombre){
if(!facSnapshot)return;
var acad=facSnapshot.academicos.find(function(a){return a.nombre===nombre});
if(!acad)return;
// Find the detail row
var rows=document.querySelectorAll('[id^="facDet_"]');
rows.forEach(function(row){
var idx=row.id.replace('facDet_','');
var contentEl=document.getElementById('facDetC_'+idx);
var prevRow=row.previousElementSibling;
if(!prevRow)return;
var nameCell=prevRow.querySelector('td');
if(!nameCell)return;
var rowName=nameCell.textContent.trim();
if(rowName===nombre){
if(row.style.display==='none'){
row.style.display='';
renderFacultyDetail(contentEl,acad);
}else{
row.style.display='none';
}
}else{
row.style.display='none';
}
});
};

function renderFacultyDetail(el,a){
var h='<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">';
var initials=(a.nombre||'').split(',').map(function(p){return p.trim().charAt(0)}).reverse().join('');
var cc=CLASIF_COLORS[a.clasificacion]||['#f3f4f6','#6b7280'];
h+='<div style="width:40px;height:40px;border-radius:50%;background:'+cc[0]+';display:flex;align-items:center;justify-content:center;font-weight:600;font-size:13px;color:'+cc[1]+'">'+initials+'</div>';
h+='<div><div style="font-size:14px;font-weight:600">'+a.nombre+'</div>';
h+='<div style="font-size:12px;color:var(--tx2)">'+(a.planta||'')+' · '+(a.grado||'')+((a.gradoDetalle&&a.gradoDetalle!==a.grado)?' — '+a.gradoDetalle:'')+' · '+(a.discText||a.disciplina||'')+' · PTDM '+(a.ptdm||0)+'</div></div>';
h+='<div style="margin-left:auto;display:flex;gap:6px">'+clasifBadge(a.clasificacion)+' '+sufBadge(a.suficiencia)+'</div></div>';

// Evidences
var evs=a.evidencias||[];
h+='<div style="font-size:12px;font-weight:600;color:var(--tx2);margin-bottom:6px;padding-bottom:4px;border-bottom:1px solid var(--bd)">Evidencias aprobadas ('+evs.length+')</div>';
if(evs.length===0)h+='<div style="font-size:11px;color:var(--tx3);font-style:italic;padding:4px 0;margin-bottom:12px">Sin evidencias aprobadas</div>';
else{
h+='<div style="margin-bottom:12px">';
evs.forEach(function(e){
h+='<div style="padding:6px 0;border-bottom:1px solid var(--bg2);display:flex;align-items:flex-start;gap:8px;font-size:11px">';
h+=listaBadge(e.lista);
h+='<div style="flex:1"><div style="font-weight:500">'+(e.titulo||e.codigo)+'</div>';
h+='<div style="color:var(--tx2)">'+e.codigo+' · '+(e.anio||'?')+(e.revista?' · '+e.revista:'')+'</div></div></div>';
});
h+='</div>';
}

// Exp laboral
var exps=(a.expLaboral||[]).filter(function(e){return e.califica});
h+='<div style="font-size:12px;font-weight:600;color:var(--tx2);margin-bottom:6px;padding-bottom:4px;border-bottom:1px solid var(--bd)">Experiencia laboral calificante ('+exps.length+')</div>';
if(exps.length===0)h+='<div style="font-size:11px;color:var(--tx3);font-style:italic;padding:4px 0">Sin experiencia calificante registrada</div>';
else{
exps.forEach(function(e){
h+='<div style="padding:4px 0;font-size:11px"><span style="font-weight:500">'+e.cargo+'</span> — '+e.org+' ('+(e.inicio||'?')+'–'+(e.fin||'?')+')</div>';
});
}
el.innerHTML=h;
}

/* ══════ INIT ══════ */
function waitAndInject(){
if(document.getElementById('aaSubs')){inject();return}
var obs=new MutationObserver(function(){if(document.getElementById('aaSubs')){obs.disconnect();inject()}});
obs.observe(document.body,{childList:true,subtree:true});
setTimeout(function(){obs.disconnect()},10000);
}
if(document.readyState==='complete')waitAndInject();
else window.addEventListener('load',waitAndInject);
})();
