import * as React from 'react';
import './PageHeader.css'
import ProcessedImage from '../../shared/processedImage/ProcessedImage';
import { ImageProcessShaderMode } from '../../../types/imageProcessShaderMode';

interface IPageHeaderProps {
  pageName: string,
  headerImage: HTMLImageElement
}

/**
*
* @returns {JSX.Element | null}
*/
export default function PageHeader(props: IPageHeaderProps): JSX.Element | null {
  return (
    <>
      <h1 className='page-header'>{props.pageName}</h1>
      <ProcessedImage className='page-header' pixelateLevel={2} imageSrc={props.headerImage} shaderMode={ImageProcessShaderMode.NORMAL} />
    </>
    );
}