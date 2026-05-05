import { createFileRoute } from "@tanstack/react-router"
import { InstallCommand } from "@/components/combo/install-command"
import { CodeBlock } from "@/components/ui/code-block"
import { Row, RowItem } from "@/components/ui/row"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

export const Route = createFileRoute("/ui/field")({ component: FieldPage })

const code = `import {
  Field, FieldGroup, FieldSet, FieldLegend, FieldLabel,
  FieldTitle, FieldDescription, FieldError, FieldContent, FieldSeparator,
} from "@/components/ui/field"

// Vertical (default)
<Field>
  <FieldLabel htmlFor="name">Name</FieldLabel>
  <Input id="name" placeholder="Jane" />
  <FieldDescription>Shown publicly.</FieldDescription>
</Field>

// Horizontal — label sits next to control
<Field orientation="horizontal">
  <FieldContent>
    <FieldTitle>Notifications</FieldTitle>
    <FieldDescription>Email me on every comment.</FieldDescription>
  </FieldContent>
  <Switch />
</Field>

// Responsive — vertical on mobile, horizontal at @md (uses container queries)
<FieldGroup>
  <Field orientation="responsive">...</Field>
</FieldGroup>

// Grouped fieldset with legend
<FieldSet>
  <FieldLegend>Profile</FieldLegend>
  <FieldGroup>
    <Field>...</Field>
    <Field>...</Field>
  </FieldGroup>
</FieldSet>

// Error display — accepts string[] or { message }[]
<Field>
  <FieldLabel>Email</FieldLabel>
  <Input aria-invalid />
  <FieldError errors={["Required", "Must be valid email"]} />
</Field>

// Separator between groups
<FieldSeparator />
<FieldSeparator>OR</FieldSeparator>`

function FieldPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 p-8">
      <div>
        <h1 className="text-2xl font-bold">Field</h1>
        <p className="text-sm text-muted-foreground">
          Form-layout primitives — Field, FieldGroup, FieldSet, label, description,
          error, separator. Compose by hand, or use <code>FormField</code> (combo)
          for the TanStack-Form-bound version.
        </p>
      </div>
      <InstallCommand />
      <Row>
        <RowItem main>
          <div className="flex flex-col gap-8 rounded-xl border border-border bg-muted/30 p-6">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                Vertical (default)
              </h3>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name-v">Name</FieldLabel>
                  <Input id="name-v" placeholder="Jane Doe" />
                  <FieldDescription>Shown publicly on your profile.</FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="email-v">Email</FieldLabel>
                  <Input id="email-v" type="email" placeholder="you@example.com" />
                </Field>
              </FieldGroup>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                Horizontal
              </h3>
              <FieldGroup>
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>Email notifications</FieldTitle>
                    <FieldDescription>Get notified on every comment.</FieldDescription>
                  </FieldContent>
                  <Switch defaultChecked />
                </Field>
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>Marketing emails</FieldTitle>
                    <FieldDescription>Occasional product updates.</FieldDescription>
                  </FieldContent>
                  <Switch />
                </Field>
              </FieldGroup>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                Responsive — vertical on narrow, horizontal at @md
              </h3>
              <FieldGroup>
                <Field orientation="responsive">
                  <FieldContent>
                    <FieldTitle>Display name</FieldTitle>
                    <FieldDescription>Resize the panel to see the layout flip.</FieldDescription>
                  </FieldContent>
                  <Input placeholder="Jane" className="@md:max-w-xs" />
                </Field>
              </FieldGroup>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                FieldSet with legend
              </h3>
              <FieldSet>
                <FieldLegend>Profile</FieldLegend>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="first-name">First name</FieldLabel>
                    <Input id="first-name" placeholder="Jane" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="last-name">Last name</FieldLabel>
                    <Input id="last-name" placeholder="Doe" />
                  </Field>
                </FieldGroup>
              </FieldSet>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                Error display
              </h3>
              <Field>
                <FieldLabel htmlFor="email-err">Email</FieldLabel>
                <Input id="email-err" aria-invalid placeholder="you@example.com" />
                <FieldError errors={["Required", "Must be a valid email"]} />
              </Field>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                Separators
              </h3>
              <div className="flex flex-col gap-4">
                <FieldSeparator />
                <FieldSeparator>OR</FieldSeparator>
              </div>
            </div>
          </div>
        </RowItem>
        <RowItem>
          <CodeBlock filename="field.tsx" content={code} />
        </RowItem>
      </Row>
    </div>
  )
}
