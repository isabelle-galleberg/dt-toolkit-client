import ProfileIcon from '../assets/profile-icon.svg';

interface PhoneProps {
  sender?: string;
  subject?: string;
  text?: JSX.Element;
  buttonText?: string;
  buttonLink?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

function PhoneComponent({
  sender,
  subject,
  text,
  buttonText,
  buttonLink,
  onClick,
}: PhoneProps) {
  return (
    <div
      className="w-full aspect-[274/546] mx-auto rounded-2xl border-8 border-base-100 shadow-md shadow-primary relative overflow-hidden text-[12px] cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-base-100 text-[#F5F8EF] flex justify-between items-center px-2 py-1 text-[10px]">
        <span>9:41 AM</span>
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
          <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
        </div>
      </div>

      <div className="bg-[#F5F8EF] h-full flex flex-col">
        {/* Inbox Header */}
        <div className="bg-primary px-2 py-1">
          <span className="font-bold text-base-100">Inbox</span>
        </div>

        {/* Phone Header */}
        <div className="flex items-center px-2 py-1 bg-[#F5F8EF] text-[10px]">
          <img src={ProfileIcon} className="h-4 w-4 mr-2" />
          <div className="flex flex-col">
            <span className="font-medium text-base-100">{sender}</span>
            <span className="text-gray-500">{subject}</span>
          </div>
        </div>

        {/* Phone Content */}
        <div className="px-4 py-2 text-base-100 text-[12px] bg-[#F5F8EF] border-t-2 border-primary flex-1 overflow-y-auto min-h-0">
          {text}
        </div>

        {/* Button */}
        {buttonText && (
          <div className="p-3 pb-8 bg-[#F5F8EF] flex justify-center text-[10px]">
            <div className="relative group">
              {/* Tooltip on Hover */}
              {buttonLink && (
                <div className="absolute bottom-full mb-1 bg-gray-600 text-[#F5F8EF] rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition">
                  {buttonLink}
                </div>
              )}
              <button className="px-2 py-2 bg-base-100 text-primary font-bold rounded-md cursor">
                {buttonText}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PhoneComponent;
