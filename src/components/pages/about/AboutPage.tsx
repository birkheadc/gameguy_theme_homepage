import * as React from 'react';
import './AboutPage.css';
import ProcessedImage from '../../shared/processedImage/ProcessedImage';
import { ImageProcessShaderMode } from '../../../types/imageProcessShaderMode';
import headerImage from '../../../assets/images/headers/about.png';

interface AboutPageProps {

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
      <ProcessedImage className='page-header' pixelateLevel={1} imageSrc={headerImage} shaderMode={ImageProcessShaderMode.NORMAL} />
    </div>
  );
}

export default AboutPage;