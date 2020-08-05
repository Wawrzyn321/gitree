import { Node } from "./Node";
import { Vector2 } from "./Vector2";

export class Path {
    shape: Path2D;
    elem: Node;
    start: Vector2;
    end: Vector2;
    isMainPath: boolean;

    constructor(shape: Path2D, elem: Node, start: Vector2, end: Vector2, isMainPath: boolean) {
        this.shape = shape;
        this.elem = elem;
        this.start = start;
        this.end = end;
        this.isMainPath = isMainPath;
    }
}
