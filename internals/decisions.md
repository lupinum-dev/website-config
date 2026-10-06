# Decisions

A short, dated log of choices a future maintainer or agent might otherwise undo.
Add one line per decision: `Dn (YYYY-MM-DD): decision — why.` Replace a line
when a decision changes; git keeps the history.

- D1 (2026-09-30): Start from the Lupinum OSS `library` starter — every Lupinum repository shares one release, security and CI setup, so fixes to the standard apply everywhere.
- D2 (2026-09-30): Plugin versions are exact dependencies of this package — a site gets one tested set of ESLint plugins per release, and Renovate rolls a change out to every site as one update.
- D3 (2026-09-30): ESLint covers Vue templates only — oxlint cannot parse `<template>` yet ([oxc#11440](https://github.com/oxc-project/oxc/issues/11440)); when it can, `lupinumTemplateLint` is removed in a major release.
- D4 (2026-09-30): Record the initial release note directly in `CHANGELOG.md` at the starting version 0.1.0 — a pending minor changeset would open a 0.2.0 version PR and block the handbook's first-publication artifact for 0.1.0.
- D5 (2026-10-06): Follow the Lupinum OSS standard at lupinum-oss 834961b — release machinery, CI, layout and templates come from the `library` starter; update them by copying the starter again, not by editing them here.
- D6 (2026-10-06): README only, no docs site and no `./agent-docs` export — two functions with a few options fit in the README and the doc comments, and a site would be one more deployment to keep current for almost no readers.
