import { Node } from './../types/Node';
import { Path } from "../types/Path";
import { Vector2 } from "../types/Vector2";

export type SelectionCallback = (node: Node | null) => void;

export class Selection {
    private selection: SVGRectElement;
    private selectionTitle: SVGTextElement;
    private callback: SelectionCallback;

    constructor(selection: SVGRectElement, selectionTitle: SVGTextElement, callback: SelectionCallback) {
        this.selection = selection;
        this.selectionTitle = selectionTitle;
        this.callback = callback;
    }

    hide() {
        this.selection.setAttribute('width', '0');
        this.selection.setAttribute('height', '0');
        this.hideSelection();
        this.callback(null);
    }

    show(pathOver: Path) {
        const { start, end, isMainPath, elem } = pathOver;

        this.selection.setAttribute('x', start.x.toString());
        this.selection.setAttribute('y', start.y.toString());
        this.selection.setAttribute('width', (end.x - start.x).toString());
        this.selection.setAttribute('height', (end.y - start.y).toString());

        if (isMainPath) {
            this.tryDisplayText(elem.path, start, end);
        } else {
            this.hideSelection();
        }
        this.callback(elem);
    }

    private tryDisplayText(text: string, start: Vector2, end: Vector2) {
        this.selectionTitle.textContent = text;
        const textLength = this.selectionTitle.getComputedTextLength();
        if (end.x - start.x < textLength) {
            this.hideSelection();
        } else {
            const pos = start.lerp(end, 0.5);
            this.selectionTitle.setAttribute('x', pos.x.toString());
            this.selectionTitle.setAttribute('y', pos.y.toString());
        }
    }

    private hideSelection() {
        this.selectionTitle.textContent = '';
    }

}