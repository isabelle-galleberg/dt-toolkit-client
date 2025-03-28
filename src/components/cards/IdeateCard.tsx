interface CardProps {
  text: string;
  classOff?: string;
  classOn?: string;
}

function IdeateCard({ text, classOff, classOn }: CardProps) {
  return (
    <label className="swap swap-flip cursor-pointer">
      <input type="checkbox" readOnly />
      <div
        className={`swap-off card w-48 h-64 shadow-xl p-4 flex justify-center text-center items-center ${classOff}`}
      >
        <div className="text-3xl">?</div>
      </div>
      <div
        className={`swap-on card w-48 h-64 shadow-xl p-4 flex justify-center text-center items-center ${classOn}`}
      >
        <div>{text}</div>
      </div>
    </label>
  );
}

export default IdeateCard;
