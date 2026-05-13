import { useState } from 'react';
import { AREAS } from '../../data/diagnostico';
import { saveCustomTask, type TipoTarea } from '../../lib/activePlan';

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
  onAdded: () => void;
}

const today = new Date().toISOString().slice(0, 10);

export function AddTaskModal({ open, onClose, onAdded }: AddTaskModalProps) {
  const [titulo, setTitulo] = useState('');
  const [detalle, setDetalle] = useState('');
  const [areaId, setAreaId] = useState(AREAS[0].id);
  const [tipo, setTipo] = useState<TipoTarea>('optimizacion');
  const [duracion, setDuracion] = useState('1 hora');
  const [fechaAsignada, setFechaAsignada] = useState(today);

  if (!open) return null;

  function handleSubmit() {
    if (!titulo.trim()) return;
    saveCustomTask({ titulo, detalle, areaId, tipo, duracion, fechaAsignada });
    setTitulo('');
    setDetalle('');
    onAdded();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 px-4 py-6">
      <div className="mx-auto max-w-lg rounded-2xl bg-white p-5 shadow-xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-800">Agregar tarea propia</h3>
            <p className="mt-1 text-xs text-slate-400">Queda guardada en este navegador.</p>
          </div>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-700">x</button>
        </div>

        <div className="mt-4 grid gap-3">
          <input value={titulo} onChange={(event) => setTitulo(event.target.value)} placeholder="Titulo" className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-300" />
          <textarea value={detalle} onChange={(event) => setDetalle(event.target.value)} rows={3} placeholder="Detalle" className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-300" />
          <div className="grid grid-cols-2 gap-3">
            <select value={areaId} onChange={(event) => setAreaId(event.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm">
              {AREAS.map((area) => <option key={area.id} value={area.id}>{area.nombre}</option>)}
            </select>
            <select value={tipo} onChange={(event) => setTipo(event.target.value as TipoTarea)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm">
              <option value="remediacion">Remediacion</option>
              <option value="optimizacion">Optimizacion</option>
              <option value="crecimiento">Crecimiento</option>
            </select>
            <input value={duracion} onChange={(event) => setDuracion(event.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm" />
            <input type="date" value={fechaAsignada} onChange={(event) => setFechaAsignada(event.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm" />
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-500">Cancelar</button>
          <button type="button" onClick={handleSubmit} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">Agregar</button>
        </div>
      </div>
    </div>
  );
}
