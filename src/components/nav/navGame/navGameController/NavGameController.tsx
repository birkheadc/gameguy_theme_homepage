import * as React from 'react';
import './NavGameController.css'
import { IGrid } from '../../../../types/grid';
import NavGamePlayer from '../navGamePlayer/NavGamePlayer';
import NavGameGrid from '../navGameGrid/NavGameGrid';
import NavGameHud from '../navGameHud/NavGameHud';
import { NavGameMovementController } from '../../../../types/navGameController/navGameController';
import { Direction } from '../../../../types/direction';
import { IVector2 } from '../../../../types/vectory2';
import { useLocation, useNavigate } from 'react-router-dom';
import { ICell } from '../../../../types/cell';
import helpers from '../../../../helpers';
import { IDoor } from '../../../../types/door';

interface INavGameControllerProps {
  grid: IGrid
}

/**
* Controls the nav game, handling all movement and interaction logic, and passing state info to subcomponents to render the game state.
* @returns {JSX.Element | null}
*/
export default function NavGameController(props: INavGameControllerProps): JSX.Element | null {

  // The direction the user is currently attempting to move via the keyboard.
  const [controllerDirection, setControllerDirection] = React.useState<Direction | null>(null);

  // The direction the player is facing.
  const [facingDirection, setFacingDirection] = React.useState<Direction>(Direction.DOWN);

  // The current position of the player in pixels in relation to the top left corner of the grid.
  const [truePosition, setTruePosition] = React.useState<IVector2>({ x: 0, y: 0 });

  // The current calculated path the player will attempt to walk to reach it's goal position.
  // If empty, the player should be standing still.
  const [path, setPath] = React.useState<IVector2[]>([]);

  // The text to display in the hud, or null if none to be played.
  const [popupText, setPopupText] = React.useState<string | null>(null);

  // Determines whether the player should play a moving animation or idle animation.
  const [isMoving, setMoving] = React.useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(function clearControllerOnMount() {
    controller.clearKeysDown();
  }, []);

  React.useEffect(function addKeyboardListeners() {

    const keydownListener = (event: KeyboardEvent) => {
      if (controller.registerKeyDown(event.key)) {
        event.preventDefault();
        setControllerDirection(controller.getCurrentDirection())
      }
    };

    const keyupListener = (event: KeyboardEvent) => {
      if (controller.registerKeyUp(event.key)) {
        event.preventDefault();
        setControllerDirection(controller.getCurrentDirection());
      }
    };

    const spaceListener = (event: KeyboardEvent) => {
      if (event.key === ' ') {
        event.preventDefault();
        interactWithCellInFront();
      }
    }

    window.addEventListener('keydown', keydownListener);
    window.addEventListener('keyup', keyupListener);
    window.addEventListener('keydown', spaceListener);
    return (() => {
      window.removeEventListener('keydown', keydownListener);
      window.removeEventListener('keyup', keyupListener);
      window.removeEventListener('keydown', spaceListener);
    });
  }, [ truePosition, facingDirection, props.grid]);

  React.useEffect(function calculateInitialPosition() {
    const door = getDoorAtLocation(location.pathname, props.grid);
    setTruePosition({ x: (door?.position.x ?? 0) * CELL_SIZE, y: ((door?.position.y ?? 0) + 1) * CELL_SIZE });
  }, [ location, props.grid ]);

  React.useEffect(function calculatePathFromDirection() {
    if (controllerDirection == null) return;
    if (popupText != null) return;
    setFacingDirection(fd => {
      if (isMoving) return fd;
      return controllerDirection;
    });
    setPath(path => {
      if (path.length > 0) return path;
      const targetPosition = calculatePositionInDirection(truePosition, controllerDirection)
      const targetCell = getCellAtPosition(targetPosition, props.grid);
      if (targetCell && targetCell.isTraversable === true) {
        const newPath: IVector2[] = [];
        newPath.push(targetPosition);
        return newPath;
      }
      return path;
    });
  }, [ controllerDirection, truePosition, popupText, path ]);

  React.useEffect(function addListenerToMoveTowardsFirstPositionOnPath() {
    if (path.length < 1) return;
    let time: number = new Date().getTime();
    const interval = setInterval(() => {
      const newTime = new Date().getTime();
      const delta = newTime - time;
      time = newTime;
      const distance = (PLAYER_SPEED * CELL_SIZE) / (1000 / delta);
      setTruePosition((position) => {
        const targetDirection = calculateDirectionToPosition(position, path[0]);
        setFacingDirection(targetDirection);
        switch (targetDirection) {
          case Direction.UP:
            return {...position, y: Math.max(position.y - distance, path[0].y) };
          case Direction.RIGHT:
            return {...position, x: Math.min(position.x + distance, path[0].x) };
          case Direction.DOWN:
            return {...position, y: Math.min(position.y + distance, path[0].y) };
          case Direction.LEFT:
            return {...position, x: Math.max(position.x - distance, path[0].x) };
        }
      });
    }, 10);

    return (() => {
      clearInterval(interval);
    })
  }, [ path ]);

  React.useEffect(function navigateWhenReachDoorCell() {
    const door: IDoor | undefined = getDoorAtPosition(truePosition, props.grid);
    if (door == null) return;
    navigate(door.location);
  }, [ truePosition, props.grid ]);

  React.useEffect(function updatePathWhenPositionReachesFirstElement() {
    setPath(path => {
      if (path.length < 1) return path;
      if (path[0].x === truePosition.x && path[0].y === truePosition.y) {
        const newPath = [...path];
        newPath.splice(0, 1);
        return newPath;
      }
      return path;
    });
  }, [ truePosition ])

  React.useEffect(function updateIsMoving() {
    if (popupText != null) {
      setMoving(false);
      return;
    }
    if (path.length > 0) {
      setMoving(true);
    } else {
      if (controllerDirection == null) {
        setMoving(false);
      } else {
        const nextCell = getCellAtPosition(calculatePositionInDirection(truePosition, controllerDirection), props.grid);
        setMoving(nextCell != null && nextCell.isTraversable === true);
      }
    }
  }, [ path, controllerDirection, props.grid, truePosition, popupText ]);

  const handleGridClick = (clickLocation: IVector2 | null) => {
    if (popupText != null) {
      setPopupText(null);
      return;
    }
    if (clickLocation == null) return;
    const cell = getCellAtPosition(clickLocation, props.grid);
    if (cell && arePositionsNeighboringOrSame(truePosition, clickLocation)) {
      setFacingDirection(calculateDirectionToPosition({ x: Math.floor(truePosition.x / CELL_SIZE), y: Math.floor(truePosition.y / CELL_SIZE)}, { x: Math.floor(clickLocation.x / CELL_SIZE), y: Math.floor(clickLocation.y / CELL_SIZE)}));
      setPopupText(cell.interactText);
    }
    let moveLocation: IVector2 | null = clickLocation;
    if (getCellAtPosition(clickLocation, props.grid)?.isTraversable === false) {
      if (cell && arePositionsNeighboringOrSame(truePosition, clickLocation)) {
        return;
      }
      moveLocation = getTraversableNeighboringPosition(clickLocation, props.grid);
    }
    setPath((path) => (path.length > 0 || moveLocation == null) ? path : calculatePathBetweenPositions(truePosition, moveLocation, props.grid));
  }

  const interactWithCellInFront = () => {
    setPopupText(text => {
      if (text != null) return null;
      const cell = getCellAtPosition(calculatePositionInDirection(truePosition, facingDirection), props.grid);
      return cell?.interactText ?? null;
    });
  }

  return (
    <div className='nav-game-wrapper'>
      <NavGamePlayer isMoving={isMoving} direction={facingDirection} />
      <NavGameGrid handleClick={handleGridClick} truePosition={truePosition} grid={props.grid} />
      <NavGameHud popupText={popupText} />
    </div>
  );
}

