import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const panelSizeMap = {
  s: "sm:max-w-md",
  m: "sm:max-w-2xl",
  l: "sm:max-w-5xl",
} as const

type PanelSize = keyof typeof panelSizeMap

function Panel({
  handleOnly = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return (
    <DrawerPrimitive.Root
      data-slot="panel"
      direction="right"
      handleOnly={handleOnly}
      {...props}
    />
  )
}

function PanelTrigger({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="panel-trigger" {...props} />
}

function PanelPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="panel-portal" {...props} />
}

function PanelClose({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="panel-close" {...props} />
}

function PanelOverlay({
  className,
  blur,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay> & {
  blur?: boolean
}) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="panel-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/30 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        blur && "supports-backdrop-filter:backdrop-blur-md",
        className
      )}
      {...props}
    />
  )
}

function PanelContent({
  className,
  children,
  size,
  blur,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content> & {
  size?: PanelSize
  blur?: boolean
  showCloseButton?: boolean
}) {
  return (
    <PanelPortal>
      <PanelOverlay blur={blur} />
      <DrawerPrimitive.Content
        data-slot="panel-content"
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex h-full w-3/4 flex-col bg-background text-sm shadow-xl ring-1 ring-foreground/10 outline-none",
          size && panelSizeMap[size],
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DrawerPrimitive.Close asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="absolute top-4 right-4 hover:bg-destructive/10 hover:text-destructive"
            >
              <XIcon />
              <span className="sr-only">Close</span>
            </Button>
          </DrawerPrimitive.Close>
        )}
      </DrawerPrimitive.Content>
    </PanelPortal>
  )
}

function PanelHeader({
  className,
  separator,
  ...props
}: React.ComponentProps<"div"> & { separator?: boolean }) {
  return (
    <div
      data-slot="panel-header"
      className={cn(
        "flex flex-col gap-1 p-6",
        separator && "border-b border-border",
        className
      )}
      {...props}
    />
  )
}

function PanelFooter({
  className,
  separator,
  ...props
}: React.ComponentProps<"div"> & { separator?: boolean }) {
  return (
    <div
      data-slot="panel-footer"
      className={cn(
        "mt-auto flex flex-col-reverse gap-2 p-6 sm:flex-row sm:justify-end",
        separator && "border-t border-border",
        className
      )}
      {...props}
    />
  )
}

function PanelTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="panel-title"
      className={cn("leading-none font-medium", className)}
      {...props}
    />
  )
}

function PanelDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="panel-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Panel,
  PanelPortal,
  PanelOverlay,
  PanelTrigger,
  PanelClose,
  PanelContent,
  PanelHeader,
  PanelFooter,
  PanelTitle,
  PanelDescription,
  type PanelSize,
}
