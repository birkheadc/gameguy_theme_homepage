import * as React from 'react';
import './WelcomePage.css'
import myPhoto from '../../../assets/images/pictures/me02.png';
import ProcessedImage from '../../shared/processedImage/ProcessedImage';
import headerImage from '../../../assets/images/headers/welcome.png';
import { ImageProcessShaderMode } from '../../../types/imageProcessShaderMode';
import DevIconsSlider from './devIconsSlider/DevIconsSlider';

interface IWelcomePageProps {
  devicons: HTMLImageElement[],
  openNav: () => void
}

/**
*
* @returns {JSX.Element | null}
*/
export default function WelcomePage(props: IWelcomePageProps): JSX.Element | null {

  // const [icons, setIcons] = React.useState<HTMLImageElement[]>([]);
  const imageRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (props.devicons.length > 0) {
      const div = imageRef.current;
      div?.appendChild(props.devicons[0]);
    }
  }, [props.devicons]);

  return (
    <div className='welcome-page-wrapper page-wrapper'>
      <h1 className='hidden'>Welcome</h1>
      <ProcessedImage className='page-header' pixelateLevel={1} imageSrc={headerImage} shaderMode={ImageProcessShaderMode.NORMAL} />
      <div className='page-block'>
        <div className='welcome-message'>
          <div className='welcome-message-body'>
            <p>Hello there! Welcome to the world of CODéMON! My name is <span className='underline'>COLBY BIRKHEAD!</span> People call me the CODéMON PROF!<sup>*</sup></p>
            <div className='welcome-page-images' >
              <ProcessedImage className='welcome-page-image' pixelateLevel={1} imageSrc={myPhoto} shaderMode={ImageProcessShaderMode.NORMAL} />
              <DevIconsSlider devicons={props.devicons}/>
              {/* <div ref={imageRef}></div> */}
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