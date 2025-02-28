import { useCallback, useState } from 'react';

type Item = {
  _id: string;
  text: string;
};

type DropZoneProps = {
  items: Item[];
  index: number; // index of the drop zone
  onDrop: (item: Item, index: number) => void;
  onRemove: (item: Item, index: number) => void;
  allowMultiple: boolean;
  width?: string;
  height?: string;
};

function DropZoneIdeate({
  items,
  index,
  onDrop,
  onRemove,
  allowMultiple,
  width = '150px',
  height = '75px',
}: DropZoneProps) {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsOver(true);
    },
    []
  );

  const handleDragLeave = useCallback(() => setIsOver(false), []);

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsOver(false);
      const data = event.dataTransfer.getData('application/json');
      if (!data) return;
      try {
        const draggedItem = JSON.parse(data) as Item;
        if (allowMultiple || items.length === 0) {
          onDrop(draggedItem, index);
        }
      } catch (error) {
        console.error('Error parsing dragged item:', error);
      }
    },
    [onDrop, index, allowMultiple, items]
  );

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex items-center justify-center border-2 rounded-xl transition-all duration-200 ${isOver ? 'border-ideate scale-105' : 'border-primary'} ${items.length ? 'bg-ideate' : 'bg-primary'}`}
      style={{ width, height }}
    >
      {items.length > 0 ? (
        <div className="flex flex-col space-y-2 w-full h-full">
          {items.map((i) => (
            <div
              key={i._id}
              className="bg-ideate p-2 rounded-xl text-primary shadow-md cursor-pointer flex items-center justify-center"
              style={{ width: '100%', height: '100%' }}
              onClick={() => onRemove(i, index)}
            >
              {i.text}
            </div>
          ))}
        </div>
      ) : (
        <span className="text-primary"></span>
      )}
    </div>
  );
}

export default DropZoneIdeate;
