import { useEffect, useState } from 'react';
import { useTaskProgress } from '../../context/TaskProgressContext';
import ActivityPageLayout from '../../components/layout/ActivityPageLayout';
import { getChecklist } from '../../services/checklistService';
import { ChecklistItem } from '../../types/checklist';

function GearsBot() {
  const { markTaskComplete, isTaskComplete } = useTaskProgress();
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);

  useEffect(() => {
    if (!isTaskComplete('/prototype/gearsbot')) {
      markTaskComplete('/prototype/gearsbot');
    }
  }, [isTaskComplete, markTaskComplete]);

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

  return (
    <ActivityPageLayout
      header={'GearsBot'}
      phase="Prototype"
      phaseColor="text-prototype"
      text={
        <>
          Click to launch GearsBot and start building your scam checklist tool!
        </>
      }
      activity={
        <div className="flex flex-row justify-between w-full">
          <button
            className="btn bg-prototype text-test px-6 py-2 hover:bg-prototype hover:text-test hover:border-test"
            onClick={() =>
              window.open('https://gears.aposteriori.com.sg', '_blank')
            }
          >
            GO TO GEARSBOT
          </button>
          <ul className="p-4 rounded-[12px] min-h-64 h-full text-[14px] bg-base-100 border">
            <div className="font-bold mb-2 text-primary">
              PHISHING DETECTION CHECKLIST
            </div>
            <div className="text-primary flex flex-row space-x-4 items-center rounded-[12px] bg-[#214A6B] p-2 py-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5"
                style={{ accentColor: 'green' }}
              />
              <div>Does the email ask for personal information?</div>
            </div>
            {checklist.map((item) => (
              <li key={item._id}>
                <div className="w-full p-2 rounded-[12px] bg-[#214A6B] text-primary flex space-x-4 flex-row items-center my-1">
                  <div className="w-5 h-5">
                    <input
                      type="checkbox"
                      id={`check-${item._id}`}
                      className="form-checkbox h-5 w-5"
                      style={{ accentColor: 'green' }}
                    />
                  </div>
                  <label htmlFor={`check-${item._id}`} className="text-primary">
                    {item.text}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      }
    />
  );
}

export default GearsBot;
