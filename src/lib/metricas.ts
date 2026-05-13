import { AREAS } from '../data/diagnostico';
import type { AccionItem } from './calculator';
import { readJson, writeJson } from './storage';

export type EstadoMeta = 'activa' | 'alcanzada' | 'cancelada';

export interface Meta {
  id: string;
  descripcion: string;
  valorObjetivo?: number;
  fechaLimite: string;
  areaId: string;
  estado: EstadoMeta;
  sugerida?: boolean;
}

export interface KpiRegistro {
  mes: string;
  valor: number;
}

export interface FinanzasRegistro {
  mes: string;
  ingresos: number;
  gastos: Record<string, number>;
}

export const FINANZAS_CATEGORIES = [
  { id: 'gastos_fijos', label: 'Gastos fijos' },
  { id: 'gastos_operativos', label: 'Gastos operativos' },
  { id: 'gastos_obra', label: 'Gastos por obra' },
  { id: 'impuestos', label: 'Impuestos' },
];

export interface KpiDefinition {
  id: string;
  areaId: string;
  nombre: string;
  unidad: string;
  direccionMejora: 'sube' | 'baja';
  kri?: { operador: 'mayor' | 'menor'; valor: number; mensaje: string };
}

export const KPI_DEFINITIONS: KpiDefinition[] = [
  { id: 'margen-bruto', areaId: 'finanzas', nombre: 'Margen bruto', unidad: '%', direccionMejora: 'sube', kri: { operador: 'menor', valor: 25, mensaje: 'Margen por debajo de 25%' } },
  { id: 'dso', areaId: 'finanzas', nombre: 'Dias de cobro', unidad: 'dias', direccionMejora: 'baja', kri: { operador: 'mayor', valor: 60, mensaje: 'DSO supero 60 dias' } },
  { id: 'cierre-financiero', areaId: 'finanzas', nombre: 'Proyectos con cierre financiero', unidad: '%', direccionMejora: 'sube', kri: { operador: 'menor', valor: 70, mensaje: 'Pocos proyectos tienen cierre financiero' } },
  { id: 'reserva-capital', areaId: 'finanzas', nombre: 'Meses de reserva de capital', unidad: 'meses', direccionMejora: 'sube', kri: { operador: 'menor', valor: 1, mensaje: 'Reserva menor a un mes de operacion' } },
  { id: 'cumplimiento-presupuesto', areaId: 'finanzas', nombre: 'Desviacion vs presupuesto', unidad: '%', direccionMejora: 'baja', kri: { operador: 'mayor', valor: 15, mensaje: 'Desviacion presupuestal alta' } },
  { id: 'tiempo-muerto', areaId: 'operaciones', nombre: 'Tiempo muerto de cuadrilla', unidad: 'hrs/sem', direccionMejora: 'baja', kri: { operador: 'mayor', valor: 10, mensaje: 'Demasiadas horas improductivas' } },
  { id: 'entregas-a-tiempo', areaId: 'operaciones', nombre: 'Proyectos entregados a tiempo', unidad: '%', direccionMejora: 'sube', kri: { operador: 'menor', valor: 80, mensaje: 'Cumplimiento de plazos bajo' } },
  { id: 'incidentes-obra', areaId: 'operaciones', nombre: 'Incidentes en obra', unidad: '#/mes', direccionMejora: 'baja', kri: { operador: 'mayor', valor: 2, mensaje: 'Incidentes operativos por encima del umbral' } },
  { id: 'checklists-cierre', areaId: 'operaciones', nombre: 'Cierres con checklist completo', unidad: '%', direccionMejora: 'sube', kri: { operador: 'menor', valor: 85, mensaje: 'Falta evidencia de calidad en cierres' } },
  { id: 'evaluacion-proveedores', areaId: 'operaciones', nombre: 'Proveedores evaluados', unidad: '%', direccionMejora: 'sube' },
  { id: 'cotizaciones', areaId: 'mercadeo', nombre: 'Cotizaciones nuevas', unidad: '#', direccionMejora: 'sube' },
  { id: 'conversion-cotizaciones', areaId: 'mercadeo', nombre: 'Conversion de cotizaciones', unidad: '%', direccionMejora: 'sube', kri: { operador: 'menor', valor: 20, mensaje: 'Tasa de cierre baja' } },
  { id: 'prospectos-nuevos', areaId: 'mercadeo', nombre: 'Prospectos nuevos', unidad: '#/mes', direccionMejora: 'sube' },
  { id: 'resenas-clientes', areaId: 'mercadeo', nombre: 'Resenas nuevas', unidad: '#/mes', direccionMejora: 'sube' },
  { id: 'seguimiento-cotizaciones', areaId: 'mercadeo', nombre: 'Cotizaciones con seguimiento', unidad: '%', direccionMejora: 'sube', kri: { operador: 'menor', valor: 90, mensaje: 'Cotizaciones sin seguimiento suficiente' } },
  { id: 'rotacion', areaId: 'personas', nombre: 'Rotacion mensual', unidad: '%', direccionMejora: 'baja', kri: { operador: 'mayor', valor: 15, mensaje: 'Rotacion alta del equipo' } },
  { id: 'productividad-cuadrilla', areaId: 'personas', nombre: 'Productividad de cuadrilla', unidad: '% meta', direccionMejora: 'sube', kri: { operador: 'menor', valor: 75, mensaje: 'Productividad por debajo de meta' } },
  { id: 'capacitacion-equipo', areaId: 'personas', nombre: 'Horas de capacitacion', unidad: 'hrs/mes', direccionMejora: 'sube' },
  { id: 'evaluaciones-desempeno', areaId: 'personas', nombre: 'Evaluaciones completadas', unidad: '%', direccionMejora: 'sube', kri: { operador: 'menor', valor: 80, mensaje: 'Evaluaciones de desempeno incompletas' } },
  { id: 'incidencias-personas', areaId: 'personas', nombre: 'Incidencias de equipo abiertas', unidad: '#', direccionMejora: 'baja' },
  { id: 'revision-metas', areaId: 'estrategia', nombre: 'Revisiones de metas', unidad: '#/mes', direccionMejora: 'sube' },
  { id: 'avance-okrs', areaId: 'estrategia', nombre: 'Avance de OKRs/metas', unidad: '%', direccionMejora: 'sube', kri: { operador: 'menor', valor: 60, mensaje: 'Avance estrategico bajo' } },
  { id: 'proyectos-alineados', areaId: 'estrategia', nombre: 'Proyectos alineados al cliente ideal', unidad: '%', direccionMejora: 'sube' },
  { id: 'alianzas-activas', areaId: 'estrategia', nombre: 'Alianzas activas', unidad: '#', direccionMejora: 'sube' },
  { id: 'cumplimiento-regulatorio', areaId: 'estrategia', nombre: 'Cumplimiento regulatorio documentado', unidad: '%', direccionMejora: 'sube', kri: { operador: 'menor', valor: 90, mensaje: 'Riesgo regulatorio pendiente' } },
];

