interface ProgressBarProps {
  current: number;
  total: number;
  areaActual: string;
  areaIcono: string;
}

export function ProgressBar({ current, total, areaActual, areaIcono }: ProgressBarProps) {
  const porcentaje = Math.round(((current - 1) / total) * 100);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-slate-600">
          {areaIcono} {areaActual}
        </span>
        <span className="text-sm font-semibold text-indigo-600">
          Área {current} de {total}
        </span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
        <div
          className="h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${porcentaje + (100 / total)}%`,
            background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
          }}
        />
      </div>
      <div className="flex justify-between mt-1">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              i < current ? 'bg-indigo-500' : 'bg-slate-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
