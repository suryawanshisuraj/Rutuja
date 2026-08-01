import React from 'react';

export default function Navbar({ activeTab, setActiveTab, title = 'Our Story', onMusicToggle, isPlayingMusic }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'timeline', label: 'Timeline', icon: 'auto_stories' },
    { id: 'reasons', label: 'Reasons', icon: 'favorite' },
    { id: 'gallery', label: 'Gallery', icon: 'photo_library' },
    { id: 'quiz', label: 'Quiz', icon: 'extension' },
    { id: 'secret', label: 'Secret', icon: 'auto_awesome' }
  ];

  return (
    <>
      {/* Fixed Top App Bar */}
      <header className="fixed top-0 w-full z-40 bg-[#fff8f7]/90 backdrop-blur-xl shadow-[0px_8px_25px_rgba(74,14,14,0.08)] border-b border-white/60 flex items-center justify-between px-4 sm:px-8 py-3.5">
        <div 
          onClick={() => setActiveTab('home')}
          className="cursor-pointer text-[#b0004a] hover:scale-105 active:scale-95 transition-transform flex items-center gap-2"
        >
          <span className="material-symbols-outlined filled text-2xl">favorite</span>
          <span className="font-serif text-lg font-bold hidden sm:inline text-[#b0004a]">Digital Keepsake</span>
        </div>

        <h1 className="font-serif text-lg sm:text-2xl font-bold text-[#b0004a] tracking-tight truncate max-w-[200px] sm:max-w-none">
          {title}
        </h1>

        <button
          onClick={onMusicToggle}
          title={isPlayingMusic ? 'Mute Music' : 'Play Music'}
          className={`p-2.5 rounded-full transition-all duration-300 ${
            isPlayingMusic 
              ? 'bg-gradient-to-r from-[#b0004a] to-[#d81b60] text-white shadow-md music-playing ring-2 ring-[#d81b60]/30' 
              : 'bg-white/90 text-[#b0004a] hover:bg-[#ffe9e7] border border-white/60'
          }`}
        >
          <span className="material-symbols-outlined text-xl">
            {isPlayingMusic ? 'equalizer' : 'music_note'}
          </span>
        </button>
      </header>

      {/* Floating Bottom Navigation Bar */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-xl glass-nav rounded-full px-2 py-1.5 z-50 shadow-2xl flex justify-between items-center border border-white/60 overflow-x-auto no-scrollbar">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center transition-all duration-300 relative py-1 px-2.5 sm:px-3.5 rounded-full min-w-[54px] ${
                isActive
                  ? 'text-[#b0004a] font-bold scale-105 bg-white/90 shadow-md border border-[#d81b60]/20'
                  : 'text-[#5a4044]/80 hover:text-[#b0004a] hover:scale-105'
              }`}
            >
              {isActive && (
                <span className="absolute -top-1 w-1.5 h-1.5 bg-[#d81b60] rounded-full animate-ping" />
              )}
              <span 
                className={`material-symbols-outlined text-xl sm:text-2xl ${isActive ? 'filled' : ''}`}
              >
                {item.icon}
              </span>
              <span className="text-[9px] sm:text-[10px] font-medium tracking-wide">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
