import type { ResultadosDiagnostico } from './calculator';

export type TipoTarea = 'remediacion' | 'optimizacion' | 'automatizacion';
export type DiaSemana = 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado';

export interface TareaSemanal {
  id: string;
  dia: DiaSemana;
  hora: string;
  titulo: string;
  detalle: string;
  tipo: TipoTarea;
  areaId: string;
  areaNombre: string;
  areaIcono: string;
  duracion: string;
  herramienta?: string;
  automatizacion?: string;
}

export interface PlanSemanal {
  semana: string;
  objetivo: string;
  tareas: TareaSemanal[];
  focusArea: string;
  metasSemana: string[];
}

// Tareas por área según nivel de score
const TAREAS_POR_AREA: Record<string, {
  critico: TareaSemanal[],
  bajo: TareaSemanal[],
  medio: TareaSemanal[],
  optimo: TareaSemanal[],
}> = {
  finanzas: {
    critico: [
      {
        id: 'fin-c1', dia: 'Lunes', hora: '07:00', tipo: 'remediacion',
        areaId: 'finanzas', areaNombre: 'Finanzas', areaIcono: '💰',
        titulo: 'Crea tu primera plantilla de costeo de proyecto',
        detalle: 'Abre una hoja de Google Sheets con estas columnas: Materiales, Horas cuadrilla × tarifa, Maquinaria, Transporte, Imprevistos (10%). Úsala en la próxima cotización de sistema de riego o paisajismo.',
        duracion: '2 horas', herramienta: 'Google Sheets (gratis)',
      },
      {
        id: 'fin-c2', dia: 'Miércoles', hora: '06:30', tipo: 'remediacion',
        areaId: 'finanzas', areaNombre: 'Finanzas', areaIcono: '💰',
        titulo: 'Abre una cuenta bancaria empresarial separada',
        detalle: 'Esta semana gestiona la apertura de cuenta a nombre de la empresa. Establece que todos los ingresos de proyectos entren ahí y tú recibirás un "sueldo" fijo mensual. Este paso solo toma una mañana.',
        duracion: '3 horas',
      },
      {
        id: 'fin-c3', dia: 'Viernes', hora: '16:00', tipo: 'remediacion',
        areaId: 'finanzas', areaNombre: 'Finanzas', areaIcono: '💰',
        titulo: 'Lista los últimos 5 proyectos y calcula si ganaste o perdiste en cada uno',
        detalle: 'Para cada proyecto: ingreso cobrado − materiales − horas de cuadrilla − maquinaria = resultado real. Aunque sea aproximado, verás en cuáles estás perdiendo dinero sin saberlo.',
        duracion: '1.5 horas',
      },
    ],
    bajo: [
      {
        id: 'fin-b1', dia: 'Lunes', hora: '07:00', tipo: 'remediacion',
        areaId: 'finanzas', areaNombre: 'Finanzas', areaIcono: '💰',
        titulo: 'Implementa el costeo de MO en tus cotizaciones',
        detalle: 'Ya calculas materiales — ahora agrega: N° personas × horas × costo/hora (salario + IMSS/ISSS + transporte). Para señalética o riego, 1 persona = aprox. 2.5× su salario diario en costo real.',
        duracion: '1.5 horas',
      },
      {
        id: 'fin-b2', dia: 'Jueves', hora: '15:00', tipo: 'remediacion',
        areaId: 'finanzas', areaNombre: 'Finanzas', areaIcono: '💰',
        titulo: 'Elabora un reporte simple de margen mensual',
        detalle: 'Suma todos los ingresos del mes, resta todos los costos (materiales, nómina, transporte, renta si aplica). El resultado ÷ ingresos × 100 = tu margen %. Meta inicial: no menos de 25%.',
        duracion: '2 horas', herramienta: 'Excel / Google Sheets',
      },
    ],
    medio: [
      {
        id: 'fin-m1', dia: 'Martes', hora: '08:00', tipo: 'optimizacion',
        areaId: 'finanzas', areaNombre: 'Finanzas', areaIcono: '💰',
        titulo: 'Automatiza el seguimiento de cuentas por cobrar',
        detalle: 'Configura en tu hoja de cálculo una columna "Días vencidos". Si supera 15 días, envía WhatsApp con recordatorio de cobro. Establece la regla: sin anticipo del 40% no se inicia ningún proyecto.',
        duracion: '2 horas', automatizacion: 'Google Sheets + recordatorio manual en calendario',
      },
    ],
    optimo: [
      {
        id: 'fin-o1', dia: 'Miércoles', hora: '09:00', tipo: 'automatizacion',
        areaId: 'finanzas', areaNombre: 'Finanzas', areaIcono: '💰',
        titulo: 'Conecta tu contabilidad con el dashboard de proyectos',
        detalle: 'Evalúa herramientas como Contpaqi Empresarial, Aspel COI o Alegra para generar estados de resultados automáticos por proyecto. Solicita demo gratuita esta semana.',
        duracion: '1 hora', herramienta: 'Alegra / Aspel / Contpaqi', automatizacion: 'Reportes automáticos por proyecto',
      },
    ],
  },

  operaciones: {
    critico: [
      {
        id: 'ops-c1', dia: 'Lunes', hora: '06:00', tipo: 'remediacion',
        areaId: 'operaciones', areaNombre: 'Operaciones', areaIcono: '⚙️',
        titulo: 'Levantamiento físico de inventario: herramientas y equipos',
        detalle: 'Con el encargado, lista TODA la herramienta y maquinaria. Asigna un número, toma foto, apunta responsable. Pega la lista en la bodega. Haz esto antes del miércoles — máximo 2 horas.',
        duracion: '2 horas', herramienta: 'Hoja de papel + fotos del celular',
      },
      {
        id: 'ops-c2', dia: 'Miércoles', hora: '17:00', tipo: 'remediacion',
        areaId: 'operaciones', areaNombre: 'Operaciones', areaIcono: '⚙️',
        titulo: 'Escribe el proceso paso a paso de tu servicio más frecuente',
        detalle: 'Elige: instalación de riego, diseño de jardín o señalética. Escribe los pasos que hace la cuadrilla, en orden. Una página es suficiente. Compártelo con tu encargado y pídele correcciones.',
        duracion: '1.5 horas',
      },
      {
        id: 'ops-c3', dia: 'Viernes', hora: '07:00', tipo: 'remediacion',
        areaId: 'operaciones', areaNombre: 'Operaciones', areaIcono: '⚙️',
        titulo: 'Programa la planificación de la próxima semana en calendario',
        detalle: 'Cada viernes por la tarde: asigna proyectos, cuadrillas y equipos para la semana siguiente en un calendario compartido (Google Calendar). Así evitas el "¿quién va a dónde?" del lunes por la mañana.',
        duracion: '45 minutos', herramienta: 'Google Calendar (gratis)',
      },
    ],
    bajo: [
      {
        id: 'ops-b1', dia: 'Martes', hora: '08:00', tipo: 'remediacion',
        areaId: 'operaciones', areaNombre: 'Operaciones', areaIcono: '⚙️',
        titulo: 'Crea un checklist de cierre de proyecto para cada servicio',
        detalle: 'Para riego: ¿probaste presión?, ¿funcionan todos los aspersores?, ¿foto antes/después tomada?, ¿cliente firmó conformidad? Para señalética: ¿dimensiones correctas?, ¿nivel verificado?, ¿anclaje revisado?',
        duracion: '1 hora',
      },
    ],
    medio: [
      {
        id: 'ops-m1', dia: 'Jueves', hora: '09:00', tipo: 'optimizacion',
        areaId: 'operaciones', areaNombre: 'Operaciones', areaIcono: '⚙️',
        titulo: 'Implementa rotación de proveedores en materiales clave',
        detalle: 'Identifica tus 3 materiales de mayor costo (tubería, plantas, señales). Consigue cotización de un segundo proveedor. Establece política: comparar precios mensualmente y revisar calidad.',
        duracion: '2 horas',
      },
      {
        id: 'ops-m2', dia: 'Miércoles', hora: '10:00', tipo: 'automatizacion',
        areaId: 'operaciones', areaNombre: 'Operaciones', areaIcono: '⚙️',
        titulo: 'Configura un grupo de WhatsApp de obra por proyecto activo',
        detalle: 'Crea un grupo por cada proyecto activo: encargado, tú, proveedor clave si aplica. Establece regla: fotos de avance diario a las 6pm. Simple, sin costo, elimina el "¿cómo va el proyecto?".',
        duracion: '30 minutos', herramienta: 'WhatsApp Business',
      },
    ],
    optimo: [
      {
        id: 'ops-o1', dia: 'Lunes', hora: '09:00', tipo: 'automatizacion',
        areaId: 'operaciones', areaNombre: 'Operaciones', areaIcono: '⚙️',
        titulo: 'Evalúa software de gestión de proyectos de construcción',
        detalle: 'Para el objetivo de construcción de casas necesitarás gestión de cronograma, subcontratistas y materiales. Solicita demos de: Buildertrend, CoConstruct o Monday.com con plantilla de construcción.',
        duracion: '2 horas', herramienta: 'Buildertrend / Monday.com', automatizacion: 'Cronograma + alertas de avance automáticas',
      },
    ],
  },

  personas: {
    critico: [
      {
        id: 'per-c1', dia: 'Martes', hora: '07:30', tipo: 'remediacion',
        areaId: 'personas', areaNombre: 'Personas', areaIcono: '👥',
        titulo: 'Escribe las 3 responsabilidades del encargado de cuadrilla',
        detalle: 'Media página: (1) qué decide solo, (2) qué reporta a ti, (3) cómo reporta avance diario. Reúnete con él/ella para revisarlo juntos. Este documento previene el 70% de los malentendidos en obra.',
        duracion: '1 hora',
      },
      {
        id: 'per-c2', dia: 'Jueves', hora: '16:00', tipo: 'remediacion',
        areaId: 'personas', areaNombre: 'Personas', areaIcono: '👥',
        titulo: 'Establece una reunión semanal de 20 minutos con el equipo',
        detalle: 'Cada lunes por la mañana, 20 minutos: ¿qué hicimos la semana pasada?, ¿qué hay esta semana?, ¿qué necesitan para trabajar? Esto reduce llamadas durante la semana y mejora el ánimo del equipo.',
        duracion: '30 minutos para planear', herramienta: 'WhatsApp o presencial',
      },
    ],
    bajo: [
      {
        id: 'per-b1', dia: 'Miércoles', hora: '08:00', tipo: 'remediacion',
        areaId: 'personas', areaNombre: 'Personas', areaIcono: '👥',
        titulo: 'Diseña el proceso de onboarding para un nuevo trabajador',
        detalle: 'Primer día: conocer bodega, herramientas, encargado. Primera semana: acompañar en obra. Segunda semana: tarea supervisada. Escribe esto en media página — ahorrarás meses de aprendizaje por ensayo y error.',
        duracion: '1 hora',
      },
    ],
    medio: [
      {
        id: 'per-m1', dia: 'Viernes', hora: '15:00', tipo: 'optimizacion',
        areaId: 'personas', areaNombre: 'Personas', areaIcono: '👥',
        titulo: 'Implementa una evaluación trimestral simple de desempeño',
        detalle: 'Crea 5 criterios por rol: puntualidad, calidad del trabajo, cuidado de herramientas, actitud, productividad. Escala 1-5. Haz la primera evaluación esta semana con el encargado. Comunica resultados en privado.',
        duracion: '1.5 horas',
      },
      {
        id: 'per-m2', dia: 'Jueves', hora: '18:00', tipo: 'automatizacion',
        areaId: 'personas', areaNombre: 'Personas', areaIcono: '👥',
        titulo: 'Crea un formulario digital de reporte de incidencias en obra',
        detalle: 'Con Google Forms: ¿qué pasó?, ¿quién?, ¿en qué proyecto?, ¿se resolvió? Comparte el link con tus encargados. Tendrás un registro automático de problemas que hoy se pierden de boca en boca.',
        duracion: '45 minutos', herramienta: 'Google Forms (gratis)', automatizacion: 'Registro automático en Google Sheets',
      },
    ],
    optimo: [
      {
        id: 'per-o1', dia: 'Lunes', hora: '10:00', tipo: 'automatizacion',
        areaId: 'personas', areaNombre: 'Personas', areaIcono: '👥',
        titulo: 'Diseña la estructura organizacional para el área de construcción de casas',
        detalle: 'Para iniciar obra residencial necesitarás: Residente de obra, Maestro de obras, Cuadrilla de albañilería + instalaciones. Diseña el organigrama y los perfiles de contratación para la primera obra.',
        duracion: '2 horas',
      },
    ],
  },

  mercadeo: {
    critico: [
      {
        id: 'mer-c1', dia: 'Martes', hora: '09:00', tipo: 'remediacion',
        areaId: 'mercadeo', areaNombre: 'Mercadeo', areaIcono: '📣',
        titulo: 'Toma fotos de antes/después en tu próximo proyecto activo',
        detalle: 'Antes de iniciar: foto del área. Al terminar: misma ángulo, mismo encuadre. Súbelas a Instagram/Facebook con descripción del servicio y zona. Hazlo en CADA proyecto esta semana — esto es tu portafolio vivo.',
        duracion: '30 minutos por proyecto',
      },
      {
        id: 'mer-c2', dia: 'Miércoles', hora: '16:00', tipo: 'remediacion',
        areaId: 'mercadeo', areaNombre: 'Mercadeo', areaIcono: '📣',
        titulo: 'Pide reseñas a tus últimos 5 clientes satisfechos',
        detalle: 'Envía por WhatsApp: "Hola [nombre], fue un placer trabajar en su [proyecto]. ¿Podría dejarnos una reseña en Google? Le toma 2 minutos y nos ayuda mucho." Incluye el link directo a tu perfil de Google Maps.',
        duracion: '30 minutos', herramienta: 'WhatsApp + Google Business Profile',
      },
    ],
    bajo: [
      {
        id: 'mer-b1', dia: 'Lunes', hora: '08:00', tipo: 'remediacion',
        areaId: 'mercadeo', areaNombre: 'Mercadeo', areaIcono: '📣',
        titulo: 'Crea o actualiza tu perfil en Google Business Profile',
        detalle: 'Es gratis, aparece en mapas y búsquedas locales. Agrega: categoría (paisajismo, construcción, señalética), zona de servicio, fotos de proyectos, teléfono y horario. Clientes que busquen en tu ciudad te encontrarán.',
        duracion: '1.5 horas', herramienta: 'Google Business Profile (gratis)',
      },
    ],
    medio: [
      {
        id: 'mer-m1', dia: 'Martes', hora: '10:00', tipo: 'optimizacion',
        areaId: 'mercadeo', areaNombre: 'Mercadeo', areaIcono: '📣',
        titulo: 'Implementa seguimiento a cotizaciones abiertas con recordatorio automático',
        detalle: 'Crea una tabla en Google Sheets: cliente, servicio cotizado, fecha, monto, estado. Cada cotización sin respuesta después de 5 días recibe llamada de seguimiento. Esta sola acción puede cerrar 20-30% más de contratos.',
        duracion: '1 hora', herramienta: 'Google Sheets + calendario',
      },
      {
        id: 'mer-m2', dia: 'Jueves', hora: '11:00', tipo: 'automatizacion',
        areaId: 'mercadeo', areaNombre: 'Mercadeo', areaIcono: '📣',
        titulo: 'Configura WhatsApp Business con respuestas automáticas',
        detalle: 'Mensaje de bienvenida cuando alguien contacta fuera de horario: "Hola, gracias por contactar [empresa]. Atendemos de L-V 7am-6pm. Para cotizaciones envíanos: tipo de proyecto, zona y medidas aproximadas." Esto clasifica prospectos automáticamente.',
        duracion: '45 minutos', herramienta: 'WhatsApp Business (gratis)', automatizacion: 'Respuesta automática 24/7',
      },
    ],
    optimo: [
      {
        id: 'mer-o1', dia: 'Miércoles', hora: '09:00', tipo: 'automatizacion',
        areaId: 'mercadeo', areaNombre: 'Mercadeo', areaIcono: '📣',
        titulo: 'Diseña una campaña de lanzamiento para construcción de casas',
        detalle: 'Nuevo servicio = necesita posicionamiento específico. Define: qué tipo de casas (unifamiliar, fraccionamiento), zona geográfica inicial, precio aproximado por m². Crea una landing page básica con los diferenciales frente a constructoras grandes.',
        duracion: '3 horas',
      },
    ],
  },

  estrategia: {
    critico: [
      {
        id: 'est-c1', dia: 'Lunes', hora: '06:00', tipo: 'remediacion',
        areaId: 'estrategia', areaNombre: 'Estrategia', areaIcono: '🎯',
        titulo: 'Escribe tus 3 metas para los próximos 90 días',
        detalle: 'Una meta de ingresos ($___), una meta operativa (ej: "documentar el proceso de instalación de riego"), una meta de equipo (ej: "contratar un maestro de obras para el área de construcción"). Ponla donde la veas diario.',
        duracion: '1 hora',
      },
      {
        id: 'est-c2', dia: 'Miércoles', hora: '17:00', tipo: 'remediacion',
        areaId: 'estrategia', areaNombre: 'Estrategia', areaIcono: '🎯',
        titulo: 'Identifica tu servicio más rentable y decide si vas a potenciarlo',
        detalle: 'Revisa los últimos 10 proyectos. ¿Cuáles tomaron menos tiempo y generaron más margen? ¿Riego? ¿Señalética? ¿Paisajismo de alto valor? Ese servicio es tu "vaca lechera" — decide si quieres profundizarlo o diversificarte con construcción.',
        duracion: '1.5 horas',
      },
    ],
    bajo: [
      {
        id: 'est-b1', dia: 'Jueves', hora: '07:00', tipo: 'remediacion',
        areaId: 'estrategia', areaNombre: 'Estrategia', areaIcono: '🎯',
        titulo: 'Define el "cliente ideal" para cada línea de servicio',
        detalle: 'Para cada servicio (paisajismo, riego, señalética, futura construcción): ¿qué tamaño de proyecto?, ¿qué tipo de cliente (residencial, comercial, gobierno)?, ¿en qué zona geográfica? Esto define a quién buscar y qué cotizar.',
        duracion: '1.5 horas',
      },
    ],
    medio: [
      {
        id: 'est-m1', dia: 'Martes', hora: '08:00', tipo: 'optimizacion',
        areaId: 'estrategia', areaNombre: 'Estrategia', areaIcono: '🎯',
        titulo: 'Diseña el modelo de negocio para construcción de casas (Canvas)',
        detalle: 'Llena un Business Model Canvas adaptado: ¿quiénes son tus socios clave (arquitectos, notarios, bancos)?, ¿cuál es tu propuesta de valor vs. constructoras?, ¿cómo llegas a los compradores? Esto convierte la idea en un plan ejecutable.',
        duracion: '2.5 horas', herramienta: 'Canvanizer (gratis) o papel',
      },
      {
        id: 'est-m2', dia: 'Viernes', hora: '08:00', tipo: 'automatizacion',
        areaId: 'estrategia', areaNombre: 'Estrategia', areaIcono: '🎯',
        titulo: 'Establece un dashboard semanal de 5 indicadores clave',
        detalle: 'Crea en Google Sheets: (1) Proyectos activos, (2) Cotizaciones enviadas vs. cerradas, (3) Margen del mes, (4) Nuevos contactos, (5) Estado de cuentas por cobrar. Actualízalo los viernes. Son 10 minutos que te dan visibilidad total.',
        duracion: '1.5 horas', herramienta: 'Google Sheets', automatizacion: 'Dashboard de gestión actualizado semanalmente',
      },
    ],
    optimo: [
      {
        id: 'est-o1', dia: 'Lunes', hora: '09:00', tipo: 'automatizacion',
        areaId: 'estrategia', areaNombre: 'Estrategia', areaIcono: '🎯',
        titulo: 'Define el plan de expansión a construcción de casas: cronograma y requerimientos',
        detalle: 'Para iniciar obra residencial necesitas: capital semilla o línea de crédito, permiso de construcción, maestro de obras certificado, y tu primer proyecto piloto (recomendado: casa propia del equipo o cliente ancla). Traza el cronograma de 6-12 meses.',
        duracion: '3 horas',
      },
    ],
  },
};

