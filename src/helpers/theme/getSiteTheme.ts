export default function getSiteTheme(): number {
  return parseInt(document.documentElement.getAttribute('data-theme') ?? '0');
}