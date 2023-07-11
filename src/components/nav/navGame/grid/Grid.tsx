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
  handleClick: (location: IVector2 | null) => void
}

/**
*
* @returns {JSX.Element | null}
*/
export default function Grid(props: IGridProps): JSX.Element | null {

  const wrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(function addClickListener() {
    const listener = (event: PointerEvent) => {
      const clickedPosition = calculateClickedPosition(event);
      props.handleClick(clickedPosition);
    };
    wrapperRef.current?.addEventListener('pointerdown', listener);
    return (() => {
      wrapperRef.current?.removeEventListener('pointerdown', listener);
    });
  }, []);

  return (
    <div className='grid-wrapper' id='grid-wrapper' ref={wrapperRef}>
      <div className='grid-inner-wrapper' style={calculateInnerWrapperStyle(props.currentPosition, props.grid)}>
        <ProcessedImage className={'grid-canvas'} imageSrc={gridImage} shaderMode={ImageProcessShaderMode.DARK} pixelateLevel={1} />
      </div>
    </div>
  );
}

// Helpers

const CELL_SIZE = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--size-nav-cell') || '0');

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

function calculateClickedPosition(event: PointerEvent): IVector2 {
  const x = Math.floor(event.offsetX / CELL_SIZE);
  const y = Math.floor(event.offsetY / CELL_SIZE);
  
  return { x, y };
}