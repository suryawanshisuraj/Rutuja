import React, { useState } from 'react';

export default function ReasonsILoveYou({ reasons, onAddReason, onDeleteReason }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [flippedCards, setFlippedCards] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    reason: '',
    category: 'Little Things',
    icon: 'favorite',
    color: '#d81b60'
  });

  const categories = ['All', 'Little Things', 'Memories', 'Moments', 'Personality', 'Support'];

  const handleFlip = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.reason) return;
    onAddReason(formData);
    setIsModalOpen(false);
    setFormData({
      title: '',
      reason: '',
      category: 'Little Things',
      icon: 'favorite',
      color: '#d81b60'
    });
  };

  const filteredReasons = activeCategory === 'All'
    ? reasons
    : reasons.filter((r) => r.category === activeCategory);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-10">
      {/* Header section */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#ab2c5d] bg-[#ffe9e7] px-4 py-1.5 rounded-full inline-block">
          Interactive Reasons
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#b0004a]">
          Reasons Why I Love You
        </h2>
        <p className="text-[#5a4044] text-base max-w-md mx-auto font-medium">
          Click any card to flip it over and reveal a reason my heart belongs to you.
        </p>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-2 inline-flex items-center gap-2 bg-gradient-to-r from-[#b0004a] to-[#d81b60] text-white px-6 py-2.5 rounded-full shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all text-sm font-semibold cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">add_circle</span>
          Add A Reason
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#b0004a] text-white shadow-md scale-105'
                : 'bg-white/80 text-[#5a4044] hover:bg-[#ffe9e7] border border-white/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3D Flip Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-4">
        {filteredReasons.map((item, idx) => {
          const isFlipped = !!flippedCards[item.id];
          return (
            <div
              key={item.id || idx}
              onClick={() => handleFlip(item.id)}
              className="h-64 w-full perspective-1000 cursor-pointer group"
            >
              <div
                className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front Side */}
                <div className="absolute inset-0 w-full h-full rounded-3xl glass-blush p-6 flex flex-col justify-between items-center text-center backface-hidden shadow-lg border border-white/70 group-hover:border-[#d81b60]/40">
                  <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow-sm text-[#b0004a] mt-2">
                    <span className="material-symbols-outlined text-2xl filled">
                      {item.icon || 'favorite'}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#cca730]">
                      Reason #{idx + 1}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#b0004a]">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#ab2c5d] font-bold flex items-center gap-1">
                    Tap to reveal secret <span className="material-symbols-outlined text-sm">touch_app</span>
                  </p>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-br from-[#b0004a] to-[#d81b60] text-white p-6 flex flex-col justify-between items-center text-center backface-hidden rotate-y-180 shadow-2xl border border-white/40">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#ffe9e7]">
                      {item.category}
                    </span>
                    <span className="material-symbols-outlined text-sm">favorite</span>
                  </div>

                  <p className="font-handwriting text-2.5xl leading-relaxed text-white">
                    "{item.reason}"
                  </p>

                  <div className="flex justify-between items-center w-full">
                    <span className="text-[10px] text-white/80 font-medium">Tap to flip back</span>
                    {onDeleteReason && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteReason(item.id);
                        }}
                        className="text-xs text-white/70 hover:text-white flex items-center gap-0.5 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Reason Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative border border-white/60">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-[#8e6f74] hover:text-[#3d0506] text-xl cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center">
              <span className="material-symbols-outlined text-3xl text-[#b0004a]">
                favorite
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#b0004a]">
                Add A Reason I Love You
              </h3>
              <p className="text-xs text-[#5a4044] mt-1">
                Add another special reason to your interactive 3D card deck.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#ab2c5d] mb-1">
                  Card Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Your Gentle Laugh"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#e3bdc3] focus:outline-none focus:ring-2 focus:ring-[#d81b60] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#ab2c5d] mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#e3bdc3] focus:outline-none focus:ring-2 focus:ring-[#d81b60] text-sm"
                >
                  <option value="Little Things">Little Things</option>
                  <option value="Memories">Memories</option>
                  <option value="Moments">Moments</option>
                  <option value="Personality">Personality</option>
                  <option value="Support">Support</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#ab2c5d] mb-1">
                  Reason Description
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Why does this make your heart melt?"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#e3bdc3] focus:outline-none focus:ring-2 focus:ring-[#d81b60] text-sm"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 py-2.5 rounded-full border border-[#8e6f74] text-[#3d0506] font-medium text-sm hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-full bg-[#b0004a] text-white font-medium text-sm hover:bg-[#d81b60] shadow-md cursor-pointer"
                >
                  Save Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
