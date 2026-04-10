/* ciclo-v2.js — Adds descriptions and cross-references to Ciclo 2026 tasks */
(function(){
/* Descriptions for cycle tasks (keyed by task text) */
var HDESC={
"IV Encuentro AAE":"Encuentro institucional de Assessment del Aprendizaje. La FEN presenta buenas pr\u00e1cticas (ETH nivel 3). Participan representantes de las 3 sedes (+280 asistentes en ene 2026).",
"An\u00e1lisis resultados S2/T3 2025":"Revisar resultados de assessment del segundo semestre / tercer trimestre 2025 para identificar brechas y planificar acciones correctivas del ciclo siguiente.",
"Consolidar indicadores 2025":"Consolidar todos los indicadores de calidad del a\u00f1o 2025: retenci\u00f3n, aprobaci\u00f3n, titulaci\u00f3n, eval docente, productividad acad\u00e9mica. Insumo para Balance SAIC.",
"Plan semestral DAC S1":"Elaborar y presentar al Decano el plan de trabajo del DAC para S1 2026: prioridades por dimensi\u00f3n, hitos mensuales, entregables comprometidos y recursos necesarios.",
"Tablas AACSB cierre 2025":"Actualizar tablas 3-1 (Faculty Sufficiency & Qualifications) y 8-1 (Intellectual Contributions) con datos de cierre 2025. Insumo para iSER.",
"Inducci\u00f3n SAIC S1":"Sesi\u00f3n de inducci\u00f3n al SAIC para profesores nuevos del primer semestre. 12 nuevos PhD contratados en 2026. Incluye presentaci\u00f3n del curso SAIC online.",
"Verificar QM online":"Verificar cumplimiento Quality Matters en programas online. Meta VRAC: 30 cursos certificados QM. Meta interna FEN: 60.",
"Rezagados S2/T3":"Seguimiento a carreras con resultados de assessment rezagados del semestre anterior. Asegurar que entreguen matrices y an\u00e1lisis pendientes.",
"CNA Piloto":"Fase piloto de la nueva normativa CNA. Preparar documentaci\u00f3n seg\u00fan nuevos est\u00e1ndares para carreras seleccionadas.",
"Evidencias AAE":"Recopilar y organizar evidencias del ciclo de assessment: r\u00fabricas aplicadas, matrices de resultados, actas de an\u00e1lisis en Consejos de Carrera.",
"Ajuste Plan AAE":"Revisar y ajustar los planes de assessment trianual (2025-2027) incorporando aprendizajes del ciclo anterior y brechas identificadas.",
"Reuni\u00f3n SAIC Q1":"Primera reuni\u00f3n trimestral con el Encargado SAIC institucional. Revisar cumplimiento de procesos, indicadores y pr\u00f3ximos hitos.",
"Verificar Planes AAE":"Verificar que todas las carreras tengan planes de assessment vigentes y actualizados para el ciclo en curso.",
"Informe mensual DAC":"Informe mensual de actividades del DAC para la VRAC. Formato definido por VRAC desde abril 2026. Incluye avances por dimensi\u00f3n.",
"Carga Gestor SAIC":"Subir al Gestor Documental SAIC las evidencias del ciclo AAE: r\u00fabricas, matrices, actas de an\u00e1lisis. Hito cr\u00edtico: 15 de abril.",
"Eval ciclo AAE":"Evaluaci\u00f3n de la calidad del ciclo de assessment con r\u00fabrica institucional (escala 1-3). Meta: todas las carreras FEN en nivel 2 o 3.",
"Resultados verano":"An\u00e1lisis de resultados de assessment de cursos de verano (intensivos). Incluir en el informe semestral.",
"Matrices uAssessment":"Revisar matrices de tributaci\u00f3n en la plataforma uAssessment. Meta S2: 100% de carreras con matrices cargadas.",
"CNA Fase 1":"Primera fase de preparaci\u00f3n para acreditaci\u00f3n CNA bajo nueva normativa. Levantamiento de informaci\u00f3n y autodiagn\u00f3stico.",
"Planes mejora":"Elaborar planes de mejora a partir de hallazgos del ciclo anterior. Cargar en nueva plataforma VRAC.",
"Procedimientos SAIC":"Revisi\u00f3n de los 36 nuevos procedimientos SAIC actualizados por VRAC. Verificar implementaci\u00f3n en FEN.",
"CF: indicadores":"Presentar indicadores clave al Consejo de Facultad. Incluir secci\u00f3n SAIC con m\u00e9tricas de calidad y avance de planes.",
"Muestra CNA":"Preparar muestra intencionada para CNA. Meta: 156 informes con 90% de cumplimiento a octubre.",
"Balance SAIC":"Elaborar Balance Anual del SAIC de la FEN. Documenta logros, brechas e indicadores del a\u00f1o.",
"PDE FEN":"Seguimiento del Plan de Desarrollo Estrat\u00e9gico FEN 2026-2028. Revisar KPIs en Power BI + Planner.",
"Validar asignaturas AAE":"Validar que las asignaturas integradoras definidas en los planes AAE se est\u00e9n implementando correctamente.",
"Socializaci\u00f3n verano":"Socializar resultados de assessment de verano con equipos directivos, docentes y estudiantes en Consejos de Carrera.",
"Informe Anual AAE":"Elaborar el Informe Anual de Assessment para la FEN. Consolida resultados de todas las carreras y programas.",
"Encuestas + eval docente":"Aplicar y analizar encuestas de satisfacci\u00f3n estudiantil y evaluaci\u00f3n docente del semestre.",
"PDE":"Seguimiento del Plan de Desarrollo Estrat\u00e9gico. Revisi\u00f3n de avance de iniciativas en Planner.",
"CNA Fase 1 docs":"Preparar documentaci\u00f3n para primera fase CNA. Recopilar evidencias seg\u00fan nuevos est\u00e1ndares.",
"Balance ante VRAC":"Presentar balance semestral del DAC ante la Vicerrector\u00eda de Aseguramiento de la Calidad.",
"Jornada Calidad":"Jornada de Calidad FEN. Evento anual de reflexi\u00f3n sobre calidad, assessment y mejora continua con toda la Facultad.",
"CNA Fase 2":"Segunda fase de preparaci\u00f3n CNA. Profundizaci\u00f3n en criterios espec\u00edficos y elaboraci\u00f3n de informes por carrera.",
"Evidencias verano":"Organizar y archivar evidencias de assessment de cursos de verano.",
"Planillas S1":"Completar planillas de reporte de assessment del primer semestre para env\u00edo a VRAC.",
"VcM S1":"Seguimiento planes de Vinculaci\u00f3n con el Medio del primer semestre. Revisar avance por programa.",
"Reuni\u00f3n SAIC Q2":"Segunda reuni\u00f3n trimestral con Encargado SAIC institucional.",
"Mentoras AACSB":"Reuni\u00f3n de seguimiento con mentoras AACSB. Revisar avance de compromisos del iSER y feedback.",
"Checklist SAIC S1":"Aplicar checklist de cumplimiento SAIC por carrera al cierre del primer semestre.",
"Tablas AACSB S1":"Actualizar tablas AACSB (3-1, 8-1) con datos del primer semestre 2026.",
"QM avance S1":"Revisar avance del programa Quality Matters al cierre de S1. Comparar contra meta de 30/60.",
"Carga verano Gestor":"Subir evidencias de assessment de verano al Gestor Documental SAIC.",
"Resultados AAE S1":"An\u00e1lisis de resultados de assessment del primer semestre. Identificar brechas por carrera y RA.",
"CNA 70%":"Hito: documentaci\u00f3n CNA al 70% de avance. Revisi\u00f3n de calidad con Dir. Procesos VRAC.",
"CF: Jornada":"Presentar resultados de la Jornada de Calidad al Consejo de Facultad.",
"Inducci\u00f3n S2":"Sesi\u00f3n de inducci\u00f3n SAIC para profesores nuevos del segundo semestre.",
"Plan DAC S2":"Plan de trabajo del DAC para el segundo semestre. Ajustar prioridades seg\u00fan avance de S1.",
"An\u00e1lisis AAE S1":"An\u00e1lisis profundo de resultados AAE del primer semestre con Dir. Carreras.",
"Assessment postgrado":"Revisi\u00f3n de avance del assessment en programas de postgrado. Meta: todos los programas con plan AAE a 2027.",
"Indicadores S1":"Consolidar indicadores de calidad del primer semestre: retenci\u00f3n, aprobaci\u00f3n, titulaci\u00f3n.",
"CNA formularios":"Completar formularios espec\u00edficos de la CNA para cada carrera en proceso de acreditaci\u00f3n.",
"iSER AACSB":"Revisi\u00f3n y actualizaci\u00f3n del iSER AACSB. Preparaci\u00f3n interna como si la visita fuera en mayo 2026.",
"Rezagados S1":"Seguimiento a carreras con assessment rezagado del primer semestre.",
"Evidencias S1":"Recopilar y organizar evidencias de assessment del primer semestre.",
"Plan AAE 2027":"Elaborar planes de assessment para el siguiente ciclo trianual 2027-2029.",
"Planes mejora S2":"Actualizar planes de mejora con resultados del segundo semestre.",
"Autoeval. CNA+MSCHE":"Avance de autoevaluaci\u00f3n institucional para CNA y MSCHE. Borrador hacia mediados de 2026.",
"CF: indicadores S1":"Presentar indicadores del primer semestre al Consejo de Facultad.",
"Reuni\u00f3n SAIC Q3":"Tercera reuni\u00f3n trimestral con Encargado SAIC institucional.",
"Planillas reporte":"Preparar planillas de reporte de assessment para env\u00edo a VRAC.",
"Carga Gestor S1":"Subir evidencias del primer semestre al Gestor Documental SAIC.",
"CNA 90%":"Hito: documentaci\u00f3n CNA al 90% de avance. 156 informes con meta de cumplimiento.",
"MSCHE borrador":"Borrador del documento de acreditaci\u00f3n MSCHE para la FEN.",
"Encuestas S1":"Analizar encuestas del primer semestre: satisfacci\u00f3n estudiantil y evaluaci\u00f3n docente.",
"PDE + VcM":"Seguimiento combinado PDE y VcM. Revisi\u00f3n de avance de indicadores.",
"Planillas VRAC":"Completar y enviar planillas de assessment a la VRAC seg\u00fan calendario institucional.",
"Eval Ciclo AAE":"Evaluaci\u00f3n de calidad del ciclo completo de assessment anual. R\u00fabrica institucional.",
"Brechas SAIC":"Identificar brechas de cumplimiento SAIC en la FEN. Insumo para plan de acci\u00f3n 2027.",
"Mentoras S2":"Reuni\u00f3n con mentoras AACSB del segundo semestre. Actualizar avance de compromisos.",
"CF: reporte anual":"Presentar reporte anual de calidad al Consejo de Facultad. Consolida todo el a\u00f1o.",
"Resultados AAE S2":"An\u00e1lisis de resultados de assessment del segundo semestre.",
"Checklist S2":"Aplicar checklist de cumplimiento SAIC al cierre del segundo semestre.",
"Plan DAC 2027":"Elaborar plan de trabajo del DAC para 2027. Incluye prioridades, presupuesto y cronograma.",
"Planes mejora cierre":"Cerrar planes de mejora del a\u00f1o. Documentar acciones completadas y pendientes.",
"Tablas AACSB cierre":"Actualizar tablas AACSB con datos de cierre 2026. Versi\u00f3n definitiva del a\u00f1o.",
"Reuni\u00f3n SAIC Q4":"Cuarta reuni\u00f3n trimestral con Encargado SAIC institucional. Balance anual.",
"Draft MSCHE":"Borrador del informe MSCHE para revisi\u00f3n del steering committee."
};

/* Cross-reference: cycle task text → index in T[] array (Dimensiones tasks) */
var HREF={
"Inducci\u00f3n SAIC S1":4,"Inducci\u00f3n S2":4,
"Verificar QM online":11,
"Informe mensual DAC":12,"Informe Anual AAE":12,
"Carga Gestor SAIC":30,"Carga verano Gestor":30,"Carga Gestor S1":30,
"Eval ciclo AAE":31,"Eval Ciclo AAE":31,
"Verificar Planes AAE":27,
"Balance SAIC":6,
"Jornada Calidad":7,
"Reuni\u00f3n SAIC Q1":8,"Reuni\u00f3n SAIC Q2":8,"Reuni\u00f3n SAIC Q3":8,"Reuni\u00f3n SAIC Q4":8,
"Checklist SAIC S1":9,"Checklist S2":9,
"CF: indicadores":5,"CF: indicadores S1":5,"CF: Jornada":5,"CF: reporte anual":5,
"Planes mejora":18,"Planes mejora S2":18,"Planes mejora cierre":18,
"PDE FEN":20,"PDE":20,"PDE + VcM":20,
"Mentoras AACSB":41,"Mentoras S2":41,
"Autoeval. CNA+MSCHE":24,
"Muestra CNA":47,
"Assessment postgrado":35,
"Matrices uAssessment":36,
"Procedimientos SAIC":23,
"Socializaci\u00f3n verano":34,
"Brechas SAIC":9,
"Tablas AACSB cierre 2025":39,"Tablas AACSB S1":39,"Tablas AACSB cierre":39,
"iSER AACSB":38,
"VcM S1":21,
"Resultados AAE S1":29,"Resultados AAE S2":29
};

/* Override showCD to include descriptions and cross-refs */
var origShowCD=window.showCD;
window.showCD=function(key){
var tks=HT[key];
if(!tks){document.getElementById('heatDetail').innerHTML='<p style="color:var(--tx3);font-size:13px;font-style:italic">Sin tareas.</p>';return}
var p=key.split('-');
var h='<h3 style="font-size:16px">'+MF[+p[0]]+' \u2014 '+DN[+p[1]]+'</h3>';
tks.forEach(function(tk,ti){
var src=tk.s==='aae'?'t-aae':tk.s==='cna'?'t-cna':tk.s==='new'?'t-new':'t-est';
var srcN=tk.s==='aae'?'cal. AAE':tk.s==='cna'?'cal. CNA':tk.s==='new'?'nuevo VRAC':'SAIC estimado';
var nk=key+'_'+ti;
var desc=HDESC[tk.t]||'';
var refIdx=HREF[tk.t];
h+='<div class="cycle-task" onclick="this.classList.toggle(\'expanded\')">';
h+='<div class="cycle-task-main" style="font-size:14px"><div class="cycle-task-date">'+tk.dt+'</div><div class="cycle-task-text">'+tk.t+'</div><span class="tg '+src+'">'+srcN+'</span></div>';
h+='<div class="cycle-task-panel" onclick="event.stopPropagation()">';
if(desc)h+='<div style="font-size:13px;color:var(--tx2);line-height:1.6;margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid var(--bg2)">'+desc+'</div>';
if(refIdx!==undefined&&T[refIdx]){
var task=T[refIdx];var st=state[refIdx]||task.b;var sc=stColor(st);
h+='<div style="display:flex;align-items:center;gap:6px;font-size:13px;margin-bottom:10px;padding:8px 10px;background:var(--bg2);border-radius:6px;cursor:pointer" onclick="event.stopPropagation();showTab(0);setTimeout(function(){var el=document.getElementById(\'cu'+task.d+'\');if(el){el.classList.add(\'open\');el.scrollIntoView({behavior:\'smooth\',block:\'start\'})}},100)">';
h+='<span style="color:#3C3489;font-size:14px">\u21D7</span>';
h+='<span style="color:#3C3489;font-weight:500">'+DN[task.d]+' \u2192 '+task.n+'</span>';
h+='<span style="font-size:10px;padding:2px 8px;border-radius:4px;font-weight:600;background:'+sc[0]+';color:'+sc[1]+';margin-left:auto">'+st+'</span></div>';
}
h+='<div style="font-size:13px"><b>Fuente:</b> '+srcN+'</div>';
h+='<textarea class="cycle-note-input" style="font-size:13px" id="cn_'+nk+'" placeholder="Agregar nota..."></textarea>';
h+='<button class="cycle-note-save" style="font-size:12px" onclick="addCN(\''+nk+'\')">Guardar nota</button>';
h+='<div class="cycle-note-log" id="cnl_'+nk+'">'+renderCN(nk)+'</div>';
h+='</div></div>';
});
document.getElementById('heatDetail').innerHTML=h;
};

/* Override buildCycleDetail to include descriptions and cross-refs */
var origBuildCycleDetail=window.buildCycleDetail;
window.buildCycleDetail=function(){
var cd=document.getElementById('cycleDetail');
var h='';
for(var m=0;m<12;m++){
var items=[];
for(var d=0;d<5;d++){
var tks=HT[m+'-'+d];
if(tks)tks.forEach(function(tk){items.push({d:d,dt:tk.dt,t:tk.t,s:tk.s})});
}
if(!items.length)continue;
h+='<div style="margin-bottom:1.5rem"><div style="font-size:16px;font-weight:600;padding-bottom:6px;border-bottom:1px solid var(--bd);margin-bottom:8px">'+MF[m]+' <span style="font-size:12px;color:var(--tx3);font-weight:400">('+items.length+')</span></div>';
items.forEach(function(it){
var src=it.s==='aae'?'t-aae':it.s==='cna'?'t-cna':it.s==='new'?'t-new':'t-est';
var srcN=it.s==='aae'?'cal. AAE':it.s==='cna'?'cal. CNA':it.s==='new'?'nuevo VRAC':'SAIC estimado';
var desc=HDESC[it.t]||'';
var refIdx=HREF[it.t];
h+='<div style="padding:10px 12px;margin-bottom:6px;border:1px solid var(--bg2);border-radius:8px;cursor:pointer" onclick="this.querySelector(\'.cyc-det\').style.display=this.querySelector(\'.cyc-det\').style.display===\'block\'?\'none\':\'block\'">';
h+='<div style="display:flex;gap:8px;align-items:center;font-size:14px">';
h+='<div class="dim-dot" style="background:'+DC[it.d]+';min-width:8px;height:8px"></div>';
h+='<div style="font-weight:600;color:var(--tx2);min-width:36px;font-size:12px">'+it.dt+'</div>';
h+='<div style="flex:1;font-weight:500">'+it.t+'</div>';
h+='<span class="tg '+src+'">'+srcN+'</span></div>';
if(desc||refIdx!==undefined){
h+='<div class="cyc-det" style="display:none;margin-top:8px;padding-top:8px;border-top:1px solid var(--bg2)" onclick="event.stopPropagation()">';
if(desc)h+='<div style="font-size:13px;color:var(--tx2);line-height:1.6;margin-bottom:6px">'+desc+'</div>';
if(refIdx!==undefined&&T[refIdx]){
var task=T[refIdx];var st=state[refIdx]||task.b;var sc=stColor(st);
h+='<div style="display:flex;align-items:center;gap:6px;font-size:13px;padding:6px 10px;background:var(--bg2);border-radius:6px;cursor:pointer" onclick="event.stopPropagation();showTab(0);setTimeout(function(){var el=document.getElementById(\'cu'+task.d+'\');if(el){el.classList.add(\'open\');el.scrollIntoView({behavior:\'smooth\',block:\'start\'})}},100)">';
h+='<span style="color:#3C3489;font-size:14px">\u21D7</span>';
h+='<span style="color:#3C3489;font-weight:500">'+DN[task.d]+' \u2192 '+task.n+'</span>';
h+='<span style="font-size:10px;padding:2px 8px;border-radius:4px;font-weight:600;background:'+sc[0]+';color:'+sc[1]+';margin-left:auto">'+st+'</span></div>';
}
h+='</div>';
}
h+='</div>';
});
h+='</div>';
}
cd.innerHTML=h;
};
})();
