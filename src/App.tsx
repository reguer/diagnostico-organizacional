import { useState } from 'react';
import { AREAS } from './data/diagnostico';
import { calcularResultados, type ResultadosDiagnostico } from './lib/calculator';
import { WizardLayout } from './components/wizard/WizardLayout';
import { AreaStep } from './components/wizard/AreaStep';
import { Dashboard } from './components/dashboard/Dashboard';

type Vista = 'wizard' | 'dashboard';

function App() {
  const [vista, setVista] = useState<Vista>('wizard');
  const [areaActualIdx, setAreaActualIdx] = useState(0);
  const [respuestas, setRespuestas] = useState<Record<string, number>>({});
  const [resultado, setResultado] = useState<ResultadosDiagnostico | null>(null);

  function handleRespuesta(preguntaId: string, valor: number) {
    setRespuestas((prev) => ({ ...prev, [preguntaId]: valor }));
  }

  function handleSiguiente() {
    if (areaActualIdx < AREAS.length - 1) {
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
    const res = calcularResultados(respuestas);
    setResultado(res);
    setVista('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleReiniciar() {
    setVista('wizard');
    setAreaActualIdx(0);
    setRespuestas({});
    setResultado(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (vista === 'dashboard' && resultado) {
    return <Dashboard resultado={resultado} onReiniciar={handleReiniciar} />;
  }

  return (
    <WizardLayout
      areas={AREAS}
      areaActualIdx={areaActualIdx}
      respuestas={respuestas}
      onAnterior={handleAnterior}
      onSiguiente={handleSiguiente}
      onFinalizar={handleFinalizar}
    >
      <AreaStep
        area={AREAS[areaActualIdx]}
        respuestas={respuestas}
        onRespuesta={handleRespuesta}
      />
    </WizardLayout>
  );
}

export default App;
