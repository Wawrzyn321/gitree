import { lerp } from "./util";
import { Path } from "../types/Path";

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
        this.selectionTitle.textContent = '';
    }

    show(pathOver: Path) {
        const { start, end, isMainPath, elem } = pathOver;

        this.selection.setAttribute('x', start[0].toString());
        this.selection.setAttribute('y', start[1].toString());
        this.selection.setAttribute('width', (end[0] - start[0]).toString());
        this.selection.setAttribute('height', (end[1] - start[1]).toString());

        if (isMainPath) {
            this.displayText(start, end, elem);
        }
    }

    private displayText(start: number[], end: number[], elem: any) {
        console.log(elem);
        this.selectionTitle.textContent = elem.__path__;
        this.selectionTitle.setAttribute('x', lerp(start[0], end[0], 0.5).toString());
        this.selectionTitle.setAttribute('y', lerp(start[1], end[1], 0.5).toString());
    }

}