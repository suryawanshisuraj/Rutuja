import React, { useState, useRef, useEffect } from 'react';

export default function SecretMessage({ secretLetter, onUnlock, onUpdateLetter }) {
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [unlockedLetter, setUnlockedLetter] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState({ title: '', content: '', author: '' });

  const scratchCanvasRef = useRef(null);

  const handleUnlock = async (e) => {
    e.preventDefault();
    if (!passcode.trim()) return;
    try {
      const res = await onUnlock(passcode);
      if (res.success) {
        setIsUnlocked(true);
        setUnlockedLetter(res.letter);
        setEditData({
          title: res.letter.title || '',
          content: res.letter.content || '',
          author: res.letter.author || 'Prateek'
        });
        setErrorMsg('');
      } else {
        setErrorMsg(res.error || 'Incorrect passcode');
      }
    } catch (err) {
      setErrorMsg('Failed to verify passcode');
    }
  };

  // Scratch card canvas effect
  useEffect(() => {
    if (!isUnlocked || !scratchCanvasRef.current) return;
    const canvas = scratchCanvasRef.current;
    const ctx = canvas.getContext('2d');

    const w = canvas.parentElement.clientWidth || 600;
    const h = 260;
    canvas.width = w;
    canvas.height = h;

    // Fill cover with golden rose foil gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#cca730');
    grad.addColorStop(0.5, '#fd6c9c');
    grad.addColorStop(1, '#b0004a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Add romantic text overlay on foil
    ctx.font = 'bold 18px "Playfair Display", serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Scratch Here to Reveal Love Letter ✨', w / 2, h / 2 - 10);
    ctx.font = '12px "Quicksand", sans-serif';
    ctx.fillText('Use your mouse or finger to scratch off the foil', w / 2, h / 2 + 20);

    let isScratching = false;

    function getPos(e) {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    }

    function scratch(e) {
      if (!isScratching) return;
      const pos = getPos(e);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 25, 0, Math.PI * 2);
      ctx.fill();
    }

    function startScratch(e) {
      isScratching = true;
      scratch(e);
    }

    function stopScratch() {
      isScratching = false;
    }

    canvas.addEventListener('mousedown', startScratch);
    canvas.addEventListener('mousemove', scratch);
    window.addEventListener('mouseup', stopScratch);

    canvas.addEventListener('touchstart', startScratch);
    canvas.addEventListener('touchmove', scratch);
    window.addEventListener('touchend', stopScratch);

    return () => {
      canvas.removeEventListener('mousedown', startScratch);
      canvas.removeEventListener('mousemove', scratch);
      window.removeEventListener('mouseup', stopScratch);

      canvas.removeEventListener('touchstart', startScratch);
      canvas.removeEventListener('touchmove', scratch);
      window.removeEventListener('touchend', stopScratch);
    };
  }, [isUnlocked]);

  const handleEditSave = (e) => {
    e.preventDefault();
    onUpdateLetter(editData);
    setUnlockedLetter({ ...unlockedLetter, ...editData });
    setIsEditOpen(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 space-y-8">
      {/* Title */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#ab2c5d] bg-[#ffe9e7] px-4 py-1.5 rounded-full inline-block">
          Confidential Keepsake
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#b0004a]">
          Secret Love Letter
        </h2>
        <p className="text-[#5a4044] text-base max-w-md mx-auto font-medium">
          Protected by a heart lock. Enter Rutuja's birthdate passcode to unlock!
        </p>
      </div>

      {!isUnlocked ? (
        /* Lock Card */
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/80 shadow-2xl text-center space-y-6 max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto rounded-full bg-[#ffe9e7] flex items-center justify-center text-[#b0004a] shadow-inner">
            <span className="material-symbols-outlined text-4xl filled">lock</span>
          </div>

          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold text-[#b0004a]">
              Passcode Required
            </h3>
            <p className="text-xs text-[#5a4044] font-medium">
              Hint: Rutuja's Birthdate (0610 or 06102003)
            </p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <input
                type="password"
                required
                placeholder="Enter birthdate passcode (0610)..."
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full text-center tracking-widest text-lg px-4 py-3 rounded-2xl border border-[#e3bdc3] focus:outline-none focus:ring-2 focus:ring-[#d81b60] bg-white font-bold"
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-[#ba1a1a] font-bold bg-[#ffdad6] p-2.5 rounded-xl">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#b0004a] to-[#d81b60] text-white font-bold text-sm shadow-md hover:scale-[1.02] transition-all cursor-pointer"
            >
              Unlock Heart Letter 💖
            </button>
          </form>
        </div>
      ) : (
        /* Unlocked Letter View with Scratch Card */
        <div className="space-y-6">
          {/* Interactive Foil Scratch Area */}
          <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-white/60 bg-white min-h-[260px] flex items-center justify-center">
            <div className="p-8 sm:p-10 w-full text-center space-y-4">
              <h3 className="font-serif text-2xl font-bold text-[#b0004a]">
                {unlockedLetter?.title}
              </h3>
              <p className="font-handwriting text-2xl sm:text-3xl text-[#3d0506] leading-relaxed whitespace-pre-line text-left max-w-xl mx-auto">
                {unlockedLetter?.content}
              </p>
              <p className="text-right text-sm font-bold text-[#ab2c5d] pt-4 max-w-xl mx-auto">
                — {unlockedLetter?.author || 'Prateek'}
              </p>
            </div>

            {/* Scratch Foil Overlay */}
            <canvas
              ref={scratchCanvasRef}
              className="absolute inset-0 z-20 cursor-pointer touch-none"
            />
          </div>

          <div className="flex justify-between items-center px-2">
            <button
              onClick={() => setIsUnlocked(false)}
              className="text-xs font-bold text-[#8e6f74] hover:text-[#3d0506] flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">lock</span>
              Lock Letter Again
            </button>

            <button
              onClick={() => setIsEditOpen(true)}
              className="text-xs font-bold text-[#b0004a] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">edit</span>
              Edit Love Letter
            </button>
          </div>
        </div>
      )}

      {/* Edit Letter Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 relative border border-white/60">
            <button
              onClick={() => setIsEditOpen(false)}
              className="absolute top-5 right-5 text-[#8e6f74] hover:text-[#3d0506] text-xl cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center">
              <span className="material-symbols-outlined text-3xl text-[#b0004a]">
                edit_note
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#b0004a]">
                Edit Secret Love Letter
              </h3>
            </div>

            <form onSubmit={handleEditSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#ab2c5d] mb-1">
                  Letter Title
                </label>
                <input
                  type="text"
                  required
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-[#e3bdc3] text-sm focus:outline-none focus:ring-2 focus:ring-[#d81b60]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#ab2c5d] mb-1">
                  Letter Content
                </label>
                <textarea
                  required
                  rows={6}
                  value={editData.content}
                  onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-[#e3bdc3] text-sm focus:outline-none focus:ring-2 focus:ring-[#d81b60]"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="w-1/2 py-2.5 rounded-full border border-[#8e6f74] text-[#3d0506] font-medium text-sm hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-full bg-[#b0004a] text-white font-medium text-sm hover:bg-[#d81b60] shadow-md cursor-pointer"
                >
                  Save Letter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