function nivelScore(score: number): 'critico' | 'bajo' | 'medio' | 'optimo' {
  if (score < 35) return 'critico';
  if (score < 55) return 'bajo';
  if (score < 75) return 'medio';
  return 'optimo';
}

const DIAS: DiaSemana[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export function generarPlanSemanal(resultado: ResultadosDiagnostico): PlanSemanal {
  const { scoresPorArea } = resultado;
  const tareas: TareaSemanal[] = [];
  const areasOrdenadas = Object.entries(scoresPorArea).sort(([, a], [, b]) => a - b);

  // Distribuir tareas a lo largo de la semana
  let diaIdx = 0;

  for (const [areaId, score] of areasOrdenadas) {
    const nivel = nivelScore(score);
    const tareasArea = TAREAS_POR_AREA[areaId]?.[nivel] ?? [];

    for (const tarea of tareasArea.slice(0, 2)) {
      // Evitar amontonar todo en el mismo día
      const dia = DIAS[diaIdx % DIAS.length];
      diaIdx++;
      tareas.push({ ...tarea, dia });
    }

    // Para áreas de score medio-alto también agregar una tarea de optimización/automatización
    if (nivel === 'optimo' || nivel === 'medio') {
      const tareasExtra = TAREAS_POR_AREA[areaId]?.[nivel === 'optimo' ? 'optimo' : 'optimo'] ?? [];
      if (tareasExtra.length > 0) {
        const dia = DIAS[diaIdx % DIAS.length];
        diaIdx++;
        tareas.push({ ...tareasExtra[0], dia });
      }
    }
  }

  // Limitar a 10 tareas máximo para que sea realista
  const tareasFinales = tareas.slice(0, 10);

  // Generar metas de la semana según las áreas más débiles
  const top3Debiles = areasOrdenadas.slice(0, 3);
  const metasSemana = top3Debiles.map(([areaId, score]) => {
    const nivel = nivelScore(score);
    const metas: Record<string, Record<string, string>> = {
      finanzas: { critico: 'Crear plantilla de costeo y separar cuentas', bajo: 'Calcular margen real del mes anterior', medio: 'Implementar control de anticipos en todos los proyectos', optimo: 'Conectar contabilidad a dashboard de proyectos' },
      operaciones: { critico: 'Hacer inventario físico + proceso documentado #1', bajo: 'Checklists de cierre para los 3 servicios principales', medio: 'Rotación de proveedores y seguimiento por WhatsApp de obra', optimo: 'Evaluar software de gestión de proyectos de construcción' },
      personas: { critico: 'Descripción de rol escrita + reunión semanal establecida', bajo: 'Onboarding documentado para nuevas contrataciones', medio: 'Primera evaluación de desempeño del equipo', optimo: 'Organigrama para el área de construcción' },
      mercadeo: { critico: 'Portfolio de antes/después + 5 reseñas solicitadas', bajo: 'Google Business Profile actualizado', medio: 'Sistema de seguimiento a cotizaciones abiertas', optimo: 'Landing page para el servicio de construcción de casas' },
      estrategia: { critico: '3 metas escritas para los próximos 90 días', bajo: 'Perfil de cliente ideal por línea de servicio', medio: 'Canvas del modelo de negocio para construcción', optimo: 'Cronograma de expansión a obra residencial' },
    };
    return metas[areaId]?.[nivel] ?? `Mejorar área de ${areaId}`;
  });

  const areaFocus = top3Debiles[0]?.[0] ?? 'operaciones';
  const nombresFocus: Record<string, string> = {
    finanzas: 'Finanzas y Rentabilidad',
    operaciones: 'Procesos Operativos',
    personas: 'Gestión de Personas',
    mercadeo: 'Mercadeo y Captación',
    estrategia: 'Dirección Estratégica',
  };

  const objetivos: Record<string, string> = {
    finanzas: 'Conocer y controlar el dinero real que entra y sale de cada proyecto',
    operaciones: 'Ordenar los procesos para que el equipo trabaje sin depender de ti en cada decisión',
    personas: 'Construir el equipo y los procesos para poder escalar a construcción de casas',
    mercadeo: 'Generar flujo constante de prospectos y cerrar más de las cotizaciones que ya envías',
    estrategia: 'Tomar las decisiones de crecimiento (especialmente construcción de casas) con datos y un plan',
  };

  return {
    semana: 'Semana 1 — Prioridad Alta',
    objetivo: objetivos[areaFocus] ?? 'Fortalecer las bases operativas del negocio',
    tareas: tareasFinales,
    focusArea: nombresFocus[areaFocus] ?? areaFocus,
    metasSemana,
  };
}
