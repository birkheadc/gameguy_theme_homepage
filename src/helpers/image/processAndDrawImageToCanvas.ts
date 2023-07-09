import { IFrame } from "../../types/frame";
import { ImageProcessShaderMode } from "../../types/imageProcessShaderMode";
import { IVector2 } from "../../types/vectory2";
import drawImageToCanvas from "./drawImageToCanvas";
import hexToRgb from "./hexToRgb";
import processCanvas from "./processCanvas";

export default async function processAndDrawImageToCanvas(image: HTMLImageElement, canvas: HTMLCanvasElement, colors: string[], pixelateLevel: number, shaderMode: ImageProcessShaderMode): Promise<void> {
  
  drawImageToCanvas(image, canvas, pixelateLevel);
  processCanvas(canvas, colors, shaderMode);

  // const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
  // if (context == null) return;

  // canvas.width = image.width / pixelateLevel;
  // canvas.height = image.height / pixelateLevel;
  // context.drawImage(image, 0, 0, canvas.width, canvas.height);

  // const imageData: ImageData = context.getImageData(0, 0, canvas.width, canvas.height);
  // const data: Uint8ClampedArray = imageData.data;

  // const rgbColors = colors.map(color => hexToRgb(color));
  // // DitherUp toggles whenever applying a 'dither-pixel', to roughly estimate checkerboard dithering
  // let dither: boolean = true;
  // let rowLength = 0;

  // for (let i = 0; i < data.length; i += 4) {
  //   if (imageData.width % 2 == 0 && rowLength >= imageData.width) {
  //     rowLength = 0;
  //     dither = !dither;
  //   }
  //   rowLength++;
  //   dither = !dither;
  //   const r = data[i];
  //   const g = data[i+1];
  //   const b = data[i+2];

  //   const average = (r + g + b) / 3;
  //   const tierCutoff = 255 / rgbColors.length;
  //   let tier;
  //   switch (shaderMode) {
  //     case ImageProcessShaderMode.LIGHT:
  //       tier = Math.ceil(average / tierCutoff);
  //       break;
  //     case ImageProcessShaderMode.NORMAL:
  //       tier = Math.round(average / tierCutoff);
  //       break;
  //     case ImageProcessShaderMode.DARK:
  //       tier = Math.floor(average / tierCutoff)
  //       break;
  //   }
  //   let ditherDirection: number = 0;
  //   if (dither) {
  //     if ((average - (tier * tierCutoff)) > (tierCutoff * 0.3)) {
  //       ditherDirection = 1;
  //     } else if ((average - (tier * tierCutoff)) < (tierCutoff * -0.3)) {
  //       ditherDirection = -1;
  //     }
  //   }
  //   tier = Math.min(tier + ditherDirection, rgbColors.length - 1);
  //   tier = Math.max(tier, 0);

  //   data[i] = rgbColors[tier].r;
  //   data[i+1] = rgbColors[tier].g;
  //   data[i+2] = rgbColors[tier].b;

  // }

  // context.putImageData(imageData, 0, 0);
}