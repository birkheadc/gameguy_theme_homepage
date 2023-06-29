import * as React from 'react';
import './ProjectsPage.css';
import api from '../../../api';
import { IProject } from '../../../types/project';
import ProjectCard from './projectCard/ProjectCard';

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
    <div className='projects-page-wrapper'>
      <h1 className='hidden'>Projects</h1>
      <div aria-hidden='true' className='projects-header page-header' role='img' title='Projects'></div>
      <div className='page-block'>
        {projects.map(
          project =>
          <ProjectCard key={project.id} project={project} />
        )}
      </div>
    </div>
  );
}

export default ProjectsPage;