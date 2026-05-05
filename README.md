# yf-ui

A shadcn registry of reusable React components, built on top of [shadcn/ui](https://ui.shadcn.com) v4 with [Base UI](https://base-ui.com) primitives.

## Using in your project

### 1. Bootstrap shadcn (once per project)

```sh
npx shadcn@latest init
```

Pick **Tailwind v4** + **TypeScript**. This sets up `components.json`, your CSS theme tokens, and the `cn()` utility.

### 2. Apply the yf-ui theme

```sh
npx shadcn@latest add https://yf-ui.vercel.app/r/theme.json
```

This overwrites the default shadcn neutral palette with yf-ui's blue OKLCH tokens and extends the radius scale (`--radius-sm` through `--radius-4xl`). The font is left to your shadcn preset (e.g. `nova` ships Inter).

### 3. Add components

```sh
npx shadcn@latest add https://yf-ui.vercel.app/r/button.json
npx shadcn@latest add https://yf-ui.vercel.app/r/dialog.json
# ...etc
```

Components are copied into `src/components/ui/` (you own the source) and any cross-component dependencies (`utils`, `popover`, etc.) are pulled in automatically.

## Available components

| Category | Components |
|---|---|
| Theme | `theme` |
| Lib | `utils`, `color-utils`, `form-context` |
| Inputs | `button`, `capsule-button`, `submit-button`, `checkbox`, `input`, `radio-group`, `pill-radio`, `switch`, `select`, `multiselect`, `autocomplete`, `signature-pad`, `color-picker` |
| Display | `badge`, `code-block`, `hyperlink`, `item`, `list`, `memo`, `separator`, `spinner`, `table`, `expandable` |
| Overlay | `dialog`, `popover`, `dropdown-menu`, `panel`, `palette`, `sonner` |
| Layout | `row`, `field` |
| Date / picker | `calendar`, `wheel` |

## Developing this registry

```sh
pnpm install
pnpm dev              # preview components on localhost:3000
pnpm registry:build   # emit public/r/*.json
pnpm build            # full Vite build (registry + preview app)
pnpm test             # vitest
```

The `src/routes/` tree is the preview app — not shipped to consumers.

## License

MIT
