import React, { useState, useEffect } from "react";

interface StopwatchProps {
  generateAndApplyScramble: () => void;
}

const Stopwatch: React.FC<StopwatchProps> = ({ generateAndApplyScramble }) => {
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [stoppedTime, setStoppedTime] = useState(0);
  const [running, setRunning] = useState<boolean>(false);

  useEffect(() => {
    let intervalId: any;

    if (running) {
      intervalId = setInterval(() => {
        const now = Date.now();
        setElapsedTime(now - startTime);
      }, 10);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [running, startTime]);

  const handleSpacebar = (event: KeyboardEvent) => {
    if (event.key === " ") {
      if (running) {
        // Stop the timer
        const endTime = Date.now();
        const duration = endTime - startTime;
        setStoppedTime(elapsedTime);
        setRunning(false);
        generateAndApplyScramble()
      } else {
        // Start the timer
        const currentTime = Date.now();
        setStartTime(currentTime);
        setElapsedTime(0);
        setRunning(true);
        requestAnimationFrame(updateTimer);
      }
    }
  };

  const handleTouch = () => {
    if (running) {
      // Stop the timer
      setStoppedTime(elapsedTime);
      setRunning(false);
      generateAndApplyScramble()
    } else {
      // Start the timer
      const currentTime = Date.now();
      setStartTime(currentTime);
      setElapsedTime(0); // Reset elapsed time to 0
      setRunning(true);
      requestAnimationFrame(updateTimer);
    }
  };

  const updateTimer = () => {
    if (running) {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      setElapsedTime(elapsedTime);
      requestAnimationFrame(updateTimer);
    }
  };

  useEffect(() => {
    // Add event listeners for spacebar and touch events
    window.addEventListener("keydown", handleSpacebar);
    // window.addEventListener('touchstart', handleTouch);

    return () => {
      // Clean up event listeners
      window.removeEventListener("keydown", handleSpacebar);
      // window.removeEventListener('touchstart', handleTouch);
    };
  }, [running, startTime, elapsedTime]);

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const millisecondsDisplay = (milliseconds % 1000)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}.${millisecondsDisplay}`;
  };

  return (
    <div
      className="flex flex-col items-center mt-8 w-full border-t border-b py-20"
      onTouchStart={handleTouch}
    >
      <div className="text-4xl font-bold mb-4 text-center">
        <h1 className="w-full">{formatTime(elapsedTime)}</h1>
      </div>
      <div className="text-lg text-gray-500 mb-2">
        Stopped Time: {formatTime(stoppedTime)}
      </div>
    </div>
  );
};

export default Stopwatch;
