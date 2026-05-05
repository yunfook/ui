import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const fieldVariants = cva("group/field flex w-full gap-2", {
  variants: {
    orientation: {
      vertical: "flex-col",
      horizontal: "flex-row items-center justify-between gap-4",
      responsive: "flex-col @md:flex-row @md:items-center @md:justify-between @md:gap-4",
    },
  },
  defaultVariants: { orientation: "vertical" },
})

interface FieldProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof fieldVariants> {}

function Field({ className, orientation, ...props }: FieldProps) {
  return (
    <div
      data-slot="field"
      data-orientation={orientation ?? "vertical"}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn("@container flex w-full flex-col gap-5", className)}
      {...props}
    />
  )
}

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        "flex flex-col gap-4 rounded-lg border border-border p-4 disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

const fieldLegendVariants = cva("font-medium", {
  variants: {
    variant: {
      legend: "text-base",
      label: "text-sm",
    },
  },
  defaultVariants: { variant: "legend" },
})

interface FieldLegendProps
  extends React.ComponentProps<"legend">,
    VariantProps<typeof fieldLegendVariants> {}

function FieldLegend({ className, variant, ...props }: FieldLegendProps) {
  return (
    <legend
      data-slot="field-legend"
      className={cn(fieldLegendVariants({ variant }), className)}
      {...props}
    />
  )
}

function FieldLabel({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="field-label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[orientation=horizontal]/field:flex-1 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-title"
      className={cn("text-sm leading-none font-medium select-none", className)}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        "text-xs text-muted-foreground text-balance leading-snug",
        className
      )}
      {...props}
    />
  )
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn("flex min-w-0 flex-1 flex-col gap-1.5", className)}
      {...props}
    />
  )
}

interface FieldErrorIssue {
  message?: string
}

interface FieldErrorProps extends React.ComponentProps<"p"> {
  errors?: Array<FieldErrorIssue | string | null | undefined> | null
}

function FieldError({ className, errors, children, ...props }: FieldErrorProps) {
  const messages = React.useMemo(() => {
    if (!errors) return []
    return errors
      .map((e) => (typeof e === "string" ? e : (e?.message ?? null)))
      .filter((m): m is string => !!m)
  }, [errors])

  if (children == null && messages.length === 0) return null

  return (
    <p
      data-slot="field-error"
      role="alert"
      className={cn("text-xs text-destructive leading-snug", className)}
      {...props}
    >
      {children ?? (messages.length === 1 ? messages[0] : (
        <ul className="list-inside list-disc space-y-0.5">
          {messages.map((m, i) => <li key={i}>{m}</li>)}
        </ul>
      ))}
    </p>
  )
}

function FieldSeparator({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-separator"
      className={cn(
        "relative flex items-center text-xs text-muted-foreground before:flex-1 before:border-t before:border-border after:flex-1 after:border-t after:border-border",
        children ? "gap-2" : "",
        className
      )}
      {...props}
    >
      {children && <span className="px-1">{children}</span>}
    </div>
  )
}

export {
  Field,
  FieldGroup,
  FieldSet,
  FieldLegend,
  FieldLabel,
  FieldTitle,
  FieldDescription,
  FieldContent,
  FieldError,
  FieldSeparator,
  type FieldProps,
  type FieldErrorProps,
}
