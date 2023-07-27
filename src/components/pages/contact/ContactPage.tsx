import * as React from 'react';
import './ContactPage.css';
import { ImageProcessShaderMode } from '../../../types/imageProcessShaderMode';
import ProcessedImage from '../../shared/processedImage/ProcessedImage';

import ContactForm from './contactForm/ContactForm';
import { Comment } from '../../../types/comment';
import api from '../../../api';
import { useTranslation } from 'react-i18next';

interface ContactPageProps {
  headerImage: HTMLImageElement,
  socialIcons: {[key: string]: HTMLImageElement}
}
/**
 * 
 * @param {} props
 * @returns {JSX.Element | null}
 */
function ContactPage(props: ContactPageProps): JSX.Element | null {

  const { t } = useTranslation();

  const handleSubmit = async (comment: Comment) => {
    const response = await api.comment.postComment(COMMENTS_URL, comment);
    if (response.status === 200) return true;
    return false;
  }

  return (
    <div className='contact-page-wrapper page-wrapper'>
      <h1 className='hidden'>Projects</h1>
      <ProcessedImage className='page-header' pixelateLevel={1} imageSrc={props.headerImage} shaderMode={ImageProcessShaderMode.NORMAL} />
      <div className='page-block contact-page-block'>
        <p className='justify'>
          {t('contactPart1')}
        </p>
        <p className='center'>{t('contactPart2')} <a draggable='false' href={'mailto:birkheadc@gmail.com'} >birkheadc@gmail.com</a></p>
        <div className='contact-page-socials-wrapper'>
          <p className='center'>{t('contactPart3')}</p>
          <ul className='contact-page-socials-list'>
            <li><a draggable='false' href={'https://www.linkedin.com/in/colby-birkhead'} target='_blank' rel='noreferrer'><ProcessedImage className={'contact-page-social-icon'} imageSrc={props.socialIcons['linkedin']} shaderMode={ImageProcessShaderMode.NORMAL} pixelateLevel={3} /></a></li>
            <li><a className='round' draggable='false' href={'https://github.com/birkheadc'} target='_blank' rel='noreferrer'><ProcessedImage className={'contact-page-social-icon'} imageSrc={props.socialIcons['github']} shaderMode={ImageProcessShaderMode.NORMAL} pixelateLevel={3} /></a></li>
            <li><a draggable='false' href={'https://www.facebook.com/#!/profile.php?id=100000139877934'} target='_blank' rel='noreferrer'><ProcessedImage className={'contact-page-social-icon'} imageSrc={props.socialIcons['facebook']} shaderMode={ImageProcessShaderMode.NORMAL} pixelateLevel={3} /></a></li>
          </ul>
        </div>
        <div className='contact-page-form-wrapper'>
          <p className='justify'>
            {t('contactPart4')}
          </p>
          <ContactForm submit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default ContactPage;

// Helpers
const COMMENTS_URL = 'https://comments.birkheadc.me';