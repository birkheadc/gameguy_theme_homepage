import * as React from 'react';
import './ProjectImage.css'
import helpers from '../../../../../helpers';
import ProcessedImage from '../../../../shared/processedImage/ProcessedImage';

interface IProjectImageProps {
  projectId: string,
  images: string[]
}

/**
*
* @returns {JSX.Element | null}
*/
export default function ProjectImage(props: IProjectImageProps): JSX.Element | null {

  return (
    <div className='project-image-wrapper'>
      {props.images.length > 0 && <ProcessedImage className='project-card-canvas' imageSrc={`${URL}/static/images/${props.projectId}${props.images[0]}`} />}
    </div>
  );
}

// Helpers

const URL = process.env.PROJECTS_URL;