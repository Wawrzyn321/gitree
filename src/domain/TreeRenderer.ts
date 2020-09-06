import { Selection, SelectionCallback } from './Selection';
import { Drawing } from './Drawing';

import { Vector2 } from '../types/Vector2';
import { Node } from "../types/Node";
import { Path } from '../types/Path';

import { partition } from './fileTree';
import { lerp } from './util';

export class TreeRenderer {
    private canvas: HTMLCanvasElement;
    private selection: Selection;
    private drawing: Drawing;
    private currentNode: Node | null;

    private allPaths: Path[] = [];
    private firstLevelPaths: Path[] = [];
    private subdivPaths: Path[] = [];
    private currentPath: Path | null = null;

    private readonly maxLevels = 25;
    private currentNodeCallback: SelectionCallback;

    private get canvasSize(): Vector2 {
        return new Vector2(this.canvas.width, this.canvas.height);
    }

    constructor(canvas: HTMLCanvasElement, selection: SVGRectElement, selectionTitle: SVGTextElement, hoverCallback: SelectionCallback, currentNodeCallback: SelectionCallback) {
        this.canvas = canvas;
        this.selection = new Selection(selection, selectionTitle, hoverCallback);
        this.drawing = new Drawing(this.canvas.getContext('2d')!);

        this.currentNode = null;
        this.currentNodeCallback = currentNodeCallback;
    }

    private getPathOverType(e: any): Path[] {
        if (e.shiftKey) {
            if (e.ctrlKey) {
                return this.subdivPaths;
            } else {
                return this.allPaths;
            }
        } else {
            return this.firstLevelPaths;
        }
    }

    mouseMove(e: any) {
        const paths = this.getPathOverType(e);
        const pathOver = this.findPathOver(e, paths);
        if (this.currentPath !== pathOver) {
            this.currentPath = pathOver;
            if (pathOver === null) {
                this.selection.hide();
            } else {
                this.selection.show(pathOver);
            }
        }
    }

    click() {
        if (this.currentPath === null) return;
        this.draw(this.currentPath.elem);
    }

    hideSelection() {
        this.selection.hide();
    }

    draw(node: Node) {
        if (this.currentNode === node) return;

        this.currentNode = node;
        this.currentNodeCallback(node);

        this.selection.hide();

        this.allPaths = [];
        this.firstLevelPaths = [];
        this.subdivPaths = [];
        this.drawing.fillArea(new Vector2(0, 0), this.canvasSize, 'white');

        node.firstFlag = false;
        for (const e of node.elements) {
            e.firstFlag = true;
        }

        this.drawSegment(node, new Vector2(0, 0), this.canvasSize, 0);
    }

    private drawSegment(node: Node, startPoint: Vector2, endPoint: Vector2, depth: number) {
        if (++depth > this.maxLevels) return;

        node = node.skipSingleDirs();

        if (node.isLeaf) {
            this.drawing.drawText(startPoint, endPoint, node.path);
            if (depth !== 1) {
                const shape = this.drawing.drawRectPath(startPoint, endPoint);
                this.allPaths.push(new Path(shape, node, startPoint, endPoint, false));
            }
            return;
        }

        if (node.firstFlag) {
            const shape = this.drawing.drawRectPath(startPoint, endPoint);
            this.firstLevelPaths.push(new Path(shape, node, startPoint, endPoint, true));
        }

        const parts: Node[] = partition(node)!;

        const ratio = this.calculatePartsRatio(parts);

        let firstEnd: Vector2, secondStart: Vector2;
        if (endPoint.x - startPoint.x > endPoint.y - startPoint.y) {
            const divPointX = lerp(startPoint.x, endPoint.x, ratio);
            firstEnd = new Vector2(divPointX, endPoint.y);
            secondStart = new Vector2(divPointX, startPoint.y);
        } else {
            const divPointY = lerp(startPoint.y, endPoint.y, ratio);
            firstEnd = new Vector2(endPoint.x, divPointY);
            secondStart = new Vector2(startPoint.x, divPointY);
        }
        this.drawing.drawLine(firstEnd, secondStart);

        // add main paths on first level
        if (depth === 1) {
            if (!parts[0].isLeaf) {
                const first = this.drawing.drawRectPath(startPoint, firstEnd);
                this.subdivPaths.push(new Path(first, parts[0], startPoint, firstEnd, true));
            }
            if (!parts[1].isLeaf) {
                const second = this.drawing.drawRectPath(secondStart, endPoint);
                this.subdivPaths.push(new Path(second, parts[1], secondStart, endPoint, true));
            }
        }

        const color = `rgba(0, 0, 63, ${0.15 / depth})`;
        this.drawing.fillArea(startPoint, firstEnd, color);
        this.drawing.fillArea(secondStart, endPoint, color);

        this.drawSegment(parts[0], startPoint, firstEnd, depth);
        this.drawSegment(parts[1], secondStart, endPoint, depth);
    };

    private calculatePartsRatio(parts: Node[]) {
        console.assert(parts.length === 2);
        const ratio = parts[0].size / (parts[0].size + parts[1].size);
        if (ratio > 0.9) return 0.9;
        if (ratio < 0.1) return 0.1;
        return ratio;
    }

    private findPathOver(e: any, paths: Path[]): Path | null {
        const { offsetX: x, offsetY: y } = e.nativeEvent;
        const ctx = this.canvas.getContext('2d')!;
        const pp = (path: Path) => ctx.isPointInPath(path.shape, x, y);
        return paths.find(pp) || null;
    }
}
