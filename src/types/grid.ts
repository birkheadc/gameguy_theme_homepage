import { ICell } from "./cell";
import { IVector2 } from "./vectory2";

export interface IGrid {
  gridSize: IVector2,
  cells: ICell[],
  playerStartCell: IVector2,
  signs: {
    text: string,
    position: IVector2
  }[]
}