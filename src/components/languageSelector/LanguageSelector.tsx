import * as React from 'react';
import './LanguageSelector.css'
import { LanguageIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../../hooks/useLanguage/useLanguage';
import { useTranslation } from 'react-i18next';

interface ILanguageSelectorProps {
  languageOptions: { title: string, code: string }[]
}

/**
*
* @returns {JSX.Element | null}
*/
export default function LanguageSelector(props: ILanguageSelectorProps): JSX.Element | null {

  const { language, changeLanguage } = useLanguage();

  const [isOpen, setOpen] = React.useState<boolean>(false);

  React.useEffect(function setMouseListenerToCloseSelector() {
    const listener = ((event: MouseEvent) => {
      const clicked = document.elementsFromPoint(event.clientX, event.clientY);
      let shouldClose = true;
      clicked.forEach(element => {
        if (!shouldClose) return;
        if (element.classList.contains('language-selector-wrapper')) shouldClose = false;
      });
      if (shouldClose) {
        setOpen(false);
      }
    })
    window.addEventListener('click', listener);
    return (() => {
      window.removeEventListener('click', listener);
    })
  }, []);

  React.useEffect(function setKeyListenerToCloseSelector() {
    const listener = ((event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    });
    window.addEventListener('keydown', listener);
    return (() => {
      window.removeEventListener('keydown', listener);
    })
  }, [])

  const handleToggleSelector = () => {
    setOpen(i => !i);
  }

  const handleChangeLanguage = (event: React.MouseEvent<HTMLButtonElement>) => {
    changeLanguage(event.currentTarget.name);
    setOpen(false);
  }

  return (
    <div className='language-selector-wrapper'>
      <button className='nav-button' onClick={handleToggleSelector}><LanguageIcon /></button>
      <div className='language-selector-options-wrapper'>
        <div className={`language-selector-options-inner-wrapper ${isOpen ? 'active' : 'inactive' }`} >
          {props.languageOptions.map(
            option =>
            <button className='language-selector-button' key={`'language-selector-options-button-${option.code}`} tabIndex={isOpen ? 0 : -1} type='button' onClick={handleChangeLanguage} name={option.code}>{option.title}</button>
          )}
        </div>
      </div>
    </div>
  );
}