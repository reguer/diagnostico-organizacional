import { useState } from 'react';
import { FINANZAS_CATEGORIES, getFinanzas, saveFinanzas } from '../../lib/metricas';

interface FinanzasBasicasProps {
  onChanged: () => void;
}

const currentMonth = new Date().toISOString().slice(0, 7);

export function FinanzasBasicas({ onChanged }: FinanzasBasicasProps) {
  const [mes, setMes] = useState(currentMonth);
  const [ingresos, setIngresos] = useState('');
  const [gastos, setGastos] = useState<Record<string, string>>({});
  const registros = getFinanzas().slice(0, 6);

  function handleSave() {
    saveFinanzas({
      mes,
      ingresos: Number(ingresos || 0),
      gastos: Object.fromEntries(FINANZAS_CATEGORIES.map((category) => [category.id, Number(gastos[category.id] || 0)])),
    });
    setIngresos('');
    setGastos({});
    onChanged();
  }

  return (
    <section className="grid gap-4 lg:grid-cols-[360px_1fr]">
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Finanzas basicas</h3>
        <div className="mt-4 grid gap-3">
          <input type="month" value={mes} onChange={(event) => setMes(event.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm" />
          <input type="number" value={ingresos} onChange={(event) => setIngresos(event.target.value)} placeholder="Ingresos del mes" className="rounded-xl border border-slate-200 px-3 py-2 text-sm" />
          {FINANZAS_CATEGORIES.map((category) => (
            <input
              key={category.id}
              type="number"
              value={gastos[category.id] ?? ''}
              onChange={(event) => setGastos((prev) => ({ ...prev, [category.id]: event.target.value }))}
              placeholder={category.label}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
            />
          ))}
          <button type="button" onClick={handleSave} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">Guardar mes</button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-400 uppercase tracking-wider">
            <tr>
              <th className="px-3 py-3">Mes</th>
              <th className="px-3 py-3">Ingresos</th>
              {FINANZAS_CATEGORIES.map((category) => <th key={category.id} className="px-3 py-3">{category.label}</th>)}
              <th className="px-3 py-3">Total gastos</th>
              <th className="px-3 py-3">Resultado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {registros.map((registro) => {
              const totalGastos = Object.values(registro.gastos).reduce((sum, value) => sum + value, 0);
              return (
                <tr key={registro.mes}>
                  <td className="px-3 py-3 font-semibold text-slate-700">{registro.mes}</td>
                  <td className="px-3 py-3 text-slate-500">${registro.ingresos.toLocaleString('es-MX')}</td>
                  {FINANZAS_CATEGORIES.map((category) => (
                    <td key={category.id} className="px-3 py-3 text-slate-500">
                      ${(registro.gastos[category.id] ?? 0).toLocaleString('es-MX')}
                    </td>
                  ))}
                  <td className="px-3 py-3 text-slate-500">${totalGastos.toLocaleString('es-MX')}</td>
                  <td className="px-3 py-3 font-bold text-indigo-600">${(registro.ingresos - totalGastos).toLocaleString('es-MX')}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
