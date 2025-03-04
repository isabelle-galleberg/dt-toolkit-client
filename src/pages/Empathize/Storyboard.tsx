import { useEffect, useState } from 'react';
import ActivityPageLayout from '../../components/layout/ActivityPageLayout';
import Box from '../../components/Box';
import { usePersonaStore } from '../../store/personaStore';
import { useTaskProgress } from '../../context/TaskProgressContext';

function Storyboard() {
  const { persona } = usePersonaStore();
  const { markTaskComplete, markTaskUndone, isTaskComplete } =
    useTaskProgress();
  const [selectedEmojis, setSelectedEmojis] = useState<{
    [key: number]: string;
  }>({});

  const handleEmojiClick = (boxId: number, emoji: string) => {
    setSelectedEmojis((prev) => ({
      ...prev,
      [boxId]: emoji,
    }));
  };

  const emojiOptions = ['😄', '😢', '😕', '🥱', '😲', '😡', '😨'];

  //TODO: save selected emojies to the db

  useEffect(() => {
    const allEmojisSelected = Object.keys(selectedEmojis).length === 4;
    if (allEmojisSelected) {
      if (!isTaskComplete('/empathize/storyboard')) {
        markTaskComplete('/empathize/storyboard');
      }
    } else {
      if (isTaskComplete('/empathize/storyboard')) {
        markTaskUndone('/empathize/storyboard');
      }
    }
  }, [selectedEmojis, markTaskComplete, markTaskUndone, isTaskComplete]);

  return (
    <div>
      <ActivityPageLayout
        header="Let's go back and see what went wrong!"
        phase="Empathize"
        phaseColor="text-empathize"
        activity={
          <div className="relative w-full max-w-5xl mx-auto">
            <div className="flex md:flex-row flex-wrap">
              {/* Box 1 */}
              <div className="w-full md:w-1/4 p-1 text-gray-200 grid grid-rows-[auto_1fr] gap-2">
                <div className="mb-2">
                  <img
                    src={persona?.personaImageUrl}
                    alt="persona"
                    className="w-28"
                  />
                </div>
                <div>
                  <Box
                    icon="1"
                    header={persona?.storyline[0][0] || ''}
                    content={
                      <div className="p-4 text-primary text-sm">
                        {persona?.storyline[0][1] || ''}
                        <br />
                        <br />
                        {persona?.storyline[0][2] || ''}
                      </div>
                    }
                    bottomContent={
                      <div className="flex space-x-2 text-lg justify-center items-end">
                        {emojiOptions.map((emoji) => (
                          <span
                            key={emoji}
                            className="cursor-pointer transition-all"
                            style={{
                              filter:
                                selectedEmojis[1] === emoji
                                  ? 'none'
                                  : 'grayscale(100%)',
                              opacity: selectedEmojis[1] === emoji ? 1 : 0.5,
                            }}
                            onClick={() => handleEmojiClick(1, emoji)}
                          >
                            {emoji}
                          </span>
                        ))}
                      </div>
                    }
                    fillHeight={true}
                  />
                </div>
              </div>
              {/* Box 2 */}
              <div className="w-full md:w-1/4 p-1 text-gray-700">
                <Box
                  icon="2"
                  header={persona?.storyline[1][0] || ''}
                  content={
                    <div className="p-4 text-primary text-sm space-y-4">
                      {persona?.storyline[1][1] || ''}
                      <br />
                      <br />
                      {persona?.storyline[1][2] || ''}
                    </div>
                  }
                  bottomContent={
                    <div className="flex space-x-2 text-lg justify-center items-end">
                      {emojiOptions.map((emoji) => (
                        <span
                          key={emoji}
                          className="cursor-pointer transition-all"
                          style={{
                            filter:
                              selectedEmojis[2] === emoji
                                ? 'none'
                                : 'grayscale(100%)',
                            opacity: selectedEmojis[2] === emoji ? 1 : 0.5,
                          }}
                          onClick={() => handleEmojiClick(2, emoji)}
                        >
                          {emoji}
                        </span>
                      ))}
                    </div>
                  }
                  fillHeight={true}
                />
              </div>
              {/* Box 3 */}
              <div className="w-full md:w-2/4 p-1 text-gray-200 grid grid-rows-[auto_1fr] gap-2">
                <div>
                  <Box
                    icon="3"
                    header={persona?.storyline[2][0] || ''}
                    content={
                      <div className="p-4 text-primary text-sm">
                        {persona?.storyline[2][1] || ''}
                        <br />
                        <br />
                        {persona?.storyline[2][2] || ''}
                      </div>
                    }
                    bottomContent={
                      <div className="flex space-x-2 text-lg justify-center items-end">
                        {emojiOptions.map((emoji) => (
                          <span
                            key={emoji}
                            className="cursor-pointer transition-all"
                            style={{
                              filter:
                                selectedEmojis[3] === emoji
                                  ? 'none'
                                  : 'grayscale(100%)',
                              opacity: selectedEmojis[3] === emoji ? 1 : 0.5,
                            }}
                            onClick={() => handleEmojiClick(3, emoji)}
                          >
                            {emoji}
                          </span>
                        ))}
                      </div>
                    }
                    fillHeight={true}
                  />
                </div>
                {/* Box 4 */}
                <div>
                  <Box
                    icon="4"
                    header={persona?.storyline[3][0] || ''}
                    content={
                      <div className="p-4 text-primary text-sm">
                        {persona?.storyline[3][1] || ''}
                        <br />
                        <br />
                        {persona?.storyline[3][2] || ''}
                      </div>
                    }
                    bottomContent={
                      <div className="flex space-x-2 text-lg justify-center items-end">
                        {emojiOptions.map((emoji) => (
                          <span
                            key={emoji}
                            className="cursor-pointer transition-all"
                            style={{
                              filter:
                                selectedEmojis[4] === emoji
                                  ? 'none'
                                  : 'grayscale(100%)',
                              opacity: selectedEmojis[4] === emoji ? 1 : 0.5,
                            }}
                            onClick={() => handleEmojiClick(4, emoji)}
                          >
                            {emoji}
                          </span>
                        ))}
                      </div>
                    }
                    fillHeight={true}
                  />
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}

export default Storyboard;
