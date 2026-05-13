import { AREAS } from '../data/diagnostico';
import type { AccionItem } from './calculator';
import {
  buildTaskId,
  getEstadoTarea,
  readJson,
  updateEstadoTarea,
  writeJson,
  type DiagnosticoGuardado,
  type EstadoTarea,
} from './storage';

export type TipoTarea = 'remediacion' | 'optimizacion' | 'crecimiento';

export interface PlanTask {
  id: string;
  titulo: string;
  detalle: string;
  areaId: string;
  areaNombre: string;
  tipo: TipoTarea;
  duracion: string;
  fechaAsignada: string;
  origen: 'diagnostico' | 'personalizada';
}

export interface CustomTaskInput {
  titulo: string;
  detalle: string;
  areaId: string;
  tipo: TipoTarea;
  duracion: string;
  fechaAsignada: string;
}

const CUSTOM_TASKS_KEY = 'diag:tareas:custom';

function toIsoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function addDays(base: Date, days: number) {
  const date = new Date(base);
  date.setDate(date.getDate() + days);
  return date;
}

function inferTipo(score: number): TipoTarea {
  if (score < 50) return 'remediacion';
  if (score < 75) return 'optimizacion';
  return 'crecimiento';
}

function generatedTask(diagnostico: DiagnosticoGuardado, accion: AccionItem, idx: number): PlanTask {
  const estado = getEstadoTarea(buildTaskId(diagnostico.id, accion.areaId));
  const fechaBase = new Date(diagnostico.fecha);

  return {
    id: buildTaskId(diagnostico.id, accion.areaId),
    titulo: accion.accion,
    detalle: accion.detalle,
    areaId: accion.areaId,
    areaNombre: accion.areaNombre,
    tipo: inferTipo(diagnostico.resultado.scoresPorArea[accion.areaId] ?? 0),
    duracion: accion.plazo,
    fechaAsignada: estado.fechaAsignada ?? toIsoDate(addDays(fechaBase, idx)),
    origen: 'diagnostico',
  };
}

export function getGeneratedTasks(diagnostico: DiagnosticoGuardado) {
  return diagnostico.resultado.planAccion.map((accion, idx) => generatedTask(diagnostico, accion, idx));
}

export function getCustomTasks() {
  return readJson<PlanTask[]>(CUSTOM_TASKS_KEY, []);
}

export function saveCustomTask(input: CustomTaskInput) {
  const area = AREAS.find((item) => item.id === input.areaId) ?? AREAS[0];
  const task: PlanTask = {
    id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    titulo: input.titulo,
    detalle: input.detalle,
    areaId: input.areaId,
    areaNombre: area.nombre,
    tipo: input.tipo,
    duracion: input.duracion,
    fechaAsignada: input.fechaAsignada,
    origen: 'personalizada',
  };
  writeJson(CUSTOM_TASKS_KEY, [task, ...getCustomTasks()]);
  return task;
}

export function getActiveTasks(diagnostico: DiagnosticoGuardado) {
  return [...getGeneratedTasks(diagnostico), ...getCustomTasks()];
}

export function setTaskStatus(id: string, estado: EstadoTarea) {
  return updateEstadoTarea(id, { estado });
}

export function setTaskNote(id: string, nota: string) {
  return updateEstadoTarea(id, { nota });
}

export function setTaskDate(id: string, fechaAsignada: string) {
  return updateEstadoTarea(id, { fechaAsignada });
}

export function getTaskRuntime(id: string) {
  return getEstadoTarea(id);
}

export function getTaskDisplayDate(task: PlanTask) {
  return getTaskRuntime(task.id).fechaAsignada ?? task.fechaAsignada;
}
