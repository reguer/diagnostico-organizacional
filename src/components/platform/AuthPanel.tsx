import { useState } from 'react';
import {
  getBusinessProfile,
  getCurrentUser,
  saveBusinessProfile,
  signInWithEmail,
  signOut,
  signUpWithEmail,
  restoreCloudDataToLocal,
  syncLocalDataToCloud,
  type BusinessProfileInput,
} from '../../lib/cloudStorage';
import { createLocalUser, getLocalSession, signInLocalUser, signOutLocalUser } from '../../lib/localAuth';
import { isSupabaseConfigured } from '../../lib/supabaseClient';

interface AuthPanelProps {
  onChanged: () => void;
}

type AuthMode = 'login' | 'signup';

export function AuthPanel({ onChanged }: AuthPanelProps) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localUser, setLocalUser] = useState(() => getLocalSession());
  const [profile, setProfile] = useState<BusinessProfileInput>({
    negocioNombre: '',
    industria: 'Construccion y servicios',
    pais: 'Mexico',
    empleados: undefined,
  });
  const [status, setStatus] = useState('Modo local');
  const [busy, setBusy] = useState(false);

  async function refreshSession() {
    const user = await getCurrentUser();
    if (!user) {
      setStatus('Modo local');
      return;
    }
    const cloudProfile = await getBusinessProfile(user.id);
    if (cloudProfile) {
      setProfile({
        negocioNombre: cloudProfile.negocio_nombre ?? '',
        industria: cloudProfile.industria ?? '',
        pais: cloudProfile.pais ?? '',
        empleados: cloudProfile.empleados ?? undefined,
      });
    }
    setStatus(`Sesion activa: ${user.email}`);
  }

  async function handleAuth() {
    setBusy(true);
    try {
      const result = mode === 'signup'
        ? await signUpWithEmail(email, password)
        : await signInWithEmail(email, password);
      const userId = result.user?.id ?? result.session?.user.id;
      if (userId) {
        await syncLocalDataToCloud(userId);
        setStatus(`Sincronizado con la nube: ${email}`);
      } else {
        setStatus('Revisa tu correo para confirmar la cuenta');
      }
      onChanged();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'No se pudo iniciar sesion');
    } finally {
      setBusy(false);
    }
  }

  async function handleRestore() {
    setBusy(true);
    try {
      const user = await getCurrentUser();
      if (!user) throw new Error('Inicia sesion para restaurar datos');
      const result = await restoreCloudDataToLocal(user.id);
      setStatus(`Restaurado: ${result.diagnosticos} diagnosticos, ${result.tareas} tareas, ${result.metas} metas`);
      onChanged();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'No se pudo restaurar desde la nube');
    } finally {
      setBusy(false);
    }
  }

  async function handleProfileSave() {
    setBusy(true);
    try {
      const user = await getCurrentUser();
      if (!user) throw new Error('Inicia sesion para guardar el perfil');
      await saveBusinessProfile(user.id, profile);
      setStatus('Perfil de negocio guardado');
      onChanged();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'No se pudo guardar el perfil');
    } finally {
      setBusy(false);
    }
  }

  async function handleSignOut() {
    await signOut();
    await refreshSession();
    onChanged();
  }

  if (!isSupabaseConfigured) {
    return (
      <section className="rounded-2xl border border-amber-100 bg-amber-50 p-4 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-amber-900">Cuenta local de seguimiento</p>
            <p className="mt-1 text-xs leading-relaxed text-amber-800">
              Supabase aun no esta configurado. Puedes crear usuario y contrasena para entrar en este navegador; los datos se guardan en localStorage.
            </p>
            {localUser && <p className="mt-2 text-xs font-bold text-amber-900">Sesion local: {localUser.username}</p>}
          </div>
          {localUser && (
            <button
              type="button"
              onClick={() => {
                signOutLocalUser();
                setLocalUser(null);
                onChanged();
              }}
              className="rounded-lg border border-amber-200 bg-white/70 px-3 py-1.5 text-xs font-semibold text-amber-800"
            >
              Salir
            </button>
          )}
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto]">
          <div className="grid gap-2 sm:grid-cols-2">
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="usuario"
              className="rounded-xl border border-amber-200 bg-white px-3 py-2 text-sm outline-none focus:border-amber-400"
            />
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="contrasena"
              className="rounded-xl border border-amber-200 bg-white px-3 py-2 text-sm outline-none focus:border-amber-400"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={async () => {
                setBusy(true);
                try {
                  const user = await signInLocalUser(email, password);
                  setLocalUser(user);
                  setStatus(`Sesion local activa: ${user.username}`);
                  onChanged();
                } catch (error) {
                  setStatus(error instanceof Error ? error.message : 'No se pudo entrar');
                } finally {
                  setBusy(false);
                }
              }}
              className="rounded-xl bg-amber-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              Entrar
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={async () => {
                setBusy(true);
                try {
                  const user = await createLocalUser(email, password);
                  setLocalUser(user);
                  setStatus(`Usuario local creado: ${user.username}`);
                  onChanged();
                } catch (error) {
                  setStatus(error instanceof Error ? error.message : 'No se pudo crear usuario');
                } finally {
                  setBusy(false);
                }
              }}
              className="rounded-xl border border-amber-200 bg-white px-4 py-2 text-sm font-semibold text-amber-800 disabled:opacity-60"
            >
              Crear
            </button>
          </div>
        </div>
        <p className="mt-3 text-xs text-amber-800">{status}</p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-slate-800">Cuenta y sincronizacion</p>
          <p className="mt-1 text-xs text-slate-400">{status}</p>
        </div>
        <button type="button" onClick={handleSignOut} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-500">
          Salir
        </button>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <div className="grid gap-2">
          <div className="flex gap-2">
            <button type="button" onClick={() => setMode('login')} className={`rounded-lg px-3 py-1.5 text-xs font-bold ${mode === 'login' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'}`}>Entrar</button>
            <button type="button" onClick={() => setMode('signup')} className={`rounded-lg px-3 py-1.5 text-xs font-bold ${mode === 'signup' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'}`}>Crear cuenta</button>
          </div>
          <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="email@empresa.com" className="rounded-xl border border-slate-200 px-3 py-2 text-sm" />
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Contrasena" className="rounded-xl border border-slate-200 px-3 py-2 text-sm" />
          <button type="button" disabled={busy} onClick={handleAuth} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
            {busy ? 'Procesando...' : mode === 'login' ? 'Entrar y sincronizar' : 'Crear y sincronizar'}
          </button>
          <button type="button" disabled={busy} onClick={handleRestore} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 disabled:opacity-60">
            Restaurar nube a este navegador
          </button>
        </div>

        <div className="grid gap-2">
          <input value={profile.negocioNombre} onChange={(event) => setProfile((prev) => ({ ...prev, negocioNombre: event.target.value }))} placeholder="Nombre del negocio" className="rounded-xl border border-slate-200 px-3 py-2 text-sm" />
          <input value={profile.industria} onChange={(event) => setProfile((prev) => ({ ...prev, industria: event.target.value }))} placeholder="Industria" className="rounded-xl border border-slate-200 px-3 py-2 text-sm" />
          <div className="grid grid-cols-2 gap-2">
            <input value={profile.pais} onChange={(event) => setProfile((prev) => ({ ...prev, pais: event.target.value }))} placeholder="Pais" className="rounded-xl border border-slate-200 px-3 py-2 text-sm" />
            <input type="number" value={profile.empleados ?? ''} onChange={(event) => setProfile((prev) => ({ ...prev, empleados: event.target.value ? Number(event.target.value) : undefined }))} placeholder="Empleados" className="rounded-xl border border-slate-200 px-3 py-2 text-sm" />
          </div>
          <button type="button" disabled={busy} onClick={handleProfileSave} className="rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 disabled:opacity-60">
            Guardar perfil
          </button>
        </div>
      </div>
    </section>
  );
}
