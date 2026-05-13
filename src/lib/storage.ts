import type { ResultadosDiagnostico } from './calculator';
import type { ConfigDiagnostico } from './config';

export type EstadoTarea = 'pendiente' | 'en_progreso' | 'completada';

export interface DiagnosticoGuardado {
  id: string;
  fecha: string;
  config: ConfigDiagnostico;
  respuestas: Record<string, number>;
  resultado: ResultadosDiagnostico;
}

export interface EstadoTareaGuardado {
  id: string;
  estado: EstadoTarea;
  nota?: string;
  fechaAsignada?: string;
  fechaCompletada?: string;
  fechaActualizacion: string;
}

const HISTORIAL_KEY = 'diag:historial';
const BADGES_KEY = 'diag:badges';
const TAREA_PREFIX = 'diag:tareas:';

export function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function readJson<T>(key: string, fallback: T): T {
  if (!canUseStorage()) return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJson<T>(key: string, value: T) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function createDiagnosticId(fecha = new Date()) {
  return `diag-${fecha.toISOString()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function getHistorialDiagnosticos() {
  return readJson<DiagnosticoGuardado[]>(HISTORIAL_KEY, []).sort(
    (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime(),
  );
}

export function saveDiagnostico(diagnostico: DiagnosticoGuardado) {
  const historial = getHistorialDiagnosticos();
  const filtrado = historial.filter((item) => item.id !== diagnostico.id);
  writeJson(HISTORIAL_KEY, [diagnostico, ...filtrado]);
  return diagnostico;
}

export function replaceHistorialDiagnosticos(historial: DiagnosticoGuardado[]) {
  writeJson(HISTORIAL_KEY, historial);
}

export function deleteDiagnostico(id: string) {
  const historial = getHistorialDiagnosticos().filter((item) => item.id !== id);
  writeJson(HISTORIAL_KEY, historial);
}

export function getDiagnosticoAnterior(id: string) {
  const historial = getHistorialDiagnosticos().sort(
    (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime(),
  );
  const idx = historial.findIndex((item) => item.id === id);
  return idx > 0 ? historial[idx - 1] : null;
}

export function buildTaskId(diagnosticoId: string, areaId: string) {
  return `${diagnosticoId}:accion:${areaId}`;
}

export function getEstadoTarea(id: string): EstadoTareaGuardado {
  return readJson<EstadoTareaGuardado>(`${TAREA_PREFIX}${id}`, {
    id,
    estado: 'pendiente',
    fechaActualizacion: new Date().toISOString(),
  });
}

export function setEstadoTarea(id: string, estado: EstadoTarea) {
  const previo = getEstadoTarea(id);
  const siguiente: EstadoTareaGuardado = {
    ...previo,
    id,
    estado,
    fechaCompletada: estado === 'completada' ? (previo.fechaCompletada ?? new Date().toISOString()) : undefined,
    fechaActualizacion: new Date().toISOString(),
  };

  writeJson(`${TAREA_PREFIX}${id}`, siguiente);
  return siguiente;
}

export function updateEstadoTarea(id: string, patch: Partial<Omit<EstadoTareaGuardado, 'id'>>) {
  const previo = getEstadoTarea(id);
  const estadoFinal = patch.estado ?? previo.estado;
  const siguiente: EstadoTareaGuardado = {
    ...previo,
    ...patch,
    id,
    estado: estadoFinal,
    fechaCompletada: estadoFinal === 'completada'
      ? (previo.fechaCompletada ?? new Date().toISOString())
      : undefined,
    fechaActualizacion: new Date().toISOString(),
  };

  writeJson(`${TAREA_PREFIX}${id}`, siguiente);
  return siguiente;
}

export function getEstadosTareas() {
  if (!canUseStorage()) return [];

  const estados: EstadoTareaGuardado[] = [];
  for (let i = 0; i < window.localStorage.length; i += 1) {
    const key = window.localStorage.key(i);
    if (key?.startsWith(TAREA_PREFIX)) {
      estados.push(readJson<EstadoTareaGuardado>(key, {
        id: key.replace(TAREA_PREFIX, ''),
        estado: 'pendiente',
        fechaActualizacion: new Date().toISOString(),
      }));
    }
  }
  return estados;
}

export function replaceEstadosTareas(estados: EstadoTareaGuardado[]) {
  if (!canUseStorage()) return;
  const keysToRemove: string[] = [];
  for (let i = 0; i < window.localStorage.length; i += 1) {
    const key = window.localStorage.key(i);
    if (key?.startsWith(TAREA_PREFIX)) keysToRemove.push(key);
  }
  keysToRemove.forEach((key) => window.localStorage.removeItem(key));
  estados.forEach((estado) => writeJson(`${TAREA_PREFIX}${estado.id}`, estado));
}

export function getBadgesDesbloqueados() {
  return readJson<string[]>(BADGES_KEY, []);
}

export function saveBadgesDesbloqueados(ids: string[]) {
  writeJson(BADGES_KEY, Array.from(new Set(ids)));
}
