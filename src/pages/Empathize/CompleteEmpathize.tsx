import { useEffect } from 'react';
import InfoPageLayout from '../../components/layout/InfoPageLayout';
import { useTaskProgress } from '../../context/TaskProgressContext';
import ProgressBar from '../../components/ProgressBar';

const COMPLETE_PATH = '/empathize/complete';

function CompleteEmpathize() {
  const { markTaskComplete, isTaskComplete } = useTaskProgress();

  useEffect(() => {
    if (!isTaskComplete(COMPLETE_PATH)) {
      markTaskComplete(COMPLETE_PATH);
    }
  }, [isTaskComplete, markTaskComplete]);

  return (
    <>
      <InfoPageLayout
        header={'CONGRATULATION! 🏆'}
        text={
          'Got some extra time? Go back and refine your work for an even better result!'
        }
        headerColor={'text-empathize'}
      />
      <ProgressBar phase="empathize" currentStep={6} totalSteps={6} />
    </>
  );
}

export default CompleteEmpathize;
