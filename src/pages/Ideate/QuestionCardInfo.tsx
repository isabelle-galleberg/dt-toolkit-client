import ActivityPageLayout from '../../components/layout/ActivityPageLayout';
import { useNavigate } from 'react-router-dom';

function QuestionCardInfo() {
  const navigate = useNavigate();

  return (
    <ActivityPageLayout
      header="Think of ways to stay safe online!"
      phase="Ideate"
      phaseColor="text-ideate"
      text={
        <>
          We need to help Grandma Lily with a quiz to train her cybersecurity
          skills in a safe environment! Create some questions and answer them to
          create a quiz card deck.
          <br />
          <br />
          Start by clicking here!
        </>
      }
      activity={
        <>
          <button
            className="btn bg-ideate text-primary px-6 py-2 hover:bg-ideate hover:text-primary hover:border-primary"
            onClick={() => navigate('/ideate/question-card')}
          >
            ADD QUESTION CARD
          </button>
        </>
      }
    />
  );
}

export default QuestionCardInfo;
