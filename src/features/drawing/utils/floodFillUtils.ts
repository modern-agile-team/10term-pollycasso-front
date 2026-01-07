const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const colorMatch = (
  a: { r: number; g: number; b: number; a: number },
  b: { r: number; g: number; b: number; a: number },
  tolerance: number,
) => {
  return (
    Math.abs(a.r - b.r) <= tolerance &&
    Math.abs(a.g - b.g) <= tolerance &&
    Math.abs(a.b - b.b) <= tolerance &&
    Math.abs(a.a - b.a) <= tolerance
  );
};

export const performFloodFill = (
  imageData: ImageData,
  startX: number,
  startY: number,
  fillColorHex: string,
): HTMLImageElement | null => {
  const { width, height, data } = imageData;
  const stack = [[startX, startY]];
  const rgbColor = hexToRgb(fillColorHex);

  if (!rgbColor) return null;

  const pixelPos = (startY * width + startX) * 4;
  const startColor = {
    r: data[pixelPos],
    g: data[pixelPos + 1],
    b: data[pixelPos + 2],
    a: data[pixelPos + 3],
  };

  if (
    startColor.r === rgbColor.r &&
    startColor.g === rgbColor.g &&
    startColor.b === rgbColor.b &&
    startColor.a === 255
  ) {
    return null;
  }

  const visited = new Uint8Array(width * height);

  const tolerance = 50;

  while (stack.length) {
    const [x, y] = stack.pop()!;
    const pos = y * width + x;

    if (visited[pos]) continue;
    visited[pos] = 1;

    const pixelIndex = pos * 4;
    const currentColor = {
      r: data[pixelIndex],
      g: data[pixelIndex + 1],
      b: data[pixelIndex + 2],
      a: data[pixelIndex + 3],
    };

    if (colorMatch(startColor, currentColor, tolerance)) {
      data[pixelIndex] = rgbColor.r;
      data[pixelIndex + 1] = rgbColor.g;
      data[pixelIndex + 2] = rgbColor.b;
      data[pixelIndex + 3] = 255;

      if (x > 0) stack.push([x - 1, y]);
      if (x < width - 1) stack.push([x + 1, y]);
      if (y > 0) stack.push([x, y - 1]);
      if (y < height - 1) stack.push([x, y + 1]);
    }
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.putImageData(imageData, 0, 0);

  const newImage = new Image();
  newImage.src = canvas.toDataURL();
  return newImage;
};
