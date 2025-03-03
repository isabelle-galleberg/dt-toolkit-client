import { useEffect } from 'react';
import ActivityPageLayout from '../../components/layout/ActivityPageLayout';
import { useTaskProgress } from '../../context/TaskProgressContext';

function StoryboardInfo() {
  const { markTaskComplete, isTaskComplete } = useTaskProgress();

  // enable next button
  useEffect(() => {
    if (!isTaskComplete('/empathize/storyboard-info')) {
      markTaskComplete('/empathize/storyboard-info');
    }
  }, [isTaskComplete, markTaskComplete]);

  return (
    <>
      <ActivityPageLayout
        header="Ohh no ..!"
        text={
          <>
            Grandma received a scary email!
            <br />
            She typed in her username and password… but WAIT! The next day, she
            checks her bank app and sees that all her money is gone! Someone
            stole it!
            <br />
            <br />
            🔍 What went wrong? Let's figure it out!
          </>
        }
        centerContent={true}
      ></ActivityPageLayout>
    </>
  );
}

export default StoryboardInfo;
