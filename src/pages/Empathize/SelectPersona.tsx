import { useState, useEffect, useRef } from 'react';
import seedrandom from 'seedrandom';
import ActivityPageLayout from '../../components/layout/ActivityPageLayout';
import { useTaskProgress } from '../../context/TaskProgressContext';
import { usePersonaStore } from '../../store/personaStore';
import { PersonaCard } from '../../types/persona';
import { getPersonaCards } from '../../services/personaCardService';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useUserStore } from '../../store/userStore';
import ProgressBar from '../../components/ProgressBar';

const seededShuffle = (array: PersonaCard[], seed: string): PersonaCard[] => {
  const rng = seedrandom(seed);
  return array
    .map((item) => ({ item, sort: rng() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
};

function SelectPersona() {
  const { persona, setPersona } = usePersonaStore();
  const [personaCards, setPersonaCards] = useState<PersonaCard[]>([]);
  const { markTaskComplete, isTaskComplete } = useTaskProgress();
  const cardContainerRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useUserStore();
  const userId = user?._id || '';

  useEffect(() => {
    const fetchPersonaCards = async () => {
      setLoading(true);
      try {
        const cards = await getPersonaCards();
        const shuffledCards = seededShuffle(cards, userId);
        setPersonaCards(shuffledCards);
      } catch (error) {
        console.error('Error fetching persona cards:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPersonaCards();
  }, [userId]);

  const handlePersonaSelection = (selectedCard: PersonaCard) => {
    setPersona(selectedCard);
    if (!isTaskComplete('/empathize/select-persona')) {
      markTaskComplete('/empathize/select-persona');
    }
  };

  useEffect(() => {
    if (persona && !isTaskComplete('/empathize/select-persona')) {
      markTaskComplete('/empathize/select-persona');
    }
  }, [persona]);

  const handlePrevCard = () => {
    if (cardContainerRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = cardContainerRef.current;
      if (scrollLeft <= 0) {
        cardContainerRef.current.scrollTo({
          left: scrollWidth - clientWidth,
          behavior: 'instant',
        });
      } else {
        cardContainerRef.current.scrollBy({ left: -225, behavior: 'smooth' });
      }
    }
  };

  const handleNextCard = () => {
    if (cardContainerRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = cardContainerRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 1) {
        cardContainerRef.current.scrollTo({ left: 0, behavior: 'instant' });
      } else {
        cardContainerRef.current.scrollBy({ left: 225, behavior: 'smooth' });
      }
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ActivityPageLayout
      header="Who will you play as?"
      phase="Empathize"
      phaseColor="text-empathize"
      text={
        <>
          Phishers don't trick everyone the same way! <br />
          Pick a character and see how they deal with online scams:
        </>
      }
      activity={
        <div className="flex items-center gap-4 w-[780px] h-full">
          <button
            onClick={handlePrevCard}
            className="p-2 rounded-full text-bold text-define transition duration-200 text-xl bg-empathize hover:bg-[#18A060] px-4"
          >
            &lt;
          </button>
          <div
            ref={cardContainerRef}
            className="flex gap-4 overflow-x-auto p-6 scroll-smooth w-full"
          >
            {personaCards.map((card) => (
              <img
                key={card._id}
                src={card.cardImageUrl}
                alt="persona-card"
                className={`py-1 w-52 cursor-pointer rounded-lg transition-all duration-300 hover:rotate-2
                  ${persona?._id === card._id ? 'scale-115' : ''}`}
                onClick={() => handlePersonaSelection(card)}
              />
            ))}
          </div>
          <button
            onClick={handleNextCard}
            className="p-2 rounded-full text-bold text-define transition duration-200 text-xl bg-empathize hover:bg-[#18A060] px-4"
          >
            &gt;
          </button>
          <ProgressBar phase="empathize" currentStep={1} totalSteps={5} />
        </div>
      }
    />
  );
}

export default SelectPersona;
