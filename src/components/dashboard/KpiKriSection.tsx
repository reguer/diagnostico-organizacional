import { useState } from 'react';
import type { KpiKriArea } from '../../lib/kpiKri';

interface KpiKriSectionProps {
  areas: KpiKriArea[];
}

export function KpiKriSection({ areas }: KpiKriSectionProps) {
  const [expandida, setExpandida] = useState<string | null>(areas[0]?.areaId ?? null);

  if (areas.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
      <div className="p-6 pb-4">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">
          Indicadores Clave
        </h3>
        <p className="text-xs text-slate-400 mb-1">
          <strong className="text-slate-600">KPI</strong> = desempeño histórico (¿cómo lo estás haciendo?) ·{' '}
          <strong className="text-slate-600">KRI</strong> = señal de alerta temprana (¿qué podría fallar?)
        </p>
      </div>

      <div className="divide-y divide-slate-50">
        {areas.map((area) => {
          const abierta = expandida === area.areaId;
          return (
            <div key={area.areaId}>
              <button
                onClick={() => setExpandida(abierta ? null : area.areaId)}
                className="w-full flex items-center gap-3 px-6 py-4 hover:bg-slate-50 transition-colors text-left"
              >
                <span className="text-xl">{area.icono}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 text-sm">{area.areaNombre}</p>
                  <p className="text-xs text-slate-400 truncate">{area.objetivo}</p>
                </div>
                <span className={`text-slate-300 transition-transform text-sm ${abierta ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {abierta && (
                <div className="px-6 pb-5 space-y-4">
                  {/* KPIs */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2 h-2 rounded-full bg-indigo-400 flex-shrink-0" />
                      <p className="text-xs font-bold text-indigo-700 uppercase tracking-wide">KPI — Medir desempeño</p>
                    </div>
                    <div className="space-y-2">
                      {area.kpis.map((kpi, i) => (
                        <div key={i} className="bg-indigo-50 rounded-xl p-3 border border-indigo-100">
                          <p className="text-sm font-semibold text-slate-800 mb-1.5">{kpi.kpi}</p>
                          <div className="flex flex-wrap gap-x-4 gap-y-1">
                            <span className="text-xs text-slate-500">🎯 Meta: <strong className="text-slate-700">{kpi.meta}</strong></span>
                            <span className="text-xs text-slate-500">📅 {kpi.frecuencia}</span>
                            <span className="text-xs text-slate-500">👤 {kpi.responsable}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* KRIs */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2 h-2 rounded-full bg-orange-400 flex-shrink-0" />
                      <p className="text-xs font-bold text-orange-700 uppercase tracking-wide">KRI — Señales de alerta</p>
                    </div>
                    <div className="space-y-2">
                      {area.kris.map((kri, i) => (
                        <div key={i} className="bg-orange-50 rounded-xl p-3 border border-orange-100">
                          <p className="text-sm font-semibold text-slate-800 mb-1.5">{kri.kri}</p>
                          <div className="flex flex-wrap gap-x-4 gap-y-1">
                            <span className="text-xs text-orange-600 font-semibold">⚠️ Alerta si: {kri.umbralAlerta}</span>
                            <span className="text-xs text-slate-500">📅 {kri.frecuencia}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="px-6 py-4 border-t border-slate-50">
        <p className="text-xs text-slate-400 text-center">
          Metodología de 6 pasos: Objetivo → Riesgos → Aspectos a medir → KPI → KRI → Responsable
        </p>
      </div>
    </div>
  );
}
