import * as React from "react"
import { createFileRoute } from "@tanstack/react-router"

import { Animation1 } from "@/components/animation/animation1"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const Route = createFileRoute("/animation/animation1")({
  component: Animation1Page,
})

type Stage = "button" | "moved" | "wide" | "card" | "card-corner"

// Card geometry: top-12 (3rem) + h-64 (16rem) → bottom = 19rem
//                left calc(50% - 12rem), w-96 (24rem) → right = calc(50% + 12rem)
// Button at card's bottom-right corner (anchored bottom-right of card):
//   top  = 19rem - h-9 (2.25rem) = 16.75rem
//   left = calc(50% + 12rem) - w-28 (7rem) = calc(50% + 5rem)
const stageClasses: Record<Stage, string> = {
  // bot-right small button
  button:
    "top-[calc(100%-3.75rem)] left-[calc(100%-8.5rem)] h-9 w-28 rounded-md bg-black text-white hover:bg-black/90",
  // moved up to top-center, still button-sized (forward only)
  moved:
    "top-12 left-[calc(50%-3.5rem)] h-9 w-28 rounded-md bg-black text-white",
  // top-center wide bar (w-96 h-9)
  wide: "top-12 left-[calc(50%-12rem)] h-9 w-96 rounded-md bg-black text-white",
  // full card
  card: "top-12 left-[calc(50%-12rem)] h-64 w-96 rounded-xl border border-black/10 bg-white text-black shadow-lg cursor-default",
  // collapsed to button at card's bottom-right corner (reverse only)
  "card-corner":
    "top-[16.75rem] left-[calc(50%+5rem)] h-9 w-28 rounded-md bg-black text-white",
}

function Animation1Page() {
  const [stage, setStage] = React.useState<Stage>("button")
  const timeouts = React.useRef<ReturnType<typeof setTimeout>[]>([])

  const transition = (sequence: Stage[], stepMs: number) => {
    timeouts.current.forEach(clearTimeout)
    timeouts.current = []
    sequence.forEach((s, i) => {
      if (i === 0) setStage(s)
      else
        timeouts.current.push(
          setTimeout(() => setStage(s), i * stepMs)
        )
    })
  }

  React.useEffect(() => () => timeouts.current.forEach(clearTimeout), [])

  // forward: stagger stages 150ms apart so width and height transitions overlap
  // (height starts ~halfway through width's 300ms transition)
  const expand = () => transition(["moved", "wide", "card"], 150)
  // reverse: collapse to card's bottom-right corner (width + height together), then slide to bot-right
  const collapse = () => transition(["card-corner", "button"], 300)

  const isCard = stage === "card"

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-10 p-8">
      <div>
        <h1 className="text-2xl font-bold">Animation 1</h1>
      </div>
      <Animation1 />

      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Morph into card</h2>
        <div className="relative h-120 w-full rounded-2xl border border-border bg-muted/20 p-6">
          <div
            role={stage === "button" ? "button" : undefined}
            tabIndex={stage === "button" ? 0 : undefined}
            onClick={stage === "button" ? expand : undefined}
            onKeyDown={(e) => {
              if (stage === "button" && (e.key === "Enter" || e.key === " ")) expand()
            }}
            className={cn(
              "absolute flex items-center justify-center overflow-hidden text-xs font-medium shadow-sm outline-none transition-all duration-300 ease-out",
              stage === "button" && "cursor-pointer",
              stageClasses[stage]
            )}
          >
            {isCard ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  collapse()
                }}
                className="flex h-full w-full flex-col gap-3 p-5 text-left"
              >
                <div className="text-base font-semibold">Quick note</div>
                <label className="flex flex-col gap-1.5 text-xs text-muted-foreground">
                  Title
                  <input
                    type="text"
                    autoFocus
                    placeholder="Untitled"
                    className="rounded-md border border-border bg-background px-2.5 py-1.5 text-sm text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  />
                </label>
                <label className="flex flex-1 flex-col gap-1.5 text-xs text-muted-foreground">
                  Body
                  <textarea
                    placeholder="Say something…"
                    className="min-h-0 flex-1 resize-none rounded-md border border-border bg-background px-2.5 py-1.5 text-sm text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  />
                </label>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={collapse}>
                    Close
                  </Button>
                  <Button type="submit" size="sm">
                    Submit
                  </Button>
                </div>
              </form>
            ) : (
              "click me"
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
