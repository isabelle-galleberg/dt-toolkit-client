import { useEffect } from 'react';
import InfoPageLayout from '../../components/layout/InfoPageLayout';
import { useTaskProgress } from '../../context/TaskProgressContext';
import ProgressBar from '../../components/ProgressBar';

const COMPLETE_TASK_PATH = '/define/complete';

function CompleteDefine() {
  const { markTaskComplete, isTaskComplete } = useTaskProgress();

  useEffect(() => {
    if (!isTaskComplete(COMPLETE_TASK_PATH)) {
      markTaskComplete(COMPLETE_TASK_PATH);
    }
  }, [isTaskComplete, markTaskComplete]);

  return (
    <>
      <InfoPageLayout
        header={'STAGE COMPLETE! 🏆'}
        text={
          'Greate job! 🎉 You have finished this step in the Design Thinking process. Got some extra time? Go back and refine your work for an even better result! ✏️'
        }
        headerColor={'text-define'}
      />
      <ProgressBar phase="define" currentStep={4} totalSteps={4} />
    </>
  );
}

export default CompleteDefine;
