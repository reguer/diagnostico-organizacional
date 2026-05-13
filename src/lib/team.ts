import { readJson, writeJson } from './storage';

export type TeamRole = 'admin' | 'colaborador' | 'lectura';

export interface TeamMember {
  id: string;
  email: string;
  nombre: string;
  role: TeamRole;
  status: 'invitado' | 'activo';
  createdAt: string;
}

export interface TaskAssignment {
  taskId: string;
  memberId: string;
  updatedAt: string;
}

export interface ActivityItem {
  id: string;
  actor: string;
  action: string;
  taskId?: string;
  createdAt: string;
}

const TEAM_MEMBERS_KEY = 'diag:team:members';
const ASSIGNMENTS_KEY = 'diag:team:assignments';
const ACTIVITY_KEY = 'diag:team:activity';

export function getTeamMembers() {
  return readJson<TeamMember[]>(TEAM_MEMBERS_KEY, []);
}

export function replaceTeamMembers(members: TeamMember[]) {
  writeJson(TEAM_MEMBERS_KEY, members);
}

export function inviteTeamMember(email: string, role: TeamRole, nombre?: string) {
  const members = getTeamMembers();
  const existing = members.find((member) => member.email.toLowerCase() === email.toLowerCase());
  if (existing) return existing;

  const member: TeamMember = {
    id: `member-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    email,
    nombre: nombre?.trim() || email.split('@')[0],
    role,
    status: 'invitado',
    createdAt: new Date().toISOString(),
  };
  writeJson(TEAM_MEMBERS_KEY, [member, ...members]);
  addActivity('Sistema', `invito a ${member.email} como ${role}`);
  return member;
}

export function updateTeamMemberRole(memberId: string, role: TeamRole) {
  writeJson(TEAM_MEMBERS_KEY, getTeamMembers().map((member) => (
    member.id === memberId ? { ...member, role } : member
  )));
  const member = getTeamMembers().find((item) => item.id === memberId);
  if (member) addActivity('Sistema', `actualizo el rol de ${member.nombre} a ${role}`);
}

export function getTaskAssignments() {
  return readJson<TaskAssignment[]>(ASSIGNMENTS_KEY, []);
}

export function replaceTaskAssignments(assignments: TaskAssignment[]) {
  writeJson(ASSIGNMENTS_KEY, assignments);
}

export function assignTask(taskId: string, memberId: string) {
  const assignments = getTaskAssignments().filter((item) => item.taskId !== taskId);
  const assignment: TaskAssignment = { taskId, memberId, updatedAt: new Date().toISOString() };
  writeJson(ASSIGNMENTS_KEY, [assignment, ...assignments]);
  const member = getTeamMembers().find((item) => item.id === memberId);
  addActivity('Sistema', `asigno una tarea a ${member?.nombre ?? 'un colaborador'}`, taskId);
  return assignment;
}

export function getAssignedMember(taskId: string) {
  const assignment = getTaskAssignments().find((item) => item.taskId === taskId);
  if (!assignment) return null;
  return getTeamMembers().find((member) => member.id === assignment.memberId) ?? null;
}

export function getActivity() {
  return readJson<ActivityItem[]>(ACTIVITY_KEY, []);
}

export function replaceActivity(activity: ActivityItem[]) {
  writeJson(ACTIVITY_KEY, activity);
}

export function addActivity(actor: string, action: string, taskId?: string) {
  const activity: ActivityItem = {
    id: `activity-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    actor,
    action,
    taskId,
    createdAt: new Date().toISOString(),
  };
  writeJson(ACTIVITY_KEY, [activity, ...getActivity()].slice(0, 80));
  return activity;
}
