# catalog-js-cicd-template

A small **JavaScript + Express (Node)** payments service for DayZer0 CI/CD briefs. Your
project repository is provisioned from this template: the service, its Jest suite, its build
script and a deploy simulation already exist and pass. **The pipeline around them does not —
building it is your project.** There is deliberately no `.github/workflows` directory here.

## What's here

- `src/app.js` / `src/server.js` — the Express app (`GET /healthz`, `POST /payments`) and
  the port binding, kept separate so tests run without a port.
- `src/ledger.js` — the business logic, plain functions.
- `test/app.test.js` — the Jest suite (with supertest), passing from a clean clone.
- `scripts/build.js` — `npm run build` emits a `dist/` folder with a stamped
  `build-info.json`; that folder is what CI uploads as the artefact.
- `scripts/deploy.js` — `npm run deploy` is a deploy **simulation**: it deploys nothing real,
  it prints the stages so a pipeline can be gated around it safely.
- `package-lock.json` — committed on purpose; CI installs with `npm ci`.

## Requirements

- Node 20 or newer.

## Run it

```bash
npm ci
npm start
```

Then, in another terminal:

```bash
curl http://localhost:8080/healthz
# {"status":"ok"}
```

## Test it

```bash
npm test
```

## Build and "deploy"

```bash
npm run build     # emits dist/
npm run deploy    # simulated — prints the stages, touches nothing real
```

## What you add

Your tickets have you build the GitHub Actions pipeline: workflows, artefact uploads or
deploy gates as your brief asks. The service is finished — do not add features to it unless
a ticket says so. One ticket, one branch (`issue-N-<slug>`), one pull request with `Closes #N`.
