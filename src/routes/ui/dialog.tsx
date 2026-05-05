import { createFileRoute } from "@tanstack/react-router"

import { Button } from "@/components/ui/button"
import { CodeBlock } from "@/components/ui/code-block"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  type DialogSize,
} from "@/components/ui/dialog"
import { Row, RowItem } from "@/components/ui/row"

export const Route = createFileRoute("/ui/dialog")({
  component: DialogPage,
})

const code = `import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger render={<Button>Open</Button>} />
  <DialogContent size="m" blur draggable>
    {/* size: "s" | "m" | "l" | "xl" — maps to 20/40/60/80 vw */}
    {/* blur: stronger backdrop blur on the bg outside */}
    {/* draggable: drag the dialog by its DialogHeader */}
    <DialogHeader separator>
      <DialogTitle>Drag me by the header</DialogTitle>
    </DialogHeader>
    {/* separator: edge-to-edge divider on Header/Footer */}
  </DialogContent>
</Dialog>`

const sizes: { size: DialogSize; label: string; width: string }[] = [
  { size: "s", label: "Small", width: "20vw" },
  { size: "m", label: "Medium", width: "40vw" },
  { size: "l", label: "Large", width: "60vw" },
  { size: "xl", label: "Extra Large", width: "80vw" },
]

function DialogPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 p-8">
      <div>
        <h1 className="text-2xl font-bold">Dialog</h1>
        <p className="text-sm text-muted-foreground">
          Modal dialog with predefined{" "}
          <code className="text-foreground">size</code> variants. Without{" "}
          <code className="text-foreground">size</code>, falls back to{" "}
          <code className="text-foreground">sm:max-w-md</code>.
        </p>
      </div>
      <Row>
        <RowItem main>
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-muted/30 p-6">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                Default (no size)
              </h3>
              <Dialog>
                <DialogTrigger
                  render={<Button variant="outline">Open default</Button>}
                />
                <DialogContent>
                  <DialogHeader separator>
                    <DialogTitle>Default Dialog</DialogTitle>
                  </DialogHeader>
                  <div className="text-sm text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </div>
                  <DialogFooter separator>
                    <DialogClose
                      render={<Button variant="outline">Cancel</Button>}
                    />
                    <DialogClose render={<Button>Confirm</Button>} />
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                Draggable (with blur)
              </h3>
              <Dialog>
                <DialogTrigger
                  render={<Button variant="outline">Open draggable</Button>}
                />
                <DialogContent draggable blur>
                  <DialogHeader separator>
                    <DialogTitle>Drag me by the header</DialogTitle>
                    <DialogDescription>
                      Press and drag this header area to move the dialog.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="text-sm text-muted-foreground">
                    Body content is not a drag handle, so inputs and buttons
                    here still work normally.
                  </div>
                  <DialogFooter separator>
                    <DialogClose
                      render={<Button variant="outline">Cancel</Button>}
                    />
                    <DialogClose render={<Button>Confirm</Button>} />
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                Size variants
              </h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map(({ size, label, width }) => (
                  <Dialog key={size}>
                    <DialogTrigger
                      render={
                        <Button variant="outline">
                          {label} ({width})
                        </Button>
                      }
                    />
                    <DialogContent size={size}>
                      <DialogHeader separator>
                        <DialogTitle>{label} Dialog</DialogTitle>
                        <DialogDescription>
                          Uses <code>size="{size}"</code> which maps to{" "}
                          {width}.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="text-sm text-muted-foreground">
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                      </div>
                      <DialogFooter separator>
                        <DialogClose
                          render={<Button variant="outline">Cancel</Button>}
                        />
                        <DialogClose render={<Button>Confirm</Button>} />
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>
          </div>
        </RowItem>
        <RowItem>
          <CodeBlock filename="dialog.tsx" content={code} />
        </RowItem>
      </Row>
    </div>
  )
}
