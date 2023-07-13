import * as React from 'react';
import './TextPopup.css'

interface ITextPopupProps {
  message: string | null
}

/**
*
* @returns {JSX.Element | null}
*/
export default function TextPopup(props: ITextPopupProps): JSX.Element | null {

  if (props.message == null) return null;
  return (
    <div className='text-popup-wrapper'>
      {props.message}
    </div>
  );
}