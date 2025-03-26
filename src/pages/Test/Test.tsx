import { useEffect } from 'react';
import { useTaskProgress } from '../../context/TaskProgressContext';
import InfoPageLayout from '../../components/layout/InfoPageLayout';
import ProgressBar from '../../components/ProgressBar';

const TEST_PATH = '/test';

function Test() {
  const { markTaskComplete, isTaskComplete } = useTaskProgress();

  useEffect(() => {
    if (!isTaskComplete(TEST_PATH)) {
      markTaskComplete(TEST_PATH);
    }
  }, [isTaskComplete, markTaskComplete]);

  return (
    <>
      <InfoPageLayout
        header={'TEST'}
        text={
          "Now it's time to test your prototype to others! Share it with your classmates, get their feedback, and see how they react. Does it help them stay safe online? 🤝"
        }
        headerColor={'text-test'}
      />
      <ProgressBar phase={'test'} currentStep={0} totalSteps={2} />
    </>
  );
}

export default Test;
