import * as React from "react"

import { cn } from "@/lib/utils"

const ITEM_HEIGHT = 36
const VISIBLE_ITEMS = 5

interface WheelProps<T> {
  items: T[]
  value: T
  onSelect: (item: T) => void
  renderItem: (item: T) => React.ReactNode
  /** Called when user taps the already-selected center item */
  onConfirm?: () => void
  className?: string
}

function Wheel<T extends string | number>({
  items,
  value,
  onSelect,
  renderItem,
  onConfirm,
  className,
}: WheelProps<T>) {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const suppressScrollRef = React.useRef(false)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>()
  const dragRef = React.useRef({ active: false, startY: 0, startScroll: 0 })
  const halfCount = Math.floor(VISIBLE_ITEMS / 2)
  const containerHeight = VISIBLE_ITEMS * ITEM_HEIGHT
  const padHeight = halfCount * ITEM_HEIGHT
  const selectedIndex = items.indexOf(value)
  const targetScrollTop = selectedIndex === -1 ? 0 : selectedIndex * ITEM_HEIGHT
  const [scrollTop, setScrollTop] = React.useState(targetScrollTop)

  // Pointer drag-to-scroll
  const handlePointerDown = (e: React.PointerEvent) => {
    const el = scrollRef.current
    if (!el) return
    dragRef.current = { active: true, startY: e.clientY, startScroll: el.scrollTop }
    el.setPointerCapture(e.pointerId)
    el.style.scrollSnapType = "none"
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.active) return
    const el = scrollRef.current
    if (!el) return
    const delta = dragRef.current.startY - e.clientY
    el.scrollTop = dragRef.current.startScroll + delta
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!dragRef.current.active) return
    dragRef.current.active = false
    const el = scrollRef.current
    if (!el) return
    el.releasePointerCapture(e.pointerId)
    // Snap to nearest item
    const idx = Math.round(el.scrollTop / ITEM_HEIGHT)
    const clamped = Math.max(0, Math.min(idx, items.length - 1))
    el.style.scrollSnapType = ""
    el.scrollTo({ top: clamped * ITEM_HEIGHT, behavior: "smooth" })
  }

  const mountedRef = React.useRef(false)

  React.useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  // Defer the initial sync until after the popup has painted. This avoids
  // Base UI popup mount timing resetting the scroll position back to the top.
  React.useEffect(() => {
    if (suppressScrollRef.current) return
    if (selectedIndex === -1) return

    let innerFrame = 0
    const frame = requestAnimationFrame(() => {
      innerFrame = requestAnimationFrame(() => {
        const el = scrollRef.current
        if (!el) return

        setScrollTop(targetScrollTop)
        if (!mountedRef.current) {
          el.scrollTop = targetScrollTop
          mountedRef.current = true
          return
        }

        if (Math.abs(el.scrollTop - targetScrollTop) > 1) {
          el.scrollTo({ top: targetScrollTop, behavior: "smooth" })
        }
      })
    })

    return () => {
      cancelAnimationFrame(frame)
      cancelAnimationFrame(innerFrame)
    }
  }, [selectedIndex, targetScrollTop])

  const handleScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setScrollTop(el.scrollTop)

    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      const idx = Math.round(el.scrollTop / ITEM_HEIGHT)
      const clamped = Math.max(0, Math.min(idx, items.length - 1))
      if (items[clamped] !== value) {
        suppressScrollRef.current = true
        onSelect(items[clamped])
        requestAnimationFrame(() => { suppressScrollRef.current = false })
      }
    }, 60)
  }

  const handleClick = (idx: number) => {
    const el = scrollRef.current
    if (!el) return
    const currentIdx = Math.round(el.scrollTop / ITEM_HEIGHT)
    if (idx === currentIdx && onConfirm) {
      onConfirm()
    } else {
      el.scrollTo({ top: idx * ITEM_HEIGHT, behavior: "smooth" })
    }
  }

  return (
    <div className={cn("relative", className)} style={{ height: containerHeight }}>
      <div
        ref={scrollRef}
        className="relative z-10 h-full cursor-grab snap-y snap-mandatory overflow-y-auto active:cursor-grabbing [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
        }}
        onScroll={handleScroll}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div style={{ height: padHeight }} />
        {items.map((item, idx) => (
          <button
            key={String(item)}
            type="button"
            onClick={() => handleClick(idx)}
            className="flex w-full snap-center items-center justify-center rounded-md px-3 text-sm text-muted-foreground transition-colors"
            style={{ height: ITEM_HEIGHT }}
          >
            {renderItem(item)}
          </button>
        ))}
        <div style={{ height: padHeight }} />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 z-20 overflow-hidden"
        style={{ top: padHeight, height: ITEM_HEIGHT }}
      >
        <div
          className="will-change-transform"
          style={{ transform: `translateY(${-scrollTop}px)` }}
        >
          {items.map((item) => (
            <div
              key={String(item)}
              className="flex w-full items-center justify-center px-3 text-sm font-semibold text-foreground"
              style={{ height: ITEM_HEIGHT }}
            >
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { Wheel, ITEM_HEIGHT, VISIBLE_ITEMS }
export type { WheelProps }
