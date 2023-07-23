import * as React from 'react';
import './ContactPage.css';
import { ImageProcessShaderMode } from '../../../types/imageProcessShaderMode';
import ProcessedImage from '../../shared/processedImage/ProcessedImage';
import headerImage from '../../../assets/images/headers/contact.png';

import fbIcon from '../../../assets/images/devicons/facebook-original.png';
import liIcon from '../../../assets/images/devicons/linkedin-original.png';
import ghIcon from '../../../assets/images/devicons/github-original.png';
import ContactForm from './contactForm/ContactForm';
import { Comment } from '../../../types/comment';
import api from '../../../api';

interface ContactPageProps {
}
/**
 * 
 * @param {} props
 * @returns {JSX.Element | null}
 */
function ContactPage(props: ContactPageProps): JSX.Element | null {

  const handleSubmit = async (comment: Comment) => {
    const response = await api.comment.postComment(COMMENTS_URL, comment);
    if (response.status === 200) return true;
    return false;
  }

  return (
    <div className='contact-page-wrapper page-wrapper'>
      <h1 className='hidden'>Projects</h1>
      <ProcessedImage className='page-header' pixelateLevel={1} imageSrc={headerImage} shaderMode={ImageProcessShaderMode.NORMAL} />
      <div className='page-block contact-page-block'>
        <p className='justify'>
          If you'd like to get in touch, feel free to...
        </p>
        <p className='center'>Write me an email: <a draggable='false' href={'mailto:birkheadc@gmail.com'} >birkheadc@gmail.com</a></p>
        <div className='contact-page-socials-wrapper'>
          <p className='center'>Connect with me on social media:</p>
          <ul className='contact-page-socials-list'>
            <li><a draggable='false' href={'https://www.linkedin.com/in/colby-birkhead'} target='_blank' rel='noreferrer'><ProcessedImage className={'contact-page-social-icon'} imageSrc={liIcon} shaderMode={ImageProcessShaderMode.NORMAL} pixelateLevel={3} /></a></li>
            <li><a className='round' draggable='false' href={'https://github.com/birkheadc'} target='_blank' rel='noreferrer'><ProcessedImage className={'contact-page-social-icon'} imageSrc={ghIcon} shaderMode={ImageProcessShaderMode.NORMAL} pixelateLevel={3} /></a></li>
            <li><a draggable='false' href={'https://www.facebook.com/#!/profile.php?id=100000139877934'} target='_blank' rel='noreferrer'><ProcessedImage className={'contact-page-social-icon'} imageSrc={fbIcon} shaderMode={ImageProcessShaderMode.NORMAL} pixelateLevel={3} /></a></li>
          </ul>
        </div>
        <div className='contact-page-form-wrapper'>
          <p className='justify'>
            Or just leave a quick comment with the form below. I enjoy the comments, especially when they're kind.
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