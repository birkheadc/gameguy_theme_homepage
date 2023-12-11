import { BulletPoint } from "../bulletPoints";
import { IDescription } from "../description";

export interface IProject {
  id: string,
  name: string,
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