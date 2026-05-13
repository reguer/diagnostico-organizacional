import { useState } from 'react';
import type { VersionDiagnostico } from '../../lib/config';
import {
  createLocalUser,
  getLocalSession,
  signInLocalUser,
  signOutLocalUser,
  type LocalUser,
} from '../../lib/localAuth';

interface BusinessTypeSelectorProps {
  onSelect: (version: VersionDiagnostico) => void;
  onAbrirPlataforma: () => void;
}

export function BusinessTypeSelector({ onSelect, onAbrirPlataforma }: BusinessTypeSelectorProps) {
  const [usuario, setUsuario] = useState<LocalUser | null>(() => getLocalSession());
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  async function handleAuth(mode: 'login' | 'create') {
    setAuthError('');
    setAuthLoading(true);
    try {
      const nextUser = mode === 'create'
        ? await createLocalUser(username, password)
        : await signInLocalUser(username, password);
      setUsuario(nextUser);
      onAbrirPlataforma();
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'No se pudo iniciar sesion');
    } finally {
      setAuthLoading(false);
    }
  }

  function handleCerrarSesion() {
    signOutLocalUser();
    setUsuario(null);
    setUsername('');
    setPassword('');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🏢</div>
          <h1 className="text-2xl font-black text-slate-800 mb-2">Diagnóstico Organizacional</h1>
          <p className="text-slate-500 text-sm">Identifica fortalezas, detecta fugas y construye un plan de acción en 15 minutos</p>
        </div>

        <h2 className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">
          ¿Qué tipo de negocio tienes?
        </h2>

        <div className="space-y-4">
          {/* V1 */}
          <button
            onClick={() => onSelect('general')}
            className="w-full text-left bg-white rounded-2xl border-2 border-slate-100 hover:border-indigo-300 hover:shadow-md p-6 transition-all group"
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">🏬</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-slate-800 text-base">Negocio General</h3>
                  <span className="text-xs text-indigo-400 font-semibold group-hover:text-indigo-600 transition-colors">Elegir →</span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Para cualquier PYME: tiendas, servicios profesionales, comercio, consultoras, talleres y más.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {['Comercio', 'Servicios', 'Consultoría', 'Taller', 'Clínica', 'Otros'].map((tag) => (
                    <span key={tag} className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </button>

          {/* V2 */}
          <button
            onClick={() => onSelect('construccion')}
            className="w-full text-left bg-white rounded-2xl border-2 border-slate-100 hover:border-indigo-300 hover:shadow-md p-6 transition-all group"
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">🏗️</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-slate-800 text-base">Construcción y Servicios</h3>
                  <span className="text-xs text-indigo-400 font-semibold group-hover:text-indigo-600 transition-colors">Elegir →</span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Para empresas de construcción, paisajismo, riego, señalética, mantenimiento y proyectos ejecutivos.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {['Paisajismo', 'Riego', 'Señalética', 'Construcción', 'Mantenimiento', 'Proyectos'].map((tag) => (
                    <span key={tag} className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </button>
        </div>

        <div className="mt-5 rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-slate-800">Entrar a seguimiento</h2>
              <p className="text-xs text-slate-500">
                Crea un usuario local o entra para ver tu plataforma de avance.
              </p>
            </div>
            <button
              type="button"
              onClick={onAbrirPlataforma}
              className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100"
            >
              Abrir
            </button>
          </div>

          {usuario ? (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-600">
                Sesion activa: <strong className="text-slate-800">{usuario.username}</strong>
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onAbrirPlataforma}
                  className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
                >
                  Ir a plataforma
                </button>
                <button
                  type="button"
                  onClick={handleCerrarSesion}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Salir
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid gap-2 sm:grid-cols-2">
                <label className="text-xs font-semibold text-slate-500">
                  Usuario
                  <input
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-indigo-300"
                    placeholder="tu_usuario"
                  />
                </label>
                <label className="text-xs font-semibold text-slate-500">
                  Contrasena
                  <input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-indigo-300"
                    placeholder="minimo 6 caracteres"
                    type="password"
                  />
                </label>
              </div>
              {authError && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
                  {authError}
                </p>
              )}
              <div className="grid gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => handleAuth('login')}
                  disabled={authLoading}
                  className="rounded-lg bg-slate-800 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-900 disabled:opacity-50"
                >
                  Entrar
                </button>
                <button
                  type="button"
                  onClick={() => handleAuth('create')}
                  disabled={authLoading}
                  className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 disabled:opacity-50"
                >
                  Crear usuario
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-slate-400 mt-8">
          Tus respuestas son privadas y no se almacenan en ningún servidor
        </p>
      </div>
    </div>
  );
}
