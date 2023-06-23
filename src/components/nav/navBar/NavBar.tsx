import * as React from 'react';
import './NavBar.css';

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
        <button id='toggle-nav-button' onClick={props.toggleNav}></button>
        <button id='toggle-theme-selector-button' onClick={props.toggleThemeSelector}></button>
      </div>
  );
}

export default NavBar;