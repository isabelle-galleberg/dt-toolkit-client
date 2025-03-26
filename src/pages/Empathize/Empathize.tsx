import { useEffect } from 'react';
import InfoPageLayout from '../../components/layout/InfoPageLayout';
import { useTaskProgress } from '../../context/TaskProgressContext';
import ProgressBar from '../../components/ProgressBar';

const EMPATHIZE_PATH = '/empathize';

function Empathize() {
  const { markTaskComplete, isTaskComplete } = useTaskProgress();

  useEffect(() => {
    if (!isTaskComplete(EMPATHIZE_PATH)) {
      markTaskComplete(EMPATHIZE_PATH);
    }
  }, [isTaskComplete, markTaskComplete]);

  return (
    <>
      <InfoPageLayout
        header={'EMPATHIZE'}
        text={
          "Now, we have learned how phishing scams work, let's explore who might fall for them. By understanding why people fall for phishing, we can learn how to protect ourselves and others 🔒"
        }
        headerColor={'text-empathize'}
      />
      <ProgressBar phase="empathize" currentStep={0} totalSteps={6} />
    </>
  );
}

export default Empathize;
