import { useState } from 'react';
import { filtrarPreguntas } from '../../lib/filterQuestions';
import { AREAS } from '../../data/diagnostico';
import { calcularResultados } from '../../lib/calculator';
import { saveDiagnostico, type DiagnosticoGuardado } from '../../lib/storage';
import { OptionCard } from '../ui/OptionCard';

interface SupplementWizardProps {
  diagnostico: DiagnosticoGuardado;
  onCompleted: () => void;
  onClose: () => void;
}

export function SupplementWizard({ diagnostico, onCompleted, onClose }: SupplementWizardProps) {
  const areasActivas = filtrarPreguntas(AREAS, diagnostico.config);
  const preguntasSinRespuesta = areasActivas.flatMap((area) =>
    area.preguntas.filter((p) => diagnostico.respuestas[p.id] === undefined),
  );

  const [respuestasNuevas, setRespuestasNuevas] = useState<Record<string, number>>({});
  const [idx, setIdx] = useState(0);
  const [guardado, setGuardado] = useState(false);

  if (preguntasSinRespuesta.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl text-center">
          <p className="text-2xl font-black text-slate-900">✅ Todo al día</p>
          <p className="mt-2 text-sm text-slate-500">Tu diagnóstico ya tiene respuestas para todas las preguntas disponibles.</p>
          <button onClick={onClose} className="mt-6 rounded-xl bg-indigo-600 px-6 py-2 text-sm font-semibold text-white">Cerrar</button>
        </div>
      </div>
    );
  }

  const preguntaActual = preguntasSinRespuesta[idx];
  const areaDePreg = areasActivas.find((area) => area.preguntas.some((p) => p.id === preguntaActual.id));
  const respuestaActual = respuestasNuevas[preguntaActual.id];
  const total = preguntasSinRespuesta.length;
  const progreso = Math.round((idx / total) * 100);

  function handleRespuesta(valor: number) {
    setRespuestasNuevas((prev) => ({ ...prev, [preguntaActual.id]: valor }));
  }

  function handleSiguiente() {
    if (respuestaActual === undefined) return;
    if (idx < total - 1) {
      setIdx(idx + 1);
    } else {
      const respuestasCompletas = { ...diagnostico.respuestas, ...respuestasNuevas };
      const nuevoResultado = calcularResultados(respuestasCompletas, areasActivas);
      saveDiagnostico({ ...diagnostico, respuestas: respuestasCompletas, resultado: nuevoResultado });
      setGuardado(true);
    }
  }

  if (guardado) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl text-center">
          <p className="text-2xl font-black text-slate-900">🎯 Diagnóstico actualizado</p>
          <p className="mt-2 text-sm text-slate-500">
            Respondiste {total} pregunta{total !== 1 ? 's' : ''} nueva{total !== 1 ? 's' : ''}. Tu plan de acción ya refleja los cambios.
          </p>
          <button
            onClick={onCompleted}
            className="mt-6 rounded-xl bg-indigo-600 px-6 py-2 text-sm font-semibold text-white"
          >
            Ver resultados actualizados
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              {areaDePreg?.icono} {areaDePreg?.nombre}
            </p>
            <p className="text-sm font-bold text-slate-800">
              Pregunta {idx + 1} de {total} nuevas
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl font-bold">✕</button>
        </div>

        {/* Progress */}
        <div className="h-1.5 bg-slate-100">
          <div
            className="h-1.5 rounded-full bg-indigo-500 transition-all duration-300"
            style={{ width: `${progreso}%` }}
          />
        </div>

        {/* Pregunta */}
        <div className="px-6 py-5">
          <p className="mb-1 text-base font-bold text-slate-800">{preguntaActual.texto}</p>
          {preguntaActual.descripcion && (
            <p className="mb-4 text-xs text-slate-400">{preguntaActual.descripcion}</p>
          )}
          <div className="space-y-2 mt-4">
            {preguntaActual.opciones.map((opcion) => (
              <OptionCard
                key={opcion.valor}
                texto={opcion.texto}
                valor={opcion.valor}
                impactoKPI={opcion.impactoKPI}
                seleccionado={respuestaActual === opcion.valor}
                onSelect={() => handleRespuesta(opcion.valor)}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
          <button
            type="button"
            onClick={() => setIdx(Math.max(0, idx - 1))}
            disabled={idx === 0}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-500 disabled:opacity-40"
          >
            Anterior
          </button>
          <button
            type="button"
            onClick={handleSiguiente}
            disabled={respuestaActual === undefined}
            className="rounded-xl bg-indigo-600 px-6 py-2 text-sm font-semibold text-white disabled:opacity-40"
          >
            {idx < total - 1 ? 'Siguiente' : 'Guardar y actualizar'}
          </button>
        </div>
      </div>
    </div>
  );
}
