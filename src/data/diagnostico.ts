import type { ActividadConstruccion } from '../lib/config';

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
  versiones: ('general' | 'construccion')[];
  nivel: 'basico' | 'completo';
  subarea: string;
  actividades?: ActividadConstruccion[];
  requiresEmployees?: true;
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
  // ─────────────────────────────────────────────
  // ESTRATEGIA
  // ─────────────────────────────────────────────
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
        versiones: ['general', 'construccion'], nivel: 'basico', subarea: 'corto_plazo',
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
        versiones: ['general', 'construccion'], nivel: 'basico', subarea: 'corto_plazo',
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
        versiones: ['general', 'construccion'], nivel: 'basico', subarea: 'corto_plazo',
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
        versiones: ['general', 'construccion'], nivel: 'basico', subarea: 'analisis_ambiental',
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
        versiones: ['construccion'], nivel: 'basico', subarea: 'corto_plazo',
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
        versiones: ['general', 'construccion'], nivel: 'basico', subarea: 'analisis_ambiental',
        texto: '¿Conoces a tus principales competidores y qué te diferencia de ellos?',
        descripcion: 'Precios, servicios, zonas geográficas, fortalezas y debilidades de cada uno',
        opciones: [
          { texto: 'No sabemos quiénes son ni qué ofrecen', valor: 1, impactoKPI: 'alto' },
          { texto: 'Conocemos algunos por nombre pero no analizamos su oferta', valor: 2, impactoKPI: 'alto' },
          { texto: 'Tenemos clara la diferencia en precios, aunque no en servicios', valor: 3, impactoKPI: 'medio' },
          { texto: 'Análisis de competidores actualizado: precios, fortalezas, debilidades y diferenciadores nuestros', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'est-6',
        versiones: ['general', 'construccion'], nivel: 'basico', subarea: 'analisis_ambiental',
        texto: '¿Cuánto depende la empresa de ti personalmente para operar?',
        descripcion: 'Si te ausentas una semana, ¿qué pasa?',
        opciones: [
          { texto: 'Sin mí todo se para, soy irremplazable hoy', valor: 1, impactoKPI: 'alto' },
          { texto: 'El encargado puede cubrir 1-2 días pero nada más', valor: 2, impactoKPI: 'alto' },
          { texto: 'Pueden operar una semana con mis instrucciones', valor: 3, impactoKPI: 'medio' },
          { texto: 'El equipo opera con autonomía, yo superviso resultados', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      // ── COMPLETO ─────────────────────────────
      {
        id: 'est-8',
        versiones: ['general', 'construccion'], nivel: 'completo', subarea: 'mediano_plazo',
        texto: '¿Tienes un plan de crecimiento a 2-3 años?',
        descripcion: 'Nuevos servicios, expansión geográfica, alianzas, tamaño del equipo',
        opciones: [
          { texto: 'No pensamos más allá del mes en curso', valor: 1, impactoKPI: 'alto' },
          { texto: 'Tengo una idea de a dónde quiero llegar, sin documento', valor: 2, impactoKPI: 'alto' },
          { texto: 'Plan informal escrito con hitos aproximados', valor: 3, impactoKPI: 'medio' },
          { texto: 'Plan de crecimiento documentado con hitos, KPIs y responsables por año', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'est-9',
        versiones: ['general', 'construccion'], nivel: 'completo', subarea: 'mediano_plazo',
        texto: '¿Tu empresa busca activamente innovar en sus servicios o formas de trabajo?',
        descripcion: 'Nuevas tecnologías, nuevos materiales, procesos más eficientes',
        opciones: [
          { texto: 'Hacemos siempre lo mismo, la innovación no es prioridad', valor: 1, impactoKPI: 'medio' },
          { texto: 'A veces exploramos cosas nuevas si el cliente lo pide', valor: 2, impactoKPI: 'medio' },
          { texto: 'Estamos atentos a tendencias y adoptamos mejoras ocasionalmente', valor: 3, impactoKPI: 'bajo' },
          { texto: 'Innovación sistemática: presupuesto, tiempo y responsable asignados', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'est-10',
        versiones: ['general', 'construccion'], nivel: 'completo', subarea: 'largo_plazo',
        texto: '¿Tienes un plan de contingencia ante crisis económica o pérdida de clientes clave?',
        opciones: [
          { texto: 'No tenemos ningún plan, reaccionamos cuando pasa', valor: 1, impactoKPI: 'alto' },
          { texto: 'Tenemos algunos ahorros pero sin estrategia definida', valor: 2, impactoKPI: 'alto' },
          { texto: 'Tenemos diversificación de clientes como medida básica', valor: 3, impactoKPI: 'medio' },
          { texto: 'Plan documentado: fondo de reserva, diversificación, opciones de crédito y plan B de operación', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'est-11',
        versiones: ['general', 'construccion'], nivel: 'completo', subarea: 'analisis_ambiental',
        texto: '¿Tu empresa cumple con los permisos, licencias y regulaciones requeridos para operar?',
        descripcion: 'Registro fiscal, permisos municipales, licencias de construcción, normativas ambientales',
        opciones: [
          { texto: 'No sabemos qué permisos necesitamos en total', valor: 1, impactoKPI: 'alto' },
          { texto: 'Tenemos los básicos pero sabemos que falta algo', valor: 2, impactoKPI: 'alto' },
          { texto: 'Cumplimos con la mayoría, con pendientes menores', valor: 3, impactoKPI: 'medio' },
          { texto: 'Cumplimiento regulatorio completo y actualizado, con calendario de renovaciones', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'est-12',
        versiones: ['general', 'construccion'], nivel: 'completo', subarea: 'largo_plazo',
        texto: '¿Tu empresa practica alguna forma de responsabilidad social o ambiental?',
        descripcion: 'Uso de materiales ecológicos, gestión de residuos, proveedores locales, impacto comunitario',
        opciones: [
          { texto: 'No está en nuestro radar actualmente', valor: 1, impactoKPI: 'bajo' },
          { texto: 'A veces tomamos decisiones pensando en el impacto, sin política formal', valor: 2, impactoKPI: 'bajo' },
          { texto: 'Tenemos algunas prácticas establecidas (reciclaje, proveedores locales)', valor: 3, impactoKPI: 'bajo' },
          { texto: 'Política de RSE documentada con metas medibles y comunicada al equipo', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'est-13',
        versiones: ['general', 'construccion'], nivel: 'completo', subarea: 'analisis_ambiental',
        texto: '¿Tienes alianzas activas con otros profesionales o empresas complementarias?',
        descripcion: 'Arquitectos, inmobiliarias, proveedores estratégicos, asociaciones del sector',
        opciones: [
          { texto: 'No tenemos alianzas formales ni informales', valor: 1, impactoKPI: 'alto' },
          { texto: 'Conocemos a colegas del sector pero sin nada establecido', valor: 2, impactoKPI: 'medio' },
          { texto: 'Acuerdos informales de referidos con algunos contactos clave', valor: 3, impactoKPI: 'medio' },
          { texto: 'Alianzas formalizadas con beneficio mutuo, pipeline compartido y contacto regular', valor: 4, impactoKPI: 'bajo' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // FINANZAS
  // ─────────────────────────────────────────────
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
        versiones: ['general', 'construccion'], nivel: 'basico', subarea: 'margen_rentabilidad',
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
        versiones: ['general', 'construccion'], nivel: 'basico', subarea: 'margen_rentabilidad',
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
        versiones: ['general', 'construccion'], nivel: 'basico', subarea: 'control_financiero',
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
        versiones: ['general', 'construccion'], nivel: 'basico', subarea: 'control_financiero',
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
        versiones: ['general', 'construccion'], nivel: 'basico', subarea: 'control_financiero',
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
        versiones: ['general', 'construccion'], nivel: 'basico', subarea: 'margen_rentabilidad',
        texto: '¿Tienes claro cuánto te cuesta cada hora de trabajo de tu equipo en campo?',
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
        versiones: ['general', 'construccion'], nivel: 'basico', subarea: 'margen_rentabilidad',
        texto: '¿Comparas el presupuesto proyectado de un proyecto vs. el costo real al terminar?',
        descripcion: 'Cierre financiero de cada obra',
        opciones: [
          { texto: 'Nunca comparamos, el proyecto termina y ya', valor: 1, impactoKPI: 'alto' },
          { texto: 'Cuando hubo pérdida notable, analizamos qué pasó', valor: 2, impactoKPI: 'alto' },
          { texto: 'En proyectos grandes hacemos cierre informal', valor: 3, impactoKPI: 'medio' },
          { texto: 'Cierre financiero en todos los proyectos, con lecciones aprendidas', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      // ── COMPLETO ─────────────────────────────
      {
        id: 'fin-8',
        versiones: ['general', 'construccion'], nivel: 'completo', subarea: 'planificacion_fin',
        texto: '¿Tienes una reserva de capital para emergencias o inversión futura?',
        descripcion: 'Fondo equivalente a 1-3 meses de gastos fijos',
        opciones: [
          { texto: 'No tenemos ninguna reserva', valor: 1, impactoKPI: 'alto' },
          { texto: 'Algo hay, pero no está separado ni calculado', valor: 2, impactoKPI: 'alto' },
          { texto: 'Reserva informal equivalente a unas semanas de operación', valor: 3, impactoKPI: 'medio' },
          { texto: 'Fondo de reserva formalizado: mínimo 2 meses de gastos fijos separados', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'fin-9',
        versiones: ['general', 'construccion'], nivel: 'completo', subarea: 'indicadores_fin',
        texto: '¿Distingues claramente entre costos fijos y costos variables en tu negocio?',
        descripcion: 'Fijos: renta, sueldos base. Variables: materiales por proyecto, combustible',
        opciones: [
          { texto: 'No hago esa distinción, todo es "gastos"', valor: 1, impactoKPI: 'alto' },
          { texto: 'Intuitivamente sé cuál es cuál, sin registro formal', valor: 2, impactoKPI: 'alto' },
          { texto: 'Los tengo identificados aunque no siempre actualizados', valor: 3, impactoKPI: 'medio' },
          { texto: 'Clasificados, actualizados y usados para calcular el punto de equilibrio', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'fin-10',
        versiones: ['general', 'construccion'], nivel: 'completo', subarea: 'planificacion_fin',
        texto: '¿Realizas proyección de ingresos para los próximos 3-6 meses?',
        descripcion: 'Proyectos confirmados + pipeline probable',
        opciones: [
          { texto: 'No proyectamos, dependemos de lo que llegue', valor: 1, impactoKPI: 'alto' },
          { texto: 'Tengo idea de lo que viene en el mes, nada más', valor: 2, impactoKPI: 'alto' },
          { texto: 'Proyección informal de 2-3 meses basada en proyectos en cartera', valor: 3, impactoKPI: 'medio' },
          { texto: 'Proyección formal trimestral o semestral con escenarios optimista/conservador', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'fin-11',
        versiones: ['general', 'construccion'], nivel: 'completo', subarea: 'planificacion_fin',
        texto: '¿Tienes acceso a financiamiento empresarial si lo necesitas?',
        descripcion: 'Línea de crédito, préstamo pre-aprobado, socio financiero',
        opciones: [
          { texto: 'No, y no sabemos cómo acceder a él', valor: 1, impactoKPI: 'alto' },
          { texto: 'Hemos pensado en ello pero nunca lo hemos gestionado', valor: 2, impactoKPI: 'alto' },
          { texto: 'Tenemos contacto con algún banco, sin producto activo', valor: 3, impactoKPI: 'medio' },
          { texto: 'Línea de crédito activa o producto financiero listo para usar cuando se requiera', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'fin-12',
        versiones: ['general', 'construccion'], nivel: 'completo', subarea: 'indicadores_fin',
        texto: '¿Mides indicadores financieros clave de manera regular?',
        descripcion: 'ROI por proyecto, punto de equilibrio mensual, rotación de cuentas por cobrar',
        opciones: [
          { texto: 'No medimos indicadores financieros formalmente', valor: 1, impactoKPI: 'alto' },
          { texto: 'Solo seguimos el saldo bancario', valor: 2, impactoKPI: 'alto' },
          { texto: 'Revisamos margen e ingresos, sin más detalle', valor: 3, impactoKPI: 'medio' },
          { texto: 'Dashboard financiero mensual: margen, ROI, CxC, punto de equilibrio', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'fin-13',
        versiones: ['general', 'construccion'], nivel: 'completo', subarea: 'control_financiero',
        texto: '¿Tienes seguro de responsabilidad civil o cobertura para daños en proyectos?',
        descripcion: 'Protección ante errores, daños a terceros o accidentes en obra que afecten al cliente',
        opciones: [
          { texto: 'No tenemos ningún seguro empresarial', valor: 1, impactoKPI: 'alto' },
          { texto: 'Sabemos que necesitamos uno pero no lo hemos contratado', valor: 2, impactoKPI: 'alto' },
          { texto: 'Tenemos seguro de equipo pero no de responsabilidad civil', valor: 3, impactoKPI: 'medio' },
          { texto: 'Seguro de responsabilidad civil activo con cobertura adecuada al tipo de obra', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'fin-14',
        versiones: ['general', 'construccion'], nivel: 'completo', subarea: 'planificacion_fin',
        texto: '¿Tienes un presupuesto anual de operación aprobado para el negocio?',
        descripcion: 'Gastos fijos proyectados, nómina, materiales, marketing e inversión del año',
        opciones: [
          { texto: 'Gastos mes a mes según lo que entra, sin presupuesto formal', valor: 1, impactoKPI: 'alto' },
          { texto: 'Presupuesto mental del dueño, sin documento escrito', valor: 2, impactoKPI: 'alto' },
          { texto: 'Estimado de gastos fijos anuales en hoja de cálculo', valor: 3, impactoKPI: 'medio' },
          { texto: 'Presupuesto anual aprobado por rubro con seguimiento mensual de desviaciones', valor: 4, impactoKPI: 'bajo' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // MERCADEO
  // ─────────────────────────────────────────────
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
        versiones: ['general', 'construccion'], nivel: 'basico', subarea: 'planificacion_mkt',
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
        versiones: ['general', 'construccion'], nivel: 'basico', subarea: 'planificacion_mkt',
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
        versiones: ['general', 'construccion'], nivel: 'basico', subarea: 'relacion_clientes',
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
        versiones: ['general', 'construccion'], nivel: 'basico', subarea: 'planificacion_mkt',
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
        versiones: ['general', 'construccion'], nivel: 'basico', subarea: 'planificacion_mkt',
        texto: '¿Tu empresa tiene identidad visual definida y comunicación de marca consistente?',
        descripcion: 'Logo, colores, vehículos rotulados, uniformes, material de cotización',
        opciones: [
          { texto: 'No tenemos logo ni imagen uniforme', valor: 1, impactoKPI: 'alto' },
          { texto: 'Tenemos logo pero no se aplica de forma consistente', valor: 2, impactoKPI: 'alto' },
          { texto: 'Logo e imagen básica en redes y cotizaciones', valor: 3, impactoKPI: 'medio' },
          { texto: 'Identidad visual completa: logo, plantillas, vehículos, uniformes y tono definido', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'mer-6',
        versiones: ['general', 'construccion'], nivel: 'basico', subarea: 'relacion_clientes',
        texto: '¿Pides testimonios y reseñas a tus clientes satisfechos?',
        descripcion: 'Google, redes sociales, WhatsApp para mostrar a prospectos',
        opciones: [
          { texto: 'Nunca lo hacemos', valor: 1, impactoKPI: 'alto' },
          { texto: 'A veces cuando el cliente lo ofrece espontáneamente', valor: 2, impactoKPI: 'medio' },
          { texto: 'Lo pedimos en proyectos grandes ocasionalmente', valor: 3, impactoKPI: 'medio' },
          { texto: 'Proceso sistemático: al terminar cada proyecto pedimos reseña + foto', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      // ── COMPLETO ─────────────────────────────
      {
        id: 'mer-7',
        versiones: ['general', 'construccion'], nivel: 'completo', subarea: 'planificacion_mkt',
        texto: '¿Tienes un presupuesto definido para marketing y publicidad?',
        opciones: [
          { texto: 'No destinamos dinero específico a marketing', valor: 1, impactoKPI: 'alto' },
          { texto: 'Gastamos en publicidad cuando hay excedente de caja', valor: 2, impactoKPI: 'medio' },
          { texto: 'Presupuesto informal, varía mucho mes a mes', valor: 3, impactoKPI: 'medio' },
          { texto: 'Presupuesto anual de marketing definido como % de ventas', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'mer-8',
        versiones: ['general', 'construccion'], nivel: 'completo', subarea: 'medios_online',
        texto: '¿Realizas campañas activas en redes sociales o Google Ads?',
        opciones: [
          { texto: 'No invertimos en publicidad digital', valor: 1, impactoKPI: 'alto' },
          { texto: 'Hemos probado alguna vez sin estrategia clara', valor: 2, impactoKPI: 'medio' },
          { texto: 'Campañas ocasionales en temporada alta', valor: 3, impactoKPI: 'medio' },
          { texto: 'Campañas activas, segmentadas y con presupuesto mensual definido', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'mer-9',
        versiones: ['general', 'construccion'], nivel: 'completo', subarea: 'medios_online',
        texto: '¿Mides los resultados de tus acciones de marketing?',
        descripcion: 'Alcance, leads generados, tasa de conversión, retorno de publicidad',
        opciones: [
          { texto: 'No medimos nada, publicamos y ya', valor: 1, impactoKPI: 'alto' },
          { texto: 'Vemos likes y seguidores, pero no leads ni ventas', valor: 2, impactoKPI: 'alto' },
          { texto: 'Contamos cuántos clientes vienen por redes o recomendación', valor: 3, impactoKPI: 'medio' },
          { texto: 'Métricas por canal: leads, conversión, CAC y ROI de marketing', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'mer-10',
        versiones: ['general', 'construccion'], nivel: 'completo', subarea: 'relacion_clientes',
        texto: '¿Llevas un registro de clientes con historial de proyectos realizados?',
        descripcion: 'Base de datos con contacto, proyectos, montos, fechas',
        opciones: [
          { texto: 'No tenemos base de datos de clientes', valor: 1, impactoKPI: 'alto' },
          { texto: 'Los contactos están en el celular del dueño, sin más datos', valor: 2, impactoKPI: 'alto' },
          { texto: 'Hoja de Excel con los clientes principales', valor: 3, impactoKPI: 'medio' },
          { texto: 'CRM o base de datos actualizada con historial completo de cada cliente', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'mer-11',
        versiones: ['general', 'construccion'], nivel: 'completo', subarea: 'relacion_clientes',
        texto: '¿Tienes proceso para reactivar clientes que no han contratado en más de 1 año?',
        opciones: [
          { texto: 'Si no llaman, los damos por perdidos', valor: 1, impactoKPI: 'alto' },
          { texto: 'A veces los saludamos pero sin propuesta concreta', valor: 2, impactoKPI: 'medio' },
          { texto: 'Les enviamos información o fotos de proyectos nuevos', valor: 3, impactoKPI: 'medio' },
          { texto: 'Campaña de reactivación periódica con oferta o novedad relevante', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'mer-12',
        versiones: ['general', 'construccion'], nivel: 'completo', subarea: 'relacion_clientes',
        texto: '¿Ofreces algún programa de fidelización o beneficio para clientes frecuentes?',
        opciones: [
          { texto: 'No, todos los clientes reciben el mismo trato', valor: 1, impactoKPI: 'bajo' },
          { texto: 'Damos descuento informal a quienes piden mucho', valor: 2, impactoKPI: 'bajo' },
          { texto: 'Convenio de precio preferencial para clientes recurrentes', valor: 3, impactoKPI: 'bajo' },
          { texto: 'Programa formal de fidelización con beneficios escalonados', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'mer-13',
        versiones: ['general', 'construccion'], nivel: 'completo', subarea: 'medios_online',
        texto: '¿Tu empresa tiene un sitio web propio y actualizado?',
        descripcion: 'Dominio propio, portafolio de proyectos, contacto directo y servicios descritos',
        opciones: [
          { texto: 'No tenemos sitio web, solo redes sociales', valor: 1, impactoKPI: 'medio' },
          { texto: 'Tuvimos uno pero está desactualizado o fuera de servicio', valor: 2, impactoKPI: 'medio' },
          { texto: 'Sitio básico con servicios y contacto, actualizado hace más de 6 meses', valor: 3, impactoKPI: 'bajo' },
          { texto: 'Sitio profesional actualizado: portafolio activo, casos de éxito y formulario de contacto', valor: 4, impactoKPI: 'bajo' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // OPERACIONES
  // ─────────────────────────────────────────────
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
        versiones: ['general', 'construccion'], nivel: 'basico', subarea: 'logistica',
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
        versiones: ['general', 'construccion'], nivel: 'basico', subarea: 'procesos',
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
        versiones: ['general', 'construccion'], nivel: 'basico', subarea: 'logistica',
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
        versiones: ['construccion'], nivel: 'basico', subarea: 'procesos',
        texto: '¿Qué pasa cuando llueve varios días seguidos y no puedes trabajar en campo?',
        opciones: [
          { texto: 'La cuadrilla no trabaja y no generamos ingreso', valor: 1, impactoKPI: 'alto' },
          { texto: 'Hacemos trabajos internos pero sin plan definido', valor: 2, impactoKPI: 'alto' },
          { texto: 'Tenemos algunos trabajos alternativos planificados', valor: 3, impactoKPI: 'medio' },
          { texto: 'Plan de contingencia climática con tareas internas y mantenimiento preventivo', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'ops-5',
        versiones: ['general', 'construccion'], nivel: 'basico', subarea: 'calidad',
        texto: '¿Cómo garantizas que la calidad del trabajo en campo cumple el estándar pactado?',
        opciones: [
          { texto: 'Confiamos en la experiencia de la cuadrilla, sin revisión formal', valor: 1, impactoKPI: 'alto' },
          { texto: 'El encargado revisa antes de avisar al cliente', valor: 2, impactoKPI: 'alto' },
          { texto: 'Checklist de entrega informal con fotos del resultado', valor: 3, impactoKPI: 'medio' },
          { texto: 'Protocolo de cierre: checklist firmado + foto documental + encuesta de satisfacción', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'ops-7',
        versiones: ['general', 'construccion'], nivel: 'basico', subarea: 'calidad',
        texto: '¿Das seguimiento post-entrega a tus proyectos?',
        descripcion: 'Revisión de garantía, ajustes, verificación de satisfacción del cliente',
        opciones: [
          { texto: 'Entregamos y no volvemos a menos que haya queja grave', valor: 1, impactoKPI: 'alto' },
          { texto: 'Llamamos si el cliente lo pide, sin protocolo', valor: 2, impactoKPI: 'alto' },
          { texto: 'Revisión de cortesía en la primera semana post-entrega', valor: 3, impactoKPI: 'medio' },
          { texto: 'Protocolo activo: seguimiento a los 7 y 30 días + contacto para nuevos proyectos', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'ops-6',
        versiones: ['general', 'construccion'], nivel: 'basico', subarea: 'logistica',
        texto: '¿Llevas registro de proveedores y comparas precios regularmente?',
        descripcion: 'Tierra, plantas, cemento, acero, químicos, combustible',
        opciones: [
          { texto: 'Compramos siempre al mismo proveedor sin comparar', valor: 1, impactoKPI: 'alto' },
          { texto: 'Comparamos precios cuando el gasto es muy grande', valor: 2, impactoKPI: 'medio' },
          { texto: 'Tenemos 2-3 proveedores alternativos para los materiales principales', valor: 3, impactoKPI: 'medio' },
          { texto: 'Base de proveedores homologada con comparativa trimestral de precios', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      // ── COMPLETO ─────────────────────────────
      {
        id: 'ops-8',
        versiones: ['general', 'construccion'], nivel: 'completo', subarea: 'procesos',
        texto: '¿Tu empresa usa tecnología o software para gestionar proyectos o comunicación interna?',
        descripcion: 'Apps de gestión de obras, calendario digital, plataformas de comunicación',
        opciones: [
          { texto: 'Solo usamos WhatsApp y llamadas telefónicas', valor: 1, impactoKPI: 'medio' },
          { texto: 'WhatsApp + Excel/Google Sheets para algunos proyectos', valor: 2, impactoKPI: 'medio' },
          { texto: 'Herramientas digitales para proyectos importantes', valor: 3, impactoKPI: 'bajo' },
          { texto: 'Software de gestión integrado: proyectos, comunicación y seguimiento centralizado', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'ops-9',
        versiones: ['general', 'construccion'], nivel: 'completo', subarea: 'calidad',
        texto: '¿Tienes identificadas las regulaciones específicas de tu industria que debes cumplir?',
        descripcion: 'Normas de construcción, seguridad laboral, manejo de residuos, licencias de operación',
        opciones: [
          { texto: 'No tenemos un inventario de regulaciones aplicables', valor: 1, impactoKPI: 'alto' },
          { texto: 'Conocemos las más básicas, pero no todas', valor: 2, impactoKPI: 'alto' },
          { texto: 'Sabemos cuáles aplican, cumplimos la mayoría', valor: 3, impactoKPI: 'medio' },
          { texto: 'Matriz de cumplimiento regulatorio actualizada con responsable y calendario', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'ops-10',
        versiones: ['general', 'construccion'], nivel: 'completo', subarea: 'logistica',
        texto: '¿Controlas formalmente los tiempos comprometidos vs. los tiempos reales de entrega?',
        opciones: [
          { texto: 'No llevamos control de cumplimiento de plazos', valor: 1, impactoKPI: 'alto' },
          { texto: 'Sabemos cuándo se entrega tarde por las quejas del cliente', valor: 2, impactoKPI: 'alto' },
          { texto: 'Registramos fecha prometida y real en los proyectos principales', valor: 3, impactoKPI: 'medio' },
          { texto: 'Indicador de cumplimiento de plazos medido mensualmente en todos los proyectos', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'ops-11',
        versiones: ['general', 'construccion'], nivel: 'completo', subarea: 'calidad',
        texto: '¿Tienes un protocolo para gestionar incidentes o accidentes en obra?',
        descripcion: 'Reporte de accidentes, primeros auxilios, comunicación con cliente, acciones correctivas',
        opciones: [
          { texto: 'No tenemos ningún protocolo definido', valor: 1, impactoKPI: 'alto' },
          { texto: 'El encargado maneja como puede si pasa algo', valor: 2, impactoKPI: 'alto' },
          { texto: 'Tenemos algunas indicaciones básicas de seguridad', valor: 3, impactoKPI: 'medio' },
          { texto: 'Protocolo escrito de seguridad e incidentes, conocido por todo el equipo', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'ops-12',
        versiones: ['general', 'construccion'], nivel: 'completo', subarea: 'logistica',
        texto: '¿Evalúas periódicamente el desempeño de tus proveedores principales?',
        descripcion: 'Calidad, precio, tiempo de entrega, servicio',
        opciones: [
          { texto: 'No evaluamos proveedores, seguimos con quien conocemos', valor: 1, impactoKPI: 'medio' },
          { texto: 'Los cambiamos cuando hay un problema grave', valor: 2, impactoKPI: 'medio' },
          { texto: 'Revisión informal anual de los proveedores clave', valor: 3, impactoKPI: 'bajo' },
          { texto: 'Evaluación trimestral estructurada con criterios de calidad, precio y servicio', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      // ── V2 ACTIVIDAD-ESPECÍFICAS ──────────────
      {
        id: 'riego-1',
        versiones: ['construccion'], nivel: 'completo', subarea: 'procesos',
        actividades: ['riego'],
        texto: '¿Realizas diseño hidráulico previo a la instalación del sistema de riego?',
        descripcion: 'Cálculo de presión, diámetros de tubería, posición de aspersores o goteros',
        opciones: [
          { texto: 'Instalamos empíricamente según experiencia', valor: 1, impactoKPI: 'alto' },
          { texto: 'Hacemos un bosquejo manual básico', valor: 2, impactoKPI: 'medio' },
          { texto: 'Diseño en papel o Excel con cálculos hidráulicos', valor: 3, impactoKPI: 'medio' },
          { texto: 'Diseño hidráulico con software (AutoCAD, Irricad o similar) y memoria de cálculo', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'riego-2',
        versiones: ['construccion'], nivel: 'completo', subarea: 'calidad',
        actividades: ['riego'],
        texto: '¿Ofreces mantenimiento preventivo a los sistemas de riego que instalas?',
        opciones: [
          { texto: 'Solo atendemos cuando el cliente reporta falla', valor: 1, impactoKPI: 'alto' },
          { texto: 'Algunos clientes nos llaman para revisión, sin contrato', valor: 2, impactoKPI: 'medio' },
          { texto: 'Ofrecemos visitas de revisión sin contrato formal', valor: 3, impactoKPI: 'medio' },
          { texto: 'Contratos de mantenimiento preventivo anual con calendario de visitas', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'const-1',
        versiones: ['construccion'], nivel: 'completo', subarea: 'procesos',
        actividades: ['construccion_residencial', 'construccion_comercial'],
        texto: '¿Gestionas a los subcontratistas con contratos formales?',
        descripcion: 'Electricistas, plomeros, herreros, acabados',
        opciones: [
          { texto: 'Acordamos de palabra, sin contrato ni fianza', valor: 1, impactoKPI: 'alto' },
          { texto: 'Contrato informal o carta simple para los trabajos grandes', valor: 2, impactoKPI: 'alto' },
          { texto: 'Contrato básico con alcance y precio definidos', valor: 3, impactoKPI: 'medio' },
          { texto: 'Contrato completo: alcance, precio, plazo, penalizaciones y garantía', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'const-2',
        versiones: ['construccion'], nivel: 'completo', subarea: 'personas',
        actividades: ['construccion_residencial', 'construccion_comercial'],
        texto: '¿Cuentas con maestros de obra con experiencia certificada o comprobada?',
        opciones: [
          { texto: 'Contratamos quien esté disponible, sin verificar experiencia formal', valor: 1, impactoKPI: 'alto' },
          { texto: 'Buscamos recomendados, pero sin proceso de verificación', valor: 2, impactoKPI: 'alto' },
          { texto: 'Verificamos referencias y experiencia previa', valor: 3, impactoKPI: 'medio' },
          { texto: 'Maestros con certificación ICATEC/SENA/similar + referencias verificadas + historial de obras', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'const-3',
        versiones: ['construccion'], nivel: 'completo', subarea: 'procesos',
        actividades: ['construccion_comercial', 'proyectos_ejecutivos'],
        texto: '¿Participas en procesos de licitación o presentación formal de proyectos?',
        opciones: [
          { texto: 'No, solo trabajamos con clientes directos por recomendación', valor: 1, impactoKPI: 'medio' },
          { texto: 'Hemos intentado licitar pero sin éxito por falta de experiencia', valor: 2, impactoKPI: 'medio' },
          { texto: 'Participamos ocasionalmente con resultados mixtos', valor: 3, impactoKPI: 'bajo' },
          { texto: 'Proceso establecido para licitaciones: expediente técnico, propuesta económica y seguimiento', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'sena-1',
        versiones: ['construccion'], nivel: 'completo', subarea: 'calidad',
        actividades: ['senaletica'],
        texto: '¿Cumples con las normativas viales y de seguridad aplicables a señalética?',
        descripcion: 'NOM, Reglamento de Tránsito Municipal, especificaciones de SCT si aplica',
        opciones: [
          { texto: 'No conocemos las normas aplicables en detalle', valor: 1, impactoKPI: 'alto' },
          { texto: 'Seguimos lo que el cliente pide, sin verificar normativa', valor: 2, impactoKPI: 'alto' },
          { texto: 'Conocemos las normas principales y las aplicamos en la mayoría de proyectos', valor: 3, impactoKPI: 'medio' },
          { texto: 'Cumplimiento normativo completo, materiales homologados y documentación por proyecto', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'proy-1',
        versiones: ['construccion'], nivel: 'completo', subarea: 'procesos',
        actividades: ['proyectos_ejecutivos'],
        texto: '¿Tienes equipo propio o aliado de diseño arquitectónico para proyectos ejecutivos?',
        opciones: [
          { texto: 'No, contratamos lo que el cliente nos pide ejecutar', valor: 1, impactoKPI: 'medio' },
          { texto: 'Tenemos un arquitecto de confianza que colabora ocasionalmente', valor: 2, impactoKPI: 'medio' },
          { texto: 'Alianza estable con despacho de arquitectura o ingeniería', valor: 3, impactoKPI: 'bajo' },
          { texto: 'Equipo propio de diseño integrado al proceso de ventas y ejecución', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'pais-1',
        versiones: ['construccion'], nivel: 'completo', subarea: 'procesos',
        actividades: ['paisajismo'],
        texto: '¿Ofreces el diseño de jardines como servicio separado al de instalación?',
        descripcion: 'Plano de diseño, propuesta de especies, renders o maqueta',
        opciones: [
          { texto: 'No, solo ejecutamos lo que el cliente tiene en mente', valor: 1, impactoKPI: 'medio' },
          { texto: 'A veces sugerimos cambios pero sin cobrar por el diseño', valor: 2, impactoKPI: 'medio' },
          { texto: 'Ofrecemos diseño básico incluido en el proyecto', valor: 3, impactoKPI: 'bajo' },
          { texto: 'Servicio de diseño de jardines independiente con cobro y propuesta formal', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'ops-13',
        versiones: ['general', 'construccion'], nivel: 'completo', subarea: 'logistica',
        texto: '¿Tienes un plan de mantenimiento preventivo para herramientas y maquinaria?',
        descripcion: 'Revisiones periódicas, cambio de piezas, registro del estado del equipo',
        opciones: [
          { texto: 'Reparamos cuando algo se daña, sin prevención', valor: 1, impactoKPI: 'alto' },
          { texto: 'El encargado revisa de vez en cuando sin calendario definido', valor: 2, impactoKPI: 'medio' },
          { texto: 'Revisión periódica de los equipos más críticos, sin registro formal', valor: 3, impactoKPI: 'medio' },
          { texto: 'Plan de mantenimiento preventivo documentado con calendario y registro de cumplimiento', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'mant-1',
        versiones: ['construccion'], nivel: 'completo', subarea: 'relacion_clientes',
        actividades: ['mantenimiento'],
        texto: '¿Tienes contratos de mantenimiento recurrente con clientes?',
        descripcion: 'Mensual, bimestral, trimestral — para jardines, riego o áreas comunes',
        opciones: [
          { texto: 'Solo atendemos llamadas puntuales de mantenimiento', valor: 1, impactoKPI: 'alto' },
          { texto: 'Algunos clientes nos llaman regularmente, sin contrato', valor: 2, impactoKPI: 'medio' },
          { texto: 'Tenemos acuerdos informales de visitas periódicas', valor: 3, impactoKPI: 'medio' },
          { texto: 'Contratos formales de mantenimiento con frecuencia, alcance y precio definidos', valor: 4, impactoKPI: 'bajo' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // GESTIÓN DE PERSONAS
  // ─────────────────────────────────────────────
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
        versiones: ['general', 'construccion'], nivel: 'basico', subarea: 'entrenamiento',
        requiresEmployees: true,
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
        versiones: ['general', 'construccion'], nivel: 'basico', subarea: 'entrenamiento',
        requiresEmployees: true,
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
        versiones: ['general', 'construccion'], nivel: 'basico', subarea: 'entrenamiento',
        requiresEmployees: true,
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
        versiones: ['general', 'construccion'], nivel: 'basico', subarea: 'retencion',
        requiresEmployees: true,
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
        versiones: ['general', 'construccion'], nivel: 'basico', subarea: 'retencion',
        requiresEmployees: true,
        texto: '¿Tienes un proceso claro para resolver conflictos dentro de las cuadrillas?',
        opciones: [
          { texto: 'Resuelvo todo yo personalmente cuando me llega el problema', valor: 1, impactoKPI: 'alto' },
          { texto: 'El encargado lo maneja como pueda, sin guía', valor: 2, impactoKPI: 'alto' },
          { texto: 'Hay lineamientos básicos que el encargado conoce', valor: 3, impactoKPI: 'medio' },
          { texto: 'Protocolo de disciplina progresiva documentado y conocido por todos', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'per-6',
        versiones: ['general', 'construccion'], nivel: 'basico', subarea: 'retencion',
        requiresEmployees: true,
        texto: '¿Ofreces algún incentivo o reconocimiento al buen desempeño?',
        descripcion: 'Bonos por proyecto, reconocimiento público, crecimiento de rol',
        opciones: [
          { texto: 'Solo el salario fijo, no hay nada adicional', valor: 1, impactoKPI: 'alto' },
          { texto: 'A veces damos algo extra cuando hubo muy buena temporada', valor: 2, impactoKPI: 'alto' },
          { texto: 'Bono informal ocasional para quienes destacan', valor: 3, impactoKPI: 'medio' },
          { texto: 'Programa de incentivos: bonos por proyecto, ascensos y reconocimientos formales', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      // ── COMPLETO ─────────────────────────────
      {
        id: 'per-7',
        versiones: ['general', 'construccion'], nivel: 'completo', subarea: 'reclutamiento',
        requiresEmployees: true,
        texto: '¿Tienes un proceso formal de reclutamiento cuando necesitas contratar?',
        descripcion: 'Anuncio de vacante, criterios de selección, entrevista, prueba práctica',
        opciones: [
          { texto: 'Contratamos al primero que recomienden', valor: 1, impactoKPI: 'alto' },
          { texto: 'Preguntamos a conocidos sin más proceso', valor: 2, impactoKPI: 'alto' },
          { texto: 'Entrevista básica y verificación de experiencia', valor: 3, impactoKPI: 'medio' },
          { texto: 'Proceso estructurado: anuncio, filtro CV, entrevista, prueba técnica y referencias', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'per-8',
        versiones: ['general', 'construccion'], nivel: 'completo', subarea: 'entrenamiento',
        requiresEmployees: true,
        texto: '¿Los empleados tienen un plan de desarrollo o crecimiento dentro de la empresa?',
        opciones: [
          { texto: 'No hay plan de carrera, quien se queda es por el sueldo', valor: 1, impactoKPI: 'alto' },
          { texto: 'Damos más responsabilidades a quien lo merece, sin plan formal', valor: 2, impactoKPI: 'alto' },
          { texto: 'Conversaciones anuales sobre crecimiento con los cargos clave', valor: 3, impactoKPI: 'medio' },
          { texto: 'Plan de desarrollo individual por cargo con metas y cronograma de ascenso', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'per-9',
        versiones: ['general', 'construccion'], nivel: 'completo', subarea: 'retencion',
        requiresEmployees: true,
        texto: '¿Tienes un mecanismo de comunicación interna estructurada con tu equipo?',
        descripcion: 'Reunión semanal, boletín, tablón de avisos, grupo de comunicados',
        opciones: [
          { texto: 'Solo comunicamos cuando hay un problema o urgencia', valor: 1, impactoKPI: 'alto' },
          { texto: 'Grupo de WhatsApp mezclado (trabajo y personal) sin reglas', valor: 2, impactoKPI: 'medio' },
          { texto: 'Reunión semanal de 15-20 min y grupo de trabajo separado', valor: 3, impactoKPI: 'medio' },
          { texto: 'Comunicación estructurada: reunión semanal + canal oficial + actas breves de acuerdos', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'per-10',
        versiones: ['general', 'construccion'], nivel: 'completo', subarea: 'retencion',
        requiresEmployees: true,
        texto: '¿Tu empresa se preocupa activamente por la seguridad y bienestar de los trabajadores?',
        descripcion: 'Equipo de protección personal, seguro médico, pausas activas, ergonomía',
        opciones: [
          { texto: 'No tenemos medidas formales de seguridad o bienestar', valor: 1, impactoKPI: 'alto' },
          { texto: 'Proporcionamos EPP básico pero sin programa formal', valor: 2, impactoKPI: 'alto' },
          { texto: 'EPP completo + seguro básico para el equipo', valor: 3, impactoKPI: 'medio' },
          { texto: 'Programa de seguridad laboral documentado + seguro + capacitación en prevención', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'per-11',
        versiones: ['general', 'construccion'], nivel: 'completo', subarea: 'entrenamiento',
        requiresEmployees: true,
        texto: '¿Inviertes en capacitación técnica para mejorar las habilidades de tu equipo?',
        descripcion: 'Cursos de instalación, certificaciones, talleres de seguridad, manejo de maquinaria',
        opciones: [
          { texto: 'No destinamos presupuesto a capacitación', valor: 1, impactoKPI: 'alto' },
          { texto: 'Solo si es requerido por un cliente o proyecto específico', valor: 2, impactoKPI: 'medio' },
          { texto: 'Capacitación ocasional cuando hay oportunidad y presupuesto', valor: 3, impactoKPI: 'medio' },
          { texto: 'Plan anual de capacitación con presupuesto definido por área técnica', valor: 4, impactoKPI: 'bajo' },
        ],
      },
      {
        id: 'per-12',
        versiones: ['general', 'construccion'], nivel: 'completo', subarea: 'cumplimiento_laboral',
        requiresEmployees: true,
        texto: '¿Tus trabajadores tienen contratos formales y cumples con las obligaciones patronales?',
        descripcion: 'Seguridad social (IMSS/CCSS), contratos individuales, nómina formal, registro ante autoridades',
        opciones: [
          { texto: 'Los trabajadores son informales, sin contrato ni registro patronal', valor: 1, impactoKPI: 'alto' },
          { texto: 'Algunos tienen contrato, otros no; la seguridad social está incompleta', valor: 2, impactoKPI: 'alto' },
          { texto: 'Todos registrados y con contrato, aunque con algunos pendientes menores', valor: 3, impactoKPI: 'medio' },
          { texto: 'Cumplimiento laboral completo: contratos, seguridad social y nómina formal al día', valor: 4, impactoKPI: 'bajo' },
        ],
      },
    ],
  },
];
