// Builds the deployable bundle into dist/: the source tree plus a
// build-info.json stamped with when and from what the build was made.
// CI briefs upload dist/ as the build artefact.
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });
fs.cpSync(path.join(root, 'src'), path.join(dist, 'src'), { recursive: true });
fs.copyFileSync(path.join(root, 'package.json'), path.join(dist, 'package.json'));
fs.copyFileSync(path.join(root, 'package-lock.json'), path.join(dist, 'package-lock.json'));

let commit = 'unknown';
try {
  commit = execSync('git rev-parse --short HEAD', { cwd: root, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
} catch {
  // Not a git checkout — the stamp still records the build time.
}

fs.writeFileSync(
  path.join(dist, 'build-info.json'),
  JSON.stringify({ built_at: new Date().toISOString(), commit }, null, 2) + '\n'
);

console.log(`built dist/ (commit ${commit})`);
