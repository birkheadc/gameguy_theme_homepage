import * as React from 'react';
import './NavGameHud.css'
import TextPopup from './navTextBox/textPopup/TextPopup';
import ControlsExplanation from './controlsExplanation/ControlsExplanation';
import NavTextbox from './navTextBox/NavTextbox';
import { ICell } from '../../../../types/cell';
import NavGameNavBar from './navGameNavBar/NavGameNavBar';
import { IDoor } from '../../../../types/door';

interface INavGameHudProps {
  cell: ICell | null,
  closePopupText: () => void,
  doors: IDoor[],
  handleClick: (door: IDoor) => void
}

/**
*
* @returns {JSX.Element | null}
*/
export default function NavGameHud(props: INavGameHudProps): JSX.Element | null {

  return (
    <div className='nav-game-hud-wrapper'>
      { props.cell && <NavTextbox cell={props.cell} close={props.closePopupText} />}
      <NavGameNavBar doors={props.doors} handleClick={props.handleClick}/>
      <ControlsExplanation />
    </div>
  );
}