import * as React from "react"
import SignaturePadCanvas from "react-signature-pad-wrapper"

import { cn } from "@/lib/utils"

interface SignaturePadHandle {
  clear: () => void
  isEmpty: () => boolean
  toDataURL: (type?: string) => string
  toBlob: (type?: string) => Promise<Blob | null>
}

interface SignaturePadProps {
  ref?: React.Ref<SignaturePadHandle>
  penColor?: string
  height?: number
  className?: string
  onChange?: (isEmpty: boolean) => void
}

function SignaturePad({
  ref,
  penColor = "black",
  height = 200,
  className,
  onChange,
}: SignaturePadProps) {
  const padRef = React.useRef<SignaturePadCanvas>(null)

  React.useImperativeHandle(
    ref,
    () => ({
      clear: () => {
        padRef.current?.clear()
        onChange?.(true)
      },
      isEmpty: () => padRef.current?.isEmpty() ?? true,
      toDataURL: (type = "image/png") =>
        padRef.current?.toDataURL(type) ?? "",
      toBlob: async (type = "image/png") => {
        if (!padRef.current || padRef.current.isEmpty()) return null
        const dataUrl = padRef.current.toDataURL(type)
        return await fetch(dataUrl).then((r) => r.blob())
      },
    }),
    [onChange]
  )

  const handleStrokeEnd = () => {
    onChange?.(padRef.current?.isEmpty() ?? true)
  }

  return (
    <div
      data-slot="signature-pad"
      className={cn("rounded-lg border bg-white", className)}
      onPointerUp={handleStrokeEnd}
    >
      <SignaturePadCanvas
        ref={padRef}
        options={{ penColor, minWidth: 1.5, maxWidth: 3 }}
        height={height}
        redrawOnResize
      />
    </div>
  )
}

export {
  SignaturePad,
  type SignaturePadHandle,
  type SignaturePadProps,
}
