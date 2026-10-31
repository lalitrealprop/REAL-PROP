import fs from 'node:fs/promises';
import path from 'node:path';
import { createCanvas } from '@napi-rs/canvas';
import sharp from 'sharp';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';

const source = path.resolve(
  'public/corbett-county/floor-plans/master-site-plan.pdf'
);

const output = path.resolve(
  'public/corbett-county/images/residential-master-plan.webp'
);

async function main() {
  const pdfBytes = new Uint8Array(await fs.readFile(source));

  const task = pdfjs.getDocument({
    data: pdfBytes,
    useSystemFonts: true,
    disableFontFace: true,
  });

  const pdf = await task.promise;

  console.log(`PDF pages: ${pdf.numPages}`);

  // Start with the first page of the supplied site plan.
  const page = await pdf.getPage(1);

  const original = page.getViewport({ scale: 1 });

  console.log(
    `Original page dimensions: ${Math.round(original.width)} × ${Math.round(original.height)}`
  );

  // Keep the preview reasonably sized for website loading.
  const targetWidth = 1800;
  const scale = targetWidth / original.width;
  const viewport = page.getViewport({ scale });

  const canvas = createCanvas(
    Math.ceil(viewport.width),
    Math.ceil(viewport.height)
  );

  const context = canvas.getContext('2d');

  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);

  await page.render({
    canvasContext: context,
    viewport,
    canvas,
  }).promise;

  const png = await canvas.encode('png');

  await sharp(png)
    .webp({ quality: 82, effort: 5 })
    .toFile(output);

  const stat = await fs.stat(output);

  console.log(`Preview generated: ${output}`);
  console.log(`Preview size: ${(stat.size / 1024 / 1024).toFixed(2)} MB`);

  await task.destroy();
}

main().catch((error) => {
  console.error('Master plan generation failed:', error);
  process.exitCode = 1;
});
