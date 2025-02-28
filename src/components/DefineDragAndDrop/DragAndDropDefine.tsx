import React, { useEffect, useState } from 'react';
import DropZone from './DropZoneDefine';
import { ProblemExploration } from '../../types/define';
import {
  getCauses,
  getConsequences,
  getProblems,
  toggleSelected,
} from '../../services/defineService';
import { usePersonaStore } from '../../store/personaStore';
import DraggableItems from './DraggableItemsDefine';
import { getPersona } from '../../services/personaService';
import { useTaskProgress } from '../../context/TaskProgressContext';

function DragAndDropDefine() {
  const [personaName, setPersonaName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [, setSentence] = useState<ProblemExploration[][]>(Array(4).fill([]));
  const [items, setItems] = useState({
    problems: [] as ProblemExploration[],
    causes: [] as ProblemExploration[],
    consequences: [] as ProblemExploration[],
  });

  const { persona } = usePersonaStore();
  const personaId = persona?._id;
  const { markTaskComplete, markTaskUndone, isTaskComplete } =
    useTaskProgress();

  // Fetch problems, causes and consequences
  useEffect(() => {
    if (personaId) {
      const fetchDefineData = async () => {
        try {
          setItems({
            problems: (await getProblems(personaId)) || [],
            causes: (await getCauses(personaId)) || [],
            consequences: (await getConsequences(personaId)) || [],
          });
        } catch (error) {
          console.error('Error fetching define data:', error);
        }
      };
      fetchDefineData();
    }
  }, [personaId]);

  // Fetch persona name
  useEffect(() => {
    if (!personaId) return;
    const fetchPersonaName = async () => {
      try {
        const fetchedPersona = await getPersona(personaId);
        setPersonaName(fetchedPersona?.name || '');
      } catch (error) {
        console.error('Error fetching persona name:', error);
      }
    };
    fetchPersonaName();
  }, [personaId]);

  const isValidDrop = (targetIndex: number, listType: string): boolean => {
    return (
      (targetIndex === 1 && listType === 'problems') ||
      (targetIndex === 2 && listType === 'causes') ||
      (targetIndex === 3 && listType === 'consequences')
    );
  };

  const updateSentence = (
    targetIndex: number,
    itemToMove: ProblemExploration
  ) => {
    setSentence((prev) => {
      const updated = [...prev];
      updated[targetIndex] = [...updated[targetIndex], itemToMove];
      return updated;
    });
  };

  const handleDrop = async (
    event: React.DragEvent<HTMLSpanElement>,
    targetIndex: number
  ) => {
    event.preventDefault();
    const dragIndex = parseInt(event.dataTransfer.getData('dragIndex'), 10);
    const listType = event.dataTransfer.getData(
      'listType'
    ) as keyof typeof items;
    if (isNaN(dragIndex) || !items[listType]) return;
    const itemToDrop = items[listType][dragIndex];

    if (isValidDrop(targetIndex, listType)) {
      if (!personaId) {
        return;
      }

      itemToDrop.selected = true;
      handleToggleSelected(itemToDrop, listType);
      updateSentence(targetIndex, itemToDrop);

      setFeedback('');
    } else {
      setFeedback("Oops! That item doesn't belong here.");
    }
  };

  const onRemove = (index: number, itemToRemove: ProblemExploration) => {
    itemToRemove.selected = false;
    handleToggleSelected(itemToRemove, getListTypeByIndex(index));

    setSentence((prev) => {
      const updated = [...prev];
      updated[index] = updated[index].filter(
        (item) => item._id !== itemToRemove._id
      );
      return updated;
    });
  };

  const handleToggleSelected = async (
    item: ProblemExploration,
    listType: keyof typeof items
  ) => {
    if (!personaId) return;

    try {
      const updatedItem = await toggleSelected(personaId, listType, item._id);

      setItems((prevItems) => {
        const updatedItems = { ...prevItems };
        updatedItems[listType] = updatedItems[listType].map((i) =>
          i._id === updatedItem._id
            ? { ...i, selected: updatedItem.selected }
            : i
        );
        return updatedItems;
      });
    } catch (error) {
      console.error('Error toggling selected state:', error);
    }
  };

  const getListTypeByIndex = (index: number): keyof typeof items => {
    if (index === 1) return 'problems';
    if (index === 2) return 'causes';
    if (index === 3) return 'consequences';
    return 'problems';
  };

  // Check if all problem categories are explored
  useEffect(() => {
    if (
      items.problems.some((problem) => problem.selected) &&
      items.causes.some((cause) => cause.selected) &&
      items.consequences.some((consequence) => consequence.selected)
    ) {
      if (!isTaskComplete('/define/problem-statement'))
        markTaskComplete('/define/problem-statement');
    } else {
      if (isTaskComplete('/define/problem-statement'))
        markTaskUndone('/define/problem-statement');
    }
  }, [
    isTaskComplete,
    items.causes,
    items.consequences,
    items.problems,
    markTaskComplete,
    markTaskUndone,
  ]);

  return (
    <div className="flex flex-col items-center w-full border-opacity-50 px-4">
      <div className="w-full max-w-4xl mb-4">
        <div className="border rounded-lg p-4 bg-define shadow-lg text-empathize">
          <p>
            Your persona, {personaName}, has the problem of{' '}
            <DropZone
              items={items.problems.filter((problem) => problem.selected)}
              index={1}
              onDrop={handleDrop}
              onRemove={onRemove}
            />
            , which happened because{' '}
            <DropZone
              items={items.causes.filter((cause) => cause.selected)}
              index={2}
              onDrop={handleDrop}
              onRemove={onRemove}
            />
            . This has led to{' '}
            <DropZone
              items={items.consequences.filter(
                (consequence) => consequence.selected
              )}
              index={3}
              onDrop={handleDrop}
              onRemove={onRemove}
            />
            .
          </p>
        </div>
      </div>

      <div className="flex justify-between gap-4 mt-4 items-top">
        <DraggableItems
          headerText="What's the main problem?"
          items={items.problems.filter((problem) => !problem.selected)}
          listType="problems"
          editable={false}
        />
        <DraggableItems
          headerText="Why did this happen?"
          items={items.causes.filter((cause) => !cause.selected)}
          listType="causes"
          editable={false}
        />
        <DraggableItems
          headerText="What are the consequences of this problem?"
          items={items.consequences.filter(
            (consequence) => !consequence.selected
          )}
          listType="consequences"
          editable={false}
        />
      </div>

      {feedback && <div className="mt-4">{feedback}</div>}
    </div>
  );
}

export default DragAndDropDefine;
