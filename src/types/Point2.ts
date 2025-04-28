export class Point2 {
  static get zero(): Point2 {
    return new Point2(0, 0);
  }

  get length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  constructor(
    public x: number,
    public y: number,
  ) {}

  add(other: Point2): Point2 {
    return new Point2(this.x + other.x, this.y + other.y);
  }

  sub(other: Point2): Point2 {
    return new Point2(this.x - other.x, this.y - other.y);
  }

  multiply(val: number) {
    return new Point2(this.x * val, this.y * val);
  }

  interpolate(other: Point2, amount: number): Point2 {
    return this.add(other.sub(this).multiply(amount));
  }
}
