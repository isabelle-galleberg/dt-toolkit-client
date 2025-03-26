import React, { useEffect, useState } from 'react';
import ActivityPageLayout from '../../components/layout/ActivityPageLayout';
import Box from '../../components/Box';
import { useTaskProgress } from '../../context/TaskProgressContext';
import {
  upsertProblemUnderstanding,
  getProblemUnderstanding,
} from '../../services/problemUnderstandingService';
import { usePersonaStore } from '../../store/personaStore';
import LoadingSpinner from '../../components/LoadingSpinner';
import ProgressBar from '../../components/ProgressBar';

interface Section {
  id: number;
  title: string;
}

const SECTIONS: Section[] = [
  { id: 1, title: 'What happened?' },
  { id: 2, title: 'Why did it happen?' },
  { id: 3, title: "What's the consequences?" },
];

const SECTION_HINTS: { [key: number]: string[] } = {
  1: [
    'What type of message or alert did the character receive, and how did they respond to it?',
    'How did the character feel when they first saw the message or offer?',
    'What actions did the character take after they interacted with the message?',
  ],
  2: [
    'What made the message seem urgent, trustworthy, or convincing to the character?',
    'Why did the character trust the email or website, even though it was a scam?',
    'How did the character’s emotions or situation influence their decision?',
  ],
  3: [
    'What did the character discover after taking action?',
    'How did the scam impact the character’s finances or personal life?',
    'What could the character have done differently to avoid falling for the scam?',
  ],
};

