import { createFormHook } from "@tanstack/react-form"

import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { SubmitButton } from "@/components/ui/submit-button"
import { FormField } from "@/components/combo/form-field"
import { fieldContext, formContext } from "@/lib/form-context"

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    Input,
    Checkbox,
    FormField,
  },
  formComponents: {
    SubmitButton,
  },
})

export { useFieldContext, useFormContext } from "@/lib/form-context"
