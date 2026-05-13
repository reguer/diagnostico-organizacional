import type { ScoresPorArea } from './calculator';

export interface KpiItem {
  kpi: string;
  meta: string;
  frecuencia: string;
  responsable: string;
}

export interface KriItem {
  kri: string;
  umbralAlerta: string;
  frecuencia: string;
}

export interface KpiKriArea {
  areaId: string;
  areaNombre: string;
  icono: string;
  objetivo: string;
  kpis: KpiItem[];
  kris: KriItem[];
}

const KPI_KRI_DATA: KpiKriArea[] = [
  {
    areaId: 'estrategia',
    areaNombre: 'Estrategia',
    icono: '🎯',
    objetivo: 'Cumplir metas de negocio de forma sostenible y rentable',
    kpis: [
      { kpi: '% cumplimiento de metas trimestrales', meta: '≥ 80%', frecuencia: 'Mensual', responsable: 'Dueño' },
      { kpi: '# servicios con margen documentado > 25%', meta: 'Todos los servicios activos', frecuencia: 'Trimestral', responsable: 'Dueño' },
    ],
    kris: [
      { kri: 'Meses consecutivos sin nuevos proyectos contratados', umbralAlerta: '≥ 2 meses', frecuencia: 'Mensual' },
      { kri: '% de ventas dependiendo de un solo canal o cliente', umbralAlerta: '> 70%', frecuencia: 'Trimestral' },
    ],
  },
  {
    areaId: 'finanzas',
    areaNombre: 'Finanzas',
    icono: '💰',
    objetivo: 'Mantener rentabilidad y flujo de caja saludable',
    kpis: [
      { kpi: 'Margen bruto mensual %', meta: '≥ 25%', frecuencia: 'Mensual', responsable: 'Dueño / Contador' },
      { kpi: 'Días promedio de cobro (DSO)', meta: '≤ 30 días', frecuencia: 'Semanal', responsable: 'Administración' },
    ],
    kris: [
      { kri: 'Margen bruto menor al 20% por dos meses consecutivos', umbralAlerta: '< 20% por 2 meses', frecuencia: 'Mensual' },
      { kri: 'Cuentas por cobrar sin gestión activa de cobro', umbralAlerta: 'CxC > 60 días', frecuencia: 'Semanal' },
    ],
  },
  {
    areaId: 'mercadeo',
    areaNombre: 'Mercadeo',
    icono: '📣',
    objetivo: 'Generar prospectos constantes y cerrar contratos de forma predecible',
    kpis: [
      { kpi: 'Tasa de cierre de cotizaciones %', meta: '≥ 30%', frecuencia: 'Semanal', responsable: 'Responsable comercial' },
      { kpi: 'Costo de Adquisición de Cliente (CAC) por canal', meta: 'CAC < 10% del valor del proyecto', frecuencia: 'Mensual', responsable: 'Dueño' },
    ],
    kris: [
      { kri: 'Semanas sin nuevas cotizaciones enviadas', umbralAlerta: '≥ 2 semanas sin cotizaciones', frecuencia: 'Semanal' },
      { kri: 'Tasa de cierre por debajo del umbral durante 30 días', umbralAlerta: 'Cierre < 20% por 30 días', frecuencia: 'Mensual' },
    ],
  },
  {
    areaId: 'operaciones',
    areaNombre: 'Operaciones',
    icono: '⚙️',
    objetivo: 'Entregar proyectos a tiempo, con calidad y sin desperdicios',
    kpis: [
      { kpi: '% proyectos entregados en tiempo y presupuesto', meta: '≥ 85%', frecuencia: 'Por proyecto', responsable: 'Encargado de obra' },
      { kpi: 'Score de satisfacción post-entrega (encuesta 1-5)', meta: '≥ 4.2 promedio', frecuencia: 'Por proyecto', responsable: 'Encargado de calidad' },
    ],
    kris: [
      { kri: 'Proyectos con retraso simultáneo en ejecución', umbralAlerta: '≥ 2 proyectos con retraso al mismo tiempo', frecuencia: 'Semanal' },
      { kri: 'Quejas de calidad documentadas en el mes', umbralAlerta: '> 3 quejas en un mes', frecuencia: 'Mensual' },
    ],
  },
  {
    areaId: 'personas',
    areaNombre: 'Personas',
    icono: '👥',
    objetivo: 'Mantener un equipo estable, productivo y comprometido',
    kpis: [
      { kpi: 'Rotación mensual de personal %', meta: '< 5% mensual', frecuencia: 'Mensual', responsable: 'Dueño' },
      { kpi: 'Días hasta productividad plena de nuevo empleado', meta: '≤ 10 días laborables', frecuencia: 'Por incorporación', responsable: 'Dueño' },
    ],
    kris: [
      { kri: 'Renuncias o bajas en un período de 30 días', umbralAlerta: '≥ 2 renuncias en 30 días', frecuencia: 'Mensual' },
      { kri: 'Cuadrilla sin encargado designado', umbralAlerta: '> 1 semana sin encargado', frecuencia: 'Semanal' },
    ],
  },
];

export function generarKpiKri(scoresPorArea: ScoresPorArea): KpiKriArea[] {
  return KPI_KRI_DATA.filter((k) => scoresPorArea[k.areaId] !== undefined);
}

export { KPI_KRI_DATA };
