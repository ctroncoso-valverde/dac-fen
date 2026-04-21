/* nav-v2.js — Dashboard 2.0: Single-row navigation by focus areas */
(function(){
'use strict';

var NAV=[
  {label:'AACSB',idx:4},
  {label:'Assessment',idx:8},
  {label:'Progresi\u00f3n estudiantil',idx:9},
  {label:'Acreditaciones',idx:10},
  {label:'Gesti\u00f3n VRAC',idx:0,subPanels:[
    {label:'Gesti\u00f3n',idx:0,subSubs:[
      {label:'Dimensiones',idx:0},
      {label:'L\u00ednea base',idx:1},
      {label:'Estado actual',idx:2}
    ]},
    {label:'Ciclo 2026',idx:3}
  ]},
  {label:'Gesti\u00f3n FEN',idx:5,subPanels:[
    {label:'Seg. estrat\u00e9gico',idx:5}
  ]},
  {label:'Reporter\u00eda',idx:6}
];

var PANEL_TO_NAV={};
NAV.forEach(function(item,ni){
  PANEL_TO_NAV[item.idx]=ni;
  if(item.subPanels)item.subPanels.forEach(function(sp){
    PANEL_TO_NAV[sp.idx]=ni;
    if(sp.subSubs)sp.subSubs.forEach(function(ss){PANEL_TO_NAV[ss.idx]=ni});
  });
});
var ALL_PANELS=[0,1,2,3,4,5,6,8,9,10];

var pesos;
function loadPesos(){try{var s=localStorage.getItem('dac_pesos_v20');if(s)return JSON.parse(s)}catch(e){}return{aacsb:40,assess:25,prog:25,accred:10}}
function savePesos(){localStorage.setItem('dac_pesos_v20',JSON.stringify(pesos))}
pesos=loadPesos();

window.editPeso=function(key){
  var cur=pesos[key]||0;
  var v=prompt('Ingresa el nuevo peso (%) para este foco:',cur);
  if(v===null)return;
  var n=parseInt(v);
  if(isNaN(n)||n<0||n>100){alert('Valor inv\u00e1lido');return}
  pesos[key]=n;savePesos();
  var el=document.querySelector('[data-peso="'+key+'"] span:first-child');
  if(el)el.textContent=n+'%';
};

function pesoBadgeHTML(key){
  return'<div class="peso-badge" data-peso="'+key+'">Peso: <span>'+pesos[key]+'%</span> <span class="peso-edit" onclick="editPeso(\''+key+'\')">editar</span></div>';
}

var sty=document.createElement('style');
sty.textContent=
'.peso-badge{display:inline-flex;align-items:center;gap:6px;font-size:12px;color:var(--tx2);background:var(--bg2);border:1px solid var(--bd);border-radius:6px;padding:6px 12px;white-space:nowrap}'+
'.peso-badge span:first-child{font-weight:600;color:var(--tx)}'+
'.peso-edit{font-size:11px;color:var(--accent);cursor:pointer;margin-left:4px}'+
'#v2SubBar{display:none;gap:4px;flex-wrap:wrap;margin-bottom:.5rem}'+
'#v2SubBar .sub-tab{font-size:13px;padding:6px 14px}'+
'#v2SubSubBar{display:none;gap:4px;flex-wrap:wrap;padding-left:8px;margin-bottom:1rem}'+
'#v2SubSubBar .sub-tab{font-size:12px;padding:4px 12px}';
document.head.appendChild(sty);

function createPanels(){
  var app=document.querySelector('.app');
  var footer=document.querySelector('footer');

  var t8=document.createElement('div');
  t8.className='panel';t8.id='tab8';
  t8.innerHTML='<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:8px"><div><span style="font-size:18px;font-weight:600">Assessment del aprendizaje</span><br><span style="font-size:14px;color:var(--tx2)">Ciclo AAE pregrado + postgrado</span></div>'+pesoBadgeHTML('assess')+'</div><div class="sub-tabs"><button class="sub-tab on" onclick="setAssessView(\'pre\',this)">Pregrado</button><button class="sub-tab" onclick="setAssessView(\'post\',this)">Postgrado</button></div><div id="assessPre"><div class="coming"><h3>Assessment pregrado \u2014 en construcci\u00f3n</h3><p>Planes AAE trianual por carrera, monitoreo de implementaci\u00f3n,<br>calendario institucional, matrices de resultados, closing the loop.</p></div></div><div id="assessPost" style="display:none"><div class="coming"><h3>Assessment postgrado \u2014 en construcci\u00f3n</h3><p>7 programas: estado de plan AAE, datos recolectados,<br>brechas, acciones, closing the loop por programa.</p><div class="coming-grid" style="max-width:600px"><div class="coming-card"><h4>Con AoL funcionando</h4><p>MBA \u00b7 Mag. Direcci\u00f3n de Personas</p></div><div class="coming-card"><h4>Planificados sin plan AAE</h4><p>Tributaci\u00f3n \u00b7 Finanzas \u00b7 MMIM \u00b7 Tech MBA \u00b7 MECD</p></div></div></div></div>';
  app.insertBefore(t8,footer);

  var t9=document.createElement('div');
  t9.className='panel';t9.id='tab9';
  t9.innerHTML='<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:8px"><div><span style="font-size:18px;font-weight:600">Progresi\u00f3n estudiantil</span><br><span style="font-size:14px;color:var(--tx2)">Asignaturas cr\u00edticas \u00b7 Alertas \u00b7 Retenci\u00f3n por carrera</span></div>'+pesoBadgeHTML('prog')+'</div><div class="coming"><h3>Progresi\u00f3n estudiantil \u2014 en construcci\u00f3n</h3><p>Seguimiento de asignaturas cr\u00edticas, alertas de retenci\u00f3n, indicadores por carrera.</p><div class="coming-grid" style="max-width:500px"><div class="coming-card"><h4>Personas clave</h4><p>Fernando Rojas \u00b7 Juan D\u00edaz</p></div><div class="coming-card"><h4>Objetivo</h4><p>Alertas y seguimiento de progresi\u00f3n</p></div></div></div>';
  app.insertBefore(t9,footer);

  var t10=document.createElement('div');
  t10.className='panel';t10.id='tab10';
  t10.innerHTML='<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:8px"><div><span style="font-size:18px;font-weight:600">Acreditaciones</span><br><span style="font-size:14px;color:var(--tx2)">Procesos de acreditaci\u00f3n donde participa el DAC</span></div>'+pesoBadgeHTML('accred')+'</div><div class="sub-tabs"><button class="sub-tab on" onclick="setAccredView(\'inst\',this)">Institucionales</button><button class="sub-tab" onclick="setAccredView(\'fen\',this)">FEN</button></div><div id="accredInst"><div class="coming"><h3>Acreditaciones institucionales</h3><p>Procesos donde la UNAB se acredita como instituci\u00f3n.</p><div class="coming-grid" style="max-width:500px"><div class="coming-card"><h4>MSCHE</h4><p>Co-chair steering committee.<br>Borrador jun 2026 \u00b7 Draft dic 2026.</p></div><div class="coming-card"><h4>CNA</h4><p>Muestra intencionada \u00b7 Formularios 70% jul \u00b7 90% oct.<br>156 informes meta.</p></div></div></div></div><div id="accredFen" style="display:none"><div class="coming"><h3>Acreditaciones FEN</h3><p>Acreditaciones de programas espec\u00edficos de la facultad.</p><div class="coming-grid" style="max-width:500px"><div class="coming-card"><h4>CNA postgrados</h4><p>Por planificar</p></div><div class="coming-card"><h4>AMBA y otras</h4><p>Futuras</p></div></div></div></div>';
  app.insertBefore(t10,footer);

  var t7=document.getElementById('tab7');
  if(t7)t7.remove();
}

function addPesoToAACSB(){
  var hdr=document.querySelector('#tab4 > div:first-child');
  if(!hdr||hdr.querySelector('.peso-badge'))return;
  var d=document.createElement('div');
  d.innerHTML=pesoBadgeHTML('aacsb');
  hdr.appendChild(d.firstChild);
}

function buildNav2(){
  var oldNav=document.getElementById('mainNav');
  if(!oldNav)return;
  var nav=document.createElement('nav');
  nav.id='mainNav2';
  NAV.forEach(function(item,ni){
    var btn=document.createElement('button');
    btn.textContent=item.label;
    btn.onclick=function(){activateNav(ni)};
    nav.appendChild(btn);
  });
  oldNav.parentNode.replaceChild(nav,oldNav);
}

function createSubBars(){
  var nav=document.getElementById('mainNav2');
  if(!nav)return;
  var bar=document.createElement('div');
  bar.id='v2SubBar';
  bar.className='sub-tabs';
  nav.parentNode.insertBefore(bar,nav.nextSibling);
  var bar2=document.createElement('div');
  bar2.id='v2SubSubBar';
  bar2.className='sub-tabs';
  bar.parentNode.insertBefore(bar2,bar.nextSibling);
}

function activateNav(ni,subIdx,subSubIdx){
  var item=NAV[ni];
  if(subIdx===undefined)subIdx=0;
  if(subSubIdx===undefined)subSubIdx=0;

  document.querySelectorAll('#mainNav2 button').forEach(function(b,i){b.classList.toggle('on',i===ni)});

  var subBar=document.getElementById('v2SubBar');
  var subSubBar=document.getElementById('v2SubSubBar');

  if(item.subPanels&&item.subPanels.length>1){
    var h='';
    item.subPanels.forEach(function(sp,si){
      h+='<button class="sub-tab'+(si===subIdx?' on':'')+'" onclick="window._v2sub('+ni+','+si+')">'+sp.label+'</button>';
    });
    subBar.innerHTML=h;
    subBar.style.display='flex';
  }else{
    subBar.style.display='none';
  }

  var targetPanel;
  if(item.subPanels){
    var sp=item.subPanels[subIdx]||item.subPanels[0];
    if(sp.subSubs){
      var ssh='';
      sp.subSubs.forEach(function(ss,ssi){
        ssh+='<button class="sub-tab'+(ssi===subSubIdx?' on':'')+'" onclick="window._v2subsub('+ni+','+subIdx+','+ssi+')">'+ss.label+'</button>';
      });
      subSubBar.innerHTML=ssh;
      subSubBar.style.display='flex';
      targetPanel=(sp.subSubs[subSubIdx]||sp.subSubs[0]).idx;
    }else{
      subSubBar.style.display='none';
      targetPanel=sp.idx;
    }
  }else{
    subBar.style.display='none';
    subSubBar.style.display='none';
    targetPanel=item.idx;
  }

  ALL_PANELS.forEach(function(p){
    var el=document.getElementById('tab'+p);
    if(el)el.classList.toggle('on',p===targetPanel);
  });
}

window._v2sub=function(ni,si){activateNav(ni,si)};
window._v2subsub=function(ni,si,ssi){activateNav(ni,si,ssi)};

window.showTab=function(n){
  var ni=PANEL_TO_NAV[n];
  if(ni===undefined)ni=0;
  var item=NAV[ni];
  var subIdx=0,subSubIdx=0;
  if(item.subPanels){
    item.subPanels.forEach(function(sp,si){
      if(sp.idx===n)subIdx=si;
      if(sp.subSubs)sp.subSubs.forEach(function(ss,ssi){
        if(ss.idx===n){subIdx=si;subSubIdx=ssi}
      });
    });
  }
  activateNav(ni,subIdx,subSubIdx);
};

window.setAssessView=function(v,btn){
  document.querySelectorAll('#tab8 .sub-tab').forEach(function(b){b.classList.remove('on')});
  btn.classList.add('on');
  document.getElementById('assessPre').style.display=v==='pre'?'block':'none';
  document.getElementById('assessPost').style.display=v==='post'?'block':'none';
};

window.setAccredView=function(v,btn){
  document.querySelectorAll('#tab10 .sub-tab').forEach(function(b){b.classList.remove('on')});
  btn.classList.add('on');
  document.getElementById('accredInst').style.display=v==='inst'?'block':'none';
  document.getElementById('accredFen').style.display=v==='fen'?'block':'none';
};

function updateChrome(){
  var hp=document.querySelector('header p');
  if(hp)hp.textContent='Direcci\u00f3n Acad\u00e9mica de Aseguramiento de la Calidad \u00b7 v2.0 \u00b7 abril 2026';
  var ft=document.querySelector('footer');
  if(ft)ft.textContent='Dashboard DAC \u00b7 FEN UNAB \u00b7 v2.0 abril 2026 \u00b7 Fuentes: Pol\u00edtica SAIC, P07, Rol DAC VRAC, Manual FEN, Jornada VRAC, Estrategia FEN, Cal. AAE, Actas CE/CF, iSER';
}

window.exportState=function(){
  var b={version:'2.0',date:new Date().toISOString(),tasks:state,strat:stratState,cycle:cycleNotes,aacsb:aaState,pesos:pesos};
  if(typeof dacNotes!=='undefined')b.dacNotes=dacNotes;
  var a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([JSON.stringify(b,null,2)],{type:'application/json'}));
  a.download='dac_state_'+new Date().toISOString().slice(0,10)+'.json';
  a.click();
};

createPanels();
addPesoToAACSB();
buildNav2();
createSubBars();
updateChrome();
activateNav(0);

})();
