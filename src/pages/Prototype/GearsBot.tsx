import { useEffect } from 'react';
import { useTaskProgress } from '../../context/TaskProgressContext';
import ActivityPageLayout from '../../components/layout/ActivityPageLayout';

function GearsBot() {
  const { markTaskComplete, isTaskComplete } = useTaskProgress();

  // TODO: update the task complete mark
  useEffect(() => {
    if (!isTaskComplete('/prototype/gearsbot')) {
      markTaskComplete('/prototype/gearsbot');
    }
  }, [isTaskComplete, markTaskComplete]);

  return (
    <ActivityPageLayout
      header={'GearsBot'}
      phase="Prototype"
      phaseColor="text-prototype"
      text={
        <>
          Click to start using GearsBot and build your phishing awareness tool!
        </>
      }
      activity={
        <button
          className="btn bg-prototype text-test px-6 py-2 hover:bg-prototype hover:text-test hover:border-test"
          onClick={() =>
            window.open('https://gears.aposteriori.com.sg', '_blank')
          }
        >
          GO TO GEARSBOT!
        </button>
      }
    />
  );
}

export default GearsBot;
