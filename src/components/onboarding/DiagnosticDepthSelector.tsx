interface DiagnosticDepthSelectorProps {
  onSelect: (nivel: 'basico' | 'completo') => void;
  onVolver: () => void;
}

export function DiagnosticDepthSelector({ onSelect, onVolver }: DiagnosticDepthSelectorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full">
        <button onClick={onVolver} className="text-xs text-slate-400 hover:text-slate-600 mb-6 flex items-center gap-1 transition-colors">
          ← Volver
        </button>

        <div className="text-center mb-8">
          <div className="text-4xl mb-3">📋</div>
          <h2 className="text-xl font-black text-slate-800 mb-2">¿Qué tan profundo quieres el diagnóstico?</h2>
          <p className="text-sm text-slate-500">Elige el nivel que mejor se adapte al tiempo disponible</p>
        </div>

        <div className="space-y-4 mb-8">
          {/* Básico */}
          <button
            onClick={() => onSelect('basico')}
            className="w-full text-left bg-white rounded-2xl border-2 border-slate-100 hover:border-indigo-300 hover:shadow-md p-6 transition-all group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <span className="text-2xl mt-0.5">⚡</span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-slate-800">Básico</h3>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">Recomendado</span>
                  </div>
                  <p className="text-sm text-slate-500 mb-2">~30 preguntas · 10–12 minutos</p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Cubre las áreas clave del negocio con las preguntas más impactantes. Ideal para un primer diagnóstico o revisión rápida.
                  </p>
                </div>
              </div>
              <span className="text-xs text-indigo-400 font-semibold group-hover:text-indigo-600 transition-colors flex-shrink-0">Elegir →</span>
            </div>
          </button>

          {/* Completo */}
          <button
            onClick={() => onSelect('completo')}
            className="w-full text-left bg-white rounded-2xl border-2 border-slate-100 hover:border-indigo-300 hover:shadow-md p-6 transition-all group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <span className="text-2xl mt-0.5">🔍</span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-slate-800">Completo</h3>
                  </div>
                  <p className="text-sm text-slate-500 mb-2">~60–65 preguntas · 20–25 minutos</p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Diagnóstico exhaustivo con sub-áreas de estrategia a largo plazo, indicadores financieros, mercadeo digital, logística y desarrollo del equipo.
                  </p>
                </div>
              </div>
              <span className="text-xs text-indigo-400 font-semibold group-hover:text-indigo-600 transition-colors flex-shrink-0">Elegir →</span>
            </div>
          </button>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-xs text-slate-500 text-center">
            💡 El diagnóstico completo incluye preguntas adicionales sobre planificación a mediano y largo plazo, KPIs financieros, canales de mercadeo digitales, logística y desarrollo del equipo.
          </p>
        </div>
      </div>
    </div>
  );
}
