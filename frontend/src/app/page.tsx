"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Home() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
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
      setIsRunning((prevIsRunning) => !prevIsRunning);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  // Formatear el tiempo (minutos:segundos:milisegundos)
  const formatTime = (time: number) => {
    const minutes = Math.floor((time / 60000) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Cronómetro que comienza en cero y que empieza y detiene cuando presionamos la tecla espacio */}
      <div className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="text-4xl text-center">{formatTime(time)}</div>
          <div className="text-center">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={() => setIsRunning((prevIsRunning) => !prevIsRunning)}
            >
              {isRunning ? "Stop" : "Start"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}