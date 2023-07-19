import * as React from 'react';
import './NavGameHud.css'
import TextPopup from './textPopup/TextPopup';
import ControlsExplanation from './controlsExplanation/ControlsExplanation';

interface INavGameHudProps {
  popupText: string | null,
  closePopupText: () => void
}

/**
*
* @returns {JSX.Element | null}
*/
export default function NavGameHud(props: INavGameHudProps): JSX.Element | null {
  return (
    <div className='nav-game-hud-wrapper' onClick={props.closePopupText}>
      <TextPopup message={props.popupText} />
      <ControlsExplanation />
    </div>
  );
}