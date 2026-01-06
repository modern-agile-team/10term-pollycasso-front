export interface Point {
  x: number;
  y: number;
}

export interface Line {
  tool: 'pen' | 'eraser';
  color: string;
  size: number;
  points: number[];
}

export interface DrawData {
  lines: Line[];
}
