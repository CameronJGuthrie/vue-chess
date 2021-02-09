import Board from "./Board";
import ICopiable from "./ICopiable";
import Piece from "./Pieces";

export default class Tile implements ICopiable {
  #isWhite: boolean;
  #x: number;
  #y: number;
  piece?: Piece;

  constructor(x: number, y: number, piece?: Piece) {
    this.#isWhite = ((x % 2) === (y % 2));
    this.#x = x;
    this.#y = y;
    this.piece = piece;
  }
  get isWhite() {
    return this.#isWhite;
  }
  get x() {
    return this.#x;
  }
  get y() {
    return this.#x;
  }
  copy(newBoard: Board) {
    return (this.piece === undefined) ?
      new Tile(this.#x, this.#y):
      new Tile(this.#x, this.#y, this.piece.copy(newBoard));
  }
}