import { useEffect } from 'react';
import ActivityPageLayout from '../../components/layout/ActivityPageLayout';
import { useTaskProgress } from '../../context/TaskProgressContext';
import { usePersonaStore } from '../../store/personaStore';

function PersonaInfo() {
  const { persona } = usePersonaStore();
  const { markTaskComplete, isTaskComplete } = useTaskProgress();

  useEffect(() => {
    if (!isTaskComplete('/empathize/persona-info')) {
      markTaskComplete('/empathize/persona-info');
    }
  }, [isTaskComplete, markTaskComplete]);

  return (
    <>
      <ActivityPageLayout
        text={
          <>
            This character introduces someone who uses the internet. Imagine
            their life and think about the kinds of challenges they might face
            online.
            <br />
            <br />
            Let's find out more about this {persona?.alias}!
          </>
        }
        activity={
          <div>
            <img
              src={persona?.cardImageUrl}
              alt="persona-card"
              className="w-60"
            />
          </div>
        }
      ></ActivityPageLayout>
    </>
  );
}

export default PersonaInfo;
