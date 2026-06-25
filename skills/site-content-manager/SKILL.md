---
name: site-content-manager
description: Add or update deanpierce.net MkDocs content, navigation, talks, projects, and static assets. Use when editing docs/, mkdocs.yml nav, talk/project pages, copied presentation bundles, custom CSS, or any content change that must preserve the site's Material theme and GitHub Pages behavior.
---

# Site Content Manager

## Overview

Make content changes that fit the existing MkDocs site shape and do not break strict builds or GitHub Pages deployment.

## Workflow

1. Read `AGENTS.md`, `mkdocs.yml`, and nearby pages that match the requested content type.
2. If the user points at a live source such as an event schedule, fetch and cite the current source before writing date-sensitive details.
3. Put Markdown pages under `docs/talks/` or `docs/projects/` following the existing folder pattern.
4. Rename nested landing pages to `index.md` when clean URLs are desired.
5. Add or update `mkdocs.yml` navigation in the same logical group as the page.
6. Keep Material dark-mode behavior and the persistent left sidebar intact.
7. Use standard Markdown links with `{ target=_blank }`; do not introduce GitBook Liquid tags.
8. For static presentation bundles, copy self-contained assets under the relevant `docs/` path and link directly to their HTML entrypoints.
9. Read `references/repo-conventions.md` when the edit touches navigation, theme behavior, custom assets, or static bundles.
10. Hand off to `publish-site-change` when the content change is ready to verify and publish.

## Page Conventions

Use concise frontmatter:

```markdown
---
description: Short page summary
---

# Page Title
```

Prefer short sections like `## Highlights`, `## Themes`, `## Slides`, and `## Resources`. Keep new pages factual and link to primary sources rather than copying long external descriptions.

## Navigation Checks

Every content edit must keep `mkdocs.yml` aligned with `docs/`. Before publishing:

```bash
rg -n "navigation.tabs|navigation.expand|palette|nav:" mkdocs.yml
venv/bin/mkdocs build --strict
```
