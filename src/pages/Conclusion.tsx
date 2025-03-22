import { useNavigate } from 'react-router-dom';
import InfoPageLayout from '../components/layout/InfoPageLayout';
import NavbarBottomBasic from '../components/layout/NavbarBottomBasic';
import { useUserStore } from '../store/userStore';

function Conclusion() {
  const navigate = useNavigate();
  const { updatePage } = useUserStore();

  const returnToStart = () => {
    navigate('/');
    updatePage('/');
  };

  return (
    <>
      <InfoPageLayout
        header={'Congratulations on completing the workshop!'}
        text={
          "We hope you enjoyed the adventure, and remember, the internet is full of opportunities, but it's important to be aware of the risks. Keep practicing your skills, and always remember to think before you click! 🌐✨"
        }
        headerColor={'text-ideate'}
      />
      <NavbarBottomBasic
        showBackButton={true}
        backButtonOnClick={() => window.history.back()}
        showCenterButton={true}
        centerButtonText="RETURN TO START"
        centerButtonOnClick={() => returnToStart()}
        isTransparent={true}
        centerButtonWidth="w-56"
      />
    </>
  );
}

export default Conclusion;
