import { ImageProcessShaderEffect } from "../../types/imageProcessShaderEffect";
import { ImageProcessShaderMode } from "../../types/imageProcessShaderMode";
import hexToRgb from "./hexToRgb";

export default function processCanvas(canvas: HTMLCanvasElement, colors: string[], shaderMode: ImageProcessShaderMode, effect: ImageProcessShaderEffect = ImageProcessShaderEffect.DITHER) {
  
  const context = canvas.getContext('2d');
  if (context == null) return;

  const imageData: ImageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const data: Uint8ClampedArray = imageData.data;

  const rgbColors = colors.map(color => hexToRgb(color));
  // DitherUp toggles true/false whenever applying a 'dither-pixel', to roughly estimate checkerboard dithering
  let dither: boolean = true;
  let rowLength = 0;

  const maxTier = shaderMode === ImageProcessShaderMode.DARK ? colors.length - 2 : colors.length - 1;
  const minTier = shaderMode === ImageProcessShaderMode.LIGHT ? 1 : 0;

  for (let i = 0; i < data.length; i += 4) {
    // In order to get a checkerboard effect, if the image width is even, each row must be offset.
    // If the image width is odd, this will happen naturally.
    if (imageData.width % 2 == 0 && rowLength >= imageData.width) {
      rowLength = 0;
      dither = !dither;
    }
    rowLength++;
    dither = !dither;
    const r = data[i];
    const g = data[i+1];
    const b = data[i+2];

    const average = (r + g + b) / 3;
    const tierCutoff = 255 / rgbColors.length;
    let tier;
    switch (shaderMode) {
      case ImageProcessShaderMode.LIGHT:
        tier = Math.ceil(average / tierCutoff);
        break;
      case ImageProcessShaderMode.NORMAL:
        tier = Math.round(average / tierCutoff);
        break;
      case ImageProcessShaderMode.DARK:
        tier = Math.floor(average / tierCutoff)
        break;
    }
    let ditherDirection: number = 0;
    if (effect >= ImageProcessShaderEffect.DITHER && dither) {
      if ((average - (tier * tierCutoff)) > (tierCutoff * 0.3)) {
        ditherDirection = 1;
      } else if ((average - (tier * tierCutoff)) < (tierCutoff * -0.3)) {
        ditherDirection = -1;
      }
    }
    if (effect === ImageProcessShaderEffect.GREYSCALE) {
      data[i] = average;
      data[i+1] = average;
      data[i+2] = average;
    } else {
      tier = Math.min(tier + ditherDirection, maxTier);
      tier = Math.max(tier, minTier);
      if (effect >= ImageProcessShaderEffect.SHADE) {
        data[i] = rgbColors[tier].r;
        data[i+1] = rgbColors[tier].g;
        data[i+2] = rgbColors[tier].b;
      } else {
        data[i] = (tier*50) + 25;
        data[i+1] = (tier*50) + 25;
        data[i+2] = (tier*50) + 25;
      }
    }
  }
  context.putImageData(imageData, 0, 0);
}