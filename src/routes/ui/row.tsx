import { createFileRoute } from "@tanstack/react-router";
import { CodeBlock } from "@/components/ui/code-block";
import { Row, RowItem } from "@/components/ui/row";

export const Route = createFileRoute("/ui/row")({ component: RowPage });

const code = `import { Row, RowItem } from "yf-row"

// Main item sets the reference height
// Other items sync and scroll if taller
<Row>
  <RowItem main>
    Main content
  </RowItem>
  <RowItem width="200px">
    Fixed width sidebar
  </RowItem>
</Row>`;

function RowPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 p-8">
      <h1 className="text-2xl font-bold">Row</h1>
      <Row style={{ width: "400px" }}>
        <RowItem width="200px">
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-border bg-background p-4">
              <h3 className="mb-2 font-semibold">Main content</h3>
              <p className="text-sm text-muted-foreground">
                This is the main item. Other items sync their height to this
                one. It uses flex-1 to take the remaining width.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-4">
              <h3 className="mb-2 font-semibold">Another block</h3>
              <p className="text-sm text-muted-foreground">
                Multiple children stack inside a RowItem.
              </p>
            </div>
          </div>
        </RowItem>
        <RowItem  main>
          <div className="rounded-xl border border-border bg-background p-4">
            <h3 className="mb-2 font-semibold">Sidebar</h3>
            <p className="text-sm text-muted-foreground">
              Fixed 200px width. Scrolls if taller than main.
            </p>
          </div>
        </RowItem>
      </Row>
      <CodeBlock filename="row.tsx" content={code} />
    </div>
  );
}
