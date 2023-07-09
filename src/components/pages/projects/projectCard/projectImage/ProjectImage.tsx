import * as React from 'react';
import './ProjectImage.css'
import ProcessedImage from '../../../../shared/processedImage/ProcessedImage';
import { ImageProcessShaderMode } from '../../../../../types/imageProcessShaderMode';

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
      {props.images.length > 0 && <ProcessedImage className='project-card-canvas' pixelateLevel={2} imageSrc={`${URL}/static/images/${props.projectId}${props.images[0]}`} shaderMode={ImageProcessShaderMode.DARK} />}
    </div>
  );
}

// Helpers

const URL = process.env.PROJECTS_URL;