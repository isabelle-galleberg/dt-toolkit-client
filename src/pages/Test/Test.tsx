import { useEffect } from 'react';
import { useTaskProgress } from '../../context/TaskProgressContext';
import InfoPageLayout from '../../components/layout/InfoPageLayout';

function Test() {
  const { markTaskComplete, isTaskComplete } = useTaskProgress();

  useEffect(() => {
    if (!isTaskComplete('/test')) {
      markTaskComplete('/test');
    }
  }, [isTaskComplete, markTaskComplete]);

  return (
    <InfoPageLayout
      header={'TEST'}
      text={
        "Now it's time to test your prototype to others! Share it with your classmates, get their feedback, and see how they react. Does it help them understand how to stay safe online?"
      }
      headerColor={'text-test'}
    />
  );
}

export default Test;
