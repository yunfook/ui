import * as React from "react"
import {
  EraserIcon,
  Loader2Icon,
  PenLineIcon,
  SaveIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
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
import {
  SignaturePad,
  type SignaturePadHandle,
} from "@/components/ui/signature-pad"

interface SignatureDialogProps<T = unknown> {
  /** Async upload function — receives a PNG Blob, returns whatever your API returns */
  upload: (blob: Blob) => Promise<T>
  /** Called with the upload result on success — dialog closes after */
  onSuccess?: (result: T) => void
  /** Called when upload throws — dialog stays open with the error message */
  onError?: (err: Error) => void
  penColor?: string
  title?: string
  description?: string
  className?: string
}

function SignatureDialog<T = unknown>({
  upload,
  onSuccess,
  onError,
  penColor = "black",
  title = "Signature",
  description = "Draw your signature below.",
  className,
}: SignatureDialogProps<T>) {
  const padRef = React.useRef<SignaturePadHandle>(null)
  const [open, setOpen] = React.useState(false)
  const [isEmpty, setIsEmpty] = React.useState(true)
  const [isUploading, setIsUploading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const reset = () => {
    padRef.current?.clear()
    setIsEmpty(true)
    setError(null)
  }

  const handleSave = async () => {
    if (!padRef.current || padRef.current.isEmpty() || isUploading) return
    const blob = await padRef.current.toBlob()
    if (!blob) return

    setIsUploading(true)
    setError(null)
    try {
      const result = await upload(blob)
      onSuccess?.(result)
      reset()
      setOpen(false)
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err))
      setError(e.message)
      onError?.(e)
    } finally {
      setIsUploading(false)
    }
  }

  const handleOpenChange = (next: boolean) => {
    if (isUploading) return
    if (!next) reset()
    setOpen(next)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button variant="outline" className={cn("gap-2", className)}>
            <PenLineIcon className="size-4" />
            Sign
          </Button>
        }
      />
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <SignaturePad
          ref={padRef}
          penColor={penColor}
          onChange={setIsEmpty}
        />

        {error && <p className="text-sm text-destructive">{error}</p>}

        <DialogFooter className="sm:justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={reset}
            disabled={isEmpty || isUploading}
          >
            <EraserIcon className="size-4" />
            Clear
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={isEmpty || isUploading}
          >
            {isUploading ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : (
              <SaveIcon className="size-4" />
            )}
            {isUploading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { SignatureDialog, type SignatureDialogProps }
