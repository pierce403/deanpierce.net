# deanpierce.net

![Dean Pierce avatar](docs/img/px.jpg)

This repository contains the MkDocs source for [deanpierce.net](https://deanpierce.net), the personal website of security researcher Dean Pierce. It collects talks, projects, and research notes around infosec, crypto, and futurism.

The original GitBooks layout has been migrated to MkDocs so the site can be versioned, themed with Material, and prepared for automatic Cloudflare Git deployment.

## Tech stack

- MkDocs + Material theme with `navigation.expand` and dark mode (slate palette) enabled by default.
- Cloudflare Workers Static Assets; GitHub Actions validation only. The previous `gh-pages` deployment remains recovery source.
- Python tooling managed with `requirements.txt`, `activate.sh`, `serve.sh`, and `build.sh`.
- Custom assets: `docs/css/custom-styles.css` for navigation wrapping and `docs/img/px.jpg` for the site logo/avatar.

## Quick start

- `source activate.sh` – create/activate the virtualenv and install dependencies.
- `./serve.sh` – run `mkdocs serve` with live reload at <http://127.0.0.1:8000>.
- `./build.sh` – generate the static site into the `site/` directory.


## Project layout

- `docs/` – all site content (Markdown). `docs/index.md` is the landing page that used to live in the GitBooks `README.md`.
- `mkdocs.yml` – navigation tree that mirrors the former `SUMMARY.md` table of contents.
- `requirements.txt` – Python dependencies (`mkdocs`, `mkdocs-material`, `pymdown-extensions`).
- `activate.sh`, `serve.sh`, `build.sh` – convenience scripts modelled after the `titor.tech` project.

## Editing content

- Add or modify Markdown inside `docs/`; MkDocs picks up folders as sections.
- Update `mkdocs.yml` whenever pages are added or renamed so the navigation stays in sync.
- Use `mkdocs serve` while editing to verify links and embedded media before publishing.

## Cloudflare publishing

The `deanpierce-net` Worker is prepared to serve only `.cloudflare/site/` with
Workers Static Assets. The strict build uses a complete version-pinned Python
renderer and locally pinned Wrangler 4.145.0. Original `site/`, content, canonical
`https://deanpierce.net`, page paths, search, feeds where configured, and `docs/CNAME`
remain preserved for recovery. The isolated output avoids modifying tracked
legacy generated files. No robots policy was added or changed.

```bash
npm ci
npm run build
npm run deploy:check
npm run dev
```

Configure Cloudflare Workers Builds for `pierce403/deanpierce.net`, production `main`,
root `/`, build `npm run build`, deploy `npx wrangler deploy`, and included paths
`*`. Once connected, a validated commit pushed to `main` lets Cloudflare fetch,
build, and deploy. Cloudflare retains its deployment credential; no Cloudflare
secrets belong in GitHub. `.github/workflows/deploy.yml` now validates and saves a
build artifact only, with no Pages or Cloudflare deployment step.

Git connection, workers.dev serving, custom-domain attachment, and registrar
cutover require separate live verification. Wrangler records only `deanpierce.net` as the exact
custom domain route. Keep the initial route commit local until this zone is active
after the verified DNS import and approved Namecheap delegation; then pushing
`main` lets the native Git deployment provision the hostname. Public cutover
requires separate DNS, certificate, and HTTPS verification. Keep the prior GitHub Pages deployment/source for
rollback. Manual recovery must pause automatic builds and wait for active builds;
verify recovery before re-enabling them.

Wrangler logs and traces are enabled, but asset-only requests bypass Worker
execution. Use Cloudflare HTTP analytics for those requests.
