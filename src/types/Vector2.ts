export class Vector2 {
  static get zero(): Vector2 {
    return new Vector2(0, 0);
  }

  get length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  constructor(
    public x: number,
    public y: number,
  ) {}

  add(other: Vector2): Vector2 {
    return new Vector2(this.x + other.x, this.y + other.y);
  }

  sub(other: Vector2): Vector2 {
    return new Vector2(this.x - other.x, this.y - other.y);
  }

  mul(val: number) {
    return new Vector2(this.x * val, this.y * val);
  }

  lerp(other: Vector2, amount: number): Vector2 {
    return this.add(other.sub(this).mul(amount));
  }
}
