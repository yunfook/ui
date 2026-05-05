import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

const components = [
  { to: '/ui/badge', label: 'Badge', description: 'Status badges with square option' },
  { to: '/ui/button', label: 'Button', description: 'Variants, sizes, and icon support' },
  { to: '/ui/calendar', label: 'Calendar', description: 'Date picker — single, range, multiple, dropdown nav' },
  { to: '/ui/code-block', label: 'CodeBlock', description: 'Code display with line numbers and copy' },
  { to: '/ui/dialog', label: 'Dialog', description: 'Modal dialog with size variants' },
  { to: '/ui/panel', label: 'Panel', description: 'Right-anchored side panel with size variants' },
  { to: '/ui/list', label: 'List', description: 'Styled ul/li with header and empty state' },
  { to: '/ui/memo', label: 'Memo', description: 'Grouped memo surface with titled sections' },
  { to: '/ui/multiselect', label: 'MultiSelect', description: 'Multi-value select with checkboxes' },
  { to: '/ui/row', label: 'Row', description: 'Responsive row layout with height sync' },
  { to: '/ui/wheel', label: 'Wheel', description: 'Scroll wheel picker' },
  { to: '/ui/switch', label: 'Switch', description: 'Toggle with text and thumb variants' },
  { to: '/ui/pill-radio', label: 'PillRadio', description: 'Animated pill radio group' },
  { to: '/ui/capsule-button', label: 'CapsuleButton', description: 'Two-option capsule radio' },
  { to: '/ui/autocomplete', label: 'Autocomplete', description: 'Searchable select dropdown' },
  { to: '/ui/spinner', label: 'Spinner', description: 'Loading spinners with 5 variants' },
  { to: '/ui/palette', label: 'Palette', description: 'Tailwind color picker popover' },
  { to: '/ui/color-picker', label: 'ColorPicker', description: 'HSV color picker popover' },
  { to: '/ui/expandable', label: 'Expandable', description: 'Table row with expandable detail drawer' },
  { to: '/ui/hyperlink', label: 'Hyperlink', description: 'Decorated inline text link with icon' },
  { to: '/ui/signature-pad', label: 'SignaturePad', description: 'Bare canvas primitive for drawing a signature' },
  { to: '/combo/signature-dialog', label: 'SignatureDialog', description: 'Dialog + pad + upload lifecycle', combo: true },
  { to: '/combo/confirmation', label: 'Confirmation', description: 'Confirm dialog with default/warning/danger variants', combo: true },
  { to: '/combo/month-year-picker', label: 'MonthYearPicker', description: 'Wheel-based month/year dropdown', combo: true },
  { to: '/combo/time-wheel-picker', label: 'TimeWheelPicker', description: 'Wheel-based time dropdown', combo: true },
  { to: '/combo/icon-button', label: 'IconButton', description: 'Icon button with animated swap on icon change', combo: true },
  { to: '/combo/form-field', label: 'FormField', description: 'TanStack-Form-bound field with toggle + important variants', combo: true },
  { to: '/combo/data-table', label: 'DataTable', description: 'TanStack-Table + Query — sort, paginate, select, loading/empty', combo: true },
  { to: '/combo/calendar-rest-days', label: 'CalendarRestDays', description: 'Calendar with toggleable per-weekday rest highlighting', combo: true },
  { to: '/animation/animation1', label: 'Animation1', description: 'Animation experiment', animation: true },
] as const

function App() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 p-8">
      <h1 className="flex items-center gap-2 text-2xl font-bold">
        <img src="/favicon.svg" alt="YF" className="size-8" />
        YF UI
      </h1>
      <p className="text-muted-foreground">Reusable component library built on shadcn.</p>

      <div>
        <h2 className="mb-3 text-lg font-semibold">Base UI</h2>
        <div className="flex flex-col gap-2">
          {components.filter((c) => !('combo' in c) && !('animation' in c)).map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3 no-underline transition hover:bg-muted/50"
            >
              <span className="font-medium text-foreground">{c.label}</span>
              <span className="text-sm text-muted-foreground">{c.description}</span>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold">Combo</h2>
        <div className="flex flex-col gap-2">
          {components.filter((c) => 'combo' in c).map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3 no-underline transition hover:bg-muted/50"
            >
              <span className="font-medium text-foreground">{c.label}</span>
              <span className="text-sm text-muted-foreground">{c.description}</span>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold">Animation</h2>
        <div className="flex flex-col gap-2">
          {components.filter((c) => 'animation' in c).map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3 no-underline transition hover:bg-muted/50"
            >
              <span className="font-medium text-foreground">{c.label}</span>
              <span className="text-sm text-muted-foreground">{c.description}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
