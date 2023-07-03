import * as React from 'react';
import './ProcessedSprite.css'
import helpers from '../../../helpers';
import { IFrame } from '../../../types/frame';

interface IProcessedSpriteProps {
  className: string,
  imageSrc: string,
  frame: IFrame
}

/**
*
* @returns {JSX.Element | null}
*/
export default function ProcessedSprite(props: IProcessedSpriteProps): JSX.Element | null {

  const [image, setImage] = React.useState<HTMLImageElement | null>(null);
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
      await helpers.image.processAndDrawImageToCanvas(image, canvasRef.current, helpers.theme.getCurrentThemeColors(), props.frame);
    })();
  }, [ image, canvasRef ]);

  React.useEffect(function setEventListenerToReprocessImageOnThemeChange() {
    const listener = () => {
      if (image == null || canvasRef.current == null) return;
      helpers.image.processAndDrawImageToCanvas(image, canvasRef.current, helpers.theme.getCurrentThemeColors(), props.frame);
    }
    window.addEventListener('onchangetheme', listener);
    return (() => {
      window.removeEventListener('onthemechange', listener);
    });
  }, [ image, canvasRef ]);

  return (
    <canvas className={props.className} ref={canvasRef}></canvas>
  );
}