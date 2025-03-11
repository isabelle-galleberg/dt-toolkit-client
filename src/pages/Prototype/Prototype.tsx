import { useEffect } from 'react';
import { useTaskProgress } from '../../context/TaskProgressContext';
import InfoPageLayout from '../../components/layout/InfoPageLayout';

function Prototype() {
  const { markTaskComplete, isTaskComplete } = useTaskProgress();

  // TODO: update the task complete mark
  useEffect(() => {
    if (!isTaskComplete('/prototype')) {
      markTaskComplete('/prototype');
    }
  }, [isTaskComplete, markTaskComplete]);

  return (
    <InfoPageLayout
      header={'PROTOTYPE'}
      text={
        "Now it's time to bring your idea to life with GearsBot! You can design a checklist to help people spot phishing scams or create a quiz to teach them how to stay safe."
      }
      headerColor={'text-prototype'}
    />
  );
}

export default Prototype;
