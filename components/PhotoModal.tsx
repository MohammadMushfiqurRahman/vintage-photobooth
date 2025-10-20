import React, { useRef, useState, useEffect } from 'react';
import type { CapturedPhoto, Frame } from '../types';

// Add html2canvas to the window object for TypeScript
declare global {
  interface Window {
    html2canvas: (element: HTMLElement, options?: object) => Promise<HTMLCanvasElement>;
  }
}

interface PhotoModalProps {
  photo: CapturedPhoto;
  frame: Frame;
  onClose: () => void;
}

const FILTERS = [
  { name: 'None', className: '' },
  { name: 'Sepia', className: 'sepia' },
  { name: 'B&W', className: 'grayscale' },
  { name: 'Vintage', className: 'vintage' },
];

export const PhotoModal: React.FC<PhotoModalProps> = ({ photo, frame, onClose }) => {
  const framedPhotoRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(FILTERS[0].className);
  const [isShareSupported, setIsShareSupported] = useState(false);

  useEffect(() => {
    if (navigator.share && navigator.canShare) {
      setIsShareSupported(true);
    }
  }, []);

  const getCanvas = async (): Promise<HTMLCanvasElement | null> => {
    if (!framedPhotoRef.current) return null;
    if (typeof window.html2canvas === 'undefined') {
      console.error("html2canvas library is not available.");
      alert("Feature is currently unavailable. Please try again later.");
      return null;
    }
    return await window.html2canvas(framedPhotoRef.current, {
      scale: 2,
      backgroundColor: null,
      useCORS: true,
    });
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const canvas = await getCanvas();
      if (!canvas) return;

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `photobooth-${photo.id}-${selectedFilter || 'original'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating photo with frame:", error);
      alert("An error occurred while preparing your photo for download.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const canvas = await getCanvas();
      if (!canvas) return;

      canvas.toBlob(async (blob) => {
        if (!blob) {
          alert("Could not create image file to share.");
          setIsSharing(false);
          return;
        }
        const fileName = `photobooth-${photo.id}-${selectedFilter || 'original'}.png`;
        const file = new File([blob], fileName, { type: 'image/png' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'My Vintage Photobooth Picture',
            text: 'Check out this picture I took!',
          });
        } else {
          alert("Your browser does not support sharing files.");
        }
        setIsSharing(false);
      }, 'image/png');
    } catch (error) {
      console.error("Error sharing photo:", error);
      alert("An error occurred while preparing your photo for sharing.");
      setIsSharing(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <style>{`
        .sepia img { filter: sepia(1); }
        .grayscale img { filter: grayscale(1); }
        .vintage img { filter: contrast(1.1) brightness(0.9) saturate(0.8); }
      `}</style>
      <div 
        className="relative max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div 
          ref={framedPhotoRef}
          className={`${frame.className} w-full aspect-[3/4] flex items-center justify-center ${selectedFilter}`}
        >
            {frame.photoCount > 1 ? (
              <div className="w-full h-full grid grid-rows-2 gap-2">
                {photo.dataUrls.map((url, index) => (
                  <img key={index} src={url} alt={`Captured moment ${index + 1}`} className="w-full h-full object-cover transform -scale-x-100" />
                ))}
              </div>
            ) : (
              <img src={photo.dataUrls[0]} alt="Captured moment" className="w-full h-full object-cover transform -scale-x-100" />
            )}
             {frame.name === 'Classic Polaroid' && (
                <p className="absolute bottom-4 font-display text-stone-700 text-2xl">Your Memory</p>
            )}
        </div>

        <div className="mt-4 bg-stone-800/50 p-3 rounded-lg">
            <h4 className="text-center text-amber-100 text-lg font-display mb-2">Apply a Filter</h4>
            <div className="flex justify-center gap-3">
                {FILTERS.map(filter => (
                    <button 
                        key={filter.name}
                        onClick={() => setSelectedFilter(filter.className)}
                        className={`px-4 py-2 text-sm font-bold rounded-md transition-colors ${
                            selectedFilter === filter.className 
                            ? 'bg-amber-500 text-stone-900' 
                            : 'bg-stone-600 text-white hover:bg-stone-500'
                        }`}>
                        {filter.name}
                    </button>
                ))}
            </div>
        </div>
        
        <div className="mt-4 flex justify-center gap-4">
            <button
                onClick={handleDownload}
                disabled={isDownloading || isSharing}
                className="bg-amber-500 text-stone-900 font-bold py-2 px-6 rounded-lg hover:bg-amber-400 transition-colors shadow-lg flex items-center gap-2 disabled:bg-amber-300 disabled:cursor-wait"
            >
                {isDownloading ? (
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                )}
                {isDownloading ? 'Preparing...' : 'Download'}
            </button>
            {isShareSupported && (
              <button
                  onClick={handleShare}
                  disabled={isSharing || isDownloading}
                  className="bg-sky-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-sky-400 transition-colors shadow-lg flex items-center gap-2 disabled:bg-sky-300 disabled:cursor-wait"
              >
                  {isSharing ? (
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                    </svg>
                  )}
                  {isSharing ? 'Sharing...' : 'Share'}
              </button>
            )}
            <button
                onClick={onClose}
                className="bg-stone-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-stone-500 transition-colors shadow-lg flex items-center gap-2"
            >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Close
            </button>
        </div>
      </div>
    </div>
  );
};
