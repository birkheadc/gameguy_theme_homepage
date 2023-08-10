import { ICell, ICellPromptActionType } from "../../../../types/cell";


const treeCell: ICell = {
  isTraversable: false,
  isInteractable: true,
  interactText: 'Just an ordinary bush. Useful for keeping nosy adventurers on the right path.'
};

const groundCell: ICell = {
  isTraversable: true,
  isInteractable: false,
};

const hedgeCell: ICell = {
  isTraversable: false,
  isInteractable: true,
  interactText: 'Some hedges planted outside a building. Looks awfully like an ordinary bush.'
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
    text: "It's a copy of Colby's resume. Take a look?",
    options: [
      {
        text: 'Yes',
        action: {
          type: ICellPromptActionType.LINK,
          extra: 'https://resume.birkheadc.me/resume_en_swe.pdf'
        }
      },
      {
        text: 'No',
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
  [ treeCell, ...getNCell(2, groundCell),  ...getNCell(3, blockedCell), hedgeCell, ...getNCell(2, groundCell), ...getNCell(3, blockedCell), hedgeCell, groundCell,  treeCell],
  [ treeCell, ...getNCell(2, groundCell),  ...getNCell(3, blockedCell), doorCell, ...getNCell(2, groundCell), ...getNCell(3, blockedCell), hedgeCell, treeCell,  treeCell],
  [ treeCell, ...getNCell(2, groundCell),  ...getNCell(3, blockedCell), hedgeCell, ...getNCell(7, groundCell),  treeCell],
  [ treeCell, ...getNCell(13, groundCell), treeCell],
  [ treeCell, ...getNCell(13, groundCell), treeCell],
  [ treeCell, ...getNCell(13, groundCell), treeCell],
  [ treeCell, ...getNCell(2, groundCell),  ...getNCell(3, blockedCell), hedgeCell, groundCell, ...getNCell(3, blockedCell), hedgeCell, ...getNCell(2, groundCell), treeCell],
  [ treeCell, ...getNCell(2, groundCell),  ...getNCell(3, blockedCell), doorCell, groundCell, ...getNCell(3, blockedCell), doorCell, ...getNCell(2, groundCell), treeCell],
  [ treeCell, ...getNCell(2, groundCell),  ...getNCell(3, blockedCell), hedgeCell, groundCell, ...getNCell(3, blockedCell), hedgeCell, ...getNCell(2, groundCell), treeCell],
  [ treeCell, ...getNCell(2, groundCell),  ...getNCell(3, blockedCell), hedgeCell, groundCell, ...getNCell(3, blockedCell), hedgeCell, ...getNCell(2, groundCell), treeCell],
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