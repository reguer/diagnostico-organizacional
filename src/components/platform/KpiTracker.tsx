import { useState } from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { KPI_DEFINITIONS, getKpiSeries, saveKpiRegistro } from '../../lib/metricas';

interface KpiTrackerProps {
  onChanged: () => void;
}

const currentMonth = new Date().toISOString().slice(0, 7);

export function KpiTracker({ onChanged }: KpiTrackerProps) {
  const [kpiId, setKpiId] = useState(KPI_DEFINITIONS[0].id);
  const [mes, setMes] = useState(currentMonth);
  const [valor, setValor] = useState('');
  const selected = KPI_DEFINITIONS.find((item) => item.id === kpiId) ?? KPI_DEFINITIONS[0];
  const series = getKpiSeries(selected.id);
  const last = series.at(-1);
  const prev = series.at(-2);
  const trendGood = last && prev ? selected.direccionMejora === 'sube' ? last.valor >= prev.valor : last.valor <= prev.valor : true;
  const alert = last && selected.kri
    ? selected.kri.operador === 'mayor' ? last.valor > selected.kri.valor : last.valor < selected.kri.valor
    : false;

  function handleSave() {
    if (!valor) return;
    saveKpiRegistro(selected.id, { mes, valor: Number(valor) });
    setValor('');
    onChanged();
  }

  return (
    <section className="grid gap-4 lg:grid-cols-[360px_1fr]">
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Registro mensual</h3>
        <div className="mt-4 grid gap-3">
          <select value={kpiId} onChange={(event) => setKpiId(event.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm">
            {KPI_DEFINITIONS.map((kpi) => <option key={kpi.id} value={kpi.id}>{kpi.nombre}</option>)}
          </select>
          <input type="month" value={mes} onChange={(event) => setMes(event.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm" />
          <input type="number" value={valor} onChange={(event) => setValor(event.target.value)} placeholder={`Valor en ${selected.unidad}`} className="rounded-xl border border-slate-200 px-3 py-2 text-sm" />
          <button type="button" onClick={handleSave} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">Guardar KPI</button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-800">{selected.nombre}</h3>
            <p className="mt-1 text-xs text-slate-400">Ultimo valor: {last ? `${last.valor} ${selected.unidad}` : 'sin registro'}</p>
          </div>
          {last && <span className={`rounded-full px-3 py-1 text-xs font-bold ${trendGood ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{trendGood ? 'Mejora' : 'Revisar'}</span>}
        </div>
        {alert && <div className="mt-3 rounded-xl border border-red-100 bg-red-50 p-3 text-xs font-semibold text-red-700">{selected.kri?.mensaje}</div>}
        <div className="mt-4 h-64">
          {series.length >= 2 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={series}>
                <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="valor" stroke={trendGood ? '#16a34a' : '#dc2626'} strokeWidth={2} dot />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center rounded-xl bg-slate-50 text-sm text-slate-400">Registra dos meses para ver tendencia.</div>
          )}
        </div>
      </div>
    </section>
  );
}
