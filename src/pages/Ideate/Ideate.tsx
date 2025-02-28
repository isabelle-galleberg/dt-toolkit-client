import { useEffect, useState } from 'react';
import IdeateCard from '../../components/cards/IdeateCard';
import Sticky from '../../components/Sticky';
import { Idea } from '../../types/idea';
import { getIdeas, addIdea, deleteIdea } from '../../services/ideaService';
import Layout from '../../components/layout/Layout';
import { useTaskProgress } from '../../context/TaskProgressContext';

function Ideate() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [ideaText, setIdeaText] = useState<string>('');
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const { markTaskComplete, markTaskUndone, isTaskComplete } =
    useTaskProgress();

  const cardTexts = [
    'What would a superhero do to solve this problem?',
    'How might we approach this from a different perspective?',
    'What is the root cause of this challenge?',
    'How can we make this solution more sustainable?',
    'What would the ideal outcome look like?',
  ];

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const data = await getIdeas();
        setIdeas(data);
      } catch (error) {
        console.error('Error fetching ideas', error);
      }
    };
    fetchIdeas();
  }, []);

  useEffect(() => {
    if (ideas.length > 2 && !isTaskComplete('/ideate')) {
      markTaskComplete('/ideate');
    } else if (!(ideas.length > 2) && isTaskComplete('/ideate')) {
      markTaskUndone('/ideate');
    }
  }, [ideas, isTaskComplete, markTaskComplete, markTaskUndone]);

  const handleAddIdea = async () => {
    if (!ideaText.trim()) return;
    try {
      const newIdea = await addIdea({ text: ideaText });
      setIdeas((prevIdeas) => [...prevIdeas, newIdea]);
      setIdeaText('');
    } catch (error) {
      console.error('Error adding idea', error);
    }
  };

  const handleDeleteIdea = async (id: string) => {
    try {
      await deleteIdea(id);
      setIdeas((prevIdeas) => prevIdeas.filter((idea) => idea._id !== id));
    } catch (error) {
      console.error('Error deleting idea', error);
    }
  };

  const handleNextCard = () => {
    if (currentCardIndex < cardTexts.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handlePreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  return (
    <Layout
      topContentTitle={'Task: Brainstorm Solutions!'}
      topContentText={
        "It's time to get creative! Think of as many ways as possible to help your persona solve their problem. Remember, there are no wrong answers! Write down your ideas below or use the inspiration cards to spark your imagination."
      }
      middleContent={
        <p className="card bg-define text-empathize rounded-xl p-4">
          Our persona, [persona's name], has the problem of [main problem],
          which happened because [cause]. This has led to [consequences].
        </p>
      }
      bottomContent={
        <div className="h-full flex flex-row space-x-16">
          <div
            className={'flex-1 bg-primary p-4 rounded-xl'}
            style={{ minWidth: '464px', minHeight: '464px' }}
          >
            <div className="grid grid-cols-4 gap-4">
              {ideas.map((idea) => (
                <div key={idea._id} className="relative">
                  <button
                    className="absolute top-1 right-1 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    onClick={() => handleDeleteIdea(idea._id)}
                  >
                    ✕
                  </button>
                  <Sticky text={idea.text} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col space-y-4">
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Type your ideas here..."
                value={ideaText}
                onChange={(e) => setIdeaText(e.target.value)}
                maxLength={35}
              ></textarea>
              <button
                className="btn bg-ideate text-white w-full"
                onClick={handleAddIdea}
              >
                Add to board
              </button>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <button
                className="btn btn-circle bg-ideate hover:bg-[#1799d1] text-white"
                onClick={handlePreviousCard}
                disabled={currentCardIndex === 0}
              >
                ←
              </button>
              <div className="relative w-48 h-80 overflow-hidden">
                <div
                  className="absolute inset-0 transition-transform duration-500"
                  style={{
                    transform: `translateX(-${currentCardIndex * 100}%)`,
                  }}
                >
                  {cardTexts.map((text, index) => (
                    <div
                      key={index}
                      className="absolute w-full h-full flex items-center justify-center"
                      style={{ left: `${index * 100}%` }}
                    >
                      <IdeateCard text={text} />
                    </div>
                  ))}
                </div>
              </div>
              <button
                className="btn btn-circle bg-ideate hover:bg-[#1799d1] text-white"
                onClick={handleNextCard}
                disabled={currentCardIndex === cardTexts.length - 1}
              >
                →
              </button>
            </div>
          </div>
        </div>
      }
    />
  );
}

export default Ideate;
