import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { CodeBlock } from '@/components/ui/code-block'
import { Row, RowItem } from '@/components/ui/row'

export const Route = createFileRoute('/ui/button')({ component: ButtonPage })

const code = `import { Button } from "@/components/ui/button"

// Variants
<Button>Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="xs">XS</Button>
<Button size="sm">SM</Button>
<Button size="default">Default</Button>
<Button size="lg">LG</Button>`

function ButtonPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 p-8">
      <h1 className="text-2xl font-bold">Button</h1>
      <Row>
        <RowItem main>
          <div className="flex flex-col gap-6 rounded-xl border border-border bg-muted/30 p-6">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Variants</h3>
              <div className="flex flex-wrap gap-3">
                <Button>Default</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="success">Success</Button>
                <Button variant="warning">Warning</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Sizes</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="xs">XS</Button>
                <Button size="sm">SM</Button>
                <Button size="default">Default</Button>
                <Button size="lg">LG</Button>
              </div>
            </div>
          </div>
        </RowItem>
        <RowItem>
          <CodeBlock filename="button.tsx" content={code} />
        </RowItem>
      </Row>
    </div>
  )
}
