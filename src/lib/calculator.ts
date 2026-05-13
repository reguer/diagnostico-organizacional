import type { Area } from '../data/diagnostico';
import { AREAS } from '../data/diagnostico';

export interface ScoresPorArea {
  [areaId: string]: number;
}

export interface ImpactoReal {
  areaId: string;
  areaNombre: string;
  icono: string;
  color: string;
  score: number;
  titulo: string;
  descripcion: string;
  estimacion: string;
  severidad: 'critico' | 'alto' | 'medio';
}

export type TipoAccion = 'remediacion' | 'optimizacion' | 'crecimiento';

export interface AccionItem {
  areaId: string;
  areaNombre: string;
  icono: string;
  prioridad: number;
  accion: string;
  detalle: string;
  plazo: string;
  tipo: TipoAccion;
  preguntaId?: string;
  subarea?: string;
  respuestaActual?: string;
  respuestaObjetivo?: string;
  fase?: 'preparacion' | 'implementacion' | 'evaluacion';
  paralelo?: boolean;
  recurrencia?: 'semanal' | 'mensual';
}

export interface ResultadosDiagnostico {
  scoreGeneral: number;
  scoresPorArea: ScoresPorArea;
  impactosReales: ImpactoReal[];
  planAccion: AccionItem[];
  nivel: 'critico' | 'bajo' | 'medio' | 'bueno' | 'excelente';
  nivelTexto: string;
  nivelColor: string;
}

const IMPACTOS_POR_AREA: Record<string, (score: number) => { titulo: string; descripcion: string; estimacion: string }> = {
  finanzas: (score) => ({
    titulo: score < 30
      ? 'Sin costeo: estás regalando trabajo'
      : 'Margen no controlado',
    descripcion: score < 30
      ? 'Sin calcular costos reales antes de cotizar, es común perder entre un 15% y 25% del valor de cada proyecto en gastos no contemplados.'
      : 'La falta de seguimiento financiero formal genera fugas del 10–15% en margen por proyecto.',
    estimacion: score < 30
      ? '📉 Impacto estimado: hasta un 25% de tus ingresos se va en costos no cobrados'
      : '📉 Impacto estimado: 10–15% de margen perdido por falta de control',
  }),
  operaciones: (score) => ({
    titulo: score < 30
      ? 'Caos operativo: tiempo y material perdido'
      : 'Ineficiencia en campo',
    descripcion: score < 30
      ? 'Sin procesos ni control de inventario, las cuadrillas pierden entre 1.5 y 2 horas diarias buscando herramientas o esperando instrucciones.'
      : 'La falta de planificación semanal genera tiempos muertos que pueden representar el 15–20% de la jornada.',
    estimacion: score < 30
      ? '⏱️ Impacto estimado: 2 horas/día/cuadrilla = 10 horas semanales pagadas sin producir'
      : '⏱️ Impacto estimado: 15–20% de tiempo no productivo por cuadrilla',
  }),
  personas: (score) => ({
    titulo: score < 30
      ? 'Alta rotación: tu escuela de trabajo gratis para la competencia'
      : 'Equipo inestable',
    descripcion: score < 30
      ? 'Cada trabajador nuevo que se va lleva entre $800 y $2,000 en costos de reclutamiento, entrenamiento y errores en obra durante los primeros 2 meses.'
      : 'Sin métricas de productividad, es difícil retener a los mejores y detectar problemas antes de que sean costosos.',
    estimacion: score < 30
      ? '👷 Impacto estimado: $800–$2,000 por cada trabajador que sale y uno nuevo que entra'
      : '👷 Impacto estimado: 20% más de errores en obra con equipo inestable',
  }),
  mercadeo: (score) => ({
    titulo: score < 30
      ? 'Dependencia total de referidos: ingresos impredecibles'
      : 'Pipeline de ventas débil',
    descripcion: score < 30
      ? 'Sin generación activa de prospectos, tus ingresos fluctúan hasta un 40% mes a mes según temporada y suerte, sin posibilidad de planificar crecimiento.'
      : 'Sin seguimiento a cotizaciones abiertas, estás dejando ir entre el 20–30% de contratos que podrían cerrarse.',
    estimacion: score < 30
      ? '📊 Impacto estimado: 30–40% de variación en ingresos por falta de estrategia de captación'
      : '📊 Impacto estimado: 20–30% de cotizaciones no cerradas por falta de seguimiento',
  }),
  estrategia: (score) => ({
    titulo: score < 30
      ? 'Sin norte: trabajando mucho, creciendo poco'
      : 'Falta de foco estratégico',
    descripcion: score < 30
      ? 'Las empresas sin plan estratégico aceptan cualquier proyecto, incluyendo los no rentables, y gastan energía en trabajo que no construye el negocio que quieren tener.'
      : 'Sin revisión periódica de indicadores, los problemas se detectan tarde cuando ya costaron dinero.',
    estimacion: score < 30
      ? '🎯 Impacto estimado: 25–35% de esfuerzo invertido en proyectos no alineados con la rentabilidad'
      : '🎯 Impacto estimado: decisiones tardías que cuestan 2–3x más que si se detectan temprano',
  }),
};

