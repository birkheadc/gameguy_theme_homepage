import { ICell } from "../../../../types/cell";
import { CellSprite } from "../../../../types/cellSprite";
import { IVector2 } from "../../../../types/vectory2";

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

  addHouse(cells, { x: 2, y: 2}, { x: 8, y: 5 });
  addDoor(cells, { x: 4, y: 5}, '/', 'This leads to the welcome page.');

  addHouse(cells, { x: 10, y: 3}, { x: 16, y: 7});
  addDoor(cells, { x: 12, y: 7}, '/projects', "This leads to Colby's projects portfolio. Lots of cool stuff inside!");

  return cells;
}

function getTreeCell(position: IVector2): ICell {
  const cell: ICell = {
    position,
    isTraversable: false,
    sprite: CellSprite.TREE,
    interactText: 'Just an ordinary bush. Great for keeping nosy adventurers on the right path.',
    navigate: null
  };
  return cell;
}

function getGroundCell(position: IVector2): ICell {

  let random = Math.random();
  let sprite = undefined;
  if (random < 0.1) {
    random = Math.floor((Math.random() * 3));
    sprite = [ CellSprite.GROUND_A, CellSprite.GROUND_B, CellSprite.GROUND_C ][random];
  }
  
  const cell: ICell = {
    position,
    isTraversable: true,
    sprite: sprite,
    interactText: null,
    navigate: null
  };
  return cell;
}

function addHouse(cells: ICell[], topLeft: IVector2, bottomRight: IVector2) {  
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    if (cell.position.x < topLeft.x || cell.position.x > bottomRight.x || cell.position.y < topLeft.y || cell.position.y > bottomRight.y) continue;
    cell.isTraversable = false;
    if (cell.position.y === topLeft.y) {
      if (cell.position.x === topLeft.x) {
        cell.sprite = CellSprite.HOUSE_TL
      } else if (cell.position.x === bottomRight.x) {
        cell.sprite = CellSprite.HOUSE_TR;
      } else {
        cell.sprite = CellSprite.HOUSE_TC;
      }
    } else if (cell.position.y === bottomRight.y) {
      if (cell.position.x === topLeft.x) {
        cell.sprite = CellSprite.HOUSE_BL
      } else if (cell.position.x === bottomRight.x) {
        cell.sprite = CellSprite.HOUSE_BR;
      } else {
        cell.sprite = CellSprite.HOUSE_BC;
      }
    } else {
      if (cell.position.x === topLeft.x) {
        cell.sprite = CellSprite.HOUSE_ML
      } else if (cell.position.x === bottomRight.x) {
        cell.sprite = CellSprite.HOUSE_MR;
      } else {
        cell.sprite = CellSprite.HOUSE_MC;
      }
    }
  }
}

function addDoor(cells: ICell[], position: IVector2, navigate: string, interactText: string) {
  const cell = cells.find(c => c.position.x === position.x && c.position.y === position.y);
  if (cell == null) return;
  cell.isTraversable = true;
  cell.navigate = navigate;
  cell.sprite = CellSprite.HOUSE_DOOR;
  cell.interactText = interactText;
}

export default getCells;