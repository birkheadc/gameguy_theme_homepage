import * as React from 'react';
import './ProjectCard.css'
import { IProject } from '../../../../types/project';
import { env } from 'process';
import CollapsibleImplementation from '../../../shared/collapsibleImplementation/CollapsibleImplementation';
import TechnologiesDisplay from './technologiesDisplay/TechnologiesDisplay';
import ProjectImage from './projectImage/ProjectImage';

interface IProjectCardProps {
  project: IProject
}

/**
*
* @returns {JSX.Element | null}
*/
export default function ProjectCard(props: IProjectCardProps): JSX.Element | null {

  const project = props.project;

  return (
    <div className='project-card-wrapper'>
      <h2>{project.name}</h2>
      <span className='project-card-description'>{project.shortDescriptions.find(desc => desc.language === 'en')?.content}</span>
      {/* Todo: image tinting of some kind to keep in line with site theme */}
      <ProjectImage folder={project.id} images={project.imageNames} />
      <div className='more-info-wrapper'>
        <CollapsibleImplementation triggerTitle='More Info'>
          <span className='project-card-description more-info-content'>{project.longDescriptions.find(desc => desc.language === 'en')?.content}</span>
          <TechnologiesDisplay technologies={project.technologies} />
        </CollapsibleImplementation>
      </div>
      <span className='flexrow gap-2'><a href={project.site} target='_blank' rel='noopener noreferrer'>Visit</a><a href={project.source} target='_blank' rel='noopener noreferrer'>Source</a></span>
    </div>
  );
}