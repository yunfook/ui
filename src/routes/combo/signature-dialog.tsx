import * as React from "react"
import { createFileRoute } from "@tanstack/react-router"

import { CodeBlock } from "@/components/ui/code-block"
import { Row, RowItem } from "@/components/ui/row"
import { SignatureDialog } from "@/components/combo/signature-dialog"

export const Route = createFileRoute("/combo/signature-dialog")({
  component: SignatureDialogPage,
})

const code = `import { SignatureDialog } from "@/components/combo/signature-dialog"

// upload returns whatever your API returns — onSuccess receives it as-is
<SignatureDialog
  upload={(blob) => api.uploadSignature(blob)}
  onSuccess={({ url }) => setSignature(row.original, url)}
  onError={(err) => toast.error(err.message)}
/>`

type UploadResult = { url: string; size: number }

function SignatureDialogPage() {
  const [shouldFail, setShouldFail] = React.useState(false)
  const [savedUrl, setSavedUrl] = React.useState<string | null>(null)

  const fakeUpload = async (blob: Blob): Promise<UploadResult> => {
    await new Promise((r) => setTimeout(r, 1200))
    if (shouldFail) throw new Error("Server rejected the signature")
    return { url: URL.createObjectURL(blob), size: blob.size }
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 p-8">
      <div>
        <h1 className="text-2xl font-bold">SignatureDialog</h1>
        <p className="text-sm text-muted-foreground">
          Dialog combo wrapping{" "}
          <code className="text-foreground">SignaturePad</code>. Plug your
          upload function in and it handles the spinner / retry-on-error / close
          lifecycle for you.
        </p>
      </div>
      <Row>
        <RowItem main>
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-muted/30 p-6">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={shouldFail}
                onChange={(e) => setShouldFail(e.target.checked)}
              />
              Simulate upload failure
            </label>

            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-muted-foreground">
                Default
              </span>
              <SignatureDialog
                upload={fakeUpload}
                onSuccess={(res) => setSavedUrl(res.url)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-muted-foreground">
                Blue pen
              </span>
              <SignatureDialog
                penColor="rgb(37, 99, 235)"
                title="Initial Here"
                description="Please provide your initials."
                upload={fakeUpload}
                onSuccess={(res) => setSavedUrl(res.url)}
              />
            </div>

            {savedUrl && (
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-muted-foreground">
                  Last saved (from onSuccess)
                </span>
                <img
                  src={savedUrl}
                  alt="Saved signature"
                  className="rounded-lg border bg-white"
                />
              </div>
            )}
          </div>
        </RowItem>
        <RowItem>
          <CodeBlock filename="signature-dialog.tsx" content={code} />
        </RowItem>
      </Row>
    </div>
  )
}
