import getSiteTheme from "./getSiteTheme";

export default function storeSiteThemeLocal(theme?: number) {
  const _theme: number = theme ?? getSiteTheme();
  window.localStorage.setItem('theme', _theme.toString());
}