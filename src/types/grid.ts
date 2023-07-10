import { ICell } from "./cell";
import { IDoor } from "./door";
import { IVector2 } from "./vectory2";

export interface IGrid {
  gridSize: IVector2,
  cells: ICell[][],
  doors: IDoor[]
}