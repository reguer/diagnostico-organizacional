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

export function TaskBoard({ tasks, onChanged }: TaskBoardProps) {
  const [areaFilter, setAreaFilter] = useState('todas');
  const [typeFilter, setTypeFilter] = useState('todos');
  const filtered = useMemo(() => tasks.filter((task) => {
    const byArea = areaFilter === 'todas' || task.areaId === areaFilter;
    const byType = typeFilter === 'todos' || task.tipo === typeFilter;
    return byArea && byType;
  }), [areaFilter, tasks, typeFilter]);

  function moveTask(taskId: string, estado: EstadoTarea) {
    setTaskStatus(taskId, estado);
    if (estado === 'completada') {
      const assigned = getAssignedMember(taskId);
      addActivity(assigned?.nombre ?? 'Usuario local', 'completo una tarea', taskId);
    }
    onChanged();
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <select value={areaFilter} onChange={(event) => setAreaFilter(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600">
          <option value="todas">Todas las areas</option>
          {AREAS.map((area) => <option key={area.id} value={area.id}>{area.nombre}</option>)}
        </select>
        <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600">
          <option value="todos">Todos los tipos</option>
          <option value="remediacion">Remediacion</option>
          <option value="optimizacion">Optimizacion</option>
          <option value="crecimiento">Crecimiento</option>
        </select>
      </div>

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

              <div className="space-y-3">
                {columnTasks.map((task) => {
                  const runtime = getTaskRuntime(task.id);
                  return (
                    <article
                      key={task.id}
                      draggable
                      onDragStart={(event) => event.dataTransfer.setData('text/plain', task.id)}
                      className={`rounded-xl border bg-white p-3 shadow-sm ${task.origen === 'personalizada' ? 'border-dashed border-indigo-300' : 'border-slate-100'}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className={`text-sm font-bold ${runtime.estado === 'completada' ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{task.titulo}</p>
                          <p className="mt-1 text-xs text-slate-500">{task.areaNombre}</p>
                        </div>
                        <span className={`rounded-full border px-2 py-1 text-[11px] font-bold ${typeColor[task.tipo]}`}>{task.tipo}</span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-slate-500">{task.detalle}</p>
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
                        <span className="text-xs text-slate-400">{getTaskDisplayDate(task)}</span>
                      </div>
                      <TaskNote task={task} onSaved={onChanged} />
                    </article>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
