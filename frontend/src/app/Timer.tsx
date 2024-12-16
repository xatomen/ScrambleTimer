
import { useEffect, useRef } from "react";

interface TimerProps {
  time: number;
  setTime: (time: number) => void;
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
  savedTimes: number[];
  setSavedTimes: (savedTimes: number[]) => void;
}

const Timer = ({ time, setTime, isRunning, setIsRunning, savedTimes, setSavedTimes }: TimerProps) => {
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = performance.now() - time;
      const update = () => {
        setTime(performance.now() - startTimeRef.current!);
        animationFrameRef.current = requestAnimationFrame(update);
      };
      animationFrameRef.current = requestAnimationFrame(update);
    } else if (!isRunning && time !== 0) {
      cancelAnimationFrame(animationFrameRef.current!);
    }
    return () => cancelAnimationFrame(animationFrameRef.current!);
  }, [isRunning]);

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.code === "Space") {
      if (isRunning) {
        setSavedTimes((prevSavedTimes) => [...prevSavedTimes, time]);
        setTime(0);
      }
      setIsRunning((prevIsRunning) => !prevIsRunning);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isRunning]);

  const formatTime = (time: number) => {
    const minutes = Math.floor((time / 60000) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="grid grid-rows items-center justify-items-center gap-16">
      <div className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="text-4xl text-center">{formatTime(time)}</div>
          <div className="text-center">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={() => {
                if (isRunning) {
                  setSavedTimes((prevSavedTimes) => [...prevSavedTimes, time]);
                  setTime(0);
                }
                setIsRunning((prevIsRunning) => !prevIsRunning);
              }}
            >
              {isRunning ? "Stop" : "Start"}
            </button>
          </div>
        </div>
        <div className="text-left">
          <h2 className="text-2xl">Tiempos guardados:</h2>
          <table className="table-auto border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Tiempo</th>
              </tr>
            </thead>
            <tbody>
              {savedTimes.map((savedTime, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{index}</td>
                  <td className="border border-gray-300 px-4 py-2">{formatTime(savedTime)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Timer;