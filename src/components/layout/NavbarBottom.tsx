import { useLocation, useNavigate } from 'react-router-dom';
import { useTaskProgress } from '../../context/TaskProgressContext';
import { useEffect, useState } from 'react';

const getNextPage = (pathname: string) => {
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
    '/ideate/question-card-info',
    '/ideate/question-card',
    '/prototype',
    '/prototype/gearsbot',
    '/test',
    '/test/feedback',
  ].filter(Boolean);

  const nextRouteIndex = (routes.indexOf(pathname) + 1) % routes.length;
  return routes[nextRouteIndex];
};

function Navbar() {
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
  };

  const goToPreviousPage = () => {
    navigate(-1);
  };

  const getButtonClass = (path: string, buttonType: string) => {
    const baseClasses = 'btn btn-outline w-36';
    const isActive = location.pathname.startsWith(path);

    switch (buttonType) {
      case 'empathize':
        return `${baseClasses} ${isActive ? 'bg-empathize text-define' : 'text-empathize'} hover:bg-empathize hover:text-define hover:border-define `;
      case 'define':
        return `${baseClasses} ${isActive ? 'bg-define text-empathize' : 'text-define'} hover:bg-define hover:text-empathize hover:border-empathize`;
      case 'ideate':
        return `${baseClasses} ${isActive ? 'bg-ideate text-primary' : 'text-ideate'} hover:bg-ideate hover:text-primary hover:border-priamry `;
      case 'prototype':
        return `${baseClasses} ${isActive ? 'bg-prototype text-test' : 'text-prototype'} hover:bg-prototype hover:text-test hover:border-test `;
      case 'test':
        return `${baseClasses} ${isActive ? 'bg-test text-prototype' : 'text-test'} hover:bg-test hover:text-prototype hover:border-prototype `;
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
            disabled={!isTaskComplete('/empathize/storyboard')} //TODO: fix the disabled styling?
          >
            DEFINE
          </button>
          <button
            className={`${getButtonClass('/ideate', 'ideate')} cursor-auto`}
            disabled={!isTaskComplete('/define/problem-statement')}
          >
            IDEATE
          </button>
          <button
            className={`${getButtonClass('/prototype', 'prototype')} cursor-auto`}
            disabled={!isTaskComplete('/ideate/question-card')}
          >
            PROTOTYPE
          </button>
          <button
            className={`${getButtonClass('/test', 'test')} cursor-auto`}
            disabled={!isTaskComplete('/prototype/gearsbot')}
          >
            TEST
          </button>
        </ul>
      </div>

      <div className="navbar-end">
        {/* Hide next button if on '/' page */}
        {location.pathname !== '/' && (
          <button
            className="btn btn-primary btn-outline w-24"
            onClick={goToNextPage}
            disabled={isNextDisabled}
          >
            {location.pathname === '/test/feedback' ? 'Finish' : 'Next'}
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
