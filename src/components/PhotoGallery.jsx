import React, { useState } from 'react';

export default function PhotoGallery({ photos, onAddPhoto, onDeletePhoto }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    caption: '',
    location: '',
    category: 'Everyday Joy',
    imageUrl: ''
  });

  const categories = ['All', 'Fun & Adventures', 'Everyday Joy', 'Romantic Evenings', 'Special Dates'];

  const filteredPhotos = activeFilter === 'All'
    ? photos
    : photos.filter((p) => p.category === activeFilter);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.imageUrl) return;
    onAddPhoto(formData);
    setIsAddModalOpen(false);
    setFormData({
      title: '',
      caption: '',
      location: '',
      category: 'Everyday Joy',
      imageUrl: ''
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-10">
      {/* Title */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#ab2c5d] bg-[#ffe9e7] px-4 py-1.5 rounded-full inline-block">
          Photo Keepsakes
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#b0004a]">
          Polaroid Photo Gallery
        </h2>
        <p className="text-[#5a4044] text-base max-w-md mx-auto font-medium">
          Snapshots of our journey framed like vintage Polaroids.
        </p>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="mt-2 inline-flex items-center gap-2 bg-gradient-to-r from-[#b0004a] to-[#d81b60] text-white px-6 py-2.5 rounded-full shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all text-sm font-semibold cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">add_a_photo</span>
          Upload New Keepsake
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
              activeFilter === cat
                ? 'bg-[#b0004a] text-white shadow-md scale-105'
                : 'bg-white/80 text-[#5a4044] hover:bg-[#ffe9e7] border border-white/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Polaroid Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pt-4">
        {filteredPhotos.map((photo, idx) => (
          <div
            key={photo.id || idx}
            onClick={() => setSelectedPhoto(photo)}
            className="polaroid-frame cursor-pointer group"
            style={{
              transform: `rotate(${photo.rotation || (idx % 2 === 0 ? 2 : -2)}deg)`
            }}
          >
            <div className="relative overflow-hidden rounded bg-gray-100 aspect-[4/5]">
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-white/90 text-[#b0004a] p-2.5 rounded-full shadow-lg">
                  <span className="material-symbols-outlined text-xl">zoom_in</span>
                </span>
              </div>
            </div>

            <div className="mt-3 text-center space-y-0.5">
              <p className="font-handwriting text-2.5xl text-[#3d0506] font-semibold leading-tight">
                {photo.title}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#ab2c5d]">
                📍 {photo.location || 'Pune'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Photo Preview Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full rounded-3xl p-6 relative shadow-2xl space-y-4 border border-white/40 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 bg-gray-100 text-[#3d0506] w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-200 cursor-pointer"
            >
              ✕
            </button>

            <div className="max-h-[60vh] rounded-2xl overflow-hidden bg-black/5 flex items-center justify-center">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                className="max-h-[60vh] w-auto object-contain rounded-2xl shadow"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-2xl font-bold text-[#b0004a]">
                  {selectedPhoto.title}
                </h3>
                <span className="text-xs font-bold text-[#cca730] uppercase tracking-wider bg-[#fff0ef] px-3 py-1 rounded-full">
                  {selectedPhoto.category}
                </span>
              </div>

              <p className="text-xs font-bold uppercase tracking-wider text-[#ab2c5d]">
                📍 {selectedPhoto.location || 'Pune'}
              </p>

              {selectedPhoto.caption && (
                <p className="text-[#5a4044] text-sm font-medium pt-1">
                  "{selectedPhoto.caption}"
                </p>
              )}
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <span className="font-handwriting text-xl text-[#b0004a]">
                Memories are timeless ❤️
              </span>
              {onDeletePhoto && (
                <button
                  onClick={() => {
                    onDeletePhoto(selectedPhoto.id);
                    setSelectedPhoto(null);
                  }}
                  className="text-xs text-[#ba1a1a] hover:underline flex items-center gap-1 font-medium cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                  Delete Keepsake
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Photo Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative border border-white/60">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 text-[#8e6f74] hover:text-[#3d0506] text-xl cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center">
              <span className="material-symbols-outlined text-3xl text-[#b0004a]">
                photo_camera
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#b0004a]">
                Add Photo Keepsake
              </h3>
              <p className="text-xs text-[#5a4044] mt-1">
                Frame a new picture into your digital anniversary scrapbook.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#ab2c5d] mb-1">
                  Photo Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Happy Moment"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#e3bdc3] focus:outline-none focus:ring-2 focus:ring-[#d81b60] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#ab2c5d] mb-1">
                  Image Path / URL
                </label>
                <input
                  type="text"
                  required
                  placeholder="/images/photo1.jpg or https://..."
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
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
                  Caption / Note
                </label>
                <input
                  type="text"
                  placeholder="A short romantic memory note..."
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#e3bdc3] focus:outline-none focus:ring-2 focus:ring-[#d81b60] text-sm"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-1/2 py-2.5 rounded-full border border-[#8e6f74] text-[#3d0506] font-medium text-sm hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-full bg-[#b0004a] text-white font-medium text-sm hover:bg-[#d81b60] shadow-md cursor-pointer"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
