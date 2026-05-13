import type { ReactNode } from 'react';
import type { Area } from '../../data/diagnostico';
import { ProgressBar } from '../ui/ProgressBar';

interface WizardLayoutProps {
  areas: Area[];
  areaActualIdx: number;
  respuestas: Record<string, number>;
  children: ReactNode;
  onAnterior: () => void;
  onSiguiente: () => void;
  onIrAArea: (idx: number) => void;
  onFinalizar: () => void;
  onAbrirPlataforma: () => void;
}

export function WizardLayout({
  areas,
  areaActualIdx,
  respuestas,
  children,
  onAnterior,
  onSiguiente,
  onIrAArea,
  onFinalizar,
  onAbrirPlataforma,
}: WizardLayoutProps) {
  const areaActual = areas[areaActualIdx];
  const esUltima = areaActualIdx === areas.length - 1;
  const esPrimera = areaActualIdx === 0;

  const preguntasDelArea = areaActual.preguntas;
  const todasRespondidas = preguntasDelArea.every((p) => respuestas[p.id] !== undefined);

  const totalRespondidas = Object.keys(respuestas).length;
  const totalPreguntas = areas.reduce((acc, a) => acc + a.preguntas.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="font-bold text-slate-800 text-lg leading-tight">
                Diagnóstico Organizacional
              </h1>
              <p className="text-xs text-slate-400">Paisajismo & Construcción</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400">Total completado</span>
              <p className="text-sm font-bold text-indigo-600">{totalRespondidas}/{totalPreguntas}</p>
            </div>
          </div>
          <div className="mb-3 flex justify-end">
            <button
              type="button"
              onClick={onAbrirPlataforma}
              className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100"
            >
              Plataforma en proceso
            </button>
          </div>

          <ProgressBar
            current={areaActualIdx + 1}
            total={areas.length}
            areaActual={areaActual.nombre}
            areaIcono={areaActual.icono}
          />
        </div>
      </header>

      {/* Navegación de pestañas de áreas */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
            {areas.map((area, idx) => {
              const respondidas = area.preguntas.filter((p) => respuestas[p.id] !== undefined).length;
              const completa = respondidas === area.preguntas.length;
              const activa = idx === areaActualIdx;

              return (
                <button
                  type="button"
                  key={area.id}
                  onClick={() => onIrAArea(idx)}
                  className={`
                    flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                    ${activa
                      ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                      : completa
                        ? 'bg-green-50 text-green-600 border border-green-100'
                        : 'text-slate-400 border border-transparent'
                    }
                  `}
                >
                  <span>{area.icono}</span>
                  <span className="hidden sm:inline">{area.nombre}</span>
                  {completa && !activa && <span className="text-green-500">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contenido */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        {children}

        {/* Navegación */}
        <div className="mt-10 flex gap-3">
          {!esPrimera && (
            <button
              type="button"
              onClick={onAnterior}
              className="flex-1 py-3 px-6 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold text-sm hover:border-slate-300 hover:bg-slate-50 transition-all"
            >
              ← Anterior
            </button>
          )}

          {!esUltima ? (
            <button
              type="button"
              onClick={onSiguiente}
              disabled={!todasRespondidas}
              className={`
                flex-1 py-3 px-6 rounded-xl font-semibold text-sm transition-all
                ${todasRespondidas
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200 active:scale-95'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }
              `}
            >
              {todasRespondidas ? 'Siguiente área →' : `Responde todas (faltan ${preguntasDelArea.filter(p => respuestas[p.id] === undefined).length})`}
            </button>
          ) : (
            <button
              type="button"
              onClick={onFinalizar}
              disabled={!todasRespondidas}
              className={`
                flex-1 py-3 px-6 rounded-xl font-semibold text-sm transition-all
                ${todasRespondidas
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-200 active:scale-95'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }
              `}
            >
              {todasRespondidas ? '🎯 Ver mi diagnóstico' : `Responde todas (faltan ${preguntasDelArea.filter(p => respuestas[p.id] === undefined).length})`}
            </button>
          )}
        </div>

        {!todasRespondidas && (
          <p className="text-center text-xs text-slate-400 mt-3">
            Completa todas las preguntas de esta área para continuar
          </p>
        )}
      </main>
    </div>
  );
}
