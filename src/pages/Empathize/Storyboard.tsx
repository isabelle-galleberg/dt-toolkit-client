import { useEffect, useState, useRef } from 'react';
import ActivityPageLayout from '../../components/layout/ActivityPageLayout';
import Box from '../../components/Box';
import { usePersonaStore } from '../../store/personaStore';
import { getStory } from '../../services/storyService';
import { Story } from '../../types/story';
import lockIcon from '../../assets/Vector.png';
import { getEmotions, updateEmotions } from '../../services/emotionService';
import { useTaskProgress } from '../../context/TaskProgressContext';

function Storyboard() {
  const { persona } = usePersonaStore();
  const [story, setStory] = useState<Story | null>(null);
  const [emotions, setEmotions] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { markTaskComplete, isTaskComplete } = useTaskProgress();

  const labelToEmojiMap: { [key: string]: string } = {
    happy: '😄',
    sad: '😢',
    disappointed: '😕',
    surprised: '😲',
    angry: '😡',
    scared: '😨',
  };

  const emojiToLabelMap = Object.fromEntries(
    Object.entries(labelToEmojiMap).map(([key, value]) => [value, key])
  );

  useEffect(() => {
    if (emotions.length === 4 && !isTaskComplete('/empathize/storyboard')) {
      markTaskComplete('/empathize/storyboard');
    }
  }, [emotions, markTaskComplete, isTaskComplete]);

  useEffect(() => {
    fetchStory();
    fetchEmotions();
  }, [persona]);

  const fetchStory = async () => {
    try {
      const data = await getStory(persona?._id || '');
      if (data.length > 0) {
        setStory(data[0]);
      }
    } catch (error) {
      console.error('Error fetching story:', error);
    }
  };

  const fetchEmotions = async () => {
    try {
      const emotionLabels = (await getEmotions()) || [];
      if (emotionLabels.length !== 0) {
        setActiveIndex(emotionLabels.length);
      }
      const emotionEmojis = emotionLabels.map(
        (label) => labelToEmojiMap[label] || ''
      );
      setEmotions(emotionEmojis);
    } catch (error) {
      console.error('Error fetching emotions:', error);
    }
  };

  const handleEmojiClick = async (boxId: number, emoji: string) => {
    if (boxId >= activeIndex) {
      setActiveIndex(boxId + 1);
    }
    scrollRef.current?.scrollTo({
      left: boxId * 400,
      behavior: 'smooth',
    });

    setEmotions((prev) => {
      const updatedEmotions = [...prev];
      updatedEmotions[boxId] = emoji;
      return updatedEmotions;
    });

    const emotionLabel = emojiToLabelMap[emoji];
    if (!emotionLabel) return;

    try {
      await updateEmotions(boxId.toString(), emotionLabel);
    } catch (error) {
      console.error('Error saving emotion:', error);
    }
  };

  return (
    <div>
      <ActivityPageLayout
        header="Let's go back and see what went wrong!"
        phase="Empathize"
        phaseColor="text-empathize"
        activity={
          <div className="relative w-full max-w-5xl mx-auto">
            <div
              ref={scrollRef}
              className="flex overflow-x-auto no-scrollbar whitespace-nowrap space-x-4"
              style={{ scrollBehavior: 'smooth' }}
            >
              {story?.storyline.map((scene, index) => {
                const selectedEmoji = emotions[index];
                return (
                  <div
                    key={index}
                    className={`inline-block w-96 flex-shrink-0 relative ${index > activeIndex ? 'bg-primary rounded-xl' : ''}`}
                  >
                    <Box
                      icon={String(index + 1)}
                      header={scene[0] || ''}
                      content={
                        index > activeIndex ? (
                          <div className="flex justify-center items-center h-96">
                            <img src={lockIcon} className="w-14" alt="locked" />
                          </div>
                        ) : (
                          <div className="p-4 text-primary text-sm space-y-4 break-words whitespace-normal relative z-10">
                            <p>{scene[1]}</p>
                            <p>Pick an icon that fits their feelings!</p>
                            <div className="flex flex-col items-center space-y-2">
                              <div className="flex space-x-2 text-lg justify-center">
                                {Object.entries(labelToEmojiMap).map(
                                  ([label, emoji]) => (
                                    <div
                                      key={emoji}
                                      className="flex flex-col items-center"
                                    >
                                      <span
                                        className={`cursor-pointer transition-all rounded-full h-9 w-9 flex justify-center items-center text-center ${
                                          selectedEmoji === emoji
                                            ? 'bg-primary border-2 border-primary opacity-100'
                                            : 'grayscale opacity-50'
                                        }`}
                                        onClick={() =>
                                          handleEmojiClick(index, emoji)
                                        }
                                      >
                                        {emoji}
                                      </span>
                                      <span
                                        className={`text-xs mt-1 ${selectedEmoji === emoji ? 'font-bold' : ''}`}
                                      >
                                        {label}
                                      </span>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      }
                      bottomContent={
                        index <= activeIndex && (
                          <div className="flex flex-col items-center space-y-4">
                            <div className="w-40 h-40 flex justify-center items-center">
                              <img
                                src={persona?.personaImageUrl}
                                alt="emotion"
                              />
                            </div>
                          </div>
                        )
                      }
                      fillHeight={true}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        }
      />
    </div>
  );
}

export default Storyboard;
