import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { InstallCommand } from "@/components/combo/install-command"
import { CodeBlock } from '@/components/ui/code-block'
import { Row, RowItem } from '@/components/ui/row'
import { Switch } from '@/components/ui/switch'

export const Route = createFileRoute('/ui/switch')({ component: SwitchPage })

const code = `import { Switch } from "@/components/ui/switch"

// Default
<Switch checked={on} onCheckedChange={setOn} />

// Text variant with custom labels
<Switch variant="text" checkedLabel="Yes" uncheckedLabel="No" />

// Thumb variant
<Switch variant="thumb" checkedLabel="✓" uncheckedLabel="✗" />

// Small size (works on all variants)
<Switch size="sm" />
<Switch variant="text" size="sm" />
<Switch variant="thumb" size="sm" />`

function SwitchPage() {
  const [on, setOn] = useState(false)

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 p-8">
      <h1 className="text-2xl font-bold">Switch</h1>
      <InstallCommand />
      <Row>
        <RowItem main>
          <div className="flex flex-col gap-5 rounded-xl border border-border bg-muted/30 p-6">
            <div className="flex items-center gap-3">
              <Switch checked={on} onCheckedChange={setOn} />
              <span className="text-sm text-muted-foreground">Default</span>
            </div>
            <div className="flex items-center gap-3">
              <Switch size="sm" checked={on} onCheckedChange={setOn} />
              <span className="text-sm text-muted-foreground">Default sm</span>
            </div>
            <div className="flex items-center gap-3">
              <Switch variant="text" checked={on} onCheckedChange={setOn} checkedLabel="Yes" uncheckedLabel="No" />
              <span className="text-sm text-muted-foreground">Text</span>
            </div>
            <div className="flex items-center gap-3">
              <Switch variant="text" size="sm" checked={on} onCheckedChange={setOn} />
              <span className="text-sm text-muted-foreground">Text sm</span>
            </div>
            <div className="flex items-center gap-3">
              <Switch variant="thumb" checked={on} onCheckedChange={setOn} checkedLabel="Yes" uncheckedLabel="No" />
              <span className="text-sm text-muted-foreground">Thumb</span>
            </div>
            <div className="flex items-center gap-3">
              <Switch variant="thumb" size="sm" checked={on} onCheckedChange={setOn} checkedLabel="Yes" uncheckedLabel="No" />
              <span className="text-sm text-muted-foreground">Thumb sm</span>
            </div>
          </div>
        </RowItem>
        <RowItem>
          <CodeBlock filename="switch.tsx" content={code} />
        </RowItem>
      </Row>
    </div>
  )
}
