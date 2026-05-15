import { useState } from 'react';
import type { KpiKriArea } from '../../lib/kpiKri';

interface KpiKriSectionProps {
  areas: KpiKriArea[];
}

type Tab = 'kpi' | 'kri' | 'kci';

const alertaColor: Record<string, string> = {
  amarillo: 'border-yellow-200 bg-yellow-50 text-yellow-700',
  naranja: 'border-orange-200 bg-orange-50 text-orange-700',
  rojo: 'border-red-200 bg-red-50 text-red-700',
};

const alertaIcon: Record<string, string> = {
  amarillo: '⚠️',
  naranja: '🟠',
  rojo: '🔴',
};

export function KpiKriSection({ areas }: KpiKriSectionProps) {
  const [expandidas, setExpandidas] = useState<string[]>(areas[0]?.areaId ? [areas[0].areaId] : []);
  const [tabs, setTabs] = useState<Record<string, Tab>>({});

  if (areas.length === 0) return null;

  function toggleArea(areaId: string) {
    setExpandidas((prev) =>
      prev.includes(areaId) ? prev.filter((id) => id !== areaId) : [...prev, areaId],
    );
  }

  function getTab(areaId: string): Tab {
    return tabs[areaId] ?? 'kpi';
  }

  function setTab(areaId: string, tab: Tab) {
    setTabs((prev) => ({ ...prev, [areaId]: tab }));
  }

  return (
    <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="p-6 pb-4">
        <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-slate-400">
          Indicadores Clave
        </h3>
        <p className="mb-0.5 text-xs text-slate-400">
          <strong className="text-slate-600">KPI</strong> = desempeño (¿cómo lo estás haciendo?) ·{' '}
          <strong className="text-slate-600">KRI</strong> = señales de alerta (¿qué podría fallar?) ·{' '}
          <strong className="text-slate-600">KCI</strong> = controles internos (¿se están cumpliendo tus procesos?)
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setExpandidas(areas.map((area) => area.areaId))}
            className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100"
          >
            Abrir todos
          </button>
          <button
            type="button"
            onClick={() => setExpandidas([])}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100"
          >
            Cerrar todos
          </button>
        </div>
      </div>

      <div className="divide-y divide-slate-50">
        {areas.map((area) => {
          const abierta = expandidas.includes(area.areaId);
          const tab = getTab(area.areaId);

          return (
            <div key={area.areaId}>
              <button
                onClick={() => toggleArea(area.areaId)}
                className="flex w-full items-center gap-3 px-6 py-4 text-left transition-colors hover:bg-slate-50"
              >
                <span className="text-xl">{area.icono}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-800">{area.areaNombre}</p>
                  <p className="truncate text-xs text-slate-400">{area.objetivo}</p>
                </div>
                <span className={`text-sm text-slate-300 transition-transform ${abierta ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {abierta && (
                <div className="px-6 pb-6">
                  {/* Tab selector */}
                  <div className="mb-4 flex gap-1 rounded-xl border border-slate-100 bg-slate-50 p-1">
                    {(['kpi', 'kri', 'kci'] as Tab[]).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTab(area.areaId, t)}
                        className={`flex-1 rounded-lg py-1.5 text-xs font-bold uppercase tracking-wide transition-all ${
                          tab === t
                            ? t === 'kpi'
                              ? 'bg-indigo-600 text-white shadow-sm'
                              : t === 'kri'
                                ? 'bg-orange-500 text-white shadow-sm'
                                : 'bg-emerald-600 text-white shadow-sm'
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        {t === 'kpi' ? 'KPI' : t === 'kri' ? 'KRI' : 'KCI'}
                      </button>
                    ))}
                  </div>

                  {/* KPI tab */}
                  {tab === 'kpi' && (
                    <div className="space-y-2">
                      <p className="mb-2 text-[11px] text-slate-400">Métricas de desempeño — ¿estás alcanzando los resultados esperados?</p>
                      {area.kpis.map((kpi, i) => (
                        <div
                          key={i}
                          className={`rounded-xl border p-3 ${kpi.primario ? 'border-indigo-200 bg-indigo-50' : 'border-slate-100 bg-slate-50'}`}
                        >
                          <div className="mb-1.5 flex items-start gap-2">
                            {kpi.primario && (
                              <span className="mt-0.5 shrink-0 rounded-full bg-indigo-100 px-1.5 py-0.5 text-[10px] font-bold text-indigo-700">
                                PRINCIPAL
                              </span>
                            )}
                            <p className={`text-sm font-semibold ${kpi.primario ? 'text-slate-800' : 'text-slate-700'}`}>{kpi.kpi}</p>
                          </div>
                          <div className="flex flex-wrap gap-x-4 gap-y-1">
                            <span className="text-xs text-slate-500">🎯 Meta: <strong className="text-slate-700">{kpi.meta}</strong></span>
                            <span className="text-xs text-slate-500">📅 {kpi.frecuencia}</span>
                            <span className="text-xs text-slate-500">👤 {kpi.responsable}</span>
                          </div>
                          {kpi.comoMedir && (
                            <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
                              <strong>Cómo medir:</strong> {kpi.comoMedir}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* KRI tab */}
                  {tab === 'kri' && (
                    <div className="space-y-2">
                      <p className="mb-2 text-[11px] text-slate-400">Señales de alerta temprana — actúa antes de que el problema sea costoso.</p>
                      {area.kris.map((kri, i) => {
                        const nivel = kri.nivelAlerta ?? 'naranja';
                        const colorClass = alertaColor[nivel] ?? alertaColor.naranja;
                        return (
                          <div key={i} className={`rounded-xl border p-3 ${colorClass}`}>
                            <div className="mb-1.5 flex items-start gap-2">
                              <span className="shrink-0 text-sm">{alertaIcon[nivel]}</span>
                              <p className="text-sm font-semibold text-slate-800">{kri.kri}</p>
                            </div>
                            <div className="flex flex-wrap gap-x-4 gap-y-1">
                              <span className="text-xs font-semibold">Alerta si: {kri.umbralAlerta}</span>
                              <span className="text-xs text-slate-600">📅 {kri.frecuencia}</span>
                            </div>
                            {kri.accionInmediata && (
                              <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
                                <strong>Acción inmediata:</strong> {kri.accionInmediata}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* KCI tab */}
                  {tab === 'kci' && (
                    <div className="space-y-2">
                      <p className="mb-2 text-[11px] text-slate-400">
                        Indicadores de control — ¿se están cumpliendo tus procesos internos? Un KCI alto protege tus KPIs.
                      </p>
                      {area.kcis && area.kcis.length > 0 ? (
                        area.kcis.map((kci, i) => (
                          <div key={i} className="rounded-xl border border-emerald-100 bg-emerald-50 p-3">
                            <p className="mb-1.5 text-sm font-semibold text-slate-800">{kci.kci}</p>
                            <div className="mb-1 flex flex-wrap gap-x-4 gap-y-1">
                              <span className="text-xs text-slate-500">🎯 Meta: <strong className="text-slate-700">{kci.meta}</strong></span>
                              <span className="text-xs text-slate-500">📅 {kci.frecuencia}</span>
                              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                                {kci.proceso}
                              </span>
                            </div>
                            <p className="text-[11px] leading-relaxed text-slate-500">
                              <strong>Cómo medir:</strong> {kci.comoMedir}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-400">Sin KCIs definidos para esta área.</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="border-t border-slate-50 px-6 py-4">
        <p className="text-center text-xs text-slate-400">
          KPI mide resultados · KRI anticipa riesgos · KCI verifica que tus controles funcionen
        </p>
      </div>
    </div>
  );
}
