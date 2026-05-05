import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { fieldContext } from "@/lib/form-context"

const checkboxClass =
  "peer relative flex size-4 shrink-0 items-center justify-center rounded-[5px] border border-transparent bg-input/90 transition-shadow outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary"

function Checkbox({
  className,
  checked,
  onCheckedChange,
  ...props
}: CheckboxPrimitive.Root.Props) {
  const fieldApi = React.useContext(fieldContext) as
    | {
        name: string
        state: { value: unknown }
        handleChange: (v: boolean) => void
        handleBlur: () => void
      }
    | undefined

  const effectiveChecked = fieldApi
    ? ((fieldApi.state.value as boolean | undefined) ?? false)
    : checked

  const handleChange: NonNullable<CheckboxPrimitive.Root.Props["onCheckedChange"]> = (
    next,
    eventDetails,
  ) => {
    if (fieldApi) fieldApi.handleChange(next)
    onCheckedChange?.(next, eventDetails)
  }

  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      checked={effectiveChecked}
      onCheckedChange={handleChange}
      className={cn(checkboxClass, className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
      >
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
