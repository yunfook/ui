import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { InstallCommand } from "@/components/combo/install-command"
import { CodeBlock } from '@/components/ui/code-block'
import { Row, RowItem } from '@/components/ui/row'
import { CapsuleButton } from '@/components/ui/capsule-button'

export const Route = createFileRoute('/ui/capsule-button')({ component: CapsuleButtonPage })

const code = `import { CapsuleButton } from "@/components/ui/capsule-button"

const [answer, setAnswer] = useState("Yes")

<CapsuleButton
  leftVal="Yes"
  rightVal="No"
  value={answer}
  onValueChange={setAnswer}
/>`

function CapsuleButtonPage() {
  const [answer, setAnswer] = useState('Yes')
  const [plan, setPlan] = useState('Monthly')

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 p-8">
      <h1 className="text-2xl font-bold">CapsuleButton</h1>
      <InstallCommand />
      <p className="text-muted-foreground">
        Two-option radio group with a capsule shape — wraps shadcn RadioGroup.
      </p>
      <Row>
        <RowItem main>
          <div className="flex flex-col gap-6 rounded-xl border border-border bg-muted/30 p-6">
            <div>
              <h3 className="mb-3 font-semibold">Selected: {answer}</h3>
              <CapsuleButton
                leftVal="Yes"
                rightVal="No"
                value={answer}
                onValueChange={setAnswer}
              />
            </div>
            <div>
              <h3 className="mb-3 font-semibold">Selected: {plan}</h3>
              <CapsuleButton
                leftVal="Monthly"
                rightVal="Yearly"
                value={plan}
                onValueChange={setPlan}
              />
            </div>
          </div>
        </RowItem>
        <RowItem>
          <CodeBlock filename="capsule-button.tsx" content={code} />
        </RowItem>
      </Row>
    </div>
  )
}
