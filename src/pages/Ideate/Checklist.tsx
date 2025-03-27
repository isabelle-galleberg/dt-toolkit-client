import { useState, useEffect, useRef } from 'react';
import {
  getChecklist,
  addChecklistItem,
  deleteChecklistItem,
  handleChecklistFeedback,
} from '../../services/checklistService';
import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/solid';
import ActivityPageLayout from '../../components/layout/ActivityPageLayout';
import { ChecklistFeedback, ChecklistItem } from '../../types/checklist';
import { useTaskProgress } from '../../context/TaskProgressContext';
import { usePersonaStore } from '../../store/personaStore';
import { getFeedback } from '../../services/feedbackService';
import {
  getAiFeedback,
  updateAiFeedback,
} from '../../services/aiFeedbackService';
import ProgressBar from '../../components/ProgressBar';
import LoadingSpinner from '../../components/LoadingSpinner';

const Checklist = () => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [newItemText, setNewItemText] = useState<string>('');
  const [generatedFeedback, setGeneratedFeedback] =
    useState<ChecklistFeedback | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingFeedback, setLoadingFeedback] = useState<boolean>(false);
  const { markTaskComplete, markTaskUndone, isTaskComplete } =
    useTaskProgress();
  const { persona } = usePersonaStore();
  const cardId = persona?._id || '';
  const [feedback, setFeedback] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (scrollRef.current) {
        window.scrollTo({
          top:
            scrollRef.current.getBoundingClientRect().top +
            window.scrollY -
            100,
          behavior: 'smooth',
        });
      }
    }, 300);
  };

  useEffect(() => {
    if (checklist.length >= 4) {
      if (!isTaskComplete('/ideate/checklist')) {
        markTaskComplete('/ideate/checklist');
      }
    } else {
      if (isTaskComplete('/ideate/checklist')) {
        markTaskUndone('/ideate/checklist');
      }
    }
  }, [checklist]);

  useEffect(() => {
    const fetchChecklist = async () => {
      setLoading(true);
      try {
        const data = await getChecklist();
        setChecklist(data);
      } catch (error) {
        console.error('Error loading checklist', error);
      } finally {
        setLoading(false);
      }
    };
    fetchChecklist();
  }, []);

  const handleAddItem = async () => {
    if (newItemText.trim()) {
      try {
        const newItem = await addChecklistItem(newItemText);
        setChecklist((prev) => [...prev, newItem]);
        setNewItemText('');
        handleGeneratedFeedback(); // generate feedback after adding an item
      } catch (error) {
        console.error('Error adding item', error);
      }
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      await deleteChecklistItem(id);
      setChecklist((prev) => prev.filter((item) => item._id !== id));
      if (checklist.length === 1) {
        setGeneratedFeedback(null);
        return;
      }
      handleGeneratedFeedback();
    } catch (error) {
      console.error('Error deleting item', error);
    }
  };

  const handleGeneratedFeedback = async () => {
    if (checklist.length < 1) {
      setGeneratedFeedback(null);
      return;
    }
    setLoadingFeedback(true);
    try {
      const checklistText = checklist.map((item) => item.text);
      const feedbackData = await handleChecklistFeedback(checklistText);
      setGeneratedFeedback(feedbackData);
    } catch (error) {
      console.error('Error generating feedback:', error);
    } finally {
      setLoadingFeedback(false);
    }
    scrollToBottom();
  };

  useEffect(() => {
    if (!cardId) return;
    const fetchFeedback = async () => {
      setLoading(true);
      try {
        const data = await getFeedback(cardId);
        setFeedback(data.feedback);
      } catch (error) {
        console.error('Failed to fetch feedback:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedback();
  }, [cardId]);

  useEffect(() => {
    const fetchAiFeedbackData = async () => {
      try {
        const aiFeedbackData = await getAiFeedback();
        if (aiFeedbackData.strengths && aiFeedbackData.improvements) {
          setGeneratedFeedback(aiFeedbackData);
        }
      } catch (error) {
        console.error('Error fetching feedback:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAiFeedbackData();
  }, []);

  useEffect(() => {
    if (
      generatedFeedback?.strengths === undefined ||
      generatedFeedback?.improvements === undefined
    )
      return;
    const setAiFeedback = async () => {
      try {
        await updateAiFeedback(
          generatedFeedback?.strengths,
          generatedFeedback?.improvements
        );
      } catch (error) {
        console.error('Failed to update feedback:', error);
      }
    };
    setAiFeedback();
  }, [generatedFeedback]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ActivityPageLayout
      header="Create a Scam Spotter Checklist!"
      phase="Ideate"
      phaseColor="text-ideate"
      text={
        <div className="flex flex-row space-x-2">
          Enter questions to create a checklist for spotting phishing scams in
          emails!
        </div>
      }
      activity={
        <div className="flex flex-col max-w-4xl w-full space-y-4">
          <div className="flex flex-row space-x-6">
            <div className="space-y-2 w-1/2 bg-base-100 border border-primary p-3 rounded-[12px]">
              <p className="font-bold text-primary mx-2">
                PHISHING DETECTION CHECKLIST
              </p>
              <div className="flex flex-row space-x-2 text-[14px] mx-2">
                <input
                  type="text"
                  value={newItemText}
                  onChange={(e) => setNewItemText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddItem();
                    }
                  }}
                  placeholder="Type here ..."
                  className="p-2 w-full text-[14px] rounded-[12px] text-primary bg-base-100 border border-primary"
                />
                <button
                  onClick={handleAddItem}
                  className="btn bg-ideate rounded-[12px] text-primary hover:bg-ideate py-3 px-6 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Add
                </button>
              </div>
              <ul className="p-2 rounded-[20px] min-h-64 h-full text-[14px]">
                <div className="text-primary flex flex-row space-x-4 items-center rounded-[12px] bg-[#214A6B] p-2 py-3">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-success checkbox-sm rounded-md border-2 border-primary hover:bg-primary hover:border-none"
                  />
                  <div>Does the email ask for personal information?</div>
                </div>
                {checklist.map((item) => (
                  <li key={item._id}>
                    <div className="flex flex-row space-x-4 w-full items-center justify-between p-2 my-1 rounded-[12px] bg-[#214A6B] text-primary">
                      <div className="flex space-x-4 flex-row items-center my-1">
                        <div className="w-5 h-5">
                          <input
                            type="checkbox"
                            id={`check-${item._id}`}
                            className="checkbox checkbox-success checkbox-sm rounded-md border-2 border-primary hover:bg-primary hover:border-none"
                            style={{ accentColor: 'green' }}
                          />
                        </div>
                        <label
                          htmlFor={`check-${item._id}`}
                          className="text-primary "
                        >
                          {item.text}
                        </label>
                      </div>
                      <button
                        onClick={() => handleDeleteItem(item._id)}
                        className="text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-1/2">
              <div>
                {feedback.length > 0 && (
                  <div className="mb-4">
                    <p className="font-bold text-primary">RECEIVED FEEDBACK</p>
                    <div className="w-full bg-test px-4 py-2 rounded-[12px] text-prototype text-[14px] mt-2">
                      <ul className="space-y-1">
                        {feedback.map((item, index) => (
                          <li key={index} className="text-left">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                <p className="font-bold text-primary">FEEDBACK</p>
                <div className="text-[14px]">
                  {checklist.length < 2 && (
                    <div className="text-primary mt-6">
                      Add more items to the checklist to receive feedback.
                    </div>
                  )}
                  {loadingFeedback && checklist.length >= 2 && (
                    <div className="mt-4 text-primary">
                      <p className="font-medium">Generating feedback</p>
                      <span className="loading loading-dots loading-sm"></span>
                    </div>
                  )}
                  {!loadingFeedback &&
                    checklist.length >= 2 &&
                    !generatedFeedback && (
                      <div className="text-primary mt-2">
                        Get feedback by modifying the checklist.
                      </div>
                    )}
                  {generatedFeedback &&
                    !loadingFeedback &&
                    checklist.length >= 2 && (
                      <div ref={scrollRef}>
                        <ul className="space-y-1 mt-2">
                          {generatedFeedback.strengths
                            .split('\n')
                            .map((item, index) => (
                              <li
                                key={index}
                                className="bg-[#214A6B] p-2 rounded-[12px] text-primary flex flex-row space-x-3 items-center"
                              >
                                <div className="w-5 h-5">
                                  <PlusCircleIcon className="w-5 h-5 text-green-600 font-bold" />
                                </div>
                                <div> {item.replace(/^-\s*/, '')}</div>
                              </li>
                            ))}
                        </ul>
                        <div className="mt-1">
                          <ul className="space-y-1">
                            {generatedFeedback.improvements
                              .split('\n')
                              .map((item, index) => (
                                <li
                                  key={index}
                                  className="bg-[#214A6B] p-2 rounded-[12px] text-primary flex flex-row space-x-3 items-center"
                                >
                                  <div className="w-5 h-5">
                                    <MinusCircleIcon className="w-5 h-5 text-red-600" />
                                  </div>
                                  <div> {item.replace(/^-\s*/, '')}</div>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
          <ProgressBar phase={'ideate'} currentStep={1} totalSteps={2} />
        </div>
      }
    />
  );
};

export default Checklist;
