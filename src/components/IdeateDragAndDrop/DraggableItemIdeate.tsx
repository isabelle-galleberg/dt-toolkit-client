type Item = {
  _id: string;
  text: string;
};

type DraggableItemProps = {
  item: Item;
  onDragStart: (event: React.DragEvent<HTMLDivElement>, item: Item) => void;
};

function DraggableItemIdeate({ item, onDragStart }: DraggableItemProps) {
  return (
    <div
      draggable
      onDragStart={(event) => onDragStart(event, item)}
      className="cursor-grab bg-ideate text-primary w-24 h-24 p-1 rounded-xl shadow-xl transition-transform duration-200 ease-in-out hover:scale-105 flex flex-col justify-center text-center"
    >
      {item.text}
    </div>
  );
}

export default DraggableItemIdeate;
