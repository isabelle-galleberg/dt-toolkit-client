import { useState } from 'react';
import { useUserStore } from '../store/userStore';
import { Link, useNavigate } from 'react-router-dom';
import { UserIcon } from '@heroicons/react/16/solid';
import Alert from '../components/Alert';
import PasswordInput from '../components/PasswordInput';
import ActivityPageLayout from '../components/layout/ActivityPageLayout';

const LoginForm = () => {
  const { loginUser } = useUserStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    try {
      await loginUser(username, password);
      setLoading(false);
      navigate('/');
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || 'Registration failed. Please try again.';
      setErrorMessage(errorMessage);
      setLoading(false);
    }
  };

  return (
    <>
      <ActivityPageLayout
        header="Login to Your Account"
        text={
          <>
            Welcome! We're so excited to have you here! Please login to begin
            your journey in Design Thinking.
          </>
        }
        activity={
          <div>
            <form onSubmit={handleLogin} className="space-y-4 ">
              <label className="input input-bordered flex items-center gap-2">
                <UserIcon className="size-6" />
                <input
                  type="text"
                  className="grow"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
              <PasswordInput value={password} onChange={setPassword} />
              <button type="submit" className="btn btn-primary w-full">
                {loading ? (
                  <span className="loading loading-dots loading-sm"></span>
                ) : (
                  <div>Login</div>
                )}
              </button>
            </form>
            <p className="mt-4 text-center">
              Don't have an account?{' '}
              <Link to="/register" className="cursor-pointer text-ideate">
                Register here
              </Link>
            </p>
            <div>{errorMessage && <Alert message={errorMessage} />}</div>
          </div>
        }
      />
    </>
  );
};

export default LoginForm;
