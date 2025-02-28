// import { useEffect, useState } from 'react';
// import DraggableItem from './DraggableItemIdeate';
// import DropZone from './DropZoneIdeate';
// import { getIdeas } from '../../services/ideaService';
// import { Idea } from '../../types/idea';
// import { useTaskProgress } from '../../context/TaskProgressContext';

function DragAndDropIdeate() {
  // const [dropZones, setDropZones] = useState<Idea[][]>([[], [], []]);
  // const [ideas, setIdeas] = useState<Idea[]>([]);
  // const { markTaskComplete, markTaskUndone, isTaskComplete } =
  //   useTaskProgress();

  // useEffect(() => {
  //   const allDropZonesFilled = dropZones.every((zone) => zone.length > 0);

  //   if (allDropZonesFilled !== isTaskComplete('/ideate/select-ideas')) {
  //     if (allDropZonesFilled) {
  //       markTaskComplete('/ideate/select-ideas');
  //     } else {
  //       markTaskUndone('/ideate/select-ideas');
  //     }
  //   }
  // }, [dropZones, isTaskComplete, markTaskComplete, markTaskUndone]);

  // useEffect(() => {
  //   const fetchIdeas = async () => {
  //     try {
  //       const data = await getIdeas();
  //       setIdeas(data);
  //     } catch (error) {
  //       console.error('Error fetching ideas', error);
  //     }
  //   };
  //   fetchIdeas();
  // }, []);

  // const handleDragStart = (
  //   event: React.DragEvent<HTMLDivElement>,
  //   idea: Idea
  // ) => {
  //   event.dataTransfer.setData('application/json', JSON.stringify(idea));
  // };

  // const handleDrop = (idea: Idea, index: number) => {
  //   setDropZones((prev) => {
  //     const newDropZones = [...prev];
  //     if (index === 0 || newDropZones[index].length === 0) {
  //       newDropZones[index] = [...(newDropZones[index] || []), idea];
  //     }
  //     return newDropZones;
  //   });
  //   setIdeas((prev) => prev.filter((i) => i._id !== idea._id));
  // };

  // const handleRemove = (idea: Idea, index: number) => {
  //   setDropZones((prev) => {
  //     const newDropZones = [...prev];
  //     newDropZones[index] = newDropZones[index].filter(
  //       (i) => i._id !== idea._id
  //     );
  //     return newDropZones;
  //   });
  //   setIdeas((prev) => [...prev, idea]);
  // };

  return (
    <div className="h-full flex flex-row space-x-16">
      {/* <div
        className={'flex-1 bg-primary p-4 rounded-xl'}
        style={{ minWidth: '464px', minHeight: '464px' }}
      >
        <div className="grid grid-cols-4 gap-4">
          {ideas.map((idea) => (
            <div key={idea._id} className="relative">
              <DraggableItem
                key={idea._id}
                item={idea}
                onDragStart={handleDragStart}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="h-fit space-y-4 border border-primary p-4 rounded-xl shadow-xl place-items-center text-primary">
        <p>Your Top Ideas</p>
        {dropZones.map((ideas, index) => (
          <DropZone
            key={index}
            items={ideas}
            index={index}
            onDrop={handleDrop}
            onRemove={handleRemove}
            allowMultiple={false}
            width={index === 0 ? '150px' : '150px'}
            height={index === 0 ? '75px' : '75px'}
          />
        ))}
      </div> */}
    </div>
  );
}

export default DragAndDropIdeate;
