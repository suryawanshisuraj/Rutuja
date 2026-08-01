import React, { useState, useEffect } from 'react';
import ShaderBackground from './components/ShaderBackground';
import FloatingParticles from './components/FloatingParticles';
import HeartCanvas3D from './components/HeartCanvas3D';
import Navbar from './components/Navbar';
import LiveCounter from './components/LiveCounter';
import OurStory from './components/OurStory';
import ReasonsILoveYou from './components/ReasonsILoveYou';
import PhotoGallery from './components/PhotoGallery';
import LoveQuiz from './components/LoveQuiz';
import SecretMessage from './components/SecretMessage';
import MusicPlayer from './components/MusicPlayer';
import WelcomeMusicModal from './components/WelcomeMusicModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(true);

  // Journal Configuration for Prateek & Rutuja (Journey Start: July 18, 2018)
  const [config, setConfig] = useState({
    partner1: 'Prateek',
    partner2: 'Rutuja',
    anniversaryDate: '2018-07-18T00:00:00.000Z',
    title: 'Our Story',
    quote: 'In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.',
    musicUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3',
    passcode: '0610'
  });

  // Dynamic Data Lists
  const [memories, setMemories] = useState([]);
  const [reasons, setReasons] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);

  // Toast Notifications
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Fetch initial data from Express Backend
  useEffect(() => {
    fetch('/api/config')
      .then((res) => res.json())
      .then((data) => setConfig(data))
      .catch((err) => console.log('Using default config'));

    fetch('/api/memories')
      .then((res) => res.json())
      .then((data) => setMemories(data))
      .catch((err) => console.log('Using fallback memories'));

    fetch('/api/reasons')
      .then((res) => res.json())
      .then((data) => setReasons(data))
      .catch((err) => console.log('Using fallback reasons'));

    fetch('/api/photos')
      .then((res) => res.json())
      .then((data) => setPhotos(data))
      .catch((err) => console.log('Using fallback photos'));

    fetch('/api/quiz')
      .then((res) => res.json())
      .then((data) => setQuizQuestions(data))
      .catch((err) => console.log('Using fallback quiz'));
  }, []);

  // Handlers for Welcome Music Popup Modal
  const handlePlayAndEnter = () => {
    setIsPlayingMusic(true);
    setIsWelcomeModalOpen(false);
    showToast('Playing Our Anniversary Song! 🎵', 'success');
  };

  const handleEnterQuietly = () => {
    setIsPlayingMusic(false);
    setIsWelcomeModalOpen(false);
  };

  // Handlers for Timeline Memories
  const handleAddMemory = async (newMem) => {
    try {
      const res = await fetch('/api/memories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMem)
      });
      if (res.ok) {
        const saved = await res.json();
        setMemories([...memories, saved]);
        showToast('Story chapter added! 💕', 'success');
      }
    } catch (err) {
      setMemories([...memories, { ...newMem, id: `mem-${Date.now()}` }]);
      showToast('Chapter saved locally!', 'info');
    }
  };

  const handleDeleteMemory = async (id) => {
    try {
      await fetch(`/api/memories/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.log('Deleted locally');
    }
    setMemories(memories.filter((m) => m.id !== id));
    showToast('Chapter removed', 'info');
  };

  // Handlers for Reasons
  const handleAddReason = async (newReason) => {
    try {
      const res = await fetch('/api/reasons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReason)
      });
      if (res.ok) {
        const saved = await res.json();
        setReasons([...reasons, saved]);
        showToast('New love reason added! 💖', 'success');
      }
    } catch (err) {
      setReasons([...reasons, { ...newReason, id: `reas-${Date.now()}` }]);
      showToast('Reason added!', 'info');
    }
  };

  const handleDeleteReason = async (id) => {
    try {
      await fetch(`/api/reasons/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.log('Deleted locally');
    }
    setReasons(reasons.filter((r) => r.id !== id));
    showToast('Reason removed', 'info');
  };

  // Handlers for Photos
  const handleAddPhoto = async (newPhoto) => {
    try {
      const res = await fetch('/api/photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPhoto)
      });
      if (res.ok) {
        const saved = await res.json();
        setPhotos([...photos, saved]);
        showToast('Polaroid photo added! 📸', 'success');
      }
    } catch (err) {
      setPhotos([...photos, { ...newPhoto, id: `photo-${Date.now()}` }]);
      showToast('Photo added!', 'info');
    }
  };

  const handleDeletePhoto = async (id) => {
    try {
      await fetch(`/api/photos/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.log('Deleted locally');
    }
    setPhotos(photos.filter((p) => p.id !== id));
    showToast('Photo deleted', 'info');
  };

  // Handlers for Quiz
  const handleAddQuestion = async (newQ) => {
    try {
      const res = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQ)
      });
      if (res.ok) {
        const saved = await res.json();
        setQuizQuestions([...quizQuestions, saved]);
        showToast('Trivia question added! 🧠', 'success');
      }
    } catch (err) {
      setQuizQuestions([...quizQuestions, { ...newQ, id: `q-${Date.now()}` }]);
      showToast('Question added!', 'info');
    }
  };

  // Handlers for Secret Letter (Rutuja's Birthdate Passcode: 0610 or 06102003)
  const handleUnlockSecret = async (passcode) => {
    try {
      const res = await fetch('/api/secret/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode })
      });
      return await res.json();
    } catch (err) {
      const cleanP = (passcode || '').toString().toLowerCase().replace(/[^a-z0-9]/g, '');
      if (cleanP === '0610' || cleanP === '06102003' || cleanP === '6102003' || cleanP === '610' || cleanP === 'love') {
        return {
          success: true,
          letter: {
            title: 'My Dearest Rutuja',
            author: 'Prateek',
            content: 'Happy Birthday & Anniversary! Every single day with you is my absolute favorite adventure. Forever & Always ❤️'
          }
        };
      }
      return { success: false, error: "Incorrect passcode. Try Rutuja's birthdate (0610 or 06102003)" };
    }
  };

  const handleUpdateLetter = async (editData) => {
    try {
      await fetch('/api/secret', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData)
      });
      showToast('Secret love letter updated! 💌', 'success');
    } catch (err) {
      showToast('Updated locally', 'info');
    }
  };

  return (
    <div className="relative min-h-screen pb-32">
      {/* Welcome Music Popup Modal */}
      <WelcomeMusicModal
        isOpen={isWelcomeModalOpen}
        onPlayAndEnter={handlePlayAndEnter}
        onEnterQuietly={handleEnterQuietly}
        partner1={config.partner1}
        partner2={config.partner2}
      />

      {/* Background WebGL Shader & Floating Particles */}
      <ShaderBackground />
      <FloatingParticles />

      {/* Top Header & Bottom Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        title={config.title || 'Our Story'}
        onMusicToggle={() => setIsPlayingMusic(!isPlayingMusic)}
        isPlayingMusic={isPlayingMusic}
      />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-white/95 border border-[#e3bdc3] px-5 py-2.5 rounded-2xl shadow-xl text-xs font-bold text-[#b0004a] animate-bounce">
          {toast.message}
        </div>
      )}

      {/* Main Tab Content */}
      <main className="relative z-20 pt-24 px-4">
        {activeTab === 'home' && (
          <section className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8 py-6">
            
            {/* Opening Profile Feature Card */}
            <div className="relative group cursor-pointer transition-all duration-300 hover:scale-105">
              <div className="polaroid-frame max-w-xs sm:max-w-sm mx-auto shadow-2xl rotate-[-1deg] border border-white/80">
                <div className="relative overflow-hidden rounded-xl aspect-[4/5] bg-gray-100">
                  <img
                    src="/images/profile_hero.jpg"
                    alt="Prateek and Rutuja"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 bg-[#b0004a] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs filled">favorite</span>
                    Prateek & Rutuja
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <p className="font-handwriting text-3xl text-[#b0004a]">
                    Together is our favorite place ❤️
                  </p>
                </div>
              </div>
            </div>

            {/* Hero Romantic Title */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#ab2c5d] bg-[#ffe9e7] px-4 py-1.5 rounded-full inline-block shadow-sm">
                Anniversary Keepsake
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-[#b0004a] tracking-tight">
                To My Dearest{' '}
                <span className="italic underline decoration-[#fd6c9c] decoration-4">
                  {config.partner2 || 'Rutuja'}
                </span>
              </h2>
              <p className="font-serif italic text-base sm:text-xl text-[#5a4044] max-w-xl mx-auto pt-2">
                "{config.quote}"
              </p>
            </div>

            {/* Central 3D Interactive Heart */}
            <HeartCanvas3D />

            {/* Live Journey Counter starting from July 18, 2018 */}
            <LiveCounter anniversaryDate={config.anniversaryDate} />

            {/* Quick Feature Cards Nav */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl pt-4">
              <button
                onClick={() => setActiveTab('timeline')}
                className="glass-blush p-4 rounded-2xl text-center hover:scale-105 transition-transform border border-white/60 shadow-sm group"
              >
                <span className="material-symbols-outlined text-3xl text-[#b0004a] group-hover:scale-110 transition-transform">
                  auto_stories
                </span>
                <p className="font-serif text-sm font-bold text-[#b0004a] mt-1">Our Story</p>
                <p className="text-[10px] text-[#5a4044] font-medium">Timeline & Notes</p>
              </button>

              <button
                onClick={() => setActiveTab('reasons')}
                className="glass-blush p-4 rounded-2xl text-center hover:scale-105 transition-transform border border-white/60 shadow-sm group"
              >
                <span className="material-symbols-outlined text-3xl text-[#b0004a] filled group-hover:scale-110 transition-transform">
                  favorite
                </span>
                <p className="font-serif text-sm font-bold text-[#b0004a] mt-1">Reasons Why</p>
                <p className="text-[10px] text-[#5a4044] font-medium">100+ Flip Cards</p>
              </button>

              <button
                onClick={() => setActiveTab('gallery')}
                className="glass-blush p-4 rounded-2xl text-center hover:scale-105 transition-transform border border-white/60 shadow-sm group"
              >
                <span className="material-symbols-outlined text-3xl text-[#b0004a] group-hover:scale-110 transition-transform">
                  photo_library
                </span>
                <p className="font-serif text-sm font-bold text-[#b0004a] mt-1">Gallery</p>
                <p className="text-[10px] text-[#5a4044] font-medium">Polaroid Scrapbook</p>
              </button>

              <button
                onClick={() => setActiveTab('secret')}
                className="glass-blush p-4 rounded-2xl text-center hover:scale-105 transition-transform border border-white/60 shadow-sm group"
              >
                <span className="material-symbols-outlined text-3xl text-[#b0004a] group-hover:scale-110 transition-transform">
                  auto_awesome
                </span>
                <p className="font-serif text-sm font-bold text-[#b0004a] mt-1">Secret Letter</p>
                <p className="text-[10px] text-[#5a4044] font-medium">Heart Lock & Scratch</p>
              </button>
            </div>
          </section>
        )}

        {activeTab === 'timeline' && (
          <OurStory
            memories={memories}
            onAddMemory={handleAddMemory}
            onDeleteMemory={handleDeleteMemory}
          />
        )}

        {activeTab === 'reasons' && (
          <ReasonsILoveYou
            reasons={reasons}
            onAddReason={handleAddReason}
            onDeleteReason={handleDeleteReason}
          />
        )}

        {activeTab === 'gallery' && (
          <PhotoGallery
            photos={photos}
            onAddPhoto={handleAddPhoto}
            onDeletePhoto={handleDeletePhoto}
          />
        )}

        {activeTab === 'quiz' && (
          <LoveQuiz
            quizQuestions={quizQuestions}
            onAddQuestion={handleAddQuestion}
          />
        )}

        {activeTab === 'secret' && (
          <SecretMessage
            secretLetter={config}
            onUnlock={handleUnlockSecret}
            onUpdateLetter={handleUpdateLetter}
          />
        )}
      </main>

      {/* Floating Audio Music Player */}
      <MusicPlayer
        isPlaying={isPlayingMusic}
        onToggle={() => setIsPlayingMusic(!isPlayingMusic)}
        musicUrl={config.musicUrl}
      />

      {/* Footer */}
      <footer className="w-full py-10 flex flex-col items-center justify-center gap-2 text-center relative z-20 text-[#ab2c5d]">
        <p className="font-handwriting text-2xl text-[#b0004a]">
          Made with ❤️ by {config.partner1 || 'Prateek'} for {config.partner2 || 'Rutuja'}
        </p>
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#8e6f74]">
          Digital Love Anniversary Journal • Prateek & Rutuja
        </p>
      </footer>
    </div>
  );
}
