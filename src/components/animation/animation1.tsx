import * as React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Position =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"

const positions: { value: Position; label: string }[] = [
  { value: "top-left", label: "top-left" },
  { value: "top-center", label: "top-center" },
  { value: "top-right", label: "top-right" },
  { value: "bottom-left", label: "bot-left" },
  { value: "bottom-center", label: "bot-center" },
  { value: "bottom-right", label: "bot-right" },
]

// Slot is w-48 (12rem) × h-10 (2.5rem); container has p-6 (1.5rem).
// Right edge offset: 1.5 + 12 = 13.5rem
// Bottom edge offset: 1.5 + 2.5 = 4rem
// Center horizontal: 50% - half slot width (6rem)
const positionClasses: Record<Position, string> = {
  "top-left": "top-6 left-6",
  "top-center": "top-6 left-[calc(50%-6rem)]",
  "top-right": "top-6 left-[calc(100%-13.5rem)]",
  "bottom-left": "top-[calc(100%-4rem)] left-6",
  "bottom-center": "top-[calc(100%-4rem)] left-[calc(50%-6rem)]",
  "bottom-right": "top-[calc(100%-4rem)] left-[calc(100%-13.5rem)]",
}

function Animation1() {
  const [active, setActive] = React.useState<Position>("top-right")
  const activeLabel = positions.find((p) => p.value === active)?.label ?? ""

  return (
    <div className="relative h-120 w-full rounded-2xl border border-border bg-muted/20 p-6">
      <div
        className={cn(
          "absolute flex h-10 w-48 items-center justify-center rounded-xl bg-primary text-sm font-medium text-primary-foreground transition-[top,left] duration-300 ease-out",
          positionClasses[active]
        )}
      >
        {activeLabel}
      </div>

      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-2">
        {positions.map((p) => (
          <Button
            key={p.value}
            size="sm"
            variant={active === p.value ? "default" : "outline"}
            onClick={() => setActive(p.value)}
          >
            {p.label}
          </Button>
        ))}
      </div>
    </div>
  )
}

export { Animation1 }
