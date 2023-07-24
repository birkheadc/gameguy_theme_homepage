import * as React from 'react';
import './NavBar.css';
import { LanguageIcon, MapIcon, EyeDropperIcon, PaintBrushIcon, SunIcon } from '@heroicons/react/24/outline';

interface NavBarProps {
  toggleNav: () => void,
  toggleThemeSelector: () => void
}
/**
 * 
 * @param {} props
 * @returns {JSX.Element | null}
 */
function NavBar(props: NavBarProps): JSX.Element | null {
  return (
    <div id='nav-bar'>
      <div id='nav-bar-inner-wrapper'>
        <button id='toggle-nav-button' onClick={props.toggleNav}><MapIcon /></button>
        <button><LanguageIcon /></button>
        <button id='toggle-theme-selector-button' onClick={props.toggleThemeSelector}><EyeDropperIcon /></button>
      </div>
    </div>
  );
}

export default NavBar;