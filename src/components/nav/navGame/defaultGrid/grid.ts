import { ICell } from "../../../../types/cell";
import { IGrid } from "../../../../types/grid";
import { IVector2 } from "../../../../types/vectory2";
import getCells from "./cells";

const NUM_ROWS = 20;
const NUM_COLS = 15;

const gridSize = { x: NUM_ROWS, y: NUM_COLS};
const cells: ICell[] = getCells();
const playerStartCell = { x: 4, y: 5 };
const signs = getSigns();

const grid: IGrid = {
  gridSize,
  cells,
  playerStartCell,
  signs
}

function getSigns() {
  const signs: { text: string, position: IVector2 }[] = [];

  signs.push({
    text: "Colby's Home",
    position: { x: 4, y: 3 }
  });

  signs.push({
    text: "Projects",
    position: { x: 12, y: 5 }
  });

  return signs;
}

export default grid;