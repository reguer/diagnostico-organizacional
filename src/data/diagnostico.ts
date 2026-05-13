export type ImpactKPI = 'alto' | 'medio' | 'bajo';

export interface Opcion {
  texto: string;
  valor: number;
  impactoKPI: ImpactKPI;
}

export interface Pregunta {
  id: string;
  texto: string;
  descripcion?: string;
  opciones: Opcion[];
}

export interface Area {
  id: string;
  nombre: string;
  descripcion: string;
  icono: string;
  color: string;
  peso: number;
  preguntas: Pregunta[];
}

export const AREAS: Area[] = [
  {
    id: 'estrategia',
    nombre: 'Estrategia',
    descripcion: 'Visión, metas y dirección del negocio',
    icono: '🎯',
    color: '#6366f1',
    peso: 0.20,
    preguntas: [
      {
        id: 'est-1',
        texto: '¿Tienes un plan de negocio o metas escritas para este año?',
        descripcion: 'Proyectos a conseguir, ingresos objetivo, nuevos servicios',
        opciones: [
          { texto: 'Vamos al día, sin plan formal', valor: 1, impactoKPI: 'alto' },
          { texto: 'Tengo metas en mi cabeza pero no escritas', valor: 2, impactoKPI: 'alto' },
          { texto: 'Tengo un documento básico con metas', valor: 3, impactoKPI: 'medio' },
          { texto: 'Plan escrito con KPIs mensuales y revisión periódica', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'est-2',
        texto: '¿Sabes cuáles son tus 3 servicios más rentables?',
        descripcion: 'Ej: sistema de riego, diseño de jardines, señalética vial, proyecto ejecutivo de vivienda',
        opciones: [
          { texto: 'No lo sé, cobramos lo que podemos', valor: 1, impactoKPI: 'alto' },
          { texto: 'Tengo una idea general pero sin datos', valor: 2, impactoKPI: 'alto' },
          { texto: 'Lo sé por experiencia, aunque no lo mido formalmente', valor: 3, impactoKPI: 'medio' },
          { texto: 'Lo tengo calculado con margen real por servicio', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'est-3',
        texto: '¿Cada cuánto revisas el desempeño general de tu empresa?',
        opciones: [
          { texto: 'Nunca formalmente', valor: 1, impactoKPI: 'alto' },
          { texto: 'Cuando hay un problema grave', valor: 2, impactoKPI: 'alto' },
          { texto: 'Cada trimestre revisamos ingresos', valor: 3, impactoKPI: 'medio' },
          { texto: 'Mensualmente con revisión de indicadores clave', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'est-4',
        texto: '¿Tienes definido qué tipo de cliente y proyecto es tu ideal?',
        descripcion: 'Tamaño del proyecto, tipo de cliente, zona geográfica',
        opciones: [
          { texto: 'Aceptamos cualquier trabajo que llegue', valor: 1, impactoKPI: 'alto' },
          { texto: 'Preferimos ciertos proyectos pero no es una regla', valor: 2, impactoKPI: 'medio' },
          { texto: 'Tenemos criterios informales para filtrar proyectos', valor: 3, impactoKPI: 'medio' },
          { texto: 'Perfil de cliente ideal documentado y criterios de aceptación claros', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'est-5',
        texto: '¿Tienes una estrategia para la época de lluvia o baja temporada en campo?',
        descripcion: 'Ej: adelantar trabajos de señalética, proyectos ejecutivos, planificación interna',
        opciones: [
          { texto: 'La baja temporada nos golpea duro, no hay plan', valor: 1, impactoKPI: 'alto' },
          { texto: 'Reducimos gastos pero sin plan concreto', valor: 2, impactoKPI: 'alto' },
          { texto: 'Redirigimos cuadrillas a trabajo de señalética o actividades internas', valor: 3, impactoKPI: 'medio' },
          { texto: 'Plan de contingencia climática activo: señalética, proyectos ejecutivos y fondo de reserva', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'est-7',
        texto: '¿Conoces a tus principales competidores en paisajismo, riego y construcción?',
        descripcion: 'Precios, servicios, zonas geográficas, qué te diferencia de ellos',
        opciones: [
          { texto: 'No sabemos quiénes son ni qué ofrecen', valor: 1, impactoKPI: 'alto' },
          { texto: 'Conocemos algunos por nombre pero no analizamos su oferta', valor: 2, impactoKPI: 'alto' },
          { texto: 'Tenemos clara la diferencia en precios, aunque no en servicios', valor: 3, impactoKPI: 'medio' },
          { texto: 'Análisis de competidores actualizado: precios, fortalezas, debilidades y diferenciadores nuestros', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'est-6',
        texto: '¿Cuánto depende la empresa de ti personalmente para operar?',
        descripcion: 'Si te ausentas una semana, ¿qué pasa?',
        opciones: [
          { texto: 'Sin mí todo se para, soy irremplazable hoy', valor: 1, impactoKPI: 'alto' },
          { texto: 'El encargado puede cubrir 1-2 días pero nada más', valor: 2, impactoKPI: 'alto' },
          { texto: 'Pueden operar una semana con mis instrucciones', valor: 3, impactoKPI: 'medio' },
          { texto: 'El equipo opera con autonomía, yo superviso resultados', valor: 4, impactoKPI: 'bajo' },
        ],
      },
    ],
  },
  {
    id: 'finanzas',
    nombre: 'Finanzas',
    descripcion: 'Control de costos, márgenes y flujo de caja',
    icono: '💰',
    color: '#10b981',
    peso: 0.25,
    preguntas: [
      {
        id: 'fin-1',
        texto: '¿Calculas el costo real de cada proyecto ANTES de cotizar?',
        descripcion: 'Materiales, mano de obra, maquinaria, imprevistos',
        opciones: [
          { texto: 'Cotizamos por intuición o lo que cobra la competencia', valor: 1, impactoKPI: 'alto' },
          { texto: 'Calculamos solo materiales, no la mano de obra', valor: 2, impactoKPI: 'alto' },
          { texto: 'Calculamos la mayoría de costos con una hoja de cálculo', valor: 3, impactoKPI: 'medio' },
          { texto: 'Costeo completo: materiales + MO + maquinaria + overhead + margen', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'fin-2',
        texto: '¿Sabes cuál fue tu margen de ganancia real el mes pasado?',
        opciones: [
          { texto: 'No llevo ese control', valor: 1, impactoKPI: 'alto' },
          { texto: 'Sé si quedé positivo o negativo, pero no el porcentaje', valor: 2, impactoKPI: 'alto' },
          { texto: 'Tengo una aproximación, puede variar bastante', valor: 3, impactoKPI: 'medio' },
          { texto: 'Sí, con estado de resultados mensual claro', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'fin-3',
        texto: '¿Cómo manejas el flujo de caja cuando un cliente se atrasa en pagar?',
        opciones: [
          { texto: 'Nos descapitalizamos y paramos otros proyectos', valor: 1, impactoKPI: 'alto' },
          { texto: 'Pedimos un adelanto al siguiente cliente para cubrir', valor: 2, impactoKPI: 'alto' },
          { texto: 'Tenemos un fondo de emergencia pequeño', valor: 3, impactoKPI: 'medio' },
          { texto: 'Política de anticipos + línea de crédito + fondo de contingencia', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'fin-4',
        texto: '¿Tienes separadas las finanzas del negocio de tus finanzas personales?',
        opciones: [
          { texto: 'Todo cae en la misma cuenta, no hay separación', valor: 1, impactoKPI: 'alto' },
          { texto: 'Tenemos cuentas separadas pero mezclamos gastos a veces', valor: 2, impactoKPI: 'medio' },
          { texto: 'Cuentas separadas, pero sin contabilidad formal', valor: 3, impactoKPI: 'medio' },
          { texto: 'Empresa con contabilidad propia, sueldo fijo del dueño', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'fin-5',
        texto: '¿Con qué frecuencia emites facturas/contratos formales a tus clientes?',
        opciones: [
          { texto: 'Rara vez, trabajamos de palabra', valor: 1, impactoKPI: 'alto' },
          { texto: 'En proyectos grandes, en los pequeños no', valor: 2, impactoKPI: 'medio' },
          { texto: 'La mayoría de las veces emitimos documento', valor: 3, impactoKPI: 'medio' },
          { texto: 'Siempre: contrato + anticipo + factura por avance', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'fin-6',
        texto: '¿Tienes claro cuánto te cuesta cada hora de trabajo de tu cuadrilla en campo?',
        descripcion: 'Salario + cargas sociales + transporte + desgaste de herramienta',
        opciones: [
          { texto: 'Solo sé el salario, no los costos indirectos', valor: 1, impactoKPI: 'alto' },
          { texto: 'Tengo una idea aproximada del costo total', valor: 2, impactoKPI: 'alto' },
          { texto: 'Calculado para los cargos principales', valor: 3, impactoKPI: 'medio' },
          { texto: 'Costo/hora completo por rol, actualizado trimestralmente', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'fin-7',
        texto: '¿Comparas el presupuesto proyectado de un proyecto vs. el costo real al terminar?',
        descripcion: 'Cierre financiero de cada obra',
        opciones: [
          { texto: 'Nunca comparamos, el proyecto termina y ya', valor: 1, impactoKPI: 'alto' },
          { texto: 'Cuando hubo pérdida notable, analizamos qué pasó', valor: 2, impactoKPI: 'alto' },
          { texto: 'En proyectos grandes hacemos cierre informal', valor: 3, impactoKPI: 'medio' },
          { texto: 'Cierre financiero en todos los proyectos, con lecciones aprendidas', valor: 4, impactoKPI: 'bajo' },
        ],
      },
    ],
  },
  {
    id: 'mercadeo',
    nombre: 'Mercadeo',
    descripcion: 'Captación de clientes y posicionamiento',
    icono: '📣',
    color: '#f59e0b',
    peso: 0.20,
    preguntas: [
      {
        id: 'mer-1',
        texto: '¿Cómo consigues la mayoría de tus clientes nuevos?',
        opciones: [
          { texto: 'Solo por referidos de conocidos, sin ninguna estrategia', valor: 1, impactoKPI: 'alto' },
          { texto: 'Referidos + alguna publicación ocasional en redes', valor: 2, impactoKPI: 'medio' },
          { texto: 'Presencia activa en redes + referidos sistemáticos', valor: 3, impactoKPI: 'medio' },
          { texto: 'Múltiples canales: digital, referidos, alianzas y seguimiento activo', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'mer-2',
        texto: '¿Tienes un portafolio visual de tus proyectos terminados?',
        descripcion: 'Fotos antes/después, videos, casos de éxito',
        opciones: [
          { texto: 'No tenemos fotos organizadas ni portafolio', valor: 1, impactoKPI: 'alto' },
          { texto: 'Algunas fotos en el celular pero nada organizado', valor: 2, impactoKPI: 'alto' },
          { texto: 'Álbum digital o perfil de redes con proyectos seleccionados', valor: 3, impactoKPI: 'medio' },
          { texto: 'Portafolio profesional con antes/después, testimonios y métricas', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'mer-3',
        texto: '¿Tienes un proceso para dar seguimiento a cotizaciones que no se cerraron?',
        opciones: [
          { texto: 'Si no llaman, no hacemos nada', valor: 1, impactoKPI: 'alto' },
          { texto: 'A veces llamamos a los más grandes', valor: 2, impactoKPI: 'alto' },
          { texto: 'Seguimiento informal a los prospectos recientes', valor: 3, impactoKPI: 'medio' },
          { texto: 'CRM simple con seguimiento programado a todos los prospectos', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'mer-4',
        texto: '¿Sabes cuánto te cuesta conseguir un cliente nuevo?',
        opciones: [
          { texto: 'No lo mido', valor: 1, impactoKPI: 'alto' },
          { texto: 'Sé lo que gasto en publicidad pero no lo relaciono con clientes', valor: 2, impactoKPI: 'medio' },
          { texto: 'Tengo una idea aproximada', valor: 3, impactoKPI: 'medio' },
          { texto: 'Calculo el Costo de Adquisición de Cliente (CAC) por canal', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'mer-5',
        texto: '¿Tu empresa tiene identidad visual definida y comunicación de marca consistente?',
        descripcion: 'Logo, colores, vehículos rotulados, uniformes, material de cotización',
        opciones: [
          { texto: 'No tenemos logo ni imagen uniforme, cada quien hace lo suyo', valor: 1, impactoKPI: 'alto' },
          { texto: 'Tenemos logo pero no se aplica de forma consistente', valor: 2, impactoKPI: 'alto' },
          { texto: 'Logo e imagen básica en redes y cotizaciones', valor: 3, impactoKPI: 'medio' },
          { texto: 'Identidad visual completa: logo, plantillas, vehículos, uniformes y tono de comunicación definido', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'mer-6',
        texto: '¿Pides testimonios y reseñas a tus clientes satisfechos?',
        descripcion: 'Google, redes sociales, WhatsApp para mostrar a prospectos',
        opciones: [
          { texto: 'Nunca lo hacemos, nos da pena pedir', valor: 1, impactoKPI: 'alto' },
          { texto: 'A veces cuando el cliente lo ofrece espontáneamente', valor: 2, impactoKPI: 'medio' },
          { texto: 'Lo pedimos en proyectos grandes ocasionalmente', valor: 3, impactoKPI: 'medio' },
          { texto: 'Proceso sistemático: al terminar cada proyecto pedimos reseña + foto', valor: 4, impactoKPI: 'bajo' },
        ],
      },
    ],
  },
  {
    id: 'operaciones',
    nombre: 'Operaciones',
    descripcion: 'Ejecución de proyectos, inventario y procesos',
    icono: '⚙️',
    color: '#3b82f6',
    peso: 0.20,
    preguntas: [
      {
        id: 'ops-1',
        texto: '¿Cómo controlas el inventario de herramientas, equipo y maquinaria?',
        opciones: [
          { texto: 'No sabemos dónde están las herramientas la mitad del tiempo', valor: 1, impactoKPI: 'alto' },
          { texto: 'Llevamos control informal en papel o de memoria', valor: 2, impactoKPI: 'alto' },
          { texto: 'Tenemos un Excel con inventario actualizado ocasionalmente', valor: 3, impactoKPI: 'medio' },
          { texto: 'Sistema digital con responsable por cuadrilla y revisión semanal', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'ops-2',
        texto: '¿Tienes procesos documentados para los trabajos más frecuentes?',
        descripcion: 'Ej: checklist de instalación de riego, protocolo de señalética, cierre de obra residencial',
        opciones: [
          { texto: 'Todo depende de la experiencia de cada trabajador', valor: 1, impactoKPI: 'alto' },
          { texto: 'El encargado conoce los pasos, pero no están escritos', valor: 2, impactoKPI: 'alto' },
          { texto: 'Algunos procesos clave documentados en papel o fotos', valor: 3, impactoKPI: 'medio' },
          { texto: 'Manual de operaciones con checklists y estándares de calidad', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'ops-3',
        texto: '¿Cómo planificas el uso de cuadrillas y maquinaria semana a semana?',
        opciones: [
          { texto: 'Día a día según lo que surge', valor: 1, impactoKPI: 'alto' },
          { texto: 'Asignamos al inicio de semana de manera informal', valor: 2, impactoKPI: 'medio' },
          { texto: 'Calendario semanal con proyectos y cuadrillas asignadas', valor: 3, impactoKPI: 'medio' },
          { texto: 'Planificación quincenal con optimización de rutas y recursos', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'ops-4',
        texto: '¿Qué pasa cuando llueve varios días seguidos y no puedes trabajar en campo?',
        opciones: [
          { texto: 'La cuadrilla no trabaja y no generamos ingreso', valor: 1, impactoKPI: 'alto' },
          { texto: 'Hacemos trabajos internos pero sin plan definido', valor: 2, impactoKPI: 'alto' },
          { texto: 'Tenemos algunos trabajos alternativos planificados (bodegas, talleres)', valor: 3, impactoKPI: 'medio' },
          { texto: 'Plan de contingencia climática con tareas internas y mantenimiento preventivo', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'ops-5',
        texto: '¿Cómo garantizas que la calidad del trabajo en campo cumple el estándar pactado?',
        descripcion: 'Control de calidad antes de entregar al cliente — aplica a paisajismo, riego y señalética',
        opciones: [
          { texto: 'Confiamos en la experiencia de la cuadrilla, sin revisión formal', valor: 1, impactoKPI: 'alto' },
          { texto: 'El encargado revisa antes de avisar al cliente', valor: 2, impactoKPI: 'alto' },
          { texto: 'Checklist de entrega informal con fotos del resultado', valor: 3, impactoKPI: 'medio' },
          { texto: 'Protocolo de cierre: checklist firmado + foto documental + encuesta de satisfacción', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'ops-7',
        texto: '¿Das seguimiento post-entrega a tus proyectos (garantía, ajustes, satisfacción)?',
        descripcion: 'Revisión de sistemas de riego instalados, ajustes de señalética, verificación de obra',
        opciones: [
          { texto: 'Entregamos y no volvemos a menos que haya una queja grave', valor: 1, impactoKPI: 'alto' },
          { texto: 'Llamamos si el cliente lo pide, pero no tenemos protocolo', valor: 2, impactoKPI: 'alto' },
          { texto: 'Revisión de cortesía en la primera semana post-entrega', valor: 3, impactoKPI: 'medio' },
          { texto: 'Protocolo de garantía activo: seguimiento a los 7 y 30 días + contacto para nuevos proyectos', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'ops-6',
        texto: '¿Llevas registro de proveedores de materiales y comparas precios regularmente?',
        descripcion: 'Tierra, plantas, cemento, acero, químicos, combustible',
        opciones: [
          { texto: 'Compramos siempre al mismo proveedor sin comparar', valor: 1, impactoKPI: 'alto' },
          { texto: 'Comparamos precios cuando el gasto es muy grande', valor: 2, impactoKPI: 'medio' },
          { texto: 'Tenemos 2-3 proveedores alternativos para los materiales principales', valor: 3, impactoKPI: 'medio' },
          { texto: 'Base de proveedores homologada con comparativa trimestral de precios', valor: 4, impactoKPI: 'bajo' },
        ],
      },
    ],
  },
  {
    id: 'personas',
    nombre: 'Gestión de Personas',
    descripcion: 'Equipo, contratación y retención del talento',
    icono: '👥',
    color: '#ec4899',
    peso: 0.15,
    preguntas: [
      {
        id: 'per-1',
        texto: '¿Tienes descripciones de rol escritas para tus trabajadores clave?',
        descripcion: 'Encargado de cuadrilla, operador de maquinaria, jardinero oficial',
        opciones: [
          { texto: 'Nadie sabe exactamente qué se espera de ellos por escrito', valor: 1, impactoKPI: 'alto' },
          { texto: 'Los roles se dan de palabra cuando entra alguien nuevo', valor: 2, impactoKPI: 'alto' },
          { texto: 'Descripción básica del puesto para los cargos principales', valor: 3, impactoKPI: 'medio' },
          { texto: 'Manual de funciones con responsabilidades, metas y criterios de evaluación', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'per-2',
        texto: '¿Cómo mides la productividad de tus cuadrillas?',
        opciones: [
          { texto: 'No la medimos, sabemos si algo sale mal por quejas del cliente', valor: 1, impactoKPI: 'alto' },
          { texto: 'El encargado tiene noción de quién trabaja bien o no', valor: 2, impactoKPI: 'alto' },
          { texto: 'Revisamos el avance de proyectos y el tiempo usado', valor: 3, impactoKPI: 'medio' },
          { texto: 'Indicadores por cuadrilla: m² por hora, calidad, puntualidad, sin accidentes', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'per-3',
        texto: '¿Cuánto tiempo lleva en promedio un trabajador nuevo siendo productivo?',
        opciones: [
          { texto: 'Meses, aprender aquí es ensayo y error', valor: 1, impactoKPI: 'alto' },
          { texto: 'Varias semanas, el encargado lo va enseñando de a poco', valor: 2, impactoKPI: 'alto' },
          { texto: '1-2 semanas con acompañamiento del encargado', valor: 3, impactoKPI: 'medio' },
          { texto: 'Primera semana con onboarding estructurado y guía de procesos', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'per-4',
        texto: '¿Cuál es tu tasa de rotación de personal en campo en el último año?',
        opciones: [
          { texto: 'Alta: más de la mitad del equipo cambió', valor: 1, impactoKPI: 'alto' },
          { texto: 'Media-alta: 3-4 personas se fueron', valor: 2, impactoKPI: 'alto' },
          { texto: 'Media: 1-2 personas, el núcleo se mantiene', valor: 3, impactoKPI: 'medio' },
          { texto: 'Baja: equipo estable con plan de retención activo', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'per-5',
        texto: '¿Tienes un proceso claro para resolver conflictos dentro de las cuadrillas?',
        descripcion: 'Peleas entre trabajadores, incumplimiento, problemas de conducta',
        opciones: [
          { texto: 'Resuelvo todo yo personalmente cuando me llega el problema', valor: 1, impactoKPI: 'alto' },
          { texto: 'El encargado lo maneja como pueda, sin guía', valor: 2, impactoKPI: 'alto' },
          { texto: 'Hay lineamientos básicos que el encargado conoce', valor: 3, impactoKPI: 'medio' },
          { texto: 'Protocolo de disciplina progresiva documentado y conocido por todos', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'per-6',
        texto: '¿Ofreces algún incentivo o reconocimiento al buen desempeño?',
        descripcion: 'Bonos por proyecto, reconocimiento público, crecimiento de rol',
        opciones: [
          { texto: 'Solo el salario fijo, no hay nada adicional', valor: 1, impactoKPI: 'alto' },
          { texto: 'A veces damos algo extra cuando hubo muy buena temporada', valor: 2, impactoKPI: 'alto' },
          { texto: 'Bono informal ocasional para quienes destacan', valor: 3, impactoKPI: 'medio' },
          { texto: 'Programa de incentivos: bonos por proyecto, ascensos y reconocimientos formales', valor: 4, impactoKPI: 'bajo' },
        ],
      },
    ],
  },
];
