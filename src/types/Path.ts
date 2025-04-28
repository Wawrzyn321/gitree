import { Node } from "./Node";
import { Point2 } from "./Point2";

export type Path = {
  shape: Path2D;
  elem: Node;
  startPoint: Point2;
  endPoint: Point2;
  isMainPath: boolean;
};
