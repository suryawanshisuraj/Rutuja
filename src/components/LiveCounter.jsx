import React, { useState, useEffect } from 'react';

export default function LiveCounter({ anniversaryDate }) {
  const [timeTogether, setTimeTogether] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    const target = new Date(anniversaryDate || '2023-06-14T00:00:00.000Z');

    function update() {
      const now = new Date();
      const diff = Math.max(0, now - target);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeTogether({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0')
      });
    }

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [anniversaryDate]);

  return (
    <div className="bg-white/50 backdrop-blur-md p-6 sm:p-8 rounded-[2rem] border border-white/60 shadow-lg w-full max-w-2xl text-center my-6">
      <p className="text-xs font-bold text-[#ab2c5d] uppercase tracking-[0.2em] mb-6 flex items-center justify-center gap-2">
        <span className="material-symbols-outlined filled text-base text-[#cca730]">favorite</span>
        Our Journey Together
        <span className="material-symbols-outlined filled text-base text-[#cca730]">favorite</span>
      </p>

      <div className="grid grid-cols-4 gap-2 sm:gap-6">
        <div className="flex flex-col bg-[#fff8f7]/70 py-3 rounded-2xl border border-white/40 shadow-sm">
          <span className="font-serif text-2xl sm:text-4xl font-bold text-[#b0004a]">
            {timeTogether.days}
          </span>
          <span className="text-[10px] sm:text-xs font-bold text-[#5a4044] uppercase tracking-wider mt-1">
            Days
          </span>
        </div>

        <div className="flex flex-col bg-[#fff8f7]/70 py-3 rounded-2xl border border-white/40 shadow-sm">
          <span className="font-serif text-2xl sm:text-4xl font-bold text-[#b0004a]">
            {timeTogether.hours}
          </span>
          <span className="text-[10px] sm:text-xs font-bold text-[#5a4044] uppercase tracking-wider mt-1">
            Hours
          </span>
        </div>

        <div className="flex flex-col bg-[#fff8f7]/70 py-3 rounded-2xl border border-white/40 shadow-sm">
          <span className="font-serif text-2xl sm:text-4xl font-bold text-[#b0004a]">
            {timeTogether.minutes}
          </span>
          <span className="text-[10px] sm:text-xs font-bold text-[#5a4044] uppercase tracking-wider mt-1">
            Mins
          </span>
        </div>

        <div className="flex flex-col bg-[#fff8f7]/70 py-3 rounded-2xl border border-white/40 shadow-sm">
          <span className="font-serif text-2xl sm:text-4xl font-bold text-[#b0004a]">
            {timeTogether.seconds}
          </span>
          <span className="text-[10px] sm:text-xs font-bold text-[#5a4044] uppercase tracking-wider mt-1">
            Secs
          </span>
        </div>
      </div>
    </div>
  );
}
