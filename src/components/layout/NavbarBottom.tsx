import { useLocation, useNavigate } from 'react-router-dom';
import { useTaskProgress } from '../../context/TaskProgressContext';
import { useEffect, useState } from 'react';
import { useUserStore } from '../../store/userStore';

const routes = [
  '/',
  '/empathize',
  '/empathize/select-persona',
  '/empathize/persona-info',
  '/empathize/persona',
  '/empathize/storyboard-info',
  '/empathize/storyboard',
  '/empathize/complete',
  '/define',
  '/define/spot-scam',
  '/define/problem-understanding',
  '/define/problem-statement',
  '/define/complete',
  '/ideate',
  '/ideate/checklist',
  '/ideate/complete',
  '/prototype',
  '/prototype/gearsbot',
  '/prototype/complete',
  '/test',
  '/test/info',
  '/test/checklist',
  '/test/complete',
  '/conclusion',
].filter(Boolean);

const getNextTooltip = (pathname: string) => {
  const tooltips: Record<string, string> = {
    '/empathize/select-persona': 'Choose a persona to proceed',
    '/empathize/persona':
      'Fill out all persona details and add at least two personal traits to proceed',
    '/empathize/storyboard': 'Choose an emotion for each story to proceed',
    '/define/spot-scam': 'Identify at least three signs of a scam to proceed',
    '/define/problem-understanding':
      'Identify at least 3 incidents, causes, and consequences to proceed',
    '/define/problem-statement':
      'Fill out all parts of the problem statement to proceed',
    '/ideate/checklist':
      'You need at least 5 items on your checklist to proceed',
    '/test/checklist': 'Test the checklist on all emails to finish',
  };

  return tooltips[pathname] || 'Go to the next step';
};

const getNextPage = (pathname: string) => {
  const currentIndex = routes.indexOf(pathname);
  const nextIndex = (currentIndex + 1) % routes.length;
  return routes[nextIndex];
};

const getPreviousPage = (pathname: string) => {
  const currentIndex = routes.indexOf(pathname);
  const prevIndex = (currentIndex - 1 + routes.length) % routes.length;
  return routes[prevIndex];
};

function Navbar() {
  const { updatePage } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { isTaskComplete } = useTaskProgress();
  const [isNextDisabled, setIsNextDisabled] = useState(
    !isTaskComplete(location.pathname)
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsNextDisabled(!isTaskComplete(location.pathname));
  }, [location.pathname, isTaskComplete]);

  const goToNextPage = () => {
    const nextPage = getNextPage(location.pathname);
    navigate(nextPage);
    updatePage(nextPage);
  };

  const goToPreviousPage = () => {
    const prevPage = getPreviousPage(location.pathname);
    navigate(prevPage);
    updatePage(prevPage);
  };

  const handleFinishClick = () => {
    if (location.pathname === '/test/complete') {
      setIsModalOpen(true);
    } else {
      goToNextPage();
    }
  };

  const getTextClass = (path: string, type: string) => {
    const baseClasses =
      'w-36 h-12 flex items-center justify-center text-center text-[14px] px-4 p-2 rounded-[8px] border font-bold cursor-default';
    const isActive = location.pathname.startsWith(path);

    switch (type) {
      case 'empathize':
        return `${baseClasses} ${isActive ? 'bg-empathize text-define border-define' : 'text-empathize border-empathize'}`;
      case 'define':
        return `${baseClasses} ${isActive ? 'bg-define text-empathize border-empathize' : 'text-define border-define'}`;
      case 'ideate':
        return `${baseClasses} ${isActive ? 'bg-ideate text-primary border-primary' : 'text-ideate border-ideate '}`;
      case 'prototype':
        return `${baseClasses} ${isActive ? 'bg-prototype text-test border-test' : 'text-prototype border-prototype'}`;
      case 'test':
        return `${baseClasses} ${isActive ? 'bg-test text-prototype border-prototype' : 'text-test border-test '}`;
      default:
        return baseClasses;
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="navbar bg-base-100 fixed bottom-0 z-10 p-4 flex justify-between items-center w-full shadow-[0_-10px_30px_rgba(0,0,0,0.2)]">
        <div className="navbar-start">
          {/* Hide back button if on '/' page */}
          {location.pathname !== '/' && (
            <button
              className="btn btn-primary btn-outline w-24"
              onClick={goToPreviousPage}
            >
              Back
            </button>
          )}
        </div>
        <div className="hidden lg:flex flex-1 justify-center space-x-4">
          <span className={getTextClass('/empathize', 'empathize')}>
            EMPATHIZE
          </span>
          <span className={getTextClass('/define', 'define')}>DEFINE</span>
          <span className={getTextClass('/ideate', 'ideate')}>IDEATE</span>
          <span className={getTextClass('/prototype', 'prototype')}>
            PROTOTYPE
          </span>
          <span className={getTextClass('/test', 'test')}>TEST</span>
        </div>

        <div className="navbar-end">
          <div className="relative group">
            <button
              className="btn btn-primary btn-outline w-24"
              onClick={handleFinishClick}
              disabled={isNextDisabled}
            >
              {location.pathname === '/test/complete' ? 'Finish' : 'Next'}
            </button>

            {isNextDisabled && (
              <span
                className="absolute bottom-full mb-2 bg-primary text-black text-xs px-3 py-1 rounded opacity-0
                 group-hover:opacity-100 transition-opacity whitespace-normal break-words z-50
                 right-0 left-auto max-w-[40vw] min-w-[200px] text-left block transform origin-right-bottom"
              >
                {getNextTooltip(location.pathname)}
              </span>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-base-100 bg-opacity-50 flex items-start justify-center z-50">
          <div className="bg-primary p-6 rounded-lg shadow-lg flex flex-col justify-between relative py-16 mt-40">
            <button
              className="absolute top-2 right-3 text-base-100 text-xl hover:text-red-600"
              onClick={closeModal}
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold text-ideate mb-4 pb-4 text-roboto-slab text-center">
              Are you sure you're ready to finish?
            </h3>
            <div className="flex flex-col space-y-4 flex-grow justify-center">
              <button
                className="btn bg-ideate border-ideate text-primary hover:bg-base-100"
                onClick={() => {
                  closeModal();
                  navigate('/ideate/checklist');
                }}
              >
                Wait, I want to improve it further!
              </button>
              <button
                className="btn bg-primary border-ideate text-ideate hover:bg-base-100"
                onClick={() => {
                  closeModal();
                  navigate('/conclusion');
                }}
              >
                Yes, I'm finished!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
