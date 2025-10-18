
import React from 'react';
import type { CapturedPhoto, Frame } from '../types';

interface PhotoGalleryProps {
  photos: CapturedPhoto[];
  frames: Frame[];
  onSelectPhoto: (photo: CapturedPhoto) => void;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos, frames, onSelectPhoto }) => {
  return (
    <div className="bg-stone-900/50 p-4 rounded-lg shadow-inner h-full">
      <h2 className="text-3xl font-display text-center text-amber-100 mb-4">Your Photos</h2>
      {photos.length === 0 ? (
        <div className="text-center text-stone-400 pt-8">
          <p>Your captured photos will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4">
          {photos.map((photo) => {
            const frame = frames.find(f => f.id === photo.frameId);
            if (!frame) return null;
            return (
              <div
                key={photo.id}
                onClick={() => onSelectPhoto(photo)}
                className="cursor-pointer group relative"
              >
                <div className={`${frame.previewClassName} w-full aspect-[3/4] flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}>
                  {frame.photoCount > 1 ? (
                    <div className="w-full h-full grid grid-rows-2 gap-1">
                      {photo.dataUrls.map((url, index) => (
                        <img key={index} src={url} alt={`Captured moment ${index + 1}`} className="w-full h-full object-cover transform -scale-x-100" />
                      ))}
                    </div>
                  ) : (
                    <img src={photo.dataUrls[0]} alt="Captured moment" className="w-full h-full object-cover transform -scale-x-100" />
                  )}
                </div>
                 <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                    <p className="text-white text-lg font-bold opacity-0 group-hover:opacity-100">View</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
