import { Vector2 } from "../types/Vector2";

export class Drawing {
    private readonly minTextSize = 16;
    private readonly textMargin = 1.2;
    private readonly maxTextScale = 2;
    private readonly rotationClamp = 1.3;

    constructor(private ctx: CanvasRenderingContext2D) {
        this.ctx.font = '10px Arial';
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
    }

    drawLine(from: Vector2, to: Vector2) {
        this.ctx.beginPath();
        this.ctx.moveTo(from.x, from.y);
        this.ctx.lineTo(to.x, to.y);
        this.ctx.stroke();
    }

    drawText(start: Vector2, end: Vector2, text: string) {
        const bounds = end.sub(start);
        if (bounds.x < this.minTextSize || bounds.y < this.minTextSize) {
            return;
        }

        const width = this.ctx.measureText(text).width * this.textMargin;
        let rotation = 0;
        let scale = 1;
        if (bounds.x < width) {
            if (bounds.y < width) {
                const diagonalWidth = bounds.length;
                if (diagonalWidth < width) {
                    return;
                }
                scale = Math.min(diagonalWidth / width, this.maxTextScale);
            }
            else {
                scale = Math.min(bounds.y / width, this.maxTextScale);
            }
            rotation = Math.atan2(bounds.y, bounds.x);
            if (rotation > this.rotationClamp) {
                rotation = Math.PI / 2;
            }
        }
        else {
            scale = Math.min(bounds.x / width, this.maxTextScale);
        }
        const pos = start.lerp(end, 0.5);

        this.ctx.save();

        this.ctx.fillStyle = 'black';
        this.ctx.translate(pos.x, pos.y);
        this.ctx.rotate(rotation);
        this.ctx.scale(scale, scale);
        this.ctx.fillText(text, 0, 0);
        this.ctx.restore();
    }

    drawRectPath(start: Vector2, end: Vector2): Path2D {
        const shape = new Path2D();

        this.ctx.beginPath();
        this.ctx.fillStyle = 'transparent';
        shape.rect(start.x, start.y, end.x - start.x, end.y - start.y);
        this.ctx.fill(shape);

        return shape;
    }

    fillArea(start: Vector2, end: Vector2, color: string) {
        const size = end.sub(start);

        this.ctx.fillStyle = color
        this.ctx.fillRect(start.x, start.y, size.x, size.y)
    }
}