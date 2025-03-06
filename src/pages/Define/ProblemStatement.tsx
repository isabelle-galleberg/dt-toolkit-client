import { useState, useEffect, useRef, useCallback } from 'react';
import ActivityPageLayout from '../../components/layout/ActivityPageLayout';
import Box from '../../components/Box';
import { useTaskProgress } from '../../context/TaskProgressContext';
import { usePersonaStore } from '../../store/personaStore';
import { ProblemStatementInfo } from '../../types/problemstatement';
import {
  getProblemStatement,
  upsertProblemStatement,
} from '../../services/problemStatementService';

const ProblemStatement = () => {
  const { persona } = usePersonaStore();
  const cardId = persona?._id || '';

  const initialState: ProblemStatementInfo = {
    cardId,
    part1: '',
    part2: '',
    part3: '',
    part4: '',
    part5: '',
  };

  const [problemStatementInfo, setProblemStatementInfo] =
    useState(initialState);
  const [inputWidths, setInputWidths] = useState<Record<number, number>>({});
  const spanRefs = useRef<Record<number, HTMLSpanElement | null>>({});
  const { markTaskComplete, isTaskComplete } = useTaskProgress();

  const fetchProblemStatement = useCallback(async () => {
    if (!cardId) return;
    try {
      const fetchedProblemStatement = await getProblemStatement(cardId);
      if (fetchedProblemStatement) {
        setProblemStatementInfo(fetchedProblemStatement);
      }
    } catch (error) {
      console.error('Error fetching problem statement:', error);
    }
  }, [cardId]);

  useEffect(() => {
    fetchProblemStatement();
  }, [fetchProblemStatement]);

  useEffect(() => {
    if (!isTaskComplete('/define/problem-statement')) {
      markTaskComplete('/define/problem-statement');
    }
  }, [isTaskComplete, markTaskComplete]);

  useEffect(() => {
    Object.entries(problemStatementInfo).forEach(([key]) => {
      const sectionId = parseInt(key.replace('part', ''), 10);
      const span = spanRefs.current[sectionId];
      if (span) {
        setInputWidths((prev) => ({
          ...prev,
          [sectionId]: Math.max(span.offsetWidth + 10, 100),
        }));
      }
    });
  }, [problemStatementInfo]);

  const handleInputChange = async (sectionId: number, value: string) => {
    const key = `part${sectionId}` as keyof ProblemStatementInfo;

    setProblemStatementInfo((prev) => {
      const updatedProblemStatement = { ...prev, [key]: value };
      upsertProblemStatement(updatedProblemStatement).catch((error) => {
        console.error('Error during auto-save:', error);
      });
      return updatedProblemStatement;
    });
  };

  const renderInput = (sectionId: number) => {
    const key = `part${sectionId}` as keyof ProblemStatementInfo;

    return (
      <input
        type="text"
        name={
          ['person', 'reason', 'trickMethod', 'action', 'consequence'][
            sectionId - 1
          ]
        }
        value={problemStatementInfo[key] || ''}
        onChange={(e) => handleInputChange(sectionId, e.target.value)}
        style={{
          width: `${inputWidths[sectionId] || 100}px`,
          transition: 'width 0.3s ease',
        }}
        className="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 px-1 bg-transparent"
      />
    );
  };

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
                {renderInput(1)} fell for a phishing scam because
                {renderInput(2)}. The email used {renderInput(3)} to trick her
                into {renderInput(4)}, which led to {renderInput(5)}.
              </p>
              {[1, 2, 3, 4, 5].map((sectionId) => (
                <span
                  key={sectionId}
                  ref={(el) => (spanRefs.current[sectionId] = el)}
                  style={{ visibility: 'hidden', whiteSpace: 'pre' }}
                >
                  {
                    problemStatementInfo[
                      `part${sectionId}` as keyof ProblemStatementInfo
                    ]
                  }
                </span>
              ))}
            </div>
          }
        />
      }
    />
  );
};

export default ProblemStatement;
