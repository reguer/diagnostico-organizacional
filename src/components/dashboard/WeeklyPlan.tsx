import { useState } from 'react';
import type { PlanSemanal, TipoTarea } from '../../lib/weeklyPlan';

interface WeeklyPlanProps {
  plan: PlanSemanal[];
}

const TIPO_CONFIG: Record<TipoTarea, { label: string; bg: string; text: string; dot: string; border: string }> = {
  remediacion:   { label: 'Corrección',     bg: 'bg-red-50',    text: 'text-red-700',    dot: 'bg-red-400',    border: 'border-red-200' },
  optimizacion:  { label: 'Optimización',   bg: 'bg-blue-50',   text: 'text-blue-700',   dot: 'bg-blue-400',   border: 'border-blue-200' },
  automatizacion:{ label: 'Automatización', bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-400', border: 'border-purple-200' },
};

const DIAS_ORDEN = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export function WeeklyPlan({ plan }: WeeklyPlanProps) {
  const [semanaActiva, setSemanaActiva] = useState(0);
  const semana = plan[semanaActiva];

  if (!semana) return null;

  const tareasPorDia = DIAS_ORDEN.reduce<Record<string, typeof semana.tareas>>((acc, dia) => {
    const t = semana.tareas.filter((t) => t.dia === dia);
    if (t.length > 0) acc[dia] = t;
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
      {/* Week tabs */}
      <div className="px-4 pt-4">
        <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
          {plan.map((s, i) => (
            <button
              key={i}
              onClick={() => setSemanaActiva(i)}
              className={`flex-shrink-0 flex flex-col items-center px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
                semanaActiva === i
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>{s.semana}</span>
              <span className={`text-[10px] font-normal mt-0.5 ${semanaActiva === i ? 'text-indigo-200' : 'text-slate-400'}`}>
                {s.plazo}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-5">
        {/* Week header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base font-bold text-slate-800">{semana.semana}</h3>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs font-medium text-slate-500">{semana.subtitulo}</span>
            </div>
            <p className="text-sm text-slate-500">{semana.objetivo}</p>
          </div>
          <span className="flex-shrink-0 text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg whitespace-nowrap">
            {semana.focusArea}
          </span>
        </div>

        {/* Goals for the week */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 mb-4 border border-indigo-100">
          <p className="text-xs font-bold text-indigo-700 uppercase tracking-wide mb-2">🎯 Al terminar esta semana habrás logrado</p>
          <ul className="space-y-1.5">
            {semana.metasSemana.map((meta, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                {meta}
              </li>
            ))}
          </ul>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(TIPO_CONFIG).map(([tipo, config]) => (
            <span key={tipo} className={`flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full ${config.bg} ${config.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
              {config.label}
            </span>
          ))}
        </div>

        {/* Tasks by day */}
        {Object.keys(tareasPorDia).length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-sm">
            No hay tareas asignadas para esta semana según tus resultados actuales.
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(tareasPorDia).map(([dia, tareas]) => (
              <div key={dia}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-px flex-1 bg-slate-100" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">{dia}</span>
                  <div className="h-px flex-1 bg-slate-100" />
                </div>

                <div className="space-y-2">
                  {tareas.map((tarea) => {
                    const config = TIPO_CONFIG[tarea.tipo];
                    return (
                      <div key={tarea.id} className={`rounded-xl border p-4 ${config.bg} ${config.border}`}>
                        <div className="flex items-start gap-3">
                          <span className="text-xl flex-shrink-0 mt-0.5">{tarea.areaIcono}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${config.bg} ${config.text} border ${config.border}`}>
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
                              {tarea.kpiMejora && (
                                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                                  📊 KPI: {tarea.kpiMejora}
                                </span>
                              )}
                              {tarea.kriMitiga && (
                                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                                  ⚠️ KRI: {tarea.kriMitiga}
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
        )}

        <div className="mt-5 p-3 bg-slate-50 rounded-xl border border-slate-100">
          <p className="text-xs text-slate-500 text-center">
            💡 Las tareas de <strong>corrección</strong> son prioritarias. Avanza a <strong>optimización</strong> y <strong>automatización</strong> cuando tengas las bases sólidas de las semanas anteriores.
          </p>
        </div>
      </div>
    </div>
  );
}
