import { AREAS } from '../data/diagnostico';
import type { AccionItem } from './calculator';
import { calcularResultados } from './calculator';
import { filtrarPreguntas } from './filterQuestions';
import {
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
  epic?: string;
  story?: string;
  preguntaId?: string;
  fase?: 'preparacion' | 'implementacion' | 'evaluacion';
  paralelo?: boolean;
  recurrencia?: 'semanal' | 'mensual';
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

function actionTaskId(diagnosticoId: string, accion: AccionItem, suffix: string | number) {
  return `${diagnosticoId}:accion:${accion.areaId}:${accion.preguntaId ?? 'area'}:${suffix}`;
}

function generatedTask(
  diagnostico: DiagnosticoGuardado,
  accion: AccionItem,
  idx: number,
  areaIndex: number,
  suffix: string | number = idx,
  titulo = accion.accion,
  detalle = accion.detalle,
): PlanTask {
  const taskId = actionTaskId(diagnostico.id, accion, suffix);
  const estado = getEstadoTarea(taskId);
  const fechaBase = new Date(diagnostico.fecha);
  const week = Math.floor(areaIndex / 2);
  const areaOffset = ['finanzas', 'operaciones', 'personas', 'mercadeo', 'estrategia'].indexOf(accion.areaId);
  const dayOffset = week * 7 + (areaOffset >= 0 ? areaOffset : idx % 5);

  return {
    id: taskId,
    titulo,
    detalle,
    areaId: accion.areaId,
    areaNombre: accion.areaNombre,
    tipo: inferTipo(diagnostico.resultado.scoresPorArea[accion.areaId] ?? 0),
    duracion: accion.plazo,
    fechaAsignada: estado.fechaAsignada ?? toIsoDate(addDays(fechaBase, dayOffset)),
    origen: 'diagnostico',
    epic: `${accion.icono} ${accion.areaNombre} · ${accion.subarea ?? 'Mejora operativa'}`,
    story: accion.preguntaId
      ? `Como dueño quiero cerrar la brecha de "${accion.preguntaId}" para avanzar de "${accion.respuestaActual ?? 'estado actual'}" a "${accion.respuestaObjetivo ?? 'estado objetivo'}".`
      : accion.accion,
    preguntaId: accion.preguntaId,
    fase: accion.fase,
    paralelo: accion.paralelo,
    recurrencia: accion.recurrencia,
  };
}

export function getGeneratedTasks(diagnostico: DiagnosticoGuardado) {
  const areasActivas = filtrarPreguntas(AREAS, diagnostico.config);
  const resultadoActualizado = calcularResultados(diagnostico.respuestas, areasActivas);
  const diagnosticoActualizado = { ...diagnostico, resultado: resultadoActualizado };
  const areaCounts: Record<string, number> = {};

  return resultadoActualizado.planAccion.flatMap((accion, idx) => {
    const areaIndex = areaCounts[accion.areaId] ?? 0;
    areaCounts[accion.areaId] = areaIndex + 1;

    const base = generatedTask(diagnosticoActualizado, accion, idx, areaIndex);
    if (accion.recurrencia !== 'semanal') return [base];

    const prep = generatedTask(
      diagnosticoActualizado,
      accion,
      idx,
      areaIndex,
      'prep',
      `Preparar formato recurrente: ${accion.accion}`,
      `${accion.detalle} Entregable: agenda, responsable, evidencia esperada y minuta base para que la rutina no dependa de improvisacion.`,
    );

    const fechaBase = new Date(prep.fechaAsignada);
    const ocurrencias = Array.from({ length: 12 }, (_, occurrenceIdx) => {
      const occurrenceDate = addDays(fechaBase, 7 * (occurrenceIdx + 1));
      const taskId = actionTaskId(diagnostico.id, accion, `semana-${occurrenceIdx + 1}`);
      const estado = getEstadoTarea(taskId);
      return {
        ...base,
        id: taskId,
        titulo: `${accion.accion} · semana ${occurrenceIdx + 1}`,
        detalle: `Ejecucion recurrente semanal. Revisa acuerdos anteriores, bloqueos, responsables y evidencia de avance. Base: ${accion.detalle}`,
        duracion: '20-45 minutos',
        fechaAsignada: estado.fechaAsignada ?? toIsoDate(occurrenceDate),
        fase: 'implementacion' as const,
        recurrencia: 'semanal' as const,
      };
    });

    return [prep, ...ocurrencias];
  });
}

export function getCustomTasks() {
  return readJson<PlanTask[]>(CUSTOM_TASKS_KEY, []);
}

export function replaceCustomTasks(tasks: PlanTask[]) {
  writeJson(CUSTOM_TASKS_KEY, tasks);
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
