import type { VersionDiagnostico } from '../../lib/config';

interface BusinessTypeSelectorProps {
  onSelect: (version: VersionDiagnostico) => void;
}

export function BusinessTypeSelector({ onSelect }: BusinessTypeSelectorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full">
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

        <p className="text-center text-xs text-slate-400 mt-8">
          Tus respuestas son privadas y no se almacenan en ningún servidor
        </p>
      </div>
    </div>
  );
}