const METAS_KEY = 'diag:metas';
const FINANZAS_KEY = 'diag:finanzas';

function kpiKey(kpiId: string) {
  return `diag:kpi:${kpiId}`;
}

export function getMetas() {
  return readJson<Meta[]>(METAS_KEY, []);
}

export function replaceMetas(metas: Meta[]) {
  writeJson(METAS_KEY, metas);
}

export function saveMeta(meta: Omit<Meta, 'id'>) {
  const nueva: Meta = { ...meta, id: `meta-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` };
  writeJson(METAS_KEY, [nueva, ...getMetas()]);
  return nueva;
}

export function updateMeta(id: string, patch: Partial<Meta>) {
  writeJson(METAS_KEY, getMetas().map((meta) => (meta.id === id ? { ...meta, ...patch } : meta)));
}

export function ensureSuggestedGoals(areaIds: string[]) {
  const actuales = getMetas();
  const sugeridas = areaIds
    .filter((areaId) => !actuales.some((meta) => meta.sugerida && meta.areaId === areaId))
    .map((areaId) => {
      const area = AREAS.find((item) => item.id === areaId) ?? AREAS[0];
      const limite = new Date();
      limite.setDate(limite.getDate() + 30);
      return {
        id: `meta-sugerida-${areaId}-${Date.now()}`,
        descripcion: `Mejorar el sistema de ${area.nombre.toLowerCase()} este mes`,
        fechaLimite: limite.toISOString().slice(0, 10),
        areaId,
        estado: 'activa' as const,
        sugerida: true,
      };
    });
  if (sugeridas.length > 0) writeJson(METAS_KEY, [...sugeridas, ...actuales]);
}

export function getKpiSeries(kpiId: string) {
  return readJson<KpiRegistro[]>(kpiKey(kpiId), []);
}

export function ensureSuggestedGoalsFromActions(actions: AccionItem[]) {
  const actuales = getMetas();
  const sugeridas = actions
    .filter((accion) => accion.preguntaId)
    .filter((accion) => !actuales.some((meta) => meta.sugerida && meta.id.includes(accion.preguntaId ?? '')))
    .slice(0, 30)
    .map((accion, idx) => {
      const limite = new Date();
      limite.setDate(limite.getDate() + 21 + Math.floor(idx / 5) * 14);
      return {
        id: `meta-sugerida-${accion.preguntaId}-${Date.now()}-${idx}`,
        descripcion: `${accion.areaNombre}: avanzar de "${accion.respuestaActual ?? 'estado actual'}" a "${accion.respuestaObjetivo ?? 'estado objetivo'}"`,
        fechaLimite: limite.toISOString().slice(0, 10),
        areaId: accion.areaId,
        estado: 'activa' as const,
        sugerida: true,
      };
    });
  if (sugeridas.length > 0) writeJson(METAS_KEY, [...sugeridas, ...actuales]);
}

export function replaceKpiSeries(kpiId: string, series: KpiRegistro[]) {
  writeJson(kpiKey(kpiId), series.sort((a, b) => a.mes.localeCompare(b.mes)));
}

export function saveKpiRegistro(kpiId: string, registro: KpiRegistro) {
  const serie = getKpiSeries(kpiId).filter((item) => item.mes !== registro.mes);
  writeJson(kpiKey(kpiId), [...serie, registro].sort((a, b) => a.mes.localeCompare(b.mes)));
}

export function getFinanzas() {
  return readJson<FinanzasRegistro[]>(FINANZAS_KEY, []);
}

export function replaceFinanzas(registros: FinanzasRegistro[]) {
  writeJson(FINANZAS_KEY, registros.sort((a, b) => b.mes.localeCompare(a.mes)));
}

export function saveFinanzas(registro: FinanzasRegistro) {
  const registros = getFinanzas().filter((item) => item.mes !== registro.mes);
  writeJson(FINANZAS_KEY, [...registros, registro].sort((a, b) => b.mes.localeCompare(a.mes)));
}
