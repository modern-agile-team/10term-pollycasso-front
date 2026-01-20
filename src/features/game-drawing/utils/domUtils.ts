export const imageDataToImageElement = (
  imageData: ImageData,
): HTMLImageElement | null => {
  const canvas = document.createElement('canvas');
  canvas.width = imageData.width;
  canvas.height = imageData.height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.putImageData(imageData, 0, 0);

  const newImage = new Image();
  newImage.src = canvas.toDataURL();
  return newImage;
};
