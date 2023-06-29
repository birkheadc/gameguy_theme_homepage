import * as React from 'react';
import './Carousel.css'

interface ICarouselProps {
  children: React.ReactElement[],
  rotateInterval: number
}

/**
*
* @returns {JSX.Element | null}
*/
export default function Carousel(props: ICarouselProps): JSX.Element | null {
  return (
    <div className='carousel-wrapper'>
      {props.children};
    </div>
  );
}