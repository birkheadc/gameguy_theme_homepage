import api from "../../../../api";
import { IProject } from "../../../../types/project/project";
import { IProjectWithImages } from "../../../../types/project/projectWithImages";

function loadProjects(callback: (projects: IProjectWithImages[]) => void) {
  api.projects.getAll()
    .then(result => {
      const projectsWithImages: IProjectWithImages[] = [];
      const projects: IProject[] = result.body ?? [];
      if (projects.length < 1) {
        callback([]);
      }
      const numProjects = projects.length;
      const projectsCallback = (projectWithImages: IProjectWithImages) => {
        projectsWithImages.push(projectWithImages);
        if (projectsWithImages.length >= numProjects) {
          callback(projectsWithImages);
        }
      }
      projects.forEach(project => {
        const images: HTMLImageElement[] = [];
        const numImages = project.imageUrls.length;
        if (numImages === 0) {
          projectsCallback({ project, images });
        }

        project.imageUrls.forEach(url => {
          const image: HTMLImageElement = new Image();
          image.src = url;
          image.crossOrigin = 'anonymous';
          image.onload = () => {
            images.push(image);
            if (images.length >= numImages) {
              projectsCallback({ project, images });
            }
          }
        });
      });
    }).catch(reason => {
      console.log(`Error: ${reason}`);
    });
}

export default {
  loadProjects
}