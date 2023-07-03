import { IFrame } from "../../types/frame";
import hexToRgb from "./hexToRgb";

export default async function processAndDrawImageToCanvas(image: HTMLImageElement, canvas: HTMLCanvasElement, colors: string[], frame?: IFrame ): Promise<void> {
  
  // Abandon if frame option is present but frame is out of bounds
  if (frame != null && frame.frame >= frame.total) return;

  const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
  if (context == null) return;


  if (frame) {
    canvas.width = image.width / frame.total
    canvas.height = image.height;

    context.drawImage(image, canvas.width * frame.frame, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
  } else {
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0);
  }

  

  const imageData: ImageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const data: Uint8ClampedArray = imageData.data;

  const rgbColors = colors.map(color => hexToRgb(color));
  // DitherUp toggles whenever applying a 'dither-pixel', to roughly estimate checkerboard dithering
  let dither: boolean = true;
  let rowLength = 0;

  for (let i = 0; i < data.length; i += 4) {
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
    let tier = Math.round(average / tierCutoff);
    let ditherDirection: number = 0;
    if (dither) {
      if ((average - (tier * tierCutoff)) > (tierCutoff * 0.3)) {
        ditherDirection = 1;
      } else if ((average - (tier * tierCutoff)) < (tierCutoff * -0.3)) {
        ditherDirection = -1;
      }
    }
    tier = Math.min(tier + ditherDirection, rgbColors.length - 1);
    tier = Math.max(tier, 0);

    data[i] = rgbColors[tier].r;
    data[i+1] = rgbColors[tier].g;
    data[i+2] = rgbColors[tier].b;

  }

  context.putImageData(imageData, 0, 0);
}