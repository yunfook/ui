import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { cn } from "@/lib/utils"

interface CodeBlockProps {
  filename: string
  content: string
  className?: string
}

const codeFontFamily =
  "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace"

function findCommentIndex(line: string) {
  let i = 0
  while (i < line.length - 1) {
    if (line[i] === "/" && line[i + 1] === "/") {
      if (i > 0 && line[i - 1] === ":") {
        i += 2
        continue
      }
      return i
    }
    i++
  }
  return -1
}

function formatLine(line: string) {
  if (line.trimStart().startsWith("//")) {
    return <span className="text-muted-foreground/60 italic">{line}</span>
  }

  const idx = findCommentIndex(line)
  if (idx > 0) {
    return (
      <>
        {line.slice(0, idx)}
        <span className="text-muted-foreground/60 italic">
          {line.slice(idx)}
        </span>
      </>
    )
  }

  return line
}

function getFileLabel(filename: string) {
  const ext = filename.split(".").pop()?.trim().toUpperCase()
  return ext && ext.length <= 6 ? ext : "FILE"
}

function CodeBlock({ filename, content, className }: CodeBlockProps) {
  const source = content.trim()
  const [copied, setCopied] = React.useState(false)
  const lines = source.split("\n")
  const fileLabel = getFileLabel(filename)

  function handleCopy() {
    navigator.clipboard.writeText(source)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={cn(
        "flex min-h-0 w-full max-w-full flex-col overflow-hidden rounded-xl border border-muted bg-muted/30 text-sm shadow-sm",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b bg-muted/35 px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-md bg-muted px-2 text-[11px] font-semibold tracking-wide text-muted-foreground">
            {fileLabel}
          </span>
          <span className="truncate text-sm font-medium text-muted-foreground">
            {filename}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label="Copy code"
        >
          {copied ? (
            <CheckIcon className="size-4" />
          ) : (
            <CopyIcon className="size-4" />
          )}
        </button>
      </div>
      <pre className="min-h-0 flex-1 overflow-auto bg-muted/20 p-4">
        <code
          className="text-[13px] leading-relaxed"
          style={{ fontFamily: codeFontFamily }}
        >
          <table className="border-collapse">
            <tbody>
              {lines.map((line, i) => (
                <tr key={i}>
                  <td
                    className="pr-4 text-right align-top text-muted-foreground/40 select-none"
                    style={{ fontFamily: codeFontFamily }}
                  >
                    {i + 1}
                  </td>
                  <td className="whitespace-pre">{formatLine(line)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </code>
      </pre>
    </div>
  )
}

export { CodeBlock }
export type { CodeBlockProps }
