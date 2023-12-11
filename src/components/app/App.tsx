import * as React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from '../pages/landing/LandingPage';
import ProjectsPage from '../pages/projects/ProjectsPage';
import Background from '../background/Background';
import ThemeSelector from '../themeSelector/ThemeSelector';
import NavBar from '../nav/navBar/NavBar';
import { useLocation } from 'react-router-dom';
import defaultGrid from '../nav/navGame/defaultGrid';
import NavGame from '../nav/navGame/NavGame';
import WelcomePage from '../pages/welcome/WelcomePage';
import preload from './preload';
import { IProjectWithImages } from '../../types/project/projectWithImages';
import ScrollToTop from '../shared/scrollToTop/ScrollToTop';
import AboutPage from '../pages/about/AboutPage';
import ContactPage from '../pages/contact/ContactPage';
import { IPreloadedAssets, PreloadedAssets } from '../../types/preloadedAssets/preloadedAssets';
import LoadingPage from '../pages/loading/LoadingPage';

interface AppProps {

}
/**
 * 
 * @param {} props
 * @returns {JSX.Element | null}
 */
function App(props: AppProps): JSX.Element | null {

  const [preloadedAssets, setPreloadedAssets] = React.useState<IPreloadedAssets>(new PreloadedAssets());

  const [showNav, setShowNav] = React.useState<boolean>(false);
  const [showThemeSelector, setShowThemeSelector] = React.useState<boolean>(false);
  
  const location = useLocation();

  React.useEffect(function closeModalsOnNavigate() {
    setShowNav(false);
    setShowThemeSelector(false);
  }, [ location ]);

  React.useEffect(function preloadAssetsOnMount() {
    preload.projects.loadProjects((projects: IProjectWithImages[]) => {
      setPreloadedAssets(p => {
        const newPreloadedAssets = {...p};
        const sortedProjects = projects.sort((a, b) => b.project.favoriteLevel - a.project.favoriteLevel);
        newPreloadedAssets.projectImages = sortedProjects;
        return newPreloadedAssets;
      });
    });
    preload.devicons.loadDevicons((images: HTMLImageElement[]) => {
      setPreloadedAssets(p => {
        const newPreloadedAssets = {...p};
        newPreloadedAssets.devIcons = images;
        return newPreloadedAssets;
      });
    });
    preload.headerImages.loadHeaderImages((images: {[key: string]: HTMLImageElement}) => {
      setPreloadedAssets(p => {
        const newPreloadedAssets = {...p};
        newPreloadedAssets.headerImages = images;
        return newPreloadedAssets;
      });
    });
    preload.socialicons.loadSocialicons((images: {[key: string]: HTMLImageElement}) => {
      setPreloadedAssets(p => {
        const newPreloadedAssets = {...p};
        newPreloadedAssets.socialIcons = images;
        return newPreloadedAssets;
      });
    });
    preload.welcomeImage.loadMyPhoto((image: HTMLImageElement) => {
      setPreloadedAssets(p => {
        const newPreloadedAssets = {...p};
        newPreloadedAssets.myPhoto = image;
        return newPreloadedAssets;
      });
    });
  }, []);

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
    <div className='fade-in'>
      <ScrollToTop />
      <Background />
      <NavBar toggleNav={toggleNav} toggleThemeSelector={toggleThemeSelector} />
      <ThemeSelector animate={false} isOpen={showThemeSelector} requestClose={() => setShowThemeSelector(false)} />
      <NavGame isOpen={showNav} requestClose={() => setShowNav(false)} grid={defaultGrid.grid} />

      <div className='full'>
          <main>
            {PreloadedAssets.isComplete(preloadedAssets) === false ? 
              <Routes>
                <Route path='/*' element={<LoadingPage />}></Route>
                <Route path='*' element={<LandingPage />} />
              </Routes>
              :
              <Routes>
                <Route path='/welcome' element={<WelcomePage myPhoto={preloadedAssets.myPhoto!} headerImage={preloadedAssets.headerImages!['welcome']} devIcons={preloadedAssets.devIcons!} openNav={toggleNav} />} />
                <Route path='/projects' element={<ProjectsPage headerImage={preloadedAssets.headerImages!['projects']} projects={preloadedAssets.projectImages!} />} />
                <Route path='/about' element={<AboutPage headerImage={preloadedAssets.headerImages!['about']} images={{ ditherExplanation: preloadedAssets.myPhoto! }} />} />
                <Route path='/contact' element={<ContactPage headerImage={preloadedAssets.headerImages!['contact']} socialIcons={preloadedAssets.socialIcons!} />} />
                <Route path='/' element={<LandingPage />} />
                <Route path='*' element={<Navigate replace={true} to={{ pathname: '/' }} />} />
              </Routes>
            }
          </main>
      </div>
    </div>
  );
}

export default App;

// Helpers
function removeFocusFromActiveElement() {
  const activeElement = document.activeElement as HTMLElement;
  activeElement.blur();
}