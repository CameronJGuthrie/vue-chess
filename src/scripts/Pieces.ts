import Board from "./Board";
import { inside, insideVector } from "./ChessUtils";
import ICopiable from "./ICopiable";
import Move from "./Move";
import Vector from "./Vector";

export default abstract class Piece implements ICopiable {
  type: Type;
  isWhite: boolean;
  x: number;
  y: number;
  board: Board;

  abstract attack(): Vector[];              // Positions this unit could attack
  abstract move(): Move[];                  // Positions this unit can move (to and from)
  abstract copy(newBoard: Board): Piece;  

  constructor(type: Type, isWhite: boolean, x: number, y: number, board: Board, deltas?: {dx: number, dy: number}[]) {
    this.type = type;
    this.isWhite = isWhite,
    this.x = x;
    this.y = y;
    this.board = board;
  }

  movify(v: Vector): Move {
    return new Move(new Vector(this.x, this.y), v.copy());
  }
  movifyAll(vectors: Vector[]): Move[] {
    let moves: Move[] = [];
    vectors.forEach(v => moves.push(this.movify(v)));
    return moves;
  }
}

abstract class SlidingPiece extends Piece {
  directions: {dx:number, dy: number}[]

  constructor(type: Type, isWhite: boolean, x: number, y: number, board: Board, directions: {dx: number, dy: number}[]) {
    super(type, isWhite, x, y, board);
    this.directions = directions;
  }

  // Walk in a direction until you bump into something
  walk(includeAllyCollisions: boolean): Move[] | Vector[] {
    let x = this.x;
    let y = this.y;
    let tileLocations: Vector[] = [];
    let moves: Move[] = [];
    let bonked;

    if (this.directions === undefined) {
      throw new Error(`walk() called on piece with no implementation`);
    }

    this.directions.forEach((d) => {
      let dx = d.dx;  let dy = d.dy;  
      bonked = false; // set true when bumping into things 🚕🚐🚗🛵🛺
      while (inside(x + dx, y + dy) && !bonked) {
        x += dx;  y += dy;   
        let p = this.board.get(x,y).piece;
        if (p) { // Collision
          bonked = true; // Set 'bonked' flag
          if (includeAllyCollisions) {
            // Only add if the other piece is of the other colour
            if (p.isWhite !== this.isWhite) {
              tileLocations.push(new Vector(x, y));
            }
          } else {
            tileLocations.push(new Vector(x, y));
          }
        } else { // No collision
          tileLocations.push(new Vector(x, y));
        }
      }
    });
    
    if (includeAllyCollisions) { 
      // Return Vector[]
      return tileLocations;
    } else { 
      // Convert to Move[], Return Move[]
      moves = this.movifyAll(tileLocations);
      return moves;
    }
  }
  attack(): Vector[] {
    return this.walk(true) as Vector[];
  }
  move(): Move[] {
    return this.walk(false) as Move[];
  }
}

// ✔
export class King extends Piece {
  constructor(isWhite: boolean, x: number, y: number, board: Board) {
    super(Type.KING, isWhite, x, y, board);
  }
  attack(): Vector[] {
    let attacked: Vector[] = [
      new Vector(this.x - 1, this.y + 1), new Vector(this.x, this.y + 1), new Vector(this.x + 1, this.y + 1),
      new Vector(this.x - 1,   this.y  ),                                 new Vector(this.x + 1,   this.y  ),
      new Vector(this.x - 1, this.y - 1), new Vector(this.x, this.y - 1), new Vector(this.x + 1, this.y - 1)
    ];
    return attacked.filter((v) => insideVector(v));
  }
  move(): Move[] {
    let moving: Vector[] = [
      new Vector(this.x - 1, this.y + 1), new Vector(this.x, this.y + 1), new Vector(this.x + 1, this.y + 1),
      new Vector(this.x - 1,   this.y  ),                                 new Vector(this.x + 1,   this.y  ),
      new Vector(this.x - 1, this.y - 1), new Vector(this.x, this.y - 1), new Vector(this.x + 1, this.y - 1)
    ];
    
    return this.movifyAll(
      moving.filter((v: Vector) => {
        if (insideVector(v)) {
          let piece = this.board.get(v.x, v.y).piece;
          if ((piece && (piece.isWhite !== this.isWhite)) || !piece) {
            return true;
          }
        }
        return false;
      })
    );
  }
  copy(newBoard: Board): King {
    return new King(this.isWhite, this.x, this.y, newBoard);
  }
}

