import cardLogo from '../../assets/idea-card-logo.png';

interface CardProps {
  text: string;
}

function IdeateCard({ text }: CardProps) {
  return (
    <label className="swap swap-flip">
      <input type="checkbox" />
      <div className="swap-off card w-40 h-52 shadow-xl bg-[#1ab3f7] p-4 justify-between text-center items-center">
        <img src={cardLogo} alt="idea-card-logo" className="w-16 pt-2" />
        <div className="text-[#beebfa] font-semibold text-lg">IDEA CARD</div>
      </div>
      <div className="swap-on card w-40 h-52 shadow-xl bg-[#beebfa] p-4 justify-between text-center text-[#1ab3f7] pt-8">
        <div>{text}</div>
        <div className="font-semibold text-lg">IDEA CARD</div>
      </div>
    </label>
  );
}

export default IdeateCard;
