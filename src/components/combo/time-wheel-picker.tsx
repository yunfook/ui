import * as React from "react"
import { ClockIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Wheel, ITEM_HEIGHT, VISIBLE_ITEMS } from "@/components/ui/wheel"

const HOURS_24 = Array.from({ length: 24 }, (_, i) => i)
const HOURS_12 = Array.from({ length: 12 }, (_, i) => i + 1)
const MINUTES = Array.from({ length: 60 }, (_, i) => i)
const SECONDS = Array.from({ length: 60 }, (_, i) => i)
const PERIODS = ["AM", "PM"] as const
const PERIOD_VALUES = [...PERIODS]

const pad = (n: number) => String(n).padStart(2, "0")
const getPeriod = (hour: number) => (hour >= 12 ? "PM" : "AM")

interface TimeWheelPickerProps {
  hour: number
  minute: number
  second?: number
  variant?: "12" | "24"
  showSeconds?: boolean
  onSelect: (hour: number, minute: number, second?: number) => void
  className?: string
}

function TimeWheelPickerWheel({
  hour,
  minute,
  second = 0,
  variant = "24",
  showSeconds = false,
  onSelect,
  onConfirm,
}: {
  hour: number
  minute: number
  second?: number
  variant?: "12" | "24"
  showSeconds?: boolean
  onSelect: (hour: number, minute: number, second?: number) => void
  onConfirm?: () => void
}) {
  const is12 = variant === "12"
  const period = getPeriod(hour)
  const display12Hour = is12 ? (hour % 12 === 0 ? 12 : hour % 12) : hour
  const selectionRef = React.useRef({ hour, minute, second })

  React.useEffect(() => {
    selectionRef.current = { hour, minute, second }
  }, [hour, minute, second])

  const emitSelection = (nextSelection: Partial<(typeof selectionRef.current)>) => {
    selectionRef.current = { ...selectionRef.current, ...nextSelection }
    onSelect(
      selectionRef.current.hour,
      selectionRef.current.minute,
      showSeconds ? selectionRef.current.second : undefined
    )
  }

  const handleHourSelect = (h: number) => {
    if (is12) {
      const base = getPeriod(selectionRef.current.hour) === "PM" ? 12 : 0
      const adjusted = h === 12 ? base : base + h
      emitSelection({ hour: adjusted })
    } else {
      emitSelection({ hour: h })
    }
  }

  const handleMinuteSelect = (m: number) => {
    emitSelection({ minute: m })
  }

  const handleSecondSelect = (s: number) => {
    emitSelection({ second: s })
  }

  const handlePeriodSelect = (p: string) => {
    const currentHour = selectionRef.current.hour
    const currentPeriod = getPeriod(currentHour)
    if (p === currentPeriod) return
    const newHour = p === "PM" ? currentHour + 12 : currentHour - 12
    emitSelection({ hour: newHour })
  }

  const padHeight = Math.floor(VISIBLE_ITEMS / 2) * ITEM_HEIGHT

  return (
    <div className="relative flex gap-1">
      <div
        className="pointer-events-none absolute inset-x-1 z-5 rounded-md bg-muted"
        style={{ top: padHeight, height: ITEM_HEIGHT }}
      />
      <Wheel
        items={is12 ? HOURS_12 : HOURS_24}
        value={display12Hour}
        onSelect={handleHourSelect}
        renderItem={(h) => pad(h)}
        onConfirm={onConfirm}
        className="flex-1 tabular-nums"
      />
      <Wheel
        items={MINUTES}
        value={minute}
        onSelect={handleMinuteSelect}
        renderItem={(m) => pad(m)}
        onConfirm={onConfirm}
        className="flex-1 tabular-nums"
      />
      {showSeconds && (
        <Wheel
          items={SECONDS}
          value={second}
          onSelect={handleSecondSelect}
          renderItem={(s) => pad(s)}
          onConfirm={onConfirm}
          className="flex-1 tabular-nums"
        />
      )}
      {is12 && (
        <Wheel
          items={PERIOD_VALUES}
          value={period}
          onSelect={handlePeriodSelect}
          renderItem={(p) => p}
          onConfirm={onConfirm}
          className="w-16"
        />
      )}
    </div>
  )
}

function TimeWheelPicker({
  hour,
  minute,
  second,
  variant = "24",
  showSeconds = false,
  onSelect,
  className,
}: TimeWheelPickerProps) {
  const [open, setOpen] = React.useState(false)
  const is12 = variant === "12"
  const period = getPeriod(hour)
  const displayHour = is12 ? (hour % 12 === 0 ? 12 : hour % 12) : hour
  const label = is12
    ? `${pad(displayHour)}:${pad(minute)}${showSeconds ? `:${pad(second ?? 0)}` : ""} ${period}`
    : `${pad(hour)}:${pad(minute)}${showSeconds ? `:${pad(second ?? 0)}` : ""}`

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            className={cn("justify-start gap-2 font-normal tabular-nums", className)}
          />
        }
      >
        <ClockIcon className="size-4 text-muted-foreground" />
        {label}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-56 p-2">
        <TimeWheelPickerWheel
          hour={hour}
          minute={minute}
          second={second}
          variant={variant}
          showSeconds={showSeconds}
          onSelect={onSelect}
          onConfirm={() => setOpen(false)}
        />
      </PopoverContent>
    </Popover>
  )
}

export { TimeWheelPicker, TimeWheelPickerWheel }
export type { TimeWheelPickerProps }
