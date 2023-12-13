import * as React from 'react';
import './LandingPage.css';
import myPhoto from '../../../assets/images/pictures/me02.png';
import ProcessedImage from '../../shared/processedImage/ProcessedImage';
import headerImage from '../../../assets/images/headers/welcome.png';
import { ImageProcessShaderMode } from '../../../types/imageProcessShaderMode';
import ThemeSelector from '../../themeSelector/ThemeSelector';
import { useNavigate } from 'react-router-dom';

interface LandingPageProps {
  isLoading: boolean,
  openThemeSelector: () => void
}
/**
 * 
 * @param {} props
 * @returns {JSX.Element | null}
 */
function LandingPage(props: LandingPageProps): JSX.Element | null {

  const navigate = useNavigate();

  React.useEffect(function navigateToWelcomeWhenDoneLoading() {
    if (props.isLoading === false) {
      navigate('/welcome');
    }
  }, [ props.isLoading ]);

  return (
    <div className='landing-page-wrapper page-wrapper'>
      <h1>Loading...</h1>
    </div>
  );
}

export default LandingPage;