import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { AREAS } from '../../data/diagnostico';
import { calcularResultados } from '../../lib/calculator';
import { filtrarPreguntas } from '../../lib/filterQuestions';
import { getHistorialDiagnosticos } from '../../lib/storage';

function getLevelColor(score: number) {
  if (score < 30) return 'text-red-600 bg-red-50';
  if (score < 50) return 'text-orange-600 bg-orange-50';
  if (score < 65) return 'text-amber-600 bg-amber-50';
  if (score < 80) return 'text-green-600 bg-green-50';
  return 'text-indigo-600 bg-indigo-50';
}

export function ReportsPanel() {
  const historial = getHistorialDiagnosticos().map((item) => ({
    ...item,
    resultado: calcularResultados(item.respuestas, filtrarPreguntas(AREAS, item.config)),
  }));
  const chronological = [...historial].reverse();
  const scoreData = chronological.map((item) => ({
    fecha: new Date(item.fecha).toLocaleDateString('es-MX', { day: '2-digit', month: 'short' }),
    score: item.resultado.scoreGeneral,
  }));
  const latest = historial[0];

  return (
    <section className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Evolucion del score</h3>
            <p className="mt-1 text-xs text-slate-400">{historial.length} diagnosticos guardados</p>
          </div>
          <div className="h-72">
            {scoreData.length >= 2 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={scoreData}>
                  <defs>
                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.22} />
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="fecha" tick={{ fontSize: 11 }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="score" stroke="#4f46e5" strokeWidth={2} fill="url(#scoreGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center rounded-xl bg-slate-50 text-sm text-slate-400">
                Completa al menos dos diagnosticos para ver evolucion.
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Ultimo diagnostico</h3>
          {latest ? (
            <div className="mt-4 space-y-3">
              <div>
                <p className="text-4xl font-black text-slate-900">{latest.resultado.scoreGeneral}</p>
                <p className="mt-1 text-xs text-slate-400">{new Date(latest.fecha).toLocaleDateString('es-MX')}</p>
              </div>
              {AREAS.map((area) => {
                const score = latest.resultado.scoresPorArea[area.id] ?? 0;
                return (
                  <div key={area.id} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                    <span className="text-xs font-semibold text-slate-600">{area.icono} {area.nombre}</span>
                    <span className={`rounded-full px-2 py-1 text-xs font-bold ${getLevelColor(score)}`}>{score}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-400">Sin diagnosticos todavia.</p>
          )}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-400 uppercase tracking-wider">
            <tr>
              <th className="px-3 py-3">Fecha</th>
              <th className="px-3 py-3">Version</th>
              <th className="px-3 py-3">Score</th>
              {AREAS.map((area) => <th key={area.id} className="px-3 py-3">{area.nombre}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {historial.map((item) => (
              <tr key={item.id}>
                <td className="px-3 py-3 font-semibold text-slate-700">{new Date(item.fecha).toLocaleDateString('es-MX')}</td>
                <td className="px-3 py-3 text-slate-500">{item.config.version}</td>
                <td className="px-3 py-3 font-bold text-indigo-600">{item.resultado.scoreGeneral}</td>
                {AREAS.map((area) => {
                  const score = item.resultado.scoresPorArea[area.id] ?? 0;
                  return <td key={area.id} className="px-3 py-3 text-slate-500">{score}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
