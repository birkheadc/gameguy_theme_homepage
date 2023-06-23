import * as React from 'react';
import './ThemeSelector.css';

interface ThemeSelectorProps {
  isVisible: boolean
}
/**
 * 
 * @param {} props
 * @returns {JSX.Element | null}
 */
function ThemeSelector(props: ThemeSelectorProps): JSX.Element | null {

  const [theme, setTheme] = React.useState<number>(0);

  React.useEffect(function setDocumentTheme() {
    document.documentElement.setAttribute('data-theme', theme.toString());
  }, [ theme ]);

  return (
    <div className='theme-selector-wrapper' style={getStyleForWrapper(props.isVisible)}>
      <div>
        <h2>Game Guy</h2>
        <p>Choose a color theme.</p>
      </div>
      <div className='theme-buttons-wrapper'>
        {
          Array.from(Array(12).keys()).map(
            index =>
            <button key={index} onClick={() => {setTheme(index)}} style={getStyleForIndex(index)}></button>
          )
        }
      </div>
    </div>
  );
}

export default ThemeSelector;

// Helpers
function getStyleForIndex(index: number): React.CSSProperties {
  const left = `var(--clr-${index.toString().padStart(2, '0')}-1)`;
  const right = `var(--clr-${index.toString().padStart(2, '0')}-2)`;
  return {
    backgroundImage: `linear-gradient(to top, ${left}, ${right})`
  }
}

function getStyleForWrapper(isVisible: boolean): React.CSSProperties {
  return {
    opacity: isVisible ? 1 : 0,
    pointerEvents: isVisible ? 'all' : 'none'
  }
}