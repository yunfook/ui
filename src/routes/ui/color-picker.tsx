import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { CodeBlock } from '@/components/ui/code-block'
import { Row, RowItem } from '@/components/ui/row'
import { ColorPicker } from '@/components/ui/color-picker'

export const Route = createFileRoute('/ui/color-picker')({ component: ColorPickerPage })

const code = `import { ColorPicker } from "@/components/ui/color-picker"

<ColorPicker value={color} onValueChange={setColor} />`

function ColorPickerPage() {
  const [color, setColor] = useState("#3b82f6")

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 p-8">
      <h1 className="text-2xl font-bold">ColorPicker</h1>
      <Row>
        <RowItem main>
          <div className="rounded-xl border border-border bg-muted/30 p-6">
            <h3 className="mb-3 text-sm font-semibold text-muted-foreground">HSV — {color}</h3>
            <ColorPicker value={color} onValueChange={setColor} />
          </div>
        </RowItem>
        <RowItem>
          <CodeBlock filename="color-picker.tsx" content={code} />
        </RowItem>
      </Row>
    </div>
  )
}
