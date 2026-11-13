import http from 'http';
import fs from 'fs';
import path from 'path';
import { execFile } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const outDir = path.resolve(__dirname, '../docs/screenshots');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  let filePath = path.join(distDir, urlPath === '/' ? 'index.html' : urlPath);

  if (!fs.existsSync(filePath)) {
    filePath = path.join(distDir, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Error loading ' + filePath);
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content, 'utf-8');
  });
});

const PORT = 3000;
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function capture(url, outFile, width, height) {
  return new Promise((resolve, reject) => {
    const args = [
      '--headless=new',
      '--disable-gpu',
      `--window-size=${width},${height}`,
      '--hide-scrollbars',
      `--screenshot=${outFile}`,
      '--virtual-time-budget=3000',
      url
    ];
    execFile(chromePath, args, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

server.listen(PORT, '127.0.0.1', async () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
  try {
    const landingOut = path.join(outDir, 'flowmind-landing.png');
    const appOut = path.join(outDir, 'flowmind-dashboard.png');

    console.log('Capturing landing page screenshot...');
    await capture(`http://127.0.0.1:${PORT}/`, landingOut, 1366, 850);
    console.log(`Saved to ${landingOut}`);

    console.log('Capturing live dashboard screenshot...');
    await capture(`http://127.0.0.1:${PORT}/?view=app`, appOut, 1366, 850);
    console.log(`Saved to ${appOut}`);

    console.log('Screenshots generated successfully!');
  } catch (err) {
    console.error('Failed to capture:', err);
  } finally {
    server.close();
    process.exit(0);
  }
});
