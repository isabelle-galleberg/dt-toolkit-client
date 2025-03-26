import ProfileIcon from '../assets/profile-icon.svg';
import { usePersonaStore } from '../store/personaStore';

interface EmailProps {
  sender?: string;
  subject?: string;
  greeting?: string;
  text?: string;
  buttonText?: string;
  buttonLink?: string;
  personal?: boolean;
}

function EmailComponent({
  sender,
  subject,
  greeting,
  text,
  buttonText,
  buttonLink,
  personal,
}: EmailProps) {
  const { persona } = usePersonaStore();

  return (
    <div className="w-full max-w-md mx-auto text-[12px]">
      <div className="bg-white border-8 border-base-100 rounded-xl shadow-md shadow-primary overflow-hidden">
        {/* Inbox Header */}
        <div className="bg-primary px-2 py-1">
          <span className="font-bold text-gray-700">Inbox </span>
        </div>

        {/* Email Header */}
        <div className="flex items-center px-4 py-1 bg-[#F5F8EF]">
          <img src={ProfileIcon} className="h-6 w-6 mr-4" />
          <div className="flex flex-col">
            <span className="font-medium text-gray-700">{sender}</span>
            <span className="text-gray-500">{subject}</span>
          </div>
        </div>

        {/* Email Content */}
        <div className="px-4 py-1 text-base-100 bg-[#F5F8EF] border-t-2 border-primary">
          <p>
            {greeting}
            {personal && persona?.alias ? ` ${persona.alias},` : ','}
          </p>
          <p className="mt-2">{text}</p>
        </div>

        {/* Action Button */}
        {buttonText && (
          <div className="pb-2 bg-[#F5F8EF] flex justify-center">
            <div className="relative group">
              {/* Tooltip on Hover */}
              {buttonLink && (
                <div className="absolute bottom-full mb-2 bg-gray-700 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition">
                  {buttonLink}
                </div>
              )}
              <button className="px-4 py-1 bg-base-100 text-primary font-bold rounded-md cursor">
                {buttonText}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmailComponent;
