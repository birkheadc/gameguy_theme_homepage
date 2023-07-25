import * as React from 'react';
import './WelcomePage.css'
import ProcessedImage from '../../shared/processedImage/ProcessedImage';
import { ImageProcessShaderMode } from '../../../types/imageProcessShaderMode';
import DevIconsSlider from './devIconsSlider/DevIconsSlider';
import helpers from '../../../helpers';

interface IWelcomePageProps {
  headerImage: HTMLImageElement,
  myPhoto: HTMLImageElement,
  devIcons: HTMLImageElement[],
  openNav: () => void
}

/**
*
* @returns {JSX.Element | null}
*/
export default function WelcomePage(props: IWelcomePageProps): JSX.Element | null {

  const [icons, setIcons] = React.useState<HTMLImageElement[]>([]);

  React.useEffect(function randomizeIconsOnMount() {
    setIcons(helpers.algorithm.shuffleArray(props.devIcons));
  }, [props.devIcons]);

  return (
    <div className='welcome-page-wrapper page-wrapper'>
      <h1 className='hidden'>Welcome</h1>
      <ProcessedImage className='page-header' pixelateLevel={1} imageSrc={props.headerImage} shaderMode={ImageProcessShaderMode.NORMAL} />
      <div className='page-block'>
        <div className='welcome-message'>
          <div className='welcome-message-body'>
            <p>Hello there! Welcome to the world of CODéMON! My name is <span className='underline'>COLBY BIRKHEAD!</span> People call me the CODéMON PROF!<sup>*</sup></p>
            <div className='welcome-page-images' >
              <ProcessedImage className='welcome-page-image' pixelateLevel={1} imageSrc={props.myPhoto} shaderMode={ImageProcessShaderMode.NORMAL} />
              <DevIconsSlider devicons={icons}/>
            </div>
            <p>VISITOR! Your very own CODéMON legend is about to unfold! A world of dreams and adventures with CODéMON awaits! Let's go!</p>
            <button className='welcome-page-start-button' onClick={props.openNav}>Start</button>
          </div>
          <p className='disclaimer'><sup>*</sup> No one actually calls me the Codemon Prof, or the anything Prof for that matter.</p>
        </div>
      </div>
    </div>
  );
}