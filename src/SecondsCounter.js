import React, { useState, useEffect, useRef } from 'react';
import './SecondsCounter.css';
import clockImage from './clock.jpg';

const SecondsCounter = () => {
  const [seconds, setSeconds] = useState(0);
  const [countdownValue, setCountdownValue] = useState(0);
  const [isCounting, setIsCounting] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Update seconds count every second
    intervalRef.current = setInterval(() => {
      if (isCounting) {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isCounting]);

  const handleCountdown = () => {
    // Cancel current count and start countdown from custom value
    clearInterval(intervalRef.current);
    setSeconds(countdownValue);
    setIsCounting(true);
    intervalRef.current = setInterval(() => {
      if (isCounting && seconds > 0) {
        // Stop countdown at 0 seconds
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else {
        clearInterval(intervalRef.current); // Clear interval when countdown reaches 0 seconds
      }
    }, 1000);
  };

  const handleInputChange = (event) => {
    // Update countdown value based on input change
    const { value } = event.target;
    setCountdownValue(parseInt(value) || 0);
  };

  const handleStop = () => {
    // Stop the countdown
    setIsCounting(false);
  };

  const handleResume = () => {
    // Resume the countdown
    setIsCounting(true);
  };

  const handleReset = () => {
    // Reset the countdown to 0 and start a new count
    clearInterval(intervalRef.current);
    setSeconds(0);
    setIsCounting(true);
    intervalRef.current = setInterval(() => {
      if (isCounting) {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }
    }, 1000);
  };

  const secondsString = String(seconds).padStart(5, '0');
  const digits = secondsString
    .split('')
    .map((digit, index) => (
      <div key={index} id={`dig${index + 1}`} className="digit">
        {digit}
      </div>
    ));

  return (
    <div className="countcontainer">
        <img src={clockImage} alt="Clock" className="clock-image" />
      <div className="digits-container">{digits}</div>
      <div>
        <input
          type="number"
          value={countdownValue}
          onChange={handleInputChange}
        />

        <div className="buttons-container">
          <button className="countdown-btn" onClick={handleCountdown}>
            Start Countdown
          </button>
          <button className="stop-btn" onClick={handleStop}>
            Stop
          </button>
          <button className="resume-btn" onClick={handleResume}>
            Resume
          </button>
          <button className="reset-btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecondsCounter;
