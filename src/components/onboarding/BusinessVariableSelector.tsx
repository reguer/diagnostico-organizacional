import { useState } from 'react';
import type { VersionDiagnostico, ActividadConstruccion } from '../../lib/config';
import { ACTIVIDADES_LABELS } from '../../lib/config';

interface BusinessVariableSelectorProps {
  version: VersionDiagnostico;
  onConfirm: (tieneEmpleados: boolean, actividades: ActividadConstruccion[]) => void;
  onVolver: () => void;
}

const ACTIVIDADES_ICONS: Record<ActividadConstruccion, string> = {
  paisajismo: '🌿',
  riego: '💧',
  senaletica: '🚧',
  construccion_residencial: '🏠',
  construccion_comercial: '🏢',
  proyectos_ejecutivos: '📐',
  mantenimiento: '🔧',
};

const TODAS_ACTIVIDADES = Object.keys(ACTIVIDADES_LABELS) as ActividadConstruccion[];

export function BusinessVariableSelector({ version, onConfirm, onVolver }: BusinessVariableSelectorProps) {
  const [tieneEmpleados, setTieneEmpleados] = useState<boolean | null>(null);
  const [actividadesSeleccionadas, setActividadesSeleccionadas] = useState<ActividadConstruccion[]>([
    'paisajismo', 'riego', 'senaletica', 'construccion_residencial', 'proyectos_ejecutivos',
  ]);

  function toggleActividad(act: ActividadConstruccion) {
    setActividadesSeleccionadas((prev) =>
      prev.includes(act) ? prev.filter((a) => a !== act) : [...prev, act],
    );
  }

  function handleConfirmar() {
    if (version === 'general') {
      if (tieneEmpleados === null) return;
      onConfirm(tieneEmpleados, []);
    } else {
      if (actividadesSeleccionadas.length === 0) return;
      onConfirm(true, actividadesSeleccionadas);
    }
  }

  const puedeAvanzar = version === 'general' ? tieneEmpleados !== null : actividadesSeleccionadas.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full">
        <button onClick={onVolver} className="text-xs text-slate-400 hover:text-slate-600 mb-6 flex items-center gap-1 transition-colors">
          ← Volver
        </button>

        {version === 'general' ? (
          <>
            <div className="text-center mb-8">
              <div className="text-4xl mb-3">👥</div>
              <h2 className="text-xl font-black text-slate-800 mb-2">¿Tu negocio tiene empleados?</h2>
              <p className="text-sm text-slate-500">Esto ajustará las preguntas de gestión de personal</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => setTieneEmpleados(false)}
                className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all ${
                  tieneEmpleados === false
                    ? 'border-indigo-500 bg-indigo-50 shadow-sm'
                    : 'border-slate-100 bg-white hover:border-slate-200'
                }`}
              >
                <span className="text-3xl">🧑‍💻</span>
                <div>
                  <p className="font-bold text-slate-800 text-sm">Sin empleados</p>
                  <p className="text-xs text-slate-400 mt-0.5">Trabajo independiente o familiar</p>
                </div>
              </button>

              <button
                onClick={() => setTieneEmpleados(true)}
                className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all ${
                  tieneEmpleados === true
                    ? 'border-indigo-500 bg-indigo-50 shadow-sm'
                    : 'border-slate-100 bg-white hover:border-slate-200'
                }`}
              >
                <span className="text-3xl">👷</span>
                <div>
                  <p className="font-bold text-slate-800 text-sm">Con empleados</p>
                  <p className="text-xs text-slate-400 mt-0.5">Uno o más colaboradores</p>
                </div>
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="text-4xl mb-3">🏗️</div>
              <h2 className="text-xl font-black text-slate-800 mb-2">¿Qué actividades realiza tu empresa?</h2>
              <p className="text-sm text-slate-500">Selecciona todas las que apliquen para personalizar las preguntas</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {TODAS_ACTIVIDADES.map((act) => {
                const seleccionada = actividadesSeleccionadas.includes(act);
                return (
                  <button
                    key={act}
                    onClick={() => toggleActividad(act)}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                      seleccionada
                        ? 'border-indigo-400 bg-indigo-50'
                        : 'border-slate-100 bg-white hover:border-slate-200'
                    }`}
                  >
                    <span className="text-xl flex-shrink-0">{ACTIVIDADES_ICONS[act]}</span>
                    <div>
                      <p className={`text-xs font-semibold ${seleccionada ? 'text-indigo-700' : 'text-slate-700'}`}>
                        {ACTIVIDADES_LABELS[act]}
                      </p>
                    </div>
                    {seleccionada && (
                      <span className="ml-auto text-indigo-500 text-sm flex-shrink-0">✓</span>
                    )}
                  </button>
                );
              })}
            </div>

            {actividadesSeleccionadas.length === 0 && (
              <p className="text-center text-xs text-orange-500 mb-4">Selecciona al menos una actividad</p>
            )}
          </>
        )}

        <button
          onClick={handleConfirmar}
          disabled={!puedeAvanzar}
          className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all ${
            puedeAvanzar
              ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          Continuar →
        </button>
      </div>
    </div>
  );
}
