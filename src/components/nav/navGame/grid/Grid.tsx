import * as React from 'react';
import './Grid.css'
import { IGrid } from '../../../../types/grid';
import Cell from './cell/Cell';

interface IGridProps {
  grid: IGrid
}

/**
*
* @returns {JSX.Element | null}
*/
export default function Grid(props: IGridProps): JSX.Element | null {

  React.useEffect(function setCellSizeOnMount() {
    const wrapper = document.querySelector('div#grid-wrapper') as HTMLDivElement;
    if (wrapper == null || props.grid == null) return;

    const width = wrapper.clientWidth;
    const height = wrapper.clientHeight;

    document.documentElement.style.setProperty('--size-cell-width', `${width / props.grid.gridSize.x}`);
    document.documentElement.style.setProperty('--size-cell-height', `${height / props.grid.gridSize.y}`);
  }, [ props.grid ]);

  return (
    <div className='grid-wrapper' id='grid-wrapper' style={getCellsWrapperStyle(props.grid)}>
      {props.grid.cells.map(
        cell =>
        <Cell key={`cell-${cell.position.x}-${cell.position.y}`} cell={cell} />
      )}
    </div>
  );
}

// Helpers

function getCellsWrapperStyle(grid: IGrid): React.CSSProperties {
  return {};
}