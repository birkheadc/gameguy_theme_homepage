import * as React from 'react';
import './NavGameHud.css'
import ControlsExplanation from './controlsExplanation/ControlsExplanation';
import TextPopup from './textPopup/TextPopup';

interface INavGameHudProps {
  popupText: string | null
}

/**
*
* @returns {JSX.Element | null}
*/
export default function NavGameHud(props: INavGameHudProps): JSX.Element | null {
  return (
    <div className='nav-game-hud-wrapper'>
      <ControlsExplanation />
      <TextPopup message={props.popupText} />
    </div>
  );
}