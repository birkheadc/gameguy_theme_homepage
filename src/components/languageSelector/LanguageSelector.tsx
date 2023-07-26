import * as React from 'react';
import './LanguageSelector.css'
import { LanguageIcon } from '@heroicons/react/24/outline';

interface ILanguageSelectorProps {
  languageOptions: { title: string, code: string }[]
}

/**
*
* @returns {JSX.Element | null}
*/
export default function LanguageSelector(props: ILanguageSelectorProps): JSX.Element | null {

  const [isOpen, setOpen] = React.useState<boolean>(false);

  React.useEffect(function setListenersToCloseSelectorWhenOpen() {
    if (isOpen) {
      console.log('Set listeners...');
    }
    return (() => {
      console.log('Remove listeners');
    })
  }, [isOpen]);

  const handleToggleSelector = () => {
    setOpen(i => !i);
  }

  const handleChangeLanguage = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Change language to: ', event.currentTarget.name);
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