import { LightBulbIcon, FaceSmileIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { useTaskProgress } from '../../context/TaskProgressContext';
import {
  getFeedback,
  addPositiveFeedback,
  addImprovementFeedback,
  deletePositiveFeedback,
  deleteImprovementFeedback,
} from '../../services/feedbackService';
import ActivityPageLayout from '../../components/layout/ActivityPageLayout';

function Feedback() {
  const [positive, setPositive] = useState<string[]>([]);
  const [improvements, setImprovements] = useState<string[]>([]);
  const [positiveInput, setPositiveInput] = useState('');
  const [improvementInput, setImprovementInput] = useState('');
  const { markTaskComplete, markTaskUndone, isTaskComplete } =
    useTaskProgress();

  useEffect(() => {
    if (positive.length > 0 && improvements.length > 0) {
      if (!isTaskComplete('/test/feedback')) markTaskComplete('/test/feedback');
    } else {
      if (isTaskComplete('/test/feedback')) markTaskUndone('/test/feedback');
    }
  }, [
    positive,
    improvements,
    markTaskComplete,
    isTaskComplete,
    markTaskUndone,
  ]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const feedback = await getFeedback();
        setPositive(feedback[0].positive);
        setImprovements(feedback[0].improvements);
      } catch (err) {
        console.error('Error fetching feedback:', err);
      }
    };
    fetchFeedback();
  }, []);

  const handleAddPositive = async () => {
    if (positiveInput.trim()) {
      try {
        const updatedFeedback = await addPositiveFeedback([positiveInput]);
        setPositive(updatedFeedback.positive);
        setPositiveInput('');
      } catch (err) {
        console.error('Error adding positive feedback:', err);
      }
    }
  };

  const handleAddImprovement = async () => {
    if (improvementInput.trim()) {
      try {
        const updatedFeedback = await addImprovementFeedback([
          improvementInput,
        ]);
        setImprovements(updatedFeedback.improvements);
        setImprovementInput('');
      } catch (err) {
        console.error('Error adding improvement feedback:', err);
      }
    }
  };

  const handleDeletePositive = async (feedback: string) => {
    try {
      const updatedFeedback = await deletePositiveFeedback([feedback]);
      setPositive(updatedFeedback.positive);
    } catch (err) {
      console.error('Error deleting positive feedback:', err);
    }
  };

  const handleDeleteImprovement = async (feedback: string) => {
    try {
      const updatedFeedback = await deleteImprovementFeedback([feedback]);
      setImprovements(updatedFeedback.improvements);
    } catch (err) {
      console.error('Error deleting improvement feedback:', err);
    }
  };

  return (
    <ActivityPageLayout
      header="Does your solution work?"
      phase="Test"
      phaseColor="text-test"
      activity={
        <div className="grid grid-cols-2 gap-10">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row space-x-2">
              <FaceSmileIcon className="size-6" />
              <p>Positive Feedback</p>
            </div>
            <div className="flex flex-row space-x-2">
              <input
                type="text"
                value={positiveInput}
                onChange={(e) => setPositiveInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddPositive()}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
              <button
                onClick={handleAddPositive}
                className="btn btn-primary btn-outline"
              >
                Add
              </button>
            </div>
            <div className="space-y-2">
              {positive.map((feedback, index) => (
                <div
                  key={index}
                  className="bg-test rounded-xl p-3 text-center flex justify-between items-center"
                >
                  {feedback}
                  <button
                    className="btn-xs"
                    onClick={() => handleDeletePositive(feedback)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row space-x-2">
              <LightBulbIcon className="size-6" />
              <p>Improvements</p>
            </div>
            <div className="flex flex-row space-x-2">
              <input
                type="text"
                value={improvementInput}
                onChange={(e) => setImprovementInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddImprovement()}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
              <button
                onClick={handleAddImprovement}
                className="btn btn-primary btn-outline"
              >
                Add
              </button>
            </div>
            <div className="space-y-2">
              {improvements.map((feedback, index) => (
                <div
                  key={index}
                  className="bg-test rounded-xl p-3 text-center flex justify-between items-center"
                >
                  {feedback}
                  <button
                    className="btn-xs"
                    onClick={() => handleDeleteImprovement(feedback)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    ></ActivityPageLayout>
  );
}

export default Feedback;
