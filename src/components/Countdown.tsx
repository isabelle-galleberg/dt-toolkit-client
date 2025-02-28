import { useState, useEffect } from 'react';

function Countdown() {
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prev) => prev - 1);
      } else if (minutes > 0) {
        setMinutes((prev) => prev - 1);
        setSeconds(59);
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, minutes]);

  return (
    <span className="countdown font-mono text-lg">
      <span
        style={
          {
            '--value': minutes,
          } as React.CSSProperties
        }
        className="countdown-item"
      ></span>
      :
      <span
        style={
          {
            '--value': seconds,
          } as React.CSSProperties
        }
        className="countdown-item"
      ></span>
    </span>
  );
}

export default Countdown;
