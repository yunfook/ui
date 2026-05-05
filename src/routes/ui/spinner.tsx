import { createFileRoute } from '@tanstack/react-router'
import { InstallCommand } from "@/components/combo/install-command"
import { CodeBlock } from '@/components/ui/code-block'
import { Row, RowItem } from '@/components/ui/row'
import { Spinner } from '@/components/ui/spinner'

export const Route = createFileRoute('/ui/spinner')({ component: SpinnerPage })

const code = `import { Spinner } from "@/components/ui/spinner"

<Spinner />                    // default (Loader2 spin)
<Spinner variant="dots" />     // bouncing dots
<Spinner variant="bars" />     // rotating fade bars
<Spinner variant="blocks" />   // shuffling blocks
<Spinner variant="clock" />    // clock hands

// Custom size
<Spinner className="size-8" />
<Spinner variant="dots" className="size-8" />`

function SpinnerPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 p-8">
      <h1 className="text-2xl font-bold">Spinner</h1>
      <InstallCommand />
      <Row>
        <RowItem main>
          <div className="rounded-xl border border-border bg-muted/30 p-6">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <Spinner className="size-6" />
                  <span className="text-xs text-muted-foreground">default</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Spinner variant="dots" className="size-6" />
                  <span className="text-xs text-muted-foreground">dots</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Spinner variant="bars" className="size-6" />
                  <span className="text-xs text-muted-foreground">bars</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Spinner variant="blocks" className="size-6" />
                  <span className="text-xs text-muted-foreground">blocks</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Spinner variant="clock" className="size-6" />
                  <span className="text-xs text-muted-foreground">clock</span>
                </div>
              </div>
              <div>
                <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Large (size-10)</h3>
                <div className="flex items-center gap-6">
                  <Spinner className="size-10" />
                  <Spinner variant="dots" className="size-10" />
                  <Spinner variant="bars" className="size-10" />
                  <Spinner variant="blocks" className="size-10" />
                  <Spinner variant="clock" className="size-10" />
                </div>
              </div>
            </div>
          </div>
        </RowItem>
        <RowItem>
          <CodeBlock filename="spinner.tsx" content={code} />
        </RowItem>
      </Row>
    </div>
  )
}
