import { createFileRoute } from '@tanstack/react-router'
import { CodeBlock } from '@/components/ui/code-block'
import { Row, RowItem } from '@/components/ui/row'

export const Route = createFileRoute('/ui/code-block')({ component: CodeBlockPage })

const sampleCode = `function greet(name: string) {
  // Say hello
  console.log("Hello, " + name)
}

greet("world")`

const usage = `import { CodeBlock } from "@/components/ui/code-block"

const code = \`function greet(name: string) {
  console.log("Hello, " + name)
}\`

<CodeBlock filename="greet.ts" content={code} />`

function CodeBlockPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 p-8">
      <h1 className="text-2xl font-bold">CodeBlock</h1>
      <Row>
        <RowItem main>
          <CodeBlock filename="greet.ts" content={sampleCode} />
        </RowItem>
        <RowItem>
          <CodeBlock filename="usage.tsx" content={usage} />
        </RowItem>
      </Row>
    </div>
  )
}
