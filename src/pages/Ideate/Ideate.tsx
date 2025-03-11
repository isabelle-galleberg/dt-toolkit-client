import { useTaskProgress } from '../../context/TaskProgressContext';
import { useEffect } from 'react';
import InfoPageLayout from '../../components/layout/InfoPageLayout';

function Ideate() {
  const { markTaskComplete, isTaskComplete } = useTaskProgress();

  useEffect(() => {
    if (!isTaskComplete('/ideate')) {
      markTaskComplete('/ideate');
    }
  }, [isTaskComplete, markTaskComplete]);

  return (
    <InfoPageLayout
      header={'IDEATE'}
      text={
        "Now that we've defined the problem, we'll move to the ideate phase, where you will brainstorm solutions to help Grandma Lily avoid phishing scams in the future! For this scope, we need to create a quiz to train Grandma Lily"
      }
      headerColor={'text-ideate'}
    />
  );
}

export default Ideate;
