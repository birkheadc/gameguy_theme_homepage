import { BulletPoint } from "../bulletPoints";
import { IDescription } from "../description";

export interface IProject {
  id: string,
  title: string,
  descriptions: {
    shortDescriptions: IDescription[],
    longDescriptions: IDescription[],
    bulletPoints: BulletPoint[]
  }
  technologies: string[],
  site: string,
  source: string,
  favoriteLevel: number,
  imageUrls: string[]
}