
import type { Frame } from './types';

export const FRAMES: Frame[] = [
  {
    id: 'polaroid',
    name: 'Classic Polaroid',
    className: 'bg-stone-100 p-4 pb-16 shadow-lg border border-stone-300 relative',
    previewClassName: 'bg-stone-100 p-1 pb-4 shadow-md border border-stone-300',
    aspectRatio: '3/4',
    photoCount: 1
  },
  {
    id: 'photo-strip',
    name: 'Photo Strip',
    className: 'bg-stone-100 p-2 shadow-lg border border-stone-300 relative grid grid-rows-2 gap-2',
    previewClassName: 'bg-stone-100 p-1 shadow-md border border-stone-300 grid grid-rows-2 gap-1',
    aspectRatio: '3/8',
    photoCount: 2
  },
  {
    id: 'ornate',
    name: 'Ornate Gold',
    className: 'bg-stone-900 p-6 border-8 border-amber-600 shadow-2xl border-double',
    previewClassName: 'bg-stone-900 p-1 border-4 border-amber-600 shadow-md',
    aspectRatio: '3/4',
    photoCount: 1
  },
  {
    id: 'filmstrip',
    name: 'Film Strip',
    className: 'bg-black p-4 border-y-8 border-stone-700 flex items-center justify-center',
    previewClassName: 'bg-black p-1 border-y-2 border-stone-700',
    aspectRatio: '3/4',
    photoCount: 1
  },
  {
    id: 'scrapbook',
    name: 'Scrapbook',
    className: 'bg-amber-100 p-4 border-2 border-dashed border-amber-800 rotate-[-3deg] shadow-lg',
    previewClassName: 'bg-amber-100 p-1 border border-dashed border-amber-800 rotate-[-3deg] shadow-md',
    aspectRatio: '3/4',
    photoCount: 1
  },
  {
    id: 'minimalist',
    name: 'Minimalist Black',
    className: 'bg-transparent p-2 border-4 border-stone-200',
    previewClassName: 'bg-transparent p-1 border-2 border-stone-200',
    aspectRatio: '3/4',
    photoCount: 1
  },
  {
    id: 'vintage-wood',
    name: 'Vintage Wood',
    className: 'bg-yellow-900 p-8 border-4 border-yellow-950 shadow-2xl',
    previewClassName: 'bg-yellow-900 p-2 border-2 border-yellow-950 shadow-md',
    aspectRatio: '3/4',
    photoCount: 1
  },
  {
    id: 'retro-tv',
    name: 'Retro TV',
    className: 'bg-stone-800 p-12 border-8 border-stone-700 rounded-3xl shadow-2xl relative',
    previewClassName: 'bg-stone-800 p-3 border-2 border-stone-700 rounded-md shadow-md',
    aspectRatio: '3/4',
    photoCount: 1
  },
  {
    id: 'techno',
    name: 'Techno',
    className: 'bg-indigo-900 p-4 border-4 border-dashed border-indigo-400 shadow-2xl shadow-indigo-500/50',
    previewClassName: 'bg-indigo-900 p-1 border-2 border-dashed border-indigo-400 shadow-md',
    aspectRatio: '3/4',
    photoCount: 1
  }
];
