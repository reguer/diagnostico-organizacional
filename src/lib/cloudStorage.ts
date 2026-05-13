import { getCustomTasks, replaceCustomTasks, type PlanTask } from './activePlan';
import {
  getBadgesDesbloqueados,
  getEstadosTareas,
  getHistorialDiagnosticos,
  replaceEstadosTareas,
  replaceHistorialDiagnosticos,
  saveBadgesDesbloqueados,
  type DiagnosticoGuardado,
  type EstadoTarea,
  type EstadoTareaGuardado,
} from './storage';
import {
  getActivity,
  getTaskAssignments,
  getTeamMembers,
  replaceActivity,
  replaceTaskAssignments,
  replaceTeamMembers,
  type ActivityItem,
  type TaskAssignment,
  type TeamMember,
  type TeamRole,
} from './team';
import {
  getFinanzas,
  getKpiSeries,
  getMetas,
  KPI_DEFINITIONS,
  replaceFinanzas,
  replaceKpiSeries,
  replaceMetas,
  type EstadoMeta,
  type FinanzasRegistro,
} from './metricas';
import { isSupabaseConfigured, supabase } from './supabaseClient';

export interface BusinessProfileInput {
  negocioNombre: string;
  industria: string;
  pais: string;
  empleados?: number;
}

function requireSupabase() {
  if (!supabase || !isSupabaseConfigured) {
    throw new Error('Supabase no esta configurado');
  }
  return supabase;
}

export async function signUpWithEmail(email: string, password: string) {
  const client = requireSupabase();
  const { data, error } = await client.auth.signUp({ email, password });
  if (error) throw error;
  return data;
}

export async function signInWithEmail(email: string, password: string) {
  const client = requireSupabase();
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const client = requireSupabase();
  const { error } = await client.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data.user ?? null;
}

