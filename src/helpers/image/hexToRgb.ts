export default function hexToRgb(hex: string): { r: number, g: number, b: number} {
  if (hex.startsWith('#')) {
    hex = hex.slice(1);
  }

  // Check if the hex value is valid
  const hexRegex = /^[0-9A-Fa-f]{6}$/;
  if (!hexRegex.test(hex)) {
    return { r: 0, g: 0, b: 0 };
  }

  // Convert the hex color to RGB values
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return { r, g, b };
}