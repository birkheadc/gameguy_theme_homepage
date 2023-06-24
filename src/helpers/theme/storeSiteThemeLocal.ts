import getSiteTheme from "./getSiteTheme";

export default function storeSiteThemeLocal(theme?: number) {
  const _theme: number = theme ?? getSiteTheme();
  // Todo
}