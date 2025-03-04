import React, { useState, useRef, useEffect } from 'react';
import ActivityPageLayout from '../../components/layout/ActivityPageLayout';
import Box from '../../components/Box';
import email from '../../assets/email-phone.svg';
import NumberedInput from '../../components/NumberedInput';
import { useTaskProgress } from '../../context/TaskProgressContext';

interface Pin {
  id: number;
  x: number;
  y: number;
}

function SpotScam() {
  const [pins, setPins] = useState<Pin[]>([]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { markTaskComplete, isTaskComplete } = useTaskProgress();

  // TODO: require that at least three signs of scam must be identified
  // enable next button
  useEffect(() => {
    if (!isTaskComplete('/define/spot-scam')) {
      markTaskComplete('/define/spot-scam');
    }
  }, [isTaskComplete, markTaskComplete]);

  // Handle clicking on email image to add a pin
  const handleEmailClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setPins((prevPins) => {
      const newPins = [...prevPins, { id: prevPins.length + 1, x, y }];

      setTimeout(() => {
        const newPinIndex = newPins.length - 1;
        if (inputRefs.current[newPinIndex]) {
          inputRefs.current[newPinIndex]?.focus();
        }
      }, 0);

      return newPins;
    });
  };

  // Handle deleting a pin and renumbering
  const handleDeletePin = (indexToDelete: number) => {
    setPins((prevPins) => {
      const updatedPins = prevPins.filter(
        (_, index) => index !== indexToDelete
      );
      return updatedPins;
    });
  };

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
                  {pins.map((pin, index) => (
                    <NumberedInput
                      key={pin.id}
                      number={index + 1}
                      onDelete={() => handleDeletePin(index)}
                      ref={(el) => (inputRefs.current[index] = el)}
                    />
                  ))}
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

            {/* Pins on the email image */}
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
