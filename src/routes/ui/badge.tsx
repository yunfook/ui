import { createFileRoute } from '@tanstack/react-router'
import { CodeBlock } from '@/components/ui/code-block'
import { Row, RowItem } from '@/components/ui/row'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/ui/badge')({ component: BadgePage })

const code = `import { Badge } from "@/components/ui/badge"

// Variants
<Badge>Default</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>

// Square with sizes
<Badge square size="sm">SM</Badge>
<Badge square>Default</Badge>
<Badge square size="lg">Active</Badge>`

function BadgePage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 p-8">
      <h1 className="text-2xl font-bold">Badge</h1>
      <Row>
        <RowItem main>
          <div className="flex flex-col gap-6 rounded-xl border border-border bg-muted/30 p-6">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Rounded</h3>
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Square — sm</h3>
              <div className="flex flex-wrap gap-2">
                <Badge square size="sm">Default</Badge>
                <Badge square size="sm" variant="danger">Danger</Badge>
                <Badge square size="sm" variant="success">Success</Badge>
                <Badge square size="sm" variant="warning">Warning</Badge>
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Square — default</h3>
              <div className="flex flex-wrap gap-2">
                <Badge square>Active</Badge>
                <Badge square variant="danger">Expired</Badge>
                <Badge square variant="success">Approved</Badge>
                <Badge square variant="warning">Pending</Badge>
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Square — lg</h3>
              <div className="flex flex-wrap gap-2">
                <Badge square size="lg">Active</Badge>
                <Badge square size="lg" variant="danger">Expired</Badge>
                <Badge square size="lg" variant="success">Approved</Badge>
                <Badge square size="lg" variant="warning">Pending</Badge>
              </div>
            </div>
          </div>
        </RowItem>
        <RowItem>
          <CodeBlock filename="badge.tsx" content={code} />
        </RowItem>
      </Row>
    </div>
  )
}
