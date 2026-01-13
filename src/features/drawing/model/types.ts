export type DrawingTool = 'pencil' | 'brush' | 'neon' | 'bucket' | 'eraser';

export interface Point {
  x: number;
  y: number;
}

export interface DrawLine {
  tool: DrawingTool;
  color: string;
  size: number;
  points: number[];
  filledImage?: HTMLImageElement;
}

export interface DrawData {
  lines: DrawLine[];
}

export interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}
