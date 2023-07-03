import * as React from 'react';
import './Player.css'
import { IGrid } from '../../../../types/grid';
import playerSprite from '../../../../assets/images/player/player.png';
import ProcessedSprite from '../../../shared/processedSprite/ProcessedSprite';
import { Direction } from '../../../../types/direction';
import { Dir } from 'fs';

interface IPlayerProps {
  grid: IGrid
}

/**
*
* @returns {JSX.Element | null}
*/
export default function Player(props: IPlayerProps): JSX.Element | null {

  const [position, setPosition] = React.useState<{ x: number, y: number}>(props.grid.playerStartCell);
  const [targetPosition, setTargetPosition] = React.useState<{ x: number, y: number}>(props.grid.playerStartCell);
  const [isMoving, setMoving] = React.useState<boolean>(false);

  const [keyDown, setKeydown] = React.useState<Set<string>>(new Set<string>());

  const SPEED = {
    DISTANCE_X: 1 / props.grid.cellSize.x,
    DISTANCE_Y: 1 / props.grid.cellSize.y,
    INTERVAL: 1
  }
  
  React.useEffect(function addIntervalToAttemptToMoveIfKeyIsDown() {
    console.log('Keys: ', [...keyDown]);
    const interval = setInterval(() => {
      if (keyDown.size > 0) {
        const direction = getDirectionFromKey([...keyDown][keyDown.size - 1]);
        if (direction) {
          move(direction, position, isMoving);
        }
      }
    }, SPEED.INTERVAL);
    return (() => {
      clearInterval(interval);
    })
  }, [ keyDown, position, isMoving ]);

  React.useEffect(function addEventListenersToAlwaysGetCurrentKeydown() {
    const keydownListener = (event: KeyboardEvent) => {
      if (validDirectionKeys.includes(event.key) === false) return;
      event.preventDefault();
      setKeydown(keys => new Set<string>([...keys, event.key]));
    }
    const keyupListener = (event: KeyboardEvent) => {
      if (validDirectionKeys.includes(event.key) === false) return;
      setKeydown(keys => new Set([...keys].filter(key => key !== event.key)));
    }
    window.addEventListener('keydown', keydownListener);
    window.addEventListener('keyup', keyupListener);
    return (() => {
      window.removeEventListener('keydown', keydownListener);
      window.removeEventListener('keyup', keyupListener);
    })
  }, []);

  React.useEffect(function addIntervalToMoveTowardTargetPosition() {
    const interval = setInterval(() => {
      if (position.x < targetPosition.x) {
        setPosition(p => ({ x: Math.min(p.x + SPEED.DISTANCE_X, targetPosition.x), y: p.y }));
      } else if (position.x > targetPosition.x) {
        setPosition(p => ({ x: Math.max(p.x - SPEED.DISTANCE_X, targetPosition.x), y: p.y }));
      } else if (position.y < targetPosition.y) {
        setPosition(p => ({ x: p.x, y: Math.min(p.y + SPEED.DISTANCE_Y, targetPosition.y) }));
      } else if (position.y > targetPosition.y) {
        setPosition(p => ({ x: p.x, y: Math.max(p.y - SPEED.DISTANCE_Y, targetPosition.y) }));
      } else {
        setMoving(false);
        clearInterval(interval);
      }
    }, SPEED.INTERVAL);

    return (() => {
      clearInterval(interval);
    })
  }, [ position, targetPosition ]);

  const move = (direction: Direction, currentPosition: { x: number, y: number}, isMoving: boolean ) => {
    if (isMoving === false) {
      setMoving(true);
      setTargetPosition(getTargetPosition(currentPosition, direction));
    }
  }

  return (
    <div className='player-wrapper' style={getPlayerStyle(props.grid.cellSize, position)}>
      <ProcessedSprite imageSrc={playerSprite} className='player-sprite' frame={{ frame: 1, total: 10 }} />
    </div>
  );
}

// Helpers
function getPlayerStyle(position: { x: number, y: number}): React.CSSProperties {
  
  const width = document.documentElement.style.getPropertyValue('--size-cell-width');
  const height = document.documentElement.style.getPropertyPriority('--size-cell-height');

  return {
    top: `${position.y * parseInt(height)}px`,
    left: `${position.x * parseInt(width)}px`,
    height: `${parseInt(height)}px`,
    width: `${parseInt(width)}px`
  }
}

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

function getTargetPosition(currentPosition: { x: number, y: number }, direction: Direction) {
  switch (direction) {
    case Direction.UP:
      return { x: currentPosition.x, y: currentPosition.y - 1};
    case Direction.RIGHT:
      return { x: currentPosition.x + 1, y: currentPosition.y };
    case Direction.DOWN:
      return { x: currentPosition.x, y: currentPosition.y + 1};
    case Direction.LEFT:
      return { x: currentPosition.x - 1, y: currentPosition.y};
  }
}

const validDirectionKeys = [
  'w',
  'd',
  's',
  'a',
  'ArrowUp',
  'ArrowRight',
  'ArrowDown',
  'ArrowLeft'
]