const ACCIONES_REMEDIACION: Record<string, { accion: string; detalle: string; plazo: string }> = {
  finanzas: {
    accion: 'Crea una plantilla de costeo de proyecto esta semana',
    detalle: 'Abre una hoja de cálculo y lista: materiales, horas de cuadrilla, uso de maquinaria, transporte y un 10% de imprevistos. Úsala en tu próxima cotización.',
    plazo: 'Esta semana',
  },
  operaciones: {
    accion: 'Haz un inventario físico de herramientas y asigna responsables',
    detalle: 'Dedica 2 horas con tu encargado a listar cada herramienta, asignar responsable por cuadrilla y tomar foto del estado actual. Pega la lista en la bodega.',
    plazo: 'Esta semana',
  },
  personas: {
    accion: 'Escribe las 3 responsabilidades principales de tu encargado de cuadrilla',
    detalle: 'Media página es suficiente: qué debe hacer cada día, cómo reportar avance, qué decisiones puede tomar solo. Revísalo con él en persona.',
    plazo: 'Esta semana',
  },
  mercadeo: {
    accion: 'Toma fotos de antes/después de tu próximo proyecto terminado',
    detalle: 'Fotografía el área antes de empezar y al finalizar. Sube a tu perfil de redes con descripción del trabajo y zona. Pide al cliente una frase de recomendación.',
    plazo: 'Próximo proyecto',
  },
  estrategia: {
    accion: 'Define tus 3 metas principales para los próximos 90 días',
    detalle: 'Escribe en una hoja: una meta de ingresos, una meta operativa y una meta de equipo. Colócala donde la veas todos los días. Revísala cada semana.',
    plazo: 'Hoy',
  },
};

const ACCIONES_OPTIMIZACION: Record<string, { accion: string; detalle: string; plazo: string }> = {
  finanzas: {
    accion: 'Implementa un reporte mensual de margen por tipo de servicio',
    detalle: 'Compara el margen real de paisajismo vs. riego vs. construcción. Identifica cuál es más rentable y enfoca cotizaciones ahí.',
    plazo: 'Próximos 15 días',
  },
  operaciones: {
    accion: 'Crea un checklist de calidad para los 3 servicios principales',
    detalle: 'Define 5-8 puntos de revisión antes de considerar un proyecto terminado. Entrénalo con el encargado de obra.',
    plazo: 'Próximas 2 semanas',
  },
  personas: {
    accion: 'Establece reuniones breves de seguimiento semanal con tu equipo',
    detalle: 'Cada lunes por la mañana: 15 minutos con los encargados para revisar proyectos activos, bloqueos y necesidades de la semana.',
    plazo: 'Próxima semana',
  },
  mercadeo: {
    accion: 'Implementa un seguimiento activo de cotizaciones abiertas',
    detalle: 'Lleva una lista de todas las cotizaciones enviadas con fecha y estado. Haz seguimiento a los 3, 7 y 14 días si no hay respuesta.',
    plazo: 'Esta semana',
  },
  estrategia: {
    accion: 'Programa una revisión mensual de tus indicadores clave',
    detalle: 'El último viernes de cada mes: revisa ingresos reales vs. meta, proyectos cerrados vs. cotizados, y margen promedio. Ajusta el mes siguiente.',
    plazo: 'Fin de mes',
  },
};

