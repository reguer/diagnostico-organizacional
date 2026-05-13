import { useState } from 'react';
import type { ResultadosDiagnostico } from '../../lib/calculator';
import { generarPlanSemanal } from '../../lib/weeklyPlan';
import { exportarDashboardPDF } from '../../lib/exportPdf';
import { HealthScore } from './HealthScore';
import { AreaRadarChart } from './AreaRadarChart';
import { ImpactSection } from './ImpactSection';
import { ActionPlan } from './ActionPlan';
import { WeeklyPlan } from './WeeklyPlan';

interface DashboardProps {
  resultado: ResultadosDiagnostico;
  onReiniciar: () => void;
}

export function Dashboard({ resultado, onReiniciar }: DashboardProps) {
  const [exportando, setExportando] = useState(false);
  const [vistaActiva, setVistaActiva] = useState<'resumen' | 'plan'>('resumen');
  const planSemanal = generarPlanSemanal(resultado);

  async function handleExportarPDF() {
    setExportando(true);
    try {
      await exportarDashboardPDF('dashboard-contenido');
    } catch (e) {
      console.error('Error exportando PDF:', e);
    } finally {
      setExportando(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="font-bold text-slate-800 text-lg leading-tight">Tu Diagnóstico</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Paisajismo · Riego · Señalética · Construcción —{' '}
                {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportarPDF}
                disabled={exportando}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                  exportando
                    ? 'bg-slate-50 text-slate-400 border-slate-200 cursor-wait'
                    : 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700 shadow-sm'
                }`}
              >
                {exportando ? (
                  <>
                    <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Exportando...
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Exportar PDF
                  </>
                )}
              </button>
              <button
                onClick={onReiniciar}
                className="text-xs text-slate-500 hover:text-indigo-600 border border-slate-200 hover:border-indigo-300 px-3 py-1.5 rounded-lg transition-all"
              >
                ↺ Nuevo
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setVistaActiva('resumen')}
              className={`flex-1 text-xs font-semibold py-1.5 rounded-lg transition-all ${
                vistaActiva === 'resumen'
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              📊 Diagnóstico
            </button>
            <button
              onClick={() => setVistaActiva('plan')}
              className={`flex-1 text-xs font-semibold py-1.5 rounded-lg transition-all ${
                vistaActiva === 'plan'
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              📅 Plan Semanal
            </button>
          </div>
        </div>
      </header>

      {/* Contenido exportable */}
      <div id="dashboard-contenido">
        <main className="max-w-2xl mx-auto px-4 py-6 space-y-4">
          {vistaActiva === 'resumen' ? (
            <>
              <HealthScore resultado={resultado} />
              <AreaRadarChart scoresPorArea={resultado.scoresPorArea} />
              <ImpactSection impactos={resultado.impactosReales} />
              <ActionPlan acciones={resultado.planAccion} />
            </>
          ) : (
            <WeeklyPlan plan={planSemanal} />
          )}

          <div className="text-center pt-2 pb-8">
            <button
              onClick={onReiniciar}
              className="text-sm text-slate-400 hover:text-indigo-600 underline transition-colors"
            >
              Realizar diagnóstico nuevamente
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
