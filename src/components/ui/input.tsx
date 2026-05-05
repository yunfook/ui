import * as React from "react"

import { cn } from "@/lib/utils"
import { fieldContext } from "@/lib/form-context"

const inputClass =
  "h-9 w-full min-w-0 rounded-md border border-input bg-background px-3 py-1 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"

function Input({ className, type = "text", ...props }: React.ComponentProps<"input">) {
  const fieldApi = React.useContext(fieldContext) as
    | {
        name: string
        state: { value: unknown; meta: { isTouched: boolean; errors: unknown[] } }
        handleChange: (v: string) => void
        handleBlur: () => void
      }
    | undefined

  if (fieldApi) {
    const v = (fieldApi.state.value as string | undefined) ?? ""
    const isInvalid =
      fieldApi.state.meta.isTouched && fieldApi.state.meta.errors.length > 0
    return (
      <input
        data-slot="input"
        type={type}
        name={fieldApi.name}
        value={v}
        onChange={(e) => fieldApi.handleChange(e.target.value)}
        onBlur={() => fieldApi.handleBlur()}
        aria-invalid={isInvalid || undefined}
        className={cn(inputClass, className)}
        {...props}
      />
    )
  }

  return (
    <input
      data-slot="input"
      type={type}
      className={cn(inputClass, className)}
      {...props}
    />
  )
}

export { Input }
