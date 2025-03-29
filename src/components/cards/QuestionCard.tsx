interface CardProps {
  text: string;
  classFront?: string;
  classBack?: string;
  cardImg: string;
}

function IdeateCard({ text, classFront, classBack, cardImg }: CardProps) {
  return (
    <label className="swap swap-flip cursor-pointer">
      <input type="checkbox" readOnly />
      <div
        className={`hover:scale-105 swap-off card w-48 h-64 shadow-xl p-4 flex justify-center text-center items-center ${classFront}`}
      >
        <img src={cardImg} />
      </div>
      <div
        className={`swap-on card w-48 h-64 shadow-xl p-4 flex justify-center text-center items-center ${classBack}`}
      >
        <div>{text}</div>
      </div>
    </label>
  );
}

export default IdeateCard;
