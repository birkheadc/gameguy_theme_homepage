import * as React from 'react';
import './ProjectsPage.css';
import api from '../../../api';
import { IProject } from '../../../types/project';
import ProjectCard from './projectCard/ProjectCard';
import Carousel from '../../shared/carousel/Carousel';
import headerImage from '../../../assets/images/headers/projects.png';
import ProcessedImage from '../../shared/processedImage/ProcessedImage';

interface ProjectsPageProps {

}
/**
 * 
 * @param {} props
 * @returns {JSX.Element | null}
 */
function ProjectsPage(props: ProjectsPageProps): JSX.Element | null {

  const [projects, setProjects] = React.useState<IProject[]>([]);

  React.useEffect(function fetchProjectsOnMount() {
    (async function getAndSetProjects() {
      await api.projects.getAll()
        .then(result => setProjects(result.body ?? []));
    })();
  }, []);

  return (
    <div className='projects-page-wrapper page-wrapper'>
      <h1 className='hidden'>Projects</h1>
      <ProcessedImage className='page-header' imageSrc={headerImage} />
      <div className='page-block'>
        <Carousel rotateIntervalInMs={5000} >
          {projects.map(
            project =>
            <ProjectCard key={project.id} project={project} />
          )}
        </Carousel>
      </div>
    </div>
  );
}

export default ProjectsPage;