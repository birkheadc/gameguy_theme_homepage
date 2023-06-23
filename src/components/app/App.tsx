import * as React from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from '../pages/landing/LandingPage';
import ProjectsPage from '../pages/projects/ProjectsPage';
import Background from '../background/Background';
import ThemeSelector from '../themeSelector/ThemeSelector';
import NavBar from '../nav/navBar/NavBar';

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

  const toggleNav =() => {
    setShowNav(show => !show);
  }

  const toggleThemeSelector = () => {
    setShowThemeSelector(show => !show);
  }

  return (
    <>
      <Background />
      <NavBar toggleNav={toggleNav} toggleThemeSelector={toggleThemeSelector} />
      <div className='full'>
        <ThemeSelector isVisible={showThemeSelector} />
        <BrowserRouter>
          <main>
            <Routes>
              <Route path='/projects' element={<ProjectsPage />} />
              <Route path='/' element={<LandingPage />} />
              <Route path='*' element={<Navigate replace={true} to={{ pathname: '/' }} />} />
            </Routes>
          </main>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;