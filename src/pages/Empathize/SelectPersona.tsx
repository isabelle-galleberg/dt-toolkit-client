import ActivityPageLayout from '../../components/layout/ActivityPageLayout';
import { useTaskProgress } from '../../context/TaskProgressContext';
import { usePersonaStore } from '../../store/personaStore';
import { useState, useEffect } from 'react';
import { PersonaCard } from '../../types/persona';
import { getPersonaCards } from '../../services/personaCardService';

function SelectPersona() {
  const { persona, setPersona } = usePersonaStore();
  const { markTaskComplete, isTaskComplete } = useTaskProgress();
  const [personas, setPersonas] = useState<PersonaCard[]>([]);

  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const fetchedPersonas = await getPersonaCards();
        setPersonas(fetchedPersonas);
      } catch (error) {
        console.error('Error fetching persona cards:', error);
      }
    };

    fetchPersonas();
  }, []);

  const handlePersonaSelection = (selectedPersona: PersonaCard) => {
    setPersona(selectedPersona);
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
            {personas.map((personaCard) => (
              <img
                key={personaCard._id}
                src={personaCard.cardImageUrl}
                alt="persona-card"
                className={`w-52 cursor-pointer rounded-lg transition-all duration-300 
                  ${persona?._id === personaCard._id ? 'scale-110 shadow-lg' : ''}`}
                onClick={() => handlePersonaSelection(personaCard)} // Handle persona selection
              />
            ))}
          </div>
        }
      />
    </div>
  );
}

export default SelectPersona;