export async function saveBusinessProfile(userId: string, profile: BusinessProfileInput) {
  const client = requireSupabase();
  const { error } = await client.from('business_profiles').upsert({
    user_id: userId,
    negocio_nombre: profile.negocioNombre,
    industria: profile.industria,
    pais: profile.pais,
    empleados: profile.empleados ?? null,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id' });
  if (error) throw error;
}

export async function getBusinessProfile(userId: string) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('business_profiles')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function syncLocalDataToCloud(userId: string) {
  const client = requireSupabase();
  const diagnosticos = getHistorialDiagnosticos();
  const tareas = getEstadosTareas();
  const metas = getMetas();
  const finanzas = getFinanzas();
  const badges = getBadgesDesbloqueados();
  const customTasks = getCustomTasks();
  const teamMembers = getTeamMembers();
  const assignments = getTaskAssignments();
  const activity = getActivity();

  if (diagnosticos.length > 0) {
    const { error } = await client.from('diagnosticos').upsert(
      diagnosticos.map((item) => ({
        id: item.id,
        user_id: userId,
        fecha: item.fecha,
        config: item.config,
        respuestas: item.respuestas,
        resultado: item.resultado,
      })),
    );
    if (error) throw error;
  }

  if (tareas.length > 0 || customTasks.length > 0) {
    const runtimeRows = tareas.map((item) => ({
      user_id: userId,
      task_id: item.id,
      estado: item.estado,
      nota: item.nota ?? null,
      fecha_asignada: item.fechaAsignada ?? null,
      fecha_completada: item.fechaCompletada ?? null,
      payload: item,
      updated_at: item.fechaActualizacion,
    }));
    const customRows = customTasks.map((task) => ({
      user_id: userId,
      task_id: task.id,
      estado: 'pendiente',
      nota: null,
      fecha_asignada: task.fechaAsignada,
      fecha_completada: null,
      payload: task,
      updated_at: new Date().toISOString(),
    }));
    const { error } = await client.from('tareas_estado').upsert([...runtimeRows, ...customRows], {
      onConflict: 'user_id,task_id',
    });
    if (error) throw error;
  }

  if (metas.length > 0) {
    const { error } = await client.from('metas').upsert(
      metas.map((meta) => ({
        id: meta.id,
        user_id: userId,
        descripcion: meta.descripcion,
        valor_objetivo: meta.valorObjetivo ?? null,
        fecha_limite: meta.fechaLimite,
        area_id: meta.areaId,
        estado: meta.estado,
        sugerida: Boolean(meta.sugerida),
        payload: meta,
      })),
    );
    if (error) throw error;
  }

  const kpiRows = KPI_DEFINITIONS.flatMap((kpi) => getKpiSeries(kpi.id).map((registro) => ({
    user_id: userId,
    kpi_id: kpi.id,
    area_id: kpi.areaId,
    mes: registro.mes,
    valor: registro.valor,
  })));
  if (kpiRows.length > 0) {
    const { error } = await client.from('kpi_registros').upsert(kpiRows, {
      onConflict: 'user_id,kpi_id,mes',
    });
    if (error) throw error;
  }

  if (finanzas.length > 0) {
    const { error } = await client.from('finanzas_basicas').upsert(
      finanzas.map((item) => ({
        user_id: userId,
        mes: item.mes,
        ingresos: item.ingresos,
        gastos: item.gastos,
      })),
      { onConflict: 'user_id,mes' },
    );
    if (error) throw error;
  }

  if (badges.length > 0) {
    const { error } = await client.from('badges_desbloqueados').upsert(
      badges.map((badgeId) => ({
        user_id: userId,
        badge_id: badgeId,
        unlocked_at: new Date().toISOString(),
      })),
      { onConflict: 'user_id,badge_id' },
    );
    if (error) throw error;
  }

  if (teamMembers.length > 0) {
    const { error } = await client.from('team_members').upsert(
      teamMembers.map((member) => ({
        id: member.id,
        owner_user_id: userId,
        email: member.email,
        nombre: member.nombre,
        role: member.role,
        status: member.status,
        created_at: member.createdAt,
      })),
    );
    if (error) throw error;
  }

  if (assignments.length > 0) {
    const { error } = await client.from('task_assignments').upsert(
      assignments.map((assignment) => ({
        owner_user_id: userId,
        task_id: assignment.taskId,
        member_id: assignment.memberId,
        updated_at: assignment.updatedAt,
      })),
      { onConflict: 'owner_user_id,task_id' },
    );
    if (error) throw error;
  }

  if (activity.length > 0) {
    const { error } = await client.from('activity_feed').upsert(
      activity.map((item) => ({
        id: item.id,
        owner_user_id: userId,
        actor: item.actor,
        action: item.action,
        task_id: item.taskId ?? null,
        created_at: item.createdAt,
      })),
    );
    if (error) throw error;
  }

  return {
    diagnosticos: diagnosticos.length,
    tareas: tareas.length + customTasks.length,
    metas: metas.length,
    kpis: kpiRows.length,
    finanzas: finanzas.length,
    badges: badges.length,
    teamMembers: teamMembers.length,
    assignments: assignments.length,
    activity: activity.length,
  };
}

interface CloudDiagnosticRow {
  id: string;
  fecha: string;
  config: DiagnosticoGuardado['config'];
  respuestas: Record<string, number>;
  resultado: DiagnosticoGuardado['resultado'];
}

interface CloudTaskRow {
  task_id: string;
  estado: EstadoTarea;
  nota: string | null;
  fecha_asignada: string | null;
  fecha_completada: string | null;
  payload: Partial<EstadoTareaGuardado> | PlanTask | null;
  updated_at: string;
}

interface CloudMetaRow {
  id: string;
  descripcion: string;
  valor_objetivo: number | null;
  fecha_limite: string;
  area_id: string;
  estado: EstadoMeta;
  sugerida: boolean;
}

interface CloudKpiRow {
  kpi_id: string;
  mes: string;
  valor: number;
}

interface CloudFinanceRow {
  mes: string;
  ingresos: number;
  gastos: Record<string, number>;
}

interface CloudTeamMemberRow {
  id: string;
  email: string;
  nombre: string;
  role: TeamRole;
  status: 'invitado' | 'activo';
  created_at: string;
}

interface CloudAssignmentRow {
  task_id: string;
  member_id: string;
  updated_at: string;
}

interface CloudActivityRow {
  id: string;
  actor: string;
  action: string;
  task_id: string | null;
  created_at: string;
}

export async function restoreCloudDataToLocal(userId: string) {
  const client = requireSupabase();

  const [
    diagnosticosRes,
    tareasRes,
    metasRes,
    kpisRes,
    finanzasRes,
    badgesRes,
    membersRes,
    assignmentsRes,
    activityRes,
  ] = await Promise.all([
    client.from('diagnosticos').select('id, fecha, config, respuestas, resultado').eq('user_id', userId).order('fecha', { ascending: false }),
    client.from('tareas_estado').select('task_id, estado, nota, fecha_asignada, fecha_completada, payload, updated_at').eq('user_id', userId),
    client.from('metas').select('id, descripcion, valor_objetivo, fecha_limite, area_id, estado, sugerida').eq('user_id', userId),
    client.from('kpi_registros').select('kpi_id, mes, valor').eq('user_id', userId),
    client.from('finanzas_basicas').select('mes, ingresos, gastos').eq('user_id', userId),
    client.from('badges_desbloqueados').select('badge_id').eq('user_id', userId),
    client.from('team_members').select('id, email, nombre, role, status, created_at').eq('owner_user_id', userId),
    client.from('task_assignments').select('task_id, member_id, updated_at').eq('owner_user_id', userId),
    client.from('activity_feed').select('id, actor, action, task_id, created_at').eq('owner_user_id', userId).order('created_at', { ascending: false }),
  ]);

  const errors = [diagnosticosRes, tareasRes, metasRes, kpisRes, finanzasRes, badgesRes, membersRes, assignmentsRes, activityRes]
    .map((result) => result.error)
    .filter(Boolean);
  if (errors[0]) throw errors[0];

  const diagnosticos = (diagnosticosRes.data ?? []) as CloudDiagnosticRow[];
  replaceHistorialDiagnosticos(diagnosticos.map((item) => ({
    id: item.id,
    fecha: item.fecha,
    config: item.config,
    respuestas: item.respuestas,
    resultado: item.resultado,
  })));

  const taskRows = (tareasRes.data ?? []) as CloudTaskRow[];
  const runtimeRows: EstadoTareaGuardado[] = taskRows.map((item) => ({
    id: item.task_id,
    estado: item.estado,
    nota: item.nota ?? undefined,
    fechaAsignada: item.fecha_asignada ?? undefined,
    fechaCompletada: item.fecha_completada ?? undefined,
    fechaActualizacion: item.updated_at,
  }));
  replaceEstadosTareas(runtimeRows);
  replaceCustomTasks(taskRows
    .map((item) => item.payload)
    .filter((payload): payload is PlanTask => Boolean(payload && 'origen' in payload && payload.origen === 'personalizada')));

  replaceMetas(((metasRes.data ?? []) as CloudMetaRow[]).map((meta) => ({
    id: meta.id,
    descripcion: meta.descripcion,
    valorObjetivo: meta.valor_objetivo ?? undefined,
    fechaLimite: meta.fecha_limite,
    areaId: meta.area_id,
    estado: meta.estado,
    sugerida: meta.sugerida,
  })));

  const kpiRows = (kpisRes.data ?? []) as CloudKpiRow[];
  KPI_DEFINITIONS.forEach((kpi) => {
    replaceKpiSeries(kpi.id, kpiRows
      .filter((row) => row.kpi_id === kpi.id)
      .map((row) => ({ mes: row.mes, valor: row.valor })));
  });

  replaceFinanzas(((finanzasRes.data ?? []) as CloudFinanceRow[]).map((row) => ({
    mes: row.mes,
    ingresos: row.ingresos,
    gastos: row.gastos,
  } satisfies FinanzasRegistro)));

  saveBadgesDesbloqueados((badgesRes.data ?? []).map((row: { badge_id: string }) => row.badge_id));

  replaceTeamMembers(((membersRes.data ?? []) as CloudTeamMemberRow[]).map((member) => ({
    id: member.id,
    email: member.email,
    nombre: member.nombre,
    role: member.role,
    status: member.status,
    createdAt: member.created_at,
  } satisfies TeamMember)));

  replaceTaskAssignments(((assignmentsRes.data ?? []) as CloudAssignmentRow[]).map((assignment) => ({
    taskId: assignment.task_id,
    memberId: assignment.member_id,
    updatedAt: assignment.updated_at,
  } satisfies TaskAssignment)));

  replaceActivity(((activityRes.data ?? []) as CloudActivityRow[]).map((item) => ({
    id: item.id,
    actor: item.actor,
    action: item.action,
    taskId: item.task_id ?? undefined,
    createdAt: item.created_at,
  } satisfies ActivityItem)));

  return {
    diagnosticos: diagnosticos.length,
    tareas: taskRows.length,
    metas: (metasRes.data ?? []).length,
    kpis: kpiRows.length,
    finanzas: (finanzasRes.data ?? []).length,
    badges: (badgesRes.data ?? []).length,
    teamMembers: (membersRes.data ?? []).length,
    assignments: (assignmentsRes.data ?? []).length,
    activity: (activityRes.data ?? []).length,
  };
}
