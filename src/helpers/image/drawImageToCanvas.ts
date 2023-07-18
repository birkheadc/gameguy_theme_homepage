export default function drawImageToCanvas(image: HTMLImageElement, canvas: HTMLCanvasElement, pixelateLevel: number) {  
  const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
  if (context == null) return;

  console.log(image.width);
  canvas.width = image.width / pixelateLevel;
  canvas.height = image.height / pixelateLevel;
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
}