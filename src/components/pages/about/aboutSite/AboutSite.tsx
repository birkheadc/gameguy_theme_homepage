import * as React from 'react';
import './AboutSite.css'
import CollapsibleImplementation from '../../../shared/collapsibleImplementation/CollapsibleImplementation';
import ProcessedImage from '../../../shared/processedImage/ProcessedImage';
import { ImageProcessShaderMode } from '../../../../types/imageProcessShaderMode';
import { ImageProcessShaderEffect } from '../../../../types/imageProcessShaderEffect';
import { useTranslation } from 'react-i18next';

interface IAboutSiteProps {
  image: HTMLImageElement
}

/**
*
* @returns {JSX.Element | null}
*/
export default function AboutSite(props: IAboutSiteProps): JSX.Element | null {

  const { t } = useTranslation();

  return (
    <div className='about-site-wrapper'>
      <div className="about-block-wrapper">
        <p>{t('aboutPage.thisSite.main.parts.0')}</p>
        <p>{t('aboutPage.thisSite.main.parts.1')}</p>
        <p>{t('aboutPage.thisSite.main.parts.2')}</p>
        <p>{t('aboutPage.thisSite.main.parts.3')} <a href='https://github.com/birkheadc/gameguy_theme_homepage' target='_blank' rel='noreferrer'>{t('aboutPage.thisSite.main.here')}</a> {t('aboutPage.thisSite.main.parts.4')}</p>
      </div>
      <div className='about-site-features-wrapper'>
        <h2>{t('aboutPage.thisSite.main.parts.5')}</h2>
        <CollapsibleImplementation collapseOnOpenOther={true} triggerClassName={'about-site-collapsible-trigger'} triggerTitle={t('aboutPage.thisSite.colorScheme.title')} id={'gameboy-color-schemes'}>
          <div className='about-block-wrapper' id='gameboy-color-schemes'>
            {(t('aboutPage.thisSite.colorScheme.parts', { returnObjects: true }) as Array<string>).map(
              part =>
              <p key={part}>{part}</p>
            )}
          </div>
        </CollapsibleImplementation>
        <CollapsibleImplementation collapseOnOpenOther={true} triggerClassName={'about-site-collapsible-trigger'} triggerTitle={t('aboutPage.thisSite.ditheringEffect.title')} id={'dither-effect'}>
          <div className="about-block-wrapper" id='dither-effect'>
            {(t('aboutPage.thisSite.ditheringEffect.parts', { returnObjects: true }) as Array<string>).slice(0, 5).map(
              part =>
              <p key={part}>{part}</p>
            )}
            <ProcessedImage className={'dither-explanation-image'} imageSrc={props.image} shaderMode={ImageProcessShaderMode.NORMAL} effect={ImageProcessShaderEffect.GREYSCALE} pixelateLevel={DITHER_EXPLANATION_IMAGE_PIXELATE_LEVEL} />
            <p>{t('aboutPage.thisSite.ditheringEffect.parts.5')}</p>
            <ProcessedImage className={'dither-explanation-image'} imageSrc={props.image} shaderMode={ImageProcessShaderMode.NORMAL} effect={ImageProcessShaderEffect.BAND} pixelateLevel={DITHER_EXPLANATION_IMAGE_PIXELATE_LEVEL} />
            <p>{t('aboutPage.thisSite.ditheringEffect.parts.6')}</p>
            <ProcessedImage className={'dither-explanation-image'} imageSrc={props.image} shaderMode={ImageProcessShaderMode.NORMAL} effect={ImageProcessShaderEffect.SHADE} pixelateLevel={DITHER_EXPLANATION_IMAGE_PIXELATE_LEVEL} />
            <p>{t('aboutPage.thisSite.ditheringEffect.parts.7')}</p>
            <ProcessedImage className={'dither-explanation-image'} imageSrc={props.image} shaderMode={ImageProcessShaderMode.NORMAL} effect={ImageProcessShaderEffect.DITHER} pixelateLevel={DITHER_EXPLANATION_IMAGE_PIXELATE_LEVEL} />
            {(t('aboutPage.thisSite.ditheringEffect.parts', { returnObjects: true }) as Array<string>).slice(8).map(
              part =>
              <p key={part}>{part}</p>
            )}
          </div>
        </CollapsibleImplementation>
        <CollapsibleImplementation collapseOnOpenOther={true} triggerClassName={'about-site-collapsible-trigger'} triggerTitle={t('aboutPage.thisSite.navigationGame.title')} id={'gameboy-style-navigation'}>
          <div className="about-block-wrapper" id='gameboy-style-navigation'>
            {(t('aboutPage.thisSite.navigationGame.parts', { returnObjects: true }) as Array<string>).map(
              part =>
              <p key={part}>{part}</p>
            )}
          </div>
        </CollapsibleImplementation>
      </div>
    </div>
  );
}

// Helpers

const DITHER_EXPLANATION_IMAGE_PIXELATE_LEVEL = 1.5;