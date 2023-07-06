import { ICell } from "../../../../types/cell";
import { CellSprite } from "../../../../types/cellSprite";

const NUM_ROWS = 20;
const NUM_COLS = 15;

const getCells = (): ICell[] => {
  const cells: ICell[] = [];

  for (let x = 0; x < NUM_ROWS; x++) {
    for (let y = 0; y < NUM_COLS; y++) {
      const isTraversable: boolean = !((x === 0) || (y === 0) || (x === NUM_ROWS - 1) || (y === NUM_COLS - 1));
      const cell: ICell = {
        position: { x, y },
        isTraversable,
        sprite: isTraversable ? undefined : CellSprite.TREE
      }
      cells.push(cell);
    }
  }

  return cells;
}

export default getCells;