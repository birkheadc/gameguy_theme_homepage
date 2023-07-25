import * as React from 'react';
import './ProjectsPage.css';
import ProjectCard from './projectCard/ProjectCard';
import Carousel from '../../shared/carousel/Carousel';
import ProcessedImage from '../../shared/processedImage/ProcessedImage';
import { ImageProcessShaderMode } from '../../../types/imageProcessShaderMode';
import { IProjectWithImages } from '../../../types/project/projectWithImages';

interface ProjectsPageProps {
  headerImage: HTMLImageElement,
  projects: IProjectWithImages[]
}
/**
 * 
 * @param {} props
 * @returns {JSX.Element | null}
 */
function ProjectsPage(props: ProjectsPageProps): JSX.Element | null {

  // const [projects, setProjects] = React.useState<IProject[]>([]);

  // React.useEffect(function fetchProjectsOnMount() {
  //   (async function getAndSetProjects() {
  //     await api.projects.getAll()
  //       .then(result => setProjects(result.body ?? []));
  //   })();
  // }, []);

  return (
    <div className='projects-page-wrapper page-wrapper'>
      <h1 className='hidden'>Projects</h1>
      <ProcessedImage className='page-header' pixelateLevel={1} imageSrc={props.headerImage} shaderMode={ImageProcessShaderMode.NORMAL} />
      <div className='page-block'>
        <div className='project-page-carousel-wrapper'>
          <Carousel isControllable={true} rotateIntervalInMs={5000} >
            {props.projects.map(
              project =>
              <ProjectCard key={project.project.id} project={project} />
            )}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default ProjectsPage;