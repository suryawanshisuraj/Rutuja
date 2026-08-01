import React, { useRef, useEffect, useState } from 'react';

export default function MusicPlayer({ isPlaying, onToggle, musicUrl }) {
  const audioRef = useRef(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const playlist = [
    {
      title: 'Romantic Piano Serenade',
      artist: 'Anniversary Classics',
      url: musicUrl || 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3'
    },
    {
      title: 'Sweet Love Melodies',
      artist: 'Acoustic Dreams',
      url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a81a6f.mp3?filename=love-background-music-10702.mp3'
    },
    {
      title: 'Gentle Heartbeat Soft Strings',
      artist: 'Romance Ensemble',
      url: 'https://cdn.pixabay.com/download/audio/2021/09/06/audio_9b83b384ff.mp3?filename=soft-romantic-piano-8406.mp3'
    }
  ];

  const currentTrack = playlist[currentTrackIndex];

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch((err) => console.log('Autoplay handled:', err));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const handleNextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
  };

  const handlePrevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        loop
      />

      {/* Playlist Popover Menu */}
      {showPlaylist && (
        <div className="absolute bottom-16 right-0 w-72 bg-white/95 backdrop-blur-xl border border-white/60 p-4 rounded-3xl shadow-2xl space-y-3 mb-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between border-b border-[#e3bdc3]/50 pb-2">
            <span className="text-xs font-bold text-[#b0004a] uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">queue_music</span>
              Anniversary Playlist
            </span>
            <button
              onClick={() => setShowPlaylist(false)}
              className="text-[#8e6f74] hover:text-[#3d0506] text-xs font-bold"
            >
              ✕
            </button>
          </div>

          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {playlist.map((track, idx) => {
              const isSelected = currentTrackIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentTrackIndex(idx);
                    if (!isPlaying) onToggle();
                  }}
                  className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#fff0ef] text-[#b0004a] font-bold border border-[#d81b60]/30 shadow-sm'
                      : 'hover:bg-gray-100 text-[#5a4044]'
                  }`}
                >
                  <div className="truncate pr-2">
                    <p className="truncate">{track.title}</p>
                    <p className="text-[10px] font-normal text-[#8e6f74]">{track.artist}</p>
                  </div>
                  {isSelected && isPlaying && (
                    <span className="material-symbols-outlined text-sm text-[#d81b60] music-playing">
                      equalizer
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Volume Control */}
          <div className="pt-2 border-t border-[#e3bdc3]/50 flex items-center gap-2 text-xs text-[#5a4044]">
            <span className="material-symbols-outlined text-base text-[#b0004a]">volume_up</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full accent-[#d81b60] h-1.5 bg-[#ffe9e7] rounded-lg cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* Main Music Control Button Bar */}
      <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md p-1.5 rounded-full shadow-2xl border border-white/60">
        <button
          onClick={() => setShowPlaylist(!showPlaylist)}
          title="Romantic Playlist"
          className="w-9 h-9 rounded-full bg-[#ffe9e7] text-[#b0004a] flex items-center justify-center hover:bg-[#ffd9de] transition-colors"
        >
          <span className="material-symbols-outlined text-lg">queue_music</span>
        </button>

        <button
          onClick={handlePrevTrack}
          title="Previous Track"
          className="w-8 h-8 rounded-full text-[#5a4044] hover:text-[#b0004a] flex items-center justify-center transition-colors"
        >
          <span className="material-symbols-outlined text-base">skip_previous</span>
        </button>

        <button
          onClick={onToggle}
          title={isPlaying ? 'Pause Music' : 'Play Anniversary Song'}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 ${
            isPlaying
              ? 'bg-gradient-to-br from-[#d81b60] to-[#b0004a] text-white music-playing ring-2 ring-[#d81b60]/40'
              : 'bg-[#b0004a] text-white hover:bg-[#d81b60]'
          }`}
        >
          <span className="material-symbols-outlined text-2xl">
            {isPlaying ? 'pause' : 'play_arrow'}
          </span>
        </button>

        <button
          onClick={handleNextTrack}
          title="Next Track"
          className="w-8 h-8 rounded-full text-[#5a4044] hover:text-[#b0004a] flex items-center justify-center transition-colors"
        >
          <span className="material-symbols-outlined text-base">skip_next</span>
        </button>
      </div>
    </div>
  );
}
