import * as React from "react"
import * as Icons from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const hyperlinkVariants = cva(
  "inline-flex cursor-pointer items-center gap-1 text-sm transition-colors",
  {
    variants: {
      variant: {
        underline:
          "text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary",
        dotted:
          "text-primary underline decoration-dotted decoration-primary/40 underline-offset-4 hover:decoration-primary",
        dashed:
          "text-primary underline decoration-dashed decoration-primary/40 underline-offset-4 hover:decoration-primary",
        wavy: "text-primary underline decoration-wavy decoration-primary/40 underline-offset-4 hover:decoration-primary",
        double:
          "text-primary underline decoration-double decoration-primary/40 underline-offset-4 hover:decoration-primary",
        plain: "text-muted-foreground no-underline hover:text-foreground",
      },
    },
    defaultVariants: {
      variant: "underline",
    },
  }
)

type IconComponent = React.ComponentType<{ className?: string }>
const iconRegistry = Icons as unknown as Record<string, IconComponent>

interface HyperlinkProps
  extends React.ComponentProps<"a">,
    VariantProps<typeof hyperlinkVariants> {
  text: string
  icon?: string
}

function Hyperlink({
  className,
  variant,
  text,
  icon,
  ...props
}: HyperlinkProps) {
  const Icon = icon ? iconRegistry[icon] : null

  return (
    <a
      data-slot="hyperlink"
      className={cn(hyperlinkVariants({ variant }), className)}
      {...props}
    >
      {text}
      {Icon ? <Icon className="size-3.5 shrink-0" /> : null}
    </a>
  )
}

export { Hyperlink, hyperlinkVariants, type HyperlinkProps }
