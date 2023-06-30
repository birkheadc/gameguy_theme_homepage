import storeSiteThemeLocal from "./storeSiteThemeLocal";

export default function setSiteTheme(theme: number) {
  document.documentElement.setAttribute('data-theme', theme.toString());
  window.dispatchEvent(new Event('onchangetheme'));
  storeSiteThemeLocal(theme);
}