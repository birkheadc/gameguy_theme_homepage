import * as React from 'react';
import './AboutPage.css';
import ProcessedImage from '../../shared/processedImage/ProcessedImage';
import { ImageProcessShaderMode } from '../../../types/imageProcessShaderMode';
import TabbedWindows from '../../shared/tabbedWindows/TabbedWindows';
import TabbedWindow from '../../shared/tabbedWindows/tabbedWindow/TabbedWindow';

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
      <TabbedWindows>
        <TabbedWindow tabName='This Site'>
          <span>Here's the stuff about this site.</span>
        </TabbedWindow>
        <TabbedWindow tabName='Me'>
          <span>Here's the stuff about me.</span>
        </TabbedWindow>
        <TabbedWindow tabName='My Work'>
          <span>Here's the stuff about my work.</span>
          <span>Might be a good place to slip a link to my resume in! (Also build a resume page)</span>
        </TabbedWindow>
      </TabbedWindows>
    </div>
  );
}

export default AboutPage;