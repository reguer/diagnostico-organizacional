import type { Meta } from './metricas';
import type { PlanTask } from './activePlan';
import { getTaskDisplayDate } from './activePlan';

function escapeText(text: string) {
  return text.replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n');
}

function compactDate(date: string) {
  return date.replaceAll('-', '');
}

export function buildIcs(tasks: PlanTask[], metas: Meta[]) {
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const taskEvents = tasks.map((task) => {
    const date = compactDate(getTaskDisplayDate(task));
    return [
      'BEGIN:VEVENT',
      `UID:${task.id}@diagnostico-local`,
      `DTSTAMP:${now}`,
      `DTSTART;VALUE=DATE:${date}`,
      `SUMMARY:${escapeText(`${task.areaNombre} - ${task.titulo}`)}`,
      `DESCRIPTION:${escapeText(`${task.tipo}: ${task.detalle}`)}`,
      'END:VEVENT',
    ].join('\r\n');
  });
  const goalEvents = metas.map((meta) => {
    const date = compactDate(meta.fechaLimite);
    return [
      'BEGIN:VEVENT',
      `UID:${meta.id}@diagnostico-local`,
      `DTSTAMP:${now}`,
      `DTSTART;VALUE=DATE:${date}`,
      `SUMMARY:${escapeText(`Meta - ${meta.descripcion}`)}`,
      'END:VEVENT',
    ].join('\r\n');
  });

  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Diagnostico Local//ES', ...taskEvents, ...goalEvents, 'END:VCALENDAR'].join('\r\n');
}

export function downloadIcs(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
