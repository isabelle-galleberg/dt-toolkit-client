import InfoPageLayout from '../components/layout/InfoPageLayout';
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
      <div className="flex-1 flex justify-center">
        <button
          className="absolute bottom-10 btn btn-primary w-48 text-center"
          onClick={logoutUser}
        >
          LOGOUT
        </button>
      </div>
    </>
  );
}

export default Conclusion;