// Helpers

const controller = new NavGameMovementController();
const CELL_SIZE = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--size-nav-cell') || '0');
const PLAYER_SPEED = 5;

function calculateDirectionToPosition(current: IVector2, target: IVector2): Direction {
  if (target.x > current.x) return Direction.RIGHT;
  if (target.x < current.x) return Direction.LEFT;
  if (target.y > current.y) return Direction.DOWN;
  return Direction.UP;
}

function calculatePositionInDirection(current: IVector2, direction: Direction): IVector2 {
  switch (direction) {
    case Direction.UP:
      return {...current, y: current.y - CELL_SIZE};
    case Direction.RIGHT:
      return {...current, x: current.x + CELL_SIZE};
    case Direction.DOWN:
      return {...current, y: current.y + CELL_SIZE};
    case Direction.LEFT:
      return {...current, x: current.x - CELL_SIZE};
  }
}

// Calculates a path between two cells, avoiding cells that are not traversable, and returns the array of cells that should be traversed.
// From, to, and return vectors are in true pixel values.
function calculatePathBetweenPositions(from: IVector2, to: IVector2, grid: IGrid): IVector2[] {
  const cells = helpers.algorithm.findPath({ x: Math.floor(from.x / CELL_SIZE), y: Math.floor(from.y / CELL_SIZE) }, { x: Math.floor(to.x / CELL_SIZE), y: Math.floor(to.y / CELL_SIZE) }, grid.cells);
  for (let i = 0; i < cells.length; i++) {
    cells[i] = { x: cells[i].x * CELL_SIZE, y: cells[i].y * CELL_SIZE };
  }
  return cells;
}

