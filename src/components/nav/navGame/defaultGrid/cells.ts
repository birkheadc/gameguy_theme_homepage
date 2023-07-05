import { ICell } from "../../../../types/cell";

const NUM_ROWS = 20;
const NUM_COLS = 15;

const getCells = (): ICell[] => {
  const cells: ICell[] = [];

  for (let x = 0; x < NUM_ROWS; x++) {
    for (let y = 0; y < NUM_COLS; y++) {
      const cell: ICell = {
        position: { x, y },
        isTraversable: true
      }
      cells.push(cell);
    }
  }

  return cells;
}

export default getCells;