
export interface Frame {
  id: string;
  name: string;
  className: string;
  previewClassName: string;
  aspectRatio: string;
}

export interface CapturedPhoto {
  id: string;
  dataUrl: string;
  frameId: string;
}
