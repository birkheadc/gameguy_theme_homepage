import * as React from 'react';
import './NavGame.css'
import ReactModal from 'react-modal';
import { IGrid } from '../../../types/grid';
import NavGameController from './navGameController/NavGameController';

interface INavGameProps {
  isOpen: boolean,
  requestClose: () => void,
  grid: IGrid
}

/**
*
* @returns {JSX.Element | null}
*/
export default function NavGame(props: INavGameProps): JSX.Element | null {
  return (
    <ReactModal isOpen={props.isOpen} onRequestClose={props.requestClose}>
      <NavGameController grid={props.grid} />
    </ReactModal>
  );
}