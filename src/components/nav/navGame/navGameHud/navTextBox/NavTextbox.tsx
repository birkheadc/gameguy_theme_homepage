import * as React from 'react';
import './NavTextbox.css'
import { ICell } from '../../../../../types/cell';
import TextPopup from './textPopup/TextPopup';
import PromptPopup from './promptPopup/PromptPopup';

interface INavTextboxProps {
  cell: ICell,
  close: () => void
}

/**
*
* @returns {JSX.Element | null}
*/
export default function NavTextbox(props: INavTextboxProps): JSX.Element | null {
  return (
    <div className='nav-textbox-wrapper'>
      {props.cell.interactText != null ?
        <TextPopup message={props.cell.interactText} close={props.close} />
        :
        props.cell.prompt != null ?
          <PromptPopup prompt={props.cell.prompt} close={props.close} />
        :
        null
      } 
    </div>
  );
}