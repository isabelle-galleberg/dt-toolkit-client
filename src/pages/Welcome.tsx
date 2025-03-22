import { useEffect, useState } from 'react';
import InfoPage from '../components/layout/InfoPageLayout';
import ActivityPageLayout from '../components/layout/ActivityPageLayout';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import NavbarBottomBasic from '../components/layout/NavbarBottomBasic';

function Welcome() {
  // State to track if "Start Now" was clicked
  const [started, setStarted] = useState(false);
  const navigate = useNavigate();
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      {/* Conditionally Render InfoPage or ActivityPageLayout */}
      {!started ? (
        <InfoPage
          header={'Think before you click!'}
          text={'a design thinking workshop on phishing awareness'}
          headerColor="text-ideate"
        />
      ) : (
        <ActivityPageLayout
          header="Hi there, welcome!"
          phase="Introduction"
          phaseColor="text-ideate"
          text={
            <>
              The internet is a great place to learn, connect, and have fun -
              but is it always safe? Not everything online is what it seems, and
              scammers are always looking for ways to trick people.
              <br />
              <br />
              By the end of this adventure, you'll be able to:
              <br /> ✅ Spot phishing scams before they trick you.
              <br /> ✅ Know what to do if you see a suspicious message.
              <br /> ✅ Help others stay safe online!
              <br />
              <br />
              🔎 What's phishing? Let's find out!
            </>
          }
          activity={
            <div className="flex flex-col items-center">
              <button
                onClick={() => navigate('/phishing-activity')}
                className="btn btn-primary w-48"
              >
                START ACTIVITY
              </button>
              <Link
                to="/design-thinking"
                className="mt-4 text-ideate hover:underline"
              >
                Skip
              </Link>
            </div>
          }
        />
      )}

      {started && (
        <NavbarBottomBasic
          showBackButton={true}
          backButtonOnClick={() => setStarted(false)}
          isTransparent={true}
        />
      )}

      {!started && (
        <div>
          {user?.page === '/' ? (
            <NavbarBottomBasic
              showCenterButton={true}
              centerButtonText={'START NOW'}
              centerButtonOnClick={() => setStarted(true)}
              isTransparent={true}
              centerButtonWidth="w-56"
            />
          ) : (
            <NavbarBottomBasic
              showCenterButton={true}
              centerButtonText={'CONTINUE'}
              centerButtonOnClick={() =>
                navigate(user?.page || '/design-thinking')
              }
              isTransparent={true}
              centerButtonWidth="w-56"
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Welcome;
