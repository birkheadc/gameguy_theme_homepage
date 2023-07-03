import { ICell } from "./cell";

export interface IGrid {
  cellSize: { x: number, y: number },
  gridSize: { x: number, y: number },
  cells: ICell[],
  playerStartCell: { x: number, y: number }
}