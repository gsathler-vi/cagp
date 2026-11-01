import fs from 'node:fs';
import path from 'node:path';

const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const githubRepo = process.env.GITHUB_REPOSITORY || '';
const isUserPage = githubRepo.endsWith('.github.io');
const repoName = githubRepo.split('/')[1] || '';
const basePath = isGitHubActions && repoName && !isUserPage ? `/${repoName}` : '';
const cleanBase = basePath.replace(/\/$/, '');

function getFilesRecursively(dir, baseDir = dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath, baseDir));
    } else {
      const subPath = '/' + path.relative(baseDir, fullPath).replace(/\\/g, '/');
      const relPath = cleanBase + subPath;
      results.push(relPath);
      if (relPath.endsWith('/index.html')) {
        const dirPath = relPath.slice(0, -'index.html'.length);
        results.push(dirPath);
        if (dirPath.length > 1) {
          results.push(dirPath.slice(0, -1));
        }
      }
    }
  }
  return Array.from(new Set(results));
}

const distDir = path.resolve('dist');
if (fs.existsSync(distDir)) {
  const allFiles = getFilesRecursively(distDir, distDir)
    .filter(f => !f.endsWith('.map') && f !== '/sw.js');
  
  const swSrcPath = path.resolve('public/sw.js');
  const swDistPath = path.resolve('dist/sw.js');
  
  let swContent = '';
  if (fs.existsSync(swSrcPath)) {
    swContent = fs.readFileSync(swSrcPath, 'utf8');
  }
  
  const manifestJson = JSON.stringify(allFiles, null, 2);
  const updatedSw = swContent.replace(
    /const PRECACHE_ASSETS\s*=\s*\[[\s\S]*?\];/,
    `const PRECACHE_ASSETS = ${manifestJson};`
  );
  
  fs.writeFileSync(swDistPath, updatedSw, 'utf8');
  console.log(`[SW-Manifest] Injected ${allFiles.length} precache assets into dist/sw.js`);
} else {
  console.log('[SW-Manifest] dist directory not found, skipping manifest injection.');
}
