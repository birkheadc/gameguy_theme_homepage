import * as React from 'react';
import './AboutPage.css';
import ProcessedImage from '../../shared/processedImage/ProcessedImage';
import { ImageProcessShaderMode } from '../../../types/imageProcessShaderMode';

interface AboutPageProps {
  headerImage: HTMLImageElement
}
/**
 * 
 * @param {} props
 * @returns {JSX.Element | null}
 */
function AboutPage(props: AboutPageProps): JSX.Element | null {
  return (
    <div className='about-page-wrapper page-wrapper'>
      <h1 className='hidden'>Projects</h1>
      <ProcessedImage className='page-header' pixelateLevel={1} imageSrc={props.headerImage} shaderMode={ImageProcessShaderMode.NORMAL} />
    </div>
  );
}

export default AboutPage;