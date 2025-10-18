
export interface Frame {
  id: string;
  name: string;
  className: string;
  previewClassName: string;
  aspectRatio: string;
  photoCount: number;
}

export interface CapturedPhoto {
  id: string;
  dataUrls: string[];
  frameId: string;
}
