import * as React from 'react';
import './NavGame.css'
import ReactModal from 'react-modal';
import { IGrid } from '../../../types/grid';
import NavGameController from './navGameController/NavGameController';
import NavGameTransition from './navGameTransition/NavGameTransition';

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

const [isActive, setActive] = React.useState<boolean>(false);

React.useEffect(function deactivateOnOpenOrClose() {
  setActive(false);
}, [ props.isOpen ]);

const handleTransitionFinished = () => {
  setActive(true);
}

  return (
    <ReactModal closeTimeoutMS={100} isOpen={props.isOpen} onRequestClose={props.requestClose}>
      <NavGameTransition isActive={!isActive} animationLength={DELAY_UNTIL_ACTIVE} transitionFinished={handleTransitionFinished} />
      <NavGameController isActive={isActive} grid={props.grid} />
    </ReactModal>
  );
}

// Helpers

const DELAY_UNTIL_ACTIVE = 500;