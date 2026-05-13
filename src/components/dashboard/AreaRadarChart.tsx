import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { AREAS } from '../../data/diagnostico';
import type { ScoresPorArea } from '../../lib/calculator';

interface AreaRadarChartProps {
  scoresPorArea: ScoresPorArea;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-lg text-xs">
        <p className="font-semibold text-slate-700">{label}</p>
        <p className="text-indigo-600 font-bold">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
}

export function AreaRadarChart({ scoresPorArea }: AreaRadarChartProps) {
  const data = AREAS.map((area) => ({
    area: area.nombre,
    icono: area.icono,
    score: scoresPorArea[area.id] ?? 0,
    fullMark: 100,
  }));

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
        Balance por Área
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <RadarChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis
            dataKey="area"
            tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }}
          />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.15}
            strokeWidth={2}
            dot={{ fill: '#6366f1', r: 4 }}
          />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>

      {/* Leyenda de scores */}
      <div className="grid grid-cols-2 gap-2 mt-2">
        {AREAS.map((area) => {
          const score = scoresPorArea[area.id] ?? 0;
          return (
            <div key={area.id} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50">
              <span className="text-base">{area.icono}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-600 truncate">{area.nombre}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="flex-1 bg-slate-200 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full transition-all"
                      style={{ width: `${score}%`, backgroundColor: area.color }}
                    />
                  </div>
                  <span className="text-xs font-bold" style={{ color: area.color }}>
                    {score}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
