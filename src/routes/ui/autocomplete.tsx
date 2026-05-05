import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { InstallCommand } from "@/components/combo/install-command"
import { CodeBlock } from '@/components/ui/code-block'
import { Row, RowItem } from '@/components/ui/row'
import { Autocomplete } from '@/components/ui/autocomplete'

export const Route = createFileRoute('/ui/autocomplete')({ component: AutocompletePage })

const fruits = ["Apple", "Banana", "Cherry", "Grape", "Mango", "Orange", "Peach", "Pear", "Plum", "Kiwi"]

const code = `import { Autocomplete } from "@/components/ui/autocomplete"

const fruits = ["Apple", "Banana", "Cherry"]

const [fruit, setFruit] = useState("Cherry")

<Autocomplete
  options={fruits.map((f) => ({ value: f, label: f }))}
  value={fruit}
  onValueChange={setFruit}
  placeholder="Search fruit..."
/>`

function AutocompletePage() {
  const [fruit, setFruit] = useState("Cherry")

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 p-8">
      <h1 className="text-2xl font-bold">Autocomplete</h1>
      <InstallCommand />
      <Row>
        <RowItem main>
          <div className="rounded-xl border border-border bg-muted/30 p-6">
            <h3 className="mb-4 font-semibold">Selected: {fruit}</h3>
            <Autocomplete
              options={fruits.map((f) => ({ value: f, label: f }))}
              value={fruit}
              onValueChange={setFruit}
              placeholder="Search fruit..."
            />
          </div>
        </RowItem>
        <RowItem>
          <CodeBlock filename="autocomplete.tsx" content={code} />
        </RowItem>
      </Row>
    </div>
  )
}
