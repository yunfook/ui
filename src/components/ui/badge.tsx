import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex shrink-0 items-center justify-center gap-1 overflow-hidden border border-transparent font-medium whitespace-nowrap truncate transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        danger:
          "bg-red-500 text-white dark:bg-red-600 [a]:hover:bg-red-600",
        success:
          "bg-green-500 text-white dark:bg-green-600 [a]:hover:bg-green-600",
        warning:
          "bg-yellow-400 text-black [a]:hover:bg-yellow-500",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      square: {
        true: "rounded-md",
        false: "rounded-3xl",
      },
      size: {
        sm: "h-6 px-2.5 text-[10px]",
        default: "h-7 px-3 text-xs",
        lg: "h-8 px-4 text-sm",
      },
    },
    compoundVariants: [
      { square: true, size: "sm", className: "w-16 px-1.5" },
      { square: true, size: "default", className: "w-20 px-2" },
      { square: true, size: "lg", className: "w-24 px-2.5" },
    ],
    defaultVariants: {
      variant: "default",
      square: false,
      size: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  square = false,
  size = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    square?: boolean
  }) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant, square, size }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
