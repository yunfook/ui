import { createFileRoute } from "@tanstack/react-router"
import { InstallCommand } from "@/components/combo/install-command"

import { CodeBlock } from "@/components/ui/code-block"
import { Memo, MemoItem, MemoTitle } from "@/components/ui/memo"
import { Row, RowItem } from "@/components/ui/row"

export const Route = createFileRoute("/ui/memo")({
  component: MemoPage,
})

const dataCode = `import { Memo } from "@/components/ui/memo"

<Memo
  data={[
    { title: "Interaction", items: ["Triggers haptic()", "Tighter active scale"] },
    { title: "Reuse", items: ["Exports haptic for manual reuse"] },
  ]}
/>`

const composeCode = `import { Memo, MemoItem, MemoTitle } from "@/components/ui/memo"

<Memo>
  <MemoTitle>Interaction</MemoTitle>
  <MemoItem>Every press triggers <code>haptic()</code></MemoItem>
  <MemoItem>Active scale gives taps a tighter response</MemoItem>
  <MemoTitle className="pt-3">Reuse</MemoTitle>
  <MemoItem>The package also exports <code>haptic</code></MemoItem>
</Memo>`

const memoData = [
  {
    title: "Interaction",
    items: [
      "Every press triggers haptic() on supported devices.",
      "Active scale gives taps a tighter, more tactile response.",
    ],
  },
  {
    title: "Reuse",
    items: ["The package also exports haptic for manual reuse."],
  },
]

function MemoPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 p-8">
      <div>
        <h1 className="text-2xl font-bold">Memo</h1>
        <InstallCommand />
        <p className="text-sm text-muted-foreground">
          A grouped memo surface with multiple titled sections. Pass{" "}
          <code className="text-foreground">data</code> for plug-and-use, or
          compose <code className="text-foreground">MemoTitle</code> +{" "}
          <code className="text-foreground">MemoItem</code> manually for
          custom JSX.
        </p>
      </div>
      <Row>
        <RowItem main>
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-muted/30 p-6">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                Data-driven
              </h3>
              <Memo data={memoData} />
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                Composition (custom JSX in items)
              </h3>
              <Memo>
                <MemoTitle>Interaction</MemoTitle>
                <MemoItem>
                  Every press triggers <code>haptic()</code> on supported
                  devices.
                </MemoItem>
                <MemoItem>
                  Active scale gives taps a tighter, more tactile response.
                </MemoItem>
                <MemoTitle className="pt-3">Reuse</MemoTitle>
                <MemoItem>
                  The package also exports <code>haptic</code> for manual
                  reuse.
                </MemoItem>
              </Memo>
            </div>
          </div>
        </RowItem>
        <RowItem>
          <div className="flex flex-col gap-4">
            <CodeBlock filename="memo-data.tsx" content={dataCode} />
            <CodeBlock filename="memo-compose.tsx" content={composeCode} />
          </div>
        </RowItem>
      </Row>
    </div>
  )
}
