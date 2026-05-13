import { useState } from 'react';
import { getTaskRuntime, setTaskNote, type PlanTask } from '../../lib/activePlan';

interface TaskNoteProps {
  task: PlanTask;
  onSaved: () => void;
}

export function TaskNote({ task, onSaved }: TaskNoteProps) {
  const [open, setOpen] = useState(false);
  const [nota, setNota] = useState(() => getTaskRuntime(task.id).nota ?? '');

  function handleSave() {
    setTaskNote(task.id, nota);
    setOpen(false);
    onSaved();
  }

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
      >
        Nota
      </button>

      {open && (
        <div className="mt-2 space-y-2">
          <textarea
            value={nota}
            onChange={(event) => setNota(event.target.value)}
            rows={3}
            placeholder="Qué hiciste, qué bloqueó o qué aprendiste..."
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-700 outline-none focus:border-indigo-300"
          />
          <button
            type="button"
            onClick={handleSave}
            className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700"
          >
            Guardar nota
          </button>
        </div>
      )}
    </div>
  );
}
