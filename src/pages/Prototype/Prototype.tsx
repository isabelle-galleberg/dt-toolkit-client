import { useEffect } from 'react';
import { useTaskProgress } from '../../context/TaskProgressContext';
import InfoPageLayout from '../../components/layout/InfoPageLayout';
import ProgressBar from '../../components/ProgressBar';

const PROTOTYPE_PATH = '/prototype';

function Prototype() {
  const { markTaskComplete, isTaskComplete } = useTaskProgress();

  useEffect(() => {
    if (!isTaskComplete(PROTOTYPE_PATH)) {
      markTaskComplete(PROTOTYPE_PATH);
    }
  }, [isTaskComplete, markTaskComplete]);

  return (
    <>
      <InfoPageLayout
        header={'PROTOTYPE'}
        text={
          "Now it's time to bring your checklist to life with GearsBot! 🤖✨  You'll turn your checklist into a tool that helps people spot phishing scams and stay safe online.  Let's get started!"
        }
        headerColor={'text-prototype'}
      />
      <ProgressBar phase={'prototype'} currentStep={0} totalSteps={2} />
    </>
  );
}

export default Prototype;
