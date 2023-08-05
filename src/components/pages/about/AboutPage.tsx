import * as React from 'react';
import './AboutPage.css';
import ProcessedImage from '../../shared/processedImage/ProcessedImage';
import { ImageProcessShaderMode } from '../../../types/imageProcessShaderMode';
import TabbedWindows from '../../shared/tabbedWindows/TabbedWindows';
import TabbedWindow from '../../shared/tabbedWindows/tabbedWindow/TabbedWindow';
import AboutSite from './aboutSite/AboutSite';
import AboutMe from './aboutMe/AboutMe';
import AboutMyWork from './aboutMyWork/AboutMyWork';

interface AboutPageProps {
  headerImage: HTMLImageElement,
  images: {
    'ditherExplanation': HTMLImageElement,
  }
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
      <div className='page-block'>
        <TabbedWindows className='about-page-tabs'>
          <TabbedWindow className='about-page-tab-window' tabName='This Site'>
            <AboutSite image={props.images.ditherExplanation}/>
          </TabbedWindow>
          <TabbedWindow className='about-page-tab-window' tabName='Me'>
            <AboutMe />
          </TabbedWindow>
          <TabbedWindow className='about-page-tab-window' tabName='My Work'>
            <AboutMyWork />
          </TabbedWindow>
        </TabbedWindows>
      </div>
    </div>
  );
}

export default AboutPage;