import Board from "./Board";
import { Type } from "./Pieces";

const funcs: {(board:Board):number}[] = [evalByPieceValue];
export default funcs;

// Evaluation functions will give a larger number for white advantage, and a smaller number for black advantage

function evalByPieceValue(board: Board) : number {
  let values = new Map<Type, number>([
    [Type.QUEEN, 20],
    [Type.KING, 0],
    [Type.ROOK, 5],
    [Type.BISHOP, 4],
    [Type.KNIGHT, 3],
    [Type.PAWN, 2]
  ]);
  let total = 0;
  
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      let piece =  board.get(x, y)?.piece;
      if (piece !== undefined) {
        let value = values.get(piece.type) as number; // this will never be undefined
        total = (piece.isWhite) ? total + value : total - value;
      }
    }
  }

  return total;
}

