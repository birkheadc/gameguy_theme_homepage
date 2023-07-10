import * as React from 'react';
import './ControlsExplanation.css'

interface IControlsExplanationProps {

}

/**
*
* @returns {JSX.Element | null}
*/
export default function ControlsExplanation(props: IControlsExplanationProps): JSX.Element | null {
  return (
    <div className='controls-explanation-wrapper'>
      <div className='controls-explanation-inner-wrapper'>
        <span>Move: WASD</span>
        <span>Interact: Space</span>
        <span>Mobile: Not Implemented :(</span>
      </div>
    </div>
  );
}