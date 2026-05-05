import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const switchRootVariants = cva(
  "group/switch peer relative inline-flex shrink-0 cursor-pointer items-center rounded-full transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-disabled:cursor-not-allowed data-disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-2 data-checked:border-primary data-checked:bg-primary data-unchecked:border-transparent data-unchecked:bg-input/90",
        text: "border border-transparent shadow-xs data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80",
        thumb:
          "border border-transparent shadow-xs data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80",
      },
      size: {
        sm: "",
        default: "",
      },
    },
    compoundVariants: [
      { variant: "default", size: "sm", className: "h-4 w-7" },
      { variant: "default", size: "default", className: "h-5 w-11" },
      { variant: "text", size: "sm", className: "h-5 min-w-11 px-0.5" },
      { variant: "text", size: "default", className: "h-7 min-w-14 px-1" },
      { variant: "thumb", size: "sm", className: "h-6 min-w-12 px-0.5" },
      { variant: "thumb", size: "default", className: "h-8 min-w-16 px-1" },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const switchThumbVariants = cva(
  "pointer-events-none shrink-0 rounded-full bg-background shadow-sm ring-0 transition-transform duration-200 data-unchecked:translate-x-0 dark:data-checked:bg-primary-foreground dark:data-unchecked:bg-foreground",
  {
    variants: {
      variant: {
        default: "block not-dark:bg-clip-padding",
        text: "block",
        thumb: "flex items-center justify-center select-none",
      },
      size: {
        sm: "",
        default: "",
      },
    },
    compoundVariants: [
      { variant: "default", size: "sm", className: "h-3 w-4 data-checked:translate-x-[calc(100%-4px)]" },
      { variant: "default", size: "default", className: "h-4 w-6 data-checked:translate-x-[calc(100%-8px)]" },
      { variant: "text", size: "sm", className: "size-3.5 data-checked:translate-x-[26px]" },
      { variant: "text", size: "default", className: "size-5 data-checked:translate-x-7" },
      { variant: "thumb", size: "sm", className: "h-4.5 w-6 data-checked:translate-x-4.5" },
      { variant: "thumb", size: "default", className: "h-6 w-8 data-checked:translate-x-6" },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const textLabelVariants = cva(
  "absolute inset-0 flex items-center font-medium transition-opacity select-none",
  {
    variants: {
      side: {
        unchecked:
          "justify-end text-muted-foreground opacity-100 group-data-checked/switch:opacity-0",
        checked:
          "justify-start text-primary-foreground opacity-0 group-data-checked/switch:opacity-100",
      },
      size: {
        sm: "text-[9px]",
        default: "text-[11px]",
      },
    },
    compoundVariants: [
      { side: "unchecked", size: "sm", className: "pr-1.5" },
      { side: "unchecked", size: "default", className: "pr-2.5" },
      { side: "checked", size: "sm", className: "pl-1.5" },
      { side: "checked", size: "default", className: "pl-2.5" },
    ],
    defaultVariants: {
      size: "default",
    },
  }
)

interface SwitchProps
  extends SwitchPrimitive.Root.Props,
    VariantProps<typeof switchRootVariants> {
  checkedLabel?: string
  uncheckedLabel?: string
}

function Switch({
  className,
  size = "default",
  variant = "default",
  checkedLabel = "On",
  uncheckedLabel = "Off",
  ...props
}: SwitchProps) {
  const rootClassName = cn(switchRootVariants({ variant, size }), className)
  const thumbClassName = switchThumbVariants({ variant, size })

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={rootClassName}
      {...props}
    >
      {variant === "text" && (
        <>
          <span className={textLabelVariants({ side: "unchecked", size })}>
            {uncheckedLabel}
          </span>
          <span className={textLabelVariants({ side: "checked", size })}>
            {checkedLabel}
          </span>
        </>
      )}
      <SwitchPrimitive.Thumb data-slot="switch-thumb" className={thumbClassName}>
        {variant === "thumb" && (
          <span
            className={cn(
              "font-semibold leading-none text-foreground dark:group-data-checked/switch:text-primary dark:group-data-unchecked/switch:text-background",
              size === "sm" ? "text-[9px]" : "text-[11px]"
            )}
          >
            <span className="hidden group-data-checked/switch:inline">
              {checkedLabel}
            </span>
            <span className="inline group-data-checked/switch:hidden">
              {uncheckedLabel}
            </span>
          </span>
        )}
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  )
}

export { Switch, switchRootVariants, switchThumbVariants }
export type { SwitchProps }
