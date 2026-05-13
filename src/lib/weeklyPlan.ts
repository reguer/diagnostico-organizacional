import type { ResultadosDiagnostico } from './calculator';

export type TipoTarea = 'remediacion' | 'optimizacion' | 'automatizacion';
export type DiaSemana = 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado';
type NivelTarea = 'critico' | 'bajo' | 'medio' | 'optimo';

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
  semanaNum: number;
  semana: string;
  subtitulo: string;
  plazo: string;
  objetivo: string;
  tareas: TareaSemanal[];
  focusArea: string;
  metasSemana: string[];
}

const TAREAS_POR_AREA: Record<string, Record<NivelTarea, TareaSemanal[]>> = {
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
        detalle: 'Gestiona la apertura de cuenta a nombre de la empresa. Establece que todos los ingresos de proyectos entren ahí y tú recibirás un "sueldo" fijo mensual. Este paso solo toma una mañana.',
        duracion: '3 horas',
      },
      {
        id: 'fin-c3', dia: 'Viernes', hora: '16:00', tipo: 'remediacion',
        areaId: 'finanzas', areaNombre: 'Finanzas', areaIcono: '💰',
        titulo: 'Calcula si ganaste o perdiste en tus últimos 5 proyectos',
        detalle: 'Para cada proyecto: ingreso cobrado − materiales − horas de cuadrilla − maquinaria = resultado real. Aunque sea aproximado, verás en cuáles estás perdiendo dinero sin saberlo.',
        duracion: '1.5 horas',
      },
      {
        id: 'fin-c4', dia: 'Martes', hora: '08:00', tipo: 'remediacion',
        areaId: 'finanzas', areaNombre: 'Finanzas', areaIcono: '💰',
        titulo: 'Establece la regla del anticipo: 40% antes de iniciar',
        detalle: 'Define por escrito: ningún proyecto inicia sin el 40% de anticipo. Esto protege tu flujo de caja y elimina proyectos que terminan sin pago. Comunícalo a tu equipo y actualiza tus cotizaciones.',
        duracion: '30 minutos',
      },
    ],
    bajo: [
      {
        id: 'fin-b1', dia: 'Lunes', hora: '07:00', tipo: 'remediacion',
        areaId: 'finanzas', areaNombre: 'Finanzas', areaIcono: '💰',
        titulo: 'Implementa el costeo de mano de obra en tus cotizaciones',
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
      {
        id: 'fin-b3', dia: 'Miércoles', hora: '09:00', tipo: 'remediacion',
        areaId: 'finanzas', areaNombre: 'Finanzas', areaIcono: '💰',
        titulo: 'Define un catálogo de tarifas mínimas por tipo de servicio',
        detalle: 'Establece el precio mínimo por m² de paisajismo, m lineal de riego, m² de señalética y m² de construcción. Esto evita cotizar por debajo de tu punto de equilibrio bajo presión del cliente.',
        duracion: '2 horas',
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
      {
        id: 'fin-m2', dia: 'Viernes', hora: '07:00', tipo: 'optimizacion',
        areaId: 'finanzas', areaNombre: 'Finanzas', areaIcono: '💰',
        titulo: 'Implementa un presupuesto mensual por línea de servicio',
        detalle: 'Crea un presupuesto anual dividido por mes. Incluye: proyección de ingresos por paisajismo, riego, señalética y construcción. Compara real vs. presupuestado cada mes. Esto detecta tendencias antes de que se conviertan en problemas.',
        duracion: '2.5 horas', herramienta: 'Google Sheets / Excel',
      },
      {
        id: 'fin-m3', dia: 'Sábado', hora: '09:00', tipo: 'optimizacion',
        areaId: 'finanzas', areaNombre: 'Finanzas', areaIcono: '💰',
        titulo: 'Analiza el ROI de tu equipo y maquinaria principal',
        detalle: 'Para cada pieza de equipo clave (hidrolavadora, retroexcavadora, camioneta): ¿cuánto cuesta mantenerla al año? ¿Cuánto genera? Si el ROI es < 2x, evalúa rentar en lugar de mantener.',
        duracion: '2 horas',
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
      {
        id: 'fin-o2', dia: 'Jueves', hora: '10:00', tipo: 'automatizacion',
        areaId: 'finanzas', areaNombre: 'Finanzas', areaIcono: '💰',
        titulo: 'Evalúa opciones de financiamiento para el primer proyecto de construcción',
        detalle: 'Para iniciar obra residencial necesitarás capital para terreno + materiales iniciales. Investiga: líneas de crédito empresarial, socios financieros, preventas. Prepara un perfil crediticio de la empresa este mes.',
        duracion: '3 horas',
      },
    ],
  },

  operaciones: {
    critico: [
      {
        id: 'ops-c1', dia: 'Lunes', hora: '06:00', tipo: 'remediacion',
        areaId: 'operaciones', areaNombre: 'Operaciones', areaIcono: '⚙️',
        titulo: 'Levantamiento físico de inventario: herramientas y equipos',
        detalle: 'Con el encargado, lista TODA la herramienta y maquinaria. Asigna un número, toma foto, apunta responsable. Pega la lista en la bodega. Máximo 2 horas.',
        duracion: '2 horas', herramienta: 'Hoja de papel + fotos del celular',
      },
      {
        id: 'ops-c2', dia: 'Miércoles', hora: '17:00', tipo: 'remediacion',
        areaId: 'operaciones', areaNombre: 'Operaciones', areaIcono: '⚙️',
        titulo: 'Documenta el proceso paso a paso de tu servicio más frecuente',
        detalle: 'Elige: instalación de riego, diseño de jardín o señalética. Escribe los pasos que hace la cuadrilla, en orden. Una página es suficiente. Compártelo con tu encargado y pídele correcciones.',
        duracion: '1.5 horas',
      },
      {
        id: 'ops-c3', dia: 'Viernes', hora: '07:00', tipo: 'remediacion',
        areaId: 'operaciones', areaNombre: 'Operaciones', areaIcono: '⚙️',
        titulo: 'Planifica la próxima semana cada viernes en calendario compartido',
        detalle: 'Cada viernes por la tarde: asigna proyectos, cuadrillas y equipos para la semana siguiente en Google Calendar. Así evitas el "¿quién va a dónde?" del lunes por la mañana.',
        duracion: '45 minutos', herramienta: 'Google Calendar (gratis)',
      },
      {
        id: 'ops-c4', dia: 'Martes', hora: '07:00', tipo: 'remediacion',
        areaId: 'operaciones', areaNombre: 'Operaciones', areaIcono: '⚙️',
        titulo: 'Define el proceso de levantamiento de campo antes de cotizar',
        detalle: 'Crea una hoja de campo: medidas, tipo de terreno, acceso, riesgos, fotos. Aplícala en cada visita antes de cotizar. Esto elimina sorpresas en obra y cotizaciones que no cubren lo real.',
        duracion: '1 hora',
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
      {
        id: 'ops-b2', dia: 'Jueves', hora: '08:00', tipo: 'remediacion',
        areaId: 'operaciones', areaNombre: 'Operaciones', areaIcono: '⚙️',
        titulo: 'Establece el protocolo de mantenimiento preventivo de maquinaria',
        detalle: 'Lista los servicios de mantenimiento de cada equipo con su frecuencia (afinación, cambio de aceite, filtros). Programa en calendario. Un equipo en falla paraliza proyectos y cuesta 3x más que el mantenimiento.',
        duracion: '1 hora', herramienta: 'Google Calendar + hoja de Excel',
      },
      {
        id: 'ops-b3', dia: 'Miércoles', hora: '09:00', tipo: 'remediacion',
        areaId: 'operaciones', areaNombre: 'Operaciones', areaIcono: '⚙️',
        titulo: 'Crea un sistema básico de solicitud de materiales por proyecto',
        detalle: 'Cada proyecto tiene una lista de materiales aprobada. El encargado de cuadrilla solicita por escrito (WhatsApp o formulario) antes de comprar. Esto elimina compras duplicadas y materiales perdidos.',
        duracion: '45 minutos', herramienta: 'Google Forms o WhatsApp',
      },
    ],
    medio: [
      {
        id: 'ops-m1', dia: 'Jueves', hora: '09:00', tipo: 'optimizacion',
        areaId: 'operaciones', areaNombre: 'Operaciones', areaIcono: '⚙️',
        titulo: 'Implementa rotación de proveedores en materiales clave',
        detalle: 'Identifica tus 3 materiales de mayor costo (tubería, plantas, señales). Consigue cotización de un segundo proveedor. Establece política: comparar precios mensualmente.',
        duracion: '2 horas',
      },
      {
        id: 'ops-m2', dia: 'Miércoles', hora: '10:00', tipo: 'automatizacion',
        areaId: 'operaciones', areaNombre: 'Operaciones', areaIcono: '⚙️',
        titulo: 'Configura un grupo de WhatsApp de obra por proyecto activo',
        detalle: 'Crea un grupo por cada proyecto activo: encargado, tú, proveedor clave si aplica. Establece regla: fotos de avance diario a las 6pm. Elimina el "¿cómo va el proyecto?" y centraliza la comunicación.',
        duracion: '30 minutos', herramienta: 'WhatsApp Business',
      },
      {
        id: 'ops-m3', dia: 'Lunes', hora: '08:00', tipo: 'optimizacion',
        areaId: 'operaciones', areaNombre: 'Operaciones', areaIcono: '⚙️',
        titulo: 'Documenta estándares de calidad por tipo de instalación',
        detalle: 'Para cada servicio, define: tolerancias aceptables, criterios de rechazo, protocolo de corrección. Ejemplo en riego: presión mínima de salida, separación máxima entre aspersores, prueba de hermeticidad. Esto unifica la calidad entre cuadrillas.',
        duracion: '2.5 horas',
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
      {
        id: 'ops-o2', dia: 'Miércoles', hora: '10:00', tipo: 'automatizacion',
        areaId: 'operaciones', areaNombre: 'Operaciones', areaIcono: '⚙️',
        titulo: 'Diseña el flujo operativo para gestión de obra residencial',
        detalle: 'Mapea las etapas de una obra residencial tipo: cimentación, estructura, instalaciones, acabados. Define quién aprueba cada etapa, qué inspecciones se requieren y cómo se reporta al cliente. Base para el primer proyecto piloto.',
        duracion: '3 horas',
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
        detalle: 'Cada lunes por la mañana, 20 minutos: ¿qué hicimos la semana pasada?, ¿qué hay esta semana?, ¿qué necesitan para trabajar? Reduce llamadas durante la semana y mejora el ánimo del equipo.',
        duracion: '30 minutos para planear', herramienta: 'WhatsApp o presencial',
      },
      {
        id: 'per-c3', dia: 'Viernes', hora: '08:00', tipo: 'remediacion',
        areaId: 'personas', areaNombre: 'Personas', areaIcono: '👥',
        titulo: 'Define los rangos salariales y política de incentivos del equipo',
        detalle: 'Establece: salario base por rol, cómo se calculan los bonos (por proyecto terminado en tiempo, sin quejas, cuidado de herramienta). Un equipo con incentivos claros rota menos y trabaja con más compromiso.',
        duracion: '1.5 horas',
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
      {
        id: 'per-b2', dia: 'Lunes', hora: '09:00', tipo: 'remediacion',
        areaId: 'personas', areaNombre: 'Personas', areaIcono: '👥',
        titulo: 'Documenta el proceso de contratación y selección de personal de campo',
        detalle: 'Define: cómo buscas candidatos (recomendaciones, bolsa de trabajo), qué preguntas haces en entrevista, cómo pruebas sus habilidades técnicas antes de contratar. Un mal hire en campo puede costar 3 proyectos.',
        duracion: '1 hora',
      },
    ],
    medio: [
      {
        id: 'per-m1', dia: 'Viernes', hora: '15:00', tipo: 'optimizacion',
        areaId: 'personas', areaNombre: 'Personas', areaIcono: '👥',
        titulo: 'Implementa una evaluación trimestral simple de desempeño',
        detalle: 'Crea 5 criterios por rol: puntualidad, calidad del trabajo, cuidado de herramientas, actitud, productividad. Escala 1-5. Haz la primera evaluación con el encargado. Comunica resultados en privado.',
        duracion: '1.5 horas',
      },
      {
        id: 'per-m2', dia: 'Jueves', hora: '18:00', tipo: 'automatizacion',
        areaId: 'personas', areaNombre: 'Personas', areaIcono: '👥',
        titulo: 'Crea un formulario digital de reporte de incidencias en obra',
        detalle: 'Con Google Forms: ¿qué pasó?, ¿quién?, ¿en qué proyecto?, ¿se resolvió? Comparte el link con tus encargados. Tendrás un registro automático de problemas que hoy se pierden de boca en boca.',
        duracion: '45 minutos', herramienta: 'Google Forms (gratis)', automatizacion: 'Registro automático en Google Sheets',
      },
      {
        id: 'per-m3', dia: 'Martes', hora: '10:00', tipo: 'optimizacion',
        areaId: 'personas', areaNombre: 'Personas', areaIcono: '👥',
        titulo: 'Diseña un plan de capacitación técnica para cuadrillas',
        detalle: 'Identifica las 3 habilidades técnicas críticas por servicio (ej. riego: hidráulica básica, lectura de planos, programación de controladores). Busca capacitaciones en CECATI, Cámara de la Construcción o fabricantes de materiales.',
        duracion: '2 horas',
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
      {
        id: 'per-o2', dia: 'Miércoles', hora: '11:00', tipo: 'automatizacion',
        areaId: 'personas', areaNombre: 'Personas', areaIcono: '👥',
        titulo: 'Implementa un programa de retención de talento clave',
        detalle: 'Identifica a tus 2-3 personas más valiosas. Diseña un plan de crecimiento individual: aumento programado, mayor responsabilidad, posibilidad de participación en proyectos de mayor envergadura. Retener un encargado experto vale más que un año de reclutamiento.',
        duracion: '2 horas',
      },
    ],
  },

  mercadeo: {
    critico: [
      {
        id: 'mer-c1', dia: 'Martes', hora: '09:00', tipo: 'remediacion',
        areaId: 'mercadeo', areaNombre: 'Mercadeo', areaIcono: '📣',
        titulo: 'Toma fotos de antes/después en tus próximos proyectos activos',
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
      {
        id: 'mer-c3', dia: 'Lunes', hora: '10:00', tipo: 'remediacion',
        areaId: 'mercadeo', areaNombre: 'Mercadeo', areaIcono: '📣',
        titulo: 'Crea una presentación de servicios para enviar a prospectos',
        detalle: 'En Canva o Google Slides: portada con logo, 1 slide por servicio (foto de proyecto + descripción breve + diferencial), slide de contacto. 8-10 slides. Úsala en WhatsApp cuando alguien pregunte "¿qué hacen?".',
        duracion: '3 horas', herramienta: 'Canva (gratis)',
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
      {
        id: 'mer-b2', dia: 'Jueves', hora: '10:00', tipo: 'remediacion',
        areaId: 'mercadeo', areaNombre: 'Mercadeo', areaIcono: '📣',
        titulo: 'Define tu propuesta de valor diferenciada por servicio',
        detalle: 'Para cada servicio, responde: ¿por qué un cliente debería elegirte a ti y no a la competencia? ¿Velocidad? ¿Garantía de servicio? ¿Diseño? ¿Precio? ¿Experiencia en proyectos grandes? Pon esto en tus cotizaciones y presentaciones.',
        duracion: '1.5 horas',
      },
    ],
    medio: [
      {
        id: 'mer-m1', dia: 'Martes', hora: '10:00', tipo: 'optimizacion',
        areaId: 'mercadeo', areaNombre: 'Mercadeo', areaIcono: '📣',
        titulo: 'Implementa seguimiento a cotizaciones abiertas con recordatorio',
        detalle: 'Crea una tabla en Google Sheets: cliente, servicio cotizado, fecha, monto, estado. Cada cotización sin respuesta después de 5 días recibe llamada de seguimiento. Esta sola acción puede cerrar 20-30% más de contratos.',
        duracion: '1 hora', herramienta: 'Google Sheets + calendario',
      },
      {
        id: 'mer-m2', dia: 'Jueves', hora: '11:00', tipo: 'automatizacion',
        areaId: 'mercadeo', areaNombre: 'Mercadeo', areaIcono: '📣',
        titulo: 'Configura WhatsApp Business con respuestas automáticas',
        detalle: 'Mensaje de bienvenida cuando alguien contacta fuera de horario: "Hola, gracias por contactar [empresa]. Atendemos de L-V 7am-6pm. Para cotizaciones envíanos: tipo de proyecto, zona y medidas aproximadas." Clasifica prospectos automáticamente.',
        duracion: '45 minutos', herramienta: 'WhatsApp Business (gratis)', automatizacion: 'Respuesta automática 24/7',
      },
      {
        id: 'mer-m3', dia: 'Viernes', hora: '10:00', tipo: 'optimizacion',
        areaId: 'mercadeo', areaNombre: 'Mercadeo', areaIcono: '📣',
        titulo: 'Diseña una campaña de referidos para clientes actuales',
        detalle: 'Ofrece a clientes satisfechos un descuento del 5% en su próximo servicio por cada cliente referido que cierre. Envía el mensaje a tus últimos 20 clientes esta semana. Los referidos tienen 3-5x más tasa de cierre que prospectos fríos.',
        duracion: '1 hora', herramienta: 'WhatsApp',
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
      {
        id: 'mer-o2', dia: 'Lunes', hora: '11:00', tipo: 'automatizacion',
        areaId: 'mercadeo', areaNombre: 'Mercadeo', areaIcono: '📣',
        titulo: 'Implementa un CRM básico para gestión de prospectos',
        detalle: 'Configura un pipeline en Trello o Notion: Contacto → Cotización enviada → Negociación → Cerrado/Perdido. Agrega todos los prospectos actuales. Esto te da visibilidad del valor real de tu cartera comercial en tiempo real.',
        duracion: '2 horas', herramienta: 'Trello (gratis) / Notion', automatizacion: 'Pipeline de ventas visible en todo momento',
      },
    ],
  },

  estrategia: {
    critico: [
      {
        id: 'est-c1', dia: 'Lunes', hora: '06:00', tipo: 'remediacion',
        areaId: 'estrategia', areaNombre: 'Estrategia', areaIcono: '🎯',
        titulo: 'Escribe tus 3 metas para los próximos 90 días',
        detalle: 'Una meta de ingresos ($___), una meta operativa (ej: "documentar el proceso de instalación de riego"), una meta de equipo (ej: "contratar un maestro de obras para construcción"). Ponla donde la veas diario.',
        duracion: '1 hora',
      },
      {
        id: 'est-c2', dia: 'Miércoles', hora: '17:00', tipo: 'remediacion',
        areaId: 'estrategia', areaNombre: 'Estrategia', areaIcono: '🎯',
        titulo: 'Identifica tu servicio más rentable y decide si lo potencias',
        detalle: 'Revisa los últimos 10 proyectos. ¿Cuáles tomaron menos tiempo y generaron más margen? ¿Riego? ¿Señalética? ¿Paisajismo de alto valor? Ese servicio es tu "vaca lechera" — decide si quieres profundizarlo o diversificarte con construcción.',
        duracion: '1.5 horas',
      },
      {
        id: 'est-c3', dia: 'Viernes', hora: '09:00', tipo: 'remediacion',
        areaId: 'estrategia', areaNombre: 'Estrategia', areaIcono: '🎯',
        titulo: 'Analiza a tus 2 competidores principales',
        detalle: 'Para cada competidor: ¿qué servicios ofrecen?, ¿cómo son sus precios (aproximado)?, ¿en qué zonas operan?, ¿qué dicen sus reseñas de clientes? Este análisis toma 2 horas y define dónde tienes ventaja hoy.',
        duracion: '2 horas', herramienta: 'Google Maps + Facebook + sitio web de competidores',
      },
    ],
    bajo: [
      {
        id: 'est-b1', dia: 'Jueves', hora: '07:00', tipo: 'remediacion',
        areaId: 'estrategia', areaNombre: 'Estrategia', areaIcono: '🎯',
        titulo: 'Define el cliente ideal para cada línea de servicio',
        detalle: 'Para cada servicio (paisajismo, riego, señalética, futura construcción): ¿qué tamaño de proyecto?, ¿qué tipo de cliente (residencial, comercial, gobierno)?, ¿en qué zona geográfica? Esto define a quién buscar y qué cotizar.',
        duracion: '1.5 horas',
      },
      {
        id: 'est-b2', dia: 'Martes', hora: '09:00', tipo: 'remediacion',
        areaId: 'estrategia', areaNombre: 'Estrategia', areaIcono: '🎯',
        titulo: 'Define las métricas de éxito para cada línea de servicio',
        detalle: 'Para paisajismo: margen bruto mínimo, días promedio de ejecución. Para riego: garantía de funcionamiento post-instalación. Para construcción: costo por m² construido, plazo de entrega. Medir es el primer paso para mejorar.',
        duracion: '1.5 horas',
      },
    ],
    medio: [
      {
        id: 'est-m1', dia: 'Martes', hora: '08:00', tipo: 'optimizacion',
        areaId: 'estrategia', areaNombre: 'Estrategia', areaIcono: '🎯',
        titulo: 'Diseña el modelo de negocio para construcción de casas (Canvas)',
        detalle: 'Llena un Business Model Canvas adaptado: ¿quiénes son tus socios clave (arquitectos, notarios, bancos)?, ¿cuál es tu propuesta de valor vs. constructoras?, ¿cómo llegas a los compradores?',
        duracion: '2.5 horas', herramienta: 'Canvanizer (gratis) o papel',
      },
      {
        id: 'est-m2', dia: 'Viernes', hora: '08:00', tipo: 'automatizacion',
        areaId: 'estrategia', areaNombre: 'Estrategia', areaIcono: '🎯',
        titulo: 'Establece un dashboard semanal de 5 indicadores clave',
        detalle: 'Crea en Google Sheets: (1) Proyectos activos, (2) Cotizaciones enviadas vs. cerradas, (3) Margen del mes, (4) Nuevos contactos, (5) Estado de cuentas por cobrar. Actualízalo los viernes. Son 10 minutos que te dan visibilidad total.',
        duracion: '1.5 horas', herramienta: 'Google Sheets', automatizacion: 'Dashboard de gestión actualizado semanalmente',
      },
      {
        id: 'est-m3', dia: 'Miércoles', hora: '11:00', tipo: 'optimizacion',
        areaId: 'estrategia', areaNombre: 'Estrategia', areaIcono: '🎯',
        titulo: 'Establece alianzas estratégicas con arquitectos y diseñadores',
        detalle: 'Identifica 5 arquitectos o diseñadores de interiores en tu zona que trabajen con clientes residenciales. Ofréceles un porcentaje de referido (5-10%) por cada proyecto que te refieran. Un buen aliado puede doblar tu pipeline comercial.',
        duracion: '2 horas',
      },
    ],
    optimo: [
      {
        id: 'est-o1', dia: 'Lunes', hora: '09:00', tipo: 'automatizacion',
        areaId: 'estrategia', areaNombre: 'Estrategia', areaIcono: '🎯',
        titulo: 'Traza el plan de expansión a construcción de casas: 6-12 meses',
        detalle: 'Para iniciar obra residencial necesitas: capital semilla o línea de crédito, permiso de construcción, maestro de obras certificado, y tu primer proyecto piloto. Traza el cronograma mes a mes con hitos claros y responsables.',
        duracion: '3 horas',
      },
      {
        id: 'est-o2', dia: 'Jueves', hora: '10:00', tipo: 'automatizacion',
        areaId: 'estrategia', areaNombre: 'Estrategia', areaIcono: '🎯',
        titulo: 'Define la estructura legal y fiscal para el nuevo servicio de construcción',
        detalle: 'Consulta con un contador o abogado: ¿tu figura fiscal actual soporta obras residenciales?, ¿necesitas cambio de régimen o razón social?, ¿qué permisos municipales requieres para ser constructor? Esto puede tomar 30 días — inícialo ahora.',
        duracion: '2 horas',
      },
    ],
  },
};

function nivelScore(score: number): NivelTarea {
  if (score < 35) return 'critico';
  if (score < 55) return 'bajo';
  if (score < 75) return 'medio';
  return 'optimo';
}

const DIAS: DiaSemana[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

function getBucketsForWeek(nivel: NivelTarea, semana: number): NivelTarea[] {
  const map: Record<NivelTarea, NivelTarea[][]> = {
    critico: [
      ['critico'],          // week 1: fix urgencies
      ['critico', 'bajo'],  // week 2: last urgencies + build foundations
      ['bajo', 'medio'],    // week 3: foundations + optimize
      ['medio', 'optimo'],  // week 4: optimize + scale
    ],
    bajo: [
      ['bajo'],             // week 1: build foundations
      ['bajo', 'medio'],    // week 2: finish foundations + optimize
      ['medio'],            // week 3: optimize
      ['optimo'],           // week 4: scale
    ],
    medio: [
      ['medio'],            // week 1: optimize
      ['medio', 'optimo'],  // week 2: optimize + start scaling
      ['optimo'],           // week 3: scale
      ['optimo'],           // week 4: advanced scale
    ],
    optimo: [
      ['optimo'],           // week 1: scale (already advanced)
      ['optimo'],           // week 2
      ['optimo'],           // week 3
      ['optimo'],           // week 4
    ],
  };
  return map[nivel][semana - 1] ?? ['optimo'];
}

const NOMBRES_FOCUS: Record<string, string> = {
  finanzas: 'Finanzas y Rentabilidad',
  operaciones: 'Procesos Operativos',
  personas: 'Gestión de Personas',
  mercadeo: 'Mercadeo y Captación',
  estrategia: 'Dirección Estratégica',
};

const OBJETIVOS_SEMANA: Record<number, Record<string, string>> = {
  1: {
    finanzas: 'Entender el dinero real que entra y sale de cada proyecto',
    operaciones: 'Ordenar el inventario y documentar los procesos clave de la operación',
    personas: 'Definir roles claros y establecer la rutina de comunicación con el equipo',
    mercadeo: 'Tener presencia básica y empezar a generar el portafolio visual',
    estrategia: 'Escribir las metas del negocio y conocer el terreno competitivo',
  },
  2: {
    finanzas: 'Implementar el costeo real y generar el primer reporte de margen',
    operaciones: 'Establecer checklists, protocolos de mantenimiento y sistema de solicitudes',
    personas: 'Tener el proceso de onboarding listo y política salarial documentada',
    mercadeo: 'Activar Google Business y definir la propuesta de valor diferenciada',
    estrategia: 'Definir el cliente ideal y las métricas de éxito por servicio',
  },
  3: {
    finanzas: 'Implementar presupuesto mensual y análisis de ROI de equipamiento',
    operaciones: 'Tener estándares de calidad documentados y proveedores diversificados',
    personas: 'Primera evaluación de desempeño y plan de capacitación técnica activo',
    mercadeo: 'Sistema de seguimiento a cotizaciones y campaña de referidos en marcha',
    estrategia: 'Canvas de construcción de casas completo y alianzas estratégicas iniciadas',
  },
  4: {
    finanzas: 'Contabilidad conectada a dashboard y plan financiero para construcción',
    operaciones: 'Software de gestión evaluado y flujo operativo de obra residencial definido',
    personas: 'Organigrama de construcción diseñado y programa de retención de talento activo',
    mercadeo: 'CRM implementado y campaña de lanzamiento de construcción de casas lista',
    estrategia: 'Cronograma de expansión trazado y estructura legal para construcción gestionada',
  },
};

const METAS_SEMANA: Record<number, Record<string, Record<NivelTarea, string>>> = {
  1: {
    finanzas: { critico: 'Plantilla de costeo creada y cuenta bancaria empresarial abierta', bajo: 'Primer costeo de mano de obra aplicado a cotización real', medio: 'Reporte de margen del mes anterior calculado', optimo: 'Revisión de ROI de maquinaria completada' },
    operaciones: { critico: 'Inventario físico levantado y proceso #1 documentado', bajo: 'Checklists de cierre creados para los 3 servicios principales', medio: 'Rotación de proveedores implementada para materiales clave', optimo: 'Demo de software de construcción solicitada' },
    personas: { critico: 'Roles del encargado escritos y reunión semanal establecida', bajo: 'Onboarding documentado para nuevas contrataciones', medio: 'Primera evaluación de desempeño aplicada', optimo: 'Organigrama de construcción diseñado' },
    mercadeo: { critico: 'Fotos antes/después tomadas en proyectos activos + 5 reseñas solicitadas', bajo: 'Google Business Profile creado o actualizado', medio: 'Sistema de seguimiento a cotizaciones configurado', optimo: 'Landing de construcción en borrador' },
    estrategia: { critico: '3 metas escritas para los próximos 90 días', bajo: 'Cliente ideal definido por servicio', medio: 'Canvas de construcción completado', optimo: 'Cronograma de expansión borrador listo' },
  },
  2: {
    finanzas: { critico: 'Anticipo del 40% implementado como política oficial', bajo: 'Catálogo de tarifas mínimas definido', medio: 'Presupuesto mensual por servicio activo', optimo: 'Plan de financiamiento para construcción investigado' },
    operaciones: { critico: 'Proceso de levantamiento de campo estandarizado', bajo: 'Sistema de solicitud de materiales activo', medio: 'Estándares de calidad documentados para 2 servicios', optimo: 'Flujo operativo de obra residencial mapeado' },
    personas: { critico: 'Política salarial e incentivos definida', bajo: 'Proceso de contratación documentado', medio: 'Plan de capacitación técnica iniciado', optimo: 'Programa de retención de talento clave activo' },
    mercadeo: { critico: 'Presentación de servicios creada en Canva', bajo: 'Propuesta de valor diferenciada escrita por servicio', medio: 'WhatsApp Business con respuestas automáticas activo', optimo: 'CRM básico con pipeline de ventas configurado' },
    estrategia: { critico: 'Análisis de 2 competidores principales completado', bajo: 'Métricas de éxito definidas por servicio', medio: 'Alianzas estratégicas con 3 arquitectos iniciadas', optimo: 'Estructura legal para construcción consultada' },
  },
  3: {
    finanzas: { critico: 'Control de cuentas por cobrar automatizado', bajo: 'Primer reporte de margen mensual generado', medio: 'ROI de maquinaria analizado', optimo: 'Contabilidad conectada a dashboard de proyectos' },
    operaciones: { critico: 'Grupo de WhatsApp de obra activo en todos los proyectos', bajo: 'Protocolo de mantenimiento preventivo programado', medio: 'Estándares de calidad aplicados en última entrega', optimo: 'Software de gestión de construcción seleccionado' },
    personas: { critico: 'Formulario de incidencias activo y en uso', bajo: 'Primer candidato evaluado con proceso documentado', medio: 'Evaluación trimestral aplicada a todo el equipo', optimo: 'Plan de expansión de equipo para obra residencial listo' },
    mercadeo: { critico: 'Campaña de referidos enviada a 20 clientes', bajo: 'Pipeline de seguimiento de cotizaciones activo', medio: 'Campaña de referidos generando primeras referencias', optimo: 'Campaña de construcción de casas en redes sociales lanzada' },
    estrategia: { critico: 'Dashboard de 5 KPI actualizado semanalmente', bajo: 'Primera alianza estratégica con arquitecto formalizada', medio: 'Canvas revisado con feedback del equipo', optimo: 'Hitos del primer proyecto piloto de construcción definidos' },
  },
  4: {
    finanzas: { critico: 'Reportes financieros automáticos por proyecto activos', bajo: 'Análisis de rentabilidad por servicio completado', medio: 'Sistema contable integrado operativo', optimo: 'Financiamiento para construcción gestionado' },
    operaciones: { critico: 'Flujo operativo de construcción validado con especialista', bajo: 'Manual de operaciones básico compilado', medio: 'Primer proyecto gestionado con herramienta digital', optimo: 'Piloto de construcción con sistema de gestión iniciado' },
    personas: { critico: 'Estructura de equipo de construcción definida', bajo: 'Primer proceso de contratación ejecutado correctamente', medio: 'Segunda ronda de evaluaciones completada', optimo: 'Maestro de obras y residente identificados para primera obra' },
    mercadeo: { critico: 'Estrategia de contenido mensual activa en redes', bajo: 'Tasa de cierre de cotizaciones medida y documentada', medio: 'Pipeline de ventas con 10+ prospectos activos', optimo: 'Primeras consultas de construcción de casas recibidas' },
    estrategia: { critico: 'Plan anual de negocio escrito', bajo: 'OKRs de siguiente trimestre definidos', medio: 'Presentación de proyecto piloto de construcción lista', optimo: 'Primera reunión con socio o financiero para construcción agendada' },
  },
};

export function generarPlanSemanal(resultado: ResultadosDiagnostico): PlanSemanal[] {
  const { scoresPorArea } = resultado;
  const areasOrdenadas = Object.entries(scoresPorArea).sort(([, a], [, b]) => a - b);
  const usadas = new Set<string>();

  const SEMANAS_CONFIG = [
    { num: 1 as const, titulo: 'Semana 1', subtitulo: 'Arranque y correcciones urgentes', plazo: 'Días 1–7' },
    { num: 2 as const, titulo: 'Semana 2', subtitulo: 'Fundamentos y estructura', plazo: 'Días 8–14' },
    { num: 3 as const, titulo: 'Semana 3', subtitulo: 'Optimización de procesos', plazo: 'Días 15–21' },
    { num: 4 as const, titulo: 'Semana 4+', subtitulo: 'Automatización y escalabilidad', plazo: 'Semana 4 en adelante' },
  ];

  return SEMANAS_CONFIG.map(config => {
    const tareas: TareaSemanal[] = [];
    let diaIdx = 0;

    for (const [areaId, score] of areasOrdenadas) {
      const nivel = nivelScore(score);
      const buckets = getBucketsForWeek(nivel, config.num);

      for (const bucket of buckets) {
        const disponibles = (TAREAS_POR_AREA[areaId]?.[bucket] ?? [])
          .filter(t => !usadas.has(t.id));

        for (const tarea of disponibles.slice(0, 1)) {
          const dia = DIAS[diaIdx % DIAS.length];
          diaIdx++;
          tareas.push({ ...tarea, dia });
          usadas.add(tarea.id);
        }
      }
    }

    const tareasFinales = tareas.slice(0, 12);

    // Focus area = weakest area for weeks 1-2, then shifting upward
    const focusIdx = config.num <= 2 ? 0 : Math.min(config.num - 2, areasOrdenadas.length - 1);
    const focusAreaId = areasOrdenadas[focusIdx]?.[0] ?? 'operaciones';

    // Generate metas for this week
    const metasSemana = areasOrdenadas.slice(0, 3).map(([areaId, score]) => {
      const nivel = nivelScore(score);
      return METAS_SEMANA[config.num]?.[areaId]?.[nivel] ?? `Mejorar área de ${areaId}`;
    });

    // Generate objective
    const areaFocusScore = scoresPorArea[focusAreaId] ?? 50;
    const nivelFocus = nivelScore(areaFocusScore);
    const objetivoMap = OBJETIVOS_SEMANA[config.num];
    const objetivo = objetivoMap?.[focusAreaId]
      ?? (config.num === 1 ? 'Identificar y resolver las brechas más urgentes del negocio'
        : config.num === 2 ? 'Construir los sistemas base para operar con orden'
        : config.num === 3 ? 'Optimizar lo que ya funciona y eliminar ineficiencias'
        : 'Automatizar procesos y preparar la expansión a construcción de casas');

    void nivelFocus;

    return {
      semanaNum: config.num,
      semana: config.titulo,
      subtitulo: config.subtitulo,
      plazo: config.plazo,
      objetivo,
      tareas: tareasFinales,
      focusArea: NOMBRES_FOCUS[focusAreaId] ?? focusAreaId,
      metasSemana,
    };
  });
}
