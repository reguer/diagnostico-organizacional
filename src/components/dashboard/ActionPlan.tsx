import type { AccionItem } from '../../lib/calculator';

interface ActionPlanProps {
  acciones: AccionItem[];
}

const PRIORIDAD_COLORS = ['#ef4444', '#f97316', '#f59e0b'];
const PRIORIDAD_LABELS = ['Alta prioridad', 'Media prioridad', 'Pendiente'];

export function ActionPlan({ acciones }: ActionPlanProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">
        Plan de Acción Inmediato
      </h3>
      <p className="text-xs text-slate-400 mb-4">3 pasos concretos para empezar esta semana</p>

      <div className="space-y-4">
        {acciones.map((accion, idx) => {
          const color = PRIORIDAD_COLORS[idx] ?? '#94a3b8';
          const prioridadLabel = PRIORIDAD_LABELS[idx] ?? 'Pendiente';

          return (
            <div key={accion.areaId} className="flex gap-4">
              {/* Número */}
              <div className="flex-shrink-0 flex flex-col items-center">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-black shadow-sm"
                  style={{ backgroundColor: color }}
                >
                  {accion.prioridad}
                </div>
                {idx < acciones.length - 1 && (
                  <div className="w-0.5 bg-slate-100 flex-1 mt-2" style={{ minHeight: '24px' }} />
                )}
              </div>

              {/* Contenido */}
              <div className="flex-1 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base">{accion.icono}</span>
                  <span className="text-xs font-medium" style={{ color }}>{prioridadLabel}</span>
                  <span className="text-xs text-slate-300">—</span>
                  <span className="text-xs font-semibold text-slate-400">{accion.areaNombre}</span>
                </div>

                <p className="font-bold text-slate-800 text-sm mb-1.5">{accion.accion}</p>
                <p className="text-xs text-slate-500 leading-relaxed mb-2">{accion.detalle}</p>

                <div className="flex items-center gap-1.5">
                  <span className="text-xs">⏰</span>
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${color}15`, color }}
                  >
                    {accion.plazo}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-indigo-50 rounded-xl border border-indigo-100">
        <p className="text-xs text-indigo-700 font-medium text-center">
          💡 Consejo: elige UNA acción y ejecútala esta semana. La consistencia vale más que la perfección.
        </p>
      </div>
    </div>
  );
}
