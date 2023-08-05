import * as React from 'react';
import './AboutMe.css'

interface IAboutMeProps {

}

/**
*
* @returns {JSX.Element | null}
*/
export default function AboutMe(props: IAboutMeProps): JSX.Element | null {
  return (
    <div className='about-me-wrapper'>
      <p>My name is Colby Birkhead.</p>
      <p>I'm an American expat.</p>
      <p>I studied Linguistics at Nagoya University in Japan, and now own and run a small business with my wife on a coastal island in South Korea.</p>
      <p>I like working with computers, games of all kinds, and reading.</p>
    </div>
  );
}