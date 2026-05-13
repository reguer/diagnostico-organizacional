interface OptionCardProps {
  texto: string;
  valor: number;
  seleccionado: boolean;
  onClick: () => void;
  totalOpciones?: number;
}

const ETIQUETAS_VALOR: Record<number, { etiqueta: string; bg: string; border: string; text: string }> = {
  1: { etiqueta: 'Básico', bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600' },
  2: { etiqueta: 'En proceso', bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600' },
  3: { etiqueta: 'Avanzado', bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700' },
  4: { etiqueta: 'Óptimo', bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600' },
};

export function OptionCard({ texto, valor, seleccionado, onClick }: OptionCardProps) {
  const meta = ETIQUETAS_VALOR[valor] ?? ETIQUETAS_VALOR[1];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full text-left p-4 rounded-xl border-2 transition-all duration-200
        flex items-start gap-3 group
        ${seleccionado
          ? 'border-indigo-500 bg-indigo-50 shadow-md shadow-indigo-100'
          : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50 hover:shadow-sm'
        }
      `}
    >
      {/* Indicador de selección */}
      <div className={`
        mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center
        ${seleccionado ? 'border-indigo-500 bg-indigo-500' : 'border-slate-300 group-hover:border-indigo-400'}
      `}>
        {seleccionado && (
          <div className="w-2 h-2 rounded-full bg-white" />
        )}
      </div>

      {/* Texto */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium leading-snug ${seleccionado ? 'text-indigo-900' : 'text-slate-700'}`}>
          {texto}
        </p>
      </div>

      {/* Badge de nivel */}
      <span className={`
        flex-shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full
        ${seleccionado
          ? 'bg-indigo-100 text-indigo-700'
          : `${meta.bg} ${meta.text}`
        }
      `}>
        {meta.etiqueta}
      </span>
    </button>
  );
}
