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
import { useLocation, useNavigate } from 'react-router-dom';
import { IDoor } from '../../../types/door';

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
  const [currentPosition, setCurrentPosition] = React.useState<IVector2>({ x: 1 * CELL_SIZE, y: 1 * CELL_SIZE});
  const [targetPosition, setTargetPosition] = React.useState<IVector2>({ x: 1 * CELL_SIZE, y: 1 * CELL_SIZE});
  const [isMoving, setMoving] = React.useState<boolean>(false);
  const [direction, setDirection] = React.useState<Direction>(Direction.DOWN);
  const [downKeys, setDownKeys] = React.useState<Set<string>>(new Set<string>());
  const [spaceDown, setSpaceDown] = React.useState<boolean>(false);
  const [popupText, setPopupText] = React.useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(function placePlayerOutsideCurrentDoor() {
    const door = getDoorAtLocation(location.pathname, props.grid);
    if (door == null) return;
    setTargetPosition({ x: (door.position.x * CELL_SIZE), y: ((door.position.y + 1) * CELL_SIZE) });
    setCurrentPosition({ x: (door.position.x * CELL_SIZE), y: ((door.position.y + 1) * CELL_SIZE) });
  }, [ props.isOpen, location, props.grid]);

  React.useEffect(function navigateWhenEnterDoor() {
    if (props.isOpen === true) {
      if (currentPosition.x === targetPosition.x && currentPosition.y === targetPosition.y) {
        const door = getDoorAtPosition(currentPosition, props.grid);
        if (door) {
          navigate(door.location)
        };
      }
    }
  }, [ currentPosition, targetPosition, props.isOpen, props.grid ]);

  React.useEffect(function setDirectionDownOnOpen() {
    setDirection(Direction.DOWN);
  }, [ props.isOpen ]);

  React.useEffect(function createIntervalToMoveTowardTargetPosition() {
    let time: number = new Date().getTime();
    const interval = setInterval(() => {
      const newTime: number = new Date().getTime();
      const delta: number = newTime - time;
      time = newTime;

      if (props.isOpen === false) return;

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
  }, [ targetPosition, props.isOpen ]);

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

  const handleGridClick = (location: IVector2 | null) => {
    if (location == null) return;
    setTargetPosition({ x: location.x * CELL_SIZE, y: location.y * CELL_SIZE });
  }

  return (
    <ReactModal className='nav-game-wrapper' isOpen={props.isOpen} onRequestClose={props.requestClose}>
      <Player isMoving={isMoving} direction={direction} />
      <Grid currentPosition={currentPosition} grid={props.grid} handleClick={handleGridClick}/>
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
  return getCellAtPosition(currentPosition, grid);
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
  return getCellAtPosition(targetCellPosition, grid);
}

function canMoveInDirection(currentPosition: IVector2, direction: Direction, grid: IGrid): boolean {
  const targetCell = getCellInFrontOfPlayer(currentPosition, direction, grid);
  if (targetCell == null) return false;
  return targetCell.isTraversable;
}

function getCellAtPosition(position: IVector2, grid: IGrid): ICell | undefined {
  if ( position.x < 0 || position.y < 0 || position.x >= grid.cells.length || position.y >= grid.cells[0].length) return undefined;
  return grid.cells[position.x][position.y];
}

function getDoorAtPosition(position: IVector2, grid: IGrid): IDoor | undefined {
  const door = grid.doors.find(d => d.position.x === (position.x / CELL_SIZE) && d.position.y === (position.y / CELL_SIZE));
  return door;
}

function getDoorAtLocation(location: string, grid: IGrid): IDoor | undefined {
  return grid.doors.find(d => d.location === location);
}