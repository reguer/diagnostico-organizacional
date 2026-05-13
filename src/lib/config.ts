export type VersionDiagnostico = 'general' | 'construccion';

export type ActividadConstruccion =
  | 'paisajismo'
  | 'riego'
  | 'senaletica'
  | 'construccion_residencial'
  | 'construccion_comercial'
  | 'proyectos_ejecutivos'
  | 'mantenimiento';

export interface ConfigDiagnostico {
  version: VersionDiagnostico;
  tieneEmpleados: boolean;
  actividades: ActividadConstruccion[];
  nivel: 'basico' | 'completo';
}

export const ACTIVIDADES_LABELS: Record<ActividadConstruccion, string> = {
  paisajismo: 'Paisajismo',
  riego: 'Sistemas de Riego',
  senaletica: 'Señalética',
  construccion_residencial: 'Construcción Residencial',
  construccion_comercial: 'Construcción Comercial / Industrial',
  proyectos_ejecutivos: 'Proyectos Ejecutivos',
  mantenimiento: 'Mantenimiento',
};

export const CONFIG_DEFAULT: ConfigDiagnostico = {
  version: 'construccion',
  tieneEmpleados: true,
  actividades: ['paisajismo', 'riego', 'senaletica', 'construccion_residencial', 'proyectos_ejecutivos'],
  nivel: 'basico',
};
