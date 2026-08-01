import React from 'react';

export default function WelcomeMusicModal({ isOpen, onPlayAndEnter, onEnterQuietly, partner1 = 'Prateek', partner2 = 'Rutuja' }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white/95 backdrop-blur-xl w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/80 text-center space-y-6 relative overflow-hidden">
        
        {/* Decorative Background Heart Glow */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#fd6c9c]/20 blur-2xl rounded-full pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#cca730]/20 blur-2xl rounded-full pointer-events-none" />

        {/* Animated Heart Icon Badge */}
        <div className="relative z-10">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-[#b0004a] to-[#d81b60] text-white flex items-center justify-center shadow-xl bouncing-heart">
            <span className="material-symbols-outlined text-4xl filled">favorite</span>
          </div>
        </div>

        {/* Text Details */}
        <div className="space-y-2 relative z-10">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#ab2c5d] bg-[#ffe9e7] px-4 py-1 rounded-full inline-block">
            Anniversary Keepsake
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#b0004a]">
            Welcome, {partner2}!
          </h2>
          <p className="text-xs sm:text-sm text-[#5a4044] font-medium leading-relaxed max-w-xs mx-auto">
            A romantic digital journal created with love by <span className="font-bold text-[#b0004a]">{partner1}</span>. Would you like to play our anniversary song as you explore?
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2 relative z-10">
          <button
            onClick={onPlayAndEnter}
            className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#b0004a] to-[#d81b60] text-white font-bold text-sm shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl music-playing">music_note</span>
            Play Music & Enter 🎶
          </button>

          <button
            onClick={onEnterQuietly}
            className="w-full py-2.5 px-6 rounded-full border border-[#e3bdc3] text-[#5a4044] font-bold text-xs hover:bg-[#fff0ef] transition-colors cursor-pointer"
          >
            Enter Quietly 💖
          </button>
        </div>

        <p className="text-[10px] text-[#8e6f74] font-medium pt-1">
          You can toggle or change music tracks anytime using the floating audio player button.
        </p>
      </div>
    </div>
  );
}
