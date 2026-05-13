-- Etapa 5 - Supabase schema para Diagnostico Organizacional
-- Ejecutar en Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.business_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  negocio_nombre text,
  industria text,
  pais text,
  empleados integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.diagnosticos (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  fecha timestamptz not null,
  config jsonb not null,
  respuestas jsonb not null,
  resultado jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.tareas_estado (
  user_id uuid not null references auth.users(id) on delete cascade,
  task_id text not null,
  estado text not null check (estado in ('pendiente', 'en_progreso', 'completada')),
  nota text,
  fecha_asignada date,
  fecha_completada timestamptz,
  payload jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, task_id)
);

create table if not exists public.metas (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  descripcion text not null,
  valor_objetivo numeric,
  fecha_limite date not null,
  area_id text not null,
  estado text not null check (estado in ('activa', 'alcanzada', 'cancelada')),
  sugerida boolean not null default false,
  payload jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.kpi_registros (
  user_id uuid not null references auth.users(id) on delete cascade,
  kpi_id text not null,
  area_id text not null,
  mes text not null,
  valor numeric not null,
  created_at timestamptz not null default now(),
  primary key (user_id, kpi_id, mes)
);

create table if not exists public.finanzas_basicas (
  user_id uuid not null references auth.users(id) on delete cascade,
  mes text not null,
  ingresos numeric not null default 0,
  gastos jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  primary key (user_id, mes)
);

create table if not exists public.badges_desbloqueados (
  user_id uuid not null references auth.users(id) on delete cascade,
  badge_id text not null,
  unlocked_at timestamptz not null default now(),
  primary key (user_id, badge_id)
);

create table if not exists public.team_members (
  id text primary key,
  owner_user_id uuid not null references auth.users(id) on delete cascade,
  email text not null,
  nombre text not null,
  role text not null check (role in ('admin', 'colaborador', 'lectura')),
  status text not null check (status in ('invitado', 'activo')),
  created_at timestamptz not null default now()
);

create table if not exists public.task_assignments (
  owner_user_id uuid not null references auth.users(id) on delete cascade,
  task_id text not null,
  member_id text not null references public.team_members(id) on delete cascade,
  updated_at timestamptz not null default now(),
  primary key (owner_user_id, task_id)
);

create table if not exists public.activity_feed (
  id text primary key,
  owner_user_id uuid not null references auth.users(id) on delete cascade,
  actor text not null,
  action text not null,
  task_id text,
  created_at timestamptz not null default now()
);

alter table public.business_profiles enable row level security;
alter table public.diagnosticos enable row level security;
alter table public.tareas_estado enable row level security;
alter table public.metas enable row level security;
alter table public.kpi_registros enable row level security;
alter table public.finanzas_basicas enable row level security;
alter table public.badges_desbloqueados enable row level security;
alter table public.team_members enable row level security;
alter table public.task_assignments enable row level security;
alter table public.activity_feed enable row level security;

create policy "business_profiles_owner_all" on public.business_profiles
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "diagnosticos_owner_all" on public.diagnosticos
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "tareas_estado_owner_all" on public.tareas_estado
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "metas_owner_all" on public.metas
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "kpi_registros_owner_all" on public.kpi_registros
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "finanzas_basicas_owner_all" on public.finanzas_basicas
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "badges_desbloqueados_owner_all" on public.badges_desbloqueados
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "team_members_owner_all" on public.team_members
  for all using (auth.uid() = owner_user_id) with check (auth.uid() = owner_user_id);

create policy "task_assignments_owner_all" on public.task_assignments
  for all using (auth.uid() = owner_user_id) with check (auth.uid() = owner_user_id);

create policy "activity_feed_owner_all" on public.activity_feed
  for all using (auth.uid() = owner_user_id) with check (auth.uid() = owner_user_id);
