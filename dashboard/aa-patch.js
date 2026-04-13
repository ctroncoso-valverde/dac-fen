/* aa-patch.js — v1.0: Fixes tier labels, tiers, responsables, descriptions */
(function(){
/* 1. TIER LABEL: INST → FACULTAD */
TIER_LABELS[0]='\ud83c\udfdb FACULTAD';

/* 2. Lookup helper */
function patch(id,changes){
var c=AA.find(function(a){return a.id===id});
if(!c)return;
for(var k in changes)c[k]=changes[k];
}

/* 3. TIER FIXES */
patch('T3-03',{tier:3}); // DAC, not DEPTO
patch('T3-04',{tier:3}); // DAC, not DEPTO
patch('T3-08',{tier:3}); // DAC, not DEPTO
patch('T4-08',{tier:2}); // DEPTO, not DAC

/* 4. RESPONSABLE FIXES */
patch('T1-07',{resp:'Decano'}); // was VDP/FEN (VDP doesn't exist)
patch('T1-06',{resp:'Decano'}); // was Decano / CF
patch('T1-03',{resp:'DAC'}); // was DAC / CF
patch('T1-04',{resp:'Decano'}); // was Decano / CF
patch('T2-04',{resp:'Decano'}); // was Decano / IPE
patch('T2-05',{resp:'DAC'}); // was DAC / Comunicaciones
patch('T3-09',{resp:'Dir. Depto'}); // was Dir. Escuelas / IPE

/* 5. DESCRIPTIONS — all 43 tasks */
patch('T1-06',{desc:'La misi\u00f3n actual de la FEN no menciona expl\u00edcitamente engagement, innovation ni impact. Las mentoras AACSB pidieron que se revise para que el marco interpretativo de todos los est\u00e1ndares quede claro.'});
patch('T1-01',{desc:'El modelo online usa un Profesor Responsable (dise\u00f1a contenido) y un Dinamizador (facilita tutoring). Sin validaci\u00f3n formal de que esto es flipped classroom, AACSB atribuir\u00eda los SCH al Dinamizador, destruyendo el ratio de suficiencia.'});
patch('T1-02',{desc:'De las 15 contrataciones PhD comprometidas por el Decano, 9 ya ingresaron en enero 2026. Las 6 restantes est\u00e1n en reclutamiento activo, focalizadas en Contabilidad/Finanzas y Marketing/Anal\u00edtica.'});
patch('T1-03',{desc:'Documento que define criterios SA/PA/SP/IP, pol\u00edtica anti-predatorias y ventanas de vigencia. Sin aprobaci\u00f3n formal en Consejo de Facultad, todo el sistema de clasificaci\u00f3n docente queda sin respaldo.'});
patch('T1-04',{desc:'Programa formal que establece la ruta mag\u00edster\u2192doctor para acad\u00e9micos j\u00f3venes contratados con mag\u00edster. Incluye evaluaci\u00f3n trimestral, mentor\u00eda y plazo m\u00e1ximo de 18 meses para matr\u00edcula doctoral.'});
patch('T1-05',{desc:'Ruta formativa obligatoria para dinamizadores del modelo online, en colaboraci\u00f3n con UOC. Hitos: 25% abril, 50% junio, 75% agosto, 90% octubre 2026, 100% mayo 2027.'});
patch('T1-07',{desc:'Definir una estrategia institucional para microcredenciales que gu\u00ede la oferta a distintos segmentos acad\u00e9micos y habilite flexibilidad curricular. Experiencia piloto: Summer UpSkilling FEN (verano 2025) con Coursera.'});
patch('T2-01',{desc:'Ejercicio participativo de revisi\u00f3n del Plan de Desarrollo Estrat\u00e9gico: talleres en tres sedes, consulta a empleadores y egresados, participaci\u00f3n estudiantil. Mentoras lo pidieron expl\u00edcitamente en Desaf\u00edo 1.'});
patch('T2-02',{desc:'Primera medici\u00f3n formal de los 24 KPIs del PDE usando Power BI + Planner + sub-comit\u00e9s. El iSER dice que est\u00e1 planificada para S1 2026 pero a\u00fan no se ha ejecutado.'});
patch('T2-03',{desc:'Definir qu\u00e9 regulares clasificados A entran en pipeline doctoral interno (v\u00eda DMI/Lleida) vs. qu\u00e9 vacantes se cubren con nuevos PhD externos. Se estiman ~16 acciones necesarias para llegar al 40% SA.'});
patch('T2-04',{desc:'Incorporar formalmente las 3 \u00e1reas de liderazgo intelectual (Pol\u00edticas Econ\u00f3micas, Sostenibilidad/RSE, Tecnolog\u00eda/Innovaci\u00f3n) en el ciclo de planificaci\u00f3n 2026\u20132030. Mentoras lo pidieron expl\u00edcitamente.'});
patch('T2-05',{desc:'Crear en fen.unab.cl una secci\u00f3n p\u00fablica con indicadores de progresi\u00f3n estudiantil y empleabilidad diferenciados por programa, no solo el reporte institucional genérico. Requisito expl\u00edcito del Std 6.2.'});
patch('T2-06',{desc:'Actualmente la FEN solo contribuye datos al Reporte de Vinculaci\u00f3n con el Medio institucional (UNAB). AACSB espera que la escuela pueda mostrar su impacto diferenciado con un reporte propio.'});
patch('T2-07',{desc:'Complementar el sistema institucional de VcM con una unidad propia de la FEN que coordine las actividades de vinculaci\u00f3n con especificidad en negocios (Hub, empleadores, egresados).'});
patch('T2-08',{desc:'El modelo educativo UNAB exige competencias digitales, pero la FEN necesita un plan diferenciado por modalidad: presencial tradicional, Advance (online) y semipresencial, porque cada una tiene necesidades distintas.'});
patch('T2-09',{desc:'Usar los resultados de los indicadores del PDE como insumo en la negociaci\u00f3n presupuestaria anual con la universidad, cerrando el ciclo planificaci\u00f3n\u2192recursos.'});
patch('T2-10',{desc:'Talleres para acad\u00e9micos sobre uso de bases de datos, herramientas bibliom\u00e9tricas y recursos de biblioteca. Coordinaci\u00f3n con Biblioteca UNAB (Bloomberg, Refinitiv, WoS, Scopus).'});
patch('T3-01',{desc:'Seis regulares con doctorado clasificados como A (Guzm\u00e1n, P\u00e9rez, D\u00edaz, Ram\u00edrez) o PA (Oelckers, Lima) que pueden pasar a SA con apoyo focalizado: tiempo protegido, mentor\u00eda en coautor\u00eda, financiamiento congresos.'});
patch('T3-02',{desc:'Piloto para documentar portafolios de 15\u201320 adjuntos con mayor antig\u00fcedad, evaluando si califican como IP o SP bajo los Lineamientos. Evidencia de viabilidad del plan masivo de reclasificaci\u00f3n.'});
patch('T3-03',{desc:'Incorporar el Mag\u00edster en Econom\u00eda y Ciencias de Datos (MECD) al proceso de assessment. Es el \u00faltimo programa de postgrado que falta para alcanzar cobertura 100%.'});
patch('T3-04',{desc:'Dise\u00f1ar un plan de AoL integral para todos los programas de postgrado: no solo cobertura (que ya se alcanz\u00f3 parcialmente) sino calidad del ciclo, closing the loop y medidas directas.'});
patch('T3-05',{desc:'Redise\u00f1o curricular de Contador Auditor con auditor\u00eda forense como sello diferenciador. Avance estimado ~80%. Proceso liderado por Dir. Escuela CA (R. Carvajal).'});
patch('T3-06',{desc:'Redise\u00f1o curricular de Ingenier\u00eda en Administraci\u00f3n de Empresas. Proceso en curso liderado por Dir. Escuela IAE (M. Donoso).'});
patch('T3-07',{desc:'Redise\u00f1o curricular de Ingenier\u00eda en Turismo y Hoteler\u00eda. A\u00fan no iniciado. La carrera ya tiene nivel 3 en AoL, lo que facilita identificar brechas curriculares.'});
patch('T3-08',{desc:'Transferir la metodolog\u00eda de cierre de ciclo AAE de Turismo (nivel 3 en r\u00fabrica VRAC) a IC, CA e IAE, que est\u00e1n en nivel 2. Meta: todas las carreras en nivel 3 para 2027.'});
patch('T3-09',{desc:'Incentivar que profesores adjuntos con experiencia profesional escriban casos de ense\u00f1anza basados en su pr\u00e1ctica. Estos cuentan como Contribuci\u00f3n Intelectual bajo los Lineamientos.'});
patch('T3-10',{desc:'Que cada informe de cierre de los Planes de Relacionamiento con egresados/empleadores genere un acuerdo documentado de acci\u00f3n curricular en acta de Consejo de Escuela.'});
patch('T3-11',{desc:'Solo 32,3% de los profesores Participating producen Contribuciones Intelectuales. La meta es llegar a 45\u201350% mediante apoyo a publicaci\u00f3n, casos de ense\u00f1anza y coautor\u00edas con nuevos PhDs.'});
patch('T3-12',{desc:'Crear mecanismos para que los adjuntos participen en instancias de retroalimentaci\u00f3n del PDE (hoy solo participan regulares y directivos).'});
patch('T3-13',{desc:'Estandarizar perfiles de cargo para adjuntos, implementar validaci\u00f3n sistem\u00e1tica de credenciales e integrar con la plataforma de CV Acad\u00e9mico institucional.'});
patch('T3-14',{desc:'Asegurar que las actividades puntuales de vinculaci\u00f3n con el medio (charlas, talleres, asesor\u00edas) est\u00e9n alineadas con los Planes formales de VcM de cada programa.'});
patch('T3-15',{desc:'Medir el impacto real de las actividades de VcM en los beneficiarios (outcome), no solo cu\u00e1ntas actividades se hicieron (output). Ej: cambios en pr\u00e1cticas empresariales post-capacitaci\u00f3n.'});
patch('T3-16',{desc:'Que todos los planes de estudio integren al menos 1 de las 7 estrategias de educaci\u00f3n digital definidas por el modelo educativo UNAB. Meta 2027.'});
patch('T4-01',{desc:'Cruzar resultados de assessment (AoL) con el tipo de profesor que ense\u00f1\u00f3 cada secci\u00f3n (regular vs adjunto, P vs S). Evidencia clave para demostrar que la alta proporci\u00f3n de adjuntos no compromete el aprendizaje.'});
patch('T4-02',{desc:'Las encuestas a egresados y empleadores son gen\u00e9ricas. AACSB requiere que midan competencias espec\u00edficas de cada programa (ej: capacidad anal\u00edtica en ICO, auditor\u00eda forense en CA).'});
patch('T4-03',{desc:'IC e IAE analizan resultados por \u00e1mbitos amplios. El est\u00e1ndar pide an\u00e1lisis por cada Resultado de Aprendizaje espec\u00edfico del perfil de egreso. Turismo ya lo hace (nivel 3).'});
patch('T4-04',{desc:'Poner en marcha el sistema de monitoreo del PDE: tablero Power BI con KPIs integrado en Teams, Planner con iniciativas y sub-comit\u00e9s tem\u00e1ticos con agenda regular.'});
patch('T4-05',{desc:'Crear un protocolo formal de evaluaci\u00f3n de desempe\u00f1o para profesores adjuntos (hoy solo existe para regulares). Meta: 50% de adjuntos con revisi\u00f3n anual documentada a diciembre 2026.'});
patch('T4-06',{desc:'Incluir a adjuntos en la oferta de formaci\u00f3n docente institucional (hoy casi exclusiva para regulares). Entregar n\u00f3mina con necesidades formativas a VRA. Meta: 30% inscritos a dic 2026.'});
patch('T4-07',{desc:'Que la socializaci\u00f3n de resultados de assessment llegue a docentes y estudiantes, no solo a equipos directivos. Incluir centros de alumnos en Consejos de Escuela de cierre, como hace Turismo.'});
patch('T4-08',{desc:'Crear un programa de acompa\u00f1amiento, evaluaci\u00f3n y desarrollo profesional para adjuntos comparable al Compromiso de Desempe\u00f1o que existe para regulares.'});
patch('T4-09',{desc:'Subir al Gestor Documental SAIC (plataforma VRAC) las evidencias de assessment: planes AAE, matrices de resultados, actas de socializaci\u00f3n. Hito: 15 abril 2026.'});
patch('T4-10',{desc:'Mantener actualizado el mapa que muestra c\u00f3mo los ejes del PDE UNAB se traducen en acciones FEN y se alinean con los est\u00e1ndares AACSB. Ya existe, requiere actualizaci\u00f3n peri\u00f3dica.'});

/* 6. Rebuild if already loaded */
if(typeof buildAA==='function')buildAA();
})();
