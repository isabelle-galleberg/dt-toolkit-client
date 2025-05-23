import { useState, useEffect, useRef } from 'react';
import { getPersona, upsertPersona } from '../../services/personaService';
import type { PersonaInfo, Persona } from '../../types/persona';
import { usePersonaStore } from '../../store/personaStore';
import ActivityPageLayout from '../../components/layout/ActivityPageLayout';
import Box from '../../components/Box';
import { useTaskProgress } from '../../context/TaskProgressContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import ProgressBar from '../../components/ProgressBar';
import { usePersonaNameStore } from '../../store/personaNameStore';
import { Quote } from 'lucide-react';

function Persona() {
  const { persona } = usePersonaStore();
  const { setName } = usePersonaNameStore();
  const [loading, setLoading] = useState<boolean>(false);
  const cardId = persona?._id;
  const { markTaskComplete, markTaskUndone, isTaskComplete } =
    useTaskProgress();

  const initialPersona: PersonaInfo = {
    cardId: cardId || '',
    traits: [],
    name: '',
    age: null,
    occupationAndHobbies: '',
    hopes: '',
    challenges: '',
    quote: '',
    sliders: [50, 50, 50, 50, 50, 50],
  };

  const [personaInfo, setPersonaInfo] = useState<PersonaInfo>(initialPersona);
  const [newTrait, setNewTrait] = useState('');

  const debounceTimer = useRef<NodeJS.Timeout | null>(null); // avoid resetting the timer on every render

  useEffect(() => {
    const fetchPersona = async () => {
      if (!cardId) return;
      setLoading(true);
      try {
        const persona = await getPersona(cardId);
        setPersonaInfo(persona);
      } catch (error) {
        console.error('Error fetching persona data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPersona();
  }, [cardId]);

  const handleInputChange =
    (field: keyof PersonaInfo) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value, type } = e.target;
      setPersonaInfo((prev) => ({
        ...prev,
        [field]: type === 'number' ? parseInt(value, 10) : value,
      }));
    };

  const handleSlider = (index: number, newValue: number) => {
    setPersonaInfo((prev) => ({
      ...prev,
      sliders: prev.sliders.map((val, i) => (i === index ? newValue : val)),
    }));
  };

  const autoSave = (updatedPersona: PersonaInfo) => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current); // Clear any existing timer
    debounceTimer.current = setTimeout(() => {
      if (cardId) {
        upsertPersona({ ...updatedPersona, cardId })
          .then(() => console.log('Auto-save complete'))
          .catch((error) => console.error('Error during auto-save:', error));
      }
    }, 1000); // delay for 1 second to wait for further input
  };

  useEffect(() => {
    autoSave(personaInfo);
  }, [personaInfo]);

  const validatePersonaInfo = (): boolean => {
    const { name, age, occupationAndHobbies, hopes, challenges, quote } =
      personaInfo;
    return (
      name.trim() !== '' &&
      age !== null &&
      age > 0 &&
      occupationAndHobbies.trim() !== '' &&
      hopes.trim() !== '' &&
      challenges.trim() !== '' &&
      quote.trim() !== ''
    );
  };

  useEffect(() => {
    setName(personaInfo.name);
  }, [personaInfo.name]);

  useEffect(() => {
    if (validatePersonaInfo() && personaInfo.traits.length > 1) {
      if (!isTaskComplete('/empathize/persona'))
        markTaskComplete('/empathize/persona');
    } else {
      if (isTaskComplete('/empathize/persona'))
        markTaskUndone('/empathize/persona');
    }
  }, [personaInfo]);

  const handleAddTrait = () => {
    if (newTrait.trim() !== '') {
      setPersonaInfo({
        ...personaInfo,
        traits: [...personaInfo.traits, newTrait],
      });
      setNewTrait('');
    }
  };

  const handleRemoveTrait = (index: number) => {
    const updatedtraits = personaInfo.traits.filter((_, i) => i !== index);
    setPersonaInfo({
      ...personaInfo,
      traits: updatedtraits,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTrait();
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ActivityPageLayout
      header={'Create your character!'}
      phase="Empathize"
      phaseColor="text-empathize"
      activity={
        <div className="grid grid-cols-[1.5fr_1fr] gap-6 text-primary w-full">
          <div className="space-y-4">
            <div className="flex space-x-6 tracking-widest">
              <div className="relative w-46 h-46 hover:scale-105 transition-transform">
                <img
                  src={persona?.personaImageUrl || ''}
                  alt="persona grandma"
                  className="w-46 h-46 object-cover rounded-full"
                />
                <div className="absolute inset-0 border-[4px] border-[#216646] rounded-full pointer-events-none aspect-square"></div>
              </div>
              <div className="w-4/5">
                <p className="text-left font-semibold text-[16px] mb-4">
                  PERSONAL TRAITS
                </p>
                <div className="flex flex-wrap gap-2">
                  {persona?.traits?.map((char, index) => (
                    <div
                      key={index}
                      className="bg-empathize p-1.5 rounded-lg text-define text-[10px] font-regular"
                    >
                      {char}
                    </div>
                  ))}
                  {personaInfo.traits.map((char, index) => (
                    <div
                      key={index}
                      className="bg-empathize p-1.5 rounded-lg text-define text-[10px] font-regular"
                    >
                      <span>{char}</span>
                      <button
                        onClick={() => handleRemoveTrait(index)}
                        className="text-define ps-2"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {personaInfo.traits.length < 5 && (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newTrait}
                        onChange={(e) => setNewTrait(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Add more traits ..."
                        maxLength={20}
                        className="p-1.5 rounded-lg text-define text-[10px] font-regular border border-empathize bg-base-100"
                      />
                      <button
                        onClick={handleAddTrait}
                        className="badge p-1.5 font-bold rounded-lg text-empathize bg-define border-empathize text-[10px] font-regular h-[29px] hover:opacity-70"
                      >
                        Add
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Box
              header={persona?.alias || ''}
              content={
                <div className="p-6 text-[12px] tracking-widest">
                  <div className="flex gap-4">
                    <label className="font-semibold">Name:</label>
                    <input
                      type="text"
                      value={personaInfo.name ?? ''}
                      onChange={handleInputChange('name')}
                      className="border-b border-dashed border-gray-500 w-48 bg-transparent px-2"
                      maxLength={30}
                    />
                    <label className=" font-semibold">Age:</label>
                    <input
                      type="number"
                      value={personaInfo.age ?? ''}
                      onChange={handleInputChange('age')}
                      className="border-b border-dashed border-gray-500 w-16 bg-transparent px-2"
                    />
                  </div>
                  <div>
                    <p className="font-semibold mt-4">
                      Occupation and Hobbies:
                    </p>
                    <textarea
                      value={personaInfo.occupationAndHobbies}
                      onChange={handleInputChange('occupationAndHobbies')}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = 'auto';
                        target.style.height = `${target.scrollHeight}px`;
                      }}
                      className="border border-gray-500 w-full my-2 px-2 py-1 bg-transparent resize-none overflow-hidden"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">Hopes and Dreams:</p>
                    <textarea
                      value={personaInfo.hopes}
                      onChange={handleInputChange('hopes')}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = 'auto';
                        target.style.height = `${target.scrollHeight}px`;
                      }}
                      className="border border-gray-500 w-full my-2 px-2 py-1 bg-transparent resize-none overflow-hidden"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">
                      Challenges and Frustrations:
                    </p>
                    <textarea
                      value={personaInfo.challenges}
                      onChange={handleInputChange('challenges')}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = 'auto';
                        target.style.height = `${target.scrollHeight}px`;
                      }}
                      className="border border-gray-500 w-full my-2 px-2 py-1 bg-transparent resize-none overflow-hidden"
                    />
                  </div>
                </div>
              }
            ></Box>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="space-y-2">
              <div className="text-left font-semibold text-[16px] tracking-widest mb-2">
                TECHNOLOGY & INTERNET USAGE
              </div>
              <div className="flex flex-col space-y-8">
                {[
                  { labelLeft: 'Tech Beginner', labelRight: 'Tech Expert' },
                  {
                    labelLeft: 'Low Screen Time',
                    labelRight: 'High Screen Time',
                  },
                  {
                    labelLeft: 'Careful with Sharing',
                    labelRight: 'Shares Easily',
                  },
                  {
                    labelLeft: 'Quiet Online',
                    labelRight: 'Social Media Fan',
                  },
                  {
                    labelLeft: 'Rarely Exploring Tech',
                    labelRight: 'Always Exploring Tech',
                  },
                  {
                    labelLeft: 'Face-to-Face',
                    labelRight: 'Digital Communication',
                  },
                ].map((slider, index) => (
                  <div key={index} className="flex flex-col gap-1">
                    <div className="flex justify-between text-[10px] font-regular tracking-widest text-define">
                      <p>{slider.labelLeft}</p>
                      <p>{slider.labelRight}</p>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={personaInfo.sliders[index] ?? ''}
                      onChange={(e) =>
                        handleSlider(index, parseInt(e.target.value, 10))
                      }
                      className="range-input w-full h-2 bg-empathize rounded-full appearance-none cursor-pointer accent-define"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-left font-semibold text-[16px] tracking-widest mb-2">
                QUOTE
              </div>
              <div className="bg-primary w-full min-h-10 rounded-[12px] p-2 flex flex-row relative">
                <Quote className="absolute top-2 left-2 w-4 h-4 text-base-100 scale-x-[-1]" />
                <textarea
                  rows={2}
                  className="text-base-100 w-full bg-primary px-6 font-sm"
                  value={personaInfo.quote}
                  onChange={handleInputChange('quote')}
                ></textarea>
                <Quote className="absolute bottom-2 right-2 w-4 h-4 text-base-100" />
              </div>
            </div>
          </div>
          <ProgressBar phase="empathize" currentStep={2} totalSteps={5} />
        </div>
      }
    />
  );
}

export default Persona;
