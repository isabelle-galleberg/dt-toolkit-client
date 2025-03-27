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
import { Pin, SpottedScam } from '../../types/scam';
import { usePersonaStore } from '../../store/personaStore';
import { useUserStore } from '../../store/userStore';
import LoadingSpinner from '../../components/LoadingSpinner';
import PhoneComponent from '../../components/Phone';
import { getHint } from '../../services/spottedScamService';
import ProgressBar from '../../components/ProgressBar';
import { motion } from 'framer-motion';

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
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [hint, setHint] = useState<string>('');
  const [loadingHint, setLoadingHint] = useState<boolean>(false);
  const [shake, setShake] = useState(false);

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

  const handleHintClick = async () => {
    setLoadingHint(true);
    const scamTexts = spottedScams.map((scam) => scam.inputText);
    const response = await getHint(scamTexts);
    setHint(response.hint);
    setLoadingHint(false);
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

  useEffect(() => {
    if (spottedScams.length < 5) {
      const interval = setInterval(() => {
        setShake(true);
        setTimeout(() => setShake(false), 2000);
      }, 15000); // shake every 15 seconds
      return () => clearInterval(interval);
    }
  }, []);

  const handleEmailClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
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

        scrollToBottom();
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
                      <p className="text-gray-500 text-[14px]">
                        No spotted scams yet. Click on the email to start adding
                        pins.
                      </p>
                    )}
                  </div>
                }
              />
            </div>
            <div className="w-1/4 relative h-[430px]">
              <PhoneComponent
                sender={persona?.sender}
                subject={persona?.subject}
                text={
                  <>
                    {persona?.text?.map((line, index) => (
                      <span key={index}>
                        {line}
                        <br />
                        <br />
                      </span>
                    ))}
                  </>
                }
                buttonText={persona?.buttonText}
                buttonLink={persona?.buttonLink}
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
          <motion.button
            className="px-4 text-primary text-sm hover:opacity-70 mb-2"
            onClick={handleHintClick}
            animate={{
              rotate: shake ? [0, -5, 5, -5, 5, 0] : 0,
              x: shake ? [0, -5, 5, -5, 5, 0] : 0,
            }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
              repeat: shake ? Infinity : 0,
              repeatType: 'loop',
            }}
          >
            {hint ? 'New hint' : 'Get hint'}
          </motion.button>
          {loadingHint && (
            <div className="text-primary px-4">
              <p className="text-sm text-primary">Thinking</p>
              <span className="loading loading-dots loading-sm text-primary"></span>
            </div>
          )}
          {hint && !loadingHint && (
            <div className="bg-[#214A6B] p-2 rounded-[12px] text-primary flex flex-row space-x-2 items-center">
              <div>💡</div>
              <div className="text-sm">{hint}</div>
            </div>
          )}
          <ProgressBar phase={'define'} currentStep={1} totalSteps={4} />
        </div>
      }
    />
  );
}

export default SpotScam;
