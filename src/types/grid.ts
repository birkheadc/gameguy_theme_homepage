import { ICell } from "./cell";
import { IDoor } from "./door";
import { ISign } from "./sign";
import { IVector2 } from "./vectory2";

export interface IGrid {
  gridSize: IVector2,
  cells: ICell[],
  signs: ISign[],
  doors: IDoor[]
}