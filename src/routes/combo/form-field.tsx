import * as React from "react"
import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"

import { CodeBlock } from "@/components/ui/code-block"
import { FieldGroup } from "@/components/ui/field"
import { Row, RowItem } from "@/components/ui/row"
import { useAppForm } from "@/lib/form"
import { InstallCommand } from "@/components/combo/install-command"

export const Route = createFileRoute("/combo/form-field")({
  component: FormFieldPage,
})

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  forwardingEnabled: z.boolean(),
  forwardingEmail: z.string().email("Enter a valid email").or(z.literal("")),
})

const code = `import { z } from "zod"
import { useAppForm } from "@/lib/form"
import { FieldGroup } from "@/components/ui/field"

const schema = z.object({
  email: z.string().email(),
  forwardingEnabled: z.boolean(),
  forwardingEmail: z.string().email().or(z.literal("")),
})

const form = useAppForm({
  defaultValues: {
    email: "",
    forwardingEnabled: false,
    forwardingEmail: "",
  },
  validators: { onSubmit: schema },
  onSubmit: ({ value }) => save(value),
})

<form onSubmit={(e) => { e.preventDefault(); form.handleSubmit() }}>
  <FieldGroup>
    <form.AppField name="email">
      {(field) => (
        <field.FormField label="Email" important>
          <field.Input type="email" placeholder="you@example.com" />
        </field.FormField>
      )}
    </form.AppField>

    <form.AppField name="forwardingEnabled">
      {(toggleField) => (
        <form.AppField name="forwardingEmail">
          {(field) => (
            <field.FormField
              label="Forwarding email"
              toggle
              toggleField={toggleField}
              description="Mail will be forwarded here when enabled."
            >
              <field.Input type="email" placeholder="alias@example.com" />
            </field.FormField>
          )}
        </form.AppField>
      )}
    </form.AppField>

    <form.AppForm>
      <form.SubmitButton>Save</form.SubmitButton>
    </form.AppForm>
  </FieldGroup>
</form>`

function FormFieldPage() {
  const [submitted, setSubmitted] = React.useState<unknown>(null)

  const form = useAppForm({
    defaultValues: {
      email: "",
      forwardingEnabled: false,
      forwardingEmail: "",
    },
    validators: { onSubmit: schema },
    onSubmit: ({ value }) => {
      setSubmitted(value)
    },
  })

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 p-8">
      <div>
        <h1 className="text-2xl font-bold">FormField</h1>
        <p className="text-sm text-muted-foreground">
          TanStack-Form-bound field container. <code>important</code> adds an
          asterisk; <code>toggle</code> renders a checkbox beside the label
          that disables the input. Children (Input/Checkbox/Select) auto-bind
          to the surrounding field via context.
        </p>
      </div>
      <InstallCommand />
      <Row>
        <RowItem main>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
            className="rounded-xl border border-border bg-background p-6"
          >
            <FieldGroup>
              <form.AppField name="email">
                {(field) => (
                  <field.FormField label="Email" important>
                    <field.Input type="email" placeholder="you@example.com" />
                  </field.FormField>
                )}
              </form.AppField>

              <form.AppField name="forwardingEnabled">
                {(toggleField) => (
                  <form.AppField name="forwardingEmail">
                    {(field) => (
                      <field.FormField
                        label="Forwarding email"
                        toggle
                        toggleField={toggleField}
                        description="Mail will be forwarded here when enabled."
                      >
                        <field.Input
                          type="email"
                          placeholder="alias@example.com"
                        />
                      </field.FormField>
                    )}
                  </form.AppField>
                )}
              </form.AppField>

              <form.AppForm>
                <form.SubmitButton>Save</form.SubmitButton>
              </form.AppForm>

              {submitted != null && (
                <pre className="rounded-md border border-border bg-muted p-3 text-xs">
                  {JSON.stringify(submitted, null, 2)}
                </pre>
              )}
            </FieldGroup>
          </form>
        </RowItem>
        <RowItem>
          <CodeBlock filename="form-field.tsx" content={code} />
        </RowItem>
      </Row>
    </div>
  )
}
