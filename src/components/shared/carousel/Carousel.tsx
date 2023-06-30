import * as React from 'react';
import './Carousel.css'
import CarouselStatusDisplay from './carouselStatusDisplay/CarouselStatusDisplay';

interface ICarouselProps {
  children: React.ReactElement[],
  rotateIntervalInMs: number,
}

/**
*
* @returns {JSX.Element | null}
*/
export default function Carousel(props: ICarouselProps): JSX.Element | null {

  const [current, setCurrent] = React.useState<number>(0);
  const [isAutoRotate, setAutoRotate] = React.useState<boolean>(true);

  React.useEffect(function addListenerForOpenMoreInfoEvent() {
    const listener = () => {
      setAutoRotate(false);
    }
    window.addEventListener('onopenmoreinfo', listener);
    return (() => {
      window.removeEventListener('onopenmoreinfo', listener);
    })
  }, []);

  React.useEffect(function setRotateIntervalOnPropUpdate() {

    const interval = setInterval(() => {
      if (isAutoRotate) setCurrent(c => c + 1 >= props.children.length ? 0 : c + 1);
    }, props.rotateIntervalInMs);

    return (() => {
      clearInterval(interval);
    })
  }, [ props.rotateIntervalInMs, props.children, isAutoRotate ]);

  React.useEffect(function callCollapseEventOnRotate() {
    window.dispatchEvent(new Event('onrotate'));
  }, [ current ]);

  const handleSelect = (index: number) => {
    setCurrent(index);
    setAutoRotate(false);
  }

  const handleToggleRotate = () => {
    setAutoRotate(a => !a);
  }

  return (
    <div className='carousel-wrapper'>
      <div className='carousel-wrapper-inner' style={getCarouselWrapperInnerStyle(props.children.length, current)}>
        {React.Children.map(
          props.children, child =>
          <div className='carousel-child'>{child}</div>
        )}
      </div>
      <CarouselStatusDisplay length={props.children.length} current={current} select={handleSelect} isAutoRotate={isAutoRotate} toggleRotate={handleToggleRotate} />
    </div>
  );
}

// Helpers

function getCarouselWrapperInnerStyle(numChildren: number, current: number): React.CSSProperties {
  const gapOffsetStyle: string = getComputedStyle(document.documentElement).getPropertyValue('--size-carousel-gap');
  const gapOffsetPercent: number = parseInt(gapOffsetStyle.substring(0, gapOffsetStyle.length - 1));
  const offset = (((100 + (gapOffsetPercent * numChildren)) / numChildren) * current);
  return {
    transform: `translate(-${offset}%, 0)`
  }
}