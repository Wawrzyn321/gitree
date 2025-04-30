import { Selection, SelectionCallback } from "./selection";
import { Drawing } from "./Drawing";

import { Point2 } from "../types/Point2";
import { Node } from "../types/Node";
import { Path } from "../types/Path";

import { partition } from "./fileTree";
import { lerp } from "./util";
import { Colors } from "../hooks/useColors";

type MoveModifiers = {
  firstLevelPaths: boolean;
  showSubdivPaths: boolean;
};

export class TreeRenderer {
  private canvas: HTMLCanvasElement;
  private linkRef: HTMLAnchorElement;
  private selection: Selection;
  private drawing: Drawing;
  private currentNode: Node | null;

  private allPaths: Path[] = [];
  private firstLevelPaths: Path[] = [];
  private subdivPaths: Path[] = [];
  private currentPath: Path | null = null;

  private readonly maxLevels = 25;
  private setCurrentNode: SelectionCallback;

  constructor(
    canvas: HTMLCanvasElement,
    overlayCanvas: HTMLCanvasElement,
    linkRef: HTMLAnchorElement,
    hoverCallback: SelectionCallback,
    currentNodeCallback: SelectionCallback,
    useDarkTheme: boolean,
    colors: Colors,
  ) {
    const selectionDrawing = new Drawing(
      overlayCanvas.getContext("2d")!,
      useDarkTheme,
      colors,
    );

    this.canvas = canvas;
    this.linkRef = linkRef;
    this.selection = new Selection(selectionDrawing, hoverCallback);
    this.drawing = new Drawing(
      this.canvas.getContext("2d")!,
      useDarkTheme,
      colors,
    );

    this.currentNode = null;
    this.setCurrentNode = currentNodeCallback;
  }

  private getPathOverType({
    firstLevelPaths,
    showSubdivPaths,
  }: MoveModifiers): Path[] {
    if (!firstLevelPaths) {
      if (showSubdivPaths) {
        return this.subdivPaths;
      } else {
        return this.allPaths;
      }
    } else {
      return this.firstLevelPaths;
    }
  }

  mouseMove(position: Point2, modifiers: MoveModifiers) {
    const paths = this.getPathOverType(modifiers);
    const pathOver = this.findPathOver(position, paths);
    if (this.currentPath !== pathOver) {
      this.currentPath = pathOver;
      if (pathOver) {
        this.selection.show(pathOver);
      } else {
        this.selection.hide();
      }
    }
  }

  click() {
    if (!this.currentPath) return;
    this.draw(this.currentPath.elem);
  }

  hideSelection() {
    this.selection.hide();
    this.currentPath = null;
  }

  draw(node: Node) {
    if (this.currentNode === node) return;

    this.currentNode = node;
    this.setCurrentNode(node);

    this.selection.hide();

    this.allPaths = [];
    this.firstLevelPaths = [];
    this.subdivPaths = [];
    this.drawing.clear();

    node.isTop = false;
    for (const e of node.elements) {
      e.isTop = true;
    }

    const canvasSize = new Point2(this.canvas.width, this.canvas.height);
    this.drawSegment(node, Point2.zero, canvasSize, 0);
  }

  private drawSegment(
    node: Node,
    startPoint: Point2,
    endPoint: Point2,
    depth: number,
  ) {
    if (++depth > this.maxLevels) return;

    node = node.skipSingleDirs();

    if (node.isLeaf) {
      this.drawing.drawNodeText(startPoint, endPoint, node.path);
      if (depth !== 1) {
        this.linkRef.style.display = `none`;
        const shape = this.drawing.drawRectPath(startPoint, endPoint);
        this.allPaths.push({
          shape,
          elem: node,
          startPoint,
          endPoint,
          isMainPath: false,
        });
      } else {
        const text = node.path;
        const size = this.drawing.measureText(text);
        const x = lerp(0, this.canvas.width, 0.5) + size.width;
        const y = lerp(0, this.canvas.height, 0.5);
        this.linkRef.style.display = `inline`;
        this.linkRef.style.left = `${x + 8}px`;
        this.linkRef.style.top = `${y - 14}px`;
      }
      return;
    }

    if (node.isTop) {
      const shape = this.drawing.drawRectPath(startPoint, endPoint);
      this.firstLevelPaths.push({
        shape,
        elem: node,
        startPoint,
        endPoint,
        isMainPath: true,
      });
    }

    const parts: Node[] = partition(node)!;

    const ratio = this.calculatePartsRatio(parts);

    let firstEnd: Point2, secondStart: Point2;
    if (endPoint.x - startPoint.x > endPoint.y - startPoint.y) {
      const divPointX = lerp(startPoint.x, endPoint.x, ratio);
      firstEnd = new Point2(divPointX, endPoint.y);
      secondStart = new Point2(divPointX, startPoint.y);
    } else {
      const divPointY = lerp(startPoint.y, endPoint.y, ratio);
      firstEnd = new Point2(endPoint.x, divPointY);
      secondStart = new Point2(startPoint.x, divPointY);
    }
    this.drawing.drawLine(firstEnd, secondStart);

    // add main paths on first level
    if (depth === 1) {
      if (!parts[0].isLeaf) {
        const first = this.drawing.drawRectPath(startPoint, firstEnd);
        this.subdivPaths.push({
          shape: first,
          elem: parts[0],
          startPoint,
          endPoint: firstEnd,
          isMainPath: true,
        });
      }
      if (!parts[1].isLeaf) {
        const second = this.drawing.drawRectPath(secondStart, endPoint);
        this.subdivPaths.push({
          shape: second,
          elem: parts[1],
          startPoint: secondStart,
          endPoint,
          isMainPath: true,
        });
      }
    }

    const color = `rgba(0, 0, 63, ${0.15 / depth})`;
    this.drawing.fillArea(startPoint, firstEnd, color);
    this.drawing.fillArea(secondStart, endPoint, color);

    this.drawSegment(parts[0], startPoint, firstEnd, depth);
    this.drawSegment(parts[1], secondStart, endPoint, depth);
  }

  private calculatePartsRatio(parts: Node[]) {
    console.assert(parts.length === 2);
    const ratio = parts[0].size / (parts[0].size + parts[1].size);
    if (ratio > 0.9) return 0.9;
    if (ratio < 0.1) return 0.1;
    return ratio;
  }

  private findPathOver({ x, y }: Point2, paths: Path[]): Path | null {
    const ctx = this.canvas.getContext("2d")!;
    const pp = (path: Path) => ctx.isPointInPath(path.shape, x, y);
    return paths.find(pp) || null;
  }
}
