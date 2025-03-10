import { useEffect, useState, useRef } from 'react';
import ActivityPageLayout from '../../components/layout/ActivityPageLayout';
import Box from '../../components/Box';
import { usePersonaStore } from '../../store/personaStore';
import { getStory } from '../../services/storyService';
import { Story } from '../../types/story';
import lockIcon from '../../assets/Vector.png';
import { addEmotion, getEmotions } from '../../services/emotionService';

function Storyboard() {
  const { persona } = usePersonaStore();
  const [story, setStory] = useState<Story | null>(null);
  const [emotions, setEmotions] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const labelToEmojiMap: { [key: string]: string } = {
    happy: '😄',
    sad: '😢',
    disappointed: '😕',
    surprised: '😲',
    angry: '😡',
    scared: '😨',
  };

  // map emojis to labels (for API requests)
  const emojiToLabelMap = Object.fromEntries(
    Object.entries(labelToEmojiMap).map(([key, value]) => [value, key])
  );

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const data = await getStory(persona?._id || '');
        if (data.length > 0) {
          setStory(data[0]);
          fetchEmotions(data[0].storyline.length);
        }
      } catch (error) {
        console.error('Error fetching story:', error);
      }
    };
    fetchStory();
  }, [persona]);

  const fetchEmotions = async (storyLength: number) => {
    try {
      const emotionsData = (await getEmotions())[0]?.emotions || [];
      if (emotionsData.length !== 0) {
        setActiveIndex(emotionsData.length - 1);
      }

      const emotionsArray = new Array(storyLength)
        .fill('')
        .map((_, index) =>
          emotionsData[index] ? labelToEmojiMap[emotionsData[index]] || '' : ''
        );

      setEmotions(emotionsArray);
    } catch (error) {
      console.error('Error fetching emotions:', error);
    }
  };

  const handleEmojiClick = (boxId: number, emoji: string) => {
    setEmotions((prev) => {
      const updatedEmotions = [...prev];
      updatedEmotions[boxId] = emoji;
      return updatedEmotions;
    });
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleNextClick = async () => {
    const selectedEmoji = emotions[activeIndex];
    if (!selectedEmoji) return;

    const emotionLabel = emojiToLabelMap[selectedEmoji];
    if (!emotionLabel) return;

    try {
      await addEmotion(emotionLabel);
    } catch (error) {
      console.error('Error adding emotion:', error);
    }

    if (story && activeIndex < story.storyline.length - 1) {
      setActiveIndex((prev) => prev + 1);
      scroll('right');
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
                const imageKey = selectedEmoji
                  ? emojiToLabelMap[selectedEmoji]
                  : null;
                const imageUrl =
                  imageKey && story
                    ? story[imageKey as keyof Story] || persona?.personaImageUrl
                    : persona?.personaImageUrl;

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
                                        className={`cursor-pointer transition-all rounded-full h-10 w-10 flex justify-center items-center text-center ${
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
                              <img src={imageUrl} alt="emotion" />
                            </div>
                            <button
                              className="btn btn-primary"
                              onClick={handleNextClick}
                              disabled={!selectedEmoji}
                            >
                              Next
                            </button>
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
