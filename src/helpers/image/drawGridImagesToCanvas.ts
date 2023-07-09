export default function drawGridImagesToCanvas(images: HTMLImageElement[][], canvas: HTMLCanvasElement, pixelateLevel: number) {
  const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
  if (context == null) return;
  
  const numImagesX = images.length;
  const numImagesY = images[0].length;
  const imageWidth = images[0][0].width / pixelateLevel;
  const imageHeight = images[0][0].height / pixelateLevel;
  const canvasWidth = numImagesX * imageWidth;
  const canvasHeight = numImagesY * imageHeight;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  for (let x = 0; x < numImagesX; x++) {
    for (let y = 0; y < numImagesY; y++) {
      context.drawImage(images[x][y], x * imageWidth, y * imageHeight, imageWidth, imageHeight);
    }
  }
}