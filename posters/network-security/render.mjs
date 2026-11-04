// 渲染 A3 海报：
//   node render.mjs      → poster.jpg（3509×4959，约 300dpi，质量 95；比赛要求 1MB–10MB）
//   node render.mjs 1    → preview.png（1123×1587 预览）
import { createRequire } from 'node:module';
import { statSync } from 'node:fs';
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
await page.waitForFunction(() => !document.querySelector('svg#ink') || document.body.dataset.ready === '1');

const out = path.join(dir, scale === 1 ? 'preview.png' : 'poster.jpg');
await page.locator('#poster').screenshot(scale === 1 ? { path: out } : { path: out, type: 'jpeg', quality: 95 });
await browser.close();

const size = statSync(out).size;
console.log(`${path.basename(out)}  ${size.toLocaleString()} bytes`);
if (scale !== 1 && (size <= 1024 * 1024 || size >= 10 * 1024 * 1024))
  console.warn('⚠ 文件大小不在 1MB–10MB 之间，不符合投稿要求');
