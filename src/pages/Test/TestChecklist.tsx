import { useState, useEffect, useRef } from 'react';
import ActivityPageLayout from '../../components/layout/ActivityPageLayout';
import EmailComponent from '../../components/Email';
import { useNavigate } from 'react-router-dom';
import { usePersonaStore } from '../../store/personaStore';
import {
  getFeedback,
  resetTest,
  updateTestResults,
  upsertFeedback,
} from '../../services/feedbackService';
import { useTaskProgress } from '../../context/TaskProgressContext';
import Tooltip from '../../components/Tooltip';
import { Email } from '../../types/email';
import { legitEmails, scamEmails } from '../../services/emailData';
import LoadingSpinner from '../../components/LoadingSpinner';

function TestChecklist() {
  const { persona } = usePersonaStore();

  const getRandomEmails = (numEmails = 6) => {
    const numScam = Math.floor(numEmails / 2);
    const numLegit = numEmails - numScam;

    const selectRandom = (arr: Email[], count: number) =>
      arr.sort(() => Math.random() - 0.5).slice(0, count);

    return [
      ...selectRandom(scamEmails, numScam),
      ...selectRandom(legitEmails, numLegit),
    ].sort(() => Math.random() - 0.5);
  };

  const cardId = persona?._id || '';
  const navigate = useNavigate();
  const { markTaskComplete, markTaskUndone, isTaskComplete } =
    useTaskProgress();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [emails, setEmails] = useState<Email[]>(getRandomEmails());
  const [loading, setLoading] = useState<boolean>(false);
  const numEmails = emails.length;
  const [step, setStep] = useState(1);
  const currentEmail = emails[step - 1];
  const [finalDecision, setFinalDecision] = useState<'Scam' | 'Legit' | null>(
    null
  );
  const isCorrect = currentEmail
    ? finalDecision === currentEmail.correctAnswer
    : null;
  const [testCompleted, setTestCompleted] = useState<boolean>(false);
  const isAllEmailsDone = step === numEmails + 1 || testCompleted;
  const progress =
    step > 0 ? ((step / (numEmails + 1)) * 100).toFixed(1) : '0.0';

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
    if (isAllEmailsDone) {
      if (!isTaskComplete('/test/checklist')) {
        markTaskComplete('/test/checklist');
      }
    } else {
      if (isTaskComplete('/test/checklist')) {
        markTaskUndone('/test/checklist');
      }
    }
  }, [isAllEmailsDone]);

  useEffect(() => {
    const fetchFeedbackData = async () => {
      if (!cardId) return;
      setLoading(true);
      try {
        const feedbackData = await getFeedback(cardId);

        setScore(feedbackData.score || 0);
        setTestCompleted(feedbackData.testCompleted || false);

        if (feedbackData.feedback) {
          setFeedback(feedbackData.feedback);
        }
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
      setLoading(false);
    };

    fetchFeedbackData();
  }, [cardId]);

  useEffect(() => {
    if (!cardId || feedback.length === 0) return;
    const updateFeedback = async () => {
      try {
        await upsertFeedback(cardId, feedback);
      } catch (error) {
        console.error('Failed to update feedback:', error);
      }
    };
    updateFeedback();
  }, [feedback, cardId]);

  const handleSelectEmail = () => {
    setFinalDecision(null);
    setFeedback((prev) => prev.filter((item) => item.trim() !== '•'));

    if (step === numEmails) return;
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
    handleSelectEmail();
  };

  const handleFinalDecision = (decision: 'Scam' | 'Legit') => {
    setFinalDecision(decision);

    if (currentEmail && decision === currentEmail.correctAnswer) {
      setScore((prev) => prev + 1);
    }

    scrollToBottom();
  };

  const handleRestartTest = async () => {
    setEmails(getRandomEmails());
    setScore(0);
    setStep(1);
    setTestCompleted(false);

    try {
      await resetTest(cardId);
    } catch (error) {
      console.error('Failed to reset test results:', error);
    }
  };

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const lines = e.target.value
      .split('\n')
      .filter((line) => line.trim() !== '' && line !== '•')
      .map((line) => (line.startsWith('• ') ? line : `• ${line}`));

    setFeedback(lines);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      setFeedback((prev) => [...prev, '• ']);
    }
  };

  useEffect(() => {
    handleSelectEmail();
  }, []);

  const handleTestCompletion = async () => {
    if (!cardId) return;
    setLoading(true);
    try {
      await updateTestResults(cardId, score, true);
    } catch (error) {
      console.error('Failed to update test results:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAllEmailsDone) {
      handleTestCompletion();
    }
  }, [isAllEmailsDone]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ActivityPageLayout
      header="Does your solution work?"
      phase="Test"
      phaseColor="text-test"
      text={
        <>
          {!isAllEmailsDone &&
            'Use the checklist implemented in Gearsbot to determine whether each email is a phishing scam or not.'}
        </>
      }
      activity={
        <div className="text-primary">
          <div className="gap-6">
            {currentEmail && !isAllEmailsDone && (
              <EmailComponent
                sender={currentEmail.sender}
                subject={currentEmail.subject}
                greeting={currentEmail.greeting}
                text={currentEmail.text}
                buttonText={currentEmail.buttonText}
                buttonLink={currentEmail.buttonLink}
                personal={currentEmail.personal}
              />
            )}

            {isAllEmailsDone ? (
              <div>
                {/* Score Tracking */}
                <div className="text-center mt-4 mb-8">
                  <h2 className="font-bold">🏆 YOUR SCORE</h2>
                  <p className="text-[12px]">
                    Correct Answers: {score} / {numEmails}
                  </p>
                </div>

                {/* Modify checklist button */}
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => navigate('/ideate/checklist')}
                    className="btn w-full text-[14px] px-4 py-2 rounded-md bg-primary text-base-100 border border-primary hover:bg-ideate  hover:text-primary hover:border-primary transition"
                  >
                    Modify Checklist
                  </button>
                </div>

                {/* Restart test button */}
                <div className="mt-2 flex justify-center">
                  <button
                    onClick={handleRestartTest}
                    className="btn w-full text-[14px] px-4 py-2 rounded-md bg-base-100 text-primary border border-primary hover:bg-base-100 hover:text-test hover:border-test transition"
                  >
                    Restart Test
                  </button>
                </div>

                <p className="font-bold text-primary px-4 mt-4">FEEDBACK</p>
                {feedback.length > 0 ? (
                  <div className="min-w-80 bg-test px-4 py-2 rounded-[12px] text-prototype text-[14px] mt-2">
                    <ul className="space-y-1 pe-2">
                      {feedback.map((item, index) => (
                        <li key={index} className="text-left">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-gray-500 text-[12px] mt-2 min-w-80 px-4">
                    No feedback provided.
                  </p>
                )}
              </div>
            ) : (
              <div className="mt-6 text-[14px]">
                <p>Is this email a scam?</p>
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={() => handleFinalDecision('Scam')}
                    className={`btn border hover:bg-primary hover:text-base-100 ${
                      finalDecision === 'Scam'
                        ? isCorrect
                          ? 'bg-empathize text-define border-define'
                          : 'bg-[#902F39] text-red-200 border-red-200'
                        : 'bg-base-100 text-primary border-primary'
                    }`}
                  >
                    Yes, it's a scam!
                  </button>
                  <button
                    onClick={() => handleFinalDecision('Legit')}
                    className={`btn border hover:bg-primary hover:text-base-100 ${
                      finalDecision === 'Legit'
                        ? isCorrect
                          ? 'bg-empathize text-define border-define'
                          : 'bg-[#902F39] text-red-200 border-red-200'
                        : 'bg-base-100 text-primary border-primary'
                    }`}
                  >
                    No, it's legit!
                  </button>
                </div>
              </div>
            )}
          </div>

          {finalDecision && !isAllEmailsDone && (
            <div>
              <div
                className={`mt-2 p-4 rounded-md text-[12px] ${isCorrect ? 'bg-empathize text-define' : 'bg-[#902F39] text-red-200'}`}
              >
                <p className="text-[16px]">
                  {isCorrect
                    ? 'Correct! You analyzed this email correctly!'
                    : `Incorrect! This email was actually ${currentEmail?.correctAnswer.toLowerCase()}. Review the checklist.`}
                </p>

                {currentEmail?.correctAnswer === 'Scam' && (
                  <>
                    <p className="mt-2 font-bold">🔎 Identified Scam Signs</p>
                    <ul className="text-left list-disc list-inside">
                      {currentEmail.scamSigns.map((sign, index) => (
                        <li key={index}>{sign}</li>
                      ))}
                    </ul>
                  </>
                )}
                <h2 className="mt-4 font-bold">💡 Explanation</h2>
                <p>{currentEmail?.explanation}</p>
              </div>
              <div ref={scrollRef}>
                <div className="flex flex-row items-center h-full mt-2 space-x-2">
                  <p className="text-[14px]">Checklist feedback</p>
                  <Tooltip
                    text="What worked well in the checklist? How could it be improved to help you better identify phishing scams?"
                    position="right"
                  />
                </div>
                <textarea
                  value={feedback.join('\n')}
                  onChange={handleFeedbackChange}
                  onKeyDown={handleKeyDown}
                  placeholder="• Type here..."
                  className="mt-1 p-2 w-full text-[14px] rounded-md border border-primary text-primary bg-base-100"
                  rows={4}
                  ref={(el) => {
                    if (el) {
                      el.style.height = 'auto';
                      el.style.height = el.scrollHeight + 'px';
                    }
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = target.scrollHeight + 'px';
                  }}
                />
              </div>
              <div className="mt-1 flex justify-end" ref={scrollRef}>
                {/* TODO: remove bottom to navbar */}
                <button
                  onClick={handleNext}
                  className="btn w-24 text-[14px] px-4 py-2 rounded-md bg-base-100 text-primary border border-primary hover:bg-primary hover:text-base-100 transition"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Progress */}
          {/* {!isAllEmailsDone && ( */}
          <div className="fixed bottom-20 left-0 w-full z-5 space-y-1">
            {!testCompleted && !isAllEmailsDone ? (
              <p className="text-[12px] text-center font-semibold text-test">
                {step} out of {numEmails} emails! Keep going!
              </p>
            ) : (
              <p className="text-[12px] text-center font-semibold text-test">
                Test completed!
              </p>
            )}

            <div className="bg-base-100 h-2">
              <div
                className="h-2 bg-test transition-all duration-300"
                style={{
                  width: testCompleted ? '100%' : `${progress}%`,
                }}
              ></div>
            </div>
          </div>
          {/* )} */}
        </div>
      }
    />
  );
}

export default TestChecklist;
