import { createFileRoute } from "@tanstack/react-router"

import { CodeBlock } from "@/components/ui/code-block"
import { Row, RowItem } from "@/components/ui/row"
import { Confirmation } from "@/components/combo/confirmation"

export const Route = createFileRoute("/combo/confirmation")({
  component: ConfirmationPage,
})

const code = `import { Confirmation } from "@/components/combo/confirmation"

// Plain
<Confirmation
  text="Submit"
  description="Send your application for review."
  confirm="Submit"
  cancel="Not yet"
  onConfirm={() => submit()}
/>

// Destructive — variant flows from trigger to confirm button
<Confirmation
  text="Delete"
  title="Delete this record?"
  description="This action cannot be undone."
  confirm="Delete"
  cancel="Keep"
  variant="danger"
  onConfirm={() => deleteRecord()}
/>

// With value (passed to onConfirm — handy for table rows)
<Confirmation<Row>
  text="Delete"
  variant="danger"
  value={row.original}
  onConfirm={(row) => deleteRecord(row.id)}
/>`

function ConfirmationPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 p-8">
      <div>
        <h1 className="text-2xl font-bold">Confirmation</h1>
        <p className="text-sm text-muted-foreground">
          Confirmation dialog with three severities — default, warning, danger.
          Variant styles both the trigger and the confirm button; cancel is
          always outline.
        </p>
      </div>
      <Row>
        <RowItem main>
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-muted/30 p-6">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                Default
              </h3>
              <Confirmation
                text="Submit Application"
                title="Submit application?"
                description="Your application will be sent for review."
                confirm="Submit"
                cancel="Not yet"
                onConfirm={() => console.log("submitted")}
                onCancel={() => console.log("cancelled")}
              />
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                Warning
              </h3>
              <Confirmation
                text="Reset Settings"
                title="Reset to defaults?"
                description="Your customizations will be lost."
                confirm="Reset"
                cancel="Keep"
                variant="warning"
                onConfirm={() => console.log("reset")}
              />
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                Danger
              </h3>
              <Confirmation
                text="Delete Record"
                title="Delete this record?"
                description="This action cannot be undone."
                confirm="Delete"
                cancel="Keep"
                variant="danger"
                onConfirm={() => console.log("deleted")}
              />
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                Mirror (cancel first)
              </h3>
              <Confirmation
                text="Save & Exit"
                title="Save changes?"
                description="Your changes will be saved before exiting."
                confirm="Save"
                cancel="Discard"
                mirror
                onConfirm={() => console.log("saved")}
              />
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                With value (passed to onConfirm)
              </h3>
              <Confirmation<{ id: string; name: string }>
                text="Delete user 'Alice'"
                title="Delete user?"
                description="This action cannot be undone."
                confirm="Delete"
                cancel="Keep"
                variant="danger"
                value={{ id: "u_42", name: "Alice" }}
                onConfirm={(user) =>
                  console.log("deleted", user.id, user.name)
                }
              />
            </div>
          </div>
        </RowItem>
        <RowItem>
          <CodeBlock filename="confirmation.tsx" content={code} />
        </RowItem>
      </Row>
    </div>
  )
}
