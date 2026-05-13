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
