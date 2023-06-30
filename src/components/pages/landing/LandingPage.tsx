import * as React from 'react';
import './LandingPage.css';
import myPhoto from '../../../assets/images/pictures/me02.png';
import helpers from '../../../helpers';
import ProcessedImage from '../../shared/processedImage/ProcessedImage';

interface LandingPageProps {
  openNav: () => void
}
/**
 * 
 * @param {} props
 * @returns {JSX.Element | null}
 */
function LandingPage(props: LandingPageProps): JSX.Element | null {

  // const [image, setImage] = React.useState<HTMLImageElement | null>(null);
  // const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // React.useEffect(function setImageOnMount() {
  //   const image = new Image();
  //   image.src = myPhoto;
  //   image.crossOrigin = 'anonymous';
  //   image.onload = () => setImage(image);
  // }, []);

  // React.useEffect(() => {
  //   (async function processAndDrawNewImageToCanvas() {
  //     if (image == null || canvasRef.current == null) return;
  //     await helpers.image.processAndDrawImageToCanvas(image, canvasRef.current, helpers.theme.getCurrentThemeColors());
  //   })();
  // }, [ image, canvasRef ]);

  // React.useEffect(function setEventListenerToReprocessImageOnThemeChange() {
  //   const listener = () => {
  //     if (image == null || canvasRef.current == null) return;
  //     helpers.image.processAndDrawImageToCanvas(image, canvasRef.current, helpers.theme.getCurrentThemeColors());
  //   }
  //   window.addEventListener('onchangetheme', listener);
  //   return (() => {
  //     window.removeEventListener('onthemechange', listener);
  //   });
  // }, [ image, canvasRef ]);

  return (
    <div className='landing-page-wrapper page-wrapper'>
      <h1 className='hidden'>Welcome</h1>
      <div aria-hidden='true' className='welcome-header page-header' role='img' title='Welcome'></div>
      <div className='page-block'>
        <div className='welcome-message'>
          <div className='welcome-message-body'>
            <p>Hello there! Welcome to the world of RéACT! My name is <span className='underline'>COLBY BIRKHEAD!</span> People call me the RéACT PROF!*</p>
            {/* <canvas className='welcome-page-canvas' ref={canvasRef}></canvas> */}
            <ProcessedImage className='welcome-page-canvas' imageSrc={myPhoto} />
            <p>VISITOR! Your very own RéACT legend is about to unfold! A world of dreams and adventures with RéACT awaits! Let's go!</p>
            <button className='welcome-page-start-button' onClick={props.openNav}>Start</button>
          </div>
          <p className='disclaimer'>* No one actually calls me the React Prof.</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;