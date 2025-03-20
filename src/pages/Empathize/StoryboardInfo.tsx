import { useEffect, useState } from 'react';
import ActivityPageLayout from '../../components/layout/ActivityPageLayout';
import { useTaskProgress } from '../../context/TaskProgressContext';
import { usePersonaStore } from '../../store/personaStore';
import { Story } from '../../types/story';
import { getStory } from '../../services/storyService';

// TODO: create unique text for each persona!
function StoryboardInfo() {
  const { markTaskComplete, isTaskComplete } = useTaskProgress();
  const { persona } = usePersonaStore();
  const [story, setStory] = useState<Story | null>(null);

  useEffect(() => {
    if (!isTaskComplete('/empathize/storyboard-info')) {
      markTaskComplete('/empathize/storyboard-info');
    }
  }, [isTaskComplete, markTaskComplete]);

  const fetchStory = async () => {
    try {
      const story = await getStory(persona?._id || '');
      setStory(story);
    } catch (error) {
      console.error('Error fetching story:', error);
    }
  };

  useEffect(() => {
    fetchStory();
  }, [persona]);

  return (
    <>
      <ActivityPageLayout
        header="Ohh no ..!"
        text={
          <>
            {story?.introduction[0]}
            <br />
            {story?.introduction[1]}
            <br />
            <br />
            🔍 What went wrong? Let's figure it out!
          </>
        }
        centerContent={true}
      ></ActivityPageLayout>
    </>
  );
}

export default StoryboardInfo;