const ACCIONES_CRECIMIENTO: Record<string, { accion: string; detalle: string; plazo: string }> = {
  finanzas: {
    accion: 'Evalúa financiamiento para el primer proyecto de vivienda — ya tienes la base financiera',
    detalle: 'Con tu control financiero sólido, investiga líneas de crédito empresarial o preventas para escalar a construcción residencial. Prepara un perfil crediticio este mes.',
    plazo: 'Este mes',
  },
  operaciones: {
    accion: 'Implementa un software de gestión de proyectos para escalar operaciones',
    detalle: 'Tus procesos ya están listos para escalar. Evalúa Buildertrend, Monday.com o Trello para coordinar múltiples proyectos y cuadrillas simultáneamente.',
    plazo: 'Este mes',
  },
  personas: {
    accion: 'Diseña un programa de incentivos por desempeño para retener a los mejores',
    detalle: 'Con tu equipo estable, crea un sistema de bonos por calidad y cumplimiento. Esto convierte a empleados buenos en socios del crecimiento.',
    plazo: 'Próximas 4 semanas',
  },
  mercadeo: {
    accion: 'Lanza una campaña diferenciada dirigida a construcción comercial',
    detalle: 'Tu marca ya tiene credibilidad. Crea un portafolio digital de tus mejores proyectos y lanza Google Ads o Meta Ads segmentados por zona y tipo de cliente.',
    plazo: 'Próximas 2 semanas',
  },
  estrategia: {
    accion: 'Formaliza un plan de crecimiento a 3 años con nuevos servicios o mercados',
    detalle: 'Con bases sólidas, define qué nuevo mercado o servicio atacarás: ¿proyectos ejecutivos?, ¿expansión a otra ciudad?, ¿alianza con arquitectos? Ponlo por escrito.',
    plazo: 'Próximo mes',
  },
};

function getTipoAccion(score: number): TipoAccion {
  if (score < 50) return 'remediacion';
  if (score < 80) return 'optimizacion';
  return 'crecimiento';
}

function getTipoAccionPorRespuesta(valor: number): TipoAccion {
  if (valor <= 2) return 'remediacion';
  if (valor === 3) return 'optimizacion';
  return 'crecimiento';
}

function getFasePorRespuesta(valor: number): AccionItem['fase'] {
  if (valor <= 1) return 'preparacion';
  if (valor === 2) return 'implementacion';
  return 'evaluacion';
}

function getPlazoPorPregunta(pregunta: Area['preguntas'][number], valor: number) {
  const texto = `${pregunta.texto} ${pregunta.descripcion ?? ''}`.toLowerCase();
  if (texto.includes('legal') || texto.includes('permiso') || texto.includes('licencia') || texto.includes('financiamiento')) {
    return valor <= 2 ? '4-8 semanas' : '2-4 semanas';
  }
  if (texto.includes('plan') || texto.includes('proceso') || texto.includes('dashboard') || texto.includes('indicador')) {
    return valor <= 2 ? '2-3 semanas' : '1-2 semanas';
  }
  if (texto.includes('reunión') || texto.includes('semanal')) return 'Recurrente semanal';
  if (texto.includes('mensual') || texto.includes('mes')) return valor <= 2 ? 'Este mes' : 'Próxima revisión';
  return valor <= 2 ? '1-2 semanas' : '1 semana';
}

function getRecurrencia(pregunta: Area['preguntas'][number]) {
  const texto = `${pregunta.texto} ${pregunta.descripcion ?? ''}`.toLowerCase();
  if (texto.includes('semanal') || texto.includes('cada semana') || texto.includes('reunión semanal')) return 'semanal' as const;
  if (texto.includes('mensual') || texto.includes('cada mes')) return 'mensual' as const;
  return undefined;
}

function buildAccionDesdePregunta(area: Area, pregunta: Area['preguntas'][number], valor: number, prioridad: number): AccionItem {
  const opcionActual = pregunta.opciones.find((opcion) => opcion.valor === valor);
  const opcionObjetivo = pregunta.opciones[pregunta.opciones.length - 1];
  const tipo = getTipoAccionPorRespuesta(valor);
  const fase = getFasePorRespuesta(valor);
  const recurrencia = getRecurrencia(pregunta);
  const verb =
    valor <= 1 ? 'Crear base operativa para' :
    valor === 2 ? 'Formalizar y poner en uso' :
    'Estandarizar y medir';
  const accion = `${verb}: ${pregunta.texto.replace(/[¿?]/g, '')}`;
  const detalle = [
    `Respuesta actual: ${opcionActual?.texto ?? `nivel ${valor}`}.`,
    `Resultado esperado: ${opcionObjetivo?.texto ?? 'nivel adecuado documentado y medible'}.`,
    pregunta.descripcion ? `Contexto: ${pregunta.descripcion}.` : '',
    recurrencia === 'semanal'
      ? 'Primero prepara el formato o agenda base; despues ejecuta la rutina cada semana para no improvisar.'
      : 'Documenta el criterio, asigna responsable, ejecútalo en un caso real y revisa evidencia de cumplimiento.',
  ].filter(Boolean).join(' ');

  return {
    areaId: area.id,
    areaNombre: area.nombre,
    icono: area.icono,
    prioridad,
    accion,
    detalle,
    plazo: getPlazoPorPregunta(pregunta, valor),
    tipo,
    preguntaId: pregunta.id,
    subarea: pregunta.subarea,
    respuestaActual: opcionActual?.texto,
    respuestaObjetivo: opcionObjetivo?.texto,
    fase,
    paralelo: true,
    recurrencia,
  };
}

