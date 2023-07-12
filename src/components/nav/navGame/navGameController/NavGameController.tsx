import * as React from 'react';
import './NavGameController.css'
import { IGrid } from '../../../../types/grid';
import NavGamePlayer from '../navGamePlayer/NavGamePlayer';
import NavGameGrid from '../navGameGrid/NavGameGrid';
import NavGameHud from '../navGameHud/NavGameHud';
import { NavGameMovementController } from '../../../../types/navGameController/navGameController';
import { Direction } from '../../../../types/direction';
import { IVector2 } from '../../../../types/vectory2';
import { useLocation } from 'react-router-dom';
import { ICell } from '../../../../types/cell';
import helpers from '../../../../helpers';

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

  // The current position of the player in pixels in relation to the top left corner of the grid.
  const [truePosition, setTruePosition] = React.useState<IVector2>({ x: 0, y: 0 });

  // The current calculated path the player will attempt to walk to reach it's goal position.
  // If empty, the player should be standing still.
  const [path, setPath] = React.useState<IVector2[]>([]);

  const location = useLocation();

  React.useEffect(function addKeyboardListeners() {

    controller.clearKeysDown();

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

    window.addEventListener('keydown', keydownListener);
    window.addEventListener('keyup', keyupListener);
    return (() => {
      window.removeEventListener('keydown', keydownListener);
      window.removeEventListener('keyup', keyupListener);
      controller.clearKeysDown();
    });
  }, []);

  React.useEffect(function calculateInitialPosition() {
    const door = props.grid.doors.find(door => door.location === location.pathname);
    setTruePosition({ x: (door?.position.x ?? 0) * CELL_SIZE, y: (door?.position.y ?? 0) * CELL_SIZE });
  }, [ location, props.grid ]);

  React.useEffect(function calculatePathFromDirection() {
    if (controllerDirection == null) return;
    if (path.length > 0) return;
    const newPath = [];
    const targetPosition = calculatePositionInDirection(truePosition, controllerDirection)
    const targetCell = getCellAtPosition(targetPosition, props.grid);
    if (targetCell && targetCell.isTraversable === true) {
      newPath.push(targetPosition);
      setPath(newPath);
    }
  }, [ controllerDirection, path, truePosition ]);

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

  const handleGridClick = (clickLocation: IVector2 | null) => {
    if (clickLocation == null) return;
    setPath((path) => path.length > 0 ? path : calculatePathBetweenPositions(truePosition, clickLocation, props.grid));
  }

  return (
    <div className='nav-game-wrapper'>
      <NavGamePlayer />
      <NavGameGrid handleClick={handleGridClick} truePosition={truePosition} grid={props.grid} />
      <NavGameHud popupText={null} />
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