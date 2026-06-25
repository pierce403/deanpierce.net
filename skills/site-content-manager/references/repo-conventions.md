# deanpierce.net Repo Conventions

Read this reference when a content edit touches navigation, theme settings, static assets, or deploy behavior.

## Stack

- Static site generator: MkDocs.
- Theme: Material for MkDocs.
- Dependencies: `requirements.txt`.
- Site source: `docs/`.
- Generated output: `site/` and ignored by git.
- Custom domain: `docs/CNAME`.

## Navigation

- `mkdocs.yml` owns the full navigation tree.
- Keep `navigation.tabs` disabled so the left sidebar remains the primary navigation.
- Keep `navigation.expand` enabled so the left tree stays expanded.
- When deleting or moving files, update `mkdocs.yml` in the same edit.
- Use `venv/bin/mkdocs build --strict` to catch missing references and navigation warnings.

## Content

- Talks live under `docs/talks/`.
- Projects live under `docs/projects/`.
- Nested landing pages should use `index.md` for clean URLs.
- Avoid GitBook Liquid tags such as `{% embed %}`.
- External resources should use normal Markdown links, usually with `{ target=_blank }`.

## Theme And Assets

- Preserve the default dark Material palette using `scheme: slate`.
- `docs/css/custom-styles.css` allows long navigation labels to wrap.
- `docs/img/px.jpg` is the site logo/avatar.
- Self-contained static bundles, such as slide decks, can live under the relevant `docs/` subtree and be linked directly by HTML path.
