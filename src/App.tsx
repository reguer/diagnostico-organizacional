import { useState } from 'react';
import { AREAS } from './data/diagnostico';
import { filtrarPreguntas } from './lib/filterQuestions';
import { calcularResultados, type ResultadosDiagnostico } from './lib/calculator';
import type { ConfigDiagnostico, VersionDiagnostico, ActividadConstruccion } from './lib/config';
import { CONFIG_DEFAULT } from './lib/config';
import { createDiagnosticId, saveDiagnostico, type DiagnosticoGuardado } from './lib/storage';
import { BusinessTypeSelector } from './components/onboarding/BusinessTypeSelector';
import { BusinessVariableSelector } from './components/onboarding/BusinessVariableSelector';
import { DiagnosticDepthSelector } from './components/onboarding/DiagnosticDepthSelector';
import { WizardLayout } from './components/wizard/WizardLayout';
import { AreaStep } from './components/wizard/AreaStep';
import { Dashboard } from './components/dashboard/Dashboard';
import { PlatformPage } from './components/platform/PlatformPage';

type Vista = 'onboarding_tipo' | 'onboarding_variable' | 'onboarding_nivel' | 'wizard' | 'dashboard' | 'plataforma';

function getInitialVista(): Vista {
  return window.location.hash === '#/plataforma' ? 'plataforma' : 'onboarding_tipo';
}

function App() {
  const [vista, setVista] = useState<Vista>(getInitialVista);
  const [config, setConfig] = useState<ConfigDiagnostico>(CONFIG_DEFAULT);
  const [areaActualIdx, setAreaActualIdx] = useState(0);
  const [respuestas, setRespuestas] = useState<Record<string, number>>({});
  const [resultado, setResultado] = useState<ResultadosDiagnostico | null>(null);
  const [diagnosticoActual, setDiagnosticoActual] = useState<DiagnosticoGuardado | null>(null);

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

  function handleIrAArea(idx: number) {
    if (idx >= 0 && idx < areasActivas.length) {
      setAreaActualIdx(idx);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function handleFinalizar() {
    const res = calcularResultados(respuestas, areasActivas);
    const diagnostico = saveDiagnostico({
      id: createDiagnosticId(),
      fecha: new Date().toISOString(),
      config,
      respuestas,
      resultado: res,
    });
    setResultado(res);
    setDiagnosticoActual(diagnostico);
    setVista('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleReiniciar() {
    window.location.hash = '';
    setVista('onboarding_tipo');
    setAreaActualIdx(0);
    setRespuestas({});
    setResultado(null);
    setDiagnosticoActual(null);
    setConfig(CONFIG_DEFAULT);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleAbrirPlataforma() {
    window.location.hash = '#/plataforma';
    setVista('plataforma');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleAbrirDiagnostico() {
    window.location.hash = '';
    handleReiniciar();
  }

  if (vista === 'plataforma') {
    return <PlatformPage onGoDiagnostic={handleAbrirDiagnostico} />;
  }

  if (vista === 'onboarding_tipo') {
    return <BusinessTypeSelector onSelect={handleSeleccionarTipo} onAbrirPlataforma={handleAbrirPlataforma} />;
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

  if (vista === 'dashboard' && resultado && diagnosticoActual) {
    return (
      <Dashboard
        resultado={resultado}
        config={config}
        onReiniciar={handleReiniciar}
        onAbrirPlataforma={handleAbrirPlataforma}
      />
    );
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
      onIrAArea={handleIrAArea}
      onFinalizar={handleFinalizar}
      onAbrirPlataforma={handleAbrirPlataforma}
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
