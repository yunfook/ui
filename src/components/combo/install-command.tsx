import * as React from "react"
import { useRouterState } from "@tanstack/react-router"
import { CheckIcon, CopyIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const REGISTRY_BASE = "https://yf-ui.vercel.app/r"

interface InstallCommandProps extends React.ComponentProps<"div"> {
  /** Override auto-detection from URL path. */
  name?: string
}

function InstallCommand({ className, name, ...props }: InstallCommandProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const detected = pathname.split("/").filter(Boolean).pop() ?? ""
  const itemName = name ?? detected
  const command = `npx shadcn@latest add ${REGISTRY_BASE}/${itemName}.json`

  const [copied, setCopied] = React.useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(command)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      data-slot="install-command"
      className={cn(
        "flex items-center justify-between gap-3 rounded-xl border bg-muted/35 px-4 py-3",
        className
      )}
      {...props}
    >
      <code className="truncate font-mono text-sm text-muted-foreground">
        {command}
      </code>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy install command"}
        className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      >
        {copied ? (
          <CheckIcon className="size-4" />
        ) : (
          <CopyIcon className="size-4" />
        )}
      </button>
    </div>
  )
}

export { InstallCommand }
export type { InstallCommandProps }
