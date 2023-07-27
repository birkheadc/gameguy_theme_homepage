import * as React from 'react';
import './FadeCarousel.css';

interface FadeCarouselProps {
  lingerTime: number,
  children: React.ReactNode
}
/**
 * 
 * @param {} props
 * @returns {JSX.Element | null}
 */
function FadeCarousel(props: FadeCarouselProps): JSX.Element | null {

  const [current, setCurrent] = React.useState<number>(0);

  React.useEffect(function setIntervalOnMount() {
    const interval = setInterval(() => {
      setCurrent(c => (c + 1 >= React.Children.count(props.children)) ? 0 : c + 1);
    }, props.lingerTime);
    return (() => {
      clearInterval(interval);
    })
  }, [ props.children, props.lingerTime ]);

  return (
    <div className='fade-carousel-wrapper'> 
      {React.Children.map(
        props.children,
        (child, index) =>
        <div className={`fade-carousel-child-wrapper ${index === current ? 'active' : 'inactive'}`}>
          {child}
        </div>
      )}
    </div>
  );
}

export default FadeCarousel;