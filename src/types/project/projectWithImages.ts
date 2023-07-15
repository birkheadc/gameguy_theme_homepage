import { IProject } from "./project";

export interface IProjectWithImages {
  project: IProject,
  images: HTMLImageElement[]
}