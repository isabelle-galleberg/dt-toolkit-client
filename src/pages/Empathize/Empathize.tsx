import { useEffect } from 'react';
import InfoPageLayout from '../../components/layout/InfoPageLayout';
import { useTaskProgress } from '../../context/TaskProgressContext';

function Empathize() {
  const { markTaskComplete, isTaskComplete } = useTaskProgress();

  useEffect(() => {
    if (!isTaskComplete('/empathize')) {
      markTaskComplete('/empathize');
    }
  }, [isTaskComplete, markTaskComplete]);

  return (
    <InfoPageLayout
      header={'EMPATHIZE'}
      text={
        "Now, we have learned how phishing scams work, let's explore who might fall for them. By understanding why people fall for phishing, we can learn how to protect ourselves and others."
      }
      headerColor={'text-empathize'}
    />
  );
}

export default Empathize;
