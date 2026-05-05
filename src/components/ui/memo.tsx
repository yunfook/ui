import * as React from "react"

import { cn } from "@/lib/utils"

interface MemoSection {
  title: string
  items: string[]
}

interface MemoProps extends React.ComponentProps<"div"> {
  /** Data-driven mode — when provided, children are ignored */
  data?: MemoSection[]
}

function Memo({ className, data, children, ...props }: MemoProps) {
  return (
    <div
      data-slot="memo"
      className={cn(
        "flex flex-col gap-2 rounded-xl border bg-muted/35 p-4",
        className
      )}
      {...props}
    >
      {data
        ? data.map((section, i) => (
            <React.Fragment key={i}>
              <MemoTitle className={i > 0 ? "pt-3" : undefined}>
                {section.title}
              </MemoTitle>
              {section.items.map((item, j) => (
                <MemoItem key={j}>{item}</MemoItem>
              ))}
            </React.Fragment>
          ))
        : children}
    </div>
  )
}

function MemoTitle({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="memo-title"
      className={cn("pt-1 text-sm font-medium", className)}
      {...props}
    />
  )
}

function MemoItem({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="memo-item"
      className={cn("flex gap-2 text-sm text-muted-foreground", className)}
      {...props}
    >
      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground/60" />
      <span>{children}</span>
    </div>
  )
}

export { Memo, MemoItem, MemoTitle, type MemoProps, type MemoSection }
