import * as React from "react"
import { createFileRoute } from "@tanstack/react-router"
import {
  Check,
  Copy,
  Heart,
  Menu,
  Moon,
  Pause,
  Play,
  Sun,
  X,
} from "lucide-react"

import { CodeBlock } from "@/components/ui/code-block"
import { Row, RowItem } from "@/components/ui/row"
import { IconButton } from "@/components/combo/icon-button"

export const Route = createFileRoute("/combo/icon-button")({ component: IconButtonPage })

const code = `import { IconButton } from "@/components/combo/icon-button"

// Animated swap — change the icon and it cross-fades + scales
const [copied, setCopied] = React.useState(false)
<IconButton
  icon={copied ? <Check /> : <Copy />}
  variant="outline"
  onClick={() => {
    navigator.clipboard.writeText("hello")
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }}
/>

// Menu toggle
<IconButton
  icon={open ? <X /> : <Menu />}
  variant="ghost"
  onClick={() => setOpen((o) => !o)}
/>

// Custom duration (ms)
<IconButton icon={<Heart />} duration={400} />`

function IconButtonPage() {
  const [copied, setCopied] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [playing, setPlaying] = React.useState(false)
  const [dark, setDark] = React.useState(false)
  const [liked, setLiked] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText("Hello from IconButton")
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 p-8">
      <div>
        <h1 className="text-2xl font-bold">IconButton</h1>
        <p className="text-sm text-muted-foreground">
          Icon button that animates a scale + opacity + blur swap whenever the
          icon changes. Wraps the base <code>Button</code>, so all variants and
          sizes carry over.
        </p>
      </div>
      <Row>
        <RowItem main>
          <div className="flex flex-col gap-6 rounded-xl border border-border bg-muted/30 p-6">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                Copy ↔ Check
              </h3>
              <IconButton
                icon={copied ? <Check /> : <Copy />}
                variant="outline"
                onClick={handleCopy}
              />
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                Menu toggle
              </h3>
              <IconButton
                icon={open ? <X /> : <Menu />}
                variant="ghost"
                onClick={() => setOpen((o) => !o)}
              />
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                Play / Pause
              </h3>
              <IconButton
                icon={playing ? <Pause /> : <Play />}
                onClick={() => setPlaying((p) => !p)}
              />
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                Theme toggle
              </h3>
              <IconButton
                icon={dark ? <Moon /> : <Sun />}
                variant="secondary"
                onClick={() => setDark((d) => !d)}
              />
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                Like (same icon, custom iconKey to drive animation)
              </h3>
              <IconButton
                icon={
                  <Heart
                    className={liked ? "fill-red-500 text-red-500" : ""}
                  />
                }
                iconKey={liked ? "liked" : "unliked"}
                variant="ghost"
                onClick={() => setLiked((l) => !l)}
              />
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                Sizes
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <IconButton icon={<Copy />} size="icon-xs" variant="outline" />
                <IconButton icon={<Copy />} size="icon-sm" variant="outline" />
                <IconButton icon={<Copy />} size="icon" variant="outline" />
                <IconButton icon={<Copy />} size="icon-lg" variant="outline" />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                Duration (100ms / 250ms / 600ms)
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <IconButton
                  icon={copied ? <Check /> : <Copy />}
                  duration={100}
                  variant="outline"
                  onClick={handleCopy}
                />
                <IconButton
                  icon={copied ? <Check /> : <Copy />}
                  duration={250}
                  variant="outline"
                  onClick={handleCopy}
                />
                <IconButton
                  icon={copied ? <Check /> : <Copy />}
                  duration={600}
                  variant="outline"
                  onClick={handleCopy}
                />
              </div>
            </div>
          </div>
        </RowItem>
        <RowItem>
          <CodeBlock filename="icon-button.tsx" content={code} />
        </RowItem>
      </Row>
    </div>
  )
}
