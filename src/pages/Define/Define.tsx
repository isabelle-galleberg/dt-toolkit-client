import { useTaskProgress } from '../../context/TaskProgressContext';
import InfoPage from '../../components/layout/InfoPageLayout';
import { useEffect } from 'react';
import ProgressBar from '../../components/ProgressBar';
import { usePersonaNameStore } from '../../store/personaNameStore';

const DEFINE_PATH = '/define';

function DefinePage() {
  const { markTaskComplete, isTaskComplete } = useTaskProgress();
  const { name } = usePersonaNameStore();

  useEffect(() => {
    if (!isTaskComplete(DEFINE_PATH)) {
      markTaskComplete(DEFINE_PATH);
    }
  }, [isTaskComplete, markTaskComplete]);

  return (
    <>
      <InfoPage
        header={'DEFINE'}
        text={`
          We've seen how ${name} was fooled by a phishing scam, but why did it happen? 🤔 In this phase, we're going to break down the scam step by step, look for warning signs and define the problem. The better we understand these tricks, the better we can protect ourselves and others! 💪
        `}
        headerColor={'text-define'}
      ></InfoPage>
      <ProgressBar phase={'define'} currentStep={0} totalSteps={4} />
    </>
  );
}

export default DefinePage;
