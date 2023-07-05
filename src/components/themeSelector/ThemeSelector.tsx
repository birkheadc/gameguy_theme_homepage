import * as React from 'react';
import './ThemeSelector.css';
import ReactModal from 'react-modal';
import helpers from '../../helpers';

interface ThemeSelectorProps {
  isOpen: boolean,
  requestClose: () => void
}
/**
 * 
 * @param {} props
 * @returns {JSX.Element | null}
 */
function ThemeSelector(props: ThemeSelectorProps): JSX.Element | null {

  const [theme, setTheme] = React.useState<number | null>(null);

  React.useEffect(function getDocumentThemeOnMount() {
    const theme = helpers.theme.retrieveSiteThemeLocal();
    setTheme(theme);
  }, []);

  React.useEffect(function setDocumentTheme() {
    if (theme == null) return;
    helpers.theme.setSiteTheme(theme);
  }, [ theme ]);

  const handleClick = (theme: number) => {
    setTheme(theme);
    props.requestClose();
  }

  const handleHover = (theme: number) => {
    setTheme(theme);
  }

  return (
      <ReactModal className={'theme-selector-wrapper'} isOpen={props.isOpen} onRequestClose={props.requestClose}>
        <div>
          <h2>Game Guy</h2>
          <p>Choose a <span className='color-0'>c</span><span className='color-1'>o</span><span className='color-2'>l</span><span className='color-3'>o</span><span className='color-4'>r</span> theme.</p>
        </div>
        <div className='theme-buttons-wrapper'>
          {
            Array.from(Array(NUM_THEMES).keys()).map(
              index =>
              <button key={index} onClick={() => {handleClick(index)}} onPointerEnter={() => {handleHover(index)}} style={getStyleForIndex(index)}></button>
            )
          }
        </div>
      </ReactModal>
  );
}

export default ThemeSelector;

// Helpers

const NUM_THEMES = 13;

function getStyleForIndex(index: number): React.CSSProperties {
  const left = `var(--clr-${index.toString().padStart(2, '0')}-1)`;
  const right = `var(--clr-${index.toString().padStart(2, '0')}-2)`;
  return {
    backgroundImage: `linear-gradient(to top, ${left}, ${right})`
  }
}