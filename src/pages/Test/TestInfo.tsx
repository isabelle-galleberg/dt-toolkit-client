import { useEffect } from 'react';
import ActivityPageLayout from '../../components/layout/ActivityPageLayout';
import ProgressBar from '../../components/ProgressBar';
import { useTaskProgress } from '../../context/TaskProgressContext';

function TestInfo() {
  const { markTaskComplete, isTaskComplete } = useTaskProgress();

  useEffect(() => {
    if (!isTaskComplete('/test/info')) {
      markTaskComplete('/test/info');
    }
  }, [isTaskComplete, markTaskComplete]);

  return (
    <>
      <ActivityPageLayout
        header={'Test your checklist'}
        text={
          <div>
            Time to test your checklists! Pair up with another group and test
            each other’s prototypes in Gearsbot. Swap computers, explore, and
            click the "Next" button to begin! 🚀
          </div>
        }
        centerContent={true}
      />
      <ProgressBar
        phase={'test'}
        moveProgressBar={false}
        currentStep={0}
        totalSteps={2}
      />
    </>
  );
}

export default TestInfo;
