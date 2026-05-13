# Changelog

## 2026-05-13 - Etapa 1: Memoria y Seguimiento Local

- Agregado historial local de diagnosticos en `localStorage` con fecha, configuracion, respuestas y resultados.
- Agregada vista "Mis Diagnosticos" para ver y eliminar registros guardados.
- Agregada comparacion contra el diagnostico anterior con radar superpuesto, tabla de cambios y resumen textual.
- Agregados estados persistentes para acciones del plan: pendiente, en progreso y completada.
- Agregado contador y barra de progreso de tareas del plan inmediato.
- Agregado sistema de badges locales con 8 logros iniciales.
- Agregado toast al desbloquear logros.
- Agregada vista "Logros" en el dashboard.
- Guardado el roadmap de etapas restantes en `docs/plan-etapas.md`.

## 2026-05-13 - Etapas 2, 3 y 4 en pagina alterna

- Agregada ruta alterna `#/plataforma` para la version en proceso sin reemplazar la pagina original.
- Agregado tablero activo de tareas con columnas Pendiente, En progreso y Completada, filtros por area/tipo y drag and drop nativo.
- Agregadas notas persistentes por tarea y tareas personalizadas.
- Agregado panel de metas con sugerencias desde el diagnostico.
- Agregado registro mensual de KPIs con tendencias y alertas KRI.
- Agregado modulo de finanzas basicas con ingresos, gastos y margen mensual.
- Agregado calendario mensual con reasignacion de tareas por drag and drop y exportacion `.ics`.
- Configurado `base` de Vite para GitHub Pages en `/diagnostico-organizacional/`.
- Agregado workflow de GitHub Pages para desplegar `dist`.

## 2026-05-13 - Etapa 5: Cuentas y sincronizacion cloud preparada

- Agregado cliente Supabase opcional con `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
- Agregado panel de cuenta en `#/plataforma` para login, registro, cierre de sesion, perfil de negocio y sincronizacion.
- Agregada migracion de datos locales a nube para diagnosticos, tareas, metas, KPIs, finanzas y badges.
- Agregado esquema SQL con Row Level Security en `docs/supabase-schema.sql`.
- Agregado `.env.example` y variables de GitHub Actions para build en Pages.

## 2026-05-13 - Etapa 6: Colaboracion y equipo

- Agregada pestaña `Equipo` en la plataforma alterna.
- Agregado registro local de invitaciones por email con roles Admin, Colaborador y Solo lectura.
- Agregada asignacion de tareas a miembros del equipo y filtro de "Mis tareas" por responsable.
- Agregado feed de actividad local para invitaciones, cambios de rol, asignaciones y tareas completadas.
- Extendida sincronizacion Supabase para miembros, asignaciones y feed.
- Extendida `docs/supabase-schema.sql` con tablas `team_members`, `task_assignments` y `activity_feed` con RLS.

## 2026-05-13 - Produccion cloud: restauracion y reportes

- Agregada restauracion de datos Supabase hacia localStorage para usar la plataforma desde un navegador nuevo.
- Agregado boton "Restaurar nube a este navegador" en el panel de cuenta.
- Agregada pestaña `Reportes` con evolucion del score general, ultimo diagnostico y tabla historica por area.
- Agregadas utilidades de reemplazo local para diagnosticos, tareas, metas, KPIs, finanzas, equipo y actividad.

## 2026-05-13 - Acceso local con usuario y contrasena

- Agregada cuenta local para entrar a seguimiento cuando Supabase aun no esta configurado.
- Agregado alta/login/logout local con usuario y contrasena hasheada en el navegador.
- El modo local mantiene respuestas, tareas, metas y equipo en `localStorage`.

## 2026-05-13 - Ajustes de captura y seguimiento

- Agregado acceso con usuario y contrasena desde la primera pantalla del diagnostico.
- Agregada navegacion directa entre areas del formulario para avanzar o retroceder y corregir respuestas.
- Agregada descarga del plan semanal en formato tabla CSV por semana o plan completo.
- Actualizados los indicadores KPI/KRI para abrir o cerrar todos, o mantener varias areas abiertas a la vez.

## 2026-05-13 - Plan integral desde respuestas reales

- Corregido el plan de accion para generar una accion por cada respuesta no optima, no solo una tarea por area.
- La plataforma recalcula los diagnosticos guardados, incluido el usuario local `reguer`, sin borrar respuestas.
- Agregado plan semanal sin limite fijo de 4 semanas, con trabajo en paralelo por area y recurrencias semanales visibles.
- Agregado formato descargable Notion-ready de epics and stories desde el tablero de tareas.
- Agregadas vistas de Diagnostico, Plan semanal e Indicadores dentro de la plataforma de seguimiento.
- Ampliado el catalogo de KPIs/KRIs para cubrir finanzas, operaciones, mercadeo, personas y estrategia con mas granularidad.
