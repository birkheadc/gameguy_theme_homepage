import * as React from 'react';
import './DevIconsSlider.css'
import Carousel from '../../../shared/carousel/Carousel';
import ProcessedImage from '../../../shared/processedImage/ProcessedImage';
import { ImageProcessShaderMode } from '../../../../types/imageProcessShaderMode';

interface IDevIconsSliderProps {
  devicons: HTMLImageElement[]
}

/**
*
* @returns {JSX.Element | null}
*/
export default function DevIconsSlider(props: IDevIconsSliderProps): JSX.Element | null {
  return (
    <div className='devicons-slider-wrapper'>
      {/* <img src={props.devicons.length > 0 ? props.devicons[0].src : ''}></img> */}
      <Carousel rotateIntervalInMs={2500} isControllable={false}>
        {props.devicons.map(
          (icon, index) =>
          <div key={`welcome-page-devicon-${index}`} className='devicon-wrapper'>
            <ProcessedImage className={'devicon-canvas'} imageSrc={icon} shaderMode={ImageProcessShaderMode.DARK} pixelateLevel={1.5} />
          </div>
        )}
      </Carousel>
    </div>
  );
}