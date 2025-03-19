import { useTaskProgress } from '../../context/TaskProgressContext';
import { useEffect } from 'react';
import InfoPageLayout from '../../components/layout/InfoPageLayout';
import { usePersonaStore } from '../../store/personaStore';

function Ideate() {
  const { markTaskComplete, isTaskComplete } = useTaskProgress();
  const { persona } = usePersonaStore();
  const alias = persona?.alias;

  useEffect(() => {
    if (!isTaskComplete('/ideate')) {
      markTaskComplete('/ideate');
    }
  }, [isTaskComplete, markTaskComplete]);

  return (
    <InfoPageLayout
      header={'IDEATE'}
      text={`Now that we've defined the problem, we'll move to the ideate phase, where you will brainstorm solutions to help ${alias} avoid phishing scams in the future! For this scope, we need to create a quiz to train ${alias}.`}
      headerColor={'text-ideate'}
    />
  );
}

export default Ideate;
