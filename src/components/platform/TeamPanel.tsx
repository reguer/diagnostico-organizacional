import { useState } from 'react';
import type { PlanTask } from '../../lib/activePlan';
import {
  assignTask,
  getActivity,
  getAssignedMember,
  getTeamMembers,
  inviteTeamMember,
  updateTeamMemberRole,
  type TeamRole,
} from '../../lib/team';

interface TeamPanelProps {
  tasks: PlanTask[];
  onChanged: () => void;
}

const ROLE_LABELS: Record<TeamRole, string> = {
  admin: 'Admin',
  colaborador: 'Colaborador',
  lectura: 'Solo lectura',
};

export function TeamPanel({ tasks, onChanged }: TeamPanelProps) {
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [role, setRole] = useState<TeamRole>('colaborador');
  const [memberFilter, setMemberFilter] = useState('todos');
  const members = getTeamMembers();
  const activity = getActivity();
  const visibleTasks = memberFilter === 'todos'
    ? tasks
    : tasks.filter((task) => getAssignedMember(task.id)?.id === memberFilter);

  function handleInvite() {
    if (!email.trim()) return;
    inviteTeamMember(email.trim(), role, nombre);
    setEmail('');
    setNombre('');
    onChanged();
  }

  function handleAssign(taskId: string, memberId: string) {
    if (!memberId) return;
    assignTask(taskId, memberId);
    onChanged();
  }

  return (
    <section className="grid gap-4 lg:grid-cols-[360px_1fr]">
      <div className="space-y-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Invitar equipo</h3>
          <div className="mt-4 grid gap-3">
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="correo@empresa.com"
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-300"
            />
            <input
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
              placeholder="Nombre visible"
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-300"
            />
            <select value={role} onChange={(event) => setRole(event.target.value as TeamRole)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm">
              {Object.entries(ROLE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            <button type="button" onClick={handleInvite} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
              Registrar invitacion
            </button>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-slate-400">
            En modo local se guarda la invitacion. Con Supabase configurado, estos registros quedan listos para asociarse al usuario autenticado.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Miembros</h3>
          <div className="mt-4 space-y-3">
            {members.map((member) => (
              <article key={member.id} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                <p className="text-sm font-bold text-slate-800">{member.nombre}</p>
                <p className="mt-1 text-xs text-slate-400">{member.email} · {member.status}</p>
                <select
                  value={member.role}
                  onChange={(event) => {
                    updateTeamMemberRole(member.id, event.target.value as TeamRole);
                    onChanged();
                  }}
                  className="mt-2 rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-600"
                >
                  {Object.entries(ROLE_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </article>
            ))}
            {members.length === 0 && <p className="text-sm text-slate-400">Aun no hay colaboradores registrados.</p>}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Mis tareas / asignacion</h3>
              <p className="mt-1 text-xs text-slate-400">Filtra por responsable y asigna tareas del plan activo.</p>
            </div>
            <select value={memberFilter} onChange={(event) => setMemberFilter(event.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600">
              <option value="todos">Todos</option>
              {members.map((member) => <option key={member.id} value={member.id}>{member.nombre}</option>)}
            </select>
          </div>

          <div className="mt-4 space-y-3">
            {visibleTasks.map((task) => {
              const assigned = getAssignedMember(task.id);
              return (
                <article key={task.id} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-slate-800">{task.titulo}</p>
                      <p className="mt-1 text-xs text-slate-400">{task.areaNombre} · {assigned ? `Asignada a ${assigned.nombre}` : 'Sin responsable'}</p>
                    </div>
                    <select
                      value={assigned?.id ?? ''}
                      onChange={(event) => handleAssign(task.id, event.target.value)}
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600"
                    >
                      <option value="">Asignar...</option>
                      {members.map((member) => <option key={member.id} value={member.id}>{member.nombre}</option>)}
                    </select>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Actividad</h3>
          <div className="mt-4 space-y-3">
            {activity.map((item) => (
              <article key={item.id} className="border-b border-slate-100 pb-3 last:border-b-0">
                <p className="text-sm font-semibold text-slate-700">{item.actor} {item.action}</p>
                <p className="mt-1 text-xs text-slate-400">{new Date(item.createdAt).toLocaleString('es-MX')}</p>
              </article>
            ))}
            {activity.length === 0 && <p className="text-sm text-slate-400">Aun no hay actividad del equipo.</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
