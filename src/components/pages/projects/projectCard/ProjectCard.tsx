import * as React from 'react';
import './ProjectCard.css'
import { IProject } from '../../../../types/project/project';
import { env } from 'process';
import CollapsibleImplementation from '../../../shared/collapsibleImplementation/CollapsibleImplementation';
import TechnologiesDisplay from './technologiesDisplay/TechnologiesDisplay';
import ProjectImage from './projectImage/ProjectImage';
import { url } from 'inspector';
import { IProjectWithImages } from '../../../../types/project/projectWithImages';

interface IProjectCardProps {
  project: IProjectWithImages,
}

/**
*
* @returns {JSX.Element | null}
*/
export default function ProjectCard(props: IProjectCardProps): JSX.Element | null {

  const project = props.project.project;
  const images = props.project.images;

  return (
    <div className='project-card-wrapper'>
      <div className='project-card-header'>
        <h2>{project.name}</h2>
        <span className='project-card-description'>{project.shortDescriptions.find(desc => desc.language === 'en')?.content}</span>
      </div>
      {/* Todo: image tinting of some kind to keep in line with site theme */}
      <ProjectImage images={images} />
      <div>
        <div className='more-info-wrapper' id={getMoreInfoWrapperId(project.id)}>
          <CollapsibleImplementation scrollToElementId={getMoreInfoWrapperId(project.id)} triggerTitle='More Info'>
            <span className='project-card-description more-info-content'>{project.longDescriptions.find(desc => desc.language === 'en')?.content}</span>
            <TechnologiesDisplay technologies={project.technologies} />
          </CollapsibleImplementation>
        </div>
        <span className='project-card-links'><a href={project.site} target='_blank' rel='noopener noreferrer'>Visit</a><a href={project.source} target='_blank' rel='noopener noreferrer'>Source</a></span>
      </div>
    </div>
  );
}

// Helpers

function getMoreInfoWrapperId(projectId: string) {
  return `moreInfo${projectId.replace(/\-/gi, '')}`;
}