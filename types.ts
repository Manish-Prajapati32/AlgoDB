
export type ModuleType = 'DSA' | 'DBMS' | 'SQL';

export interface Topic {
  id: string;
  name: string;
  module: ModuleType;
}

export interface AnimationFrame {
  data: any;
  message: string;
  highlightedIndices?: number[];
  activePointers?: Record<string, number>;
  activeNodes?: string[];
  swapping?: [number, number];
}

export interface Complexity {
  time: string;
  space: string;
}

export interface SQLTable {
  name: string;
  columns: string[];
  rows: any[][];
}
