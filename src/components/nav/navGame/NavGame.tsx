import * as React from 'react';
import './NavGame.css';
import ReactModal from 'react-modal';
import { NavLink } from 'react-router-dom';

interface NavGameProps {
  isOpen: boolean,
  requestClose: () => void
}
/**
 * 
 * @param {} props
 * @returns {JSX.Element | null}
 */
function NavGame(props: NavGameProps): JSX.Element | null {
  return (
    <ReactModal className='nav-game-wrapper' isOpen={props.isOpen} onRequestClose={props.requestClose}>
      <ul className='nav-links'>
        <li><NavLink to='/'>Welcome</NavLink></li>
        <li><NavLink to='/projects'>Projects</NavLink></li>
      </ul>
    </ReactModal>
  );
}

export default NavGame;