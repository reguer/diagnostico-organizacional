import { useMemo, useState } from 'react';
import { AREAS } from '../../data/diagnostico';
import {
  getTaskDisplayDate,
  getTaskRuntime,
  setTaskDate,
  setTaskStatus,
  type PlanTask,
  type TipoTarea,
} from '../../lib/activePlan';
import type { EstadoTarea } from '../../lib/storage';
import { TaskNote } from './TaskNote';
import { addActivity, getAssignedMember } from '../../lib/team';

interface TaskBoardProps {
  tasks: PlanTask[];
  onChanged: () => void;
}

const columns: Array<{ id: EstadoTarea; label: string }> = [
  { id: 'pendiente', label: 'Pendiente' },
  { id: 'en_progreso', label: 'En progreso' },
  { id: 'completada', label: 'Completada' },
];

const typeColor: Record<TipoTarea, string> = {
  remediacion: 'border-red-200 bg-red-50 text-red-700',
  optimizacion: 'border-amber-200 bg-amber-50 text-amber-700',
  crecimiento: 'border-indigo-200 bg-indigo-50 text-indigo-700',
};

type ViewMode = 'flat' | 'grouped';

function mdCell(value: unknown) {
  return String(value ?? '').replace(/\|/g, '/').replace(/\n/g, ' ').trim();
}

