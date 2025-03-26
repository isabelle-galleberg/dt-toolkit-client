import ActivityPageLayout from '../../components/layout/ActivityPageLayout';
import { useTaskProgress } from '../../context/TaskProgressContext';

function TestInfo() {
  const { markTaskComplete, isTaskComplete } = useTaskProgress();

  if (!isTaskComplete('/test/info')) {
    markTaskComplete('/test/info');
  }

  return (
    <ActivityPageLayout
      header={'Test your checklist'}
      text={
        <div>
          Time to test your checklists! Pair up with another group and test each
          other’s prototypes in Gearsbot. Swap computers, explore, and click the
          "Next" button to begin! 🚀
        </div>
      }
      centerContent={true}
    />
  );
}

export default TestInfo;
