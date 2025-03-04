import ActivityPageLayout from '../../components/layout/ActivityPageLayout';
import { useTaskProgress } from '../../context/TaskProgressContext';
import { usePersonaStore } from '../../store/personaStore';
import { useState, useEffect } from 'react';
import { PersonaCard } from '../../types/persona';
import { getPersonaCards } from '../../services/personaCardService';

function SelectPersona() {
  const { persona, setPersona } = usePersonaStore();
  const [personaCards, setPersonaCards] = useState<PersonaCard[]>([]);
  const { markTaskComplete, isTaskComplete } = useTaskProgress();

  useEffect(() => {
    (async () => {
      try {
        const cards = await getPersonaCards();
        setPersonaCards(cards);
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
          <div className="flex gap-4">
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
        }
      />
    </div>
  );
}

export default SelectPersona;
