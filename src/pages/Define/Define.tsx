import { useTaskProgress } from '../../context/TaskProgressContext';
import InfoPage from '../../components/layout/InfoPageLayout';
import { useEffect } from 'react';

function DefinePage() {
  const { markTaskComplete, isTaskComplete } = useTaskProgress();

  useEffect(() => {
    if (!isTaskComplete('/define')) {
      markTaskComplete('/define');
    }
  }, [isTaskComplete, markTaskComplete]);

  return (
    <InfoPage
      header={'DEFINE'}
      text={
        "We've seen how the character was fooled by a phishing scam, but why did it happen? 🤔 In this phase, we're going to break down the scam step by step, look for warning signs and define the problem. The better we understand these tricks, the better we can protect ourselves and others! 💪"
      }
      headerColor={'text-define'}
    ></InfoPage>
  );
}

export default DefinePage;
