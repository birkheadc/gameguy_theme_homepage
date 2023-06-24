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
      <h1 className='hidden'>Welcome</h1>
      <div aria-hidden='true' className='welcome-header page-header' role='img' title='Welcome'></div>
      <div className='page-block'>
        <p>This is Colby's new homepage.</p>
        <p>Currently a work in progess, but look at how well centered these divs are!</p>
      </div>
    </div>
  );
}

export default LandingPage;