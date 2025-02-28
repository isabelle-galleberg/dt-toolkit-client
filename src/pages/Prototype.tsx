import { useEffect } from 'react';
import { useTaskProgress } from '../context/TaskProgressContext';

function Prototype() {
  const { markTaskComplete, isTaskComplete } = useTaskProgress();

  // TODO: update the task complete mark
  useEffect(() => {
    if (!isTaskComplete('/prototype')) {
      markTaskComplete('/prototype');
    }
  }, [isTaskComplete, markTaskComplete]);

  return <div>Prototype</div>;
}

export default Prototype;
