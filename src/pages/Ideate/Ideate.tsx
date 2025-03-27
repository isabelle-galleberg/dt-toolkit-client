import { useTaskProgress } from '../../context/TaskProgressContext';
import { useEffect } from 'react';
import InfoPageLayout from '../../components/layout/InfoPageLayout';
import ProgressBar from '../../components/ProgressBar';
import { usePersonaNameStore } from '../../store/personaNameStore';

const IDEATE_PATH = '/ideate';

function Ideate() {
  const { markTaskComplete, isTaskComplete } = useTaskProgress();
  const { name } = usePersonaNameStore();

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
        Let’s make a checklist to help ${name} spot phishing emails, so they never fall for a scam again! 📝
        `}
        headerColor={'text-ideate'}
      />
      <ProgressBar phase={'ideate'} currentStep={0} totalSteps={2} />
    </>
  );
}

export default Ideate;
