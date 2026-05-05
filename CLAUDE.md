# YF UI

Reusable component library built on top of shadcn. Will become a shadcn registry.
Components are being ported from a previous project.

## Stack

- **Runtime**: React 19, TypeScript
- **Routing**: TanStack Router (file-based, `src/routes/`)
- **Styling**: Tailwind CSS v4, shadcn v4 (Base UI primitives, not Radix)
- **Utilities**: `cva` for variants, `cn()` from `src/lib/utils.ts` (clsx + twMerge)
- **Icons**: lucide-react
- **Font**: Inter Variable
- **Testing**: Vitest + Testing Library
- **Package manager**: pnpm

## Commands

- `pnpm dev` — dev server on port 3000
- `pnpm build` — production build
- `pnpm test` — run tests (vitest)
- `npx shadcn@latest add <component>` — add a shadcn component

## Project structure

```
src/
  components/ui/   — reusable components (shadcn + custom)
  lib/utils.ts     — cn() helper
  routes/          — TanStack file-based routes (for previewing components)
  styles.css       — Tailwind + shadcn theme tokens
```

## Conventions

- Import alias: `@/*` maps to `./src/*` (e.g. `import { cn } from "@/lib/utils"`) — required convention for the shadcn registry rewriter
- Components go in `src/components/ui/` and export from the file directly
- Use `cva` for variant definitions, `cn()` for class merging
- shadcn uses Base UI primitives (not Radix) — import from `@base-ui/react`
- Keep components headless-friendly: style via Tailwind classes, not inline styles
- Routes are only for previewing/demoing components, not the main deliverable
