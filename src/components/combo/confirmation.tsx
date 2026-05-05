import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type ConfirmationVariant = "default" | "warning" | "danger"

interface ConfirmationProps<T = void> {
  /** Trigger button label */
  text: string
  /** Dialog title — default "Are you sure?" */
  title?: string
  /** Dialog description */
  description?: string
  /** Confirm button label — default "Yes" */
  confirm?: string
  /** Cancel button label — default "No" */
  cancel?: string
  /** Severity — styles trigger + confirm button. Cancel is always outline. */
  variant?: ConfirmationVariant
  /** Trigger button size */
  size?: "default" | "xs" | "sm" | "lg"
  /** Mirror button order — cancel first instead of confirm first */
  mirror?: boolean
  /** Optional context passed to onConfirm / onCancel */
  value?: T
  onConfirm?: (value: T) => void
  onCancel?: (value: T) => void
}

function Confirmation<T = void>({
  text,
  title = "Are you sure?",
  description,
  confirm = "Yes",
  cancel = "No",
  variant = "default",
  size,
  mirror = false,
  value,
  onConfirm,
  onCancel,
}: ConfirmationProps<T>) {
  const [open, setOpen] = React.useState(false)

  const handleConfirm = () => {
    onConfirm?.(value as T)
    setOpen(false)
  }

  const handleCancel = () => {
    onCancel?.(value as T)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant={variant} size={size}>
            {text}
          </Button>
        }
      />
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>
        <DialogFooter>
          {(() => {
            const cancelBtn = (
              <Button key="cancel" variant="outline" onClick={handleCancel}>
                {cancel}
              </Button>
            )
            const confirmBtn = (
              <Button key="confirm" variant={variant} onClick={handleConfirm}>
                {confirm}
              </Button>
            )
            return mirror
              ? [cancelBtn, confirmBtn]
              : [confirmBtn, cancelBtn]
          })()}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { Confirmation, type ConfirmationProps, type ConfirmationVariant }
