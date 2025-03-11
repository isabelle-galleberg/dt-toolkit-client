interface BoxProps {
  icon?: string;
  header: string;
  content?: JSX.Element;
  bottomContent?: JSX.Element | boolean;
  fillHeight?: boolean;
  onExit?: () => void;
}

function Box({
  icon,
  header,
  content,
  bottomContent,
  fillHeight = false,
  onExit,
}: BoxProps) {
  const boxClassName = `relative rounded-[20px] flex flex-col ${fillHeight ? 'h-full' : ''}`;

  return (
    <div className={boxClassName}>
      <div className="bg-primary text-base-100 p-4 rounded-t-[20px] flex items-center justify-between relative">
        <div className="flex items-center gap-2">
          {icon && (
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-base-100 flex-shrink-0">
              <span className="text-sm text-primary">{icon}</span>
            </div>
          )}
          <p
            className="text-left text-[15px] tracking-widest"
            style={{ fontFamily: 'Poppins' }}
          >
            {header}
          </p>
        </div>
        {onExit && (
          <button
            className="ml-2 text-base-100 text-[15px] hover:text-red-600 text-xs flex mb-6"
            onClick={onExit}
          >
            ✕
          </button>
        )}
      </div>
      <div
        className={`bg-base-100 border border-primary rounded-b-[20px] flex flex-col ${fillHeight ? 'flex-grow' : ''}`}
      >
        <div className="flex-grow">{content}</div>
        {bottomContent && (
          <div className="mt-auto text-primary p-4">{bottomContent}</div>
        )}
      </div>
    </div>
  );
}

export default Box;
