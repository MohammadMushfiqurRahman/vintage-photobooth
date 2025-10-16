
import React, { useRef, useState, useEffect, useCallback } from 'react';
import type { Frame } from '../types';

interface CameraViewProps {
  onCapture: (dataUrl: string) => void;
  frame: Frame;
}

const CountdownOverlay: React.FC<{ count: number }> = ({ count }) => (
  <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-20">
    <div className="text-9xl font-bold text-white animate-ping">{count}</div>
  </div>
);

const FlashOverlay: React.FC = () => (
    <div className="absolute inset-0 bg-white z-20 animate-flash">
        <style>{`
            @keyframes flash {
                0% { opacity: 0.8; }
                100% { opacity: 0; }
            }
            .animate-flash {
                animation: flash 0.3s ease-out;
            }
        `}</style>
    </div>
);


export const CameraView: React.FC<CameraViewProps> = ({ onCapture, frame }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    const enableCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: {
                facingMode: 'user',
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsCameraReady(true);
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError("Could not access camera. Please check permissions and try again.");
      }
    };
    enableCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCaptureClick = useCallback(() => {
    if (!isCameraReady || countdown !== null) return;
    setCountdown(3);
  }, [isCameraReady, countdown]);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else { // countdown is 0
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 300);

      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (video && canvas) {
        const context = canvas.getContext('2d');
        if (context) {
          const { videoWidth, videoHeight } = video;
          canvas.width = videoWidth;
          canvas.height = videoHeight;
          context.drawImage(video, 0, 0, videoWidth, videoHeight);
          const dataUrl = canvas.toDataURL('image/png');
          onCapture(dataUrl);
        }
      }
      setCountdown(null);
    }
  }, [countdown, onCapture]);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-4">
        <div style={{ aspectRatio: frame.aspectRatio }} className="relative w-full bg-black rounded-lg overflow-hidden shadow-2xl flex items-center justify-center">
            <div className={`w-full h-full absolute inset-0 z-10 pointer-events-none transition-all duration-300 flex items-center justify-center ${frame.className}`}>
                 {frame.name === 'Classic Polaroid' && (
                    <p className="absolute bottom-4 font-display text-stone-700 text-2xl">Your Memory</p>
                )}
            </div>
            {countdown !== null && countdown > 0 && <CountdownOverlay count={countdown} />}
            {isFlashing && <FlashOverlay />}

            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transform -scale-x-100"
            />
             {!isCameraReady && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
                    {error ? (
                        <p className="text-red-400 text-center p-4">{error}</p>
                    ) : (
                        <p>Starting camera...</p>
                    )}
                </div>
            )}
        </div>
        <canvas ref={canvasRef} className="hidden" />
        <button
            onClick={handleCaptureClick}
            disabled={!isCameraReady || countdown !== null}
            className="group relative w-24 h-24 rounded-full bg-red-600 hover:bg-red-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-400 focus:ring-opacity-50 shadow-lg"
        >
            <div className="absolute inset-0.5 rounded-full bg-red-500 group-hover:bg-red-600 transition-colors"></div>
            <div className="absolute inset-2 rounded-full border-4 border-red-700 group-hover:border-red-800 transition-colors"></div>
            <span className="sr-only">Capture Photo</span>
        </button>
    </div>
  );
};
