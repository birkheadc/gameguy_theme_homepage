import * as React from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from '../pages/landing/LandingPage';
import ProjectsPage from '../pages/projects/ProjectsPage';
import Background from '../background/Background';

interface AppProps {

}
/**
 * 
 * @param {} props
 * @returns {JSX.Element | null}
 */
function App(props: AppProps): JSX.Element | null {

  const [theme, setTheme] = React.useState<number>(0);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme.toString());
  }, [ theme ]);

  const changeTheme = (theme: number) => {
    setTheme(theme);
  }

  return (
    <>
      <Background />
      <div className='full'>
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