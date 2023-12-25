import * as React from 'react';
import './NavGameNavBar.css'
import { IDoor } from '../../../../../types/door';

interface INavGameNavBarProps {
  doors: IDoor[],
  handleClick: (door: IDoor) => void
}

/**
*
* @returns {JSX.Element | null}
*/
export default function NavGameNavBar(props: INavGameNavBarProps): JSX.Element | null {
  return (
    <div className='nav-game-nav-bar-wrapper'>
      <ul>
        {props.doors.map(
          door =>
          <li key={`nav-game-nav-bar-wrapper-ul-li-${door.location}`}>
            <button className='nav-game-nav-bar-button' onClick={() => props.handleClick(door)}>{door.name}</button>
          </li>
        )}
        <li><a className='nav-game-nav-bar-button' href={process.env.RESUME_URL} target='_blank' rel='noreferrer'>resume</a></li>
      </ul>
    </div>
  );
}