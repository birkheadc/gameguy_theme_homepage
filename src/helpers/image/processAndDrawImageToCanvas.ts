import { ImageProcessShaderEffect } from "../../types/imageProcessShaderEffect";
import { ImageProcessShaderMode } from "../../types/imageProcessShaderMode";
import drawImageToCanvas from "./drawImageToCanvas";
import processCanvas from "./processCanvas";

export default async function processAndDrawImageToCanvas(image: HTMLImageElement, canvas: HTMLCanvasElement, colors: string[], pixelateLevel: number, shaderMode: ImageProcessShaderMode, effect?: ImageProcessShaderEffect): Promise<void> {
  drawImageToCanvas(image, canvas, pixelateLevel);
  processCanvas(canvas, colors, shaderMode, effect);
}