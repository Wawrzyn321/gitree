import { Node } from './../types/Node';
import { Path } from "../types/Path";
import { Vector2 } from "../types/Vector2";
import { Drawing } from './Drawing';

export type SelectionCallback = (node: Node | null) => void;

export class Selection {
    private callback: SelectionCallback;

    private drawing: Drawing;

    constructor(canvas: HTMLCanvasElement, callback: SelectionCallback) {
        this.callback = callback;
        this.drawing = new Drawing(canvas.getContext('2d')!)
    }

    hide() {
        this.drawing.clear();
        this.callback(null);
    }

    show(pathOver: Path) {
        const { start, end, isMainPath, elem } = pathOver;

        this.drawing.clear();

        this.drawing.drawOutline(start, end);

        if (isMainPath) {
            this.tryDisplayText(elem.path, start, end);
        }
        this.callback(elem);
    }

    private tryDisplayText(text: string, start: Vector2, end: Vector2) {
        const textLength = this.drawing.measureText(text).width;
        if (end.x - start.x >= textLength) {
            this.drawing.drawSelectionText(start, end, text);
        }
    }
}
