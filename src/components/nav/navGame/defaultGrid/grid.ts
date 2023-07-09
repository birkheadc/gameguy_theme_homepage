import { ICell } from "../../../../types/cell";
import { IDoor } from "../../../../types/door";
import { IGrid } from "../../../../types/grid";
import { ISign } from "../../../../types/sign";

const gridSize = { x: 20, y: 15 };

const cells: ICell[] = (function generateCells(): ICell[] {
  const cells: ICell[] = [];
  for (let x = 0; x < gridSize.x; x++) {
    for (let y = 0; y < gridSize.y; y++) {
      cells.push({
        position: { x, y },
        isTraversable: true,
        interactText: null,
      })
    }
  }
  return cells;
})();

const signs: ISign[] = [];
const doors: IDoor[] = [];

const grid: IGrid = {
  gridSize,
  cells,
  signs,
  doors
}

export default grid;