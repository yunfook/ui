import * as React from "react"
import { createFileRoute } from "@tanstack/react-router"
import { InstallCommand } from "@/components/combo/install-command"

import { Button } from "@/components/ui/button"
import { CodeBlock } from "@/components/ui/code-block"
import { Row, RowItem } from "@/components/ui/row"
import {
  SignaturePad,
  type SignaturePadHandle,
} from "@/components/ui/signature-pad"

export const Route = createFileRoute("/ui/signature-pad")({
  component: SignaturePadPage,
})

const code = `import { useRef, useState } from "react"
import {
  SignaturePad,
  type SignaturePadHandle,
} from "@/components/ui/signature-pad"

const padRef = useRef<SignaturePadHandle>(null)
const [empty, setEmpty] = useState(true)
const [preview, setPreview] = useState<string | null>(null)

<SignaturePad ref={padRef} onChange={setEmpty} />
<button disabled={empty} onClick={() => padRef.current?.clear()}>Clear</button>
<button disabled={empty} onClick={() => setPreview(padRef.current?.toDataURL() ?? null)}>
  Capture
</button>`

function SignaturePadPage() {
  const padRef = React.useRef<SignaturePadHandle>(null)
  const [empty, setEmpty] = React.useState(true)
  const [preview, setPreview] = React.useState<string | null>(null)

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 p-8">
      <div>
        <h1 className="text-2xl font-bold">SignaturePad</h1>
        <InstallCommand />
        <p className="text-sm text-muted-foreground">
          Bare canvas primitive. Compose your own controls via the imperative
          ref API. For an upload-ready dialog, see{" "}
          <code className="text-foreground">SignatureDialog</code>.
        </p>
      </div>
      <Row>
        <RowItem main>
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-muted/30 p-6">
            <SignaturePad ref={padRef} onChange={setEmpty} />
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                disabled={empty}
                onClick={() => {
                  padRef.current?.clear()
                  setPreview(null)
                }}
              >
                Clear
              </Button>
              <Button
                size="sm"
                disabled={empty}
                onClick={() =>
                  setPreview(padRef.current?.toDataURL() ?? null)
                }
              >
                Capture
              </Button>
            </div>
            {preview && (
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-muted-foreground">
                  Captured preview
                </span>
                <img
                  src={preview}
                  alt="Captured signature"
                  className="rounded-lg border bg-white"
                />
              </div>
            )}
          </div>
        </RowItem>
        <RowItem>
          <CodeBlock filename="signature-pad.tsx" content={code} />
        </RowItem>
      </Row>
    </div>
  )
}
