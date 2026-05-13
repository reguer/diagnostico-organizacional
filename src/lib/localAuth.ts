import { readJson, writeJson } from './storage';

export interface LocalUser {
  id: string;
  username: string;
  passwordHash: string;
  createdAt: string;
}

const LOCAL_USERS_KEY = 'diag:auth:users';
const LOCAL_SESSION_KEY = 'diag:auth:session';

function getLocalUsers() {
  return readJson<LocalUser[]>(LOCAL_USERS_KEY, []);
}

async function hashPassword(password: string) {
  const data = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export function getLocalSession() {
  const session = readJson<{ userId: string } | null>(LOCAL_SESSION_KEY, null);
  if (!session) return null;
  return getLocalUsers().find((user) => user.id === session.userId) ?? null;
}

export async function createLocalUser(username: string, password: string) {
  const cleanUsername = username.trim().toLowerCase();
  if (!cleanUsername || password.length < 6) {
    throw new Error('Usa un usuario valido y una contrasena de al menos 6 caracteres');
  }

  const users = getLocalUsers();
  if (users.some((user) => user.username === cleanUsername)) {
    throw new Error('Ese usuario ya existe en este navegador');
  }

  const user: LocalUser = {
    id: `local-user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    username: cleanUsername,
    passwordHash: await hashPassword(password),
    createdAt: new Date().toISOString(),
  };
  writeJson(LOCAL_USERS_KEY, [user, ...users]);
  writeJson(LOCAL_SESSION_KEY, { userId: user.id });
  return user;
}

export async function signInLocalUser(username: string, password: string) {
  const cleanUsername = username.trim().toLowerCase();
  const passwordHash = await hashPassword(password);
  const user = getLocalUsers().find((item) => item.username === cleanUsername && item.passwordHash === passwordHash);
  if (!user) throw new Error('Usuario o contrasena incorrectos');
  writeJson(LOCAL_SESSION_KEY, { userId: user.id });
  return user;
}

export function signOutLocalUser() {
  writeJson(LOCAL_SESSION_KEY, null);
}
