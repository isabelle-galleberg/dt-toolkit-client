interface StickyProps {
  text: string;
}

function Sticky({ text }: StickyProps) {
  return (
    <div className="rounded-xl w-24 h-24 shadow-xl bg-ideate p-1 flex flex-col justify-center text-center text-[#beebfa] break-words">
      <div className="text-primary break-words">{text}</div>
    </div>
  );
}

export default Sticky;
