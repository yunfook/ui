import * as React from "react"

import { Button } from "@/components/ui/button"
import { useFormContext } from "@/lib/form-context"

type FormApi = {
  handleSubmit: () => Promise<void>
  state: { canSubmit: boolean; isSubmitting: boolean }
  Subscribe: React.ComponentType<{
    selector: (state: { canSubmit: boolean; isSubmitting: boolean }) => unknown
    children: (selected: unknown) => React.ReactNode
  }>
}

interface SubmitButtonProps
  extends Omit<React.ComponentProps<typeof Button>, "type" | "onClick"> {
  /** Disable the button while the form is invalid (default true). */
  disableWhenInvalid?: boolean
}

function SubmitButton({
  children = "Submit",
  disableWhenInvalid = true,
  disabled,
  ...props
}: SubmitButtonProps) {
  const form = useFormContext() as FormApi

  return (
    <form.Subscribe
      selector={(s) => ({ canSubmit: s.canSubmit, isSubmitting: s.isSubmitting })}
    >
      {((state) => {
        const { canSubmit, isSubmitting } = state as {
          canSubmit: boolean
          isSubmitting: boolean
        }
        return (
          <Button
            type="submit"
            disabled={
              disabled ||
              isSubmitting ||
              (disableWhenInvalid && !canSubmit)
            }
            onClick={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
            {...props}
          >
            {isSubmitting ? "Submitting…" : children}
          </Button>
        )
      }) as (selected: unknown) => React.ReactNode}
    </form.Subscribe>
  )
}

export { SubmitButton, type SubmitButtonProps }
