import * as React from 'react';
import './NavGame.css';
import ReactModal from 'react-modal';
import Grid from './grid/Grid';
import Player from './player/Player';
import { IVector2 } from '../../../types/vectory2';
import { IGrid } from '../../../types/grid';
import { Direction } from '../../../types/direction';
import NavGameHud from './navGameHud/NavGameHud';
import { ICell } from '../../../types/cell';
import { useNavigate } from 'react-router-dom';

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
  const [spaceDown, setSpaceDown] = React.useState<boolean>(false);
  const [popupText, setPopupText] = React.useState<string | null>(null);

  const navigate = useNavigate();

  React.useEffect(function setDirectionDownOnOpen() {
    setDirection(Direction.DOWN);
  }, [ props.isOpen ]);

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
      if (event.key === ' ') {
        event.preventDefault();
        setSpaceDown(true);
        return;
      }
      const direction = getDirectionFromKey(event.key);
      if (direction == null) return;
      event.preventDefault();
      setDownKeys(k => new Set<string>([...k, event.key]));
    }

    const keyupListener = (event: KeyboardEvent) => {
      if (event.key === ' ') {
        event.preventDefault();
        setSpaceDown(false);
        return;
      }
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

  React.useEffect(function checkIfCellIsNavigate() {
    if (currentPosition.x === targetPosition.x && currentPosition.y === targetPosition.y) {
      const cell = getCurrentCell(currentPosition, props.grid);
      if (cell && cell.navigate != null) {
        navigate(cell.navigate);
      }
    }
  }, [ currentPosition, targetPosition ]);

  React.useEffect(function calculateTargetPosition() {
    if (popupText != null) return;
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
  }, [ downKeys, isMoving, currentPosition, targetPosition, popupText ]);

  React.useEffect(function interactWhenSpaceDown() {
    if (isMoving) return;
    if (spaceDown === false) return;
    const targetCell = getCellInFrontOfPlayer(currentPosition, direction, props.grid);
    if (targetCell == null) return;
    setPopupText(t => t == null ? targetCell.interactText : null);
  }, [ spaceDown, currentPosition, direction, props.grid ]);

  return (
    <ReactModal className='nav-game-wrapper' isOpen={props.isOpen} onRequestClose={props.requestClose}>
      <Player isMoving={isMoving} direction={direction} />
      <Grid currentPosition={currentPosition} grid={props.grid} />
      <NavGameHud popupText={popupText} />
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

function getCurrentCell(currentPosition: IVector2, grid: IGrid): ICell | undefined {
  return grid.cells.find(c => c.position.x === currentPosition.x / CELL_SIZE && c.position.y === currentPosition.y / CELL_SIZE);
}

function getCellInFrontOfPlayer(currentPosition: IVector2, direction: Direction, grid: IGrid): ICell | undefined {
  const currentCellPosition = { x: currentPosition.x / CELL_SIZE, y: currentPosition.y / CELL_SIZE };
  const targetCellPosition = {...currentCellPosition};
  switch (direction) {
    case Direction.UP:
      targetCellPosition.y -= 1;
      break;
    case Direction.RIGHT:
      targetCellPosition.x += 1;
      break;
    case Direction.DOWN:
      targetCellPosition.y += 1;
      break;
    case Direction.LEFT:
      targetCellPosition.x -= 1;
      break;
  }
  return grid.cells.find(c => c.position.x === targetCellPosition.x && c.position.y === targetCellPosition.y);
}

function canMoveInDirection(currentPosition: IVector2, direction: Direction, grid: IGrid): boolean {
  const targetCell = getCellInFrontOfPlayer(currentPosition, direction, grid);
  if (targetCell == null) return false;
  return targetCell.isTraversable;
}