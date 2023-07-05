import { ICell } from "../../../../types/cell";
import { IGrid } from "../../../../types/grid";
import getCells from "./cells";

const NUM_ROWS = 20;
const NUM_COLS = 15;

const gridSize = { x: NUM_ROWS, y: NUM_COLS};
const cells: ICell[] = getCells();
const playerStartCell = { x: 1, y: 1 };

const grid: IGrid = {
  gridSize,
  cells,
  playerStartCell,
}

export default grid;