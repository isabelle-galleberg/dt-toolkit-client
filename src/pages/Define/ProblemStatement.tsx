import { useState, useEffect, useCallback, useRef } from 'react';
import ActivityPageLayout from '../../components/layout/ActivityPageLayout';
import Box from '../../components/Box';
import { useTaskProgress } from '../../context/TaskProgressContext';
import { usePersonaStore } from '../../store/personaStore';
import { ProblemStatementInfo } from '../../types/problemstatement';
import {
  getProblemStatement,
  upsertProblemStatement,
} from '../../services/problemStatementService';
import LoadingSpinner from '../../components/LoadingSpinner';
import ProgressBar from '../../components/ProgressBar';

const questions = [
  'Who got scammed?',
  'Why did they fall for the scam?',
  'What tactic was used? (urgency, fear, ...)',
  'What did the scammer trick them into doing?',
  'What was the result?',
];

const ProblemStatement = () => {
  const { persona } = usePersonaStore();
  const { markTaskComplete, markTaskUndone, isTaskComplete } =
    useTaskProgress();
  const cardId = persona?._id || '';
  const [loading, setLoading] = useState<boolean>(true);

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
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    sectionId: number
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const nextInput = inputRefs.current[sectionId];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const fetchProblemStatement = useCallback(async () => {
    if (!cardId) return;
    setLoading(true);
    try {
      const fetchedProblemStatement = await getProblemStatement(cardId);
      if (fetchedProblemStatement) {
        setProblemStatementInfo(fetchedProblemStatement);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching problem statement:', error);
    }
  }, [cardId]);

  useEffect(() => {
    fetchProblemStatement();
  }, [fetchProblemStatement]);

  useEffect(() => {
    const allPartsFilled = Object.values(problemStatementInfo).every(
      (part) => part !== ''
    );
    if (allPartsFilled) {
      if (!isTaskComplete('/define/problem-statement')) {
        markTaskComplete('/define/problem-statement');
      }
    } else {
      if (isTaskComplete('/define/problem-statement')) {
        markTaskUndone('/define/problem-statement');
      }
    }
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

  const renderInputBox = (sectionId: number) => {
    const key = `part${sectionId}` as keyof ProblemStatementInfo;

    return (
      <div
        key={sectionId}
        className="flex items-center pl-3 p-1 border-2 border-define rounded-3xl bg-base-100 text-[14px] tracking-widest font-extralight"
      >
        <p className="w-full">{questions[sectionId - 1]}</p>
        <input
          ref={(el) => (inputRefs.current[sectionId - 1] = el)}
          type="text"
          maxLength={50}
          value={problemStatementInfo[key] || ''}
          onChange={(e) => handleInputChange(sectionId, e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, sectionId)}
          placeholder="Type here ..."
          className="w-full p-1 pl-2 bg-define rounded-[20px] text-empathize focus:outline-none resize-none placeholder-empathize placeholder-opacity-70"
        />
      </div>
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ActivityPageLayout
      header="Create a problem statement!"
      phase="Define"
      phaseColor="text-define"
      activity={
        <div className="space-y-4 w-full text-primary">
          <Box
            header="Problem statement"
            fillHeight={false}
            content={
              <p className="p-6">
                <strong>{problemStatementInfo.part1 || '_ _ _ _ _'}</strong>{' '}
                fell for a phishing scam because{' '}
                <strong>{problemStatementInfo.part2 || '_ _ _ _ _'}</strong>.
                The email used{' '}
                <strong>{problemStatementInfo.part3 || '_ _ _ _ _'}</strong> to
                trick them into{' '}
                <strong>{problemStatementInfo.part4 || '_ _ _ _ _'}</strong>,
                which led to{' '}
                <strong>{problemStatementInfo.part5 || '_ _ _ _ _'}</strong>.
              </p>
            }
          />
          <div className="space-y-3 pt-6">
            {[1, 2, 3, 4, 5].map((sectionId) => renderInputBox(sectionId))}
          </div>
          <ProgressBar phase={'define'} currentStep={3} totalSteps={5} />
        </div>
      }
    />
  );
};

export default ProblemStatement;
