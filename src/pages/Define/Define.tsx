import { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import { ProblemExploration } from '../../types/define';
import { usePersonaStore } from '../../store/personaStore';
import DefineBox from '../../components/DefineDragAndDrop/DraggableItemsDefine';
import {
  getCauses,
  getConsequences,
  getProblems,
} from '../../services/defineService';
import { useTaskProgress } from '../../context/TaskProgressContext';

function DefinePage() {
  const [problems, setProblems] = useState<ProblemExploration[]>([]);
  const [causes, setCauses] = useState<ProblemExploration[]>([]);
  const [consequences, setConsequences] = useState<ProblemExploration[]>([]);
  const { persona } = usePersonaStore();
  const personaId = persona?._id;
  const { markTaskComplete, markTaskUndone, isTaskComplete } =
    useTaskProgress();

  useEffect(() => {
    if (personaId) {
      const fetchDefineData = async () => {
        try {
          const problemsResponse = await getProblems(personaId);
          setProblems(problemsResponse || []);

          const causesResponse = await getCauses(personaId);
          setCauses(causesResponse || []);

          const consequencesResponse = await getConsequences(personaId);
          setConsequences(consequencesResponse || []);
        } catch (error) {
          console.error('Error fetching define data:', error);
        }
      };

      fetchDefineData();
    }
  }, [personaId]);

  // Update so it changes correctly
  useEffect(() => {
    if (problems.length > 0 && causes.length > 0 && consequences.length > 0) {
      if (!isTaskComplete('/define')) markTaskComplete('/define');
    } else {
      if (isTaskComplete('/define')) markTaskUndone('/define');
    }
  }, [
    causes,
    consequences,
    isTaskComplete,
    markTaskComplete,
    markTaskUndone,
    problems,
  ]);

  return (
    <div>
      <Layout
        topContentTitle="Task: Define Their Problem!"
        topContentText="Now that you've created your persona, it's time to identify their main problem. Let's explore what happened, why it happened, and the consequences. By understanding these details, we can clearly define the problem and create a problem statement to guide our solution!"
        bottomContent={
          <div className="flex flex-col items-center w-full space-y-8">
            <div className="flex w-full justify-center space-x-8">
              <DefineBox
                headerText="What's the main problem?"
                items={problems}
                listType="problems"
                editable={true}
              />
              <DefineBox
                headerText="Why did this happen?"
                items={causes}
                listType="causes"
                editable={true}
              />
              <DefineBox
                headerText="What are the consequences of this problem?"
                items={consequences}
                listType="consequences"
                editable={true}
              />
            </div>
          </div>
        }
      />
    </div>
  );
}

export default DefinePage;
