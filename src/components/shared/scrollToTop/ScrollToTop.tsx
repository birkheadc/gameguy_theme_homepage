import * as React from 'react';
import { useLocation } from 'react-router-dom';

interface IScrollToTopProps {

}

/**
*
* @returns {JSX.Element | null}
*/
export default function ScrollToTop(props: IScrollToTopProps): JSX.Element | null {

  const location = useLocation();

  React.useEffect(function scrollToTopOnLocationChange() {
    window.scrollTo(0, 0);
  }, [ location ]);
  
  return (
    null
  );
}