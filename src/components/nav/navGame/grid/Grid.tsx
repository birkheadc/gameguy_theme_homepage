import * as React from 'react';
import './Grid.css'
import { IGrid } from '../../../../types/grid';
import { IVector2 } from '../../../../types/vectory2';
import helpers from '../../../../helpers';
import ProcessedImage from '../../../shared/processedImage/ProcessedImage';
import gridImage from '../../../../assets/images/grid/grid.png';
import { ImageProcessShaderMode } from '../../../../types/imageProcessShaderMode';

interface IGridProps {
  grid: IGrid,
  currentPosition: IVector2,
}

/**
*
* @returns {JSX.Element | null}
*/
export default function Grid(props: IGridProps): JSX.Element | null {

  const [images, setImages] = React.useState<HTMLImageElement[][]>([]);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(function drawImageToCanvasAndProcess() {
    if (images.length < 1 || canvasRef.current == null) return;
    helpers.image.drawGridImagesToCanvas(images, canvasRef.current, 1);
  }, [ images, canvasRef ]);

  return (
    <div className='grid-wrapper' id='grid-wrapper'>
      <div className='grid-inner-wrapper' style={calculateInnerWrapperStyle(props.currentPosition, props.grid)}>
        <ProcessedImage className={'grid-canvas'} imageSrc={gridImage} shaderMode={ImageProcessShaderMode.DARK} pixelateLevel={1} />
      </div>
    </div>
  );
}

// Helpers

function calculateInnerWrapperStyle(currentPosition: IVector2, grid: IGrid): React.CSSProperties {
  const cellSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--size-nav-cell'));
  const transform = `translate(calc(50% - ${cellSize / 2}px - ${currentPosition.x}px), calc(50% - ${cellSize / 2}px - ${currentPosition.y}px))`;
  const width = grid.gridSize.x * cellSize;
  const height = grid.gridSize.y * cellSize;
  return {
    transform,
    height,
    width
  };
}

function calculateSignWrapperStyle(position: IVector2): React.CSSProperties {
  return {
    gridColumnStart: `${position.x + 1}`,
    gridRowStart: `${position.y + 1}`
  }
}

function createEmpty2dImageElementArrayOfSize(x: number, y: number): HTMLImageElement[][] {
  const images = Array.from ({ length: x }, _ => Array.from({ length: y }, _ => new Image()));

  return images;
}