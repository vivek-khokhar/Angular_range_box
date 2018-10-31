export interface BoundingRectangle {
    top: number;
    bottom: number;
    left: number;
    right: number;
    height?: number;
    width?: number;
    scrollTop?: number;
    scrollLeft?: number;
    [key: string]: number | undefined;
  }

  export interface Edges {
    top?: boolean | number;
    bottom?: boolean | number;
    left?: boolean | number;
    right?: boolean | number;
    [key: string]: boolean | number | undefined;
  }

  export interface ResizeEvent {
    rectangle: BoundingRectangle;
    edges: Edges;
  }
