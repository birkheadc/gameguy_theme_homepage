import * as React from 'react';
import './Cell.css'
import { ICell } from '../../../../../types/cell';
import ProcessedImage from '../../../../shared/processedImage/ProcessedImage';
import cellSprites from '../../cellSprites';
import { ImageProcessShaderMode } from '../../../../../types/imageProcessShaderMode';

interface ICellProps {
  cell: ICell
}

/**
*
* @returns {JSX.Element | null}
*/
export default function Cell(props: ICellProps): JSX.Element | null {

  const [imageSrc, setImageSrc] = React.useState<string>('');

  React.useEffect(() => {
    if (props.cell.sprite != null) setImageSrc(cellSprites.getImage(props.cell.sprite));
  }, [ props.cell.sprite ]);

  return (
    <div className='cell-wrapper' style={getCellStyle(props.cell)}>
      {props.cell.sprite && <ProcessedImage className={'full-size-canvas'} imageSrc={imageSrc} shaderMode={ImageProcessShaderMode.DARK}/>}
    </div>
  );
}

function getCellStyle(cell: ICell): React.CSSProperties {
  return {
    gridColumnStart: `${cell.position.x + 1}`,
    gridRowStart: `${cell.position.y + 1}`,
  }
}