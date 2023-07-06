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
  return (
    <div className='text-popup-wrapper'>
      {props.message &&
        <div className='text-popup-inner-wrapper'>
          {props.message}
        </div>
      }
    </div>
  );
}