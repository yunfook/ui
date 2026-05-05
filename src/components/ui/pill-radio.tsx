import * as React from "react"

import { cn } from "@/lib/utils"

interface PillRadioGroupProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  name?: string
}

const PillRadioContext = React.createContext<{
  value: string | undefined
  name: string | undefined
  onSelect: (value: string) => void
} | null>(null)

function PillRadioGroup({
  className,
  children,
  value: controlledValue,
  defaultValue,
  onValueChange,
  name,
  ...props
}: PillRadioGroupProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : uncontrolledValue

  const containerRef = React.useRef<HTMLDivElement>(null)
  const [indicator, setIndicator] = React.useState<{
    left: number
    width: number
    height: number
    top: number
    ready: boolean
  }>({ left: 0, width: 0, height: 0, top: 0, ready: false })

  const onSelect = React.useCallback(
    (next: string) => {
      if (!isControlled) setUncontrolledValue(next)
      onValueChange?.(next)
    },
    [isControlled, onValueChange]
  )

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const update = () => {
      const checked = container.querySelector(
        '[data-state="checked"]'
      ) as HTMLElement | null
      if (checked) {
        setIndicator({
          left: checked.offsetLeft,
          width: checked.offsetWidth,
          height: checked.offsetHeight,
          top: checked.offsetTop,
          ready: true,
        })
      }
    }

    update()

    const observer = new MutationObserver(update)
    observer.observe(container, {
      attributes: true,
      subtree: true,
      attributeFilter: ["data-state"],
    })

    return () => observer.disconnect()
  }, [])

  return (
    <PillRadioContext.Provider value={{ value, name, onSelect }}>
      <div
        ref={containerRef}
        role="radiogroup"
        data-slot="pill-radio-group"
        className={cn(
          "relative inline-flex w-fit items-center rounded-full bg-muted p-[3px] text-muted-foreground",
          className
        )}
        {...props}
      >
        {indicator.ready && (
          <div
            className="absolute rounded-full bg-foreground shadow-sm transition-all duration-200 ease-out"
            style={{
              left: indicator.left,
              top: indicator.top,
              width: indicator.width,
              height: indicator.height,
            }}
          />
        )}
        {children}
      </div>
    </PillRadioContext.Provider>
  )
}

interface PillRadioItemProps extends Omit<React.ComponentProps<"button">, "value"> {
  value: string
  children: React.ReactNode
}

function PillRadioItem({ className, children, value, disabled, ...props }: PillRadioItemProps) {
  const context = React.useContext(PillRadioContext)
  const checked = context?.value === value

  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      data-slot="pill-radio-item"
      data-state={checked ? "checked" : "unchecked"}
      disabled={disabled}
      onClick={() => context?.onSelect(value)}
      className={cn(
        "relative z-10 inline-flex cursor-pointer items-center justify-center rounded-full px-4 py-1 text-sm font-medium whitespace-nowrap transition-colors duration-200 outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
        checked
          ? "text-background"
          : "text-muted-foreground hover:text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export { PillRadioGroup, PillRadioItem }
export type { PillRadioGroupProps, PillRadioItemProps }
