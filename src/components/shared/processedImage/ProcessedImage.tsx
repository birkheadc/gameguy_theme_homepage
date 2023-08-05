import * as React from 'react';
import './ProcessedImage.css';
import helpers from '../../../helpers';
import { ImageProcessShaderMode } from '../../../types/imageProcessShaderMode';
import { ImageProcessShaderEffect } from '../../../types/imageProcessShaderEffect';

interface ProcessedImageProps {
  className: string,
  imageSrc: string | HTMLImageElement,
  shaderMode: ImageProcessShaderMode,
  pixelateLevel: number,
  effect?: ImageProcessShaderEffect
}
/**
 * 
 * @param {} props
 * @returns {JSX.Element | null}
 */
function ProcessedImage(props: ProcessedImageProps): JSX.Element | null {

  const [image, setImage] = React.useState<HTMLImageElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(function setImageOnMount() {
    if (props.imageSrc instanceof HTMLImageElement) {
      setImage(props.imageSrc);
    } else {
      const image = new Image();
      image.src = props.imageSrc;
      image.crossOrigin = 'anonymous';
      image.onload = () => setImage(image);
    }
  }, [ props.imageSrc ]);

  React.useEffect(() => {
    (async function processAndDrawNewImageToCanvas() {
      if (image == null || canvasRef.current == null) return;
      await helpers.image.processAndDrawImageToCanvas(image, canvasRef.current, helpers.theme.getCurrentThemeColors(), props.pixelateLevel, props.shaderMode, props.effect);
    })();
  }, [ image, canvasRef ]);

  React.useEffect(function setEventListenerToReprocessImageOnThemeChange() {
    const listener = () => {
      if (image == null || canvasRef.current == null) return;
      helpers.image.processAndDrawImageToCanvas(image, canvasRef.current, helpers.theme.getCurrentThemeColors(), props.pixelateLevel, props.shaderMode, props.effect);
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

export default ProcessedImage;