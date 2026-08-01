import React, { useState } from 'react';

export default function OurStory({ memories, onAddMemory, onDeleteMemory }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    category: 'Special Moment',
    description: '',
    imageUrl: '',
    tag: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;
    onAddMemory(formData);
    setIsModalOpen(false);
    setFormData({
      title: '',
      location: '',
      category: 'Special Moment',
      description: '',
      imageUrl: '',
      tag: ''
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-16">
      {/* Header section */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#ab2c5d] bg-[#ffe9e7] px-4 py-1.5 rounded-full inline-block">
          Digital Scrapbook
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#b0004a]">
          Our Love Story & Timeline
        </h2>
        <p className="text-[#5a4044] text-base max-w-lg mx-auto font-medium">
          Every chapter, text message, and quiet moment that brought us closer together.
        </p>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-[#b0004a] to-[#d81b60] text-white px-6 py-2.5 rounded-full shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all text-sm font-semibold cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Add New Story Chapter
        </button>
      </div>

      {/* Timeline Chapters */}
      <div className="space-y-16">
        {memories.map((mem, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={mem.id || index}
              className={`flex flex-col md:flex-row items-center gap-8 ${
                isEven ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Polaroid Photo Frame */}
              <div className="w-full md:w-1/2 flex justify-center">
                <div
                  className="polaroid-frame max-w-sm w-full cursor-pointer group"
                  style={{
                    transform: `rotate(${mem.rotation || (isEven ? 1.5 : -1.5)}deg)`
                  }}
                >
                  <div className="relative overflow-hidden rounded">
                    <img
                      src={mem.imageUrl}
                      alt={mem.title}
                      className="w-full aspect-[4/3] object-cover rounded transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[#b0004a] text-xs font-bold px-3 py-1 rounded-full shadow">
                      {mem.tag || `Chapter ${index + 1}`}
                    </span>
                  </div>
                  <div className="mt-3 text-center">
                    <p className="font-handwriting text-3xl text-[#3d0506] leading-snug">
                      {mem.title}
                    </p>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#ab2c5d] mt-1">
                      📍 {mem.location || 'Pune'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Story Description & Interactive Text Bubbles */}
              <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
                <span className="text-xs font-bold text-[#cca730] uppercase tracking-widest bg-[#fff0ef] px-3 py-1 rounded-md inline-block">
                  {mem.category}
                </span>

                <h3 className="font-serif text-2xl font-bold text-[#b0004a]">
                  {mem.title}
                </h3>

                <p className="text-[#5a4044] text-base leading-relaxed font-medium">
                  {mem.description}
                </p>

                {/* Chat Bubbles feature if available */}
                {mem.chatBubbles && mem.chatBubbles.length > 0 && (
                  <div className="bg-[#ffe9e7]/60 p-4 rounded-2xl border border-white/50 space-y-3 mt-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#ab2c5d] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm">chat</span>
                      Message Excerpts
                    </p>
                    {mem.chatBubbles.map((bubble, bIdx) => (
                      <div
                        key={bIdx}
                        className={`flex ${
                          bubble.sender === 'me' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[85%] px-4 py-2 rounded-2xl text-xs sm:text-sm ${
                            bubble.sender === 'me'
                              ? 'bg-[#d81b60] text-white rounded-br-none shadow-sm'
                              : 'glass-blush text-[#3d0506] rounded-bl-none shadow-sm'
                          }`}
                        >
                          {bubble.text}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {onDeleteMemory && (
                  <button
                    onClick={() => onDeleteMemory(mem.id)}
                    className="text-xs text-[#8e6f74] hover:text-[#ba1a1a] transition-colors inline-flex items-center gap-1 pt-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                    Remove Chapter
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Memory Modal */}
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
                auto_stories
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#b0004a]">
                Add Story Chapter
              </h3>
              <p className="text-xs text-[#5a4044] mt-1">
                Record a special memory or turning point in your love story.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#ab2c5d] mb-1">
                  Chapter Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Cozy Evening Together"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#e3bdc3] focus:outline-none focus:ring-2 focus:ring-[#d81b60] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#ab2c5d] mb-1">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g., Pune"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#e3bdc3] focus:outline-none focus:ring-2 focus:ring-[#d81b60] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#ab2c5d] mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  placeholder="/images/photo1.jpg or https://..."
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#e3bdc3] focus:outline-none focus:ring-2 focus:ring-[#d81b60] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#ab2c5d] mb-1">
                  Memory Description
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="What happened and how did it feel?"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                  Save Chapter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
