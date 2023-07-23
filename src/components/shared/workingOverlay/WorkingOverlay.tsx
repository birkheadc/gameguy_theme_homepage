import * as React from 'react';
import './WorkingOverlay.css';

interface WorkingOverlayProps {
  isVisible: boolean
}
/**
 * 
 * @param {} props
 * @returns {JSX.Element | null}
 */
function WorkingOverlay(props: WorkingOverlayProps): JSX.Element | null {

  const [numDots, setNumDots] = React.useState<number>(0);

  React.useEffect(function setIntervalToIncreaseDots() {
    if (props.isVisible === false) return;
    const interval = setInterval(() => {
      setNumDots(n => n === MAX_DOTS ? -1 : n + 1);
    }, INTERVAL)

    return (() => {
      clearInterval(interval);
    });
  }, [ props.isVisible ]);

  return (
    <div className={'working-overlay-wrapper' + (props.isVisible ? '': ' invisible')}>
      <div className='working-overlay-inner-wrapper'>
        {Array.from({ length: MAX_DOTS }, _ => '.').map(
          (_, index) =>
          <span key={`working-overlay-dot-${index}`} className={index >= numDots ? 'invisible' : ''}>.</span>
        )}
      </div>
    </div>
  );
}

export default WorkingOverlay;

// Helpers

const MAX_DOTS = 7;
const INTERVAL = 300;