import Board from "./Board";
import ICopiable from "./ICopiable";
import Move from "./Move";
import Piece, { Type as PieceType } from "./Pieces";
import Vector from "./Vector";

export default class Game {
  currentInstance: Chess;

  constructor(evaluationFunction: (board: Board) => number) {
    this.currentInstance = new Chess(evaluationFunction);
  }
  
  doAITurn() {
    // let moves = this.currentInstance.getMoves();
    // Decide what to do
    // Do it
    this.currentInstance.whiteTurn = !this.currentInstance.whiteTurn;
  }
  
  endPlayerTurn() {
    this.currentInstance.whiteTurn = !this.currentInstance.whiteTurn;
  }
}

class Chess implements ICopiable {
  board: Board;
  whiteTurn: boolean;
  evaluationFunction: (board: Board) => number;

  constructor(evaluationFunction: (board: Board) => number) {
    this.board = new Board();
    this.whiteTurn = true;
    this.evaluationFunction = evaluationFunction;
  }

  copy() {
    let newChess = new Chess(this.evaluationFunction);
      newChess.board = this.board.copy(newChess.board);
      newChess.whiteTurn = this.whiteTurn;

    return newChess;
  }

  doMove(move: Move) {
    let tileFrom = this.board.get(move.from.x, move.from.y);
    let tileTo = this.board.get(move.to.x, move.to.y);

    if (!(tileTo && tileFrom)) {
      console.error();
    } else {
      tileTo.piece = tileFrom.piece;
      tileFrom.piece = undefined;
    }
  }

  getMoves(): Move[] {
    let pieces = this.getPieces(this.whiteTurn);
    let final: Move[] = [];

    pieces.forEach((p: Piece) => {
      final.push(...p.move().filter((m: Move) => this.moveIsLegal(m)))
    });

    return final;
  }

  evaluate(chessInstance : Chess): number {
    return this.evaluationFunction(chessInstance.board);
  }

  moveIsLegal(move: Move): boolean {
    let testBoard = this.copy();

    testBoard.doMove(move);

    return testBoard.isKingInCheck();
  }

  isKingInCheck() {
    let pieces: Piece[] = this.getPieces(this.whiteTurn);
    let king: Piece = pieces.filter((p: Piece) => p.type === PieceType.KING)[0];
    let danger: Vector[] = this.getBadTiles();
    let flag: boolean = danger.every((d: Vector) => !(king.x === d.x && king.y === d.y));

    return flag;
  }

  getPieces(white: boolean): Piece[] {
    let pieces: Piece[] = [];
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        let piece = this.board.get(x,y)?.piece;
        if (piece !== undefined) {
          if (piece.isWhite === white) {
            pieces.push(piece);
          }        
        }
      }
    }
    return pieces;
  }

  // gets tiles considered dangerous to the player whose turn it is currently
  getBadTiles(): Vector[] {
    let dangerous: boolean[][] = [];
    let badTiles: Vector[] = [];
    let enemyPieces = this.getPieces(!this.whiteTurn);
    
    for (let x = 0; x < 8; x++) {
      dangerous[x] = [];
      for (let y = 0; y < 8; y++) {
        dangerous[x][y] = false;
      }
    }
    
    // Set flag to true for all squares that are 'dangerous' to the player whose turn it is currently
    enemyPieces.forEach((p) => {
      p.attack().forEach((a) => {
        let x = a.x;
        let y = a.y;
        if (!dangerous[x][y]) {
          dangerous[x][y] = true;
          badTiles.push(new Vector(x, y));
        }
      })
    })

    return badTiles;
  }
}