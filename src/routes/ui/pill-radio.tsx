import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { InstallCommand } from "@/components/combo/install-command"
import { CodeBlock } from '@/components/ui/code-block'
import { Row, RowItem } from '@/components/ui/row'
import { PillRadioGroup, PillRadioItem } from '@/components/ui/pill-radio'

export const Route = createFileRoute('/ui/pill-radio')({ component: PillRadioPage })

const code = `import { PillRadioGroup, PillRadioItem } from "@/components/ui/pill-radio"

const [plan, setPlan] = useState("monthly")

<PillRadioGroup value={plan} onValueChange={setPlan}>
  <PillRadioItem value="monthly">Monthly</PillRadioItem>
  <PillRadioItem value="quarterly">Quarterly</PillRadioItem>
  <PillRadioItem value="yearly">Yearly</PillRadioItem>
</PillRadioGroup>`

function PillRadioPage() {
  const [plan, setPlan] = useState("monthly")

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 p-8">
      <h1 className="text-2xl font-bold">PillRadio</h1>
      <InstallCommand />
      <Row>
        <RowItem main>
          <div className="rounded-xl border border-border bg-muted/30 p-6">
            <h3 className="mb-4 font-semibold">Selected: {plan}</h3>
            <PillRadioGroup value={plan} onValueChange={setPlan}>
              <PillRadioItem value="monthly">Monthly</PillRadioItem>
              <PillRadioItem value="quarterly">Quarterly</PillRadioItem>
              <PillRadioItem value="yearly">Yearly</PillRadioItem>
            </PillRadioGroup>
          </div>
        </RowItem>
        <RowItem>
          <CodeBlock filename="pill-radio.tsx" content={code} />
        </RowItem>
      </Row>
    </div>
  )
}
