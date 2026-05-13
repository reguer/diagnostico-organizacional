import type { ImpactoReal } from '../../lib/calculator';

interface ImpactSectionProps {
  impactos: ImpactoReal[];
}

const SEVERIDAD_CONFIG = {
  critico: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    badge: 'bg-red-100 text-red-700',
    etiqueta: '🚨 Crítico',
    dot: 'bg-red-500',
  },
  alto: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    badge: 'bg-orange-100 text-orange-700',
    etiqueta: '⚠️ Alto impacto',
    dot: 'bg-orange-500',
  },
  medio: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    badge: 'bg-yellow-100 text-yellow-700',
    etiqueta: '📌 Atención',
    dot: 'bg-yellow-500',
  },
};

export function ImpactSection({ impactos }: ImpactSectionProps) {
  if (impactos.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 text-center">
        <span className="text-4xl">🎉</span>
        <p className="mt-2 font-semibold text-slate-700">¡Sin fugas críticas detectadas!</p>
        <p className="text-sm text-slate-400 mt-1">Tu empresa está bien balanceada. Enfócate en optimizar.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">
        Tus Mayores Fugas de Dinero
      </h3>
      <p className="text-xs text-slate-400 mb-4">Áreas donde tu negocio está perdiendo rentabilidad ahora mismo</p>

      <div className="space-y-4">
        {impactos.map((impacto, idx) => {
          const config = SEVERIDAD_CONFIG[impacto.severidad];
          return (
            <div
              key={impacto.areaId}
              className={`rounded-xl border-2 p-4 ${config.bg} ${config.border}`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{impacto.icono}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${config.badge}`}>
                        {config.etiqueta}
                      </span>
                      <span className="text-xs text-slate-400">#{idx + 1}</span>
                    </div>
                    <p className="font-bold text-slate-800 text-sm mt-0.5">{impacto.titulo}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-lg font-black text-slate-300">{impacto.score}%</div>
                  <div className="text-xs text-slate-400">{impacto.areaNombre}</div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {impacto.descripcion}
              </p>

              <div className="bg-white bg-opacity-60 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700">
                {impacto.estimacion}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
