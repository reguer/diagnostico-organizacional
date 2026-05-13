import type { Area } from '../../data/diagnostico';
import { OptionCard } from '../ui/OptionCard';

interface AreaStepProps {
  area: Area;
  respuestas: Record<string, number>;
  onRespuesta: (preguntaId: string, valor: number) => void;
}

export function AreaStep({ area, respuestas, onRespuesta }: AreaStepProps) {
  const totalPreguntas = area.preguntas.length;
  const respondidas = area.preguntas.filter((p) => respuestas[p.id] !== undefined).length;

  return (
    <div className="space-y-8">
      {/* Header del área */}
      <div className="text-center">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl text-3xl mb-3 shadow-sm"
          style={{ backgroundColor: `${area.color}15`, border: `2px solid ${area.color}30` }}
        >
          {area.icono}
        </div>
        <h2 className="text-2xl font-bold text-slate-800">{area.nombre}</h2>
        <p className="text-slate-500 mt-1">{area.descripcion}</p>
        <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-slate-400">
          <span className="w-2 h-2 rounded-full bg-indigo-400 inline-block" />
          {respondidas} de {totalPreguntas} preguntas respondidas
        </div>
      </div>

      {/* Preguntas */}
      <div className="space-y-6">
        {area.preguntas.map((pregunta, idx) => (
          <div key={pregunta.id} className="space-y-3">
            <div className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-500 text-xs font-bold flex items-center justify-center mt-0.5">
                {idx + 1}
              </span>
              <div>
                <p className="font-semibold text-slate-800 text-sm leading-snug">{pregunta.texto}</p>
                {pregunta.descripcion && (
                  <p className="text-xs text-slate-400 mt-0.5">{pregunta.descripcion}</p>
                )}
              </div>
            </div>

            <div className="grid gap-2 pl-9">
              {pregunta.opciones.map((opcion) => (
                <OptionCard
                  key={opcion.valor}
                  texto={opcion.texto}
                  valor={opcion.valor}
                  seleccionado={respuestas[pregunta.id] === opcion.valor}
                  onClick={() => onRespuesta(pregunta.id, opcion.valor)}
                  totalOpciones={pregunta.opciones.length}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
