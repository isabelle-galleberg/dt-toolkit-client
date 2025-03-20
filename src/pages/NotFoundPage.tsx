import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';

function NotFoundPage() {
  const navigate = useNavigate();
  const { user } = useUserStore();

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div>
          <h1 className="text-3xl font-bold">404 - Lost in Brainstorming 💭</h1>
          <div className="py-6">
            <p> Oops, you went a bit too far outside the box!</p>
            <p> Let’s ideate our way back to something that actually exists.</p>
          </div>
          <button
            onClick={() => navigate(user?.page || '/design-thinking')}
            className="btn btn-primary"
          >
            Back to civilization 🚀
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
