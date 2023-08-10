import * as React from 'react';
import './NavGameHud.css'
import TextPopup from './navTextBox/textPopup/TextPopup';
import ControlsExplanation from './controlsExplanation/ControlsExplanation';
import NavTextbox from './navTextBox/NavTextbox';
import { ICell } from '../../../../types/cell';

interface INavGameHudProps {
  cell: ICell | null,
  closePopupText: () => void
}

/**
*
* @returns {JSX.Element | null}
*/
export default function NavGameHud(props: INavGameHudProps): JSX.Element | null {

  return (
    <div className='nav-game-hud-wrapper'>
      { props.cell && <NavTextbox cell={props.cell} close={props.closePopupText} />}
      <ControlsExplanation />
    </div>
  );
}