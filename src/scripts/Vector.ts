import ICopiable from "./ICopiable";


/* exported Vector */
export default class Vector implements ICopiable {
  // Private variables to prevent mutation
  #x: number;
  #y: number;

  constructor(x: number, y: number) {
    this.#x = x;
    this.#y = y;
  }

  get x(): number {
    return this.#x;
  }
 
  get y(): number {
    return this.#y;
  }

  copy(): Vector {
    return new Vector(this.#x, this.#y);
  }

  equals(other: Vector): boolean {
    return (this.#x === other.#x && this.#y === other.#y);
  }

  add(x1: number, y1: number, x2: number, y2: number): Vector {
    return new Vector(x1 + x2, y1 + y2);
  }

  addVector(v1: Vector, v2: Vector): Vector {
    return new Vector(v1.#x + v2.#x, v1.#y + v2.#y);
  }
}