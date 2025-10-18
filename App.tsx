
import React, { useState, useCallback } from 'react';
import { CameraView } from './components/CameraView';
import { FrameSelector } from './components/FrameSelector';
import { PhotoGallery } from './components/PhotoGallery';
import { PhotoModal } from './components/PhotoModal';
import { FRAMES } from './constants';
import type { Frame, CapturedPhoto } from './types';

const App: React.FC = () => {
  const [photos, setPhotos] = useState<CapturedPhoto[]>([]);
  const [selectedFrameId, setSelectedFrameId] = useState<string>(FRAMES[0].id);
  const [modalPhoto, setModalPhoto] = useState<CapturedPhoto | null>(null);

  const handleCapture = useCallback((dataUrls: string[]) => {
    const newPhoto: CapturedPhoto = {
      id: `photo-${Date.now()}`,
      dataUrls,
      frameId: selectedFrameId,
    };
    setPhotos(prevPhotos => [newPhoto, ...prevPhotos]);
  }, [selectedFrameId]);

  const handleSelectFrame = (id: string) => {
    setSelectedFrameId(id);
  };

  const handleSelectPhoto = (photo: CapturedPhoto) => {
    setModalPhoto(photo);
  };

  const handleCloseModal = () => {
    setModalPhoto(null);
  };
  
  const selectedFrame = FRAMES.find(f => f.id === selectedFrameId) || FRAMES[0];

  return (
    <div className="min-h-screen bg-stone-800 text-amber-50 p-4 md:p-8 flex flex-col items-center">
      <header className="text-center mb-8">
        <h1 className="text-5xl md:text-7xl font-display text-amber-100 drop-shadow-lg">Vintage Photobooth</h1>
        <p className="text-amber-200 mt-2 text-lg">Capture memories with a classic touch</p>
      </header>
      
      <main className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        <div className="flex-grow lg:w-2/3 flex flex-col items-center gap-6">
          <CameraView onCapture={handleCapture} frame={selectedFrame} />
          <FrameSelector frames={FRAMES} selectedFrameId={selectedFrameId} onSelectFrame={handleSelectFrame} />
        </div>
        <div className="lg:w-1/3">
          <PhotoGallery photos={photos} frames={FRAMES} onSelectPhoto={handleSelectPhoto} />
        </div>
      </main>

      {modalPhoto && (
        <PhotoModal
          photo={modalPhoto}
          frame={FRAMES.find(f => f.id === modalPhoto.frameId) || FRAMES[0]}
          onClose={handleCloseModal}
        />
      )}
       <footer className="mt-12 text-center text-stone-400 text-sm">
        <p>Built with React & Tailwind CSS. Powered by your camera.</p>
      </footer>
    </div>
  );
};

export default App;
