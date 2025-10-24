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

- GitHub Pages is configured to serve from the `gh-pages` branch.
- `.github/workflows/deploy.yml` builds the site with `mkdocs build --strict` and publishes to `gh-pages` via `peaceiris/actions-gh-pages@v3` using the automatic `GITHUB_TOKEN`.
- Every push to `main` triggers the workflow. Monitor the "Deploy MkDocs to GitHub Pages" job for build health.

## Known Conventions & Pitfalls

- GitBook-specific Liquid tags like `{% embed %}` are no longer supported. They were replaced with standard Markdown links (`[View resource](URL){ target=_blank }`). Avoid reintroducing Liquid tags.
- Material's `palette` in `mkdocs.yml` is configured to default to dark mode (`scheme: slate`) with a toggle back to light mode. Preserve this behavior when editing theme options.
- Use Material's native `navigation.expand` feature (enabled in `mkdocs.yml`) to keep the left-hand tree fully expanded—custom JavaScript is no longer required. If updating Material, reconfirm that this feature still performs as expected.
- The site relies on the persistent left sidebar (like titor.tech). Keep `navigation.tabs` **disabled** in `mkdocs.yml`; reintroducing it forces primary navigation into top tabs and hides the tree.
- **When deleting files:** Always update `mkdocs.yml` navigation to remove references to deleted files. The `--strict` build mode will catch orphaned references, but only if you test before pushing.
- **Navigation sync:** The `nav` section in `mkdocs.yml` must exactly match the files in `docs/`. Missing or extra references will cause build failures in CI.

## Continuous Documentation

- Whenever you learn something new or non-obvious about this repository (build steps, quirks, credentials, directory structure changes, etc.), append that knowledge here. This document should evolve alongside the project.
- Each update to this document counts as a logical edit—remember to commit and push after saving changes.

## Last updated

- Updated by automation on 2025-10-24. Added mandatory build testing requirement and navigation sync pitfalls after discovering broken references causing deployment failures.
