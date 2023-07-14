import { IDoor } from "../../../../types/door";
import { IGrid } from "../../../../types/grid";
import cells from "./cells";

const gridSize = { x: 20, y: 15 };

const doors: IDoor[] = [
  {
    position: { x: 7, y: 6 },
    location: '/'
  },
  {
    position: { x: 13, y: 6 },
    location: '/projects'
  },
];

const grid: IGrid = {
  gridSize,
  cells,
  doors,
  defaultCell: { x: 1, y: 1}
}

export default grid;