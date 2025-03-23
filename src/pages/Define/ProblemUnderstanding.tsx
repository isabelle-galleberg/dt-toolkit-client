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

interface Section {
  id: number;
  title: string;
}

const SECTIONS: Section[] = [
  { id: 1, title: 'What happened?' },
  { id: 2, title: 'Why did it happen?' },
  { id: 3, title: "What's the consequences?" },
];

function ProblemUnderstanding() {
  const { persona } = usePersonaStore();
  const cardId = persona?._id || '';
  const [loading, setLoading] = useState<boolean>(true);
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
      activity={
        <div className="flex justify-center items-start mt-8 space-x-4 w-full">
          {answers &&
            SECTIONS.map((section) => (
              <div key={section.id} className="w-full sm:w-1/2 md:w-1/3">
                <Box
                  header={section.title}
                  fillHeight={true}
                  content={
                    <div className="p-4 flex flex-col text-[12px] tracking-widest space-y-2">
                      {/* Input field */}
                      <div className="relative flex items-center border-2 border-define rounded-[20px] bg-transparent">
                        <input
                          type="text"
                          value={inputValues[section.id] || ''}
                          onChange={(e) =>
                            handleInputChange(section.id, e.target.value)
                          }
                          onKeyDown={(e) => handleKeyDown(e, section.id)}
                          placeholder="Type here ..."
                          className="w-full p-2 pr-[55px] bg-transparent text-primary focus:outline-none resize-none"
                        />
                        <button
                          onClick={() => addAnswer(section.id)}
                          disabled={!inputValues[section.id].trim()}
                          className="absolute right-2 px-2 py-1 text-[10px] text-empathize bg-define rounded-full disabled:text-base-100 disabled:bg-[color-mix(in_oklch,#e5e7eb_35%,transparent)]"
                        >
                          Add
                        </button>
                      </div>

                      {/* Answers list */}
                      <div className="overflow-auto mt-2 space-y-2">
                        {answers[section.id]?.map((answer, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-2 bg-define text-empathize rounded-[20px] cursor-pointer"
                            onClick={() => handleEdit(section.id, index)}
                          >
                            {/* Clickable answer for editing */}
                            <span className="break-words overflow-hidden text-ellipsis">
                              {answer}
                            </span>

                            {/* Delete button */}
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
              </div>
            ))}
        </div>
      }
    />
  );
}

export default ProblemUnderstanding;
