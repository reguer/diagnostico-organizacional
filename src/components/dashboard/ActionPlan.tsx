import type { AccionItem } from '../../lib/calculator';

interface ActionPlanProps {
  acciones: AccionItem[];
}

const TIPO_CONFIG = {
  remediacion: { label: 'Corrección urgente', color: '#ef4444', bg: 'bg-red-50', border: 'border-red-100', text: 'text-red-700' },
  optimizacion: { label: 'Optimización', color: '#f59e0b', bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-700' },
  crecimiento: { label: 'Crecimiento', color: '#6366f1', bg: 'bg-indigo-50', border: 'border-indigo-100', text: 'text-indigo-700' },
};

export function ActionPlan({ acciones }: ActionPlanProps) {
  const prioridadOrden = { remediacion: 0, optimizacion: 1, crecimiento: 2 };
  const accionesOrdenadas = [...acciones]
    .sort((a, b) => prioridadOrden[a.tipo] - prioridadOrden[b.tipo] || a.prioridad - b.prioridad);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">
        Plan de Acción
      </h3>
      <p className="text-xs text-slate-400 mb-4">
        {accionesOrdenadas.length} acciones detectadas desde tus respuestas, ordenadas por impacto y urgencia
      </p>

      <div className="space-y-4">
        {accionesOrdenadas.map((accion, idx) => {
          const cfg = TIPO_CONFIG[accion.tipo];

          return (
            <div key={accion.areaId} className="flex gap-4">
              {/* Número */}
              <div className="flex-shrink-0 flex flex-col items-center">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-black shadow-sm"
                  style={{ backgroundColor: cfg.color }}
                >
                  {idx + 1}
                </div>
                {idx < accionesOrdenadas.length - 1 && (
                  <div className="w-0.5 bg-slate-100 flex-1 mt-2" style={{ minHeight: '24px' }} />
                )}
              </div>

              {/* Contenido */}
              <div className="flex-1 pb-4">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-base">{accion.icono}</span>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.text} ${cfg.border}`}
                  >
                    {cfg.label}
                  </span>
                  <span className="text-xs text-slate-300">—</span>
                  <span className="text-xs font-semibold text-slate-400">{accion.areaNombre}</span>
                </div>

                <p className="font-bold text-slate-800 text-sm mb-1.5">{accion.accion}</p>
                <p className="text-xs text-slate-500 leading-relaxed mb-2">{accion.detalle}</p>
                {(accion.respuestaActual || accion.respuestaObjetivo) && (
                  <div className="mb-2 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
                    {accion.respuestaActual && <p><strong>Actual:</strong> {accion.respuestaActual}</p>}
                    {accion.respuestaObjetivo && <p><strong>Objetivo:</strong> {accion.respuestaObjetivo}</p>}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs">⏰</span>
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${cfg.color}15`, color: cfg.color }}
                  >
                    {accion.plazo}
                  </span>
                  {accion.paralelo && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                      Puede ir en paralelo
                    </span>
                  )}
                  {accion.recurrencia && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                      Recurrente {accion.recurrencia}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-indigo-50 rounded-xl border border-indigo-100">
        <p className="text-xs text-indigo-700 font-medium text-center">
          💡 Las acciones de <strong>corrección</strong> son prioritarias. Avanza a <strong>optimización</strong> y <strong>crecimiento</strong> cuando tengas las bases sólidas.
        </p>
      </div>
    </div>
  );
}
