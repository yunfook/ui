import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { TableCell, TableRow } from "@/components/ui/table"

interface ExpandableProps extends Omit<React.ComponentProps<"tr">, "children"> {
  children: React.ReactNode
  fold: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  disabled?: boolean
  foldColSpan?: number
}

function Expandable({
  children,
  fold,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  foldColSpan,
  className,
  onClick,
  ...props
}: ExpandableProps) {
  const [openInternal, setOpenInternal] = React.useState(defaultOpen)
  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : openInternal
  const contentId = React.useId()

  const colSpan = foldColSpan ?? React.Children.count(children) + 1

  const setOpen = (next: boolean) => {
    if (!isControlled) setOpenInternal(next)
    onOpenChange?.(next)
  }

  const toggle = () => {
    if (disabled) return
    setOpen(!open)
  }

  return (
    <>
      <TableRow
        data-slot="expandable"
        data-open={open ? "" : undefined}
        className={cn(
          "group/expandable",
          !disabled && "cursor-pointer",
          disabled && "opacity-50",
          className
        )}
        onClick={(e) => {
          toggle()
          onClick?.(e)
        }}
        {...props}
      >
        <TableCell
          data-slot="expandable-trigger-cell"
          className="w-10 p-0 text-center align-middle"
        >
          <button
            type="button"
            aria-label={open ? "Collapse row" : "Expand row"}
            aria-expanded={open}
            aria-controls={contentId}
            disabled={disabled}
            className="inline-flex size-8 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none"
            onClick={(e) => {
              e.stopPropagation()
              toggle()
            }}
          >
            <ChevronDownIcon className="size-4 transition-transform duration-200 group-data-open/expandable:rotate-180" />
          </button>
        </TableCell>
        {children}
      </TableRow>
      {open && (
        <tr data-slot="expandable-content" id={contentId}>
          <td colSpan={colSpan} className="border-b p-0">
            <div className="bg-muted/30 px-4 py-4 text-sm">{fold}</div>
          </td>
        </tr>
      )}
    </>
  )
}

export { Expandable }
export type { ExpandableProps }
