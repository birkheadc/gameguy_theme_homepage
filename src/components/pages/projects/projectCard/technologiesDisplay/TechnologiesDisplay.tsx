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
      <h4>Technologies</h4>
      <ul>
        {technologies.map(
          technology =>
          <li key={technology}>{technology}</li>
        )}
      </ul>
    </div>
  );
}

// Helpers

const NUM_PER_ROW: number = 4;