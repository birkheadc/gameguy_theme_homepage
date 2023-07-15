import api from "../../../../api";
import { IProject } from "../../../../types/project/project";
import { IProjectWithImages } from "../../../../types/project/projectWithImages";

const URL = process.env.PROJECTS_URL;

async function loadProjects(callback: (projects: IProjectWithImages[]) => void) {
  api.projects.getAll()
    .then(result => {
      const projectsWithImages: IProjectWithImages[] = [];
      const projects: IProject[] = result.body ?? [];
      const numProjects = projects.length;
      const projectsCallback = (projectWithImages: IProjectWithImages) => {
        projectsWithImages.push(projectWithImages);
        if (projectsWithImages.length >= numProjects) {
          callback(projectsWithImages);
        }
      }
      projects.forEach(project => {
        const images: HTMLImageElement[] = [];
        const numImages = project.imageNames.length;

        project.imageNames.forEach(imageName => {
          const image: HTMLImageElement = new Image();
          image.src = `${URL}/static/images/${project.id}${imageName}`;
          image.crossOrigin = 'anonymous';
          image.onload = () => {
            images.push(image);
            if (images.length >= numImages) {
              projectsCallback({ project, images });
            }
          }
        });
      });
    });
}

export default {
  loadProjects
}