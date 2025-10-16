
import React from 'react';
import type { Frame } from '../types';

interface FrameSelectorProps {
  frames: Frame[];
  selectedFrameId: string;
  onSelectFrame: (id: string) => void;
}

export const FrameSelector: React.FC<FrameSelectorProps> = ({ frames, selectedFrameId, onSelectFrame }) => {
  return (
    <div className="w-full max-w-2xl bg-stone-700 bg-opacity-50 p-4 rounded-lg shadow-inner">
      <h3 className="text-center text-amber-100 text-xl font-display mb-4">Choose a Frame</h3>
      <div className="flex justify-center items-center gap-4 flex-wrap">
        {frames.map((frame) => (
          <button
            key={frame.id}
            onClick={() => onSelectFrame(frame.id)}
            className={`w-24 h-32 rounded-md transition-all duration-300 ${
              selectedFrameId === frame.id
                ? 'ring-4 ring-amber-400 scale-110'
                : 'ring-2 ring-transparent hover:ring-amber-300 hover:scale-105'
            }`}
          >
            <div className={`w-full h-full flex items-center justify-center ${frame.previewClassName}`}>
              <div className="w-16 h-20 bg-stone-500 opacity-50"></div>
            </div>
            <span className="sr-only">{frame.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
