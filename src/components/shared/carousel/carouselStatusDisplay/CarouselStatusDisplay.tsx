import * as React from 'react';
import './CarouselStatusDisplay.css';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline';

interface CarouselStatusDisplayProps {
  length: number,
  current: number,
  select: (index: number) => void
  isAutoRotate: boolean,
  toggleRotate: () => void
}
/**
 * 
 * @param {} props
 * @returns {JSX.Element | null}
 */
function CarouselStatusDisplay(props: CarouselStatusDisplayProps): JSX.Element | null {
  return (
    <div className='carousel-status-display-wrapper'>
      <div>

      </div>
      <div className='carousel-select-buttons-wrapper'>
        {Array.from({ length: props.length }, (_, index) => index).map(
          index =>
          <button key={`carousel-select-button-${index}`} className={`carousel-select-button ${(props.current === index) ? 'active' : 'inactive'}`} onClick={() => props.select(index)}></button>
        )}
        <div className='carousel-select-position-marker' style={calculateSelectPositionMarkerStyle(props.current)}></div>
      </div>
      <div>
        <button className='carousel-lock-button' onClick={props.toggleRotate}>
          {props.isAutoRotate ? <LockOpenIcon /> : <LockClosedIcon />}
        </button>
      </div>
    </div>
  );
}

export default CarouselStatusDisplay;

// Helpers

function calculateSelectPositionMarkerStyle(current: number): React.CSSProperties {
  const buttonWidthStyle = getComputedStyle(document.documentElement).getPropertyValue('--size-carousel-button');
  const buttonGapStyle = getComputedStyle(document.documentElement).getPropertyValue('--size-carousel-button-gap');
  const buttonWidthPlusGap: number = parseInt(buttonWidthStyle) + parseInt(buttonGapStyle);
  const offset = `${(buttonWidthPlusGap) * current}px`;
  return {
    transform: `translate(${offset}, 0)`
  }
}