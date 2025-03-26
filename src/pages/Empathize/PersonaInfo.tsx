import { useEffect } from 'react';
import ActivityPageLayout from '../../components/layout/ActivityPageLayout';
import { useTaskProgress } from '../../context/TaskProgressContext';
import { usePersonaStore } from '../../store/personaStore';
import { motion } from 'framer-motion';
import ProgressBar from '../../components/ProgressBar';

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
          <motion.img
            src={persona?.cardImageUrl}
            alt="persona-card"
            className="w-60"
            initial={{ opacity: 0, y: 50, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 10 }}
            whileHover={{ scale: 1.05, rotate: 2 }}
          />
        }
      ></ActivityPageLayout>
      <ProgressBar
        phase="empathize"
        moveProgressBar={false}
        currentStep={1}
        totalSteps={4}
      />
    </>
  );
}

export default PersonaInfo;
