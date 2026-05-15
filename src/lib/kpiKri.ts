import type { ScoresPorArea } from './calculator';

export interface KpiItem {
  kpi: string;
  meta: string;
  frecuencia: string;
  responsable: string;
  comoMedir?: string;
  primario?: boolean;
}

export interface KriItem {
  kri: string;
  umbralAlerta: string;
  frecuencia: string;
  nivelAlerta?: 'amarillo' | 'naranja' | 'rojo';
  accionInmediata?: string;
}

export interface KciItem {
  kci: string;
  proceso: string;
  meta: string;
  frecuencia: string;
  comoMedir: string;
}

export interface KpiKriArea {
  areaId: string;
  areaNombre: string;
  icono: string;
  objetivo: string;
  kpis: KpiItem[];
  kris: KriItem[];
  kcis: KciItem[];
}

const KPI_KRI_DATA: KpiKriArea[] = [
  {
    areaId: 'estrategia',
    areaNombre: 'Estrategia',
    icono: '🎯',
    objetivo: 'Cumplir metas de negocio de forma sostenible y rentable',
    kpis: [
      {
        kpi: '% cumplimiento de metas trimestrales',
        meta: '≥ 80%',
        frecuencia: 'Mensual',
        responsable: 'Dueño',
        comoMedir: 'Metas cumplidas / metas definidas × 100. Revisar las 3 metas del trimestre el último viernes de cada mes.',
        primario: true,
      },
      {
        kpi: '# de servicios con margen documentado > 25%',
        meta: 'Todos los servicios activos',
        frecuencia: 'Trimestral',
        responsable: 'Dueño',
        comoMedir: 'Contar servicios que tienen hoja de costeo con margen bruto calculado > 25%.',
      },
      {
        kpi: '% de ingresos provenientes del segmento de cliente ideal',
        meta: '≥ 60%',
        frecuencia: 'Trimestral',
        responsable: 'Dueño',
        comoMedir: 'Ingresos de clientes que cumplen el perfil ideal / ingresos totales × 100.',
      },
      {
        kpi: 'Grado de dependencia del dueño en operaciones diarias (1-10)',
        meta: '≤ 5 (puede ausentarse 1 semana sin que todo se detenga)',
        frecuencia: 'Trimestral',
        responsable: 'Dueño',
        comoMedir: 'Autoevaluación: ¿cuántas decisiones operativas diarias requieren tu presencia directa? 10 = todo depende de ti, 1 = el equipo opera con autonomía.',
      },
      {
        kpi: '% de avance en plan de crecimiento anual',
        meta: '≥ 70% al cierre del año',
        frecuencia: 'Trimestral',
        responsable: 'Dueño',
        comoMedir: 'Hitos completados / hitos planificados × 100. Revisar el documento de plan de crecimiento.',
      },
    ],
    kris: [
      {
        kri: 'Meses consecutivos sin nuevos proyectos contratados',
        umbralAlerta: '≥ 2 meses',
        frecuencia: 'Mensual',
        nivelAlerta: 'rojo',
        accionInmediata: 'Activar campaña de referidos, contactar cartera de clientes pasados, revisar pipeline de cotizaciones abiertas.',
      },
      {
        kri: '% de ventas dependiendo de un solo cliente o canal',
        umbralAlerta: '> 60%',
        frecuencia: 'Trimestral',
        nivelAlerta: 'naranja',
        accionInmediata: 'Iniciar prospección activa en al menos un canal o tipo de cliente diferente este mes.',
      },
      {
        kri: 'Semanas desde la última revisión de indicadores del negocio',
        umbralAlerta: '> 4 semanas sin revisión',
        frecuencia: 'Mensual',
        nivelAlerta: 'amarillo',
        accionInmediata: 'Agendar revisión mensual de indicadores en los próximos 3 días hábiles.',
      },
      {
        kri: 'Meses sin actualizar el plan de negocio o metas escritas',
        umbralAlerta: '> 3 meses sin revisión',
        frecuencia: 'Trimestral',
        nivelAlerta: 'amarillo',
        accionInmediata: 'Separar 1 hora para revisar y actualizar metas del trimestre entrante.',
      },
      {
        kri: '# de proyectos aceptados fuera del perfil de cliente ideal',
        umbralAlerta: '> 3 proyectos en el trimestre',
        frecuencia: 'Trimestral',
        nivelAlerta: 'naranja',
        accionInmediata: 'Revisar criterios de aceptación de proyectos y reforzar con el equipo comercial.',
      },
    ],
    kcis: [
      {
        kci: '% de meses con revisión de indicadores realizada',
        proceso: 'Revisión periódica de desempeño',
        meta: '100%',
        frecuencia: 'Mensual',
        comoMedir: 'Meses con revisión documentada / meses del período × 100.',
      },
      {
        kci: '% de trimestres con metas escritas y formalizadas antes de iniciar',
        proceso: 'Planificación trimestral',
        meta: '100%',
        frecuencia: 'Trimestral',
        comoMedir: 'Trimestres con documento de metas firmado / trimestres totales × 100.',
      },
      {
        kci: '% de proyectos evaluados contra el perfil de cliente ideal antes de aceptar',
        proceso: 'Filtro de aceptación de proyectos',
        meta: '≥ 90%',
        frecuencia: 'Por proyecto',
        comoMedir: 'Proyectos con evaluación de ajuste / proyectos recibidos × 100.',
      },
      {
        kci: '% de servicios activos con costeo documentado y actualizado',
        proceso: 'Documentación de rentabilidad por servicio',
        meta: '100%',
        frecuencia: 'Semestral',
        comoMedir: 'Servicios con hoja de costeo actualizada / servicios activos × 100.',
      },
    ],
  },
  {
    areaId: 'finanzas',
    areaNombre: 'Finanzas',
    icono: '💰',
    objetivo: 'Mantener rentabilidad sana, flujo de caja predecible y control de cada centavo',
    kpis: [
      {
        kpi: 'Margen bruto mensual %',
        meta: '≥ 25%',
        frecuencia: 'Mensual',
        responsable: 'Dueño / Contador',
        comoMedir: '(Ingresos del mes − Costos directos del mes) / Ingresos × 100. Costos directos = materiales + mano de obra + maquinaria + subcontratos.',
        primario: true,
      },
      {
        kpi: 'Días promedio de cobro (DSO)',
        meta: '≤ 30 días',
        frecuencia: 'Semanal',
        responsable: 'Administración',
        comoMedir: 'Suma de (fecha cobro − fecha factura) de todas las facturas del mes / número de facturas cobradas.',
      },
      {
        kpi: 'Variación presupuesto vs. costo real por proyecto %',
        meta: '≤ 10% de desviación',
        frecuencia: 'Por proyecto',
        responsable: 'Encargado de obra / Dueño',
        comoMedir: '(Costo real − Presupuesto inicial) / Presupuesto inicial × 100. Positivo = sobrecosto, negativo = ahorro.',
      },
      {
        kpi: '% de meses en que se cubre el punto de equilibrio',
        meta: '≥ 90% de los meses',
        frecuencia: 'Mensual',
        responsable: 'Dueño / Contador',
        comoMedir: 'Contar meses en que Ingresos ≥ Gastos fijos / Margen de contribución. Punto de equilibrio = Gastos fijos totales / % margen bruto.',
      },
      {
        kpi: '% de proyectos con cierre financiero completado',
        meta: '100%',
        frecuencia: 'Mensual',
        responsable: 'Dueño',
        comoMedir: 'Proyectos entregados con cierre financiero documentado / total proyectos entregados en el período × 100.',
      },
    ],
    kris: [
      {
        kri: 'Margen bruto mensual cae por debajo del mínimo',
        umbralAlerta: '< 25% por 1 mes · < 15% en cualquier mes',
        frecuencia: 'Mensual',
        nivelAlerta: 'naranja',
        accionInmediata: 'Revisar costeo de los últimos 3 proyectos. Identificar si hay gastos no presupuestados o proyectos mal cotizados.',
      },
      {
        kri: 'Cuentas por cobrar sin gestión activa de cobro',
        umbralAlerta: 'CxC > 45 días sin contacto',
        frecuencia: 'Semanal',
        nivelAlerta: 'naranja',
        accionInmediata: 'Llamar al cliente ese día. Documentar compromiso de pago y fecha. Si supera 60 días, iniciar proceso formal de cobro.',
      },
      {
        kri: 'Meses consecutivos con margen negativo o nulo',
        umbralAlerta: '2 meses consecutivos con margen < 10%',
        frecuencia: 'Mensual',
        nivelAlerta: 'rojo',
        accionInmediata: 'Reunión de emergencia con contador. Revisar todos los proyectos activos. Pausar gastos no esenciales.',
      },
      {
        kri: '% de proyectos sin cierre financiero documentado',
        umbralAlerta: '> 30% de proyectos entregados sin cierre',
        frecuencia: 'Mensual',
        nivelAlerta: 'amarillo',
        accionInmediata: 'Asignar tiempo esta semana para completar los cierres pendientes. Definir responsable fijo del proceso.',
      },
      {
        kri: 'Ratio de deuda operativa sobre ingresos del mes',
        umbralAlerta: '> 40% de los ingresos comprometidos en deuda operativa',
        frecuencia: 'Mensual',
        nivelAlerta: 'rojo',
        accionInmediata: 'Detener nuevos compromisos de gasto. Acelerar cobros pendientes. Evaluar renegociación de plazos con proveedores.',
      },
    ],
    kcis: [
      {
        kci: '% de cotizaciones enviadas con hoja de costeo completa previa',
        proceso: 'Costeo previo a cotización',
        meta: '100%',
        frecuencia: 'Semanal',
        comoMedir: 'Cotizaciones con hoja de costeo adjunta / total cotizaciones enviadas × 100.',
      },
      {
        kci: '% de proyectos iniciados con contrato firmado + anticipo recibido',
        proceso: 'Inicio formal de proyectos',
        meta: '≥ 95%',
        frecuencia: 'Por proyecto',
        comoMedir: 'Proyectos con ambos documentos verificados / proyectos iniciados × 100.',
      },
      {
        kci: '% de proyectos con cierre financiero documentado al mes de entrega',
        proceso: 'Cierre financiero de proyectos',
        meta: '100%',
        frecuencia: 'Mensual',
        comoMedir: 'Proyectos con cierre documentado / proyectos entregados en el mes × 100.',
      },
      {
        kci: '% de CxC con primer contacto de cobro realizado antes de vencer',
        proceso: 'Gestión proactiva de cobro',
        meta: '≥ 90%',
        frecuencia: 'Semanal',
        comoMedir: 'Facturas contactadas antes del vencimiento / total facturas emitidas × 100.',
      },
    ],
  },
  {
    areaId: 'mercadeo',
    areaNombre: 'Mercadeo',
    icono: '📣',
    objetivo: 'Generar prospectos constantes y convertirlos en contratos de forma predecible',
    kpis: [
      {
        kpi: 'Tasa de cierre de cotizaciones %',
        meta: '≥ 30%',
        frecuencia: 'Mensual',
        responsable: 'Responsable comercial / Dueño',
        comoMedir: 'Cotizaciones convertidas en contratos / total cotizaciones enviadas en el período × 100.',
        primario: true,
      },
      {
        kpi: 'Costo de Adquisición de Cliente (CAC) por canal',
        meta: '< 8% del valor promedio del proyecto',
        frecuencia: 'Mensual',
        responsable: 'Dueño',
        comoMedir: 'Total invertido en marketing del canal / clientes nuevos obtenidos por ese canal en el período.',
      },
      {
        kpi: '# de prospectos nuevos generados por mes',
        meta: '≥ 8 prospectos/mes',
        frecuencia: 'Semanal',
        responsable: 'Responsable comercial',
        comoMedir: 'Contar contactos nuevos que solicitaron información o cotización durante el mes, por cualquier canal.',
      },
      {
        kpi: 'Score de reseñas en Google / Facebook (promedio)',
        meta: '≥ 4.3 / 5',
        frecuencia: 'Mensual',
        responsable: 'Dueño',
        comoMedir: 'Revisar la puntuación promedio en el perfil de Google Business y página de Facebook al cierre del mes.',
      },
      {
        kpi: '% de cotizaciones con seguimiento documentado a los 7 días',
        meta: '≥ 80%',
        frecuencia: 'Semanal',
        responsable: 'Responsable comercial',
        comoMedir: 'Cotizaciones con al menos un seguimiento registrado a los 7 días / total cotizaciones enviadas × 100.',
      },
    ],
    kris: [
      {
        kri: 'Semanas consecutivas sin nuevas cotizaciones enviadas',
        umbralAlerta: '≥ 2 semanas sin cotizaciones',
        frecuencia: 'Semanal',
        nivelAlerta: 'rojo',
        accionInmediata: 'Activar campaña de referidos, publicar en redes sociales, contactar clientes pasados con propuesta de nuevo servicio.',
      },
      {
        kri: 'Tasa de cierre mensual por debajo del mínimo',
        umbralAlerta: '< 20% por 2 meses consecutivos',
        frecuencia: 'Mensual',
        nivelAlerta: 'naranja',
        accionInmediata: 'Revisar las últimas 10 cotizaciones no cerradas. Llamar a 3 prospectos para entender la razón de rechazo.',
      },
      {
        kri: 'Meses sin publicar contenido en redes sociales',
        umbralAlerta: '> 3 semanas sin publicación',
        frecuencia: 'Semanal',
        nivelAlerta: 'amarillo',
        accionInmediata: 'Publicar al menos una foto de proyecto o testimonio de cliente esta semana.',
      },
      {
        kri: '# de reseñas negativas (1-2 estrellas) en el mes',
        umbralAlerta: '≥ 2 reseñas negativas en 30 días',
        frecuencia: 'Mensual',
        nivelAlerta: 'naranja',
        accionInmediata: 'Contactar al cliente directamente. Resolver el problema. Responder públicamente a la reseña con profesionalismo.',
      },
      {
        kri: 'Dependencia excesiva de un solo canal de captación',
        umbralAlerta: '> 80% de prospectos de un solo canal',
        frecuencia: 'Trimestral',
        nivelAlerta: 'naranja',
        accionInmediata: 'Identificar y activar al menos un canal alternativo de captación este trimestre.',
      },
    ],
    kcis: [
      {
        kci: '% de proyectos entregados con solicitud de reseña enviada',
        proceso: 'Gestión de reputación online',
        meta: '100%',
        frecuencia: 'Por proyecto',
        comoMedir: 'Proyectos con solicitud de reseña enviada / proyectos entregados × 100.',
      },
      {
        kci: '% de cotizaciones abiertas con seguimiento documentado en ≤ 7 días',
        proceso: 'Seguimiento comercial de cotizaciones',
        meta: '≥ 90%',
        frecuencia: 'Semanal',
        comoMedir: 'Cotizaciones con nota de seguimiento en CRM o registro en ≤ 7 días / cotizaciones enviadas × 100.',
      },
      {
        kci: '% de semanas con al menos una publicación en redes sociales',
        proceso: 'Presencia digital activa',
        meta: '≥ 80%',
        frecuencia: 'Mensual',
        comoMedir: 'Semanas con al menos 1 publicación / semanas del mes × 100.',
      },
      {
        kci: '% de clientes inactivos (>12 meses) contactados en el trimestre',
        proceso: 'Reactivación de clientes pasados',
        meta: '≥ 50%',
        frecuencia: 'Trimestral',
        comoMedir: 'Clientes inactivos contactados con propuesta / total clientes inactivos en base de datos × 100.',
      },
    ],
  },
  {
    areaId: 'operaciones',
    areaNombre: 'Operaciones',
    icono: '⚙️',
    objetivo: 'Entregar proyectos en tiempo, con calidad consistente y sin desperdicios de recursos',
    kpis: [
      {
        kpi: '% de proyectos entregados en tiempo y dentro del presupuesto',
        meta: '≥ 85%',
        frecuencia: 'Por proyecto',
        responsable: 'Encargado de obra',
        comoMedir: 'Proyectos entregados en la fecha acordada Y sin sobrecosto / total proyectos entregados × 100.',
        primario: true,
      },
      {
        kpi: 'Score de satisfacción post-entrega (encuesta 1-5)',
        meta: '≥ 4.2 promedio',
        frecuencia: 'Por proyecto',
        responsable: 'Encargado de calidad / Dueño',
        comoMedir: 'Promedio de calificaciones de la encuesta enviada a cada cliente dentro de los 7 días post-entrega.',
      },
      {
        kpi: '% de tiempo productivo de cuadrilla vs. tiempo pagado',
        meta: '≥ 80%',
        frecuencia: 'Semanal',
        responsable: 'Encargado de cuadrilla',
        comoMedir: 'Horas efectivas en obra / horas totales pagadas × 100. Excluye traslados, esperas y tiempos muertos.',
      },
      {
        kpi: '# de incidentes de calidad documentados por mes',
        meta: '≤ 2 por mes',
        frecuencia: 'Mensual',
        responsable: 'Encargado de obra',
        comoMedir: 'Contar quejas de cliente, retrabajos y correcciones documentadas durante el mes.',
      },
      {
        kpi: '% de checklists de entrega completados por proyecto',
        meta: '100%',
        frecuencia: 'Por proyecto',
        responsable: 'Encargado de obra',
        comoMedir: 'Proyectos con checklist firmado adjunto / proyectos entregados × 100.',
      },
    ],
    kris: [
      {
        kri: '# de proyectos simultáneos con retraso en ejecución',
        umbralAlerta: '≥ 2 proyectos retrasados al mismo tiempo',
        frecuencia: 'Semanal',
        nivelAlerta: 'rojo',
        accionInmediata: 'Reunión inmediata con encargados de obra. Reasignar recursos y comunicar proactivamente al cliente afectado.',
      },
      {
        kri: 'Quejas de calidad documentadas en el mes',
        umbralAlerta: '> 3 quejas en un mes',
        frecuencia: 'Mensual',
        nivelAlerta: 'naranja',
        accionInmediata: 'Revisar los checklists de los últimos 5 proyectos. Identificar si hay un proceso específico fallando.',
      },
      {
        kri: 'Días sin encargado designado para una cuadrilla activa',
        umbralAlerta: '> 3 días sin encargado',
        frecuencia: 'Semanal',
        nivelAlerta: 'naranja',
        accionInmediata: 'Designar encargado temporal ese día. Evaluar plan de sucesión de liderazgo en campo.',
      },
      {
        kri: '% de proyectos con sobrecosto mayor al 20%',
        umbralAlerta: '> 2 proyectos en el mes con desviación > 20%',
        frecuencia: 'Mensual',
        nivelAlerta: 'rojo',
        accionInmediata: 'Auditar el costeo de los proyectos afectados. Revisar si el problema es en cotización, compras o ejecución.',
      },
      {
        kri: 'Días sin inventario actualizado de herramientas y materiales clave',
        umbralAlerta: '> 2 semanas sin revisión de inventario',
        frecuencia: 'Quincenal',
        nivelAlerta: 'amarillo',
        accionInmediata: 'Programar inventario físico en los próximos 2 días con el encargado de bodega o cuadrilla.',
      },
    ],
    kcis: [
      {
        kci: '% de proyectos con checklist de calidad firmado en la entrega',
        proceso: 'Protocolo de cierre y entrega de proyectos',
        meta: '100%',
        frecuencia: 'Por proyecto',
        comoMedir: 'Proyectos con checklist firmado / proyectos entregados × 100.',
      },
      {
        kci: '% de semanas con planificación de cuadrillas realizada el lunes',
        proceso: 'Planificación semanal de recursos',
        meta: '≥ 90%',
        frecuencia: 'Semanal',
        comoMedir: 'Semanas con asignación de cuadrillas documentada el lunes / semanas totales × 100.',
      },
      {
        kci: '% de proyectos con seguimiento post-entrega a los 7 y 30 días',
        proceso: 'Seguimiento post-venta y garantía',
        meta: '≥ 85%',
        frecuencia: 'Mensual',
        comoMedir: 'Proyectos con ambos contactos registrados / proyectos entregados en el período × 100.',
      },
      {
        kci: '% de incidentes de seguridad o accidentes documentados en < 24 horas',
        proceso: 'Reporte de incidentes en obra',
        meta: '100%',
        frecuencia: 'Por evento',
        comoMedir: 'Incidentes con reporte completado en < 24 horas / total incidentes del período × 100.',
      },
    ],
  },
  {
    areaId: 'personas',
    areaNombre: 'Gestión de Personas',
    icono: '👥',
    objetivo: 'Mantener un equipo estable, productivo, bien entrenado y comprometido',
    kpis: [
      {
        kpi: 'Rotación mensual de personal %',
        meta: '< 5% mensual',
        frecuencia: 'Mensual',
        responsable: 'Dueño',
        comoMedir: '(Empleados que salieron en el mes / promedio de empleados activos) × 100.',
        primario: true,
      },
      {
        kpi: 'Días hasta productividad plena de nuevo empleado',
        meta: '≤ 10 días laborables',
        frecuencia: 'Por incorporación',
        responsable: 'Dueño / Encargado',
        comoMedir: 'Días desde el primer día hasta que el nuevo empleado trabaja sin supervisión directa constante.',
      },
      {
        kpi: '% de empleados con evaluación de desempeño al corriente',
        meta: '100% evaluados en los últimos 6 meses',
        frecuencia: 'Semestral',
        responsable: 'Dueño',
        comoMedir: 'Empleados con evaluación documentada en los últimos 6 meses / total empleados × 100.',
      },
      {
        kpi: '# de horas de capacitación técnica por empleado al año',
        meta: '≥ 8 horas/año',
        frecuencia: 'Trimestral',
        responsable: 'Dueño',
        comoMedir: 'Total horas de capacitación en el período / número de empleados activos.',
      },
      {
        kpi: '# de incidencias laborales (conflictos, ausencias injustificadas) por mes',
        meta: '≤ 2 por mes',
        frecuencia: 'Mensual',
        responsable: 'Dueño / Encargado',
        comoMedir: 'Contar conflictos formales, ausencias sin justificar y llamadas de atención documentadas durante el mes.',
      },
    ],
    kris: [
      {
        kri: '# de renuncias o bajas en un período de 30 días',
        umbralAlerta: '≥ 2 renuncias en 30 días',
        frecuencia: 'Mensual',
        nivelAlerta: 'rojo',
        accionInmediata: 'Entrevista de salida inmediata. Evaluar condiciones salariales, carga de trabajo y clima laboral con el equipo restante.',
      },
      {
        kri: 'Días de cuadrilla activa sin encargado designado',
        umbralAlerta: '> 3 días sin encargado',
        frecuencia: 'Semanal',
        nivelAlerta: 'naranja',
        accionInmediata: 'Designar encargado temporal ese día. Revisar si hay un empleado en formación que pueda asumir el rol.',
      },
      {
        kri: 'Meses desde la última capacitación técnica del equipo',
        umbralAlerta: '> 6 meses sin ninguna capacitación',
        frecuencia: 'Trimestral',
        nivelAlerta: 'amarillo',
        accionInmediata: 'Buscar y agendar una capacitación técnica en los próximos 30 días. Priorizar la de mayor impacto operativo.',
      },
      {
        kri: '% de empleados sin descripción de rol escrita',
        umbralAlerta: '> 30% sin descripción de puesto',
        frecuencia: 'Trimestral',
        nivelAlerta: 'amarillo',
        accionInmediata: 'Documentar los roles faltantes este trimestre, empezando por los cargos clave.',
      },
      {
        kri: '# de ausencias injustificadas en el mes',
        umbralAlerta: '> 4 ausencias injustificadas por persona al mes',
        frecuencia: 'Mensual',
        nivelAlerta: 'naranja',
        accionInmediata: 'Conversación directa con el empleado. Si es patrón repetido, iniciar protocolo disciplinario documentado.',
      },
    ],
    kcis: [
      {
        kci: '% de empleados con contrato de trabajo firmado y vigente',
        proceso: 'Cumplimiento laboral formal',
        meta: '100%',
        frecuencia: 'Mensual',
        comoMedir: 'Empleados con contrato vigente en expediente / total empleados activos × 100.',
      },
      {
        kci: '% de nuevos empleados con onboarding estructurado completado en la primera semana',
        proceso: 'Inducción y onboarding',
        meta: '100%',
        frecuencia: 'Por incorporación',
        comoMedir: 'Nuevos empleados con checklist de onboarding firmado / total ingresos del período × 100.',
      },
      {
        kci: '% de evaluaciones de desempeño realizadas en la fecha programada',
        proceso: 'Evaluación periódica de desempeño',
        meta: '≥ 90%',
        frecuencia: 'Semestral',
        comoMedir: 'Evaluaciones realizadas en fecha / evaluaciones programadas × 100.',
      },
      {
        kci: '% de empleados con EPP completo y en buen estado verificado',
        proceso: 'Seguridad laboral y equipo de protección',
        meta: '100%',
        frecuencia: 'Mensual',
        comoMedir: 'Empleados con EPP verificado en lista de control / total empleados en campo × 100.',
      },
    ],
  },
];

export function generarKpiKri(scoresPorArea: ScoresPorArea): KpiKriArea[] {
  return KPI_KRI_DATA.filter((k) => scoresPorArea[k.areaId] !== undefined);
}

export { KPI_KRI_DATA };
