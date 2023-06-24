export default function retrieveSiteThemeLocal(): number {
  return parseInt(window.localStorage.getItem('theme') ?? '0');
}