import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserIcon } from '@heroicons/react/24/solid';
import Alert from '../components/Alert';
import { useUserStore } from '../store/userStore';
import PasswordInput from '../components/PasswordInput';
import ActivityPageLayout from '../components/layout/ActivityPageLayout';

const RegisterPage = () => {
  const { registerUser } = useUserStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      setLoading(false);
      return;
    }
    try {
      await registerUser(username, password);
      navigate('/login');
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || 'Registration failed. Please try again.';
      setErrorMessage(errorMessage);
    }
    setLoading(false);
  };

  return (
    <ActivityPageLayout
      header="Register for an Account"
      text={
        <>
          Welcome to a creative space where you can learn, collaborate, and
          innovate! By signing up, you'll gain access to tools and resources
          that will help you unlock your potential in Design Thinking.
        </>
      }
      activity={
        <div>
          <form onSubmit={handleRegister} className="space-y-4">
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
            <PasswordInput
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Confirm password"
            />
            <button type="submit" className="btn btn-primary w-full">
              {loading ? (
                <span className="loading loading-dots loading-sm"></span>
              ) : (
                <div>Register</div>
              )}
            </button>
          </form>
          <p className="mt-4 text-center">
            Already have an account?{' '}
            <Link to="/login" className="cursor-pointer text-ideate">
              Login here
            </Link>
          </p>
          <div>{errorMessage && <Alert message={errorMessage} />}</div>
        </div>
      }
    />
  );
};

export default RegisterPage;
