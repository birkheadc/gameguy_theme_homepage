import * as React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from '../pages/landing/LandingPage';
import ProjectsPage from '../pages/projects/ProjectsPage';
import Background from '../background/Background';
import ThemeSelector from '../themeSelector/ThemeSelector';
import NavBar from '../nav/navBar/NavBar';
import { useLocation } from 'react-router-dom';
import defaultGrid from '../nav/navGameOld/defaultGrid';
import NavGame from '../nav/navGame/NavGame';

interface AppProps {

}
/**
 * 
 * @param {} props
 * @returns {JSX.Element | null}
 */
function App(props: AppProps): JSX.Element | null {

  const [showNav, setShowNav] = React.useState<boolean>(false);
  const [showThemeSelector, setShowThemeSelector] = React.useState<boolean>(false);
  const location = useLocation();

  React.useEffect(function closeModalsOnNavigate() {
    setShowNav(false);
    setShowThemeSelector(false);
  }, [ location ]);

  const toggleNav = () => {
    // Remove focus from the button after pressing it.
    removeFocusFromActiveElement();
    setShowNav(show => !show);
    // Whether the nav is on or off, the theme selector should be closed.
    setShowThemeSelector(false);
  }

  const toggleThemeSelector = () => {
    // Remove focus from the button after pressing it.
    removeFocusFromActiveElement();
    setShowThemeSelector(show => !show);
    // Whether the theme selector is on or off, the nav should be closed.
    setShowNav(false);
  }

  return (
    <>
      <Background />
      <NavBar toggleNav={toggleNav} toggleThemeSelector={toggleThemeSelector} />
      <ThemeSelector isOpen={showThemeSelector} requestClose={toggleThemeSelector} />
      <NavGame isOpen={showNav} requestClose={toggleNav} grid={defaultGrid.grid} />

      <div className='full'>
          <main>
            <Routes>
              <Route path='/projects' element={<ProjectsPage />} />
              <Route path='/' element={<LandingPage openNav={toggleNav} />} />
              <Route path='*' element={<Navigate replace={true} to={{ pathname: '/' }} />} />
            </Routes>
          </main>
      </div>
    </>
  );
}

export default App;

// Helpers
function removeFocusFromActiveElement() {
  const activeElement = document.activeElement as HTMLElement;
  activeElement.blur();
}