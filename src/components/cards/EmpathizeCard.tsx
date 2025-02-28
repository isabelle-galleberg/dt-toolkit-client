interface CardProps {
  type: string;
  description: string;
  image: string;
  isSelected: boolean;
  onClick: () => void;
}

function EmpathizeCard({
  type,
  description,
  image,
  isSelected,
  onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`card w-56 h-80 shadow-xl bg-empathize p-4 text-center text-define pt-6 items-center cursor-pointer transform transition-transform duration-300 hover:scale-105 ${
        isSelected ? 'border-2 border-primary' : ''
      }`}
    >
      <div className="avatar">
        <div className="w-24 rounded-full ring ring-primary">
          <img src={image} alt={`${type}'s avatar`} />
        </div>
      </div>
      <div className="font-semibold text-lg mt-3">{type}</div>
      <div className="text-sm mt-1">{description}</div>
    </div>
  );
}

export default EmpathizeCard;
