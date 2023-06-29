import * as React from 'react';
import './TechnologiesDisplay.css'

interface ITechnologiesDisplayProps {
  technologies: string[]
}

/**
*
* @returns {JSX.Element | null}
*/
export default function TechnologiesDisplay(props: ITechnologiesDisplayProps): JSX.Element | null {

  const technologies = props.technologies;

  return (
    <div className='technologies-display-wrapper'>
      <ul>
        {technologies.map(
          technology =>
          <li key={technology}>{technology}</li>
        )}
      </ul>
    </div>
  );
}