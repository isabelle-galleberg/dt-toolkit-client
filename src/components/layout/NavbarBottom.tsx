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
  '/define',
  '/define/spot-scam',
  '/define/problem-understanding',
  '/define/problem-statement',
  '/ideate',
  '/ideate/checklist',
  '/prototype',
  '/prototype/gearsbot',
  '/test',
  '/test/feedback',
  '/conclusion',
].filter(Boolean);

const getNextTooltip = (pathname: string) => {
  const tooltips: Record<string, string> = {
    '/empathize/select-persona': 'Choose a persona to proceed',
    '/empathize/persona':
      'Fill out all persona details and add some personal traits to proceed',
    '/empathize/storyboard': 'Choose an emotion for each story to proceed',
    '/define/spot-scam': 'Identify at least three signs of a scam to proceed',
    '/define/problem-understanding':
      'Identify at least 3 incidents, causes, and consequences to proceed',
    '/define/problem-statement':
      'Fill out all parts of the problem statement to proceed',
    '/ideate/checklist': 'Add at least 5 items to the checklist to proceed',
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

  const getButtonClass = (path: string, buttonType: string) => {
    const baseClasses = 'btn btn-outline w-36';
    const isActive = location.pathname.startsWith(path);

    switch (buttonType) {
      case 'empathize':
        return `${baseClasses} ${isActive ? 'bg-empathize text-define' : 'text-empathize'} hover:text-empathize hover:bg-base-100 hover:border-empathize`;
      case 'define':
        return `${baseClasses} ${isActive ? 'bg-define text-empathize' : 'text-define'} hover:text-define hover:bg-base-100 hover:border-define`;
      case 'ideate':
        return `${baseClasses} ${isActive ? 'bg-ideate text-primary' : 'text-ideate'} hover:text-ideate hover:bg-base-100 hover:border-ideate `;
      case 'prototype':
        return `${baseClasses} ${isActive ? 'bg-prototype text-test' : 'text-prototype'} hover:text-prototype hover:bg-base-100 hover:border-prototype `;
      case 'test':
        return `${baseClasses} ${isActive ? 'bg-test text-prototype' : 'text-test'} hover:text-test hover:bg-base-100 hover:border-test `;
      default:
        return baseClasses;
    }
  };

  return (
    <div className="navbar bg-base-100 fixed bottom-0 z-50 shadow pb-4 px-4">
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
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-3">
          <button
            className={`${getButtonClass('/empathize', 'empathize')} cursor-auto`}
          >
            EMPATHIZE
          </button>
          <button
            className={`${getButtonClass('/define', 'define')} cursor-auto`}
          >
            DEFINE
          </button>
          <button
            className={`${getButtonClass('/ideate', 'ideate')} cursor-auto`}
          >
            IDEATE
          </button>
          <button
            className={`${getButtonClass('/prototype', 'prototype')} cursor-auto`}
          >
            PROTOTYPE
          </button>
          <button className={`${getButtonClass('/test', 'test')} cursor-auto`}>
            TEST
          </button>
        </ul>
      </div>

      <div className="navbar-end">
        <div className="relative group">
          <button
            className="btn btn-primary btn-outline w-24"
            onClick={goToNextPage}
            disabled={isNextDisabled}
          >
            {location.pathname === '/test/feedback' ? 'Finish' : 'Next'}
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
  );
}

export default Navbar;
