import React, { useCallback } from 'react';
import { ProblemExploration } from '../../types/define';

type DropZoneProps = {
  items: ProblemExploration[];
  index: number; // index of the drop zone
  onDrop: (event: React.DragEvent<HTMLSpanElement>, index: number) => void;
  onRemove: (index: number, item: ProblemExploration) => void;
};

const DropZoneDefine: React.FC<DropZoneProps> = ({
  items,
  index,
  onDrop,
  onRemove,
}) => {
  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLSpanElement>) => {
      event.preventDefault();
    },
    []
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLSpanElement>) => {
      onDrop(event, index);
    },
    [onDrop, index]
  );

  const getPlaceholderText = () => {
    if (items.length === 0) {
      switch (index) {
        case 1:
          return '[main problem]';
        case 2:
          return '[cause]';
        case 3:
          return '[consequences]';
        default:
          return '';
      }
    }
    return '';
  };

  const isEmpty = items.length === 0;

  return (
    <span
      className={`inline-block px-3 py-2 rounded-lg mx-1 my-1 transition duration-200 ease-in-out
        ${isEmpty ? 'border-2 border-empathize text-empathize cursor-default' : 'bg-empathize text-define cursor-pointer hover:scale-105'}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      role="textbox"
    >
      {isEmpty ? (
        <span>{getPlaceholderText()}</span>
      ) : (
        items.map((item, i) => (
          <span
            key={item._id}
            onClick={() => onRemove(index, item)}
            className="cursor-pointer"
          >
            {item.text}
            {i < items.length - 2
              ? ', '
              : i === items.length - 2
                ? ' and '
                : ''}
          </span>
        ))
      )}
    </span>
  );
};

export default DropZoneDefine;
