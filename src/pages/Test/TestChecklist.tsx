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

interface Email {
  sender: string;
  subject: string;
  content: JSX.Element;
  buttonText: string;
  buttonLink: string;
  correctAnswer: 'Scam' | 'Legit';
  scamSigns: string[];
  explanation: string;
}

const scamEmails: Email[] = [
  {
    sender: 'From: Microsoft Support',
    subject: 'Subject: Your Office 365 subscription has expired',
    content: (
      <>
        <p>Dear Customer,</p>
        <p className="mt-2">
          We noticed your Office 365 subscription has expired. To continue using
          your services without interruption, please update your payment
          details.
        </p>
      </>
    ),
    buttonText: 'Renew Subscription',
    buttonLink: 'https://microsoft-office-billing.com',
    correctAnswer: 'Scam',
    scamSigns: ['Fake urgency', 'Suspicious link'],
    explanation:
      'Microsoft does not send renewal requests with external payment links. Always renew through the official Office website.',
  },
  {
    sender: 'From: Instagram Security',
    subject: 'Subject: Your account is at risk of being banned!',
    content: (
      <>
        <p>Hi,</p>
        <p className="mt-2">
          We detected unusual activity on your Instagram account. If you don't
          verify within 24 hours, your account may be suspended.
        </p>
      </>
    ),
    buttonText: 'Verify Account',
    buttonLink: 'https://instagram-security-alerts.com',
    correctAnswer: 'Scam',
    scamSigns: ['Threats of suspension', 'Fake urgency', 'Suspicious link'],
    explanation:
      'Instagram does not send emails threatening account suspension in this manner. Always check notifications within the app.',
  },
  {
    sender: 'From: Spotify Team',
    subject: "Subject: 🎁 You've won a free 1-year Spotify Premium membership!",
    content: (
      <>
        <p>Congratulations!</p>
        <p className="mt-2">
          You have been randomly selected to receive a free 1-year Spotify
          Premium subscription. Click below to claim your reward.
        </p>
      </>
    ),
    buttonText: 'Claim Your Prize',
    buttonLink: 'https://spotify-premium-free.com',
    correctAnswer: 'Scam',
    scamSigns: ['Unrealistic offer', 'Suspicious link'],
    explanation:
      'Spotify does not randomly give away free subscriptions via email. Be cautious of too-good-to-be-true offers.',
  },
  {
    sender: 'From: Your Friend Alex',
    subject: 'Subject: Hey, check this out!',
    content: (
      <>
        <p>Hey Emma,</p>
        <p className="mt-2">
          I found this really cool website where you can win prizes just for
          signing up. You should totally check it out!
        </p>
      </>
    ),
    buttonText: 'Visit Website',
    buttonLink: 'https://freemoney-deals.com',
    correctAnswer: 'Scam',
    scamSigns: ['Casual tone but suspicious link'],
    explanation:
      'Even if an email appears to come from a friend, scammers can spoof email addresses. Verify with your friend first before clicking any links.',
  },
  {
    sender: 'From: Apple Rewards <support@applerewardz.com>',
    subject: 'Subject: 🎉 Congratulations! You won a brand-new iPhone 15!',
    content: (
      <>
        <p>Dear Customer,</p>
        <p className="mt-2">
          You have been randomly selected to receive a free iPhone 15! Click the
          button below to claim your prize before it's too late.
        </p>
      </>
    ),
    buttonText: 'Claim My iPhone',
    buttonLink: 'https://apple-gift-free.com',
    correctAnswer: 'Scam',
    scamSigns: ['Unrealistic offer', 'Suspicious link'],
    explanation:
      'Apple does not give away free iPhones via email. Always verify offers directly on the official Apple website.',
  },
  {
    sender: 'From: Netflix Support <security@netflix-alert.com>',
    subject: 'Subject: ⚠️ Immediate Action Required: Your Netflix Account!',
    content: (
      <>
        <p>Dear Customer,</p>
        <p className="mt-2">
          We have detected unusual activity on your Netflix account. If you do
          not verify your details within 24 hours, your account will be
          permanently suspended.
        </p>
      </>
    ),
    buttonText: 'Verify My Account',
    buttonLink: 'https://netflix-security-verification.com',
    correctAnswer: 'Scam',
    scamSigns: ['Fake urgency', 'Generic greeting'],
    explanation:
      'Netflix will never pressure you to verify your account like this. Always check your account status directly on the official Netflix website.',
  },
  {
    sender: 'From: Bank Security <support@dnb-secure-login.com>',
    subject: 'Subject: Urgent! Your Account Has Been Temporarily Locked',
    content: (
      <>
        <p>Dear Valued Customer,</p>
        <p className="mt-2">
          Due to suspicious activity, we have temporarily locked your bank
          account. To restore access, please confirm your identity by providing
          your login details and credit card number.
        </p>
      </>
    ),
    buttonText: 'Unlock My Account',
    buttonLink: 'https://dnb-security-login.com',
    correctAnswer: 'Scam',
    scamSigns: ['Requests sensitive information', 'Suspicious sender address'],
    explanation:
      'Banks never ask for login details or card information via email. Always log in through your bank’s official website.',
  },
  {
    sender: 'From: Vipps Support <support@vippz.com>',
    subject: 'Subject: 💰 You have received NOK 500!',
    content: (
      <>
        <p>Hi,</p>
        <p className="mt-2">
          Your friend has sent you NOK 500 via Vipps. To accept the payment,
          click the button below and log in to your Vipps account.
        </p>
      </>
    ),
    buttonText: 'Claim Money',
    buttonLink: 'https://vipps-payouts.net',
    correctAnswer: 'Scam',
    scamSigns: ['Suspicious link', 'Spelling mistake in sender address'],
    explanation:
      'Vipps does not send emails like this. If someone sends you money, you will see it directly in the Vipps app.',
  },
];

