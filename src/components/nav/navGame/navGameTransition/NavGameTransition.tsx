import * as React from 'react';
import './NavGameTransition.css'
import helpers from '../../../../helpers';

interface INavGameTransitionProps {
  isActive: boolean,
  animationLength: number,
  transitionFinished: () => void
}

/**
*
* @returns {JSX.Element | null}
*/
export default function NavGameTransition(props: INavGameTransitionProps): JSX.Element | null {

  const [cells, setCells] = React.useState<boolean[][]>(
    Array.from({ length: 10 }, _ => Array.from({ length: 10 }, _ => true))
  );

  React.useEffect(function beginBreakingCells() {    
    const random: number[] = helpers.algorithm.shuffleArray(Array.from ({ length: 100 }, (_, index) => index));

    let i = 0;

    const interval = setInterval(() => {
      if (i > 99) {
        props.transitionFinished();
        clearInterval(interval);
        return;
      }
      setCells(cells => {
        if (cells.length < 1) return cells;
        const newCells: boolean[][] = Array.from(cells, (row, i) => Array.from(row, (cell, j) => cell ) );
        newCells[Math.floor(random[i] / 10)][random[i] % 10] = false;
        i++;
        return newCells;
      });
    }, props.animationLength / 100)

    return (() => {
      clearInterval(interval);
    })

  }, [props.animationLength]);

  if (props.isActive === true) return (
    <div className='nav-game-transition-wrapper'>
      {cells.map(
        (cellRow, i) =>
        cellRow.map(
          (cell, j) =>
          <div key={`nav-game-transition-cell-${i}-${j}`} className='nav-game-transition-cell' style={calculateTransitionCellStyle(i, j, cells[i][j])}></div>
        )
      )}
    </div>
  );
  return null;
}

// Helpers

function calculateTransitionCellStyle(i: number, j: number, isActive: boolean): React.CSSProperties {
  return {
    gridRow: i + 1,
    gridColumn: j + 1,
    opacity: isActive ? 1 : 0
  }
}