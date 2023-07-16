import * as React from 'react';
import './LandingPage.css';
import myPhoto from '../../../assets/images/pictures/me02.png';
import ProcessedImage from '../../shared/processedImage/ProcessedImage';
import headerImage from '../../../assets/images/headers/welcome.png';
import { ImageProcessShaderMode } from '../../../types/imageProcessShaderMode';
import ThemeSelector from '../../themeSelector/ThemeSelector';
import { useNavigate } from 'react-router-dom';

interface LandingPageProps {

}
/**
 * 
 * @param {} props
 * @returns {JSX.Element | null}
 */
function LandingPage(props: LandingPageProps): JSX.Element | null {

  const navigate = useNavigate();

  const handleRequestClose = () => {
    navigate('/welcome');
  };

  return (
    <div className='landing-page-wrapper page-wrapper'>
      <ThemeSelector isOpen={true} requestClose={handleRequestClose} />
    </div>
  );
}

export default LandingPage;