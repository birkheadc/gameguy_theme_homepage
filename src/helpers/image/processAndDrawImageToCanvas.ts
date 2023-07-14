import { IFrame } from "../../types/frame";
import { ImageProcessShaderMode } from "../../types/imageProcessShaderMode";
import { IVector2 } from "../../types/vectory2";
import drawImageToCanvas from "./drawImageToCanvas";
import hexToRgb from "./hexToRgb";
import processCanvas from "./processCanvas";

export default async function processAndDrawImageToCanvas(image: HTMLImageElement, canvas: HTMLCanvasElement, colors: string[], pixelateLevel: number, shaderMode: ImageProcessShaderMode): Promise<void> {
  
  drawImageToCanvas(image, canvas, pixelateLevel);
  processCanvas(canvas, colors, shaderMode);
}