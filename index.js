const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 500;
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

const seeds = [];
const colors = [
  { r: 240, g: 115, b: 115, a: 255 },
  { r: 240, g: 173, b: 115, a: 255 },
  { r: 240, g: 209, b: 115, a: 255 },
  { r: 211, g: 240, b: 115, a: 255 },
  { r: 115, g: 240, b: 115, a: 255 },
  { r: 115, g: 240, b: 217, a: 255 },
  { r: 115, g: 169, b: 240, a: 255 },
  { r: 134, g: 115, b: 240, a: 255 },
  { r: 194, g: 115, b: 240, a: 255 },
  { r: 240, g: 115, b: 228, a: 255 },
  { r: 240, g: 115, b: 150, a: 255 },
];

for (let y = 0; y < canvas.height; y++) {
  for (let x = 0; x < canvas.width; x++) {
    const i = y * canvas.width + x;
    imgData.data[i * 4] = 210;
    imgData.data[i * 4 + 1] = 215;
    imgData.data[i * 4 + 2] = 220;
    imgData.data[i * 4 + 3] = 255;
  }
}

ctx.putImageData(imgData, 0, 0);

canvas.addEventListener('click', (event) => {
  const { clientX, clientY } = event;
  const bounding = canvas.getBoundingClientRect();
  const x = clientX - bounding.left;
  const y = clientY - bounding.top;

  seeds.push({ x, y });

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      let closest = 0;
      let minDist = (seeds[0].x - x) ** 2 + (seeds[0].y - y) ** 2;
      for (let i = 1; i < seeds.length; i++) {
        const dist = (seeds[i].x - x) ** 2 + (seeds[i].y - y) ** 2;
        if (dist < minDist) {
          closest = i;
          minDist = dist;
        }
      }
      const color = colors[closest % colors.length];
      const i = y * canvas.width + x;
      imgData.data[i * 4] = color.r;
      imgData.data[i * 4 + 1] = color.g;
      imgData.data[i * 4 + 2] = color.b;
      imgData.data[i * 4 + 3] = color.a;
    }
  }

  const radius = 5;
  for (let i = 0; i < seeds.length; i++) {
    const x0 = seeds[i].x - radius;
    const x1 = seeds[i].x + radius;
    const y0 = seeds[i].y - radius;
    const y1 = seeds[i].y + radius;
    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        if ((x - seeds[i].x) ** 2 + (y - seeds[i].y) ** 2 < radius ** 2) {
          const j = y * canvas.width + x;
          imgData.data[j * 4] = 50;
          imgData.data[j * 4 + 1] = 55;
          imgData.data[j * 4 + 2] = 60;
          imgData.data[j * 4 + 3] = 255;
        }
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);
});
