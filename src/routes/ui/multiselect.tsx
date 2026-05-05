import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { InstallCommand } from "@/components/combo/install-command"
import { CodeBlock } from '@/components/ui/code-block'
import { Row, RowItem } from '@/components/ui/row'
import { MultiSelect } from '@/components/ui/multiselect'

export const Route = createFileRoute('/ui/multiselect')({ component: MultiSelectPage })

const fruits = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "grape", label: "Grape" },
  { value: "mango", label: "Mango" },
  { value: "orange", label: "Orange" },
  { value: "peach", label: "Peach" },
  { value: "kiwi", label: "Kiwi" },
]

const groups = [
  {
    label: "Fruits",
    options: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "cherry", label: "Cherry" },
    ],
  },
  {
    label: "Vegetables",
    options: [
      { value: "carrot", label: "Carrot" },
      { value: "broccoli", label: "Broccoli" },
      { value: "spinach", label: "Spinach" },
    ],
  },
]

const code = `import { MultiSelect } from "@/components/ui/multiselect"

// Simple
<MultiSelect
  options={fruits}
  value={selected}
  onValueChange={setSelected}
  placeholder="Select fruits..."
/>

// With groups
<MultiSelect
  groups={[
    { label: "Fruits", options: [...] },
    { label: "Vegetables", options: [...] },
  ]}
  value={selected}
  onValueChange={setSelected}
/>`

function MultiSelectPage() {
  const [selected, setSelected] = useState(["apple", "cherry"])
  const [grouped, setGrouped] = useState(["apple", "carrot"])

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 p-8">
      <h1 className="text-2xl font-bold">MultiSelect</h1>
      <InstallCommand />
      <Row>
        <RowItem main>
          <div className="flex flex-col gap-6 rounded-xl border border-border bg-muted/30 p-6">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                Simple — {selected.length === 0 ? "none" : selected.join(", ")}
              </h3>
              <MultiSelect
                options={fruits}
                value={selected}
                onValueChange={setSelected}
                placeholder="Select fruits..."
              />
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                Grouped — {grouped.length === 0 ? "none" : grouped.join(", ")}
              </h3>
              <MultiSelect
                groups={groups}
                value={grouped}
                onValueChange={setGrouped}
                placeholder="Select items..."
              />
            </div>
          </div>
        </RowItem>
        <RowItem>
          <CodeBlock filename="multiselect.tsx" content={code} />
        </RowItem>
      </Row>

    </div>
  )
}
