import * as React from 'react';
import './ProjectImage.css'
import ProcessedImage from '../../../../shared/processedImage/ProcessedImage';
import { ImageProcessShaderMode } from '../../../../../types/imageProcessShaderMode';
import FadeCarousel from '../../../../shared/fadeCarousel/FadeCarousel';

interface IProjectImageProps {
  images: HTMLImageElement[]
}

/**
*
* @returns {JSX.Element | null}
*/
export default function ProjectImage(props: IProjectImageProps): JSX.Element | null {

  return (
    <div className='project-image-wrapper'>
      <FadeCarousel lingerTime={2000}>
        {props.images.map(
          image =>
          <ProcessedImage className='project-card-canvas' pixelateLevel={2} imageSrc={image} shaderMode={ImageProcessShaderMode.NORMAL} />        )}
      </FadeCarousel>
      {/* {props.images.length > 0 && <ProcessedImage className='project-card-canvas' pixelateLevel={2} imageSrc={props.images[0]} shaderMode={ImageProcessShaderMode.NORMAL} />} */}
    </div>
  );
}

// Helpers

const URL = process.env.PROJECTS_URL;