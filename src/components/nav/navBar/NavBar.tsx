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
        <button id='toggle-nav-button' onClick={props.toggleNav}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <button id='toggle-theme-selector-button' onClick={props.toggleThemeSelector}><span></span></button>
      </div>
  );
}

export default NavBar;