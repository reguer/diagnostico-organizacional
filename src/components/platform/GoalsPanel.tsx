import { useState } from 'react';
import { AREAS } from '../../data/diagnostico';
import { getMetas, saveMeta, updateMeta, type EstadoMeta, type Meta } from '../../lib/metricas';

interface GoalsPanelProps {
  metas: Meta[];
  onChanged: () => void;
}

export function GoalsPanel({ metas, onChanged }: GoalsPanelProps) {
  const [descripcion, setDescripcion] = useState('');
  const [areaId, setAreaId] = useState(AREAS[0].id);
  const [fechaLimite, setFechaLimite] = useState(new Date().toISOString().slice(0, 10));
  const [valorObjetivo, setValorObjetivo] = useState('');

  function handleAdd() {
    if (!descripcion.trim()) return;
    saveMeta({
      descripcion,
      areaId,
      fechaLimite,
      estado: 'activa',
      valorObjetivo: valorObjetivo ? Number(valorObjetivo) : undefined,
    });
    setDescripcion('');
    setValorObjetivo('');
    onChanged();
  }

  function setEstado(meta: Meta, estado: EstadoMeta) {
    updateMeta(meta.id, { estado });
    onChanged();
  }

  return (
    <section className="grid gap-4 lg:grid-cols-[360px_1fr]">
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Nueva meta</h3>
        <div className="mt-4 grid gap-3">
          <input value={descripcion} onChange={(event) => setDescripcion(event.target.value)} placeholder="Cerrar al menos 3 proyectos por mes" className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-300" />
          <div className="grid grid-cols-2 gap-2">
            <select value={areaId} onChange={(event) => setAreaId(event.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm">
              {AREAS.map((area) => <option key={area.id} value={area.id}>{area.nombre}</option>)}
            </select>
            <input type="date" value={fechaLimite} onChange={(event) => setFechaLimite(event.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm" />
          </div>
          <input type="number" value={valorObjetivo} onChange={(event) => setValorObjetivo(event.target.value)} placeholder="Valor objetivo opcional" className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-300" />
          <button type="button" onClick={handleAdd} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">Agregar meta</button>
        </div>
      </div>

      <div className="space-y-3">
        {getMetas().map((meta) => {
          const area = AREAS.find((item) => item.id === meta.areaId);
          return (
            <article key={meta.id} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-slate-800">{meta.descripcion}</p>
                  <p className="mt-1 text-xs text-slate-400">{area?.icono} {area?.nombre} · vence {meta.fechaLimite}{meta.sugerida ? ' · sugerida' : ''}</p>
                </div>
                <select value={meta.estado} onChange={(event) => setEstado(meta, event.target.value as EstadoMeta)} className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600">
                  <option value="activa">Activa</option>
                  <option value="alcanzada">Alcanzada</option>
                  <option value="cancelada">Cancelada</option>
                </select>
              </div>
            </article>
          );
        })}
        {metas.length === 0 && <div className="rounded-2xl border border-slate-100 bg-white p-6 text-sm text-slate-500">Aun no hay metas registradas.</div>}
      </div>
    </section>
  );
}
