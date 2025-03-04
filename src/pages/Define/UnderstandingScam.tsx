import React, { useEffect, useState } from 'react';
import ActivityPageLayout from '../../components/layout/ActivityPageLayout';
import Box from '../../components/Box';
import { useTaskProgress } from '../../context/TaskProgressContext';

interface Section {
  id: number;
  title: string;
}

const SECTIONS: Section[] = [
  { id: 1, title: 'What happened?' },
  { id: 2, title: 'Why did it happen?' },
  { id: 3, title: "What's the consequences?" },
];

function UnderstandScam() {
  const [answers, setAnswers] = useState<{ [key: number]: string[] }>(
    SECTIONS.reduce((acc, section) => ({ ...acc, [section.id]: [] }), {})
  );
  const [inputValues, setInputValues] = useState<{ [key: number]: string }>(
    SECTIONS.reduce((acc, section) => ({ ...acc, [section.id]: '' }), {})
  );
  const [editingIndex, setEditingIndex] = useState<{
    [key: number]: number | null;
  }>(SECTIONS.reduce((acc, section) => ({ ...acc, [section.id]: null }), {}));
  const { markTaskComplete, isTaskComplete } = useTaskProgress();

  // enable next button
  useEffect(() => {
    if (!isTaskComplete('/define/understand-scam')) {
      markTaskComplete('/define/understand-scam');
    }
  }, [isTaskComplete, markTaskComplete]);

  const handleInputChange = (sectionId: number, value: string) => {
    setInputValues((prev) => ({ ...prev, [sectionId]: value }));
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    sectionId: number
  ) => {
    if (e.key === 'Enter' && inputValues[sectionId]?.trim()) {
      setAnswers((prev) => {
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
    }
  };

  const handleEdit = (sectionId: number, index: number) => {
    setInputValues((prev) => ({
      ...prev,
      [sectionId]: answers[sectionId][index],
    }));
    setEditingIndex((prev) => ({ ...prev, [sectionId]: index }));
  };

  const handleDelete = (sectionId: number, index: number) => {
    setAnswers((prev) => ({
      ...prev,
      [sectionId]: prev[sectionId].filter((_, i) => i !== index),
    }));
  };

  return (
    <ActivityPageLayout
      header="Why did grandma fall for the scam?"
      phase="Define"
      phaseColor="text-define"
      activity={
        <div className="flex justify-center items-start mt-8 space-x-4 w-full">
          {SECTIONS.map((section) => (
            <div key={section.id} className="w-full sm:w-1/2 md:w-1/3">
              <Box
                header={section.title}
                fillHeight={true}
                content={
                  <div className="p-4 flex flex-col text-[12px] tracking-widest space-y-2">
                    {/* Input field */}
                    <input
                      type="text"
                      value={inputValues[section.id] || ''}
                      onChange={(e) =>
                        handleInputChange(section.id, e.target.value)
                      }
                      onKeyDown={(e) => handleKeyDown(e, section.id)}
                      placeholder="Type here ..."
                      className="w-full p-2 border-2 border-define rounded-[20px] bg-transparent text-primary focus:outline-none resize-none"
                    />

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

export default UnderstandScam;
