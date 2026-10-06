// Deploy SIMULATION. Nothing real is deployed anywhere: this script stands in
// for a deploy step so a pipeline can be built and gated around it safely.
// It expects dist/ to exist (run `npm run build` first) and prints the stages
// a real deploy would walk through.
const fs = require('fs');
const path = require('path');

const dist = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(path.join(dist, 'build-info.json'))) {
  console.error('deploy: dist/build-info.json not found — run `npm run build` first');
  process.exit(1);
}

const info = JSON.parse(fs.readFileSync(path.join(dist, 'build-info.json'), 'utf8'));
const target = process.env.DEPLOY_TARGET || 'staging';

console.log(`deploy: target        ${target}`);
console.log(`deploy: bundle commit ${info.commit}`);
console.log(`deploy: bundle built  ${info.built_at}`);
console.log('deploy: uploading bundle... done (simulated)');
console.log('deploy: switching traffic... done (simulated)');
console.log(`deploy: ${target} is now serving ${info.commit}`);
