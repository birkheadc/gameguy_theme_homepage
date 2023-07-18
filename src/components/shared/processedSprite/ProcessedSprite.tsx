import * as React from 'react';
import './ProcessedSprite.css'
import helpers from '../../../helpers';
import { IFrame } from '../../../types/frame';
import { ISpriteAnimation } from '../../../types/spriteAnimation';
import { ImageProcessShaderMode } from '../../../types/imageProcessShaderMode';
import { IVector2 } from '../../../types/vectory2';

interface IProcessedSpriteProps {
  imageSrc: string,
  animation: ISpriteAnimation,
  pixelateLevel: number
}

/**
*
* @returns {JSX.Element | null}
*/
export default function ProcessedSprite(props: IProcessedSpriteProps): JSX.Element | null {

  // const [animationDelta, setAnimationDelta] = React.useState<number>(0);
  const [image, setImage] = React.useState<HTMLImageElement | null>(null);
  const [currentAnimationFrame, setCurrentAnimationFrame] = React.useState<number>(0);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(function setImageOnMount() {
    const image = new Image();
    image.src = props.imageSrc;
    image.crossOrigin = 'anonymous';
    image.onload = () => setImage(image);
  }, [ props.imageSrc ]);

  React.useEffect(() => {
    (async function processAndDrawNewImageToCanvas() {
      if (image == null || canvasRef.current == null) return;
      await helpers.image.processAndDrawImageToCanvas(image, canvasRef.current, helpers.theme.getCurrentThemeColors(), props.pixelateLevel, ImageProcessShaderMode.NORMAL);
    })();
  }, [ image, canvasRef ]);

  React.useEffect(function setEventListenerToReprocessImageOnThemeChange() {
    const listener = () => {
      if (image == null || canvasRef.current == null) return;
      helpers.image.processAndDrawImageToCanvas(image, canvasRef.current, helpers.theme.getCurrentThemeColors(), props.pixelateLevel, ImageProcessShaderMode.NORMAL);
    }
    window.addEventListener('onchangetheme', listener);
    return (() => {
      window.removeEventListener('onthemechange', listener);
    });
  }, [ image, canvasRef ]);

  React.useEffect(function setIntervalToPlayAnimation() {

    setCurrentAnimationFrame(0);
    let time = new Date().getTime();
    let delta = 0;
    const interval = setInterval(() => {
      const newTime = new Date().getTime();
      delta += newTime - time;
      time = newTime;

      const msPerFrame = 1000 / props.animation.frameRate;
      
      if ( delta >= msPerFrame)  {
        delta -= msPerFrame;
        if (props.animation)
        setCurrentAnimationFrame(frame => ((frame + 1 >= props.animation.frames.length) ? 0 : frame + 1));
      }

    }, 10);

    return (() => {
      clearInterval(interval);
    });
  }, [ props.animation ]);

  return (
    <div className='processed-sprite-wrapper'>
      <div className='processed-sprite-inner-wrapper' style={getWrapperStyle(props.animation.frames[currentAnimationFrame])}>
        <canvas className='processed-sprite-canvas' ref={canvasRef}></canvas>
      </div>
    </div>
  );
}

// Helpers

const CELL_SIZE = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--size-nav-cell') || '0');

function getWrapperStyle(frame: number): React.CSSProperties {
  return {
    transform: `translate(${(frame) * (CELL_SIZE + 1) * -1}px, 0px)`
  }
}