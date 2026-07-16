# Extension Best Practices

This document is the default technical guide for PoeTradePlus changes. It favors a small, native, secure extension over adding abstractions by default.

## Principles

1. Prefer platform APIs, TypeScript, HTML, and CSS before adding a library.
2. Add a dependency only when it offers a clear, documented benefit that outweighs its maintenance, bundle-size, and security cost.
3. Keep the extension's permissions, host access, and injected code limited to what its user-facing features require.
4. Treat data received from web pages and content scripts as untrusted.
5. Keep each extension context focused on its own responsibility.

## Architecture boundaries

- **Content scripts** read and update the Path of Exile trade-page DOM. They must not own privileged browser operations or long-lived application state.
- **Background service worker** coordinates browser events, tabs, privileged APIs, and cross-context work. It must remain restart-safe: persist needed state instead of relying on in-memory values.
- **Popup and sidebar UI** render user interactions and use services/messages rather than reaching into unrelated extension contexts.
- **Shared services and types** hold domain logic, storage access, and typed contracts that can be used by more than one context.

Use one-time typed messages for discrete requests. Use long-lived ports only when a real stream of coordinated updates needs them. Validate the message shape, origin, and requested operation before a privileged action.

## Dependencies and build tooling

- CSS is plain CSS. Do not reintroduce Sass, SCSS, CSS preprocessors, or generated stylesheet source files without an explicit decision.
- Use pnpm and keep `pnpm-lock.yaml` committed.
- Before adding a package, record: its use case, native alternative, bundle/runtime impact, browser support, maintenance status, and removal cost.
- Prefer small, focused utilities over framework-wide additions.
- Review direct dependencies periodically and remove unused packages.

## Permissions, privacy, and security

- Request only the permissions and host patterns needed for the current feature.
- Prefer optional permissions when a feature can be enabled on demand.
- Avoid remote-hosted executable code, `eval`, and dynamic script loading.
- Sanitize or safely render untrusted page, network, and message content. Never use it as HTML without a deliberate sanitization boundary.
- Keep personal data in browser storage only when needed, document its purpose, and avoid sending it off-device unless the user initiated it.

## UI and accessibility

- Preserve keyboard navigation, visible focus, semantic controls, accessible names, and contrast when changing the UI.
- Add every new user-facing string to all supported locales.
- Keep visual styles consistent with the extension's CSS tokens and Fontin typography where the UI already uses it.
- Test the relevant view on both compact and normal sidebar widths.

## Change checklist

Before considering a change complete:

- [ ] The change has a clear owner context: content script, service worker, UI, or shared service.
- [ ] New messages and storage data are typed and validated.
- [ ] Permissions and host patterns have not broadened unnecessarily.
- [ ] New dependencies were justified against a native alternative.
- [ ] New UI strings exist in every locale.
- [ ] `pnpm run typecheck` passes.
- [ ] Chrome and Firefox builds pass when the change affects build, manifest, or extension behavior.
- [ ] The changed flow was manually verified where it touches the live trade site.

## Decision records

When a change affects architecture, dependencies, permissions, or the build stack, add a short decision note to the relevant issue, pull request, or `docs/ARCHITECTURE.md`:

1. Context and problem.
2. Options considered.
3. Chosen option and why.
4. Consequences, including how to reverse it.

## Official references

- [Chrome extension service workers](https://developer.chrome.com/docs/extensions/develop/concepts/service-workers)
- [Chrome content scripts](https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts)
- [Chrome message passing](https://developer.chrome.com/docs/extensions/develop/concepts/messaging)
- [Chrome permission warning guidelines](https://developer.chrome.com/docs/extensions/develop/concepts/permission-warnings)
