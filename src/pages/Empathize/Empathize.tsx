import { useEffect, useState } from 'react';
import EmpathizeCard from '../../components/cards/EmpathizeCard';
import Layout from '../../components/layout/Layout';
import { useTaskProgress } from '../../context/TaskProgressContext';
import { PersonaCard } from '../../types/persona';
import { getPersonaCards } from '../../services/personaCardService';
import { Link } from 'react-router-dom';
import { usePersonaStore } from '../../store/personaStore';

function Empathize() {
  const { persona, setPersona } = usePersonaStore();
  const [cards, setCards] = useState<PersonaCard[]>([]);
  const { markTaskComplete, isTaskComplete } = useTaskProgress();

  const handlePersonaSelection = (persona: PersonaCard) => {
    setPersona(persona);
    if (!isTaskComplete('/empathize')) {
      markTaskComplete('/empathize');
    }
  };

  const fetchPersonas = async () => {
    const data = await getPersonaCards();
    setCards(data);
  };

  useEffect(() => {
    fetchPersonas();
  }, []);

  return (
    <>
      <Layout
        topContentTitle="Task: Choose a Persona!"
        topContentText="Choose a persona to help you brainstorm ideas. Each persona has a unique story and set of challenges. Pick the one you feel most inspired by!"
        middleContent={
          <div className="flex flex-row space-x-8 justify-center">
            {cards.map((item) => (
              <EmpathizeCard
                key={item._id}
                type={item.type}
                description={item.description}
                image={item.imageUrl}
                onClick={() => {
                  handlePersonaSelection(item);
                }}
                isSelected={persona?.type === item.type}
              />
            ))}
          </div>
        }
      />
      <Link to="/empathize/persona">
        <button
          className="btn btn-primary btn-outline w-24 absolute bottom-4 right-4"
          disabled={!persona}
        >
          Next
        </button>
      </Link>
    </>
  );
}

export default Empathize;
