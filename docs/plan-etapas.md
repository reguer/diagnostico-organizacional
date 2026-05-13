# Diagnostico Organizacional - Roadmap por Etapas

## Contexto

El app parte como una herramienta de diagnostico puntual: el usuario responde preguntas, ve resultados y recibe un plan de accion inicial. El objetivo es convertirlo en una plataforma local de seguimiento empresarial donde el diagnostico sea la entrada a ejecucion, medicion y mejora mes a mes.

Principio rector: cada etapa debe quedar funcional en produccion local antes de avanzar, sin romper lo anterior.

Estado base:

- React 19 + Vite + TypeScript + Tailwind CSS.
- Diagnostico de 5 areas.
- KPI/KRI conceptual, plan de accion inicial, dashboard de resultados.
- Sin persistencia antes de Etapa 1.

## Etapa 1 - Memoria y Seguimiento Local

Alcance: localStorage, sin backend, sin login.

Implementar:

- Historial de diagnosticos guardados automaticamente con fecha, config, respuestas y resultado serializado.
- Vista "Mis Diagnosticos" con score general, fecha, version, acciones Ver y Eliminar.
- Comparacion contra diagnostico anterior con radar superpuesto, tabla por area y texto de cambio.
- Estados persistentes de tareas: pendiente, en progreso, completada.
- Contador y barra de progreso de tareas.
- Sistema de 8 badges: Primer diagnostico, Primer paso, Semana activa, Mejora confirmada, Area solucionada, Plan completo, Constancia y Crecimiento.
- Toast al desbloquear badges.
- Vista "Logros".

Estado: implementada el 2026-05-13.

## Etapa 2 - Plan Activo y Notas de Progreso

Alcance: el plan semanal se convierte en tablero de trabajo activo, todavia local.

Implementar:

- Tablero Kanban simple con columnas Pendiente, En Progreso y Completada.
- Drag and drop con `@dnd-kit/core`.
- Persistencia de estado en localStorage.
- Filtros por area y tipo de tarea.
- Notas de progreso por tarea con mini editor y fecha de ultima edicion.
- Preview de nota en cada tarjeta.
- Exportacion de notas en Markdown.
- Banner de re-diagnostico sugerido despues de 4 semanas.
- Preseleccion de configuracion anterior al iniciar re-diagnostico.
- Modal para agregar tareas propias.
- Tareas personalizadas diferenciadas visualmente y persistidas.

Archivos sugeridos:

- `src/components/dashboard/TaskBoard.tsx`
- `src/components/dashboard/TaskNote.tsx`
- `src/components/dashboard/AddTaskModal.tsx`
- `src/components/dashboard/WeeklyPlan.tsx`
- `src/lib/exportMarkdown.ts`

## Etapa 3 - Metas, KPIs Manuales y Metricas Basicas

Alcance: registro manual de metas, KPIs y finanzas basicas para medir avance real.

Implementar:

- Panel "Mis Metas" con descripcion, valor objetivo opcional, fecha limite, area y estado.
- Metas sugeridas automaticamente desde el plan de accion.
- Registro mensual de valores reales para KPIs.
- Series temporales por KPI en localStorage.
- Alertas visuales al superar umbrales KRI.
- Graficas de tendencia mes a mes con Recharts.
- Modulo de finanzas basicas: ingresos, gastos por area, margen bruto y ultimos 6 meses.

Archivos sugeridos:

- `src/lib/metricas.ts`
- `src/components/dashboard/GoalsPanel.tsx`
- `src/components/dashboard/KpiTracker.tsx`
- `src/components/dashboard/FinanzasBasicas.tsx`

## Etapa 4 - Planificacion y Calendario

Alcance: las tareas y metas adquieren fecha real y pueden reorganizarse.

Implementar:

- Tab "Calendario" con vista mensual simple.
- Tareas del plan activo en dias asignados.
- Metas con fecha limite como hitos.
- Color por tipo: remediacion, optimizacion, crecimiento.
- Panel lateral al seleccionar un dia.
- Drag and drop de tareas a otros dias.
- Exportacion `.ics` compatible con Google Calendar, Outlook y Apple Calendar.
- Ciclos mensuales con resumen del mes anterior y rollover de tareas pendientes.

Archivos sugeridos:

- `src/components/dashboard/CalendarView.tsx`
- `src/lib/exportCalendar.ts`
- `src/lib/planCycles.ts`

## Etapa 5 - Cuentas de Usuario y Sincronizacion en la Nube

Alcance: backend con Supabase para autenticacion y sincronizacion.

Implementar:

- Registro/login con Supabase Auth.
- Opcion "Continuar sin cuenta" manteniendo modo local.
- Migracion automatica de localStorage a nube al iniciar sesion.
- Perfil de negocio: nombre, industria, pais, empleados.
- Tablas Supabase con Row Level Security:
  - `users`
  - `diagnosticos`
  - `tareas_estado`
  - `metas`
  - `kpi_registros`
  - `finanzas_basicas`
  - `badges_desbloqueados`
- Vista "Reportes" con historial completo y evolucion de score general.

Stack sugerido:

- Supabase Auth + Postgres + RLS.
- `@supabase/supabase-js`.
- SPA estatica compatible con GitHub Pages.

## Etapa 6 - Colaboracion y Multi-usuario

Alcance: varios miembros del negocio pueden ver, comentar y tomar tareas.

Implementar:

- Invitacion de equipo por email.
- Roles: Admin, Colaborador, Solo lectura.
- Asignacion de tareas a miembros.
- Vista "Mis tareas" por colaborador.
- Notificaciones in-app.
- Feed de actividad del negocio.

## Esquema localStorage

```text
diag:historial          -> DiagnosticoGuardado[]
diag:tareas:{id}        -> { estado, nota, fechaCompletada, fechaActualizacion }
diag:badges             -> string[]
diag:metas              -> Meta[]
diag:kpi:{areaId}:{kpi} -> { mes: string, valor: number }[]
diag:finanzas           -> { mes: string, ingresos: number, gastos: Record<areaId, number> }[]
diag:plan_activo        -> PlanActivo
```

## Flujo de datos objetivo

```text
Diagnostico -> genera:
  - Plan semanal
  - Metas sugeridas
  - KPIs a trackear
  - Badges iniciales

Usuario alimenta:
  - Estado de tareas
  - Notas de progreso
  - Valores mensuales de KPIs
  - Ingresos y gastos basicos
  - Fechas y calendario

Sistema genera:
  - Comparativos entre diagnosticos
  - Alertas KRI
  - Badges
  - Ciclos mensuales
  - Graficas de tendencia
```
