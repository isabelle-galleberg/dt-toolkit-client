import { useState } from 'react';
import {
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from '@heroicons/react/24/solid';

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function PasswordInput({
  value,
  onChange,
  placeholder = 'Password',
}: PasswordInputProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <label className="input input-bordered flex items-center gap-2">
      <LockClosedIcon className="size-6" />
      <input
        type={passwordVisible ? 'text' : 'password'}
        className="grow"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        type="button"
        className="ml-2"
        onClick={() => setPasswordVisible(!passwordVisible)}
      >
        {passwordVisible ? (
          <EyeSlashIcon className="size-6" />
        ) : (
          <EyeIcon className="size-6" />
        )}
      </button>
    </label>
  );
}

export default PasswordInput;
