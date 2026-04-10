/* aacsb-v2.js — Replaces old AACSB functions in dashboard */
(function(){
var aaGroupBy='std';
var AA_COLORS={sa:{bar:'#378ADD',bg:'#E6F1FB'},qual:{bar:'#378ADD',bg:'#E6F1FB'},part:{bar:'#1D9E75',bg:'#E1F5EE'},pci:{bar:'#7F77DD',bg:'#EEEDFE'},aolPre:{bar:'#BA7517',bg:'#FAEEDA'},aolPost:{bar:'#D85A30',bg:'#FAECE7'}};
var CRIT_BORDER=['#E24B4A','#BA7517','#1D9E75'];

window.setAAView=function(v,btn){
document.querySelectorAll('#aaSubs .sub-tab').forEach(function(b){b.classList.remove('on')});
btn.classList.add('on');
var r=document.getElementById('aaResumen'),t=document.getElementById('aaTrack');
if(r)r.style.display=v==='resumen'?'block':'none';
if(t)t.style.display=v==='track'?'block':'none';
if(v==='resumen')buildAAResumen();
if(v==='track')buildAATrack2();
};

window.buildAA=function(){buildAAResumen();buildAATrack2()};

function buildAAResumen(){
var el=document.getElementById('aaResumen');if(!el)return;
var h='<div style="font-size:16px;font-weight:600;margin-bottom:14px">M\u00e9tricas clave</div>';
h+='<div style="display:grid;gap:10px;margin-bottom:24px">';
var keys=['sa','qual','part','pci','aolPre','aolPost'];
keys.forEach(function(k){
var base=AA_BASELINE[k],cur=aaState.metrics[k],tgt=AA_BASELINE_TARGETS[k];
var delta=Math.round((cur-base)*10)/10;
var dTxt=delta>0?'+'+delta+'pp':delta<0?delta+'pp':'';
var curCol=cur>=tgt?'#27500A':cur>=tgt*0.5?'#854F0B':'#A32D2D';
var pct=Math.min(Math.round(cur/tgt*100),100);
var c=AA_COLORS[k];
h+='<div style="display:flex;align-items:center;gap:16px;padding:14px 18px;background:var(--bg3);border:1px solid var(--bd);border-left:4px solid '+c.bar+';border-radius:0 10px 10px 0">';
h+='<div style="flex:1"><div style="font-size:15px;font-weight:600">'+AA_METRIC_NAMES[k]+'</div>';
h+='<div style="display:flex;align-items:center;gap:8px;margin-top:6px"><div style="flex:1;height:8px;background:'+c.bg+';border-radius:4px;overflow:hidden;max-width:200px"><div style="width:'+pct+'%;height:100%;background:'+c.bar+';border-radius:4px"></div></div>';
h+='<span style="font-size:12px;color:var(--tx3)">meta '+tgt+'%</span></div></div>';
h+='<div style="text-align:right"><div style="font-size:12px;color:var(--tx3)">Base</div><div style="font-size:16px;color:var(--tx2)">'+base+'%</div></div>';
h+='<div style="color:var(--tx3);font-size:16px">\u2192</div>';
h+='<div style="text-align:right;min-width:70px"><div style="font-size:12px;color:var(--tx3)">Actual</div><div style="font-size:22px;font-weight:700;color:'+curCol+'">'+cur+'%</div>';
if(dTxt)h+='<div style="font-size:11px;color:'+(delta>0?'#27500A':'#A32D2D')+'">'+dTxt+'</div>';
h+='</div></div>';
});
h+='</div>';
h+='<div style="padding:12px 16px;background:var(--bg2);border-radius:8px;font-size:13px;color:var(--tx2);line-height:1.6;margin-bottom:24px"><b>AoL postgrado ('+AA_BASELINE.aolPost+'%):</b> '+AA_AOL_POST_NOTE+'<br>SA, Qualified, Participating y Participating con CI se actualizan desde el snapshot Faculty data. AoL se actualiza manualmente.</div>';

// Criticality cards
h+='<div style="font-size:16px;font-weight:600;margin-bottom:14px">Compromisos por criticidad</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:24px">';
[0,1,2].forEach(function(c){
var total=AA.filter(function(a){return a.crit===c}).length;
var done=AA.filter(function(a){return a.crit===c&&getAASt(a.id)==='hecho'}).length;
var pend=total-done;var pct=total?Math.round(done/total*100):0;
h+='<div style="background:var(--bg3);border:1px solid var(--bd);border-top:4px solid '+CRIT_BORDER[c]+';border-radius:0 0 10px 10px;padding:16px"><div style="font-size:14px;font-weight:600;color:'+CRIT_TX[c]+';margin-bottom:12px">'+CRIT_LABELS[c]+'</div>';
h+='<div style="display:flex;justify-content:space-between;align-items:baseline"><div><div style="font-size:12px;color:var(--tx3)">Base</div><div style="font-size:26px;font-weight:700">'+total+'</div></div><div style="font-size:18px;color:var(--tx3)">\u2192</div><div style="text-align:right"><div style="font-size:12px;color:var(--tx3)">Pendientes</div><div style="font-size:26px;font-weight:700;color:'+CRIT_TX[c]+'">'+pend+'</div></div></div>';
h+='<div style="margin-top:10px;height:8px;background:'+CRIT_BG[c]+';border-radius:4px;overflow:hidden"><div style="width:'+pct+'%;height:100%;background:#639922;border-radius:4px"></div></div>';
h+='<div style="font-size:12px;color:var(--tx3);margin-top:4px">'+done+' de '+total+' completados</div></div>';
});
h+='</div>';

// Rings by standard
h+='<div style="font-size:16px;font-weight:600;margin-bottom:14px">Avance por est\u00e1ndar</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px">';
for(var s=0;s<9;s++){
var si=AA.filter(function(c){return c.std===s});if(!si.length)continue;
var sd=si.filter(function(c){return getAASt(c.id)==='hecho'}).length;
var sp=si.length?sd/si.length:0;var r=28,circ=2*Math.PI*r,off=circ*(1-sp);
h+='<div style="background:var(--bg3);border:1px solid var(--bd);border-radius:10px;padding:14px;text-align:center"><svg viewBox="0 0 70 70" style="width:60px;height:60px"><circle cx="35" cy="35" r="'+r+'" fill="none" stroke="var(--bg2)" stroke-width="5"/><circle cx="35" cy="35" r="'+r+'" fill="none" stroke="'+AA_STDC[s]+'" stroke-width="5" stroke-linecap="round" stroke-dasharray="'+circ.toFixed(1)+'" stroke-dashoffset="'+off.toFixed(1)+'" transform="rotate(-90 35 35)"/><text x="35" y="38" text-anchor="middle" font-size="13" font-weight="700" fill="'+AA_STDC[s]+'" font-family="DM Sans,sans-serif">'+sd+'/'+si.length+'</text></svg><div style="font-size:13px;font-weight:600;margin-top:4px">'+AA_STDN[s]+'</div></div>';
}
h+='</div>';
el.innerHTML=h;
}

/* -- Seguimiento -- */
function buildAATrack2(){
var el=document.getElementById('aaTrack');if(!el)return;
var h='<div style="display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap;align-items:center"><span style="font-size:14px;font-weight:600;color:var(--tx2)">Agrupar por:</span>';
['std','tier','crit','status'].forEach(function(g){
var labels={std:'Est\u00e1ndar',tier:'Nivel',crit:'Criticidad',status:'Estado'};
var active=aaGroupBy===g;
var cls=active?'background:var(--tx);color:var(--bg3);border-color:var(--tx)':'background:transparent;color:var(--tx2)';
h+='<button style="font-size:13px;padding:6px 14px;border:1px solid var(--bd);border-radius:6px;cursor:pointer;font-family:inherit;'+cls+'" onclick="window._aaSetGroup(\''+g+'\')">'+labels[g]+'</button>';
});
h+='</div>';
var groups=[],gLabels=[],gColors=[];
if(aaGroupBy==='std'){for(var s=0;s<9;s++){var it=AA.filter(function(c){return c.std===s});if(it.length){groups.push(it);gLabels.push(AA_STDN[s]);gColors.push(AA_STDC[s])}}}
else if(aaGroupBy==='tier'){[0,1,2,3].forEach(function(t){var it=AA.filter(function(c){return c.tier===t});if(it.length){groups.push(it);gLabels.push(TIER_LABELS[t]);gColors.push(['#7F77DD','#D85A30','#378ADD','#1D9E75'][t])}})}
else if(aaGroupBy==='crit'){[0,1,2].forEach(function(c){var it=AA.filter(function(a){return a.crit===c});if(it.length){groups.push(it);gLabels.push(CRIT_LABELS[c]);gColors.push(['#E24B4A','#BA7517','#1D9E75'][c])}})}
else{['pendiente','en curso','por confirmar','hecho','bloqueado'].forEach(function(st){var it=AA.filter(function(c){return getAASt(c.id)===st});if(it.length){groups.push(it);gLabels.push(st);gColors.push(aaStColor(st)[1])}})}
groups.forEach(function(items,gi){
var done=items.filter(function(c){return getAASt(c.id)==='hecho'}).length;
var pct=items.length?Math.round(done/items.length*100):0;
var badgeBg=pct>=60?'var(--done)':pct>0?'var(--partial)':'var(--none)';
var badgeTx=pct>=60?'var(--donet)':pct>0?'var(--partialt)':'var(--nonet)';
h+='<div class="aa-std" id="aag'+gi+'"><div class="aa-std-h" onclick="this.parentElement.classList.toggle(\'open\')">';
h+='<div style="width:10px;height:10px;border-radius:50%;background:'+gColors[gi]+';flex-shrink:0"></div>';
h+='<div style="font-size:14px;font-weight:600;flex:1">'+gLabels[gi]+'</div>';
h+='<div style="font-size:12px;padding:3px 10px;border-radius:6px;font-weight:600;background:'+badgeBg+';color:'+badgeTx+'">'+done+'/'+items.length+'</div>';
h+='<div style="width:80px;height:6px;background:var(--bg2);border-radius:3px;overflow:hidden;margin:0 8px"><div style="width:'+pct+'%;height:100%;background:'+gColors[gi]+';border-radius:3px"></div></div>';
h+='<span class="aa-std-arrow">&#9654;</span></div><div class="aa-std-body">';
items.forEach(function(c){
var st=getAASt(c.id);var sc=aaStColor(st);
var isDone=st==='hecho';
var rowSt=isDone?'opacity:0.5;':'';
var nameSt=isDone?'text-decoration:line-through;color:var(--tx3);':'';
h+='<div class="aa-commit" id="aac_'+c.id+'" style="'+rowSt+'"><div class="aa-commit-head" onclick="this.parentElement.classList.toggle(\'expanded\');this.parentElement.style.opacity=\'1\'">';
h+='<div class="aa-commit-name" style="font-size:14px;'+nameSt+'"><span style="color:var(--tx3);font-size:11px">'+c.id+'</span> '+c.n+'</div>';
h+='<div class="aa-commit-badges"><span style="font-size:10px;padding:2px 6px;border-radius:4px;font-weight:700;background:'+CRIT_BG[c.crit]+';color:'+CRIT_TX[c.crit]+'">'+CRIT_LABELS[c.crit]+'</span>';
h+='<span style="font-size:10px;padding:2px 6px;border-radius:4px;font-weight:600;background:var(--bg2);color:var(--tx2)">'+TIER_LABELS[c.tier]+'</span>';
h+='<span style="font-size:11px;padding:2px 8px;border-radius:4px;font-weight:600;background:'+sc[0]+';color:'+sc[1]+'">'+st+'</span></div></div>';
h+='<div class="aa-detail" onclick="event.stopPropagation()"><div style="display:flex;gap:14px;flex-wrap:wrap;margin-bottom:10px;font-size:13px">';
h+='<div><b style="color:var(--tx2)">Plazo:</b> '+c.plazo+'</div><div><b style="color:var(--tx2)">Responsable:</b> '+c.resp+'</div><div><b style="color:var(--tx2)">iSER ref:</b> '+c.ref+'</div></div>';
if(c.desc)h+='<div style="margin-bottom:10px;color:var(--tx2);font-size:13px">'+c.desc+'</div>';
h+='<div style="display:flex;gap:8px;align-items:center;margin-bottom:10px"><b style="color:var(--tx2);font-size:13px">Estado:</b><select class="st-select" style="font-size:13px;padding:4px 8px" onchange="upAASt(\''+c.id+'\',this.value)">';
AA_SOPTS.forEach(function(o){h+='<option'+(o===st?' selected':'')+'>'+o+'</option>'});
h+='</select></div><div style="font-size:13px;font-weight:600;color:var(--tx2);margin-bottom:4px">Notas de seguimiento:</div>';
h+='<textarea class="aa-note-input" style="font-size:13px" id="aan_'+c.id+'" placeholder="Agregar nota..."></textarea>';
h+='<button class="aa-note-save" style="font-size:12px" onclick="addAANote(\''+c.id+'\')">Guardar nota</button>';
h+='<div class="aa-note-log" id="aanl_'+c.id+'">'+renderAANotes(c.id)+'</div></div></div>';
});
h+='</div></div>';
});
el.innerHTML=h;
}

window._aaSetGroup=function(g){aaGroupBy=g;buildAATrack2()};
window.upAASt=function(id,v){if(!aaState.commits[id])aaState.commits[id]={status:v,notes:[]};else aaState.commits[id].status=v;saveAAState();buildAATrack2();buildAAResumen()};
window.addAANote=function(id){var inp=document.getElementById('aan_'+id);var t=inp.value.trim();if(!t)return;if(!aaState.commits[id])aaState.commits[id]={status:getAASt(id),notes:[]};if(!aaState.commits[id].notes)aaState.commits[id].notes=[];aaState.commits[id].notes.push({date:new Date().toLocaleDateString('es-CL'),text:t});saveAAState();inp.value='';document.getElementById('aanl_'+id).innerHTML=renderAANotes(id)};
window.renderAANotes=function(id){var n=aaState.commits[id]?aaState.commits[id].notes:[];if(!n||!n.length)return'<div style="color:var(--tx3);font-style:italic;padding:3px 0;font-size:12px">Sin notas</div>';return n.slice().reverse().map(function(x){return'<div class="aa-note-entry" style="font-size:12px"><b>'+x.date+'</b> \u2014 '+x.text+'</div>'}).join('')};
})();
/* Migration: fix old localStorage values */
if(typeof aaState!=='undefined'){
if(aaState.metrics.aolPost===70)aaState.metrics.aolPost=29;
if(typeof saveAAState==='function')saveAAState();
}
/* Re-run after overriding */
if(typeof aaState!=='undefined')buildAA();
