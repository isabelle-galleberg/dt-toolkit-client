import { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { getPersona, upsertPersona } from '../../services/personaService';
import type { PersonaInfo } from '../../types/persona';
import { usePersonaStore } from '../../store/personaStore';
import { useTaskProgress } from '../../context/TaskProgressContext';

function Persona() {
  let debounceTimer: NodeJS.Timeout | null = null;
  const { markTaskComplete, markTaskUndone } = useTaskProgress();
  const { persona } = usePersonaStore();
  const cardId = persona?._id;

  const initialPersona: PersonaInfo = {
    characteristics: [],
    name: '',
    age: null,
    occupation: '',
    hobbies: '',
    goals: '',
    frustrations: '',
    slider1: 50,
    slider2: 50,
    slider3: 50,
    cardId: cardId || '',
  };

  const [personaInfo, setPersonaInfo] = useState<PersonaInfo>(initialPersona);
  const [addCharacteristic, setAddCharacteristic] = useState(false);
  const [newCharacteristic, setNewCharacteristic] = useState('');

  useEffect(() => {
    if (cardId) {
      const fetchPersona = async () => {
        try {
          const fetchedPersona = await getPersona(cardId);
          if (fetchedPersona) {
            setPersonaInfo(fetchedPersona);
          }
        } catch (error) {
          console.error('Error fetching persona data:', error);
        }
      };
      fetchPersona();
    }
  }, [cardId]);

  const handleInputChange =
    (field: keyof PersonaInfo) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value, type } = e.target;
      setPersonaInfo((prev) => ({
        ...prev,
        [field]: type === 'number' ? parseInt(value, 10) : value,
      }));
    };

  const handleSlider = (index: number, newValue: number) => {
    setPersonaInfo((prev) => ({
      ...prev,
      [`slider${index + 1}`]: newValue,
    }));
  };

  const validatePersonaInfo = (): boolean => {
    const { name, age, occupation, hobbies, goals, frustrations } = personaInfo;
    return (
      name.trim() !== '' &&
      age !== null &&
      age > 0 &&
      occupation.trim() !== '' &&
      hobbies.trim() !== '' &&
      goals.trim() !== '' &&
      frustrations.trim() !== ''
    );
  };

  const autoSave = (updatedPersona: PersonaInfo) => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      try {
        if (cardId) {
          await upsertPersona({ ...updatedPersona, cardId: cardId });
          console.log('Auto-save complete');
        }
      } catch (error) {
        console.error('Error during auto-save:', error);
      }
    }, 1000);
  };

  useEffect(() => {
    autoSave(personaInfo);
  }, [personaInfo]);

  useEffect(() => {
    const isValid = validatePersonaInfo();
    isValid
      ? markTaskComplete('/empathize/persona')
      : markTaskUndone('/empathize/persona');
  }, [personaInfo]);

  const handleAddCharacteristic = () => {
    if (newCharacteristic.trim() !== '') {
      setPersonaInfo({
        ...personaInfo,
        characteristics: [...personaInfo.characteristics, newCharacteristic],
      });
      setNewCharacteristic('');
      setAddCharacteristic(false);
    }
  };

  const handleRemoveCharacteristic = (index: number) => {
    const updatedCharacteristics = personaInfo.characteristics.filter(
      (_, i) => i !== index
    );
    setPersonaInfo({
      ...personaInfo,
      characteristics: updatedCharacteristics,
    });
  };

  return (
    <Layout
      topContentTitle="Task: Create a Persona Profile!"
      topContentText="Welcome to the Empathize Phase! In this step, we'll imagine someone who needs help staying safe online. Fill in the missing information. You'll use this persona to guide all your ideas!"
      middleContent={
        <div className="space-y-4">
          <p className="text-xl">{persona?.type}</p>
          <div className="flex flex-row space-x-4">
            <div className="avatar">
              <div className="w-32 rounded-full ring ring-success">
                <img src={persona?.imageUrl} alt="Avatar" />
              </div>
            </div>
            <div className="chat chat-start flex-grow">
              <div className="chat-bubble p-4 bg-empathize text-define">
                {persona?.quote}
              </div>
            </div>
          </div>
        </div>
      }
      bottomContent={
        <div className="grid grid-cols-[1fr_1fr]">
          <div className="space-y-4">
            <input
              type="number"
              value={personaInfo.age ?? ''}
              onChange={handleInputChange('age')}
              placeholder="Age"
              className="input input-bordered input-success w-full max-w-xs"
            />
            {['name', 'occupation', 'hobbies', 'goals', 'frustrations'].map(
              (field) => (
                <input
                  key={field}
                  type="text"
                  value={personaInfo[field as keyof PersonaInfo] as string}
                  onChange={handleInputChange(field as keyof PersonaInfo)}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="input input-bordered input-success w-full max-w-xs"
                />
              )
            )}
          </div>
          <div className="flex flex-col space-y-10">
            <div>
              <p className="text-left font-semibold mb-4">Personal Traits</p>
              <div className="flex flex-wrap gap-2">
                {persona?.characteristics?.map((char, index) => (
                  <div
                    key={index}
                    className="badge bg-empathize p-4 rounded-xl text-define"
                  >
                    {char}
                  </div>
                ))}
                {personaInfo.characteristics.map((char, index) => (
                  <div
                    key={index}
                    className="badge bg-empathize p-4 rounded-xl text-define flex items-center space-x-3"
                  >
                    <span>{char}</span>
                    <button
                      onClick={() => handleRemoveCharacteristic(index)}
                      className="text-white"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {!addCharacteristic ? (
                  <button
                    onClick={() => setAddCharacteristic(true)}
                    className="badge text-empathize border-empathize p-4 rounded-xl"
                  >
                    +
                  </button>
                ) : (
                  <div className="mt-2 space-x-2">
                    <input
                      type="text"
                      value={newCharacteristic}
                      onChange={(e) => setNewCharacteristic(e.target.value)}
                      placeholder="Personal trait"
                      className="input input-bordered input-success"
                    />
                    <button
                      onClick={handleAddCharacteristic}
                      className="btn btn-success"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-semibold">Technology & Internet Usage</p>
              <div className="flex flex-col space-y-4">
                {['slider1', 'slider2', 'slider3'].map((slider, index) => (
                  <div key={index} className="flex flex-col gap-4">
                    <div className="flex justify-between text-sm">
                      <p>Low Screen Time</p>
                      <p>High Screen Time</p>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={personaInfo[slider as keyof PersonaInfo] ?? ''}
                      className="range range-success"
                      onChange={(e) =>
                        handleSlider(index, parseInt(e.target.value, 10))
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}

export default Persona;
