import { ICell, ICellPromptActionType } from "../../../../types/cell";

const treeCell: ICell = {
  isTraversable: false,
  isInteractable: true,
  interactText: 'cells.treeCell'
};

const groundCell: ICell = {
  isTraversable: true,
  isInteractable: false,
};

const hedgeCell: ICell = {
  isTraversable: false,
  isInteractable: true,
  interactText: 'cells.hedgeCell'
}

const blockedCell: ICell = {
  isTraversable: false,
  isInteractable: false
}

const doorCell: ICell = {
  isTraversable: true,
  isInteractable: false
}

const resumeCell: ICell = {
  isTraversable: false,
  isInteractable: true,
  prompt: {
    text: 'cells.resumeCell',
    options: [
      {
        text: 'yes',
        action: {
          type: ICellPromptActionType.LINK,
          extra: process.env.RESUME_URL
        }
      },
      {
        text: 'no',
        action: {
          type: ICellPromptActionType.CANCEL,
        }
      }
    ]
  }
}

const cells: ICell[][] = [
  getNCell(15, treeCell),
  [ treeCell, resumeCell, ...getNCell(12, groundCell), treeCell],
  [ treeCell, ...getNCell(8, groundCell), ...getNCell(3, blockedCell), hedgeCell, groundCell, treeCell], 
  [ treeCell, ...getNCell(2, groundCell),  ...getNCell(3, blockedCell), hedgeCell, ...getNCell(2, groundCell), ...getNCell(3, blockedCell), doorCell, groundCell,  treeCell],
  [ treeCell, ...getNCell(2, groundCell),  ...getNCell(3, blockedCell), hedgeCell, ...getNCell(2, groundCell), ...getNCell(3, blockedCell), hedgeCell, groundCell,  treeCell],
  [ treeCell, ...getNCell(2, groundCell),  ...getNCell(3, blockedCell), hedgeCell, ...getNCell(2, groundCell), ...getNCell(3, blockedCell), hedgeCell, groundCell,  treeCell],
  [ treeCell, ...getNCell(2, groundCell),  ...getNCell(3, blockedCell), hedgeCell, ...getNCell(2, groundCell), ...getNCell(3, blockedCell), hedgeCell, resumeCell,  treeCell],
  [ treeCell, ...getNCell(2, groundCell),  ...getNCell(3, blockedCell), doorCell, ...getNCell(2, groundCell), ...getNCell(3, blockedCell), hedgeCell, treeCell,  treeCell],
  [ treeCell, ...getNCell(2, groundCell),  ...getNCell(3, blockedCell), hedgeCell, ...getNCell(7, groundCell),  treeCell],
  [ treeCell, ...getNCell(13, groundCell), treeCell],
  [ treeCell, ...getNCell(4, groundCell), resumeCell, ...getNCell(8, groundCell), treeCell],
  [ treeCell, ...getNCell(13, groundCell), treeCell],
  [ treeCell, ...getNCell(2, groundCell),  ...getNCell(3, blockedCell), hedgeCell, groundCell, ...getNCell(3, blockedCell), hedgeCell, ...getNCell(2, groundCell), treeCell],
  [ treeCell, ...getNCell(2, groundCell),  ...getNCell(3, blockedCell), doorCell, groundCell, ...getNCell(3, blockedCell), doorCell, ...getNCell(2, groundCell), treeCell],
  [ treeCell, ...getNCell(2, groundCell),  ...getNCell(3, blockedCell), hedgeCell, groundCell, ...getNCell(3, blockedCell), hedgeCell, ...getNCell(2, groundCell), treeCell],
  [ treeCell, ...getNCell(2, groundCell),  ...getNCell(3, blockedCell), hedgeCell, groundCell, ...getNCell(3, blockedCell), hedgeCell, ...getNCell(2, groundCell), treeCell],
  [ treeCell, ...getNCell(2, groundCell),  ...getNCell(3, blockedCell), hedgeCell, groundCell, resumeCell, ...getNCell(5, groundCell),  treeCell],
  [ treeCell, ...getNCell(10, groundCell), resumeCell, ...getNCell(2, groundCell), treeCell],
  [ treeCell, ...getNCell(13, groundCell), treeCell],  
  getNCell(15, treeCell),
]

function getNCell(n: number, cell: ICell): ICell[] {
  return Array.from({ length: n }, _ => ({...cell}));
}

export default cells;