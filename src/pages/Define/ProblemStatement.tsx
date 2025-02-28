import DragAndDrop from '../../components/DefineDragAndDrop/DragAndDropDefine';
import Layout from '../../components/layout/Layout';

function ProblemStatement() {
  return (
    <div>
      <Layout
        topContentTitle={'Task: Turn it into a Problem Statement!'}
        topContentText={
          "Now that you've brainstormed the problem, its cause, and consequences, it's time to summarize everything into a clear problem statement. Use this template to help you!"
        }
        middleContent={<DragAndDrop />}
      />
    </div>
  );
}

export default ProblemStatement;
