import * as React from 'react';
import './AboutPage.css';
import ProcessedImage from '../../shared/processedImage/ProcessedImage';
import { ImageProcessShaderMode } from '../../../types/imageProcessShaderMode';
import TabbedWindows from '../../shared/tabbedWindows/TabbedWindows';
import TabbedWindow from '../../shared/tabbedWindows/tabbedWindow/TabbedWindow';
import AboutSite from './aboutSite/AboutSite';
import AboutMe from './aboutMe/AboutMe';
import AboutMyWork from './aboutMyWork/AboutMyWork';
import PageHeader from '../pageHeader/PageHeader';
import { useTranslation } from 'react-i18next';

interface AboutPageProps {
  headerImage: HTMLImageElement,
  images: {
    'ditherExplanation': HTMLImageElement,
  }
}
/**
 * 
 * @param {} props
 * @returns {JSX.Element | null}
 */
function AboutPage(props: AboutPageProps): JSX.Element | null {

  const { t } = useTranslation();

  return (
    <div className='about-page-wrapper page-wrapper'>
      <PageHeader pageName={'about'} headerImage={props.headerImage} />
      <div className='page-block'>
        <TabbedWindows className='about-page-tabs'>
          <TabbedWindow className='about-page-tab-window' tabName={t('aboutPage.thisSite.title')}>
            <AboutSite image={props.images.ditherExplanation}/>
          </TabbedWindow>
          <TabbedWindow className='about-page-tab-window' tabName={t('aboutPage.me.title')}>
            <AboutMe />
          </TabbedWindow>
          <TabbedWindow className='about-page-tab-window' tabName={t('aboutPage.myWork.title')}>
            <AboutMyWork />
          </TabbedWindow>
        </TabbedWindows>
      </div>
    </div>
  );
}

export default AboutPage;