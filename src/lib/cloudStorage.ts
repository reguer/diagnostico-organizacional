import { getCustomTasks } from './activePlan';
import { getBadgesDesbloqueados, getEstadosTareas, getHistorialDiagnosticos } from './storage';
import { getFinanzas, getKpiSeries, getMetas, KPI_DEFINITIONS } from './metricas';
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

  return {
    diagnosticos: diagnosticos.length,
    tareas: tareas.length + customTasks.length,
    metas: metas.length,
    kpis: kpiRows.length,
    finanzas: finanzas.length,
    badges: badges.length,
  };
}
