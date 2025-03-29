import { useState, useRef, useEffect } from 'react';
import ActivityPageLayout from '../../components/layout/ActivityPageLayout';
import ProgressBar from '../../components/ProgressBar';
import QuestionCard from '../../components/cards/QuestionCard';
import { questions } from '../../utils/ideate';
import { useTaskProgress } from '../../context/TaskProgressContext';
import question from '../../assets/question.svg';

function ReflectIdeate() {
  const cardWidth = 232; // fixed width per scroll
  const cardContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { markTaskComplete, isTaskComplete } = useTaskProgress();

  useEffect(() => {
    if (!isTaskComplete('/ideate/reflect')) {
      markTaskComplete('/ideate/reflect');
    }
  }, []);

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
            Draw a card and discuss the questions with your group. Think about
            what you did in the Ideate phase! 💡
          </div>
        }
        activity={
          <div className="flex items-center gap-4 w-[350px]">
            {/* Left button */}
            <button
              onClick={handlePrevCard}
              className={`p-2 rounded-full text-bold text-primary transition duration-200 text-xl bg-ideate hover:bg-[#0F9AD6] px-4 ${
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
                    <QuestionCard
                      text={text}
                      classFront="bg-ideate text-primary"
                      classBack="bg-primary text-ideate"
                      cardImg={question}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right button */}
            <button
              onClick={handleNextCard}
              className={`p-2 rounded-full text-bold text-primary transition duration-200 text-xl bg-ideate hover:bg-[#0F9AD6] px-4 ${
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
        phase="ideate"
        moveProgressBar={true}
        currentStep={2}
        totalSteps={3}
      />
    </>
  );
}

export default ReflectIdeate;
