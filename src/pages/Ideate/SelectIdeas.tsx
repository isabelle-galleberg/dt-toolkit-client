import DragAndDropContainer from '../../components/IdeateDragAndDrop/DragAndDropIdeate';
import Layout from '../../components/layout/Layout';

function SelectIdeas() {
  return (
    <Layout
      topContentTitle={'Task: Select Your Favorite Ideas!'}
      topContentText={
        "Now that you have brainstormed a variety of creative solutions, it is time to narrow them down. Use the drag-and-drop feature to choose the ideas you like best. Let's pick the ideas that truly stand out!"
      }
      middleContent={
        <p className="card bg-base-300 rounded-xl p-4">
          Our persona, [persona's name], has the problem of [main problem],
          which happened because [cause]. This has led to [consequences].
        </p>
      }
      bottomContent={
        <div>
          <DragAndDropContainer />
        </div>
      }
    />
  );
}

export default SelectIdeas;
