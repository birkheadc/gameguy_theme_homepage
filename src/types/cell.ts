import { CellSprite } from "./cellSprite";
import { IVector2 } from "./vectory2";

export interface ICell {
  position: IVector2,
  isTraversable: boolean,
  sprite: CellSprite | undefined,
  interactText: string | null
}