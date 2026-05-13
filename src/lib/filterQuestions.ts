import type { Area } from '../data/diagnostico';
import type { ConfigDiagnostico } from './config';

export function filtrarPreguntas(areas: Area[], config: ConfigDiagnostico): Area[] {
  return areas
    .filter((area) => {
      if (area.id === 'personas' && !config.tieneEmpleados && config.version === 'general') {
        return false;
      }
      return true;
    })
    .map((area) => ({
      ...area,
      preguntas: area.preguntas.filter((p) => {
        if (!p.versiones.includes(config.version)) return false;
        if (p.nivel === 'completo' && config.nivel !== 'completo') return false;
        if (p.requiresEmployees && !config.tieneEmpleados) return false;
        if (p.actividades && p.actividades.length > 0) {
          if (!p.actividades.some((a) => config.actividades.includes(a))) return false;
        }
        return true;
      }),
    }))
    .filter((area) => area.preguntas.length > 0);
}
