import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const dialogSizeMap = {
  s: "sm:max-w-[20vw]",
  m: "sm:max-w-[40vw]",
  l: "sm:max-w-[60vw]",
  xl: "sm:max-w-[80vw]",
} as const

type DialogSize = keyof typeof dialogSizeMap

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root {...props} />
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal {...props} />
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogBackdrop({
  className,
  blur,
  ...props
}: DialogPrimitive.Backdrop.Props & { blur?: boolean }) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-backdrop"
      className={cn(
        "fixed inset-0 isolate z-50 bg-black/10 duration-100 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        blur && "supports-backdrop-filter:backdrop-blur-md",
        className
      )}
      {...props}
    />
  )
}

type DialogDragHandlers = {
  draggable: boolean
  onPointerDown: (e: React.PointerEvent<HTMLElement>) => void
  onPointerMove: (e: React.PointerEvent<HTMLElement>) => void
  onPointerUp: (e: React.PointerEvent<HTMLElement>) => void
}

const DialogDragContext = React.createContext<DialogDragHandlers | null>(null)

function DialogContent({
  className,
  children,
  size,
  showCloseButton = true,
  blur,
  draggable = false,
  style,
  ...props
}: DialogPrimitive.Popup.Props & {
  size?: DialogSize
  showCloseButton?: boolean
  blur?: boolean
  draggable?: boolean
}) {
  const [pos, setPos] = React.useState({ x: 0, y: 0 })
  const dragRef = React.useRef<{
    startX: number
    startY: number
    origX: number
    origY: number
  } | null>(null)

  const onPointerDown = React.useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (!draggable) return
      const target = e.target as HTMLElement
      if (target.closest("button, input, textarea, select, a, [role='button']")) return
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        origX: pos.x,
        origY: pos.y,
      }
      e.currentTarget.setPointerCapture(e.pointerId)
    },
    [draggable, pos.x, pos.y]
  )

  const onPointerMove = React.useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (!dragRef.current) return
      setPos({
        x: dragRef.current.origX + (e.clientX - dragRef.current.startX),
        y: dragRef.current.origY + (e.clientY - dragRef.current.startY),
      })
    },
    []
  )

  const onPointerUp = React.useCallback(() => {
    dragRef.current = null
  }, [])

  const dragHandlers = React.useMemo(
    () => ({ draggable, onPointerDown, onPointerMove, onPointerUp }),
    [draggable, onPointerDown, onPointerMove, onPointerUp]
  )

  const dragStyle = draggable
    ? { ...style, transform: `translate(${pos.x}px, ${pos.y}px)` }
    : style

  return (
    <DialogPortal>
      <DialogBackdrop blur={blur} />
      <DialogDragContext.Provider value={dragHandlers}>
        <DialogPrimitive.Popup
          data-slot="dialog-content"
          className={cn(
            "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-6 rounded-xl bg-background p-6 text-sm ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-md data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            size && dialogSizeMap[size],
            className
          )}
          style={dragStyle}
          {...props}
        >
          {children}
          {showCloseButton && (
            <DialogPrimitive.Close
              data-slot="dialog-close"
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="absolute top-4 right-4 hover:bg-destructive/10 hover:text-destructive"
                >
                  <XIcon />
                  <span className="sr-only">Close</span>
                </Button>
              }
            />
          )}
        </DialogPrimitive.Popup>
      </DialogDragContext.Provider>
    </DialogPortal>
  )
}

function DialogHeader({
  className,
  separator,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  ...props
}: React.ComponentProps<"div"> & { separator?: boolean }) {
  const drag = React.useContext(DialogDragContext)
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        "flex flex-col gap-2",
        separator && "-mx-6 border-b border-border px-6 pb-2",
        drag?.draggable && "cursor-move touch-none select-none",
        className
      )}
      onPointerDown={(e) => {
        drag?.onPointerDown(e)
        onPointerDown?.(e)
      }}
      onPointerMove={(e) => {
        drag?.onPointerMove(e)
        onPointerMove?.(e)
      }}
      onPointerUp={(e) => {
        drag?.onPointerUp(e)
        onPointerUp?.(e)
      }}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  separator,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
  separator?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        separator && "-mx-6 border-t border-border px-6 pt-3",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close render={<Button variant="outline">Close</Button>} />
      )}
    </div>
  )
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("leading-none font-medium", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  type DialogSize,
}
