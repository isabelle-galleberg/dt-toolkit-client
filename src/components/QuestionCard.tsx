import Box from './Box';
import { useState } from 'react';

function QuestionCard() {
  const [question, setQuestion] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const toggleAnswer = (answer: string) => {
    setSelectedAnswer(selectedAnswer === answer ? null : answer);
  };

  return (
    <Box
      header="Write down your question and then pick an answer to generate a question card!"
      icon="✎"
      exitPath="/ideate"
      content={
        <div className="p-4 text-[12px] text-primary tracking-widest font-poppins font-semibold">
          <label className="block font-bold text-primary mb-2 tracking-widest">
            WRITE DOWN YOUR QUESTION
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={4}
            className="block p-2.5 w-full text-primary bg-base-100 rounded-lg border border-primary focus:ring-ideate focus:border-ideate"
            placeholder="Type your question here..."
          ></textarea>
          <p className="mt-4">WHAT IS THE CORRECT ANSWER?</p>
          <div className="flex gap-2 mt-2">
            <button
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded border ${selectedAnswer === 'yes' ? 'bg-empathize text-define border-define' : 'border-primary bg-primary text-base-100'}`}
              onClick={() => toggleAnswer('yes')}
            >
              {selectedAnswer === 'yes' && '✓'} YES!
            </button>
            <button
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded border ${selectedAnswer === 'no' ? 'bg-red-600 text-red-200 border-red-200' : 'border-primary bg-primary text-base-100'}`}
              onClick={() => toggleAnswer('no')}
            >
              {selectedAnswer === 'no' && '✕'} NO!
            </button>
            <button
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded border ${selectedAnswer === 'maybe' ? 'bg-yellow-500 text-yellow-100 border-yellow-100' : 'border-primary bg-primary text-base-100'}`}
              onClick={() => toggleAnswer('maybe')}
            >
              {selectedAnswer === 'maybe' && '?'} MAYBE!
            </button>
          </div>
        </div>
      }
      bottomContent={
        <div className="flex justify-end">
          <button className="btn bg-primary text-base-100 px-6 py-2 text-[12px] tracking-widest font-poppins font-semibold hover:bg-ideate hover:text-primary hover:border-primary">
            I AM DONE!
          </button>
        </div>
      }
    />
  );
}

export default QuestionCard;
