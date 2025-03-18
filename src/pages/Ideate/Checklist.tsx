import { useState, useEffect } from 'react';
import {
  getChecklist,
  addChecklistItem,
  deleteChecklistItem,
  handleChecklistFeedback,
} from '../../services/checklistService';
import { TrashIcon } from '@heroicons/react/24/solid';
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
    if (checklist.length >= 8 && !isTaskComplete('/ideate/checklist')) {
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

    const savedFeedback = localStorage.getItem('feedback');
    if (savedFeedback) {
      setFeedback(JSON.parse(savedFeedback));
    }
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
      const result = await deleteChecklistItem(id);
      console.log(result.message);
      setChecklist((prev) => prev.filter((item) => item._id !== id));
      handleFeedback(); // Generate feedback after deleting an item
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

      localStorage.setItem('feedback', JSON.stringify(feedbackData));
    } catch (error) {
      console.error('Error generating feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ActivityPageLayout
      header="Create a checklist!"
      phase="Ideate"
      phaseColor="text-ideate"
      activity={
        <div className="flex flex-row space-x-6 max-w-4xl w-full">
          <div className="w-1/2 space-y-4">
            <div className="flex flex-row space-x-4 items-center">
              <input
                type="text"
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                placeholder="Type here..."
                className="w-full p-3 border-2 border-primary rounded-[12px] bg-transparent text-primary focus:outline-none transition duration-300 ease-in-out hover:border-primary-light"
              />
              <button
                onClick={handleAddItem}
                className="btn btn-primary py-3 px-6 rounded-[12px] transition duration-300 ease-in-out transform hover:scale-105"
              >
                Add Item
              </button>
            </div>
            <div className="border-2 border-primary rounded-md p-4 space-y-4">
              <ul>
                {checklist.map((item) => (
                  <li
                    key={item._id}
                    className="flex justify-between items-center space-x-4"
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id={`check-${item._id}`}
                        className="form-checkbox h-5 w-5 text-ideate"
                      />
                      <label
                        htmlFor={`check-${item._id}`}
                        className="text-lg text-primary flex-1"
                      >
                        {item.text}
                      </label>
                    </div>
                    <button
                      onClick={() => handleDeleteItem(item._id)}
                      className="text-primary transition duration-300 ease-in-out"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-1/2">
            {loading && (
              <div className="mt-4 text-primary">
                <p className="text-lg">Generating feedback</p>
                <div className="inline-block animate-pulse">
                  <span className="dot">.</span>
                  <span className="dot">.</span>
                  <span className="dot">.</span>
                </div>
              </div>
            )}
            {feedback && !loading && (
              <div className="mt-4">
                <div>
                  <h3 className="text-lg font-semibold">Strengths</h3>
                  <ul className="list-disc pl-5">
                    {feedback.strengths.split('\n').map((item, index) => (
                      <li key={index}>{item.replace(/^-\s*/, '')}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-2">
                  <h3 className="text-lg font-semibold">Improvements</h3>
                  <ul className="list-disc pl-5">
                    {feedback.improvements.split('\n').map((item, index) => (
                      <li key={index}>{item.replace(/^-\s*/, '')}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      }
    />
  );
};

export default Checklist;
