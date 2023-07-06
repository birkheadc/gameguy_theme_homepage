import * as React from 'react';
import './Grid.css'
import { IGrid } from '../../../../types/grid';
import Cell from './cell/Cell';
import { IVector2 } from '../../../../types/vectory2';

interface IGridProps {
  grid: IGrid,
  currentPosition: IVector2,
}

/**
*
* @returns {JSX.Element | null}
*/
export default function Grid(props: IGridProps): JSX.Element | null {

  return (
    <div className='grid-wrapper' id='grid-wrapper'>
      <div className='grid-inner-wrapper' style={calculateInnerWrapperStyle(props.currentPosition)}>
        {props.grid.cells.map(
          cell =>
          <Cell key={`cell-${cell.position.x}-${cell.position.y}`} cell={cell} />
        )}
        {props.grid.signs.map(
          sign =>
          <div className='grid-sign-wrapper' key={`grid-sign-${sign.text}`} style={calculateSignWrapperStyle(sign.position)}>
            <span className='grid-sign'>{sign.text}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Helpers

function calculateInnerWrapperStyle(currentPosition: IVector2): React.CSSProperties {
  const cellSize = getComputedStyle(document.documentElement).getPropertyValue('--size-nav-cell');
  const transform = `translate(calc(50% - (${cellSize} / 2) - ${currentPosition.x}px), calc(50% - (${cellSize} / 2) - ${currentPosition.y}px))`;
  return {
    transform: transform
  };
}

function calculateSignWrapperStyle(position: IVector2): React.CSSProperties {
  return {
    gridColumnStart: `${position.x + 1}`,
    gridRowStart: `${position.y + 1}`
  }
}