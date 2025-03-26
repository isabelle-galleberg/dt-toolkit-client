import { useEffect } from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion
import InfoPageLayout from '../../components/layout/InfoPageLayout';
import { useTaskProgress } from '../../context/TaskProgressContext';
import ProgressBar from '../../components/ProgressBar';

const COMPLETE_PATH = '/empathize/complete';

function CompleteEmpathize() {
  const { markTaskComplete, isTaskComplete } = useTaskProgress();

  useEffect(() => {
    if (!isTaskComplete(COMPLETE_PATH)) {
      markTaskComplete(COMPLETE_PATH);
    }
  }, [isTaskComplete, markTaskComplete]);

  const animationProps = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 1 },
  };

  return (
    <>
      <InfoPageLayout
        header={
          <motion.h1 {...animationProps} className="text-empathize">
            STAGE COMPLETE! 🏆
          </motion.h1>
        }
        text={
          <motion.p {...animationProps}>
            Great job! 🎉 You have finished this step in the Design Thinking
            process. Got some extra time? Go back and refine your work for an
            even better result! ✏️
          </motion.p>
        }
        headerColor={'text-empathize'}
      />
      <ProgressBar phase="empathize" currentStep={6} totalSteps={6} />
    </>
  );
}

export default CompleteEmpathize;
