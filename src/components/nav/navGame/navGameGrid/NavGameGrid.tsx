import * as React from 'react';
import './NavGameGrid.css'
import ProcessedImage from '../../../shared/processedImage/ProcessedImage';
import gridImage from '../../../../assets/images/grid/grid.png'
import { ImageProcessShaderMode } from '../../../../types/imageProcessShaderMode';
import { IVector2 } from '../../../../types/vectory2';
import { IGrid } from '../../../../types/grid';

interface INavGameGridProps {
  truePosition: IVector2,
  grid: IGrid,
  handleClick: (location: IVector2 | null) => void,
  canMove: boolean
}

/**
*
* @returns {JSX.Element | null}
*/
export default function NavGameGrid(props: INavGameGridProps): JSX.Element | null {

  const wrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(function addClickListener() {
    const listener = (event: PointerEvent) => {
      if (props.canMove === true) {
        const clickedPosition = calculateClickedPosition(event);
        props.handleClick(clickedPosition);
        event.stopPropagation();
      }
    };
    wrapperRef.current?.addEventListener('pointerdown', listener);
    return (() => {
      wrapperRef.current?.removeEventListener('pointerdown', listener);
    });
  }, [ props.handleClick, wrapperRef, props.canMove ]);

  return (
    <div className='nav-game-grid-wrapper'>
      <div className='nav-game-grid-inner-wrapper' ref={wrapperRef} style={calculateInnerWrapperStyle(props.truePosition, props.grid)}>
        <ProcessedImage className={'nav-game-grid-canvas'} imageSrc={gridImage} shaderMode={ImageProcessShaderMode.NORMAL} pixelateLevel={1} />
      </div>
    </div>
  );
}

// Helpers

const CELL_SIZE = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--size-nav-cell') || '0');

function calculateInnerWrapperStyle(truePosition: IVector2, grid: IGrid): React.CSSProperties {
  const cellSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--size-nav-cell'));
  const transform = `translate(calc(50% - ${cellSize / 2}px - ${truePosition.x}px), calc(50% - ${cellSize / 2}px - ${truePosition.y}px))`;
  const width = grid.gridSize.x * cellSize;
  const height = grid.gridSize.y * cellSize;
  return {
    transform,
    height,
    width
  };
}

function calculateClickedPosition(event: PointerEvent): IVector2 {
  // const x = Math.floor(event.offsetX / CELL_SIZE);
  // const y = Math.floor(event.offsetY / CELL_SIZE);
  
  return { x: event.offsetX, y: event.offsetY };
}