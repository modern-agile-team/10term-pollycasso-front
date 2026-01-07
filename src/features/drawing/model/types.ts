export type DrawingTool = 'pencil' | 'brush' | 'pen' | 'eraser';

export interface Point {
  x: number;
  y: number;
}

export interface DrawLine {
  tool: DrawingTool;
  color: string;
  size: number;
  points: number[];
}

export interface DrawData {
  lines: DrawLine[];
}
