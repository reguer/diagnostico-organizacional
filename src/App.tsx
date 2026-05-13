import { useState } from 'react';
import { AREAS } from './data/diagnostico';
import { filtrarPreguntas } from './lib/filterQuestions';
import { calcularResultados, type ResultadosDiagnostico } from './lib/calculator';
import type { ConfigDiagnostico, VersionDiagnostico, ActividadConstruccion } from './lib/config';
import { CONFIG_DEFAULT } from './lib/config';
import { BusinessTypeSelector } from './components/onboarding/BusinessTypeSelector';
import { BusinessVariableSelector } from './components/onboarding/BusinessVariableSelector';
import { DiagnosticDepthSelector } from './components/onboarding/DiagnosticDepthSelector';
import { WizardLayout } from './components/wizard/WizardLayout';
import { AreaStep } from './components/wizard/AreaStep';
import { Dashboard } from './components/dashboard/Dashboard';

type Vista = 'onboarding_tipo' | 'onboarding_variable' | 'onboarding_nivel' | 'wizard' | 'dashboard';

function App() {
  const [vista, setVista] = useState<Vista>('onboarding_tipo');
  const [config, setConfig] = useState<ConfigDiagnostico>(CONFIG_DEFAULT);
  const [areaActualIdx, setAreaActualIdx] = useState(0);
  const [respuestas, setRespuestas] = useState<Record<string, number>>({});
  const [resultado, setResultado] = useState<ResultadosDiagnostico | null>(null);

  const areasActivas = filtrarPreguntas(AREAS, config);

  function handleSeleccionarTipo(version: VersionDiagnostico) {
    setConfig((prev) => ({ ...prev, version }));
    setVista('onboarding_variable');
  }

  function handleConfirmarVariable(tieneEmpleados: boolean, actividades: ActividadConstruccion[]) {
    setConfig((prev) => ({ ...prev, tieneEmpleados, actividades }));
    setVista('onboarding_nivel');
  }

  function handleSeleccionarNivel(nivel: 'basico' | 'completo') {
    setConfig((prev) => ({ ...prev, nivel }));
    setAreaActualIdx(0);
    setRespuestas({});
    setVista('wizard');
  }

  function handleRespuesta(preguntaId: string, valor: number) {
    setRespuestas((prev) => ({ ...prev, [preguntaId]: valor }));
  }

  function handleSiguiente() {
    if (areaActualIdx < areasActivas.length - 1) {
      setAreaActualIdx((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function handleAnterior() {
    if (areaActualIdx > 0) {
      setAreaActualIdx((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function handleFinalizar() {
    const res = calcularResultados(respuestas, areasActivas);
    setResultado(res);
    setVista('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleReiniciar() {
    setVista('onboarding_tipo');
    setAreaActualIdx(0);
    setRespuestas({});
    setResultado(null);
    setConfig(CONFIG_DEFAULT);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (vista === 'onboarding_tipo') {
    return <BusinessTypeSelector onSelect={handleSeleccionarTipo} />;
  }

  if (vista === 'onboarding_variable') {
    return (
      <BusinessVariableSelector
        version={config.version}
        onConfirm={handleConfirmarVariable}
        onVolver={() => setVista('onboarding_tipo')}
      />
    );
  }

  if (vista === 'onboarding_nivel') {
    return (
      <DiagnosticDepthSelector
        onSelect={handleSeleccionarNivel}
        onVolver={() => setVista('onboarding_variable')}
      />
    );
  }

  if (vista === 'dashboard' && resultado) {
    return <Dashboard resultado={resultado} config={config} onReiniciar={handleReiniciar} />;
  }

  if (areasActivas.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        No hay preguntas para la configuración seleccionada.
      </div>
    );
  }

  return (
    <WizardLayout
      areas={areasActivas}
      areaActualIdx={areaActualIdx}
      respuestas={respuestas}
      onAnterior={handleAnterior}
      onSiguiente={handleSiguiente}
      onFinalizar={handleFinalizar}
    >
      <AreaStep
        area={areasActivas[areaActualIdx]}
        respuestas={respuestas}
        onRespuesta={handleRespuesta}
      />
    </WizardLayout>
  );
}

export default App;
