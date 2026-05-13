import type { ResultadosDiagnostico } from './calculator';
import type { ConfigDiagnostico } from './config';
import type { PlanSemanal } from './weeklyPlan';
import type { KpiKriArea } from './kpiKri';
import { ACTIVIDADES_LABELS } from './config';

const NIVEL_EMOJI: Record<string, string> = {
  critico: '🔴',
  bajo: '🟠',
  medio: '🟡',
  bueno: '🟢',
  excelente: '🟣',
};

const TIPO_EMOJI: Record<string, string> = {
  remediacion: '🔧',
  optimizacion: '📈',
  crecimiento: '🚀',
};

export function descargarResultadosMarkdown(
  resultado: ResultadosDiagnostico,
  config: ConfigDiagnostico,
  planSemanal: PlanSemanal[],
  kpiKriData: KpiKriArea[],
): void {
  const md = generarMarkdown(resultado, config, planSemanal, kpiKriData);
  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `diagnostico-organizacional-${new Date().toISOString().split('T')[0]}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function generarMarkdown(
  resultado: ResultadosDiagnostico,
  config: ConfigDiagnostico,
  planSemanal: PlanSemanal[],
  kpiKriData: KpiKriArea[],
): string {
  const fecha = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  const version = config.version === 'general' ? 'Negocio General' : 'Construcción y Servicios';
  const nivel = config.nivel === 'basico' ? 'Básico' : 'Completo';
  const actividadesStr = config.version === 'construccion'
    ? config.actividades.map((a) => ACTIVIDADES_LABELS[a]).join(', ')
    : config.tieneEmpleados ? 'Con empleados' : 'Sin empleados';

  const emoji = NIVEL_EMOJI[resultado.nivel] ?? '⚪';

  const lines: string[] = [];

  // Header
  lines.push(`# Diagnóstico Organizacional`);
  lines.push('');
  lines.push(`> **Fecha:** ${fecha}  `);
  lines.push(`> **Versión:** ${version}  `);
  lines.push(`> **Profundidad:** ${nivel}  `);
  lines.push(`> **Variables:** ${actividadesStr}`);
  lines.push('');

  // Score general
  lines.push(`## ${emoji} Resultado General: ${resultado.scoreGeneral}%`);
  lines.push('');
  lines.push(`**Nivel:** ${resultado.nivelTexto}`);
  lines.push('');

  // Scores por área
  lines.push('## 📊 Scores por Área');
  lines.push('');
  lines.push('| Área | Score | Nivel |');
  lines.push('|------|-------|-------|');
  for (const [areaId, score] of Object.entries(resultado.scoresPorArea)) {
    const nivelArea = score < 50 ? '⚠️ Requiere atención' : score < 80 ? '📈 En desarrollo' : '✅ Sólido';
    lines.push(`| ${areaId.charAt(0).toUpperCase() + areaId.slice(1)} | ${score}% | ${nivelArea} |`);
  }
  lines.push('');

  // Impactos reales
  if (resultado.impactosReales.length > 0) {
    lines.push('## ⚠️ Principales Fugas de Rentabilidad');
    lines.push('');
    for (const impacto of resultado.impactosReales) {
      lines.push(`### ${impacto.icono} ${impacto.titulo}`);
      lines.push('');
      lines.push(`> ⚠️ **${impacto.areaNombre}** — Score: ${impacto.score}%`);
      lines.push('');
      lines.push(impacto.descripcion);
      lines.push('');
      lines.push(`*${impacto.estimacion}*`);
      lines.push('');
    }
  }

  // Plan de acción
  lines.push('## 🗂️ Plan de Acción');
  lines.push('');
  for (const accion of resultado.planAccion) {
    const tipoEmoji = TIPO_EMOJI[accion.tipo] ?? '📌';
    lines.push(`### ${tipoEmoji} ${accion.accion}`);
    lines.push('');
    lines.push(`**Área:** ${accion.areaNombre} ${accion.icono}  `);
    lines.push(`**Tipo:** ${accion.tipo === 'remediacion' ? 'Corrección urgente' : accion.tipo === 'optimizacion' ? 'Optimización' : 'Crecimiento / expansión'}  `);
    lines.push(`**Plazo:** ${accion.plazo}`);
    lines.push('');
    lines.push(`- [ ] ${accion.detalle}`);
    lines.push('');
  }

  // Plan 4 semanas
  lines.push('## 📅 Plan de 4 Semanas');
  lines.push('');
  for (const semana of planSemanal) {
    lines.push(`### ${semana.semana} — ${semana.subtitulo}`);
    lines.push('');
    lines.push(`**Objetivo:** ${semana.objetivo}`);
    lines.push('');
    lines.push('**Al terminar esta semana habrás logrado:**');
    lines.push('');
    for (const meta of semana.metasSemana) {
      lines.push(`- [ ] ${meta}`);
    }
    lines.push('');

    // Group tasks by day
    const tareasPorDia: Record<string, typeof semana.tareas> = {};
    for (const tarea of semana.tareas) {
      if (!tareasPorDia[tarea.dia]) tareasPorDia[tarea.dia] = [];
      tareasPorDia[tarea.dia].push(tarea);
    }

    for (const [dia, tareas] of Object.entries(tareasPorDia)) {
      lines.push(`**${dia}**`);
      lines.push('');
      for (const tarea of tareas) {
        lines.push(`- [ ] **${tarea.titulo}** *(${tarea.duracion})*`);
        lines.push(`  ${tarea.detalle}`);
        if (tarea.herramienta) lines.push(`  🛠 ${tarea.herramienta}`);
        if (tarea.automatizacion) lines.push(`  ⚡ ${tarea.automatizacion}`);
      }
      lines.push('');
    }
  }

  // KPI / KRI
  lines.push('## 📈 Indicadores Clave (KPI / KRI)');
  lines.push('');
  lines.push('> **KPI** (Key Performance Indicator): mide el desempeño histórico — ¿cómo lo estás haciendo?');
  lines.push('> **KRI** (Key Risk Indicator): señal de alerta temprana — ¿qué podría salir mal?');
  lines.push('');

  for (const area of kpiKriData) {
    lines.push(`### ${area.icono} ${area.areaNombre}`);
    lines.push('');
    lines.push(`**Objetivo:** ${area.objetivo}`);
    lines.push('');
    lines.push('**KPIs a medir:**');
    lines.push('');
    lines.push('| Indicador | Meta | Frecuencia | Responsable |');
    lines.push('|-----------|------|------------|-------------|');
    for (const kpi of area.kpis) {
      lines.push(`| ${kpi.kpi} | ${kpi.meta} | ${kpi.frecuencia} | ${kpi.responsable} |`);
    }
    lines.push('');
    lines.push('**KRIs — señales de alerta:**');
    lines.push('');
    lines.push('| Señal de alerta | Umbral | Frecuencia |');
    lines.push('|-----------------|--------|------------|');
    for (const kri of area.kris) {
      lines.push(`| ${kri.kri} | ${kri.umbralAlerta} | ${kri.frecuencia} |`);
    }
    lines.push('');
  }

  // Footer
  lines.push('---');
  lines.push('');
  lines.push('*Generado con [Diagnóstico Organizacional](https://reguer.github.io/diagnostico-organizacional/)*');
  lines.push('');

  return lines.join('\n');
}
