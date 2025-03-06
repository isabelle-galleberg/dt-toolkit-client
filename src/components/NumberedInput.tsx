import { forwardRef } from 'react';

interface NumberedInputProps {
  number: number;
  placeholder?: string;
  onDelete: () => void;
  onChange: (value: string) => void;
  onBlur?: () => void;
  defaultValue?: string;
}

const NumberedInput = forwardRef<HTMLInputElement, NumberedInputProps>(
  ({ number, placeholder, onDelete, onChange, onBlur, defaultValue }, ref) => {
    return (
      <div className="flex items-center w-full p-2 border-2 border-define rounded-full text-[12px] tracking-widest">
        {/* Circle number */}
        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-define text-base-100 flex-shrink-0">
          {number}
        </div>

        {/* Input field */}
        <input
          ref={ref}
          type="text"
          placeholder={placeholder || 'Add reason here ...'}
          className="flex-1 bg-transparent border-none text-primary focus:outline-none px-3"
          defaultValue={defaultValue}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          onBlur={onBlur}
        />

        {/* Delete button */}
        <button
          onClick={onDelete}
          className="ml-2 text-primary hover:text-red-500 text-xs"
        >
          ✕
        </button>
      </div>
    );
  }
);

export default NumberedInput;
