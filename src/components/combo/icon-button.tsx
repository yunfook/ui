import * as React from "react"
import { AnimatePresence, motion } from "motion/react"

import { Button } from "@/components/ui/button"

type ButtonProps = React.ComponentProps<typeof Button>

interface IconButtonProps extends Omit<ButtonProps, "children"> {
  /** The icon to render. Swapping it for a different element triggers the animation. */
  icon: React.ReactNode
  /** Stable key identifying the icon. Defaults to the element's component name. */
  iconKey?: React.Key
  /** Animation duration in ms — default 250. */
  duration?: number
}

function IconButton({
  icon,
  iconKey,
  duration = 250,
  size = "icon",
  ...props
}: IconButtonProps) {
  const key = iconKey ?? deriveIconKey(icon)

  return (
    <Button data-slot="icon-button" size={size} {...props}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={key}
          data-slot="icon-button-icon"
          className="inline-flex"
          initial={{ scale: 0, opacity: 0.4, filter: "blur(4px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          exit={{ scale: 0, opacity: 0.4, filter: "blur(4px)" }}
          transition={{ duration: duration / 1000 }}
        >
          {icon}
        </motion.span>
      </AnimatePresence>
    </Button>
  )
}

function deriveIconKey(node: React.ReactNode): React.Key {
  if (React.isValidElement(node)) {
    if (node.key != null) return node.key
    const type = node.type as
      | string
      | { displayName?: string; name?: string }
      | undefined
    if (typeof type === "string") return type
    if (type && typeof type !== "string")
      return type.displayName ?? type.name ?? "icon"
  }
  return "icon"
}

export { IconButton, type IconButtonProps }
