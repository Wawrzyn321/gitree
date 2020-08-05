import { Path } from "../types/Path";
import { Vector2 } from "../types/Vector2";

export class Selection {
    private selection: SVGRectElement;
    private selectionTitle: SVGTextElement;

    constructor(selection: SVGRectElement, selectionTitle: SVGTextElement) {
        this.selection = selection;
        this.selectionTitle = selectionTitle;
    }

    hide() {
        this.selection.setAttribute('width', '0');
        this.selection.setAttribute('height', '0');
        this.hideSelection();
    }

    show(pathOver: Path) {
        const { start, end, isMainPath, elem } = pathOver;

        this.selection.setAttribute('x', start.x.toString());
        this.selection.setAttribute('y', start.y.toString());
        this.selection.setAttribute('width', (end.x - start.x).toString());
        this.selection.setAttribute('height', (end.y - start.y).toString());

        if (isMainPath) {
            this.displayText(elem.path, start, end);
        } else {
            this.hideSelection();
        }
    }

    private displayText(text: string, start: Vector2, end: Vector2) {
        // console.log(elem);
        const pos = start.lerp(end, 0.5);

        this.selectionTitle.textContent = text;
        this.selectionTitle.setAttribute('x', pos.x.toString());
        this.selectionTitle.setAttribute('y', pos.y.toString());
        console.log(this.selectionTitle.getComputedTextLength());
    }

    private hideSelection() {
        this.selectionTitle.textContent = '';
    }

}