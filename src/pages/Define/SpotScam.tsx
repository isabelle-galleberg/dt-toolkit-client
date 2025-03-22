import React, { useState, useRef, useEffect, useCallback } from 'react';
import ActivityPageLayout from '../../components/layout/ActivityPageLayout';
import Box from '../../components/Box';
import NumberedInput from '../../components/NumberedInput';
import { useTaskProgress } from '../../context/TaskProgressContext';
import {
  getSpottedScams,
  addSpottedScam,
  deleteSpottedScam,
} from '../../services/spottedScamService';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { SpottedScam } from '../../types/define';
import { usePersonaStore } from '../../store/personaStore';
import { useUserStore } from '../../store/userStore';
import LoadingSpinner from '../../components/LoadingSpinner';

interface Pin {
  id: number;
  x: number;
  y: number;
  inputText: string;
}

function SpotScam() {
  const { persona } = usePersonaStore();
  const { user } = useUserStore();
  const [spottedScams, setSpottedScams] = useState<SpottedScam[]>([]);
  const [pins, setPins] = useState<Pin[]>([]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { markTaskComplete, markTaskUndone, isTaskComplete } =
    useTaskProgress();
  const cardId = persona?._id;
  const userId = user?._id;
  const [loading, setLoading] = useState<boolean>(true);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (scrollRef.current) {
        window.scrollTo({
          top:
            scrollRef.current.getBoundingClientRect().top +
            window.scrollY -
            100,
          behavior: 'smooth',
        });
      }
    }, 300);
  };

  const scamHints = [
    {
      id: 1,
      text: (
        <>
          <strong>Check the sender:</strong> Does the email address look
          legitimate? (Look for misspellings or domain mismatches)
        </>
      ),
    },
    {
      id: 2,
      text: (
        <>
          <strong>Watch out for pressure or unrealistic offers:</strong> Is it
          urging immediate action, threatening consequences, or offering
          something too good to be true?
        </>
      ),
    },
    {
      id: 3,
      text: (
        <>
          <strong>Check the links:</strong> Hover over links—do the actual URLs
          match the displayed text or the company's website?
        </>
      ),
    },
    {
      id: 4,
      text: (
        <>
          <strong>Check the greeting:</strong> Does it use a generic greeting
          like "Dear Customer" instead of your name?
        </>
      ),
    },
    {
      id: 5,
      text: (
        <>
          <strong>Look for errors:</strong> Are there typos, grammatical
          mistakes, or strange phrasing?
        </>
      ),
    },
    {
      id: 6,
      text: (
        <>
          <strong>Think about the requests:</strong> Does it ask for sensitive
          information like passwords or credit card numbers?
        </>
      ),
    },
  ];

  const toggleHints = () => {
    setShowHints((prev) => !prev);
    scrollToBottom();
    setCurrentHintIndex(0);
  };

  const nextHint = () => {
    setCurrentHintIndex((prev) => (prev + 1) % scamHints.length);
  };

  const prevHint = () => {
    setCurrentHintIndex(
      (prev) => (prev - 1 + scamHints.length) % scamHints.length
    );
  };

  useEffect(() => {
    setLoading(true);
    if (!cardId) return;
    const fetchSpottedScams = async () => {
      try {
        const data = await getSpottedScams(cardId);
        setSpottedScams(data);

        setPins(
          data.map((scam, index) => ({
            id: index + 1,
            x: scam.pin_x,
            y: scam.pin_y,
            inputText: scam.inputText,
          }))
        );
        setLoading(false);
      } catch (error) {
        console.error('Error fetching spotted scams', error);
      }
    };
    fetchSpottedScams();
  }, [cardId]);

  useEffect(() => {
    if (spottedScams.length >= 3) {
      if (!isTaskComplete('/define/spot-scam')) {
        markTaskComplete('/define/spot-scam');
      }
    } else {
      if (isTaskComplete('/define/spot-scam')) {
        markTaskUndone('/define/spot-scam');
      }
    }
  }, [spottedScams]);

  const handleEmailClick = useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setPins((prevPins) => {
        const newPins = [
          ...prevPins,
          { id: prevPins.length + 1, x, y, inputText: '' },
        ];

        setTimeout(() => {
          const newPinIndex = newPins.length - 1;
          inputRefs.current[newPinIndex]?.focus();
        }, 0);

        return newPins;
      });
    },
    []
  );

  const handleInputChange = useCallback((index: number, text: string) => {
    setPins((prevPins) =>
      prevPins.map((pin, i) =>
        i === index ? { ...pin, inputText: text } : pin
      )
    );
  }, []);

  const handleDeletePin = useCallback(
    async (indexToDelete: number) => {
      setPins((prevPins) =>
        prevPins.filter((_, index) => index !== indexToDelete)
      );

      const pinToDelete = pins[indexToDelete];
      const scamToDelete = spottedScams.find(
        (scam) => scam.pin_x === pinToDelete.x && scam.pin_y === pinToDelete.y
      );

      if (scamToDelete) {
        try {
          await deleteSpottedScam(scamToDelete._id);
          setSpottedScams((prevScams) =>
            prevScams.filter((scam) => scam._id !== scamToDelete._id)
          );
        } catch (error) {
          console.error('Error deleting spotted scam:', error);
        }
      }
    },
    [pins, spottedScams]
  );

  // Handle saving a scam
  const handleSaveScam = useCallback(
    async (index: number) => {
      const pin = pins[index];
      if (!pin.inputText.trim()) return;

      const newScam = {
        userId: userId,
        cardId: cardId,
        numeration: index + 1,
        inputText: pin.inputText,
        pin_x: pin.x,
        pin_y: pin.y,
      };

      try {
        const savedScam = await addSpottedScam(newScam);
        setSpottedScams((prevScams) => [...prevScams, savedScam]);
      } catch (error) {
        console.error('Error saving spotted scam:', error);
      }
    },
    [userId, cardId, pins]
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ActivityPageLayout
      header="Spot the scam!"
      phase="Define"
      phaseColor="text-define"
      activity={
        <div className="text-primary">
          <div className="flex pb-2 gap-8">
            <div className="w-3/4">
              <Box
                icon="✎"
                header="Click on each suspicious part of the email and explain why it could indicate a scam."
                fillHeight={true}
                content={
                  <div className="p-6 space-y-4">
                    {pins.length > 0 ? (
                      pins.map((pin, index) => (
                        <NumberedInput
                          key={pin.id}
                          number={index + 1}
                          onDelete={() => handleDeletePin(index)}
                          ref={(el) => (inputRefs.current[index] = el)}
                          onChange={(text) => handleInputChange(index, text)}
                          onBlur={() => handleSaveScam(index)}
                          defaultValue={pin.inputText}
                        />
                      ))
                    ) : (
                      <p>
                        No spotted scams yet. Click on the email to start adding
                        pins.
                      </p>
                    )}
                  </div>
                }
              />
            </div>
            <div className="w-1/4 relative h-[400px]">
              <img
                src={persona?.phoneImageUrl}
                alt="Email"
                className="h-full cursor-pointer"
                onClick={handleEmailClick}
              />

              {pins.map((pin, index) => (
                <div
                  key={pin.id}
                  className="absolute w-6 h-6 flex items-center justify-center text-[12px] rounded-full bg-define text-base-100"
                  style={{
                    top: `${pin.y}%`,
                    left: `${pin.x}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Hint Button */}
          <button
            className="px-4 relative text-define text-sm tracking-wide transition-all duration-300 hover:underline hover:opacity-80 flex items-center gap-1"
            onClick={toggleHints}
          >
            {showHints ? (
              <>
                <span>Hide Hints</span> <ChevronUpIcon className="h-5 w-5" />
              </>
            ) : (
              <>
                <span>Get Hints</span> <ChevronDownIcon className="h-5 w-5" />
              </>
            )}
          </button>

          {/* Hint Section */}
          <div
            className={`transition-all duration-300 ease-in-out shadow-md text-[12px] tracking-widest bg-base-100 ${
              showHints ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            } overflow-hidden`}
            ref={scrollRef}
          >
            <div className="hints-container bg-light p-4 rounded shadow-md flex items-center justify-between">
              <button
                className="p-2 rounded-full text-bold text-define transition duration-200 text-xl border border-define px-4 hover:bg-define hover:text-empathize"
                onClick={prevHint}
              >
                &lt;
              </button>

              <div className="text-center w-full">
                <h3 className="font-semibold text-[15px]">
                  💡 Hint {currentHintIndex + 1} of {scamHints.length}
                </h3>
                <p className="px-8">{scamHints[currentHintIndex].text}</p>
              </div>

              <button
                className="p-2 rounded-full text-bold text-define transition duration-200 text-xl border border-define px-4 hover:bg-define hover:text-empathize"
                onClick={nextHint}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      }
    />
  );
}

export default SpotScam;
