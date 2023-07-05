import * as React from 'react';
import './NavGame.css';
import ReactModal from 'react-modal';
import Grid from './grid/Grid';
import Player from './player/Player';
import { IVector2 } from '../../../types/vectory2';
import { IGrid } from '../../../types/grid';
import { Direction } from '../../../types/direction';

interface NavGameProps {
  isOpen: boolean,
  requestClose: () => void,
  grid: IGrid
}
/**
 * 
 * @param {} props
 * @returns {JSX.Element | null}
 */
function NavGame(props: NavGameProps): JSX.Element | null {
  const [currentPosition, setCurrentPosition] = React.useState<IVector2>({ x: props.grid.playerStartCell.x * CELL_SIZE, y: props.grid.playerStartCell.y * CELL_SIZE});
  const [targetPosition, setTargetPosition] = React.useState<IVector2>({ x: props.grid.playerStartCell.x * CELL_SIZE, y: props.grid.playerStartCell.y * CELL_SIZE});
  const [isMoving, setMoving] = React.useState<boolean>(false);
  const [direction, setDirection] = React.useState<Direction>(Direction.DOWN);
  const [downKeys, setDownKeys] = React.useState<Set<string>>(new Set<string>());

  React.useEffect(function createIntervalToMoveTowardTargetPosition() {
    let time: number = new Date().getTime();
    const interval = setInterval(() => {
      const newTime: number = new Date().getTime();
      const delta: number = newTime - time;
      time = newTime;

      const distance = (PLAYER_SPEED * CELL_SIZE) / (1000 / delta);

      setCurrentPosition(current => {
        if (targetPosition.x > current.x) return { ...current, x: Math.min(targetPosition.x, current.x + distance)};
        if (targetPosition.x < current.x) return { ...current, x: Math.max(targetPosition.x, current.x - distance)};
        if (targetPosition.y > current.y) return { ...current, y: Math.min(targetPosition.y, current.y + distance)};
        if (targetPosition.y < current.y) return { ...current, y: Math.max(targetPosition.y, current.y - distance)};
        return current;
      })
    }, 10);

    return (() => {
      clearInterval(interval);
    })
  }, [ targetPosition ]);

  React.useEffect(function addKeyListeners() {
    const keydownListener = (event: KeyboardEvent) => {
      const direction = getDirectionFromKey(event.key);
      if (direction == null) return;
      event.preventDefault();
      setDownKeys(k => new Set<string>([...k, event.key]));
    }

    const keyupListener = (event: KeyboardEvent) => {
      const direction = getDirectionFromKey(event.key);
      if (direction == null) return;
      event.preventDefault();
      setDownKeys(k => new Set<string>([...k].filter(k => k !== event.key)));
    }

    if (props.isOpen === true) {
      window.addEventListener('keydown', keydownListener);
      window.addEventListener('keyup', keyupListener);
    } else {
      window.removeEventListener('keydown', keydownListener);
      window.removeEventListener('keyup', keyupListener);
      setDownKeys(new Set<string>());
    }

    return (() => {
      window.removeEventListener('keydown', keydownListener);
      window.removeEventListener('keyup', keyupListener);
      setDownKeys(new Set<string>());
    })
  }, [ props.isOpen ]);

  React.useEffect(function calculateTargetPosition() {
    if (currentPosition.x === targetPosition.x && currentPosition.y === targetPosition.y) {
      if (downKeys.size < 1) {
        setMoving(false);
        return;
      }
      const direction = getDirectionFromKey([...downKeys.values()][downKeys.size - 1]);
      if (direction == null) {
        setMoving(false);
        return;
      }
      if (canMoveInDirection(currentPosition, direction, props.grid) === false) {
        setDirection(direction);
        setMoving(false);
        return;
      }
      setMoving(true);
      setDirection(direction);
      switch (direction) {
        case Direction.UP:
          setTargetPosition({...currentPosition, y: currentPosition.y - CELL_SIZE});
          break;
        case Direction.RIGHT:
          setTargetPosition({...currentPosition, x: currentPosition.x + CELL_SIZE});
          break;
        case Direction.DOWN:
          setTargetPosition({...currentPosition, y: currentPosition.y + CELL_SIZE});
          break;
        case Direction.LEFT:
          setTargetPosition({...currentPosition, x: currentPosition.x - CELL_SIZE});
          break;
      }
    }
  }, [ downKeys, isMoving, currentPosition, targetPosition ]);

  return (
    <ReactModal className='nav-game-wrapper' isOpen={props.isOpen} onRequestClose={props.requestClose}>
      <Player isMoving={isMoving} direction={direction} />
      <Grid currentPosition={currentPosition} grid={props.grid} />
    </ReactModal>
  );
}

export default NavGame;

// Helpers

function getDirectionFromKey(key: string): Direction | null {
  switch (key) {
    case 'w':
    case 'ArrowUp':
      return Direction.UP;
    case 'd':
    case 'ArrowRight':
      return Direction.RIGHT;
    case 's':
    case 'ArrowDown':
      return Direction.DOWN;
    case 'a':
    case 'ArrowLeft':
      return Direction.LEFT;
    default:
      return null;
  }
}

const CELL_SIZE = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--size-nav-cell') || '0');
const PLAYER_SPEED = 5;

function canMoveInDirection(currentPosition: IVector2, direction: Direction, grid: IGrid): boolean {
  const currentCell = { x: currentPosition.x / CELL_SIZE, y: currentPosition.y / CELL_SIZE };
  const targetCell = {...currentCell};
  switch (direction) {
    case Direction.UP:
      targetCell.y -= 1;
      break;
    case Direction.RIGHT:
      targetCell.x += 1;
      break;
    case Direction.DOWN:
      targetCell.y += 1;
      break;
    case Direction.LEFT:
      targetCell.x -= 1;
      break;
  }
  return grid.cells.find(c => c.position.x === targetCell.x && c.position.y === targetCell.y)?.isTraversable ?? false;
}