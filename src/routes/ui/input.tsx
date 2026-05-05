import { useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { InstallCommand } from "@/components/combo/install-command"
import { CodeBlock } from "@/components/ui/code-block"
import { Row, RowItem } from "@/components/ui/row"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"

export const Route = createFileRoute("/ui/input")({ component: InputPage })

const code = `import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field"

// Plain — works as a normal input
<Input placeholder="Type here..." />

// Controlled
const [value, setValue] = useState("")
<Input value={value} onChange={(e) => setValue(e.target.value)} />

// Types
<Input type="email" placeholder="you@example.com" />
<Input type="password" placeholder="••••••••" />
<Input type="number" placeholder="0" />

// Disabled / invalid
<Input disabled value="Disabled" />
<Input aria-invalid placeholder="Invalid" />

// Wrapped in a Field
<Field>
  <FieldLabel htmlFor="email">Email</FieldLabel>
  <Input id="email" type="email" placeholder="you@example.com" />
  <FieldDescription>We'll never share it.</FieldDescription>
  <FieldError errors={["Required"]} />
</Field>

// Inside a useAppForm — auto-binds to field context (no value/onChange needed)
<form.AppField name="email">
  {(field) => <field.Input type="email" placeholder="you@example.com" />}
</form.AppField>`

function InputPage() {
  const [value, setValue] = useState("")

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 p-8">
      <div>
        <h1 className="text-2xl font-bold">Input</h1>
        <p className="text-sm text-muted-foreground">
          Standard text input. Used standalone, or auto-binds to a TanStack-Form
          field when rendered inside <code>useAppForm</code>'s field context.
        </p>
      </div>
      <InstallCommand />
      <Row>
        <RowItem main>
          <div className="flex flex-col gap-6 rounded-xl border border-border bg-muted/30 p-6">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Plain</h3>
              <Input placeholder="Type here..." />
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Controlled</h3>
              <div className="flex flex-col gap-2">
                <Input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Live value below"
                />
                <p className="text-xs text-muted-foreground">
                  Value: {value || "(empty)"}
                </p>
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Types</h3>
              <div className="flex flex-col gap-2">
                <Input type="email" placeholder="you@example.com" />
                <Input type="password" placeholder="••••••••" />
                <Input type="number" placeholder="0" />
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">States</h3>
              <div className="flex flex-col gap-2">
                <Input disabled value="Disabled" readOnly />
                <Input aria-invalid placeholder="Invalid" />
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">In a Field</h3>
              <Field>
                <FieldLabel htmlFor="email-demo">Email</FieldLabel>
                <Input id="email-demo" type="email" placeholder="you@example.com" />
                <FieldDescription>We'll never share it.</FieldDescription>
                <FieldError errors={["Required"]} />
              </Field>
            </div>
          </div>
        </RowItem>
        <RowItem>
          <CodeBlock filename="input.tsx" content={code} />
        </RowItem>
      </Row>
    </div>
  )
}