function downloadNotionStories(tasks: PlanTask[]) {
  const lines = [
    '# Epics and Stories - Diagnostico Organizacional',
    '',
    '| Epic | Story | Tarea | Area | Tipo | Fase | Fecha | Duracion | Paralelo | Estado |',
    '| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |',
    ...tasks.map((task) => {
      const runtime = getTaskRuntime(task.id);
      return [
        task.epic ?? task.areaNombre,
        task.story ?? task.titulo,
        task.titulo,
        task.areaNombre,
        task.tipo,
        task.fase ?? 'implementacion',
        getTaskDisplayDate(task),
        task.duracion,
        task.paralelo ? 'Si' : 'No',
        runtime.estado,
      ].map(mdCell).join(' | ');
    }).map((row) => `| ${row} |`),
    '',
    '## Notas de ejecucion',
    '',
    '- Las tareas con `Paralelo = Si` pueden avanzar al mismo tiempo que tareas de otras areas.',
    '- Las tareas recurrentes semanales aparecen como tarjetas separadas para dar seguimiento real, no como una sola actividad.',
    '- Las fechas son una propuesta inicial; se pueden mover en el tablero o calendario sin perder respuestas.',
  ];
  const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'notion-ready-epics-stories.md';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function groupBy<T>(items: T[], key: (item: T) => string): Record<string, T[]> {
  return items.reduce<Record<string, T[]>>((acc, item) => {
    const k = key(item);
    (acc[k] ??= []).push(item);
    return acc;
  }, {});
}

interface TaskCardProps {
  task: PlanTask;
  onChanged: () => void;
  onMove: (id: string, estado: EstadoTarea) => void;
}

function TaskCard({ task, onChanged, onMove }: TaskCardProps) {
  const runtime = getTaskRuntime(task.id);
  return (
    <article
      draggable
      onDragStart={(event) => event.dataTransfer.setData('text/plain', task.id)}
      className={`rounded-xl border bg-white p-3 shadow-sm ${task.origen === 'personalizada' ? 'border-dashed border-indigo-300' : 'border-slate-100'}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          {task.epic && <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-indigo-500">{task.epic}</p>}
          <p className={`text-sm font-bold ${runtime.estado === 'completada' ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{task.titulo}</p>
          <p className="mt-1 text-xs text-slate-500">{task.areaNombre}</p>
        </div>
        <span className={`shrink-0 rounded-full border px-2 py-1 text-[11px] font-bold ${typeColor[task.tipo]}`}>{task.tipo}</span>
      </div>

      <p className="mt-2 text-xs leading-relaxed text-slate-500">{task.detalle}</p>

      {task.preguntaId && (
        <details className="mt-2">
          <summary className="cursor-pointer select-none text-[10px] text-slate-400 hover:text-slate-500">
            Ver referencia diagnóstico ({task.preguntaId})
          </summary>
          <p className="mt-1 text-[10px] leading-relaxed text-slate-400">{task.story}</p>
        </details>
      )}

      <div className="mt-2 flex flex-wrap gap-1.5">
        {task.fase && <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-slate-500">Fase: {task.fase}</span>}
        {task.paralelo && <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">Paralelo</span>}
        {task.recurrencia && <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700">🔄 {task.recurrencia}</span>}
      </div>

      {runtime.nota && <p className="mt-2 truncate rounded-lg bg-slate-50 px-2 py-1 text-xs text-slate-500">{runtime.nota}</p>}

      <div className="mt-3 flex items-center gap-2">
        <input
          type="date"
          value={runtime.fechaAsignada ?? task.fechaAsignada}
          onChange={(event) => {
            setTaskDate(task.id, event.target.value);
            onChanged();
          }}
          className="min-w-0 rounded-lg border border-slate-200 px-2 py-1 text-xs text-slate-600"
        />
      </div>

      <div className="mt-2 flex gap-1">
        {columns
          .filter((col) => col.id !== runtime.estado)
          .map((col) => (
            <button
              key={col.id}
              type="button"
              onClick={() => onMove(task.id, col.id)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-semibold text-slate-500 hover:bg-slate-100"
            >
              → {col.label}
            </button>
          ))}
      </div>

      <TaskNote task={task} onSaved={onChanged} />
    </article>
  );
}

interface EpicGroupProps {
  epicName: string;
  tasks: PlanTask[];
  onChanged: () => void;
  onMove: (id: string, estado: EstadoTarea) => void;
}

function EpicGroup({ epicName, tasks, onChanged, onMove }: EpicGroupProps) {
  const completadas = tasks.filter((t) => getTaskRuntime(t.id).estado === 'completada').length;
  const pct = Math.round((completadas / tasks.length) * 100);
  return (
    <details className="mb-2" open={completadas < tasks.length}>
      <summary className="flex cursor-pointer select-none items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 hover:bg-slate-200">
        <span className="flex-1 text-xs font-bold text-slate-700">{epicName}</span>
        <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-slate-500">
          {tasks.length} tareas · {pct}% lista
        </span>
      </summary>
      <div className="mt-2 space-y-2 pl-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onChanged={onChanged} onMove={onMove} />
        ))}
      </div>
    </details>
  );
}

export function TaskBoard({ tasks, onChanged }: TaskBoardProps) {
  const [areaFilter, setAreaFilter] = useState('todas');
  const [typeFilter, setTypeFilter] = useState('todos');
  const [faseFilter, setFaseFilter] = useState('todas');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('flat');

  const filtered = useMemo(() => tasks.filter((task) => {
    const byArea = areaFilter === 'todas' || task.areaId === areaFilter;
    const byType = typeFilter === 'todos' || task.tipo === typeFilter;
    const byFase = faseFilter === 'todas' || task.fase === faseFilter;
    const bySearch = search.trim() === '' || task.titulo.toLowerCase().includes(search.toLowerCase()) || task.areaNombre.toLowerCase().includes(search.toLowerCase());
    return byArea && byType && byFase && bySearch;
  }), [areaFilter, faseFilter, search, tasks, typeFilter]);

  function moveTask(taskId: string, estado: EstadoTarea) {
    setTaskStatus(taskId, estado);
    if (estado === 'completada') {
      const assigned = getAssignedMember(taskId);
      addActivity(assigned?.nombre ?? 'Usuario local', 'completó una tarea', taskId);
    }
    onChanged();
  }

  return (
    <section className="space-y-4">
      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="search"
          placeholder="Buscar tarea..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <select value={areaFilter} onChange={(event) => setAreaFilter(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600">
          <option value="todas">Todas las áreas</option>
          {AREAS.map((area) => <option key={area.id} value={area.id}>{area.nombre}</option>)}
        </select>
        <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600">
          <option value="todos">Todos los tipos</option>
          <option value="remediacion">Remediación</option>
          <option value="optimizacion">Optimización</option>
          <option value="crecimiento">Crecimiento</option>
        </select>
        <select value={faseFilter} onChange={(event) => setFaseFilter(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600">
          <option value="todas">Todas las fases</option>
          <option value="preparacion">Preparación</option>
          <option value="implementacion">Implementación</option>
          <option value="evaluacion">Evaluación</option>
        </select>
        <button
          type="button"
          onClick={() => setViewMode((v) => v === 'flat' ? 'grouped' : 'flat')}
          className={`rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${viewMode === 'grouped' ? 'border-indigo-300 bg-indigo-50 text-indigo-700' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`}
        >
          {viewMode === 'flat' ? 'Agrupar por epic' : 'Vista plana'}
        </button>
        <button
          type="button"
          onClick={() => downloadNotionStories(filtered)}
          className="rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700 hover:bg-indigo-100"
        >
          Descargar Notion-ready
        </button>
      </div>

      {/* Kanban */}
      <div className="grid gap-4 lg:grid-cols-3">
        {columns.map((column) => {
          const columnTasks = filtered.filter((task) => getTaskRuntime(task.id).estado === column.id);

          return (
            <div
              key={column.id}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => moveTask(event.dataTransfer.getData('text/plain'), column.id)}
              className="min-h-80 rounded-2xl border border-slate-200 bg-slate-50 p-3"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-700">{column.label}</h3>
                <span className="rounded-full bg-white px-2 py-1 text-xs font-bold text-slate-500">{columnTasks.length}</span>
              </div>

              {viewMode === 'flat' ? (
                <div className="space-y-3">
                  {columnTasks.map((task) => (
                    <TaskCard key={task.id} task={task} onChanged={onChanged} onMove={moveTask} />
                  ))}
                </div>
              ) : (
                <div>
                  {Object.entries(groupBy(columnTasks, (t) => t.epic ?? t.areaNombre)).map(([epicName, epicTasks]) => (
                    <EpicGroup key={epicName} epicName={epicName} tasks={epicTasks} onChanged={onChanged} onMove={moveTask} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
