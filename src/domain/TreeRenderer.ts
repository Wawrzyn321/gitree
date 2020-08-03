import { partition, Bucket } from './fileTree';
import { Selection } from './selection';
import { lerp } from './util';
import { Path } from '../types/Path';
//crash na console/app statuses

export class TreeRenderer {
    private canvas: HTMLCanvasElement;
    private selection: Selection;
    private ctx: CanvasRenderingContext2D;

    private paths: Path[] = [];
    private mainPaths: Path[] = [];
    private currentPath: Path | null = null;

    private readonly minTextSize = 16;
    private readonly textMargin = 1.2;
    private readonly maxTextScale = 2;
    private readonly rotationClamp = 1.3;

    constructor(canvas: HTMLCanvasElement, selection: SVGRectElement, selectionTitle: SVGTextElement) {
        this.canvas = canvas;
        this.selection = new Selection(selection, selectionTitle);
        this.ctx = this.canvas.getContext('2d')!;
        this.ctx.font = '10px Arial';
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
    }

    private mouseMove = (e: MouseEvent) => {
        const paths = e.shiftKey ? this.mainPaths : this.paths;
        const pathOver = this.findPathOver(e, paths);
        if (this.currentPath !== pathOver) {
            this.currentPath = pathOver;
            if (pathOver === null) return;
            
            this.selection.show(pathOver);
        }
    }

    private click = () => {
        if (this.currentPath === null) return;

        this.canvas.removeEventListener("mousemove", this.mouseMove);
        this.canvas.removeEventListener("click", this.click);
        this.canvas.removeEventListener("mouseleave", this.mouseLeave);
        
        if (this.currentPath.isMainPath) {
            this.draw(this.currentPath.elem.elements);
        } else {
            this.displaySingleFile(this.currentPath.elem.__path__);
        }
    }

    private mouseLeave = () => {
        this.selection.hide();
    }

    draw(tree: any) {
        this.selection.hide();
        while (Object.keys(tree).length === 1) {
            tree = tree[Object.keys(tree)[0]];
        }
        
        if (tree.__path__) {
            this.displaySingleFile(tree.__path__);
        } else {
            this.paths = [];
            this.mainPaths = [];
            const part: Bucket[] | null = partition(tree, (s: Bucket) => s.__size__);
            if (!part) {
                alert('tylko 0/1 plik?');
                return;
            }
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.drawPartition(part, [0, 0], [this.canvas.width, this.canvas.height], 0);
            this.canvas.addEventListener("mousemove", this.mouseMove);
            this.canvas.addEventListener("click", this.click);
            this.canvas.addEventListener("mouseleave", this.mouseLeave);
        }
    }

    private displaySingleFile(name: string) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawName([0,0], [this.canvas.width, this.canvas.height], name);
    }

    private line(from: number[], to: number[]) {
        this.ctx.beginPath();
        this.ctx.moveTo(from[0], from[1]);
        this.ctx.lineTo(to[0], to[1]);
        this.ctx.stroke();
    }

    private drawName(start: number[], end: number[], name: string) {
        const boxWidth = end[0] - start[0];
        const boxHeight = end[1] - start[1];
        if (boxWidth < this.minTextSize || boxHeight < this.minTextSize) {
            return;
        }

        const width = this.ctx.measureText(name).width * this.textMargin;

        let rotation = 0;
        let scale = 1;
        if (boxWidth < width) {
            if (boxHeight < width) {
                const diagonalWidth = Math.sqrt(boxWidth * boxWidth + boxHeight * boxHeight);
                if (diagonalWidth < width) {
                    return;
                }
                scale = Math.min(diagonalWidth / width, this.maxTextScale);
            }
            else {
                scale = Math.min(boxHeight / width, this.maxTextScale);
            }
            rotation = Math.atan2(boxHeight, boxWidth);
            if (rotation > this.rotationClamp) { 
                rotation = Math.PI / 2;
            }
        }
        else {
            scale = Math.min(boxWidth / width, this.maxTextScale);
        }
        const x = lerp(start[0], end[0], 0.5);
        const y = lerp(start[1], end[1], 0.5);

        this.ctx.save();

        this.ctx.fillStyle = 'black';
        this.ctx.translate(x, y);
        this.ctx.rotate(rotation);
        this.ctx.scale(scale, scale);
        this.ctx.fillText(name, 0, 0);

        this.ctx.restore();
    }

    private drawPath(start: number[], end: number[], elem: any, paths: Path[], isMainPath: boolean) {
        const shape = new Path2D();
        this.ctx.beginPath();
        this.ctx.fillStyle = 'transparent';
        shape.rect(start[0], start[1], end[0] - start[0], end[1] - start[1]);
        this.ctx.fill(shape);
        paths.push({
            shape,
            elem,
            start,
            end,
            isMainPath,
        });
    }

    private drawPartition(arr: Bucket[], startPoint: number[], endPoint: number[], depth: number) {
        depth++;

        const tryDoPartition = (obj: Bucket, start: number[], end: number[]) => {
            // paths nie jest przekazywane!
            let elements = obj.elements;
            while (Object.keys(elements).length === 1) {
                elements = elements[Object.keys(elements)[0]];
            }
            if (Object.keys(elements).length > 1) {
                const part = partition(elements, (s: Bucket) => s.__size__);
                if (!part) {
                    this.drawName(start, end, elements.__path__);
                    this.drawPath(start, end, elements, this.paths, false);
                }
                else {
                    this.drawPartition(part, start, end, depth);
                }
            }
        };

        const ratio = arr[0].__size__ / (arr[0].__size__ + arr[1].__size__);

        let firstEnd, secondStart;
        if (endPoint[0] - startPoint[0] > endPoint[1] - startPoint[1]) {
            const divPointX = lerp(endPoint[0], startPoint[0], ratio);
            firstEnd = [divPointX, endPoint[1]];
            secondStart = [divPointX, startPoint[1]];
        } else {
            const divPointY = lerp(endPoint[1], startPoint[1], ratio);
            firstEnd = [endPoint[0], divPointY];
            secondStart = [startPoint[0], divPointY];
        }
        this.line(firstEnd, secondStart);

        // add main paths on first level
        if (depth === 1) {
            this.drawPath(startPoint, firstEnd, arr[0], this.mainPaths, true);
            this.drawPath(secondStart, endPoint, arr[1], this.mainPaths, true);
        }

        this.ctx.fillStyle = `rgba(0, 0, 0, ${0.15 / depth})`;
        this.ctx.fillRect(startPoint[0], startPoint[1], firstEnd[0] - startPoint[0], firstEnd[1] - startPoint[1])
        this.ctx.fillRect(secondStart[0], secondStart[1], endPoint[0] - secondStart[0], endPoint[1] - secondStart[1])

        tryDoPartition(arr[0], startPoint, firstEnd);
        tryDoPartition(arr[1], secondStart, endPoint);
    };

    private findPathOver(e: MouseEvent, paths: Path[]) {
        for (const path of paths) {
            if (this.ctx.isPointInPath(path.shape, e.offsetX, e.offsetY)) {
                return path;
            }
        }
        return null;
    }

}