function getNivel(score: number): { nivel: ResultadosDiagnostico['nivel']; texto: string; color: string } {
  if (score < 30) return { nivel: 'critico', texto: 'Crítico — Acción inmediata necesaria', color: '#ef4444' };
  if (score < 50) return { nivel: 'bajo', texto: 'Bajo — Fundamentos por construir', color: '#f97316' };
  if (score < 65) return { nivel: 'medio', texto: 'En desarrollo — Buen potencial', color: '#f59e0b' };
  if (score < 80) return { nivel: 'bueno', texto: 'Sólido — Optimización en curso', color: '#22c55e' };
  return { nivel: 'excelente', texto: 'Excelente — Empresa modelo', color: '#6366f1' };
}

export function calcularResultados(
  respuestas: Record<string, number>,
  areasActivas?: Area[],
): ResultadosDiagnostico {
  const areas = areasActivas ?? AREAS;
  const scoresPorArea: ScoresPorArea = {};
  let scoreGeneral = 0;
  let pesoTotal = 0;

  for (const area of areas) {
    const preguntasDelArea = area.preguntas;
    if (preguntasDelArea.length === 0) continue;
    const maxPosible = preguntasDelArea.length * 4;
    const sumaRespuestas = preguntasDelArea.reduce((acc, p) => {
      return acc + (respuestas[p.id] ?? 1);
    }, 0);
    scoresPorArea[area.id] = Math.round((sumaRespuestas / maxPosible) * 100);
    scoreGeneral += scoresPorArea[area.id] * area.peso;
    pesoTotal += area.peso;
  }

  scoreGeneral = pesoTotal > 0 ? Math.round(scoreGeneral / pesoTotal) : 0;

  const areasOrdenadas = areas
    .map((area) => ({ area, score: scoresPorArea[area.id] ?? 0 }))
    .sort((a, b) => a.score - b.score);

  const impactosReales: ImpactoReal[] = areasOrdenadas
    .filter(({ score }) => score < 75)
    .slice(0, 3)
    .map(({ area, score }) => {
      const impactoFn = IMPACTOS_POR_AREA[area.id];
      const impacto = impactoFn ? impactoFn(score) : {
        titulo: `Área ${area.nombre} por mejorar`,
        descripcion: 'Esta área presenta oportunidades de mejora que impactan la eficiencia del negocio.',
        estimacion: '📌 Revisa los detalles en el plan de acción',
      };
      const severidad: ImpactoReal['severidad'] = score < 35 ? 'critico' : score < 55 ? 'alto' : 'medio';
      return {
        areaId: area.id,
        areaNombre: area.nombre,
        icono: area.icono,
        color: area.color,
        score,
        titulo: impacto.titulo,
        descripcion: impacto.descripcion,
        estimacion: impacto.estimacion,
        severidad,
      };
    });

  const accionesPorRespuesta: AccionItem[] = areasOrdenadas.flatMap(({ area }) =>
    area.preguntas
      .filter((pregunta) => respuestas[pregunta.id] !== undefined && respuestas[pregunta.id] < 4)
      .sort((a, b) => (respuestas[a.id] ?? 4) - (respuestas[b.id] ?? 4))
      .map((pregunta) => buildAccionDesdePregunta(area, pregunta, respuestas[pregunta.id] ?? 1, 0))
  );

  const planAccion: AccionItem[] = accionesPorRespuesta.length > 0
    ? accionesPorRespuesta.map((accion, idx) => ({ ...accion, prioridad: idx + 1 }))
    : areasOrdenadas.map(({ area, score }, idx) => {
    const tipo = getTipoAccion(score);
    const accionData =
      tipo === 'crecimiento'
        ? ACCIONES_CRECIMIENTO[area.id]
        : tipo === 'optimizacion'
          ? ACCIONES_OPTIMIZACION[area.id]
          : ACCIONES_REMEDIACION[area.id];

    const fallback = { accion: `Mejora en ${area.nombre}`, detalle: 'Revisa los indicadores de esta área con tu equipo.', plazo: 'Próximas semanas' };
    const data = accionData ?? fallback;

    return {
      areaId: area.id,
      areaNombre: area.nombre,
      icono: area.icono,
      prioridad: idx + 1,
      accion: data.accion,
      detalle: data.detalle,
      plazo: data.plazo,
      tipo,
    };
  });

  const nivelInfo = getNivel(scoreGeneral);

  return {
    scoreGeneral,
    scoresPorArea,
    impactosReales,
    planAccion,
    nivel: nivelInfo.nivel,
    nivelTexto: nivelInfo.texto,
    nivelColor: nivelInfo.color,
  };
}
