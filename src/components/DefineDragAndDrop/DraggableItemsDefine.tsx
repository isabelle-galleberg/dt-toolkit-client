import React, { useCallback, useEffect, useState } from 'react';
import { usePersonaStore } from '../../store/personaStore';
import { ProblemExploration } from '../../types/define';
import {
  addProblemExploration,
  deleteProblemExploration,
} from '../../services/defineService';

type DraggableItemsProps = {
  headerText: string;
  items: ProblemExploration[];
  listType: 'problems' | 'causes' | 'consequences';
  editable: boolean;
};

const DraggableItemsDefine: React.FC<DraggableItemsProps> = ({
  headerText,
  items,
  listType,
  editable,
}) => {
  const [inputText, setInputText] = useState('');
  const [itemList, setItemList] = useState<ProblemExploration[]>(items);

  const { persona } = usePersonaStore();
  const personaId = persona?._id;

  useEffect(() => {
    setItemList(items);
  }, [items]);

  const onDragStart = useCallback(
    (event: React.DragEvent<HTMLDivElement>, index: number) => {
      event.dataTransfer.setData('dragIndex', index.toString());
      event.dataTransfer.setData('listType', listType);
    },
    [listType]
  );

  const handleAddItem = async () => {
    if (inputText.trim() && personaId) {
      try {
        const updatedDefine = await addProblemExploration(
          personaId,
          listType,
          inputText
        );

        setItemList(updatedDefine[listType]);

        setInputText('');
      } catch (error) {
        console.error('Error adding problem exploration:', error);
      }
    }
  };

  const handleDeleteText = async (itemId: string) => {
    if (!personaId) return;

    try {
      await deleteProblemExploration(personaId, listType, itemId);

      setItemList((prevList) => prevList.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error('Error deleting problem exploration:', error);
    }
  };

  return (
    <div className="flex flex-col border border-primary rounded-xl p-4 w-80 bg-dark text-primary shadow-lg">
      <p className="text-center font-semibold text-sm mb-4">{headerText}</p>
      <div className="flex flex-col gap-2">
        {itemList.map((item, index) => (
          <div
            key={item._id}
            className="p-3 bg-define text-empathize rounded-lg shadow-md cursor-pointer text-sm flex justify-between items-center"
            draggable
            onDragStart={(e) => onDragStart(e, index)}
          >
            <span className="flex-1 px-1">{item?.text}</span>
            {editable && (
              <button
                className="btn btn-ghost btn-xs text-empathize ml-2"
                onClick={() => handleDeleteText(item._id)}
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>
      {editable && (
        <div className="mt-3 flex flex-col items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type here..."
            className="input input-bordered w-full mb-2 text-empathize text-sm"
          />
          <button
            className="w-full p-2 border border-empathize rounded-lg text-empathize hover:bg-empathize hover:text-define transition"
            onClick={handleAddItem}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default DraggableItemsDefine;
