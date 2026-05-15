import { useReducer, useState } from 'react';
import { getActiveTasks } from '../../lib/activePlan';
import { getHistorialDiagnosticos, saveDiagnostico } from '../../lib/storage';
import { ensureSuggestedGoalsFromActions, getMetas } from '../../lib/metricas';
import { calcularResultados } from '../../lib/calculator';
import { filtrarPreguntas } from '../../lib/filterQuestions';
import { AREAS } from '../../data/diagnostico';
import { generarPlanSemanal } from '../../lib/weeklyPlan';
import { generarKpiKri } from '../../lib/kpiKri';
import { HealthScore } from '../dashboard/HealthScore';
import { AreaRadarChart } from '../dashboard/AreaRadarChart';
import { ImpactSection } from '../dashboard/ImpactSection';
import { ActionPlan } from '../dashboard/ActionPlan';
import { WeeklyPlan } from '../dashboard/WeeklyPlan';
import { KpiKriSection } from '../dashboard/KpiKriSection';
import { AddTaskModal } from './AddTaskModal';
import { AuthPanel } from './AuthPanel';
import { CalendarView } from './CalendarView';
import { FinanzasBasicas } from './FinanzasBasicas';
import { GoalsPanel } from './GoalsPanel';
import { KpiTracker } from './KpiTracker';
import { ReportsPanel } from './ReportsPanel';
import { SupplementWizard } from './SupplementWizard';
import { TaskBoard } from './TaskBoard';
import { TeamPanel } from './TeamPanel';

type PlatformTab = 'diagnostico' | 'plan' | 'tareas' | 'metas' | 'kpis' | 'finanzas' | 'calendario' | 'equipo' | 'reportes';

interface PlatformPageProps {
  onGoDiagnostic: () => void;
}

const tabs: Array<{ id: PlatformTab; label: string }> = [
  { id: 'diagnostico', label: 'Diagnostico' },
  { id: 'plan', label: 'Plan semanal' },
  { id: 'tareas', label: 'Tareas' },
  { id: 'metas', label: 'Metas' },
  { id: 'kpis', label: 'KPIs' },
  { id: 'finanzas', label: 'Finanzas' },
  { id: 'calendario', label: 'Calendario' },
  { id: 'equipo', label: 'Equipo' },
  { id: 'reportes', label: 'Reportes' },
];

