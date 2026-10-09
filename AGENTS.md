# Repository Operations Manual

This document exists to brief any automations, agents, or contributors interacting with this repository. Read it before making changes, and update it whenever new operational knowledge is uncovered.

## Mandatory Workflow

- **Always test the build before committing and pushing.** Run `mkdocs build --strict` (or use `./build.sh`) to verify the site builds without errors. This catches broken navigation references, missing files, and other issues that would cause the GitHub Actions deployment to fail.
- **Always commit and push after every logical edit.** No change should remain uncommitted in the local working tree.
- Use the existing scripts:
  - `source activate.sh` to create/activate the Python virtual environment and install dependencies.
  - `./serve.sh` for local `mkdocs serve` with live reload.
  - `./build.sh` for local `mkdocs build` sanity checks.
- Run `git status` before leaving the workspace to confirm there are no uncommitted edits.

## Technology Stack

- **Static site generator:** MkDocs with the Material theme (`mkdocs-material`).
- **Python dependencies:** defined in `requirements.txt` (`mkdocs`, `mkdocs-material`, `pymdown-extensions`).
- **Custom assets:**
  - `docs/css/custom-styles.css` allows multi-line navigation labels.
  - `docs/img/px.jpg` is the site logo/avatar referenced in `mkdocs.yml`.
- **Navigation:** Controlled by `mkdocs.yml`. The structure mirrors the old GitBook `SUMMARY.md`, but all pages now live under `docs/`.
- **Content:** Markdown files formerly under `projects/` and `talks/` were moved into `docs/projects/` and `docs/talks/`, with nested `README.md` files renamed to `index.md` for clean URLs.
- **Custom domain:** `docs/CNAME` ensures GitHub Pages serves `deanpierce.net`.

## Deployment

- Cloudflare native Git publication is prepared; GitHub Actions validates only. See README and NOTES for connection and cutover status.
- Keep the prior `gh-pages` branch/deployment and `docs/CNAME` for recovery.

## Known Conventions & Pitfalls

- The standalone `docs/resume.html` owns both the web resume and its Print / Save PDF layout. Its `<title>` is the requested PDF basename (`Dean_Resume_2026`), which browsers use to suggest the Save as PDF filename. Keep contact URLs visible as text, with explicit labels and one contact per line; PDF text extraction must retain each complete URL rather than only a hyperlink label. Keep print URLs unbroken and disable browser-generated headers/footers when exporting a PDF.
- GitBook-specific Liquid tags like `{% embed %}` are no longer supported. They were replaced with standard Markdown links (`[View resource](URL){ target=_blank }`). Avoid reintroducing Liquid tags.
- Material's `palette` in `mkdocs.yml` is configured to default to dark mode (`scheme: slate`) with a toggle back to light mode. Preserve this behavior when editing theme options.
- Use Material's native `navigation.expand` feature (enabled in `mkdocs.yml`) to keep the left-hand tree fully expanded—custom JavaScript is no longer required. If updating Material, reconfirm that this feature still performs as expected.
- The site relies on the persistent left sidebar (like titor.tech). Keep `navigation.tabs` **disabled** in `mkdocs.yml`; reintroducing it forces primary navigation into top tabs and hides the tree.
- **When deleting files:** Always update `mkdocs.yml` navigation to remove references to deleted files. The `--strict` build mode will catch orphaned references, but only if you test before pushing.
- **Navigation sync:** The `nav` section in `mkdocs.yml` must exactly match the files in `docs/`. Missing or extra references will cause build failures in CI.

## Repo-Local Skills

- This repo adapts the [recurse.bot](https://recurse.bot/) skill convention: `SKILLS.md` is the compact catalog, and detailed procedures live in `skills/<name>/SKILL.md`.
- Use `curator` when adding, revising, consolidating, or pruning repo-local skills.
- Use `site-content-manager` for MkDocs content, navigation, talk/project pages, and static deck bundles.
- Use `publish-site-change` when finishing a logical edit: build strictly, commit, push, monitor GitHub validation and the matching Cloudflare build, verify live URLs when useful, and leave `git status` clean.
- Use `recurse-advice-sync` when pulling fresh guidance from recurse.bot and deciding whether it belongs in `AGENTS.md`, `SKILLS.md`, or a skill folder.

## Continuous Documentation

- Whenever you learn something new or non-obvious about this repository (build steps, quirks, credentials, directory structure changes, etc.), append that knowledge here. This document should evolve alongside the project.
- Each update to this document counts as a logical edit—remember to commit and push after saving changes.

## Last updated

- Updated by automation on 2026-06-25. Added repo-local `SKILLS.md` and skill folders after adapting the recurse.bot skill etiquette pattern for this MkDocs site.
- Updated by automation on 2025-10-24. Added mandatory build testing requirement and navigation sync pitfalls after discovering broken references causing deployment failures.

## Cloudflare migration lessons (2026-10-09)

- Worker `deanpierce-net` publishes only `.cloudflare/site/`, leaving legacy `site/` untouched. Use `npm ci`, `npm run build`, and `npm run deploy:check`; strict MkDocs uses the baseline renderer versions in `requirements.lock`.
- Native Git settings: `pierce403/deanpierce.net`, production `main`, root `/`, build `npm run build`, deploy `npx wrangler deploy`, paths `*`. GitHub Actions validates only; credentials stay in Cloudflare, with no GitHub Cloudflare secrets.
- Wrangler records only `deanpierce.net` as a custom domain route. Publish this initial route commit only after its zone is active following verified DNS import and the approved registrar delegation. Native Git provisions the hostname; connection, exact deployment, certificate, DNS, and public behavior still require independent verification.
- Preserve canonical URL, existing public paths and standalone HTML, search, feeds, robots behavior, unrelated DNS/mail records, and prior Pages recovery source. Asset-only requests do not emit Worker invocation logs.
- Do not overlap manual and native Git deployment. Pause automatic builds and wait before deliberate recovery; verify before re-enabling them.

- Compatibility date is `2026-10-07`, the newest date supported by the bundled workerd in pinned Wrangler 4.145.0. A `2026-10-09` local runtime refused startup; this asset-only configuration uses the supported date so development and validation exercise the configured runtime. Review compatibility changes before advancing it with a future Wrangler update.
