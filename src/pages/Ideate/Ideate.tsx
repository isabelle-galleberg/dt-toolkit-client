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
      text={`
        Now that we've defined the problem, it’s time to get creative!
        Let’s make a checklist to help ${alias} spot phishing emails, so he never falls for a scam again!
        `}
      headerColor={'text-ideate'}
    />
  );
}

export default Ideate;
