import Vector from "./Vector";

export function inside(x: number, y: number): boolean {
  return x >= 0 && x <= 7 && y >= 0 && y<= 7;
}

export function insideVector(v: Vector): boolean {
  return inside(v.x, v.y);
}