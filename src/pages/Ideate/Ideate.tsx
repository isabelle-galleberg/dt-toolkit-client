import { useTaskProgress } from '../../context/TaskProgressContext';
import { useEffect } from 'react';
import InfoPageLayout from '../../components/layout/InfoPageLayout';
import { usePersonaStore } from '../../store/personaStore';
import ProgressBar from '../../components/ProgressBar';

const IDEATE_PATH = '/ideate';

function Ideate() {
  const { markTaskComplete, isTaskComplete } = useTaskProgress();
  const { persona } = usePersonaStore();
  const alias = persona?.alias;

  useEffect(() => {
    if (!isTaskComplete(IDEATE_PATH)) {
      markTaskComplete(IDEATE_PATH);
    }
  }, [isTaskComplete, markTaskComplete]);

  return (
    <>
      <InfoPageLayout
        header={'IDEATE'}
        text={`
        Now that we've defined the problem, it’s time to get creative! 🧠✨
        Let’s make a checklist to help ${alias} spot phishing emails, so they never fall for a scam again! 📝
        `}
        headerColor={'text-ideate'}
      />
      <ProgressBar phase={'ideate'} currentStep={0} totalSteps={2} />
    </>
  );
}

export default Ideate;
