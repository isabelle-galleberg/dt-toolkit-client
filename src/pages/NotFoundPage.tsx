import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-3xl font-bold">404 - Lost in Brainstorming 💭</h1>
          <div className="py-6">
            <p> Oops, you went a bit too far outside the box!</p>
            <p> Let’s ideate our way back to something that actually exists.</p>
          </div>
          <Link to="/">
            <button className="btn btn-primary"> Back to main page 🚀</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
