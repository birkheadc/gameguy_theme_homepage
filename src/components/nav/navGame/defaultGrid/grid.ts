import { ICell } from "../../../../types/cell";
import { IGrid } from "../../../../types/grid";
import getCells from "./cells";

const NUM_ROWS = 20;
const NUM_COLS = 15;

const cellSize = { x: 64, y: 64 };
const gridSize = { x: NUM_ROWS, y: NUM_COLS};
const cells: ICell[] = getCells(cellSize);
const playerStartCell = { x: 0, y: 0 };

const grid: IGrid = {
  cellSize,
  gridSize,
  cells,
  playerStartCell,
}

export default grid;