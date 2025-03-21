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
        header="Meet Your Persona"
        text={
          <>
            This character is just like you — someone who explores the internet
            every day! <br />
            What kind of online adventures and challenges do they face? 🤔
            <br />
            Time to step into the shoes of {persona?.alias} and find out! 🚀
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
