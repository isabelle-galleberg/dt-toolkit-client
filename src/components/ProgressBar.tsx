import { motion } from 'framer-motion';

interface ProgressBarProps {
  phase: string;
  currentStep: number;
  totalSteps: number;
}

function ProgressBar({ phase, currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;
  const previousProgress = ((currentStep - 1) / totalSteps) * 100;

  return (
    <div className="fixed bottom-20 left-0 w-full z-5 space-y-1">
      <motion.p
        key={currentStep}
        className={`text-[12px] text-center font-semibold text-${phase}`}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
        }}
        transition={{
          opacity: { duration: 0.3, ease: 'easeOut' },
        }}
      >
        {currentStep === 0
          ? 'Getting started!'
          : currentStep >= totalSteps
            ? 'All activities completed!'
            : `${currentStep} out of ${totalSteps - 1} activities! Keep going!`}
      </motion.p>

      <div className="bg-base-100 h-2 overflow-hidden rounded-full">
        {currentStep != 0 && (
          <motion.div
            className={`h-2 bg-${phase}`}
            initial={{ width: `${previousProgress}%` }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        )}
      </div>
    </div>
  );
}

export default ProgressBar;
