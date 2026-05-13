import type { ResultadosDiagnostico } from '../../lib/calculator';

interface HealthScoreProps {
  resultado: ResultadosDiagnostico;
}

export function HealthScore({ resultado }: HealthScoreProps) {
  const { scoreGeneral, nivelTexto, nivelColor } = resultado;

  const radio = 54;
  const circunferencia = 2 * Math.PI * radio;
  const offset = circunferencia - (scoreGeneral / 100) * circunferencia;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 text-center">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
        Health Score General
      </h3>

      <div className="relative inline-flex items-center justify-center">
        <svg width="140" height="140" viewBox="0 0 140 140" className="-rotate-90">
          <circle cx="70" cy="70" r={radio} fill="none" stroke="#f1f5f9" strokeWidth="12" />
          <circle
            cx="70"
            cy="70"
            r={radio}
            fill="none"
            stroke={nivelColor}
            strokeWidth="12"
            strokeDasharray={circunferencia}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-4xl font-black" style={{ color: nivelColor }}>
            {scoreGeneral}
          </span>
          <span className="text-xs font-semibold text-slate-400">/ 100</span>
        </div>
      </div>

      <div
        className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
        style={{ backgroundColor: `${nivelColor}15`, color: nivelColor }}
      >
        <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: nivelColor }} />
        {nivelTexto}
      </div>
    </div>
  );
}
