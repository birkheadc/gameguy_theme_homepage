import * as React from 'react';
import './ProjectCard.css'
import CollapsibleImplementation from '../../../shared/collapsibleImplementation/CollapsibleImplementation';
import TechnologiesDisplay from './technologiesDisplay/TechnologiesDisplay';
import ProjectImage from './projectImage/ProjectImage';
import { IProjectWithImages } from '../../../../types/project/projectWithImages';
import { useLanguage } from '../../../../hooks/useLanguage/useLanguage';

interface IProjectCardProps {
  project: IProjectWithImages,
}

/**
*
* @returns {JSX.Element | null}
*/
export default function ProjectCard(props: IProjectCardProps): JSX.Element | null {

  const { language } = useLanguage();

  const project = props.project.project;
  const images = props.project.images;

  return (
    <div className='project-card-wrapper'>
      <div className='project-card-header'>
        <h2>{project.name}</h2>
        <span className='project-card-description'>{project.shortDescriptions.find(desc => desc.language === language)?.content}</span>
      </div>
      <ProjectImage images={images} />
      <div>
        <div className='more-info-wrapper' id={getMoreInfoWrapperId(project.id)}>
          <CollapsibleImplementation scrollToElementId={getMoreInfoWrapperId(project.id)} triggerTitle='More Info'>
            <span className='project-card-description more-info-content'>{project.longDescriptions.find(desc => desc.language === language)?.content}</span>
            <TechnologiesDisplay technologies={project.technologies} />
          </CollapsibleImplementation>
        </div>
        <span className='project-card-links'><a href={project.site} target='_blank' rel='noopener noreferrer'>Visit Site</a><a href={project.source} target='_blank' rel='noopener noreferrer'>View Source</a></span>
      </div>
    </div>
  );
}

// Helpers

function getMoreInfoWrapperId(projectId: string) {
  return `moreInfo${projectId.replace(/\-/gi, '')}`;
}