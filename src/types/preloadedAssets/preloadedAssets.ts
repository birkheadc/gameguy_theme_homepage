import { IProjectWithImages } from "../project/projectWithImages";

export interface IPreloadedAssets {
  myPhoto: HTMLImageElement | null,
  headerImages: {[key: string]: HTMLImageElement} | null,
  projectImages: IProjectWithImages[] | null,
  devIcons: HTMLImageElement[] | null,
  socialIcons: {[key: string]: HTMLImageElement} | null
}

export class PreloadedAssets implements IPreloadedAssets {
  myPhoto: HTMLImageElement | null = null;
  headerImages: { [key: string]: HTMLImageElement; } | null = null;
  projectImages: IProjectWithImages[] | null = null;
  devIcons: HTMLImageElement[] | null = null;
  socialIcons: { [key: string]: HTMLImageElement; } | null = null;

  static isComplete(assets: IPreloadedAssets): boolean {
    return (
      (assets.myPhoto != null) &&
      (assets.headerImages != null) &&
      (assets.projectImages != null) &&
      (assets.devIcons != null) &&
      (assets.socialIcons != null)
    );
  };
}