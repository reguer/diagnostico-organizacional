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

export interface AccionItem {
  areaId: string;
  areaNombre: string;
  icono: string;
  prioridad: number;
  accion: string;
  detalle: string;
  plazo: string;
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

const ACCIONES_POR_AREA: Record<string, { accion: string; detalle: string; plazo: string }> = {
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

function getNivel(score: number): { nivel: ResultadosDiagnostico['nivel']; texto: string; color: string } {
  if (score < 30) return { nivel: 'critico', texto: 'Crítico — Acción inmediata necesaria', color: '#ef4444' };
  if (score < 50) return { nivel: 'bajo', texto: 'Bajo — Fundamentos por construir', color: '#f97316' };
  if (score < 65) return { nivel: 'medio', texto: 'En desarrollo — Buen potencial', color: '#f59e0b' };
  if (score < 80) return { nivel: 'bueno', texto: 'Sólido — Optimización en curso', color: '#22c55e' };
  return { nivel: 'excelente', texto: 'Excelente — Empresa modelo', color: '#6366f1' };
}

export function calcularResultados(respuestas: Record<string, number>): ResultadosDiagnostico {
  const scoresPorArea: ScoresPorArea = {};
  let scoreGeneral = 0;
  let pesoTotal = 0;

  for (const area of AREAS) {
    const preguntasDelArea = area.preguntas;
    const maxPosible = preguntasDelArea.length * 4;
    const sumaRespuestas = preguntasDelArea.reduce((acc, p) => {
      return acc + (respuestas[p.id] ?? 1);
    }, 0);
    scoresPorArea[area.id] = Math.round((sumaRespuestas / maxPosible) * 100);
    scoreGeneral += scoresPorArea[area.id] * area.peso;
    pesoTotal += area.peso;
  }

  scoreGeneral = Math.round(scoreGeneral / pesoTotal);

  // Generar impactos: todas las áreas ordenadas de menor a mayor score
  const areasOrdenadas = AREAS
    .map((area) => ({ area, score: scoresPorArea[area.id] }))
    .sort((a, b) => a.score - b.score);

  const impactosReales: ImpactoReal[] = areasOrdenadas
    .filter(({ score }) => score < 75)
    .slice(0, 3)
    .map(({ area, score }) => {
      const impactoFn = IMPACTOS_POR_AREA[area.id];
      const impacto = impactoFn(score);
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

  // Plan de acción: 3 áreas con menor score
  const planAccion: AccionItem[] = areasOrdenadas.slice(0, 3).map(({ area }, idx) => {
    const accionData = ACCIONES_POR_AREA[area.id];
    return {
      areaId: area.id,
      areaNombre: area.nombre,
      icono: area.icono,
      prioridad: idx + 1,
      accion: accionData.accion,
      detalle: accionData.detalle,
      plazo: accionData.plazo,
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
