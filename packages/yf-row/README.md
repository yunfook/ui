# yf-row

Responsive React row layout with one main panel and optional side panels that match the main panel height on desktop.

## Install

```bash
pnpm add yf-row
```

## Usage

```tsx
import { Row, RowItem } from "yf-row"

function Example() {
  return (
    <Row>
      <RowItem main>
        <main>Main content</main>
      </RowItem>
      <RowItem width="280px">
        <aside>Sidebar</aside>
      </RowItem>
    </Row>
  )
}
```

## Behavior

- Items sit side by side.
- The `main` item becomes the reference height.
- Non-main items scroll internally if they are taller than the main item.
- `width` makes a `RowItem` fixed-width.

## API

### `Row`

Extends `React.ComponentPropsWithoutRef<"div">`.

### `RowItem`

Extends `React.ComponentPropsWithoutRef<"div">` and supports:

- `main?: boolean`
- `width?: string`

## Publishing

Before publishing:

1. Confirm the package name you want to use on npm.
2. Add your preferred license metadata.
3. Run `pnpm --dir packages/yf-row build`.
4. Publish from `packages/yf-row`.
