import { Colors } from "../hooks/useColors";
import { Vector2 } from "../types/Vector2";

export class Drawing {
  private readonly minTextSize = 16;
  private readonly textMargin = 1.2;
  private readonly maxTextScale = 2;
  private readonly rotationClamp = 1.3;
  private readonly hasDarkTheme: boolean;
  private readonly colors: Colors;

  constructor(
    private ctx: CanvasRenderingContext2D,
    useDarkTheme: boolean,
    colors: Colors,
  ) {
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.hasDarkTheme = useDarkTheme;
    this.colors = colors;
  }

  drawLine(from: Vector2, to: Vector2): void {
    this.ctx.beginPath();
    this.ctx.moveTo(from.x, from.y);
    this.ctx.lineTo(to.x, to.y);
    this.ctx.stroke();
  }

  measureText(text: string): TextMetrics {
    return this.ctx.measureText(text);
  }

  drawSelectionText(start: Vector2, end: Vector2, text: string) {
    this.fitText(start, end, text, "40px Arial", "white", 1);
  }

  drawNodeText(start: Vector2, end: Vector2, text: string): void {
    const color = this.hasDarkTheme ? "#FFFD" : "black";
    this.fitText(start, end, text, "10px Arial", color, this.maxTextScale);
  }

  drawRectPath(start: Vector2, end: Vector2): Path2D {
    const shape = new Path2D();

    this.ctx.beginPath();
    this.ctx.fillStyle = "transparent";
    shape.rect(start.x, start.y, end.x - start.x, end.y - start.y);
    this.ctx.fill(shape);

    return shape;
  }

  drawOutline(start: Vector2, end: Vector2) {
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 5;
    const size = end.sub(start);
    this.ctx.strokeRect(start.x, start.y, size.x, size.y);
  }

  fillArea(start: Vector2, end: Vector2, color: string): void {
    const size = end.sub(start);

    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = this.hasDarkTheme ? this.colors.actionDark : "black";
    this.ctx.fillRect(start.x, start.y, size.x, size.y);
  }

  clear() {
    const canvas = this.ctx.canvas;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  private fitText(
    start: Vector2,
    end: Vector2,
    text: string,
    font: string,
    color: string,
    maxScale: number,
  ) {
    this.ctx.font = font;
    const bounds = end.sub(start);
    if (bounds.x < this.minTextSize || bounds.y < this.minTextSize) {
      return;
    }

    const width = this.measureText(text).width * this.textMargin;
    let rotation = 0;
    let scale = 1;
    if (bounds.x < width) {
      if (bounds.y < width) {
        const diagonalWidth = bounds.length;
        if (diagonalWidth < width) {
          return;
        }
        scale = Math.min(diagonalWidth / width, maxScale);
      } else {
        scale = Math.min(bounds.y / width, maxScale);
      }
      rotation = Math.atan2(bounds.y, bounds.x);
      if (rotation > this.rotationClamp) {
        rotation = Math.PI / 2;
      }
    } else {
      scale = Math.min(bounds.x / width, maxScale);
    }
    const pos = start.lerp(end, 0.5);

    this.ctx.save();

    this.ctx.fillStyle = color;
    this.ctx.translate(pos.x, pos.y);
    this.ctx.rotate(rotation);
    this.ctx.scale(scale, scale);
    this.ctx.fillText(text, 0, 0);
    this.ctx.restore();
  }
}
