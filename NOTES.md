# Publishing notes

## 2026-10-09: Cloudflare Git migration preparation

- Prepared `deanpierce-net` Static Assets Worker in account `b6d1478423f0bb0c0477df387305e46b`, with workers.dev enabled and no custom routes in the initial preparation. No production deployment or DNS cutover was performed by this preparation.
- Kept canonical `https://deanpierce.net`, Markdown/static source, search, configured feeds, robots behavior, and `docs/CNAME` intact. Output is isolated in `.cloudflare/site/`, so legacy generated Pages files remain recoverable and unchanged.
- Added complete baseline Python version pins in `requirements.lock`, Node/Python runtime files, pinned local Wrangler, and strict build/validation scripts. The original `requirements.txt` remains for legacy helper recovery.
- Changed the existing GitHub Actions workflow to validation plus build-artifact retention. Cloudflare native Builds will fetch/deploy on `main` after connection; no Cloudflare secrets were added to GitHub.
- Intended settings: production `main`, root `/`, build `npm run build`, deploy `npx wrangler deploy`, all paths included. Keep production branch history and prior Pages deployment/source.
- Live Git connection, exact commit deployment, workers.dev/domain HTTPS, DNS preservation, and registrar cutover verification remain pending. Manual deployment must not overlap automatic Builds.

- Compatibility date is `2026-10-07`, the newest date supported by the bundled workerd in pinned Wrangler 4.145.0. A `2026-10-09` local runtime refused startup; this asset-only configuration uses the supported date so development and validation exercise the configured runtime. Review compatibility changes before advancing it with a future Wrangler update.

Local validation passed: `npm install`, `npm run build`, and `npm run deploy:check` (Wrangler 4.145.0 schema/packaging) succeeded. The configured local Worker passed 8 HTTP checks covering homepage/article, canonical URLs, slash redirect, populated search, real 404, standalone resume URL. Only owned local test processes were started and stopped. Public deployment and domain cutover remain unverified at this preparation stage.

## 2026-10-09: source-controlled custom domain route prepared

- Added only `{"pattern": "deanpierce.net", "custom_domain": true}` to Wrangler routes, preserving workers.dev, assets, observability, account, runtime compatibility, and all recovery/source artifacts.
- This follow-up remains local until the zone is active after the verified import and approved Namecheap delegation. The root migration coordinator will then push the route commit so native Git deployment can provision the custom domain.
- Route preparation does not prove zone activation, registrar delegation, certificate readiness, or live cutover. Those checks remain separate; no manual deployment overlaps native Builds.

Validation: `npm run deploy:check` passed against the exact route configuration and unchanged existing assets; `git diff --check` passed. No full renderer rebuild was repeated for this routing-only change. No route commit was pushed and no domain/certificate operation was performed during preparation.

## 2026-10-09: ordinary route alternative prepared, no DNS deletion

- The coordinator pushed custom-domain commit `6244345f57c3176a8d6cf8384595cbd1d9ac3a2e` after zone activation. GitHub validation succeeded, but native Cloudflare build `8bfea961-eb5b-4672-aef6-99cda2d97f08` failed at hostname provisioning with error `100117`: imported externally managed apex A records conflict. Worker assets uploaded before that failure; Worker-host checks, including the resume redirect, passed separately. No custom binding was created.
- Prepared a child commit replacing only that routing entry with `{"pattern": "deanpierce.net/*", "zone_name": "deanpierce.net"}`. This supported ordinary route retains the original apex A values and all mail/TXT/unrelated records. Live DNS proxy changes, native publishing, and verification belong to the coordinator; this preparation performs none of them.
- Proxying the retained apex A records changes public answers to Cloudflare addresses while keeping the original values in DNS management. An active zone and edge certificate are required. Native Builds needs Workers Routes Write for this zone; Cloudflare's automatically generated build token includes that permission by default. Keep credentials in Cloudflare and GitHub Actions validation-only.
- Every current asset request is handled without a user Worker script (`main` is absent); generated root `404.html` and `404-page` produce a real 404 on missing paths. Ordinary route matching covers the apex's paths and queries, not `www`. There is no application `fetch()` of the old Pages origin.
- Record retention provides recovery, but route removal, a more-specific bypass route, or proxy disablement can reveal the old Pages site again. Check existing route conflicts and any configured fail-open policy before release. Static asset requests remain free/unlimited; a future user Worker script could introduce Workers request limits and origin-fallback behavior and requires a fresh review.
- Still pending: coordinator review/push, exact native build success, proxied apex DNS, certificate/TLS and HTTP-to-HTTPS validation, public wiki/404 checks, and separate `www` and resume path behavior. No current custom-host success is inferred from Worker-host tests.

Validation: `npm run deploy:check` passed with pinned Wrangler 4.145.0 against the ordinary-route configuration and existing assets. `git diff --check` passed. The renderer, asset files, package lock, and recovery artifacts are unchanged; no full rebuild was repeated.

Sources: [Static Assets on routes](https://developers.cloudflare.com/workers/static-assets/routing/advanced/serving-a-subdirectory/), [static-site 404 decisions](https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/), [route prerequisites/matching](https://developers.cloudflare.com/workers/configuration/routing/routes/), and [native Build token defaults](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/).