export function PlatformPage({ onGoDiagnostic }: PlatformPageProps) {
  const [tab, setTab] = useState<PlatformTab>('diagnostico');
  const [, refresh] = useReducer((value: number) => value + 1, 0);
  const [modalOpen, setModalOpen] = useState(false);
  const [showSupplement, setShowSupplement] = useState(false);
  const [now] = useState(() => Date.now());
  const diagnosticoGuardado = getHistorialDiagnosticos()[0];
  const diagnostico = diagnosticoGuardado
    ? {
        ...diagnosticoGuardado,
        resultado: calcularResultados(
          diagnosticoGuardado.respuestas,
          filtrarPreguntas(AREAS, diagnosticoGuardado.config),
        ),
      }
    : undefined;

  if (diagnostico) {
    if (diagnosticoGuardado && diagnosticoGuardado.resultado.planAccion.length !== diagnostico.resultado.planAccion.length) {
      saveDiagnostico(diagnostico);
    }
    ensureSuggestedGoalsFromActions(diagnostico.resultado.planAccion);
  }

  const tasks = diagnostico ? getActiveTasks(diagnostico) : [];
  const metas = getMetas();
  const planSemanal = diagnostico ? generarPlanSemanal(diagnostico.resultado) : [];
  const kpiKri = diagnostico ? generarKpiKri(diagnostico.resultado.scoresPorArea) : [];

  const preguntasSinRespuesta = diagnosticoGuardado
    ? filtrarPreguntas(AREAS, diagnosticoGuardado.config).flatMap((area) =>
        area.preguntas.filter((p) => diagnosticoGuardado.respuestas[p.id] === undefined),
      ).length
    : 0;

  const completed = tasks.filter((task) => {
    const raw = window.localStorage.getItem(`diag:tareas:${task.id}`);
    return raw ? JSON.parse(raw).estado === 'completada' : false;
  }).length;
  const daysSinceDiagnostic = diagnostico ? Math.floor((now - new Date(diagnostico.fecha).getTime()) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">Version en proceso · Produccion cloud</p>
              <h1 className="text-2xl font-black text-slate-900">Plataforma de Seguimiento</h1>
              <p className="mt-1 text-sm text-slate-500">Diagnostico, ejecucion, metas, calendario y sincronizacion cloud opcional.</p>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={onGoDiagnostic} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600">Diagnostico original</button>
              <button type="button" onClick={() => setModalOpen(true)} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">Agregar tarea</button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        {!diagnostico ? (
          <section className="rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-bold text-slate-800">Primero completa un diagnostico</h2>
            <p className="mt-2 text-sm text-slate-500">La plataforma alterna usa el ultimo diagnostico guardado como punto de partida.</p>
            <button type="button" onClick={onGoDiagnostic} className="mt-5 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">Ir al diagnostico</button>
          </section>
        ) : (
          <div className="space-y-5">
            <AuthPanel onChanged={refresh} />

            {daysSinceDiagnostic >= 28 && (
              <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
                Han pasado {daysSinceDiagnostic} dias. Ya puedes medir tu progreso con un nuevo diagnostico.
              </div>
            )}

            {preguntasSinRespuesta > 0 && (
              <div className="flex items-center justify-between rounded-2xl border border-indigo-100 bg-indigo-50 p-4">
                <p className="text-sm font-semibold text-indigo-800">
                  Hay {preguntasSinRespuesta} pregunta{preguntasSinRespuesta !== 1 ? 's' : ''} nueva{preguntasSinRespuesta !== 1 ? 's' : ''} en tu diagnostico. Respondelas para actualizar tu plan.
                </p>
                <button
                  type="button"
                  onClick={() => setShowSupplement(true)}
                  className="ml-4 shrink-0 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  Responder ahora
                </button>
              </div>
            )}

            <section className="grid gap-3 md:grid-cols-4">
              <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Score</p>
                <p className="mt-2 text-3xl font-black text-slate-900">{diagnostico.resultado.scoreGeneral}</p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Tareas</p>
                <p className="mt-2 text-3xl font-black text-slate-900">{completed}/{tasks.length}</p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Metas activas</p>
                <p className="mt-2 text-3xl font-black text-slate-900">{metas.filter((meta) => meta.estado === 'activa').length}</p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Ultimo diagnostico</p>
                <p className="mt-2 text-sm font-bold text-slate-700">{new Date(diagnostico.fecha).toLocaleDateString('es-MX')}</p>
              </div>
            </section>

            <nav className="flex gap-2 overflow-x-auto pb-1">
              {tabs.map((item) => (
                <button key={item.id} type="button" onClick={() => setTab(item.id)} className={`rounded-xl px-4 py-2 text-sm font-bold ${tab === item.id ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-white text-slate-500'}`}>
                  {item.label}
                </button>
              ))}
            </nav>

            {tab === 'diagnostico' && (
              <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
                <div className="space-y-4">
                  <HealthScore resultado={diagnostico.resultado} />
                  <AreaRadarChart scoresPorArea={diagnostico.resultado.scoresPorArea} />
                </div>
                <div className="space-y-4">
                  <ImpactSection impactos={diagnostico.resultado.impactosReales} />
                  <ActionPlan acciones={diagnostico.resultado.planAccion} />
                </div>
              </div>
            )}
            {tab === 'plan' && <WeeklyPlan plan={planSemanal} />}
            {tab === 'tareas' && <TaskBoard tasks={tasks} onChanged={refresh} />}
            {tab === 'metas' && <GoalsPanel metas={metas} onChanged={refresh} />}
            {tab === 'kpis' && (
              <div className="space-y-4">
                <KpiKriSection areas={kpiKri} />
                <KpiTracker onChanged={refresh} />
              </div>
            )}
            {tab === 'finanzas' && <FinanzasBasicas onChanged={refresh} />}
            {tab === 'calendario' && <CalendarView tasks={tasks} metas={metas} onChanged={refresh} />}
            {tab === 'equipo' && <TeamPanel tasks={tasks} onChanged={refresh} />}
            {tab === 'reportes' && <ReportsPanel />}
          </div>
        )}
      </main>

      {showSupplement && diagnosticoGuardado && (
        <SupplementWizard
          diagnostico={diagnosticoGuardado}
          onCompleted={() => { setShowSupplement(false); refresh(); }}
          onClose={() => setShowSupplement(false)}
        />
      )}
      <AddTaskModal open={modalOpen} onClose={() => setModalOpen(false)} onAdded={refresh} />
    </div>
  );
}
