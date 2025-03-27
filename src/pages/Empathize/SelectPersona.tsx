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

// shuffle array based on a seed
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
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  useEffect(() => {
    const fetchPersonaCards = async () => {
      setLoading(true);
      try {
        const cards = await getPersonaCards();
        const shuffledCards = seededShuffle(cards, userId); // shuffle based on user ID
        setPersonaCards(shuffledCards);
      } catch (error) {
        console.error('Error fetching persona cards:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPersonaCards();
  }, [userId]);

  useEffect(() => {
    const updateScrollState = () => {
      if (cardContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          cardContainerRef.current;
        setIsAtStart(scrollLeft === 0);
        setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
      }
    };

    const container = cardContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollState);
      updateScrollState();
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', updateScrollState);
      }
    };
  }, [personaCards]);

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
      cardContainerRef.current.scrollBy({ left: -225, behavior: 'smooth' });
    }
  };

  const handleNextCard = () => {
    if (cardContainerRef.current) {
      cardContainerRef.current.scrollBy({ left: 225, behavior: 'smooth' });
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
        <div className="flex items-center gap-4 max-w-[800px] w-full">
          <div className="h-[300px] flex items-center">
            <button
              onClick={handlePrevCard}
              disabled={isAtStart}
              className={`p-2 rounded-full text-bold text-define transition duration-200 text-xl bg-empathize hover:bg-[#18A060] px-4 ${
                isAtStart ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              &lt;
            </button>
          </div>
          <div
            ref={cardContainerRef}
            className="flex gap-4 overflow-x-auto p-4 scroll-smooth w-full"
          >
            {personaCards.map((card) => (
              <img
                key={card._id}
                src={card.cardImageUrl}
                alt="persona-card"
                className={`py-1 w-52 cursor-pointer rounded-lg transition-all duration-300 hover:rotate-2
                  ${persona?._id === card._id ? 'scale-115 shadow-lg' : ''}`}
                onClick={() => handlePersonaSelection(card)}
              />
            ))}
          </div>
          <div className="h-[300px] flex items-center">
            <button
              onClick={handleNextCard}
              disabled={isAtEnd}
              className={`p-2 rounded-full text-bold text-define transition duration-200 text-xl bg-empathize hover:bg-[#18A060] px-4 ${
                isAtEnd ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              &gt;
            </button>
          </div>
          <ProgressBar phase="empathize" currentStep={1} totalSteps={4} />
        </div>
      }
    />
  );
}

export default SelectPersona;
