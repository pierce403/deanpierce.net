# deanpierce.net

![Dean Pierce avatar](docs/img/px.jpg)

This repository contains the MkDocs source for [deanpierce.net](https://deanpierce.net), the personal website of security researcher Dean Pierce. It collects talks, projects, and research notes around infosec, crypto, and futurism.

The original GitBooks layout has been migrated to MkDocs so the site can be versioned, themed with Material, and deployed automatically via GitHub Pages.

## Tech stack

- MkDocs + Material theme with `navigation.expand` and dark mode (slate palette) enabled by default.
- GitHub Pages deploy from the `gh-pages` branch via `.github/workflows/deploy.yml` and `peaceiris/actions-gh-pages`.
- Python tooling managed with `requirements.txt`, `activate.sh`, `serve.sh`, and `build.sh`.
- Custom assets: `docs/css/custom-styles.css` for navigation wrapping and `docs/img/px.jpg` for the site logo/avatar.

## Quick start

- `source activate.sh` – create/activate the virtualenv and install dependencies.
- `./serve.sh` – run `mkdocs serve` with live reload at <http://127.0.0.1:8000>.
- `./build.sh` – generate the static site into the `site/` directory.

## Deployment

Pushing to `main` automatically runs the GitHub Actions workflow in `.github/workflows/deploy.yml`.  
The job installs dependencies, builds the site with `mkdocs build --strict`, and publishes the artifacts to the `gh-pages` branch using the built-in `GITHUB_TOKEN`. The `CNAME` record is bundled in the build so GitHub Pages keeps the `deanpierce.net` domain.

## Project layout

- `docs/` – all site content (Markdown). `docs/index.md` is the landing page that used to live in the GitBooks `README.md`.
- `mkdocs.yml` – navigation tree that mirrors the former `SUMMARY.md` table of contents.
- `requirements.txt` – Python dependencies (`mkdocs`, `mkdocs-material`, `pymdown-extensions`).
- `activate.sh`, `serve.sh`, `build.sh` – convenience scripts modelled after the `titor.tech` project.

## Editing content

- Add or modify Markdown inside `docs/`; MkDocs picks up folders as sections.
- Update `mkdocs.yml` whenever pages are added or renamed so the navigation stays in sync.
- Use `mkdocs serve` while editing to verify links and embedded media before publishing.
