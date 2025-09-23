"use client";
import { useState, useEffect } from "react";

export default function Preloader({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          clearInterval(interval);
          setTimeout(() => onFinish(), 500); // small delay before hiding
          return 100;
        }
        return old + 1;
      });
    }, 20); // speed (~2s total)

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black text-green-400 z-50">
      
      {/* Big glowing loading text */}
      <h1 className="text-6xl md:text-8xl font-extrabold mb-8 animate-pulse drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]">
        Loading...
      </h1>

      {/* Bigger, slightly rounded progress bar */}
      <div className="w-96 md:w-[600px] h-6 md:h-10 bg-gray-900 rounded-xl overflow-hidden shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Big percentage counter */}
      <p className="mt-6 text-4xl md:text-6xl font-bold text-green-400 drop-shadow-md animate-bounce">
        {progress}%
      </p>

      {/* Optional bouncing dots for decoration */}
      <div className="flex mt-8 space-x-4">
        {[...Array(3)].map((_, i) => (
          <span
            key={i}
            className="w-6 h-6 md:w-8 md:h-8 bg-green-400 rounded-md animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}
