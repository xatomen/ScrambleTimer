"use client";

import { useState, useEffect, useRef } from "react";
import NavBar from "./NavBar";
import Timer from "./Timer";

const Page = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [savedTimes, setSavedTimes] = useState<number[]>([]);

  return (
    <div className="min-h-full">
      <NavBar />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Timer</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Timer
            time={time}
            setTime={setTime}
            isRunning={isRunning}
            setIsRunning={setIsRunning}
            savedTimes={savedTimes}
            setSavedTimes={setSavedTimes}
          />
        </div>
      </main>
    </div>
  );
};

export default Page;