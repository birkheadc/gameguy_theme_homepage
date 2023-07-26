import * as React from 'react';
import './NavBar.css';
import { LanguageIcon, MapIcon, EyeDropperIcon, PaintBrushIcon, SunIcon } from '@heroicons/react/24/outline';
import LanguageSelector from '../../languageSelector/LanguageSelector';

interface NavBarProps {
  toggleNav: () => void,
  toggleThemeSelector: () => void,
}
/**
 * 
 * @param {} props
 * @returns {JSX.Element | null}
 */
function NavBar(props: NavBarProps): JSX.Element | null {

  return (
    <nav>
      <div className='nav-bar-inner-wrapper'>
        <button className='nav-button' id='toggle-nav-button' onClick={props.toggleNav}><MapIcon /></button>
        <LanguageSelector languageOptions={[{ title: 'English', code: 'en' }, { title: '日本語', code: 'jp' }]}/>
        <button className='nav-button' id='toggle-theme-selector-button' onClick={props.toggleThemeSelector}><PaintBrushIcon /></button>
      </div>
    </nav>
  );
}

export default NavBar;