import InfoPageLayout from '../components/layout/InfoPageLayout';
import NavbarBottomBasic from '../components/layout/NavbarBottomBasic';
import { useUserStore } from '../store/userStore';

function Conclusion() {
  const { logoutUser } = useUserStore();

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
        centerButtonText="LOGOUT"
        centerButtonOnClick={() => logoutUser}
        isTransparent={true}
        centerButtonWidth="w-56"
      />
    </>
  );
}

export default Conclusion;
