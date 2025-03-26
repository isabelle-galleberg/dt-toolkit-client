import { useEffect } from 'react';
import InfoPageLayout from '../../components/layout/InfoPageLayout';
import { useTaskProgress } from '../../context/TaskProgressContext';
import ProgressBar from '../../components/ProgressBar';

const COMPLETE_PATH = '/prototype/complete';

function CompletePrototype() {
  const { markTaskComplete, isTaskComplete } = useTaskProgress();

  useEffect(() => {
    if (!isTaskComplete(COMPLETE_PATH)) {
      markTaskComplete(COMPLETE_PATH);
    }
  }, [isTaskComplete, markTaskComplete]);

  return (
    <>
      <InfoPageLayout
        header={'STAGE COMPLETE! 🏆'}
        text={
          'Greate job! 🎉 You have finished this step in the Design Thinking process. Got some extra time? Go back and refine your work for an even better result! ✏️'
        }
        headerColor={'text-prototype'}
      />
      <ProgressBar phase="prototype" currentStep={2} totalSteps={2} />
    </>
  );
}

export default CompletePrototype;