// ✔
export class Queen extends SlidingPiece {
  constructor(isWhite: boolean, x: number, y: number, board: Board) {
    super(Type.QUEEN, isWhite, x, y, board, [
      {dx:-1, dy: 1}, {dx: 0, dy: 1}, {dx: 1, dy: 1}, 
      {dx:-1, dy: 0},                 {dx: 1, dy: 0}, 
      {dx:-1, dy:-1}, {dx: 0, dy:-1}, {dx: 1, dy:-1}
    ]);
  }
  copy(newBoard: Board): Queen {
    return new Queen(this.isWhite, this.x, this.y, newBoard);
  }
}

// ✔
export class Rook extends SlidingPiece {
  constructor(isWhite: boolean, x: number, y: number, board: Board) {
    super(Type.ROOK, isWhite, x, y, board, [
                  {dx: 0, dy: 1}, 
    {dx: -1, dy: 0},            {dx: 1, dy: 0}, 
                  {dx: 0, dy:-1}
    ]);
  }
  copy(newBoard: Board): Rook {
    return new Rook(this.isWhite, this.x, this.y, newBoard);
  }
}

// ✔
export class Knight extends Piece {
  constructor(isWhite: boolean, x: number, y: number, board: Board) {
    super(Type.KNIGHT, isWhite, x, y, board);
  }
  attack(): Vector[] {
    let attacked: Vector[] = [
      new Vector(this.x + 2, this.y + 1),
      new Vector(this.x + 2, this.y - 1),
      new Vector(this.x - 2, this.y + 1),
      new Vector(this.x - 2, this.y - 1),
      new Vector(this.x + 1, this.y + 2),
      new Vector(this.x - 1, this.y + 2),
      new Vector(this.x + 1, this.y - 2),
      new Vector(this.x - 1, this.y - 2),
    ];
    
    return attacked.filter((v) => insideVector(v));
  }
  copy(newBoard: Board): Knight {
    return new Knight(this.isWhite, this.x, this.y, newBoard);
  }
  move(): Move[] {
    let moving: Vector[] = [
      new Vector(this.x + 2, this.y + 1),
      new Vector(this.x + 2, this.y - 1),
      new Vector(this.x - 2, this.y + 1),
      new Vector(this.x - 2, this.y - 1),
      new Vector(this.x + 1, this.y + 2),
      new Vector(this.x - 1, this.y + 2),
      new Vector(this.x + 1, this.y - 2),
      new Vector(this.x - 1, this.y - 2),
    ];

    return this.movifyAll(
      moving.filter((v) => {
        if (insideVector(v)) {
          let piece = this.board.get(v.x, v.y).piece
          if ((piece && piece.isWhite !== this.isWhite) || !piece) {
            return true;
          }
        }
        return false;
      })
    );
  }
}

// ✔
export class Bishop extends SlidingPiece {
  constructor(isWhite: boolean, x: number, y: number, board: Board) {
    super(Type.BISHOP, isWhite, x, y, board,[
      {dx:-1, dy: 1},{dx: 1, dy: 1},
      {dx:-1, dy:-1},{dx: 1, dy:-1},
    ]);
  }
  copy(newBoard: Board): Bishop {
    return new Bishop(this.isWhite, this.x, this.y, newBoard);
  }
}

// ✔
export class Pawn extends Piece {
  constructor(isWhite: boolean, x: number, y: number, board: Board) {
    super(Type.PAWN, isWhite, x, y, board);
  }
  attack(): Vector[] {
    let attacking: Vector[] = (this.isWhite) ? 
      [new Vector(this.x + 1, this.y + 1), new Vector(this.x - 1, this.y + 1)]:
      [new Vector(this.x + 1, this.y - 1), new Vector(this.x - 1, this.y - 1)];
    return attacking.filter(v => insideVector(v));
  }
  move(): Move[] {
    let proposed: Move[] = [];

    let addMove = (f: number) => {
      if (inside(this.x, this.y + f)) {
        if (!this.board.get(this.x, this.y + f).piece) {
          proposed.push(this.movify(new Vector(this.x, this.y + f)));
        }
      }
    } 

    addMove((this.isWhite) ? 1 : -1);
    // Check if the pawn has moved off its homerow yet
    if (this.x === ((this.isWhite) ? 1 : 6)) {
      addMove((this.isWhite) ? 2 : -2);
    }

    return proposed;
  }
  copy(newBoard: Board): Pawn {
    return new Pawn(this.isWhite, this.x, this.y, newBoard);
  }
}

export enum Type {
  KING,
  QUEEN,
  ROOK,
  BISHOP,
  KNIGHT,
  PAWN
}