import * as React from "react"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { useFieldContext } from "@/lib/form-context"

interface ToggleFieldApi {
  name: string
  state: { value: unknown }
  handleChange: (v: boolean) => void
}

type FormFieldProps = {
  label: React.ReactNode
  /** Adds a visual asterisk to the label. Real validation lives in your zod schema. */
  important?: boolean
  /** Helper text below the input. */
  description?: React.ReactNode
  className?: string
  children?: React.ReactNode
} & (
  | { toggle?: false; toggleField?: never }
  | { toggle: true; toggleField: ToggleFieldApi }
)

function FormField({
  label,
  important,
  description,
  toggle,
  toggleField,
  className,
  children,
}: FormFieldProps) {
  const field = useFieldContext() as {
    name: string
    state: { meta: { isTouched: boolean; errors: unknown[] } }
  }

  const toggleChecked = toggle
    ? !!(toggleField?.state.value as boolean | undefined)
    : true

  const errors = field.state.meta.isTouched
    ? (field.state.meta.errors as Array<{ message?: string } | string>)
    : []

  return (
    <Field className={className}>
      <div className="flex items-center gap-2">
        {toggle && toggleField && (
          <Checkbox
            id={`${toggleField.name}-toggle`}
            checked={toggleChecked}
            onCheckedChange={(v) => toggleField.handleChange(v)}
          />
        )}
        <FieldLabel htmlFor={field.name}>
          {label}
          {important && (
            <span aria-hidden className="text-destructive">
              *
            </span>
          )}
        </FieldLabel>
      </div>
      <fieldset
        disabled={!toggleChecked}
        className="m-0 flex min-w-0 flex-col gap-1.5 border-0 p-0 disabled:opacity-60"
      >
        {children}
        {description && <FieldDescription>{description}</FieldDescription>}
        <FieldError errors={errors} />
      </fieldset>
    </Field>
  )
}

export { FormField, type FormFieldProps }
