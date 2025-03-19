import { useState, useEffect } from 'react';
import {
  getChecklist,
  addChecklistItem,
  deleteChecklistItem,
  handleChecklistFeedback,
} from '../../services/checklistService';
import {
  TrashIcon,
  PlusCircleIcon,
  MinusCircleIcon,
} from '@heroicons/react/24/solid';
import ActivityPageLayout from '../../components/layout/ActivityPageLayout';
import { ChecklistFeedback, ChecklistItem } from '../../types/checklist';
import { useTaskProgress } from '../../context/TaskProgressContext';

const Checklist = () => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [newItemText, setNewItemText] = useState<string>('');
  const [feedback, setFeedback] = useState<ChecklistFeedback | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { markTaskComplete, isTaskComplete } = useTaskProgress();

  useEffect(() => {
    if (checklist.length >= 5 && !isTaskComplete('/ideate/checklist')) {
      markTaskComplete('/ideate/checklist');
    }
  }, [checklist]);

  useEffect(() => {
    const fetchChecklist = async () => {
      try {
        const data = await getChecklist();
        setChecklist(data);
      } catch (error) {
        console.error('Error loading checklist', error);
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
        handleFeedback(); // Generate feedback after adding an item
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
        setFeedback(null);
        return;
      }
      handleFeedback();
    } catch (error) {
      console.error('Error deleting item', error);
    }
  };

  const handleFeedback = async () => {
    setLoading(true);
    try {
      const checklistText = checklist.map((item) => item.text);
      const feedbackData = await handleChecklistFeedback(checklistText);
      setFeedback(feedbackData);
    } catch (error) {
      console.error('Error generating feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ActivityPageLayout
      header="Create a Scam Spotter Checklist!"
      phase="Ideate"
      phaseColor="text-ideate"
      activity={
        <div className="flex flex-col max-w-4xl w-full space-y-4">
          <div className="flex flex-col space-y-2 items-center border-2 border-primary p-4 rounded-[20px]">
            <p className="text-left text-primary w-full">
              ENTER QUESTIONS TO HELP SPOT PHISHING IN EMAILS
            </p>
            <div className="flex flex-row w-full space-x-4">
              <input
                type="text"
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                placeholder="Does the email ask for personal information?"
                className="w-full p-3 rounded-[12px] bg-white placeholder-gray-700 text-black"
              />
              <button
                onClick={handleAddItem}
                className="btn btn-primary py-3 px-6 rounded-[12px] transition duration-300 ease-in-out transform hover:scale-105"
              >
                Add
              </button>
            </div>
          </div>
          <div className="flex flex-row space-x-6">
            <div className="space-y-2 w-1/2">
              <p className="font-bold text-primary">SCAM SPOTTER CHECKLIST</p>
              <ul className="bg-primary p-4 rounded-[20px] min-h-64 h-full">
                {checklist.map((item) => (
                  <li key={item._id}>
                    <div className="flex flex-row space-x-4 w-full items-center justify-between">
                      <div className="flex space-x-4 flex-row items-center ">
                        <input
                          type="checkbox"
                          id={`check-${item._id}`}
                          className="form-checkbox h-5 w-5 checked:bg-ideate checked:border-transparent"
                        />
                        <label
                          htmlFor={`check-${item._id}`}
                          className=" text-black "
                        >
                          {item.text}
                        </label>
                      </div>
                      <button
                        onClick={() => handleDeleteItem(item._id)}
                        className="text-primary transition duration-300 ease-in-out"
                      >
                        <TrashIcon className="w-5 h-5 text-ideate" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-1/2">
              <div>
                <p className="font-bold text-primary">FEEDBACK</p>
                <div>
                  {loading && (
                    <div className="mt-4 text-primary">
                      <p className="font-medium">Generating feedback</p>
                      <div className="inline-block animate-pulse">
                        <span className="dot">.</span>
                        <span className="dot">.</span>
                        <span className="dot">.</span>
                      </div>
                    </div>
                  )}
                  {!feedback && checklist.length > 0 && !loading && (
                    <button
                      onClick={handleFeedback}
                      className="mt-2 btn btn-primary py-3 px-6 rounded-[12px] transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      Generate Feedback
                    </button>
                  )}
                  {feedback && !loading && (
                    <>
                      <ul className="space-y-1 mt-2">
                        {feedback.strengths.split('\n').map((item, index) => (
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
                          {feedback.improvements
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
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default Checklist;
