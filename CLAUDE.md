# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio/CV site for Lucas Favareto. Angular 18 standalone components, managed via Nx 20, tested with Jest + jest-preset-angular. The only route is `/` (profile page); `/curriculum` redirects there.

## Commands

```bash
npm start          # dev server (http://localhost:4200)
npm run build      # production build → dist/lucasfavareto/browser/
npm test           # run all Jest tests
nx test --testFile=src/app/components/foo/foo.component.spec.ts  # single spec
nx lint            # ESLint
```

## Architecture

All components are **standalone** (no NgModule). The single entry point is `ProfileComponent` (`src/app/pages/profile/profile.component.ts`), which is lazy-loaded by the router and composes these presentational components:

- `ProfileInfoComponent` — name / title card
- `ProfileLinksComponent` — GitHub / LinkedIn / email links (receives `links: ProfileLink[]` from `ProfileComponent`)
- `CurriculumAboutComponent` — about/bio section
- `CurriculumExperienceComponent` — work history; calculates live durations in Portuguese (`calcDuration`, `calcTotalExperience`) directly in the component class
- `HardSkillsComponent` — skills grid

There are no services, no state management, and no HTTP calls — all content is hardcoded in templates and component classes.

## Styling

Global CSS variables and base resets live in `src/styles.scss`. Each component uses a companion `.scss` file with component-scoped styles. The design uses CSS custom properties (`--color-*`, `--font-*`) defined in `:root` — prefer those over hardcoded values.

Component style budget: **2 kb warning / 4 kb error** (enforced by Angular build budgets).

## Conventions

- Component selector prefix: `app-` (kebab-case elements, camelCase attributes) — enforced by ESLint.
- When adding a new experience entry, update both the HTML template and the `periods` array in `CurriculumExperienceComponent` so the calculated duration stays accurate.
- Duration strings are in Brazilian Portuguese (e.g., "2 anos e 3 meses").
