/* dac-patch.js — v1.1: Descriptions + tags + notes for DAC tasks */
(function(){

/* ===== 1. DESCRIPTIONS FOR ALL 62 TASKS ===== */
var DESCS=[
/*0*/ 'Documento que describe c\u00f3mo opera el SAIC en la FEN: procesos, responsables, indicadores, mecanismos de mejora. VRAC pide actualizarlo con el nuevo mapa de 36 procesos.',
/*1*/ 'Incluir una secci\u00f3n expl\u00edcita de SAIC en las actas del Consejo de Facultad: indicadores revisados, brechas identificadas, decisiones de mejora. Hoy las actas son buenas pero no mencionan SAIC.',
/*2*/ 'Organizar una carpeta estructurada en Teams/OneDrive con las evidencias del SAIC: pol\u00edtica, manual, actas, planes de mejora, informes AAE, reportes. Debe ser accesible para auditor\u00edas.',
/*3*/ 'Plan para difundir la Pol\u00edtica de Calidad UNAB dentro de la FEN: profesores, funcionarios, estudiantes. La pol\u00edtica existe pero no se comunica activamente.',
/*4*/ 'Sesi\u00f3n de inducci\u00f3n al SAIC para los acad\u00e9micos reci\u00e9n contratados (12 nuevos PhD en 2026). Incluye: qu\u00e9 es el SAIC, c\u00f3mo funciona el AAE, qu\u00e9 se espera de ellos.',
/*5*/ 'Presentar al Consejo de Facultad los resultados del SAIC: indicadores de calidad, resultados de assessment, avance en planes de mejora. Peri\u00f3dico (al menos semestral).',
/*6*/ 'Informe anual que resume la gesti\u00f3n del SAIC en la FEN: actividades realizadas, indicadores, logros, brechas, plan para el a\u00f1o siguiente. El DAC saliente hizo el de 2025.',
/*7*/ 'Evento anual de la FEN dedicado a calidad: presentaci\u00f3n de resultados, buenas pr\u00e1cticas, reflexi\u00f3n sobre mejora continua. El DAC saliente organiz\u00f3 la de diciembre 2025.',
/*8*/ 'Reuniones trimestrales con el Encargado SAIC institucional (VRAC) para coordinar: avance del SAIC en FEN, nuevos procedimientos, calendario, apoyo requerido.',
/*9*/ 'Lista de verificaci\u00f3n por carrera que mide el cumplimiento de los procesos SAIC: \u00bftiene plan AAE?, \u00bfcarg\u00f3 evidencias?, \u00bfsocializ\u00f3 resultados?, \u00bftiene plan de mejora actualizado?',
/*10*/'Dashboard con KPIs para Decano y Consejo de Facultad: indicadores de calidad (retenci\u00f3n, titulaci\u00f3n, satisfacci\u00f3n/NPS, eval docente), avance AACSB, estado assessment. Este dashboard es un avance parcial.',
/*11*/'Verificar que los programas online cumplen los est\u00e1ndares Quality Matters (QM). Meta VRAC: 30 cursos certificados. Meta interna FEN: 60.',
/*12*/'Informe mensual de actividades del DAC para VRAC: qu\u00e9 se hizo, qu\u00e9 est\u00e1 pendiente, d\u00f3nde se necesita apoyo. Formato a\u00fan por definir desde VRAC.',
/*13*/'Revisar peri\u00f3dicamente los indicadores de las Matrices de Calidad SAIC: ratio alumno/docente, % profesores no AACSB, productividad acad\u00e9mica, retenci\u00f3n, NPS, eval docente.',
/*14*/'Autoevaluaciones peri\u00f3dicas de carreras y programas como mecanismo SAIC. MBA y Mag. Gesti\u00f3n Personas ya lo hicieron. Falta extender a pregrado.',
/*15*/'Participar en las auditor\u00edas internas del SAIC que organiza la Dir. de Procesos VRAC. Incluye auditor\u00edas acad\u00e9micas y de procesos.',
/*16*/'Planes de acci\u00f3n basados en datos de experiencia estudiantil: encuestas de satisfacci\u00f3n, NPS, tasas de retenci\u00f3n, reclamos. Vinculados a indicadores de Matrices de Calidad.',
/*17*/'Planes de mejora derivados de autoevaluaciones, auditor\u00edas y an\u00e1lisis de resultados. Nueva plataforma VRAC en implementaci\u00f3n. Heredar lo hecho en Jornada 2025.',
/*18*/'Gestionar hallazgos: cuando se detecta una brecha o problema de calidad, documentarlo, asignar responsable, definir acci\u00f3n correctiva y hacer seguimiento hasta el cierre.',
/*19*/'Monitorear el avance del Plan de Desarrollo Estrat\u00e9gico 2026\u20132028 del Decano: KPIs, hitos, sub-comit\u00e9s. Conectar con Power BI + Planner.',
/*20*/'Seguimiento de los Planes de Relacionamiento con egresados y empleadores de cada carrera. Incluye: actividades realizadas, resultados, retroalimentaci\u00f3n curricular derivada.',
/*21*/'Acompa\u00f1ar los procesos de innovaci\u00f3n curricular en curso: CA (80% avance), IAE (en curso), Turismo (por iniciar). Asegurar que incorporen resultados de assessment.',
/*22*/'Monitorear la implementaci\u00f3n de las nuevas matrices de calidad SAIC (36 procesos en actualizaci\u00f3n por VRAC). Verificar que la FEN cumple los nuevos procedimientos.',
/*23*/'Seguimiento de las autoevaluaciones institucionales en curso: CNA (nueva normativa) y MSCHE. El DAC participa proporcionando datos y evidencias de la FEN.',
/*24*/'Seguimiento quincenal de las 24 iniciativas estrat\u00e9gicas FEN registradas en Planner Teams. Reportar avance al Decano.',
/*25*/'Proponer la creaci\u00f3n de sub-comit\u00e9s tem\u00e1ticos para el seguimiento del PDE: docencia, investigaci\u00f3n, VcM, gesti\u00f3n. Comprometido en acta CF 04-03.',
/*26*/'Elaborar y entregar los Planes de Assessment del Aprendizaje Estudiantil (AAE) trianual para cada carrera. Ya entregados todos incluyendo Turismo (ciclo 2025\u20132027).',
/*27*/'Verificar que los Directores de Carrera est\u00e9n implementando los planes AAE: aplicando r\u00fabricas, recolectando datos, cumpliendo plazos del calendario institucional.',
/*28*/'Producir 2 informes de monitoreo por facultad por periodo acad\u00e9mico para VRAC: estado de implementaci\u00f3n del AAE, resultados preliminares, alertas.',
/*29*/'Trabajar con cada Director de Carrera en las matrices de resultados: datos Power BI, an\u00e1lisis por RA, identificaci\u00f3n de brechas, propuestas de acci\u00f3n.',
/*30*/'Subir al Gestor Documental SAIC (plataforma VRAC) las evidencias del ciclo AAE: planes, matrices, informes, actas de socializaci\u00f3n.',
/*31*/'Evaluar la calidad del ciclo AAE con el Comit\u00e9 de AAE (VRAC): \u00bfse cumpli\u00f3 el plan?, \u00bflos an\u00e1lisis son suficientes?, \u00bflas acciones son pertinentes? [VERIFICAR: identificar composici\u00f3n del Comit\u00e9].',
/*32*/'Identificar qu\u00e9 carreras necesitan apoyo externo para mejorar su ciclo AAE: capacitaci\u00f3n en r\u00fabricas, an\u00e1lisis estad\u00edstico, dise\u00f1o de instrumentos.',
/*33*/'Presentar resultados de assessment en Consejos de Carrera/Escuela con participaci\u00f3n de directivos, docentes y estudiantes. Solo Turismo lo ha hecho hasta ahora.',
/*34*/'Supervisar que los programas de postgrado implementen assessment: MBA y Mag. Dir. Personas funcionando; Tributaci\u00f3n, Finanzas, MMIM, TechMBA incorporados 2025; MECD pendiente 2026.',
/*35*/'Revisar las matrices de tributaci\u00f3n en la plataforma uAssessment. Meta S2: 100% de carreras con matrices actualizadas en la plataforma.',
/*36*/'Coordinar la producci\u00f3n de documentos para acreditaciones externas: iSER (AACSB), informes CNA, self-study MSCHE. Asegurar consistencia entre fuentes.',
/*37*/'Mantener un repositorio ordenado de evidencias para las tres acreditaciones: Teams/SharePoint con estructura clara por est\u00e1ndar/criterio.',
/*38*/'Preparaci\u00f3n del Initial Self-Evaluation Report (iSER) para AACSB. Trabajo interno como si la fecha fuera mayo 2026. Cap\u00edtulos 0\u20139 en redacci\u00f3n.',
/*39*/'Construir y mantener las tablas de suficiencia (SCH) y cualificaci\u00f3n (PTDM) del profesorado seg\u00fan formato AACSB Standard 3.',
/*40*/'Seguimiento de la relaci\u00f3n con las mentoras AACSB: preparar reuniones, documentar feedback, dar seguimiento a compromisos adquiridos.',
/*41*/'Dise\u00f1ar los Lineamientos de Suficiencia y Cualificaci\u00f3n del profesorado FEN: criterios SA/PA/SP/IP, pol\u00edtica anti-predatorias, ventanas de vigencia. Ya elaborados, pendiente aprobaci\u00f3n CF.',
/*42*/'Participaci\u00f3n en la Conferencia Anual AACSB en Seattle. Delegaci\u00f3n: Decano + Dir. Depto + DAC.',
/*43*/'Elaborar propuesta para una visita de experto AACSB durante 2026: alcance, agenda, objetivos, preparaci\u00f3n requerida.',
/*44*/'Preparar informes para la nueva normativa CNA de acreditaci\u00f3n de carreras. Planificaci\u00f3n ya entregada.',
/*45*/'Crear y mantener un mapa visual de todas las acreditaciones de la FEN: AACSB (en proceso), CNA (carreras), MSCHE (institucional). Fechas, plazos, responsables.',
/*46*/'Revisar los informes de la muestra intencionada CNA que VRAC env\u00eda. Meta octubre: 156 informes con 90% de calidad. DAC monitorea y retroalimenta.',
/*47*/'Liderar como co-chair el steering committee de la acreditaci\u00f3n MSCHE de la FEN. Coordinar equipos, plazos y producci\u00f3n de documentos.',
/*48*/'Dise\u00f1ar un plan de carrera acad\u00e9mica alineado con AACSB: rutas de desarrollo, criterios de promoci\u00f3n, v\u00ednculos con clasificaci\u00f3n AACSB. Lineamientos hechos, implementa Dir. Depto.',
/*49*/'Monitorear que los programas de postgrado cumplan con est\u00e1ndares de calidad internos: auditor\u00edas de procesos acad\u00e9micos, syllabus, evaluaciones.',
/*50*/'Reuniones trimestrales con el Encargado SAIC institucional para coordinar la implementaci\u00f3n del SAIC en la FEN. Primera reuni\u00f3n programada 9 abril.',
/*51*/'Participar en reuniones con unidades centrales UNAB (Dir. Evaluaci\u00f3n Institucional, Dir. Procesos VRAC, VRA, etc.) como representante de calidad de la FEN.',
/*52*/'Asistir a los Consejos de Carrera de la FEN para dar seguimiento a temas de calidad: resultados assessment, planes de mejora, innovaci\u00f3n curricular.',
/*53*/'Incluir puntos de SAIC en la tabla del Consejo de Facultad: reportes de indicadores, avance assessment, estado acreditaciones. Actualmente asiste pero sin agenda SAIC.',
/*54*/'Llevar los temas relevantes del Comit\u00e9 de Calidad (CC) institucional al Consejo de Facultad y viceversa: nuevos procedimientos, resultados, buenas pr\u00e1cticas.',
/*55*/'Realizar presentaciones del SAIC en las distintas unidades de la FEN: escuelas, departamento, GOA. Explicar procesos, mostrar resultados, recoger feedback.',
/*56*/'Comunicar a los estudiantes c\u00f3mo funciona el SAIC y c\u00f3mo los resultados de assessment impactan la mejora de sus programas. Canal por definir.',
/*57*/'Visitar las sedes de Vi\u00f1a del Mar y Concepci\u00f3n para coordinar temas de calidad in situ: assessment, indicadores, evidencias. VRAC financia vi\u00e1ticos.',
/*58*/'Informe mensual de actividades DAC para VRAC. Mismo producto que tarea D0 #12 pero desde la perspectiva de articulaci\u00f3n. Formato por definir.',
/*59*/'Coordinar la log\u00edstica de reuniones ampliadas de la FEN: agenda, convocatoria, TEAMS, minutas. Incluye jornadas de planificaci\u00f3n y encuentros inter-sedes.',
/*60*/'Hacer seguimiento a los compromisos registrados en actas de Consejos de Escuela y Consejo de Facultad. Verificar que las acciones acordadas se ejecuten.',
/*61*/'Coordinar con la Subdirectora de Formaci\u00f3n Docente (VRA) la oferta de capacitaci\u00f3n para profesores FEN: regulares y adjuntos. Reuni\u00f3n programada 20 abril.'
];
DESCS.forEach(function(d,i){if(T[i])T[i].desc=d});

/* ===== 2. TAGS FOR SEARCH ===== */
var TAGS=[
'manual, calidad, saic, procesos, mapa',
'actas, consejo facultad, cf, saic',
'evidencias, teams, onedrive, sharepoint, documentos, repositorio',
'comunicaci\u00f3n, pol\u00edtica calidad, difusi\u00f3n',
'inducci\u00f3n, nuevos profesores, phd, contrataciones, saic',
'presentaci\u00f3n, resultados, consejo facultad, cf, indicadores',
'balance anual, informe, saic, reporte',
'jornada calidad, evento, buenas pr\u00e1cticas',
'reuni\u00f3n, encargado saic, vrac, trimestral',
'checklist, cumplimiento, carrera, verificaci\u00f3n',
'dashboard, indicadores, kpis, nps, satisfacci\u00f3n, retenci\u00f3n, eval docente, decano, power bi',
'quality matters, qm, online, programas, certificaci\u00f3n',
'informe mensual, actividades, vrac, reporte',
'indicadores, matrices calidad, kpis, ratio, productividad, nps, satisfacci\u00f3n, retenci\u00f3n, eval docente',
'autoevaluaci\u00f3n, carreras, programas, mba, postgrado',
'auditor\u00eda, interna, procesos, vrac',
'experiencia estudiantil, nps, satisfacci\u00f3n, retenci\u00f3n, encuestas, reclamos, planes',
'planes mejora, plataforma, vrac, jornada, acciones correctivas',
'hallazgos, brechas, problemas, acci\u00f3n correctiva, seguimiento',
'pde, plan desarrollo estrat\u00e9gico, kpis, power bi, planner, decano',
'vcm, relacionamiento, egresados, empleadores, planes, seguimiento, vinculaci\u00f3n',
'innovaci\u00f3n curricular, mallas, contador auditor, iae, turismo, redise\u00f1o',
'matrices calidad, saic, procesos, nuevos procedimientos',
'autoevaluaci\u00f3n institucional, cna, msche, borrador',
'iniciativas estrat\u00e9gicas, planner, teams, seguimiento quincenal',
'sub-comit\u00e9s, pde, docencia, investigaci\u00f3n, vcm, gesti\u00f3n',
'planes aae, assessment, trianual, carreras',
'monitoreo, aol, assessment, implementaci\u00f3n, directores carrera',
'informes monitoreo, vrac, assessment, periodo',
'matrices resultados, power bi, ra, brechas, directores carrera',
'gestor documental, saic, carga, evidencias, plataforma',
'comit\u00e9 aae, evaluaci\u00f3n ciclo, calidad, vrac',
'apoyo externo, capacitaci\u00f3n, r\u00fabricas, instrumentos',
'socializaci\u00f3n, resultados, assessment, consejo carrera, consejo escuela, docentes, estudiantes',
'postgrado, assessment, mba, mag, tributaci\u00f3n, finanzas, mmim, techmba, mecd',
'uassessment, matrices, tributaci\u00f3n, plataforma',
'documentaci\u00f3n, acreditaci\u00f3n, iser, cna, msche, coordinaci\u00f3n',
'repositorio, evidencias, sharepoint, est\u00e1ndares',
'iser, aacsb, self-evaluation, cap\u00edtulos',
'tablas, faculty, suficiencia, cualificaci\u00f3n, sch, ptdm, aacsb',
'mentoras, aacsb, feedback, reuniones, seguimiento',
'lineamientos, suficiencia, cualificaci\u00f3n, sa, pa, sp, ip, anti-predatorias',
'conferencia, aacsb, seattle, anual',
'visita experto, aacsb, propuesta',
'cna, nueva normativa, informes, carreras',
'mapa acreditaciones, aacsb, cna, msche, calendario',
'muestra intencionada, cna, informes, calidad',
'msche, co-chair, steering committee, acreditaci\u00f3n institucional',
'plan carrera, jerarquizaci\u00f3n, promoci\u00f3n, aacsb, clasificaci\u00f3n',
'auditor\u00eda, postgrado, syllabus, procesos',
'reuni\u00f3n, encargado saic, vrac, trimestral, coordinaci\u00f3n',
'unidades centrales, vra, vrac, evaluaci\u00f3n institucional, coordinaci\u00f3n',
'consejo carrera, calidad, assessment, mejora, participaci\u00f3n',
'consejo facultad, cf, saic, agenda, puntos calidad',
'comit\u00e9 calidad, cc, consejo facultad, canalizaci\u00f3n, procedimientos',
'socializaci\u00f3n, saic, escuelas, departamento, presentaci\u00f3n',
'estudiantes, difusi\u00f3n, saic, comunicaci\u00f3n, assessment',
'sedes, vi\u00f1a, concepci\u00f3n, visitas, coordinaci\u00f3n, vi\u00e1ticos',
'informe mensual, vrac, actividades, reporte',
'reuniones ampliadas, agenda, teams, log\u00edstica, jornadas',
'compromisos, actas, seguimiento, consejo escuela, consejo facultad',
'formaci\u00f3n docente, capacitaci\u00f3n, adjuntos, regulares, vra'
];
TAGS.forEach(function(t,i){if(T[i])T[i].tags=t});

/* ===== 3. DAC NOTES STORAGE ===== */
var dacNotes;
function loadDacNotes(){try{var s=localStorage.getItem('dac_notes_v11');if(s)return JSON.parse(s)}catch(e){}return{}}
function saveDacNotes(){localStorage.setItem('dac_notes_v11',JSON.stringify(dacNotes))}
dacNotes=loadDacNotes();

window.addDacNote=function(i){
var inp=document.getElementById('dn_'+i);
if(!inp)return;
var t=inp.value.trim();
if(!t)return;
if(!dacNotes[i])dacNotes[i]=[];
dacNotes[i].push({date:new Date().toLocaleDateString('es-CL'),text:t});
saveDacNotes();
inp.value='';
document.querySelectorAll('[id="dnl_'+i+'"]').forEach(function(el){el.innerHTML=renderDacNotes(i)});
};

function renderDacNotes(i){
var n=dacNotes[i];
if(!n||!n.length)return'<div style="color:var(--tx3);font-style:italic;padding:3px 0;font-size:11px">Sin notas</div>';
return n.slice().reverse().map(function(x){
return'<div style="padding:3px 0;border-bottom:1px dashed var(--bd);line-height:1.4;font-size:11px"><b>'+x.date+'</b> \u2014 '+x.text+'</div>';
}).join('');
}

/* Include notes in export/import */
var _origExport=window.exportState;
window.exportState=function(){
var b={version:'1.1',date:new Date().toISOString(),tasks:state,strat:stratState,cycle:cycleNotes,aacsb:aaState,dacNotes:dacNotes};
var a=document.createElement('a');
a.href=URL.createObjectURL(new Blob([JSON.stringify(b,null,2)],{type:'application/json'}));
a.download='dac_state_'+new Date().toISOString().slice(0,10)+'.json';
a.click();
};
var _origImport=window.importState;
window.importState=function(e){
var f=e.target.files[0];if(!f)return;
var r=new FileReader();
r.onload=function(ev){
try{
var d=JSON.parse(ev.target.result);
if(d.tasks)state=d.tasks;
if(d.strat)stratState=d.strat;
if(d.cycle)cycleNotes=d.cycle;
if(d.aacsb)aaState=d.aacsb;
if(d.dacNotes){dacNotes=d.dacNotes;saveDacNotes()}
saveState();saveStratState();saveCycleNotes();saveAAState();
buildCurrent();buildStrat();buildAA();
alert('Estado importado.');
}catch(err){alert('Error: '+err.message)}
};
r.readAsText(f);e.target.value='';
};

/* ===== 4. PATCH buildDimHTML TO SHOW DESCRIPTIONS + NOTES ===== */
window.buildDimHTML=function(gs,editable,pfx){
var stats=dimStats(gs);var h='';
for(var d=0;d<5;d++){
var items=[];T.forEach(function(t,i){if(t.d===d)items.push({t:t,i:i})});
var pct=stats[d].total?Math.round(stats[d].done/stats[d].total*100):0;
var bbg=pct>=60?'var(--done)':pct>=20?'var(--partial)':'var(--none)';
var btx=pct>=60?'var(--donet)':pct>=20?'var(--partialt)':'var(--nonet)';
h+='<div class="dim'+(d<2?' open':'')+'" id="'+pfx+d+'"><div class="dim-h" onclick="this.parentElement.classList.toggle(\'open\')"><div class="dim-dot" style="background:'+DC[d]+'"></div><div class="dim-name">'+DN[d]+'</div><div class="dim-badge" style="background:'+bbg+';color:'+btx+'">'+stats[d].done+'/'+stats[d].total+'</div><span class="dim-arrow">&#9654;</span></div><div class="dim-body"><div class="dim-progress"><div class="dim-progress-fill" style="width:'+pct+'%;background:'+DC[d]+'"></div></div>';
items.forEach(function(it){
var st=gs(it.t,it.i);var sc=stColor(st);
var sb='';if(it.t.s==='vrac')sb='<span class="task-badge badge-vrac">VRAC</span>';
else if(it.t.s==='ppt')sb='<span class="task-badge badge-ppt">PPT</span>';
else if(it.t.s==='acta')sb='<span class="task-badge badge-acta">Acta</span>';
h+='<div class="task" id="'+pfx+'t'+it.i+'"><div class="task-main" onclick="this.parentElement.classList.toggle(\'expanded\')"><div><div class="task-name">'+it.t.n+sb+'</div>';
if(it.t.nt)h+='<div class="task-note">'+it.t.nt+'</div>';
h+='</div><div>';
if(editable)h+='<select class="st-select" onclick="event.stopPropagation()" onchange="upSt('+it.i+',this.value)">'+SOPTS.map(function(o){return'<option'+(o===st?' selected':'')+'>'+o+'</option>'}).join('')+'</select>';
else h+='<span class="st-label" style="background:'+sc[0]+';color:'+sc[1]+'">'+st+'</span>';
h+='</div></div><div class="task-detail" onclick="event.stopPropagation()">';
/* Description */
if(it.t.desc)h+='<div style="color:var(--tx2);margin-bottom:8px;padding-bottom:8px;border-bottom:1px solid var(--bd);line-height:1.6">'+it.t.desc+'</div>';
/* Metadata */
h+='<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:8px;font-size:11px">';
h+='<div><b style="color:var(--tx2)">Dimensi\u00f3n:</b> '+DN[it.t.d]+'</div>';
h+='<div><b style="color:var(--tx2)">Rol:</b> '+(it.t.role==='g'?'Gestionas directamente':'Monitoreas')+'</div>';
if(it.t.dep)h+='<div><b style="color:var(--tx2)">Dependencia:</b> '+it.t.dep+'</div>';
if(it.t.s)h+='<div><b style="color:var(--tx2)">Fuente:</b> '+(it.t.s==='vrac'?'Jornada VRAC':it.t.s==='ppt'?'Estrategia FEN':'Actas CE/CF')+'</div>';
h+='<div><b style="color:var(--tx2)">L\u00ednea base:</b> '+it.t.b+'</div>';
h+='</div>';
/* Notes section (only in editable/current view) */
if(editable){
h+='<div style="margin-top:8px;padding-top:8px;border-top:1px solid var(--bd)">';
h+='<div style="font-size:12px;font-weight:600;color:var(--tx2);margin-bottom:4px">Bit\u00e1cora:</div>';
h+='<textarea class="aa-note-input" style="font-size:12px" id="dn_'+it.i+'" placeholder="Agregar nota..."></textarea>';
h+='<button class="aa-note-save" style="font-size:11px" onclick="addDacNote('+it.i+')">Guardar nota</button>';
h+='<div id="dnl_'+it.i+'">'+renderDacNotes(it.i)+'</div>';
h+='</div>';
}
h+='</div></div>';
});
h+='</div></div>'}return h};

/* ===== 5. REBUILD VIEWS ===== */
if(typeof buildBaseline==='function')buildBaseline();
if(typeof buildCurrent==='function')buildCurrent();

})();
