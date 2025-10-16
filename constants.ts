
import type { Frame } from './types';

export const FRAMES: Frame[] = [
  {
    id: 'polaroid',
    name: 'Classic Polaroid',
    className: 'bg-stone-100 p-4 pb-16 shadow-lg border border-stone-300 relative',
    previewClassName: 'bg-stone-100 p-1 pb-4 shadow-md border border-stone-300',
    aspectRatio: '3/4'
  },
  {
    id: 'ornate',
    name: 'Ornate Gold',
    className: 'bg-stone-900 p-6 border-8 border-amber-600 shadow-2xl border-double',
    previewClassName: 'bg-stone-900 p-1 border-4 border-amber-600 shadow-md',
    aspectRatio: '3/4'
  },
  {
    id: 'filmstrip',
    name: 'Film Strip',
    className: 'bg-black p-4 border-y-8 border-stone-700 flex items-center justify-center',
    previewClassName: 'bg-black p-1 border-y-2 border-stone-700',
    aspectRatio: '3/4'
  },
  {
    id: 'scrapbook',
    name: 'Scrapbook',
    className: 'bg-amber-100 p-4 border-2 border-dashed border-amber-800 rotate-[-3deg] shadow-lg',
    previewClassName: 'bg-amber-100 p-1 border border-dashed border-amber-800 rotate-[-3deg] shadow-md',
    aspectRatio: '3/4'
  },
  {
    id: 'minimalist',
    name: 'Minimalist Black',
    className: 'bg-transparent p-2 border-4 border-stone-200',
    previewClassName: 'bg-transparent p-1 border-2 border-stone-200',
    aspectRatio: '3/4'
  }
];
