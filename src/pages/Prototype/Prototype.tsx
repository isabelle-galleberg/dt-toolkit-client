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
        "Now it's time to bring your checklist to life with GearsBot! 🤖✨  You'll turn your checklist into a tool that helps people spot phishing scams and stay safe online.  Let's get started!"
      }
      headerColor={'text-prototype'}
    />
  );
}

export default Prototype;
