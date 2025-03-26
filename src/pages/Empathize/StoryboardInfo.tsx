import { useEffect, useState } from 'react';
import ActivityPageLayout from '../../components/layout/ActivityPageLayout';
import { useTaskProgress } from '../../context/TaskProgressContext';
import { usePersonaStore } from '../../store/personaStore';
import { Story } from '../../types/story';
import { getStory } from '../../services/storyService';
import LoadingSpinner from '../../components/LoadingSpinner';
import ProgressBar from '../../components/ProgressBar';

function StoryboardInfo() {
  const { markTaskComplete, isTaskComplete } = useTaskProgress();
  const { persona } = usePersonaStore();
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isTaskComplete('/empathize/storyboard-info')) {
      markTaskComplete('/empathize/storyboard-info');
    }
  }, [isTaskComplete, markTaskComplete]);

  const fetchStory = async () => {
    setLoading(true);
    try {
      const story = await getStory(persona?._id || '');
      setStory(story);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching story:', error);
    }
  };

  useEffect(() => {
    fetchStory();
  }, [persona]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <ProgressBar
        phase="empathize"
        moveProgressBar={false}
        currentStep={2}
        totalSteps={4}
      />
      <ActivityPageLayout
        header="Ohh no ..! 😱"
        text={
          <div>
            {story?.introduction[0]}
            <br />
            {story?.introduction[1]}
            <br />
            <br />
            🔍 What went wrong? Let's figure it out!
          </div>
        }
        centerContent={true}
      />
    </>
  );
}

export default StoryboardInfo;
