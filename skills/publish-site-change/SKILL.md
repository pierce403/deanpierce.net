---
name: publish-site-change
description: Validate and publish deanpierce.net changes. Use when the user asks to commit, push, deploy, land, finish, publish, or when any logical repo edit is complete and must follow the repository rule to build, commit, push, monitor GitHub Actions, and leave a clean working tree.
---

# Publish Site Change

## Overview

Finish a logical edit by proving the site builds, committing the intended scope, pushing `main`, watching GitHub validation and the matching Cloudflare build, and verifying live URLs when applicable.

## Workflow

1. Run `git status --short` and review the diff. Do not stage unrelated user changes.
2. Run the strict build from the project environment:

```bash
npm run build
```

3. If the venv entrypoints are broken, repair and install dependencies:

```bash
venv/bin/python -m ensurepip --upgrade
venv/bin/python -m pip install -r requirements.txt
npm run build
```

4. Stage only the intended files and commit with a concise message.
5. Push `main` to `origin`.
6. If push is rejected because the remote moved, run `git pull --rebase origin main`, rerun `npm run build`, then push again.
7. Watch the validation workflow, then wait for the Cloudflare build for the exact pushed commit:

```bash
gh run list --branch main --limit 5 --json databaseId,headSha,status,conclusion,workflowName,createdAt,url
gh run watch <run-id> --exit-status
```

8. After Cloudflare deployment, verify the workers.dev preview and intended custom domain. For user-facing pages or static assets, request the live URLs with `curl -sS -L -w "%{http_code} %{url_effective}\n"`.
9. If the previously deployed endpoint serves stale 404s immediately after a successful deploy, inspect headers and wait through the edge cache window before declaring failure.
10. Finish with `git status --short`.

## Notes

- The repository rule is to commit and push after every logical edit.
- `./build.sh` is valid when the correct environment is active, but `npm run build` avoids accidentally using a system MkDocs without Material installed.
- Do not report command output as visible to the user unless you summarize the important result.

## Cloudflare transition

Run `npm ci`, `npm run build`, and `npm run deploy:check` before committing. The output is `.cloudflare/site/`; prior Pages source is retained for recovery. Cloudflare holds its own Git deployment credential. GitHub Actions validates only. Never overlap manual and automatic production deployments. Connection, custom-domain/DNS cutover, and public checks must be verified separately; see NOTES for current status.
