import { useNavigate } from 'react-router-dom';
import NavbarBottomBasic from '../components/layout/NavbarBottomBasic';

const phases = [
  {
    id: '01',
    title: 'EMPATHIZE',
    text: 'To solve problems, we need to understand people and their needs. Empathizing means learning about others by observing, asking questions, and listening carefully.',
    bg: 'bg-empathize',
    textColor: 'text-define',
    bgCircle: 'bg-define',
    textCircle: 'text-empathize',
  },
  {
    id: '02',
    title: 'DEFINE',
    text: 'Now that you know what people need, it’s time to clearly define the problem. This helps you focus and find a solution that really works.',
    bg: 'bg-define',
    textColor: 'text-empathize',
    bgCircle: 'bg-empathize',
    textCircle: 'text-define',
  },
  {
    id: '03',
    title: 'IDEATE',
    text: 'This is where we let our creativity fly! In Ideate, you think up as many ideas as possible, even wild ones.',
    bg: 'bg-ideate',
    textColor: 'text-primary',
    bgCircle: 'bg-primary',
    textCircle: 'text-ideate',
  },
  {
    id: '04',
    title: 'PROTOTYPE',
    text: 'Now it’s time to turn your idea into something real! Prototyping means creating a simple version of your idea to see how it works.',
    bg: 'bg-prototype',
    textColor: 'text-test',
    bgCircle: 'bg-test',
    textCircle: 'text-prototype',
  },
  {
    id: '05',
    title: 'TEST',
    text: 'Testing lets you find out what people like about your prototype and what you could improve. You’re getting closer to an amazing solution!',
    bg: 'bg-test',
    textColor: 'text-prototype',
    bgCircle: 'bg-prototype',
    textCircle: 'text-test',
  },
];

function DesignThinkingPhases() {
  const navigate = useNavigate();

  return (
    <>
      <div className="relative flex justify-center px-4">
        <div className={'max-w-4xl w-full py-8'}>
          <h1
            className="text-4xl font-bold text-primary"
            style={{ fontFamily: 'Roboto Slab' }}
          >
            You're ready to start your design thinking adventure!
          </h1>
          <p
            className="mt-8 text-md text-primary font-light"
            style={{ fontFamily: 'Roboto Slab' }}
          >
            It's time to solve real-world problems using design thinking!
          </p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 py-10">
        {phases.map((phase) => (
          <div
            key={phase.id}
            className={`relative rounded-[20px] flex flex-col w-[220px] h-[293px] shadow-lg ${phase.bg} ${phase.textColor}`}
          >
            {/* Header */}
            <div
              className={`p-4 rounded-t-[20px] flex items-center justify-between`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`${phase.bgCircle} w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0`}
                >
                  <span className={`${phase.textCircle} text-sm`}>
                    {phase.id}
                  </span>
                </div>
                <p className="text-left text-lg font-semibold">{phase.title}</p>
              </div>
            </div>

            {/* Body */}
            <div className="flex-grow p-4 text-sm text-end">{phase.text}</div>
          </div>
        ))}
      </div>

      {/* Bottom Navbar */}
      <NavbarBottomBasic
        showBackButton={true}
        backButtonOnClick={() => window.history.back()}
        showCenterButton={true}
        centerButtonText="LET'S START"
        centerButtonOnClick={() => navigate('/empathize')}
      />
    </>
  );
}

export default DesignThinkingPhases;
