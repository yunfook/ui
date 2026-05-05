import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { CodeBlock } from '@/components/ui/code-block'
import { Row, RowItem } from '@/components/ui/row'
import { Palette } from '@/components/ui/palette'

export const Route = createFileRoute('/ui/palette')({ component: PalettePage })

const code = `import { Palette } from "@/components/ui/palette"

// Simple (one shade per color)
<Palette value={color} onValueChange={setColor} />

// Specific shade
<Palette shade={300} value={color} onValueChange={setColor} />

// Full matrix (all shades)
<Palette full value={color} onValueChange={setColor} />`

function PalettePage() {
  const [color, setColor] = useState("blue-500")

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 p-8">
      <h1 className="text-2xl font-bold">Palette</h1>
      <Row>
        <RowItem main>
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-muted/30 p-6">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Simple — {color}</h3>
              <Palette value={color} onValueChange={(val) => setColor(val)} />
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Full</h3>
              <Palette full value={color} onValueChange={(val) => setColor(val)} />
            </div>
          </div>
        </RowItem>
        <RowItem>
          <CodeBlock filename="palette.tsx" content={code} />
        </RowItem>
      </Row>
    </div>
  )
}