const legitEmails: Email[] = [
  {
    sender: 'From: Amazon Orders',
    subject: 'Subject: Your order has been shipped!',
    content: (
      <>
        <p>Hello John,</p>
        <p className="mt-2">
          Your order <b>#5678-1234</b> has been shipped. You can track it
          through your Amazon account.
        </p>
      </>
    ),
    buttonText: 'Track My Package',
    buttonLink: 'https://www.amazon.com/orders',
    correctAnswer: 'Legit',
    scamSigns: [],
    explanation:
      'Amazon sends order updates with direct links to your account. No suspicious payment requests.',
  },
  {
    sender: 'From: Snapchat <support@snapchat.com>',
    subject: "Subject: We've Updated Our Privacy Policy",
    content: (
      <>
        <p>Hello,</p>
        <p className="mt-2">
          We have updated our Privacy Policy, effective May 1, 2025. You do not
          need to take any action, but we encourage you to review the updates.
        </p>
      </>
    ),
    buttonText: 'Review Policy',
    buttonLink: 'https://www.snapchat.com/privacy',
    correctAnswer: 'Legit',
    scamSigns: [],
    explanation:
      'Snapchat notifies users of policy updates without requiring immediate action or personal details.',
  },
  {
    sender: 'From: Spotify <no-reply@spotify.com>',
    subject: 'Subject: Your Spotify Premium Payment Was Successful',
    content: (
      <>
        <p>Hi Noah,</p>
        <p className="mt-2">
          Your payment for Spotify Premium has been processed successfully. Your
          next billing date is May 15, 2025.
        </p>
      </>
    ),
    buttonText: 'Manage Subscription',
    buttonLink: 'https://www.spotify.com/account',
    correctAnswer: 'Legit',
    scamSigns: [],
    explanation:
      'Spotify sends confirmation emails without requesting additional payment details or login credentials.',
  },
  {
    sender: 'From: TikTok <no-reply@tiktok.com>',
    subject: 'Subject: Your TikTok Verification Code',
    content: (
      <>
        <p>Hello,</p>
        <p className="mt-2">
          Your TikTok verification code is: <b>847293</b>. Enter this code to
          complete your login. If you didn't request this, you can ignore this
          email.
        </p>
      </>
    ),
    buttonText: 'Go to TikTok',
    buttonLink: 'https://www.tiktok.com/login',
    correctAnswer: 'Legit',
    scamSigns: [],
    explanation:
      'TikTok only sends verification codes when requested by the user. They never ask for passwords via email.',
  },
  {
    sender: 'From: SAS Airlines <no-reply@sas.no>',
    subject: 'Subject: Your SAS Booking Confirmation - Flight to London',
    content: (
      <>
        <p>Dear Emily,</p>
        <p className="mt-2">
          Your booking for Flight SK531 to London on June 10, 2025, has been
          confirmed. You can check your itinerary and manage your booking below.
        </p>
      </>
    ),
    buttonText: 'Manage My Booking',
    buttonLink: 'https://www.flysas.com/my-booking',
    correctAnswer: 'Legit',
    scamSigns: [],
    explanation:
      'Airlines always send booking confirmations with direct links to their official website, not third-party payment sites.',
  },
];

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

// const emails: Email[] = getRandomEmails();

function TestChecklist() {
  const { persona } = usePersonaStore();
  const cardId = persona?._id || '';
  const navigate = useNavigate();
  const { markTaskComplete, markTaskUndone, isTaskComplete } =
    useTaskProgress();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [emails, setEmails] = useState<Email[]>(getRandomEmails());
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
  const progress = step > 0 ? ((step / numEmails) * 100).toFixed(1) : '0.0';

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
    setFeedback([]);
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

    try {
      await updateTestResults(cardId, score, true);
    } catch (error) {
      console.error('Failed to update test results:', error);
    }
  };

  useEffect(() => {
    if (isAllEmailsDone) {
      handleTestCompletion();
    }
  }, [isAllEmailsDone]);

  return (
    <ActivityPageLayout
      header="Does your solution work?"
      phase="Test"
      phaseColor="text-test"
      text={
        <>
          {!isAllEmailsDone &&
            'Use the checklist to determine if the email is a scam'}
        </>
      }
      activity={
        <div className="text-primary">
          <div className="gap-6">
            {currentEmail && !isAllEmailsDone && (
              <EmailComponent
                sender={currentEmail.sender}
                subject={currentEmail.subject}
                text={currentEmail.content}
                buttonText={currentEmail.buttonText}
                buttonLink={currentEmail.buttonLink}
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
                      {/* TODO: make sure feedback loads */}
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
                <p className="mt-2 text-[14px]">Give feedback</p>
                <textarea
                  value={feedback.join('\n')}
                  onChange={handleFeedbackChange}
                  onKeyDown={handleKeyDown}
                  placeholder="• Add feedback here..."
                  className="mt-1 p-2 w-full text-[14px] rounded-md border border-primary text-primary bg-base-100"
                  rows={4}
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
          {!isAllEmailsDone && (
            <div className="fixed bottom-20 left-0 w-full z-5 space-y-1">
              <p className="text-[12px] text-center font-semibold text-ideate">
                Progress: {step} / {numEmails}
              </p>
              <div className="bg-base-100 h-2">
                <div
                  className="h-2 bg-ideate transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      }
    />
  );
}

export default TestChecklist;
