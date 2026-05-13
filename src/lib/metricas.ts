import { AREAS } from '../data/diagnostico';
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
  { id: 'tiempo-muerto', areaId: 'operaciones', nombre: 'Tiempo muerto de cuadrilla', unidad: 'hrs/sem', direccionMejora: 'baja', kri: { operador: 'mayor', valor: 10, mensaje: 'Demasiadas horas improductivas' } },
  { id: 'cotizaciones', areaId: 'mercadeo', nombre: 'Cotizaciones nuevas', unidad: '#', direccionMejora: 'sube' },
  { id: 'rotacion', areaId: 'personas', nombre: 'Rotacion mensual', unidad: '%', direccionMejora: 'baja', kri: { operador: 'mayor', valor: 15, mensaje: 'Rotacion alta del equipo' } },
  { id: 'revision-metas', areaId: 'estrategia', nombre: 'Revisiones de metas', unidad: '#/mes', direccionMejora: 'sube' },
];

const METAS_KEY = 'diag:metas';
const FINANZAS_KEY = 'diag:finanzas';

function kpiKey(kpiId: string) {
  return `diag:kpi:${kpiId}`;
}

export function getMetas() {
  return readJson<Meta[]>(METAS_KEY, []);
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

export function saveKpiRegistro(kpiId: string, registro: KpiRegistro) {
  const serie = getKpiSeries(kpiId).filter((item) => item.mes !== registro.mes);
  writeJson(kpiKey(kpiId), [...serie, registro].sort((a, b) => a.mes.localeCompare(b.mes)));
}

export function getFinanzas() {
  return readJson<FinanzasRegistro[]>(FINANZAS_KEY, []);
}

export function saveFinanzas(registro: FinanzasRegistro) {
  const registros = getFinanzas().filter((item) => item.mes !== registro.mes);
  writeJson(FINANZAS_KEY, [...registros, registro].sort((a, b) => b.mes.localeCompare(a.mes)));
}
