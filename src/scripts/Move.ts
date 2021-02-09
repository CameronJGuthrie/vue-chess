import ICopiable from "./ICopiable";
import Vector from "./Vector";

export default class Move implements ICopiable {
  // Private variables to prevent mutation
  #from: Vector;
  #to: Vector;

  constructor(from: Vector, to: Vector) {
    this.#from = from;
    this.#to = to;
  }

  get from(): Vector {
    return this.#from.copy();
  }

  get to(): Vector {
    return this.#to.copy();
  }

  copy(): Move {
    return new Move(this.#from.copy(), this.#to.copy());
  }
}