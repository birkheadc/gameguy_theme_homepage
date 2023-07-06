import { ICell } from "../../../../types/cell";
import { CellSprite } from "../../../../types/cellSprite";
import { IVector2 } from "../../../../types/vectory2";
import cellSprites from "../cellSprites";

const NUM_ROWS = 20;
const NUM_COLS = 15;

const getCells = (): ICell[] => {
  const cells: ICell[] = [];

  for (let x = 0; x < NUM_ROWS; x++) {
    for (let y = 0; y < NUM_COLS; y++) {
      const isBorder: boolean = ((x === 0) || (y === 0) || (x === NUM_ROWS - 1) || (y === NUM_COLS - 1));
      if (isBorder === true) {
        cells.push(getTreeCell({ x, y }));
      } else {
        cells.push(getGroundCell({ x, y }));
      }
    }
  }

  return cells;
}

function getTreeCell(position: IVector2): ICell {
  const cell: ICell = {
    position,
    isTraversable: false,
    sprite: CellSprite.TREE,
    interactText: 'Just an ordinary bush. Great for keeping nosy adventurers on the right path.'
  };
  return cell;
}

function getGroundCell(position: IVector2): ICell {
  const cell: ICell = {
    position,
    isTraversable: true,
    sprite: undefined,
    interactText: null
  };
  return cell;
}

export default getCells;