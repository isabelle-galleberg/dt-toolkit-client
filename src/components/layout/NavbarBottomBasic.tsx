import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTaskProgress } from '../../context/TaskProgressContext';

interface NavbarBottomBasicProps {
  showBackButton?: boolean;
  showCenterButton?: boolean;
  showNextButton?: boolean;
  centerButtonText?: string;
  centerButtonOnClick?: () => void;
  centerButtonWidth?: string;
  centerButtonStyle?: string;
  backButtonOnClick?: () => void;
  nextButtonPath?: string;
  isTransparent?: boolean;
}

function NavbarBottomBasic({
  showBackButton = false,
  showCenterButton = false,
  showNextButton = false,
  centerButtonText = "LET'S START",
  centerButtonOnClick,
  centerButtonWidth = 'w-full',
  centerButtonStyle = 'bg-primary text-base-100 border-primary hover:bg-primary hover:text-ideate hover:border-primary',
  backButtonOnClick = () => window.history.back(),
  nextButtonPath = '/next',
  isTransparent = false,
}: NavbarBottomBasicProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isTaskComplete } = useTaskProgress();
  const [isNextDisabled, setIsNextDisabled] = useState(
    !isTaskComplete(location.pathname)
  );

  useEffect(() => {
    setIsNextDisabled(!isTaskComplete(location.pathname));
  }, [location.pathname, isTaskComplete]);

  return (
    <div
      className={`navbar fixed bottom-0 z-10 p-4 flex justify-between items-center w-full min-h-[80px] 
      ${isTransparent ? 'bg-transparent shadow-none' : 'bg-base-100 shadow-[0_-10px_30px_rgba(0,0,0,0.2)]'}`}
    >
      <div className="navbar-start">
        {/* Back Button */}
        {showBackButton && (
          <button
            onClick={backButtonOnClick}
            className="btn btn-primary btn-outline w-24"
          >
            Back
          </button>
        )}
      </div>

      {/* Center Button */}
      {showCenterButton && (
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <button
            onClick={centerButtonOnClick}
            className={`px-6 py-2 btn ${centerButtonStyle} ${centerButtonWidth}`}
          >
            {centerButtonText}
          </button>
        </div>
      )}

      {/* Next Button */}
      {showNextButton && (
        <button
          className="btn btn-primary btn-outline w-24"
          onClick={() => navigate(nextButtonPath)}
          disabled={isNextDisabled}
        >
          Next
        </button>
      )}
    </div>
  );
}

export default NavbarBottomBasic;
