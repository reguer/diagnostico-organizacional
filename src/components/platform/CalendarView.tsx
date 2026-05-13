import { useMemo, useState } from 'react';
import { getTaskDisplayDate, setTaskDate, type PlanTask } from '../../lib/activePlan';
import { buildIcs, downloadIcs } from '../../lib/exportCalendar';
import type { Meta } from '../../lib/metricas';

interface CalendarViewProps {
  tasks: PlanTask[];
  metas: Meta[];
  onChanged: () => void;
}

function monthDays(month: string) {
  const [year, monthIndex] = month.split('-').map(Number);
  const first = new Date(year, monthIndex - 1, 1);
  const last = new Date(year, monthIndex, 0);
  const days: string[] = [];
  for (let day = 1; day <= last.getDate(); day += 1) {
    days.push(new Date(year, monthIndex - 1, day).toISOString().slice(0, 10));
  }
  const prefix = Array.from({ length: first.getDay() }, () => '');
  return [...prefix, ...days];
}

const currentMonth = new Date().toISOString().slice(0, 7);

export function CalendarView({ tasks, metas, onChanged }: CalendarViewProps) {
  const [month, setMonth] = useState(currentMonth);
  const [selected, setSelected] = useState(new Date().toISOString().slice(0, 10));
  const days = useMemo(() => monthDays(month), [month]);
  const selectedTasks = tasks.filter((task) => getTaskDisplayDate(task) === selected);
  const selectedGoals = metas.filter((meta) => meta.fechaLimite === selected);

  function handleExport() {
    downloadIcs('diagnostico-calendario.ics', buildIcs(tasks, metas));
  }

  return (
    <section className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <input type="month" value={month} onChange={(event) => setMonth(event.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm" />
          <button type="button" onClick={handleExport} className="rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-700">Exportar .ics</button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold uppercase tracking-wider text-slate-400">
          {['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'].map((day) => <div key={day}>{day}</div>)}
        </div>
        <div className="mt-2 grid grid-cols-7 gap-1">
          {days.map((day, idx) => {
            const dayTasks = tasks.filter((task) => day && getTaskDisplayDate(task) === day);
            const dayGoals = metas.filter((meta) => day && meta.fechaLimite === day);
            return (
              <button
                key={`${day}-${idx}`}
                type="button"
                onClick={() => day && setSelected(day)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  if (!day) return;
                  setTaskDate(event.dataTransfer.getData('text/plain'), day);
                  onChanged();
                }}
                className={`min-h-24 rounded-xl border p-2 text-left transition-colors ${day === selected ? 'border-indigo-300 bg-indigo-50' : 'border-slate-100 bg-slate-50 hover:border-slate-200'}`}
              >
                {day && <span className="text-xs font-bold text-slate-500">{Number(day.slice(-2))}</span>}
                <div className="mt-1 space-y-1">
                  {dayTasks.slice(0, 2).map((task) => (
                    <div key={task.id} draggable onDragStart={(event) => event.dataTransfer.setData('text/plain', task.id)} className="truncate rounded bg-white px-1.5 py-1 text-[11px] font-semibold text-slate-600">
                      {task.titulo}
                    </div>
                  ))}
                  {dayGoals.length > 0 && <div className="rounded bg-emerald-50 px-1.5 py-1 text-[11px] font-bold text-emerald-700">Meta</div>}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <aside className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800">{selected}</h3>
        <div className="mt-4 space-y-3">
          {selectedTasks.map((task) => (
            <article key={task.id} draggable onDragStart={(event) => event.dataTransfer.setData('text/plain', task.id)} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
              <p className="text-sm font-bold text-slate-700">{task.titulo}</p>
              <p className="mt-1 text-xs text-slate-400">{task.areaNombre} · {task.tipo}</p>
            </article>
          ))}
          {selectedGoals.map((meta) => (
            <article key={meta.id} className="rounded-xl border border-emerald-100 bg-emerald-50 p-3">
              <p className="text-sm font-bold text-emerald-800">{meta.descripcion}</p>
              <p className="mt-1 text-xs text-emerald-600">Meta</p>
            </article>
          ))}
          {selectedTasks.length === 0 && selectedGoals.length === 0 && <p className="text-sm text-slate-400">Sin actividades para este dia.</p>}
        </div>
      </aside>
    </section>
  );
}
