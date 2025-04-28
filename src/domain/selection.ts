import { Node } from "../types/Node";
import { Path } from "../types/Path";
import { Point2 } from "../types/Point2";
import { Drawing } from "./Drawing";

export type SelectionCallback = (node: Node | null) => void;

export class Selection {
  constructor(
    private readonly drawing: Drawing,
    private readonly callback: SelectionCallback,
  ) {}

  hide() {
    this.drawing.clear();
    this.callback(null);
  }

  show(pathOver: Path) {
    const { startPoint, endPoint, isMainPath, elem } = pathOver;

    this.drawing.clear();

    this.drawing.drawOutline(startPoint, endPoint);

    if (isMainPath) {
      this.tryDisplayText(elem.path, startPoint, endPoint);
    }
    this.callback(elem);
  }

  private tryDisplayText(text: string, start: Point2, end: Point2) {
    const textLength = this.drawing.measureText(text).width;
    if (end.x - start.x >= textLength) {
      this.drawing.drawSelectionText(start, end, text);
    }
  }
}
