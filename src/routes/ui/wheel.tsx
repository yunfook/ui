import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { CodeBlock } from '@/components/ui/code-block'
import { Row, RowItem } from '@/components/ui/row'
import { Wheel } from '@/components/ui/wheel'

export const Route = createFileRoute('/ui/wheel')({ component: WheelPage })

const fruits = ["Apple", "Banana", "Cherry", "Grape", "Mango", "Orange", "Peach", "Pear", "Plum", "Kiwi"]

const code = `import { Wheel } from "@/components/ui/wheel"

const fruits = ["Apple", "Banana", "Cherry", "Grape", "Mango"]

const [fruit, setFruit] = useState("Cherry")

<Wheel
  items={fruits}
  value={fruit}
  onSelect={setFruit}
  renderItem={(f) => f}
/>`

function WheelPage() {
  const [fruit, setFruit] = useState("Cherry")

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 p-8">
      <h1 className="text-2xl font-bold">Wheel</h1>
      <Row>
        <RowItem >
          <div className="rounded-xl border border-border bg-muted/30 p-6">
            <h3 className="mb-3 font-semibold">Selected: {fruit}</h3>
            <div className="relative">
              <div className="pointer-events-none absolute inset-x-0 top-[72px] z-5 h-9 rounded-md bg-muted" />
              <Wheel
                items={fruits}
                value={fruit}
                onSelect={setFruit}
                renderItem={(f) => f}
              />
            </div>
          </div>
        </RowItem>
        <RowItem main>
          <CodeBlock filename="wheel.tsx" content={code} />
        </RowItem>
      </Row>
    </div>
  )
}
