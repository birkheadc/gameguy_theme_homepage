import * as React from 'react';
import './Cell.css'
import { ICell } from '../../../../../types/cell';

interface ICellProps {
  cell: ICell
}

/**
*
* @returns {JSX.Element | null}
*/
export default function Cell(props: ICellProps): JSX.Element | null {
  return (
    <div className='cell-wrapper' style={getCellStyle(props.cell)}>
      
    </div>
  );
}

function getCellStyle(cell: ICell): React.CSSProperties {
  return {
    gridColumnStart: `${cell.position.x + 1}`,
    gridRowStart: `${cell.position.y + 1}`,
  }
}