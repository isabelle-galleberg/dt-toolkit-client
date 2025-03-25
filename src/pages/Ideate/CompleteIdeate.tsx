import { useEffect } from 'react';
import InfoPageLayout from '../../components/layout/InfoPageLayout';
import { useTaskProgress } from '../../context/TaskProgressContext';
import ProgressBar from '../../components/ProgressBar';

const COMPLETE_PATH = '/ideate/complete';

function CompleteIdeate() {
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
        headerColor={'text-ideate'}
      />
      <ProgressBar phase="ideate" currentStep={2} totalSteps={2} />
    </>
  );
}

export default CompleteIdeate;
