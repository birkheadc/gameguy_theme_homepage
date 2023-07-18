import * as React from 'react';
import './ThemeSelectorTitle.css'

interface IThemeSelectorTitleProps {

}

/**
*
* @returns {JSX.Element | null}
*/
export default function ThemeSelectorTitle(props: IThemeSelectorTitleProps): JSX.Element | null {

  const [innerWrapperStyle, setInnerWrapperStyle] = React.useState<React.CSSProperties>({ transform: 'translate(-33%, 0%)'});

  React.useEffect(function animateInnerStyleOnMount() {
    setInnerWrapperStyle({
      transform: 'translate(33%, 0%)'
    });
  }, []);

  return (
    <div className='theme-selector-title-wrapper'>
      <div className='theme-selector-title-inner-wrapper' style={innerWrapperStyle}>
        <div className='theme-selector-title-background'></div>
        <div className='theme-selector-title-background'></div>
        <div className='theme-selector-title-background'></div>
        <div className='theme-selector-title-background'></div>
        <div className='theme-selector-title-background'></div>
        <div className='theme-selector-title-background'></div>
        <div className='theme-selector-title-background'></div>
      </div>
      <h2>Game Guy</h2>
    </div>
  );
}

// Helpers

function calculateInnerWrapperStyle(): React.CSSProperties {
  return {

  }
}