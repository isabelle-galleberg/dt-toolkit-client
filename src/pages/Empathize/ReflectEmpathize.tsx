import { useState, useRef } from 'react';
import ActivityPageLayout from '../../components/layout/ActivityPageLayout';
import ProgressBar from '../../components/ProgressBar';
import IdeateCard from '../../components/cards/IdeateCard';
import { questions } from '../../utils/empathize';

function ReflectEmpathize() {
  const cardWidth = 232; // fixed width per scroll
  const cardContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevCard = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextCard = () => {
    setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1));
  };

  return (
    <>
      <ActivityPageLayout
        header="Time to Reflect"
        text={
          <div>
            Draw a card and discuss the questions with your group based on what
            you implemented in the Empathize phase.
          </div>
        }
        activity={
          <div className="flex items-center gap-4 w-[350px]">
            {/* Left button */}
            <button
              onClick={handlePrevCard}
              className={`p-2 rounded-full text-bold text-define transition duration-200 text-xl bg-empathize hover:bg-[#18A060] px-4 ${
                currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={currentIndex === 0}
            >
              &lt;
            </button>

            {/* Card Container */}
            <div
              ref={cardContainerRef}
              className="relative w-[232px] h-80 flex overflow-hidden"
            >
              <div
                className="flex transition-transform duration-300"
                style={{
                  transform: `translateX(-${currentIndex * cardWidth}px)`,
                  width: `${questions.length * cardWidth}px`,
                }}
              >
                {questions.map((text, index) => (
                  <div
                    key={index}
                    className="w-[232px] flex-shrink-0 flex justify-center items-center cursor-pointer"
                  >
                    <IdeateCard
                      text={text}
                      classOff="bg-empathize text-define"
                      classOn="bg-define text-empathize"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right button */}
            <button
              onClick={handleNextCard}
              className={`p-2 rounded-full text-bold text-define transition duration-200 text-xl bg-empathize hover:bg-[#18A060] px-4 ${
                currentIndex === questions.length - 1
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
              disabled={currentIndex === questions.length - 1}
            >
              &gt;
            </button>
          </div>
        }
      />
      <ProgressBar
        phase="empathize"
        moveProgressBar={false}
        currentStep={3}
        totalSteps={4}
      />
    </>
  );
}

export default ReflectEmpathize;
