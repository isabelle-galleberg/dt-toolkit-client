import { useState, useEffect } from 'react';
import ActivityPageLayout from '../../components/layout/ActivityPageLayout';
import QuestionCard from '../../components/QuestionCard';
import {
  deleteQuestionCard,
  getQuestionCards,
} from '../../services/questionCardService';
import { usePersonaStore } from '../../store/personaStore';
import { QuestionCardType } from '../../types/questioncard';
import { useTaskProgress } from '../../context/TaskProgressContext';
import cardLogo from '../../assets/idea-card-logo.png';

function AddQuestionCard() {
  const [showPopup, setShowPopup] = useState(false);
  const [questionCards, setQuestionCards] = useState<QuestionCardType[]>([]);
  const { persona } = usePersonaStore();
  const { markTaskComplete, isTaskComplete } = useTaskProgress();
  const cardId = persona?._id;

  useEffect(() => {
    if (!isTaskComplete('/ideate/question-card')) {
      markTaskComplete('/ideate/question-card');
    }
  }, [isTaskComplete, markTaskComplete]);

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
          <div className="flex items-center">
            <div className="relative flex py-10 h-96 ">
              {questionCards.map((card, index) => (
                <>
                  <label className="swap swap-flip m-2">
                    <input type="checkbox" />
                    {/* Front Side */}
                    <div className="swap-off h-64 w-48 card shadow-xl bg-[#1ab3f7] p-12 justify-between text-center items-center rounded-lg text-primary">
                      <h3 className="text-xs font-bold">QUESTION CARD</h3>
                      <p className="text-4xl mt-2">
                        <img
                          src={cardLogo}
                          alt="Question Mark"
                          className="h-24 mt-2"
                        />
                      </p>
                      <p className="text-xs mt-4">NUMBER {index + 1}</p>
                    </div>
                    {/* Back Side (Question & Answer) */}
                    <div className="swap-on h-64 w-48 card shadow-xl bg-[#beebfa] p-12 text-center text-[#1ab3f7] pt-8 rounded-lg justify-center">
                      <button
                        onClick={() => handleDeleteCard(card._id)}
                        className="absolute top-2 right-2 p-1 text-[10px] text-base-100 rounded-full hover:text-red-600 transition"
                      >
                        DELETE
                      </button>
                      <p className="text-sm font-bold px-2">{card.question}</p>
                      <p className="text-sm mt-2 text-base-100">
                        {card.answer}
                      </p>
                    </div>
                  </label>
                </>
              ))}
              {/* ADD CARD Button */}
              {questionCards.length < 5 && (
                <button
                  onClick={() => {
                    if (questionCards.length < 5) {
                      setShowPopup(true);
                    }
                  }}
                  disabled={questionCards.length >= 5}
                  className="m-2 mt-6 w-48 h-64 border-2 border-dashed border-primary flex flex-col items-center justify-center rounded-lg"
                >
                  <span className="text-3xl">+</span>
                  <span className="text-sm mt-2">ADD CARD</span>
                </button>
              )}
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
