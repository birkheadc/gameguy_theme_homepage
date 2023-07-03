import * as React from 'react';
import './NavGame.css';
import ReactModal from 'react-modal';
import Grid from './grid/Grid';
import defaultGrid from './defaultGrid';
import Player from './player/Player';

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
      <Player grid={defaultGrid.grid} />
      <Grid grid={defaultGrid.grid} />
    </ReactModal>
  );
}

export default NavGame;