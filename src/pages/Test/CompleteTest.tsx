import { useEffect } from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion
import InfoPageLayout from '../../components/layout/InfoPageLayout';
import { useTaskProgress } from '../../context/TaskProgressContext';
import ProgressBar from '../../components/ProgressBar';

const animationProps = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 1 },
};

const COMPLETE_PATH = '/test/complete';

function CompleteTest() {
  const { markTaskComplete, isTaskComplete } = useTaskProgress();

  useEffect(() => {
    if (!isTaskComplete(COMPLETE_PATH)) {
      markTaskComplete(COMPLETE_PATH);
    }
  }, [isTaskComplete, markTaskComplete]);

  return (
    <>
      <InfoPageLayout
        header={
          <motion.h1 {...animationProps} className="text-test">
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
        headerColor={'text-test'}
      />
      <ProgressBar phase="test" currentStep={3} totalSteps={2} />
    </>
  );
}

export default CompleteTest;
