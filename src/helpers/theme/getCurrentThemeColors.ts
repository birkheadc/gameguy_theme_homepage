export default function getCurrentThemeColors(): string[] {
  const computedStyles = getComputedStyle(document.documentElement);
  return [
    computedStyles.getPropertyValue('--clr-current-0'),
    computedStyles.getPropertyValue('--clr-current-1'),
    computedStyles.getPropertyValue('--clr-current-2'),
    computedStyles.getPropertyValue('--clr-current-3'),
  ];
}