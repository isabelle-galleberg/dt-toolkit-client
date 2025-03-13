import { useState, useRef, useEffect } from 'react';
import phishing from '../assets/phishing.png';
import harmful from '../assets/harmful.png';
import textMessage from '../assets/text-message.png';
import fakeMessage from '../assets/fake-websites.png';
import phoneCall from '../assets/phone-call-scams.png';

const sections = [
  {
    title: 'What is phishing?',
    color: 'text-base-100',
    content: (
      <>
        <strong>Phishing</strong> is when someone sends you a fake message that
        looks real. It could be an email, an SMS , or a message on social media.
        They may pretend to be someone you know or a company you trust, such as
        your bank or a shop. The aim is to trick you into giving them personal
        information or money.
      </>
    ),
    image: phishing,
  },
  {
    title: 'How can phishing scams be harmful?',
    color: 'text-base-100',
    content: (
      <>
        <strong>
          Phishing scams can cause serious problems by stealing your personal
          information
        </strong>
        , letting scammers log into your accounts and pretend to be you.
        <br />
        <br />
        Many scammers are after money. If they get your banking details, they
        may <strong>steal money</strong>, make purchases, or lock you out of
        your account. Some phishing scams
        <strong> install harmful software</strong> that shows unwanted ads,
        steals files, or tracks what you type.
        <br />
        <br />
        Being tricked by a phishing scam can lead to lost money, stolen
        accounts, and serious security risks. That's why it's important to stay
        alert and think before you click.
      </>
    ),
    image: harmful,
  },
  {
    title: 'What are the most common forms of phishing scams?',
    color: 'text-base-100',
    content: (
      <>
        Phishing scams can take many forms. Any kind of communication app, as
        well as your web browser, might be used in a phishing scam.
        <br />
        <br />
        <strong>Let's look at the most common phishing scams</strong>!
      </>
    ),
  },
  {
    title: 'Fake emails',
    color: 'text-ideate',
    content: (
      <>
        Scammers send emails that look like they come from your bank, school, or
        a company you trust. They may ask you to update your account or reset
        your password.
      </>
    ),
  },
  {
    title: 'Text message scams',
    color: 'text-ideate',
    content: (
      <>
        A scammer might send a message pretending to be from a delivery service
        or your bank. The message often includes a link to "track a package" or
        "fix a problem" with your account.
      </>
    ),
    image: textMessage,
  },
  {
    title: 'Fake websites',
    color: 'text-ideate',
    content: (
      <>
        Some phishing scams create fake websites that look exactly like real
        ones. They trick you into entering your login details, which go straight
        to the scammer.
      </>
    ),
    image: fakeMessage,
  },
  {
    title: 'Phone call scams',
    color: 'text-ideate',
    content: (
      <>
        Scammers may call and pretend to be from your school, bank, or even the
        government. They try to make you feel worried so that you will share
        personal information.
      </>
    ),
    image: phoneCall,
  },
  {
    title: 'Well done!',
    color: 'text-primary',
    textColor: 'text-primary',
    bgColor: 'bg-base-100',
    content: (
      <>
        This is the end of the <strong>"What is a phishing scam? "</strong>
        activity. You have been introduced to what a phishing scam is, how it
        works, and how to identify a phishing scam.
      </>
    ),
  },
];

export default function PhishingAwareness() {
  const [step, setStep] = useState(1);
  const sectionRefs = useRef([]);

  useEffect(() => {
    if (sectionRefs.current[step - 1]) {
      sectionRefs.current[step - 1].scrollIntoView({ behavior: 'smooth' });
    }
  }, [step]);

  const handleNext = () => {
    if (step < sections.length) {
      setStep(step + 1);
    } else {
      window.location.href = '/design-thinking';
    }
  };

  return (
    <div className="relative w-full">
      {sections.slice(0, step).map((section, index) => (
        <div
          key={index}
          ref={(el) => (sectionRefs.current[index] = el)}
          className={`h-screen flex flex-col justify-center items-center px-6 text-base-100 ${
            section.bgColor ? section.bgColor : 'bg-primary'
          }`}
        >
          <div className="fixed top-0 left-0 w-full flex items-center justify-between h-[88px] pb-4 px-4 bg-base-100 shadow-md" />

          <div className="max-w-3xl flex flex-col md:flex-row items-center gap-6">
            {/* Text on the right */}
            <div className="text-center md:text-left">
              <h2 className={`text-3xl font-bold mb-4 ${section.color}`}>
                {section.title}
              </h2>
              <p
                className={`text-md ${
                  section.textColor ? section.textColor : 'text-base-100'
                }`}
              >
                {section.content}
              </p>
            </div>

            {/* Conditionally render image if it exists */}
            {section.image && (
              <img
                src={section.image}
                alt={section.title}
                className="w-52 h-52 md:w-72 md:h-72 object-contain"
              />
            )}
          </div>

          {index === step - 1 && (
            <button
              onClick={handleNext}
              className="absolute bottom-10 px-6 py-2 btn w-36 bg-ideate text-primary border-ideate hover:bg-ideate hover:text-base-100 hover:border-ideate"
            >
              {step < sections.length ? 'CONTINUE' : 'END ACTIVITY'}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
