import ActivityPageLayout from '../../components/layout/ActivityPageLayout';
import { useTaskProgress } from '../../context/TaskProgressContext';
import { usePersonaStore } from '../../store/personaStore';
import { useState, useEffect, useRef } from 'react';
import { PersonaCard } from '../../types/persona';
import { getPersonaCards } from '../../services/personaCardService';
function SelectPersona() {
  const { persona, setPersona } = usePersonaStore();
  const [personaCards, setPersonaCards] = useState<PersonaCard[]>([]);
  const { markTaskComplete, isTaskComplete } = useTaskProgress();
  const cardContainerRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (persona && !isTaskComplete('/empathize/select-persona')) {
      markTaskComplete('/empathize/select-persona');
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const cards = await getPersonaCards();
        setPersonaCards(cards);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching persona cards:', error);
      }
    })();
  }, []);

  const handlePersonaSelection = (selectedCard: PersonaCard) => {
    setPersona(selectedCard);
    if (!isTaskComplete('/empathize/select-persona')) {
      markTaskComplete('/empathize/select-persona');
    }
  };

  const handlePrevCard = () => {
    if (cardContainerRef.current) {
      cardContainerRef.current.scrollBy({
        left: -225,
        behavior: 'smooth',
      });
    }
  };

  const handleNextCard = () => {
    if (cardContainerRef.current) {
      cardContainerRef.current.scrollBy({
        left: 225,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="flex flex-col items-center px-4">
      <ActivityPageLayout
        header="Who will you play as?"
        phase="Empathize"
        phaseColor="text-empathize"
        text={
          <>
            Phishers don't trick everyone the same way!
            <br />
            Pick a character and see how they deal with online scams:
          </>
        }
        activity={
          <div className="w-[780px]">
            {loading ? (
              <div className="flex items-center justify-center h-[calc(100vh-45rem)]">
                <span className="loading loading-ring w-32 h-32 text-empathize"></span>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className="h-[300px] flex items-center">
                  <button
                    onClick={handlePrevCard}
                    className="p-2 rounded-full text-bold text-define transition duration-200 text-xl bg-empathize px-4"
                  >
                    &lt;
                  </button>
                </div>
                <div
                  ref={cardContainerRef}
                  className="flex gap-4 overflow-x-auto scroll-smooth w-full"
                  style={{
                    scrollBehavior: 'smooth',
                  }}
                >
                  {personaCards.map((card) => (
                    <img
                      key={card._id}
                      src={card.cardImageUrl}
                      alt="persona-card"
                      className={`w-52 cursor-pointer rounded-lg transition-all duration-300 
                ${persona?._id === card._id ? 'scale-110 shadow-lg' : ''}`}
                      onClick={() => handlePersonaSelection(card)}
                    />
                  ))}
                </div>
                <div className="h-[300px] flex items-center">
                  <button
                    onClick={handleNextCard}
                    className="p-2 rounded-full text-bold text-define transition duration-200 text-xl bg-empathize px-4"
                  >
                    &gt;
                  </button>
                </div>
              </div>
            )}
          </div>
        }
      />
    </div>
  );
}
export default SelectPersona;
