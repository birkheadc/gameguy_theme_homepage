import * as React from 'react';
import './NavGamePlayer.css'
import { ISpriteAnimation } from '../../../../types/spriteAnimation';
import { Direction } from '../../../../types/direction';
import ProcessedSprite from '../../../shared/processedSprite/ProcessedSprite';
import playerSprite from '../../../../assets/images/player/player.png';

interface INavGamePlayerProps {
  isMoving: boolean,
  direction: Direction
}

/**
*
* @returns {JSX.Element | null}
*/
export default function NavGamePlayer(props: INavGamePlayerProps): JSX.Element | null {
  const [ animationName, setAnimationName ] = React.useState<string>('idle_down');

  React.useEffect(function setAnimationBasedOnProps() {
    const animation = getAnimationName(props.isMoving, props.direction);
    setAnimationName(animation);
  }, [ props.isMoving, props.direction ]);

  React.useEffect(() => {
  }, [ animationName ]);

  function getSprite(): JSX.Element | null {
    const animation = ANIMATIONS.find(a => a.name === animationName);
    if (animation == null) return null;
    return <ProcessedSprite pixelateLevel={1.5} imageSrc={playerSprite} animation={animation} />;
  }

  return (
    <div className='player-wrapper'>
      {getSprite()}
    </div>
  );
}

// Helpers

function getAnimationName(isMoving: boolean, direction: Direction): string {
  return `${isMoving ? 'move' : 'idle'}_${direction}`;
}

const ANIMATIONS: ISpriteAnimation[] = [
  {
    name: 'idle_up',
    frames: [ 4  ],
    frameRate: 1
  },
  {
    name: 'idle_right',
    frames: [ 8 ],
    frameRate: 1
  },
  {
    name: 'idle_down',
    frames: [ 1 ],
    frameRate: 1
  },
  {
    name: 'idle_left',
    frames: [ 6 ],
    frameRate: 1
  },
  {
    name: 'move_up',
    frames: [ 3, 4, 5, 4 ],
    frameRate: 8
  },
  {
    name: 'move_right',
    frames: [ 9, 8 ],
    frameRate: 8
  },
  {
    name: 'move_down',
    frames: [ 0, 1, 2, 1 ],
    frameRate: 8
  },
  {
    name: 'move_left',
    frames: [ 7, 6 ],
    frameRate: 8
  },

]