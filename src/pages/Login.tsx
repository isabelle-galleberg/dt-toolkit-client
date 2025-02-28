import { useState } from 'react';
import { useUserStore } from '../store/userStore';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { UserIcon } from '@heroicons/react/16/solid';
import Alert from '../components/Alert';
import PasswordInput from '../components/PasswordInput';

const LoginForm = () => {
  const { loginUser } = useUserStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(username, password);
      navigate('/');
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || 'Registration failed. Please try again.';
      setErrorMessage(errorMessage);
    }
  };

  return (
    <Layout
      topContentText="Welcome back! We're excited to see you again. Please login to continue your journey in Design Thinking."
      topContentTitle="Login to Your Account"
      middleContent={
        <div>
          <form onSubmit={handleLogin} className="space-y-4">
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
              Login
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
    ></Layout>
  );
};

export default LoginForm;
