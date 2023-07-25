import { IProjectWithImages } from "../project/projectWithImages";

export interface IPreloadedAssets {
  myPhoto: HTMLImageElement | null,
  headerImages: {[key: string]: HTMLImageElement} | null,
  projectImages: IProjectWithImages[] | null,
  devIcons: HTMLImageElement[] | null,
  socialIcons: {[key: string]: HTMLImageElement} | null
  // isComplete: (preloadedAssets: IPreloadedAssets) => boolean
}

export class PreloadedAssets implements IPreloadedAssets {
  myPhoto: HTMLImageElement | null = null;
  headerImages: { [key: string]: HTMLImageElement; } | null = null;
  projectImages: IProjectWithImages[] | null = null;
  devIcons: HTMLImageElement[] | null = null;
  socialIcons: { [key: string]: HTMLImageElement; } | null = null;

  static isComplete(a: IPreloadedAssets): boolean {
    console.log(a);
    return (
      (a.myPhoto != null) &&
      (a.headerImages != null) &&
      (a.projectImages != null) &&
      (a.devIcons != null) &&
      (a.socialIcons != null)
    );
  };
}