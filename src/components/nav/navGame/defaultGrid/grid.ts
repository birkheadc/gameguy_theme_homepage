import { IDoor } from "../../../../types/door";
import { IGrid } from "../../../../types/grid";
import cells from "./cells";

const gridSize = { x: 20, y: 15 };

const doors: IDoor[] = [
  {
    position: { x: 7, y: 6 },
    location: '/welcome',
    name: 'home'
  },
  {
    position: { x: 13, y: 6 },
    location: '/projects',
    name: 'projects'
  },
  {
    position: { x: 3, y: 12 },
    location: '/about',
    name: 'about'
  },
  {
    position: { x : 13, y: 11 },
    location: '/contact',
    name: 'contact'
  }
];

const grid: IGrid = {
  gridSize,
  cells,
  doors,
  defaultCell: { x: 1, y: 1}
}

export default grid;