function getCellAtPosition(position: IVector2, grid: IGrid): ICell | null {
  try {
    const cell = grid.cells[Math.floor(position.x / CELL_SIZE)][Math.floor(position.y / CELL_SIZE)];
    return cell;
  } catch {
    return null;
  }
}

function getTraversableNeighboringPosition(cell: IVector2, grid: IGrid): IVector2 | null {
  const downPosition = calculatePositionInDirection(cell, Direction.DOWN)
  if (getCellAtPosition(downPosition, grid)?.isTraversable === true) return downPosition;

  const rightPosition = calculatePositionInDirection(cell, Direction.RIGHT);
  if (getCellAtPosition(rightPosition, grid)?.isTraversable === true) return rightPosition;
  
  const leftPosition = calculatePositionInDirection(cell, Direction.LEFT);
  if (getCellAtPosition(leftPosition, grid)?.isTraversable === true) return leftPosition;

  const upPosition = calculatePositionInDirection(cell, Direction.UP);
  if (getCellAtPosition(upPosition, grid)?.isTraversable === true) return upPosition;

  return null;
}

function arePositionsNeighboringOrSame(a: IVector2, b: IVector2): boolean {
  const cellA = { x: Math.floor(a.x / CELL_SIZE), y: Math.floor(a.y / CELL_SIZE) };
  const cellB = { x: Math.floor(b.x / CELL_SIZE), y: Math.floor(b.y / CELL_SIZE) };

  if (cellA.x === cellB.x && cellA.y === cellB.y) {
    return true
  };

  if (cellA.x === cellB.x) {
    const solution = Math.abs(cellA.y - cellB.y) <= 1;
    return solution;
  }
  
  if (cellA.y === cellB.y) {
    const solution = Math.abs(cellA.x - cellB.x) <= 1;
    return solution;
  }

  return false;
}

function getDoorAtPosition(position: IVector2, grid: IGrid): IDoor | undefined {
  const door = grid.doors.find(d => d.position.x === (position.x / CELL_SIZE) && d.position.y === (position.y / CELL_SIZE));
  return door;
}

function getDoorAtLocation(location: string, grid: IGrid): IDoor | undefined {
  return grid.doors.find(d => d.location === location);
}