import { useState, useEffect } from 'react';
import { getPersona, upsertPersona } from '../../services/personaService';
import type { PersonaInfo, Persona } from '../../types/persona';
import { usePersonaStore } from '../../store/personaStore';
import ActivityPageLayout from '../../components/layout/ActivityPageLayout';
import Box from '../../components/Box';
import { useTaskProgress } from '../../context/TaskProgressContext';
import LoadingSpinner from '../../components/LoadingSpinner';

function Persona() {
  const { persona } = usePersonaStore();
  const [loading, setLoading] = useState<boolean>(true);
  const cardId = persona?._id;
  let debounceTimer: NodeJS.Timeout | null = null;
  const { markTaskComplete, markTaskUndone, isTaskComplete } =
    useTaskProgress();

  const initialPersona: PersonaInfo = {
    cardId: cardId || '',
    traits: [],
    name: '',
    age: null,
    occupationAndHobbies: '',
    technologyUsage: '',
    sliders: [0, 0, 0, 0, 0, 0],
  };

  const [personaInfo, setPersonaInfo] = useState<PersonaInfo>(initialPersona);
  const [addTrait, setAddTrait] = useState(false);
  const [newTrait, setNewTrait] = useState('');

  useEffect(() => {
    if (!cardId) return;
    setLoading(true);
    getPersona(cardId)
      .then(setPersonaInfo)
      .catch((error) => console.error('Error fetching persona data:', error));
    setLoading(false);
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
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (cardId) {
        upsertPersona({ ...updatedPersona, cardId })
          .then(() => console.log('Auto-save complete'))
          .catch((error) => console.error('Error during auto-save:', error));
      }
    }, 1000);
  };

  useEffect(() => {
    autoSave(personaInfo);
  }, [personaInfo]);

  const validatePersonaInfo = (): boolean => {
    const { name, age, occupationAndHobbies, technologyUsage } = personaInfo;
    return (
      name.trim() !== '' &&
      age !== null &&
      age > 0 &&
      occupationAndHobbies.trim() !== '' &&
      technologyUsage.trim() !== ''
    );
  };

  useEffect(() => {
    if (
      validatePersonaInfo() &&
      personaInfo.traits.length > 1 &&
      personaInfo.sliders.every((val) => val > 0)
    ) {
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
      setAddTrait(false);
    }
  };

  const handleRemoveTrait = (index: number) => {
    const updatedtraits = personaInfo.traits.filter((_, i) => i !== index);
    setPersonaInfo({
      ...personaInfo,
      traits: updatedtraits,
    });
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <ActivityPageLayout
          header={'Create your character!'}
          phase="Empathize"
          phaseColor="text-empathize"
          activity={
            <div className="grid grid-cols-[1.5fr_1fr] gap-6 text-primary">
              <div className="space-y-4">
                <div className="flex space-x-6 tracking-widest">
                  <div className="relative">
                    <img
                      src={persona?.personaImageUrl || ''}
                      alt="persona grandma"
                      className="w-46 rounded-full"
                    />
                    <div className="absolute inset-0 border-[4px] border-[#216646] rounded-full pointer-events-none"></div>
                  </div>

                  <div>
                    <p className="text-left font-semibold text-[15px] mb-4">
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
                      {!addTrait ? (
                        <button
                          onClick={() => setAddTrait(true)}
                          className="badge p-1.5 rounded-lg text-define border-empathize text-md  w-[27px] h-[27px] flex justify-center items-center text-center"
                        >
                          +
                        </button>
                      ) : (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newTrait}
                            onChange={(e) => setNewTrait(e.target.value)}
                            placeholder="Personal trait"
                            className="p-1.5 rounded-lg text-define text-[10px] font-regular border border-empathize bg-transparent"
                          />
                          <button
                            onClick={handleAddTrait}
                            className="badge p-1.5 rounded-lg text-define border-empathize text-[10px] font-regular h-[27px]"
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
                    <div className="p-6 space-y-4 text-[12px] tracking-widest">
                      <div className="flex gap-4">
                        <label className="font-semibold">Name:</label>
                        <input
                          type="text"
                          value={personaInfo.name ?? ''}
                          onChange={handleInputChange('name')}
                          className="border-b border-dashed border-gray-500 w-48 bg-transparent px-2"
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
                        <p className=" font-semibold">
                          Occupation and Hobbies:
                        </p>
                        <textarea
                          value={personaInfo.occupationAndHobbies}
                          onChange={handleInputChange('occupationAndHobbies')}
                          className="border border-gray-500 w-full my-2 px-2 py-1 bg-transparent"
                        />
                      </div>
                      <div>
                        <p className=" font-semibold">Technology Usage:</p>
                        <textarea
                          value={personaInfo.technologyUsage}
                          onChange={handleInputChange('technologyUsage')}
                          className="border border-gray-500 w-full my-2 px-2 py-1 bg-transparent"
                        />
                      </div>
                    </div>
                  }
                ></Box>
              </div>
              <div className="flex flex-col space-y-10">
                <div className="space-y-2">
                  <p className="text-left font-semibold text-[15px]  tracking-widest mb-6">
                    TECHNOLOGY & INTERNET USAGE
                  </p>
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
                        <div className="flex justify-between text-[10px]  font-regular tracking-widest text-define">
                          <p>{slider.labelLeft}</p>
                          <p>{slider.labelRight}</p>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={personaInfo.sliders[index] ?? ''}
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
      )}
    </>
  );
}

export default Persona;
