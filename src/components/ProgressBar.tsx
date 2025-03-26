import { motion } from 'framer-motion';

interface ProgressBarProps {
  phase: string;
  currentStep: number;
  totalSteps: number;
  moveProgressBar?: boolean;
}

function ProgressBar({
  phase,
  currentStep,
  totalSteps,
  moveProgressBar = true,
}: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;
  const previousProgress = ((currentStep - 1) / totalSteps) * 100;

  return (
    <div className="fixed bottom-20 left-0 w-full z-5 space-y-1">
      <motion.p
        key={currentStep}
        className={`text-[12px] text-center font-semibold text-${phase}`}
        initial={moveProgressBar ? { opacity: 0 } : { opacity: 1 }}
        animate={{
          opacity: 1,
        }}
        transition={{
          opacity: { duration: 0.3, ease: 'easeIn' },
        }}
      >
        {currentStep === 0
          ? 'Getting started!'
          : currentStep >= totalSteps
            ? 'All activities completed!'
            : `${currentStep} out of ${totalSteps - 1} activities! Keep going!`}
      </motion.p>

      <div className="bg-base-100 h-2 overflow-hidden rounded-full">
        {!moveProgressBar ? (
          <motion.div
            className={`h-2 bg-${phase}`}
            style={{ width: `${progress}%` }}
          />
        ) : (
          currentStep != 0 && (
            <motion.div
              className={`h-2 bg-${phase}`}
              initial={{ width: `${previousProgress}%` }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeIn' }}
            />
          )
        )}
      </div>
    </div>
  );
}

export default ProgressBar;
