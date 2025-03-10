import { useState, useEffect, useRef } from 'react';
import ActivityPageLayout from '../../components/layout/ActivityPageLayout';
import QuestionCard from '../../components/QuestionCard';
import {
  deleteQuestionCard,
  getQuestionCards,
} from '../../services/questionCardService';
import { usePersonaStore } from '../../store/personaStore';
import { QuestionCardType } from '../../types/questioncard';
import { useTaskProgress } from '../../context/TaskProgressContext';

function AddQuestionCard() {
  const [showPopup, setShowPopup] = useState(false);
  const [questionCards, setQuestionCards] = useState<QuestionCardType[]>([]);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const { persona } = usePersonaStore();
  const cardId = persona?._id;
  const lastCardRef = useRef<HTMLDivElement>(null);
  const { markTaskComplete, isTaskComplete } = useTaskProgress();

  useEffect(() => {
    if (!isTaskComplete('/ideate/question-card')) {
      markTaskComplete('/ideate/question-card');
    }
  }, [isTaskComplete, markTaskComplete]);

  // Fetch question cards
  useEffect(() => {
    if (!cardId) return;

    const fetchCards = async () => {
      try {
        const data = await getQuestionCards(cardId);
        setQuestionCards(data);
      } catch (error) {
        console.error('Error fetching question cards:', error);
      }
    };

    fetchCards();
  }, [cardId]);

  // Scroll to the last card when a new one is added
  useEffect(() => {
    if (!showPopup && questionCards.length > 0) {
      setTimeout(() => {
        lastCardRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start',
        });
      }, 300);
    }
  }, [questionCards, showPopup]);

  const handleDeleteCard = async (cardIdToDelete: string) => {
    try {
      await deleteQuestionCard(cardIdToDelete);

      setQuestionCards((prevCards) =>
        prevCards.filter((card) => card._id !== cardIdToDelete)
      );
    } catch (error) {
      console.error('Error deleting question card:', error);
    }
  };

  return (
    <ActivityPageLayout
      header="Think of ways to stay safe online!"
      phase="Ideate"
      phaseColor="text-ideate"
      activity={
        <>
          <div className="flex items-center overflow-x-auto">
            <div className="relative flex">
              {questionCards.map((card, index) => (
                <div
                  key={index}
                  ref={index === questionCards.length - 1 ? lastCardRef : null}
                  className={`w-48 h-64 rounded-lg shadow-lg transition-transform duration-500 relative cursor-pointer
                              -ml-16 first:ml-0 hover:ml-0 hover:z-10
                              ${index === questionCards.length - 1 ? 'mr-6' : ''}`}
                  onClick={() => setFlippedIndex(index)}
                  onMouseLeave={() => setFlippedIndex(null)}
                  style={{
                    transform:
                      flippedIndex === index
                        ? 'rotateY(180deg)'
                        : 'rotateY(0deg)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Front Side */}
                  <div
                    className={`absolute w-full h-full bg-ideate flex flex-col items-center justify-center rounded-lg text-primary backface-hidden 
                                  ${flippedIndex === index ? 'opacity-0' : 'opacity-100'}`}
                  >
                    <h3 className="text-xs font-bold">QUESTION CARD</h3>
                    <p className="text-4xl mt-2">
                      <img
                        src="/src/assets/idea-card-logo.png"
                        alt="Question Mark"
                        className="h-24 mt-2"
                      />
                    </p>
                    <p className="text-xs mt-4">NUMBER {index + 1}</p>
                  </div>

                  {/* Back Side (Question & Answer) */}
                  <div
                    className={`absolute w-full h-full bg-primary flex flex-col items-center justify-center rounded-lg shadow-lg text-ideate backface-hidden
                                  ${flippedIndex === index ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transform: 'rotateY(180deg)' }}
                  >
                    <button
                      onClick={() => handleDeleteCard(card._id)}
                      className="absolute top-2 right-2 p-1 text-[10px] text-base-100 rounded-full hover:text-red-600 transition"
                    >
                      DELETE
                    </button>
                    <p className="text-sm font-bold px-2">{card.question}</p>
                    <p className="text-sm mt-2 text-base-100">{card.answer}</p>
                  </div>
                </div>
              ))}

              {/* ADD CARD Button */}
              <button
                onClick={() => {
                  if (questionCards.length < 5) {
                    setShowPopup(true);
                  }
                }}
                disabled={questionCards.length >= 5}
                className={`w-48 h-64 border-2 border-dashed border-primary flex flex-col items-center justify-center rounded-lg
    ${questionCards.length >= 5 ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary'}`}
              >
                <span className="text-3xl">+</span>
                <span className="text-sm mt-2">ADD CARD</span>
              </button>
            </div>
          </div>

          {/* Popup Modal */}
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-base-100 bg-opacity-75 z-50">
              <div className="w-full max-w-lg">
                <QuestionCard
                  onClose={() => setShowPopup(false)}
                  setQuestionCards={setQuestionCards}
                />
              </div>
            </div>
          )}
        </>
      }
    />
  );
}

export default AddQuestionCard;
