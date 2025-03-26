import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid';

interface TooltipProps {
  text: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

function Tooltip({ text, position }: TooltipProps) {
  return (
    <div className="relative group inline-block">
      <div
        className={`absolute hidden group-hover:block bg-[#214A6B] text-primary text-xs p-2 rounded-md w-max z-10 transition-all ${
          position === 'top'
            ? 'bottom-full mb-2 left-1/2 transform -translate-x-1/2'
            : position === 'bottom'
              ? 'top-full mt-2 left-1/2 transform -translate-x-1/2'
              : position === 'left'
                ? 'right-full mr-2 top-1/2 transform -translate-y-1/2'
                : 'left-full ml-2 top-1/2 transform -translate-y-1/2 max-w-60'
        }`}
      >
        {text}
      </div>
      <QuestionMarkCircleIcon className="w-6 h-6" />
    </div>
  );
}

export default Tooltip;
