import { inside } from "./ChessUtils";
import ICopiable from "./ICopiable";
import { Bishop, King, Knight, Pawn, Queen, Rook } from "./Pieces";
import Tile from "./Tile";

export default class Board implements ICopiable {
  #tiles: Tile[][] = [];

  constructor() {
    for (let x = 0; x < 8; x++) {
      this.#tiles[x] = [];
      for (let y = 0; y < 8; y++) {
        this.#tiles[x][y] = new Tile(x, y);
      }
    }
  }
  copy(oldBoard: Board) {
    let newBoard = new Board();

    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        this.#tiles[x][y] = oldBoard.#tiles[x][y].copy(this);
      }
    }

    return newBoard;
  }
  get(x: number, y: number): Tile {
    if (inside(x, y)) {
      throw new Error(`get() function failed with x:${x} and y:${y}`);
    }
    return this.#tiles[x][y];
  }
  reset() {
    for (let x = 0; x < 8; x++) {
      this.#tiles[x][1].piece = new Pawn(true, x, 1, this);
      this.#tiles[x][6].piece = new Pawn(false, x, 6, this);
      if (x == 0 || x == 7) {
        this.#tiles[x][0].piece = new Rook(true, x, 0, this);
        this.#tiles[x][7].piece = new Rook(false, x, 7, this);
      } else if (x == 1 || x == 6) {
        this.#tiles[x][0].piece = new Knight(true, x, 0, this);
        this.#tiles[x][7].piece = new Knight(false, x, 7, this);
      } else if (x == 2 || x == 5) {
        this.#tiles[x][0].piece = new Bishop(true, x, 0, this);
        this.#tiles[x][7].piece = new Bishop(false, x, 7, this);
      } else if (x == 3) {
        this.#tiles[x][0].piece = new Queen(true, x, 0, this);
        this.#tiles[x][7].piece = new Queen(false, x, 7, this);
      } else if (x == 4) {
        this.#tiles[x][0].piece = new King(true, x, 0, this);
        this.#tiles[x][7].piece = new King(false, x, 7, this);
      }
    }
  }
}