import { ICell } from "../../../../types/cell";

const treeCell: ICell = {
  isTraversable: false,
  interactText: 'Just an ordinary bush. Useful for keeping nosy adventurers on the right path.'
};

const groundCell: ICell = {
  isTraversable: true,
  interactText: null
};

const hedgeCell: ICell = {
  isTraversable: false,
  interactText: 'Some hedges planted outside a building. Looks awfully like an ordinary bush.'
}

const blockedCell: ICell = {
  isTraversable: false,
  interactText: null
}

const doorCell: ICell = {
  isTraversable: true,
  interactText: null
}

const cells: ICell[][] = [
  getNCell(15, treeCell),
  [ treeCell, ...getNCell(13, groundCell), treeCell],
  [ treeCell, ...getNCell(13, groundCell), treeCell],
  [ treeCell, ...getNCell(2, groundCell),  ...getNCell(3, blockedCell), hedgeCell, ...getNCell(7, groundCell),  treeCell],
  [ treeCell, ...getNCell(2, groundCell),  ...getNCell(3, blockedCell), hedgeCell, ...getNCell(7, groundCell),  treeCell],
  [ treeCell, ...getNCell(2, groundCell),  ...getNCell(3, blockedCell), hedgeCell, ...getNCell(7, groundCell),  treeCell],
  [ treeCell, ...getNCell(2, groundCell),  ...getNCell(3, blockedCell), hedgeCell, ...getNCell(7, groundCell),  treeCell],
  [ treeCell, ...getNCell(2, groundCell),  ...getNCell(3, blockedCell), doorCell, ...getNCell(7, groundCell),  treeCell],
  [ treeCell, ...getNCell(2, groundCell),  ...getNCell(3, blockedCell), hedgeCell, ...getNCell(7, groundCell),  treeCell],
  [ treeCell, ...getNCell(13, groundCell), treeCell],
  [ treeCell, ...getNCell(13, groundCell), treeCell],
  [ treeCell, ...getNCell(13, groundCell), treeCell],
  [ treeCell, ...getNCell(2, groundCell),  ...getNCell(3, blockedCell), hedgeCell, ...getNCell(7, groundCell),  treeCell],
  [ treeCell, ...getNCell(2, groundCell),  ...getNCell(3, blockedCell), doorCell, ...getNCell(7, groundCell),  treeCell],
  [ treeCell, ...getNCell(2, groundCell),  ...getNCell(3, blockedCell), hedgeCell, ...getNCell(7, groundCell),  treeCell],
  [ treeCell, ...getNCell(2, groundCell),  ...getNCell(3, blockedCell), hedgeCell, ...getNCell(7, groundCell),  treeCell],
  [ treeCell, ...getNCell(2, groundCell),  ...getNCell(3, blockedCell), hedgeCell, ...getNCell(7, groundCell),  treeCell],
  [ treeCell, ...getNCell(13, groundCell), treeCell],
  [ treeCell, ...getNCell(13, groundCell), treeCell],  
  getNCell(15, treeCell),
]

function getNCell(n: number, cell: ICell): ICell[] {
  return Array.from({ length: n }, _ => ({...cell}));
}

// const cells: ICell[][] = Array.from({ length: 20 }, (_, x) => Array.from({ length: 15 }, (_, y) => ({
//   position: { x, y },
//   isTraversable: true,
//   interactText: null
// })));

export default cells;