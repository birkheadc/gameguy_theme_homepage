import * as React from 'react';
import './WelcomePage.css'
import ProcessedImage from '../../shared/processedImage/ProcessedImage';
import { ImageProcessShaderMode } from '../../../types/imageProcessShaderMode';
import DevIconsSlider from './devIconsSlider/DevIconsSlider';
import helpers from '../../../helpers';
import { useTranslation } from 'react-i18next';
import PageHeader from '../pageHeader/PageHeader';

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
  const {t} = useTranslation();

  React.useEffect(function randomizeIconsOnMount() {
    setIcons(helpers.algorithm.shuffleArray(props.devIcons));
  }, [props.devIcons]);

  return (
    <div className='welcome-page-wrapper page-wrapper'>
      <PageHeader pageName={'welcome'} headerImage={props.headerImage} />
      <div className='page-block'>
        <div className='welcome-message'>
          <div className='welcome-message-body'>
            <p>{t('welcomePage.parts.0')} <span className='underline'>COLBY BIRKHEAD!</span> {t('welcomePage.parts.1')}<sup>*</sup></p>
            <div className='welcome-page-images' >
              <ProcessedImage className='welcome-page-image' pixelateLevel={3} imageSrc={props.myPhoto} shaderMode={ImageProcessShaderMode.NORMAL} />
              <DevIconsSlider devicons={icons}/>
            </div>
            <p>{t('welcomePage.parts.2')}</p>
            <button className='welcome-page-start-button' onClick={props.openNav}>{t('start')}</button>
          </div>
          <p className='disclaimer'><sup>* </sup>{t('welcomePage.footnote')}</p>
        </div>
      </div>
    </div>
  );
}