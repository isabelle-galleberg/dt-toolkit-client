import { useState, useEffect } from 'react';
import { getPersona, upsertPersona } from '../../services/personaService';
import type { PersonaInfo, Persona } from '../../types/persona';
import { usePersonaStore } from '../../store/personaStore';
import ActivityPageLayout from '../../components/layout/ActivityPageLayout';
import Box from '../../components/Box';
import { useTaskProgress } from '../../context/TaskProgressContext';

function Persona() {
  const { markTaskComplete, markTaskUndone, isTaskComplete } =
    useTaskProgress();
  let debounceTimer: NodeJS.Timeout | null = null;
  const { persona } = usePersonaStore();
  const cardId = persona?._id;

  const initialPersona: PersonaInfo = {
    cardId: cardId || '',
    characteristics: persona?.characteristics || [],
    name: '',
    age: null,
    occupationAndHobbies: '',
    technologyUsage: '',
    sliders: [0, 0, 0, 0, 0, 0],
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
    if (validatePersonaInfo()) {
      if (!isTaskComplete('/empathize/persona'))
        markTaskComplete('/empathize/persona');
    } else {
      if (isTaskComplete('/empathize/persona'))
        markTaskUndone('/empathize/persona');
    }
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
    <ActivityPageLayout
      header={'Create your character!'}
      phase="Empathize"
      phaseColor="text-empathize"
      activity={
        <div className="grid grid-cols-[1.5fr_1fr] gap-6">
          <div className="space-y-4">
            <div className="flex space-x-12 tracking-widest">
              {/* Image */}
              <img
                src={persona?.personaImageUrl || ''}
                alt="persona grandma"
                className="w-28"
              />
              {/* Personal traits */}
              <div>
                <p
                  className="text-left font-semibold text-[15px] mb-4"
                  style={{ fontFamily: 'Poppins' }}
                >
                  PERSONAL TRAITS
                </p>
                <div className="flex flex-wrap gap-2">
                  {persona?.characteristics?.map((char, index) => (
                    <div
                      key={index}
                      className="bg-empathize p-1.5 rounded-lg text-define text-[10px] font-regular"
                      style={{ fontFamily: 'Poppins', height: '27px' }}
                    >
                      {char}
                    </div>
                  ))}
                  {personaInfo.characteristics.map((char, index) => (
                    <div
                      key={index}
                      className="bg-empathize p-1.5 rounded-lg text-define text-[10px] font-regular"
                      style={{ fontFamily: 'Poppins', height: '27px' }}
                    >
                      <span>{char}</span>
                      <button
                        onClick={() => handleRemoveCharacteristic(index)}
                        className="text-define ps-2"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {!addCharacteristic ? (
                    <button
                      onClick={() => setAddCharacteristic(true)}
                      className="badge p-1.5 rounded-lg text-define border-empathize text-[10px] font-regular"
                      style={{ fontFamily: 'Poppins', height: '27px' }}
                    >
                      +
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newCharacteristic}
                        onChange={(e) => setNewCharacteristic(e.target.value)}
                        placeholder="Personal trait"
                        className="p-1.5 rounded-lg text-define text-[10px] font-regular border border-empathize bg-transparent"
                        style={{ fontFamily: 'Poppins', height: '27px' }}
                      />
                      <button
                        onClick={handleAddCharacteristic}
                        className="badge p-1.5 rounded-lg text-define border-empathize text-[10px] font-regular"
                        style={{ fontFamily: 'Poppins', height: '27px' }}
                      >
                        Add
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Input fields */}
            <Box
              header="GRANDMA"
              content={
                <div className="p-6 space-y-4 text-[12px] tracking-widest">
                  <div className="flex gap-4">
                    <label className="font-poppins font-semibold">Name:</label>
                    <input
                      type="text"
                      value={personaInfo.name ?? ''}
                      onChange={handleInputChange('name')}
                      className="border-b border-dashed border-gray-500 w-48 bg-transparent px-2"
                    />
                    <label className="font-poppins font-semibold">Age:</label>
                    <input
                      type="number"
                      value={personaInfo.age ?? ''}
                      onChange={handleInputChange('age')}
                      className="border-b border-dashed border-gray-500 w-16 bg-transparent px-2"
                    />
                  </div>
                  <div>
                    <p className="font-poppins font-semibold">
                      Occupation and Hobbies:
                    </p>
                    <textarea
                      value={personaInfo.occupationAndHobbies}
                      onChange={handleInputChange('occupationAndHobbies')}
                      className="border border-gray-500 w-full my-2 px-2 py-1 bg-transparent"
                    />
                  </div>
                  <div>
                    <p className="font-poppins font-semibold">
                      Technology Usage:
                    </p>
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
          {/* Technology and internet usage */}
          <div className="flex flex-col space-y-10">
            <div className="space-y-2">
              <p className="text-left font-semibold text-[15px] font-poppins tracking-widest mb-6">
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
                    labelRight: 'Share Easily',
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
                    <div className="flex justify-between text-[10px] font-poppins font-regular tracking-widest text-define">
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
  );
}

export default Persona;
