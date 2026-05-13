import type { PlanSemanal, TipoTarea } from '../../lib/weeklyPlan';

interface WeeklyPlanProps {
  plan: PlanSemanal;
}

const TIPO_CONFIG: Record<TipoTarea, { label: string; bg: string; text: string; dot: string }> = {
  remediacion: { label: 'Corrección', bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-400' },
  optimizacion: { label: 'Optimización', bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-400' },
  automatizacion: { label: 'Automatización', bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-400' },
};

const DIAS_ORDEN = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export function WeeklyPlan({ plan }: WeeklyPlanProps) {
  const tareasPorDia = DIAS_ORDEN.reduce<Record<string, typeof plan.tareas>>((acc, dia) => {
    const t = plan.tareas.filter((t) => t.dia === dia);
    if (t.length > 0) acc[dia] = t;
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Plan de Acción Semanal
          </h3>
          <p className="text-base font-bold text-slate-800">{plan.semana}</p>
          <p className="text-sm text-slate-500 mt-1">{plan.objetivo}</p>
        </div>
        <div className="flex-shrink-0 text-right">
          <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">
            Foco: {plan.focusArea}
          </span>
        </div>
      </div>

      {/* Metas de la semana */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 mb-5 border border-indigo-100">
        <p className="text-xs font-bold text-indigo-700 uppercase tracking-wide mb-2">🎯 Metas al finalizar la semana</p>
        <ul className="space-y-1.5">
          {plan.metasSemana.map((meta, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              {meta}
            </li>
          ))}
        </ul>
      </div>

      {/* Leyenda */}
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(TIPO_CONFIG).map(([tipo, config]) => (
          <span key={tipo} className={`flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full ${config.bg} ${config.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
            {config.label}
          </span>
        ))}
      </div>

      {/* Tareas por día */}
      <div className="space-y-4">
        {Object.entries(tareasPorDia).map(([dia, tareas]) => (
          <div key={dia}>
            {/* Header del día */}
            <div className="flex items-center gap-2 mb-2">
              <div className="h-px flex-1 bg-slate-100" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">{dia}</span>
              <div className="h-px flex-1 bg-slate-100" />
            </div>

            <div className="space-y-2">
              {tareas.map((tarea) => {
                const config = TIPO_CONFIG[tarea.tipo];
                return (
                  <div
                    key={tarea.id}
                    className={`rounded-xl border p-4 ${config.bg} border-opacity-50`}
                    style={{ borderColor: config.dot.replace('bg-', '') }}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl flex-shrink-0 mt-0.5">{tarea.areaIcono}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${config.bg} ${config.text} border border-current border-opacity-20`}>
                            {config.label}
                          </span>
                          <span className="text-xs text-slate-400">{tarea.areaNombre}</span>
                          <span className="text-xs text-slate-300">·</span>
                          <span className="text-xs text-slate-400">⏱ {tarea.duracion}</span>
                          {tarea.hora && (
                            <>
                              <span className="text-xs text-slate-300">·</span>
                              <span className="text-xs text-slate-400">🕐 {tarea.hora}</span>
                            </>
                          )}
                        </div>
                        <p className="font-semibold text-slate-800 text-sm mb-1">{tarea.titulo}</p>
                        <p className="text-xs text-slate-600 leading-relaxed">{tarea.detalle}</p>

                        <div className="flex flex-wrap gap-2 mt-2">
                          {tarea.herramienta && (
                            <span className="text-xs bg-white bg-opacity-70 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">
                              🛠 {tarea.herramienta}
                            </span>
                          )}
                          {tarea.automatizacion && (
                            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                              ⚡ {tarea.automatizacion}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 p-3 bg-slate-50 rounded-xl border border-slate-100">
        <p className="text-xs text-slate-500 text-center">
          💡 Este plan se genera automáticamente según tus respuestas. Las tareas de <strong>corrección</strong> son prioritarias; las de <strong>automatización</strong> son para cuando tengas las bases sólidas.
        </p>
      </div>
    </div>
  );
}
