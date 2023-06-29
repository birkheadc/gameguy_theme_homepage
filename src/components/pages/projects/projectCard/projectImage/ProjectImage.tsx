import * as React from 'react';
import './ProjectImage.css'

interface IProjectImageProps {
  folder: string,
  images: string[]
}

/**
*
* @returns {JSX.Element | null}
*/
export default function ProjectImage(props: IProjectImageProps): JSX.Element | null {

  const url = process.env.PROJECTS_URL;

  return (
    <div className='project-image-wrapper'>
      <div className='tint'></div>
      {props.images.length > 0 && <img className='project-card-image' src={`${url}/static/images/${props.folder}${props.images[0]}`}></img>}
    </div>
  );
}