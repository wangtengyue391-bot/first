// 渲染 A3 海报：node render.mjs [scale]  → poster.png (默认 3.125x ≈ 300dpi) + poster.pdf
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const dir = path.dirname(fileURLToPath(import.meta.url));
const scale = Number(process.argv[2] || 3.125);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1123, height: 1587 }, deviceScaleFactor: scale });
await page.goto(pathToFileURL(path.join(dir, 'poster.html')).href, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.locator('#poster').screenshot({ path: path.join(dir, scale === 1 ? 'preview.png' : 'poster.png') });
if (scale !== 1) {
  await page.addStyleTag({ content: '@page{size:297mm 420mm;margin:0} html,body{background:none}' });
  await page.pdf({ path: path.join(dir, 'poster.pdf'), width: '297mm', height: '420mm', printBackground: true });
}
await browser.close();
console.log('done', scale);
