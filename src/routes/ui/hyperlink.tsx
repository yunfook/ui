import { createFileRoute } from "@tanstack/react-router"

import { CodeBlock } from "@/components/ui/code-block"
import { Hyperlink } from "@/components/ui/hyperlink"
import { Row, RowItem } from "@/components/ui/row"

export const Route = createFileRoute("/ui/hyperlink")({
  component: HyperlinkPage,
})

const code = `import { Hyperlink } from "@/components/ui/hyperlink"

<Hyperlink variant="underline" text="Read more" href="/docs" />
<Hyperlink variant="dotted" text="External" icon="ExternalLink" href="https://x.com" target="_blank" rel="noopener noreferrer" />
<Hyperlink variant="plain" text="Plain link" href="#" />`

const variants = [
  "underline",
  "dotted",
  "dashed",
  "wavy",
  "double",
  "plain",
] as const

function HyperlinkPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 p-8">
      <div>
        <h1 className="text-2xl font-bold">Hyperlink</h1>
        <p className="text-sm text-muted-foreground">
          Decorated inline text link. Spreads native{" "}
          <code className="text-foreground">&lt;a&gt;</code> attrs (
          <code className="text-foreground">href</code>,{" "}
          <code className="text-foreground">target</code>,{" "}
          <code className="text-foreground">rel</code>, etc.) — adds{" "}
          <code className="text-foreground">variant</code>,{" "}
          <code className="text-foreground">icon</code>, and{" "}
          <code className="text-foreground">text</code>.
        </p>
      </div>
      <Row>
        <RowItem main>
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-muted/30 p-6">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                Variants
              </h3>
              <div className="flex flex-col gap-2">
                {variants.map((v) => (
                  <Hyperlink
                    key={v}
                    variant={v}
                    text={`${v} link`}
                    href="#"
                  />
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                With icon
              </h3>
              <div className="flex flex-col gap-2">
                <Hyperlink
                  variant="underline"
                  icon="ExternalLink"
                  text="Open external"
                  href="https://example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                />
                <Hyperlink
                  variant="dotted"
                  icon="ArrowRight"
                  text="Continue reading"
                  href="#"
                />
                <Hyperlink
                  variant="plain"
                  icon="Download"
                  text="Download report.pdf"
                  href="/report.pdf"
                  download
                />
              </div>
            </div>
          </div>
        </RowItem>
        <RowItem>
          <CodeBlock filename="hyperlink.tsx" content={code} />
        </RowItem>
      </Row>
    </div>
  )
}
