import * as React from 'react';
import './TextPopup.css'
import { useTranslation } from 'react-i18next';

interface ITextPopupProps {
  message: string,
  close: () => void
}

/**
*
* @returns {JSX.Element | null}
*/
export default function TextPopup(props: ITextPopupProps): JSX.Element | null {

  const { t } = useTranslation();

  React.useEffect(function addClosePopupListeners() {
    const listener = (event: KeyboardEvent | PointerEvent) => {
      if ((event as KeyboardEvent).key === ' ') event.preventDefault();
      props.close();
    };
    window.addEventListener('pointerdown', listener);
    window.addEventListener('keydown', listener);
    return (() => {
      window.removeEventListener('pointerdown', listener);
      window.removeEventListener('keydown', listener);
    });
  }, [props.close]);

  return (
    <div className='text-popup-wrapper'>
      {t(props.message)}
    </div>
  );
}