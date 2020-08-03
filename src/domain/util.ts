export function lerp(from: number, to: number, amount: number): number {
  return from + (to - from) * amount;
}
