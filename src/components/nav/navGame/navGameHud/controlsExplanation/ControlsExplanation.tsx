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
      <span>Move: WASD | Click</span>
      <span>Interact: Space | Click</span>
    </div>
  );
}