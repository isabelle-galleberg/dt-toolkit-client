import React, { useState, useRef, useEffect, useCallback } from 'react';
import ActivityPageLayout from '../../components/layout/ActivityPageLayout';
import Box from '../../components/Box';
import email from '../../assets/email-phone.svg';
import NumberedInput from '../../components/NumberedInput';
import { useTaskProgress } from '../../context/TaskProgressContext';
import {
  getSpottedScams,
  addSpottedScam,
  deleteSpottedScam,
} from '../../services/spottedScamService';
import { SpottedScam } from '../../types/define';
import { usePersonaStore } from '../../store/personaStore';
import { useUserStore } from '../../store/userStore';

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
  const { markTaskComplete, isTaskComplete } = useTaskProgress();
  const cardId = persona?._id;
  const userId = user?._id;

  useEffect(() => {
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
      } catch (error) {
        console.error('Error fetching spotted scams', error);
      }
    };
    fetchSpottedScams();
  }, [cardId]);

  // TODO: require that at least three signs of scam must be identified enable next button
  // Mark task as complete if not already
  useEffect(() => {
    if (!isTaskComplete('/define/spot-scam')) {
      markTaskComplete('/define/spot-scam');
    }
  }, [isTaskComplete, markTaskComplete]);

  // Handle click on the email image to add a pin
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

        // Focus new input after state updates
        setTimeout(() => {
          const newPinIndex = newPins.length - 1;
          inputRefs.current[newPinIndex]?.focus();
        }, 0);

        return newPins;
      });
    },
    []
  );

  // Handle text input changes for a specific pin
  const handleInputChange = useCallback((index: number, text: string) => {
    setPins((prevPins) =>
      prevPins.map((pin, i) =>
        i === index ? { ...pin, inputText: text } : pin
      )
    );
  }, []);

  // Handle deleting a pin
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

  return (
    <ActivityPageLayout
      header="Spot the scam!"
      phase="Define"
      phaseColor="text-define"
      activity={
        <div className="flex pb-8 gap-8">
          {/* Left side: Input fields */}
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

          {/* Right Side: Email image with clickable functionality */}
          <div className="w-1/4 relative">
            <img
              src={email}
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
      }
    />
  );
}

export default SpotScam;
