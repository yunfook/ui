import { createFileRoute } from "@tanstack/react-router"

import { Button } from "@/components/ui/button"
import { CodeBlock } from "@/components/ui/code-block"
import {
  Panel,
  PanelClose,
  PanelContent,
  PanelDescription,
  PanelFooter,
  PanelHeader,
  PanelTitle,
  PanelTrigger,
  type PanelSize,
} from "@/components/ui/panel"
import { Row, RowItem } from "@/components/ui/row"

export const Route = createFileRoute("/ui/panel")({
  component: PanelPage,
})

const code = `import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
  PanelTrigger,
} from "@/components/ui/panel"

<Panel>
  <PanelTrigger asChild>
    <Button>Open</Button>
  </PanelTrigger>
  <PanelContent size="m" blur>
    {/* size: "s" | "m" | "l" — caps width at sm:max-w-md/2xl/5xl */}
    {/* blur: stronger backdrop blur on the bg outside */}
    <PanelHeader separator>
      <PanelTitle>Panel</PanelTitle>
    </PanelHeader>
    {/* separator: divider line on Header/Footer */}
  </PanelContent>
</Panel>`

const sizes: { size: PanelSize; label: string; width: string }[] = [
  { size: "s", label: "Small", width: "max-w-md" },
  { size: "m", label: "Medium", width: "max-w-2xl" },
  { size: "l", label: "Large", width: "max-w-5xl" },
]

function PanelPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 p-8">
      <div>
        <h1 className="text-2xl font-bold">Panel</h1>
        <p className="text-sm text-muted-foreground">
          Right-anchored side panel with predefined{" "}
          <code className="text-foreground">size</code> variants and an
          optional <code className="text-foreground">blur</code> overlay.
        </p>
      </div>
      <Row>
        <RowItem main>
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-muted/30 p-6">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                Size variants
              </h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map(({ size, label, width }) => (
                  <Panel key={size}>
                    <PanelTrigger asChild>
                      <Button variant="outline">
                        {label} ({width})
                      </Button>
                    </PanelTrigger>
                    <PanelContent size={size}>
                      <PanelHeader separator>
                        <PanelTitle>{label} Panel</PanelTitle>
                        <PanelDescription>
                          Uses <code>size="{size}"</code> capped at {width}.
                        </PanelDescription>
                      </PanelHeader>
                      <div className="flex-1 overflow-y-auto px-6 text-muted-foreground">
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                      </div>
                      <PanelFooter separator>
                        <PanelClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </PanelClose>
                        <PanelClose asChild>
                          <Button>Confirm</Button>
                        </PanelClose>
                      </PanelFooter>
                    </PanelContent>
                  </Panel>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                With blur
              </h3>
              <Panel>
                <PanelTrigger asChild>
                  <Button variant="outline">Open with blur</Button>
                </PanelTrigger>
                <PanelContent size="m" blur>
                  <PanelHeader separator>
                    <PanelTitle>Blurred backdrop</PanelTitle>
                    <PanelDescription>
                      Background content is blurred while this panel is open.
                    </PanelDescription>
                  </PanelHeader>
                  <div className="flex-1 overflow-y-auto px-6 text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </div>
                  <PanelFooter separator>
                    <PanelClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </PanelClose>
                    <PanelClose asChild>
                      <Button>Confirm</Button>
                    </PanelClose>
                  </PanelFooter>
                </PanelContent>
              </Panel>
            </div>
          </div>
        </RowItem>
        <RowItem>
          <CodeBlock filename="panel.tsx" content={code} />
        </RowItem>
      </Row>
    </div>
  )
}
