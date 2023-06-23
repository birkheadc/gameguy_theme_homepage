import * as React from 'react';
import './LandingPage.css';

interface LandingPageProps {

}
/**
 * 
 * @param {} props
 * @returns {JSX.Element | null}
 */
function LandingPage(props: LandingPageProps): JSX.Element | null {
  return (
    <div className='landing-page-wrapper'>
      <h1>Welcome!</h1>
    </div>
  );
}

export default LandingPage;