function ProblemUnderstanding() {
  const { persona } = usePersonaStore();
  const cardId = persona?._id || '';
  const [loading, setLoading] = useState<boolean>(true);
  const [loadHint, setLoadHint] = useState<boolean>(false);
  const { markTaskComplete, markTaskUndone, isTaskComplete } =
    useTaskProgress();
  const [answers, setAnswers] = useState<{ [key: number]: string[] } | null>(
    null
  );
  const [inputValues, setInputValues] = useState<{ [key: number]: string }>(
    SECTIONS.reduce((acc, section) => ({ ...acc, [section.id]: '' }), {})
  );
  const [editingIndex, setEditingIndex] = useState<{
    [key: number]: number | null;
  }>(SECTIONS.reduce((acc, section) => ({ ...acc, [section.id]: null }), {}));
  const [showHints, setShowHints] = useState<{ [key: number]: boolean }>({
    1: false,
    2: false,
    3: false,
  });
  const [currentHintIndex, setCurrentHintIndex] = useState<{
    [key: number]: number;
  }>({
    1: 0,
    2: 0,
    3: 0,
  });
  const [hint, setHint] = useState<string>('');

  const showNextHint = (sectionId: number) => {
    setShowHints((prev) => ({ ...prev, [sectionId]: false }));
    setLoadHint(true);

    setTimeout(() => {
      setHint(SECTION_HINTS[sectionId][currentHintIndex[sectionId]]);
      setCurrentHintIndex((prev) => {
        const currentIndex = prev[sectionId] || 0;
        const nextIndex = (currentIndex + 1) % SECTION_HINTS[sectionId].length;
        return { ...prev, [sectionId]: nextIndex };
      });

      setLoadHint(false);
      setShowHints((prev) => ({ ...prev, [sectionId]: true }));
    }, 1500);
  };

  useEffect(() => {
    if (
      answers &&
      answers[1]?.length >= 3 &&
      answers[2]?.length >= 3 &&
      answers[3]?.length >= 3
    ) {
      if (!isTaskComplete('/define/problem-understanding')) {
        markTaskComplete('/define/problem-understanding');
      }
    } else {
      if (isTaskComplete('/define/problem-understanding')) {
        markTaskUndone('/define/problem-understanding');
      }
    }
  }, [answers]);

  useEffect(() => {
    const fetchData = async () => {
      if (!cardId) return;
      setLoading(true);
      try {
        const data = await getProblemUnderstanding(cardId);
        if (data) {
          setAnswers({
            1: data.whatHappened || [],
            2: data.whyItHappened || [],
            3: data.consequences || [],
          });
        } else {
          setAnswers(
            SECTIONS.reduce(
              (acc, section) => ({ ...acc, [section.id]: [] }),
              {}
            )
          );
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch problem understanding:', error);
      }
    };

    fetchData();
  }, [cardId]);

  useEffect(() => {
    if (!answers || !cardId) return;
    const updateDatabase = async () => {
      try {
        await upsertProblemUnderstanding(
          cardId,
          answers[1] || [],
          answers[2] || [],
          answers[3] || []
        );
      } catch (error) {
        console.error('Failed to update problem understanding:', error);
      }
    };

    updateDatabase();
  }, [answers, cardId]);

  const handleInputChange = (sectionId: number, value: string) => {
    setInputValues((prev) => ({ ...prev, [sectionId]: value }));
  };

  const addAnswer = (sectionId: number) => {
    if (!inputValues[sectionId]?.trim()) return;

    setAnswers((prev) => {
      if (!prev) return prev;

      const sectionAnswers = prev[sectionId] || [];
      let updatedAnswers;

      if (editingIndex[sectionId] !== null) {
        updatedAnswers = [...sectionAnswers];
        updatedAnswers[editingIndex[sectionId]!] = inputValues[sectionId];
      } else {
        updatedAnswers = [...sectionAnswers, inputValues[sectionId]];
      }

      return { ...prev, [sectionId]: updatedAnswers };
    });

    setInputValues((prev) => ({ ...prev, [sectionId]: '' }));
    setEditingIndex((prev) => ({ ...prev, [sectionId]: null }));
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    sectionId: number
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addAnswer(sectionId);
    }
  };

  const handleEdit = (sectionId: number, index: number) => {
    if (!answers) return;
    setInputValues((prev) => ({
      ...prev,
      [sectionId]: answers[sectionId][index],
    }));
    setEditingIndex((prev) => ({ ...prev, [sectionId]: index }));
  };

  const handleDelete = (sectionId: number, index: number) => {
    setAnswers((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        [sectionId]: prev[sectionId].filter((_, i) => i !== index),
      };
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ActivityPageLayout
      header={`Why did ${persona?.alias} fall for the scam?`}
      phase="Define"
      phaseColor="text-define"
      text={
        <>
          Add as many incidents, causes, and consequences as you can think of!
        </>
      }
      activity={
        <div className="flex flex-col items-center w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full items-stretch pb-2">
            {answers &&
              SECTIONS.map((section) => (
                <div key={section.id} className="w-full">
                  <Box
                    header={section.title}
                    fillHeight={true}
                    content={
                      <div className="p-4 flex flex-col text-[12px] tracking-widest gap-3">
                        {/* Input field */}
                        <div className="relative flex items-center border-2 border-define rounded-full bg-transparent">
                          <input
                            type="text"
                            value={inputValues[section.id] || ''}
                            onChange={(e) =>
                              handleInputChange(section.id, e.target.value)
                            }
                            onKeyDown={(e) => handleKeyDown(e, section.id)}
                            placeholder="Type here ..."
                            className="w-full p-2 pr-[50px] bg-transparent text-primary focus:outline-none"
                          />
                          <button
                            onClick={() => addAnswer(section.id)}
                            disabled={!inputValues[section.id]?.trim()}
                            className="absolute right-2 px-2 py-1 text-[10px] text-empathize bg-define rounded-full disabled:opacity-50"
                          >
                            Add
                          </button>
                        </div>

                        {/* Answers list */}
                        <div className=" space-y-1">
                          {answers[section.id]?.map((answer, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center p-2 bg-define text-empathize rounded-full cursor-pointer"
                              onClick={() => handleEdit(section.id, index)}
                            >
                              <span className="truncate">{answer}</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(section.id, index);
                                }}
                                className="text-sm ml-2 text-empathize hover:text-red-500"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    }
                  />

                  {/* Hint Button */}
                  <button
                    className="px-4 text-primary text-sm hover:opacity-70 mb-2 mt-3"
                    onClick={() => showNextHint(section.id)}
                  >
                    {hint ? 'New hint' : 'Get hint'}
                  </button>
                </div>
              ))}
          </div>

          {/* Hint */}
          {(hint || loadHint) && (
            <div className="hints-container w-full text-center mt-4 flex flex-col text-primary gap-3 py-4">
              <div className="w-full flex gap-4">
                {SECTIONS.map(({ id }) => (
                  <div
                    key={id}
                    className={`w-1/3  bg-[#214A6B] p-2 rounded-[12px] text-primary flex justify-center items-center transition-all duration-500 transform relative ${
                      SECTION_HINTS[id]?.includes(hint)
                        ? 'opacity-100'
                        : loadHint && !hint && id === 1
                          ? 'opacity-100'
                          : 'opacity-0'
                    }`}
                  >
                    {loadHint ? (
                      <div>
                        <p className="text-sm pt-2">Thinking...</p>
                        <span className="loading loading-dots loading-sm"></span>
                      </div>
                    ) : (
                      <div className="text-start relative">
                        {showHints[id] && !loadHint && hint && (
                          <div className="flex flex-row space-x-2 items-center">
                            <div>💡</div>
                            <div className="text-sm">{hint}</div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          <ProgressBar phase={'define'} currentStep={2} totalSteps={4} />
        </div>
      }
    />
  );
}

export default ProblemUnderstanding;
