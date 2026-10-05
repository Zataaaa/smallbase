# small-base-5b3b — Cloudflare Worker with CI/CD

Hello World Cloudflare Worker with unit tests, coverage reports and a GitHub Actions pipeline.

## Run locally

```bash
npm install
npm run dev             # http://localhost:8787
npm test                # unit tests
npm run test:coverage   # tests + coverage report in coverage/ (open coverage/index.html)
npm run build           # bundles the worker into dist/
```

## Pipeline (`.github/workflows/ci-cd.yml`)

| Job | Runs on | What it does |
| --- | --- | --- |
| `build-and-test` | every push and PR to `main` | `npm ci` → build → unit tests with coverage → publishes `worker-build` and `coverage-report` artifacts |
| `deploy-production` | push to `main` only, after job 1 passes | downloads `worker-build` and deploys it as a new Worker `small-base-5b3b-prod`, then smoke-tests the URL |

The production Worker is defined in `wrangler.toml` under `[env.production]`. Cloudflare creates it automatically on the first deploy.

## Required GitHub configuration

1. **Repository secrets** (Settings → Secrets and variables → Actions):
   - `CLOUDFLARE_API_TOKEN`: create it in Cloudflare → My Profile → API Tokens → *Edit Cloudflare Workers* template.
   - `CLOUDFLARE_ACCOUNT_ID`: Cloudflare dashboard → Workers & Pages → right sidebar.
2. **Environment** (Settings → Environments → New environment): `production`. Optionally add required reviewers to approve each production deploy.
