import { IDescription } from "../description";

export interface IProject {
  id: string,
  name: string,
  shortDescriptions: IDescription[],
  longDescriptions: IDescription[],
  technologies: string[],
  site: string,
  source: string,
  favoriteLevel: number,
  imageNames: string[]
}