import * as React from "react"

import { cn } from "@/lib/utils"
import { type HSV, hexToHsv, hsvToHex, isValidHex } from "@/lib/color-utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

function SaturationPanel({
  hsv,
  onChange,
}: {
  hsv: HSV
  onChange: (s: number, v: number) => void
}) {
  const panelRef = React.useRef<HTMLDivElement>(null)

  const updateFromEvent = (e: React.MouseEvent | MouseEvent) => {
    const rect = panelRef.current!.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height))
    onChange((x / rect.width) * 100, 100 - (y / rect.height) * 100)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    updateFromEvent(e)
    const onMove = (ev: MouseEvent) => updateFromEvent(ev)
    const onUp = () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup", onUp)
    }
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup", onUp)
  }

  return (
    <div
      ref={panelRef}
      onMouseDown={handleMouseDown}
      className="relative h-40 w-full cursor-crosshair rounded-md"
      style={{
        background: `
          linear-gradient(to top, #000, transparent),
          linear-gradient(to right, #fff, hsl(${hsv.h}, 100%, 50%))
        `,
      }}
    >
      <div
        className="pointer-events-none absolute size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-sm"
        style={{
          left: `${hsv.s}%`,
          top: `${100 - hsv.v}%`,
        }}
      />
    </div>
  )
}

function HueSlider({
  hue,
  onChange,
}: {
  hue: number
  onChange: (h: number) => void
}) {
  const trackRef = React.useRef<HTMLDivElement>(null)

  const updateFromEvent = (e: React.MouseEvent | MouseEvent) => {
    const rect = trackRef.current!.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    onChange((x / rect.width) * 360)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    updateFromEvent(e)
    const onMove = (ev: MouseEvent) => updateFromEvent(ev)
    const onUp = () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup", onUp)
    }
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup", onUp)
  }

  return (
    <div
      ref={trackRef}
      onMouseDown={handleMouseDown}
      className="relative h-3 w-full cursor-pointer rounded-full"
      style={{
        background:
          "linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)",
      }}
    >
      <div
        className="pointer-events-none absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-sm"
        style={{
          left: `${(hue / 360) * 100}%`,
          backgroundColor: `hsl(${hue}, 100%, 50%)`,
        }}
      />
    </div>
  )
}

interface ColorPickerProps {
  value?: string
  onValueChange?: (hex: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

function ColorPicker({
  value,
  onValueChange,
  placeholder = "Pick a color",
  disabled,
  className,
}: ColorPickerProps) {
  const [open, setOpen] = React.useState(false)
  const [hsv, setHsv] = React.useState<HSV>(() =>
    value && isValidHex(value) ? hexToHsv(value) : { h: 0, s: 100, v: 100 }
  )
  const [hexInput, setHexInput] = React.useState(value ?? "")

  const currentHex = hsvToHex(hsv)
  const normalizedInput = hexInput.startsWith("#") ? hexInput : `#${hexInput}`
  const isInvalidHex = hexInput.length > 0 && !isValidHex(normalizedInput)

  React.useEffect(() => {
    if (value && isValidHex(value)) {
      setHsv(hexToHsv(value))
      setHexInput(value)
    }
  }, [value])

  const updateColor = (newHsv: HSV) => {
    setHsv(newHsv)
    const hex = hsvToHex(newHsv)
    setHexInput(hex)
    onValueChange?.(hex)
  }

  const handleHexInput = (input: string) => {
    setHexInput(input)
    const normalized = input.startsWith("#") ? input : `#${input}`
    if (isValidHex(normalized)) {
      setHsv(hexToHsv(normalized))
      onValueChange?.(normalized)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground",
              className
            )}
          />
        }
      >
        <div
          className="mr-2 size-4 shrink-0 rounded-sm border border-border"
          style={{ backgroundColor: value ?? "transparent" }}
        />
        {value || placeholder}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-64 p-3">
        <div className="flex flex-col gap-3">
          <SaturationPanel
            hsv={hsv}
            onChange={(s, v) => updateColor({ ...hsv, s, v })}
          />
          <HueSlider
            hue={hsv.h}
            onChange={(h) => updateColor({ ...hsv, h })}
          />
          <div className="flex items-center gap-2">
            <div
              className="size-8 shrink-0 rounded-md border border-border"
              style={{ backgroundColor: currentHex }}
            />
            <input
              type="text"
              value={hexInput}
              onChange={(e) => handleHexInput(e.target.value)}
              aria-invalid={isInvalidHex || undefined}
              className={cn(
                "h-8 flex-1 rounded-md border bg-background px-2 font-mono text-sm outline-none focus:ring-2",
                isInvalidHex
                  ? "border-destructive focus:border-destructive focus:ring-destructive/30"
                  : "border-input focus:border-ring focus:ring-ring/50"
              )}
              placeholder="#000000"
              maxLength={7}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { ColorPicker }
export type { ColorPickerProps }
