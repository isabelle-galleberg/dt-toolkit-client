import { useState, useEffect, useRef } from 'react';
import ActivityPageLayout from '../../components/layout/ActivityPageLayout';
import Box from '../../components/Box';
import { useTaskProgress } from '../../context/TaskProgressContext';

interface Section {
  id: number;
  title: string;
}

const SECTIONS: Section[] = [
  { id: 1, title: 'person' },
  { id: 2, title: 'reason' },
  { id: 3, title: 'trickMethod' },
  { id: 4, title: 'action' },
  { id: 5, title: 'consequence' },
];

function Empathize() {
  const [inputValues, setInputValues] = useState<{ [key: number]: string }>(
    SECTIONS.reduce((acc, section) => ({ ...acc, [section.id]: '' }), {})
  );

  const [inputWidths, setInputWidths] = useState<{ [key: number]: number }>({});
  const spanRefs = useRef<{ [key: number]: HTMLSpanElement | null }>({});

  const handleInputChange = (sectionId: number, value: string) => {
    setInputValues((prev) => ({ ...prev, [sectionId]: value }));
  };
  const { markTaskComplete, isTaskComplete } = useTaskProgress();

  // enable next button
  useEffect(() => {
    if (!isTaskComplete('/define/problem-statement')) {
      markTaskComplete('/define/problem-statement');
    }
  }, [isTaskComplete, markTaskComplete]);

  useEffect(() => {
    Object.keys(inputValues).forEach((key) => {
      const sectionId = parseInt(key);
      const span = spanRefs.current[sectionId];

      if (span) {
        setInputWidths((prev) => ({
          ...prev,
          [sectionId]: Math.max(span.offsetWidth + 10, 100),
        }));
      }
    });
  }, [inputValues]);

  return (
    <ActivityPageLayout
      header="Create a problem statement!"
      phase="Define"
      phaseColor="text-define"
      activity={
        <Box
          header="Problem statement"
          fillHeight={false}
          content={
            <div className="p-6">
              <p>
                <input
                  type="text"
                  name="person"
                  value={inputValues[SECTIONS[0].id] || ''}
                  onChange={(e) =>
                    handleInputChange(SECTIONS[0].id, e.target.value)
                  }
                  style={{
                    width: `${inputWidths[SECTIONS[0].id] || 100}px`,
                    transition: 'width 0.3s ease',
                  }}
                  className="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 px-1 bg-transparent"
                />{' '}
                fell for a phishing scam because{' '}
                <input
                  type="text"
                  name="reason"
                  value={inputValues[SECTIONS[1].id] || ''}
                  onChange={(e) =>
                    handleInputChange(SECTIONS[1].id, e.target.value)
                  }
                  style={{
                    width: `${inputWidths[SECTIONS[1].id] || 100}px`,
                    transition: 'width 0.3s ease',
                  }}
                  className="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 px-1 bg-transparent"
                />
                . The email used{' '}
                <input
                  type="text"
                  name="tactic"
                  value={inputValues[SECTIONS[2].id] || ''}
                  onChange={(e) =>
                    handleInputChange(SECTIONS[2].id, e.target.value)
                  }
                  style={{
                    width: `${inputWidths[SECTIONS[2].id] || 100}px`,
                    transition: 'width 0.3s ease',
                  }}
                  className="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 px-1 bg-transparent"
                />{' '}
                to trick her into{' '}
                <input
                  type="text"
                  name="action"
                  value={inputValues[SECTIONS[3].id] || ''}
                  onChange={(e) =>
                    handleInputChange(SECTIONS[3].id, e.target.value)
                  }
                  style={{
                    width: `${inputWidths[SECTIONS[3].id] || 100}px`,
                    transition: 'width 0.3s ease',
                  }}
                  className="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 px-1 bg-transparent"
                />
                , which led to{' '}
                <input
                  type="text"
                  name="consequence"
                  value={inputValues[SECTIONS[4].id] || ''}
                  onChange={(e) =>
                    handleInputChange(SECTIONS[4].id, e.target.value)
                  }
                  style={{
                    width: `${inputWidths[SECTIONS[4].id] || 100}px`,
                    transition: 'width 0.3s ease',
                  }}
                  className="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 px-1 bg-transparent"
                />
                .
              </p>
              {SECTIONS.map((section) => (
                <span
                  key={section.id}
                  ref={(el) => (spanRefs.current[section.id] = el)}
                  style={{ visibility: 'hidden', whiteSpace: 'pre' }}
                >
                  {inputValues[section.id]}
                </span>
              ))}
            </div>
          }
        />
      }
    ></ActivityPageLayout>
  );
}

export default Empathize;
