import * as React from "react"

import "./styles.css"

type RowCssVars = React.CSSProperties & {
  "--yf-row-main-height"?: string
  "--yf-row-width"?: string
}

type RowContextValue = {
  mainHeight: number | null
  registerMain: (node: HTMLDivElement, register: boolean) => void
}

const RowContext = React.createContext<RowContextValue | null>(null)

export type RowProps = React.ComponentProps<"div">

export interface RowItemProps extends React.ComponentProps<"div"> {
  /** Marks this item as the height reference. Only one per <Row>. */
  main?: boolean
  width?: string
}

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ")
}

function assignRef<T>(ref: React.Ref<T> | undefined, value: T) {
  if (typeof ref === "function") {
    ref(value)
    return
  }

  if (ref) {
    ;(ref as React.MutableRefObject<T>).current = value
  }
}

function Row({ children, className, style, ref, ...props }: RowProps) {
  const mainElementsRef = React.useRef<Set<HTMLDivElement>>(new Set())
  const [mainElement, setMainElement] = React.useState<HTMLDivElement | null>(null)
  const [mainHeight, setMainHeight] = React.useState<number | null>(null)

  const registerMain = React.useCallback((node: HTMLDivElement, register: boolean) => {
    const set = mainElementsRef.current
    if (register) {
      set.add(node)
    } else {
      set.delete(node)
    }

    if (process.env.NODE_ENV !== "production" && set.size > 1) {
      console.warn(
        "[yf-row] Multiple <RowItem main> detected in one <Row>. Only one is supported; using the first."
      )
    }

    const first = set.values().next().value ?? null
    setMainElement((current) => (current === first ? current : first))
  }, [])

  React.useLayoutEffect(() => {
    if (!mainElement) {
      setMainHeight(null)
      return
    }

    const updateHeight = () => {
      const nextHeight = mainElement.offsetHeight
      setMainHeight((currentHeight) =>
        currentHeight === nextHeight ? currentHeight : nextHeight
      )
    }

    updateHeight()

    if (typeof ResizeObserver === "undefined") {
      return
    }

    const resizeObserver = new ResizeObserver(updateHeight)
    resizeObserver.observe(mainElement)

    return () => {
      resizeObserver.disconnect()
    }
  }, [mainElement])

  const mergedStyle: RowCssVars | undefined = mainHeight
    ? { ...style, "--yf-row-main-height": `${mainHeight}px` }
    : style

  return (
    <RowContext.Provider value={{ mainHeight, registerMain }}>
      <div
        ref={ref}
        className={cx("yf-row", className)}
        style={mergedStyle}
        {...props}
      >
        {children}
      </div>
    </RowContext.Provider>
  )
}

function RowItem({
  children,
  className,
  main = false,
  style,
  width,
  ref: forwardedRef,
  ...props
}: RowItemProps) {
  const context = React.useContext(RowContext)
  const ref = React.useRef<HTMLDivElement | null>(null)
  const registerMain = context?.registerMain

  React.useLayoutEffect(() => {
    if (!main || !registerMain) {
      return
    }

    const node = ref.current
    if (!node) {
      return
    }

    registerMain(node, true)

    return () => {
      registerMain(node, false)
    }
  }, [main, registerMain])

  const mergedStyle: RowCssVars | undefined = width
    ? { ...style, "--yf-row-width": width }
    : style

  return (
    <div
      ref={(node) => {
        ref.current = node
        assignRef(forwardedRef, node)
      }}
      className={cx("yf-row__item", className)}
      data-fixed-width={width ? "true" : undefined}
      data-main={main ? "true" : "false"}
      data-sync-height={!main && context?.mainHeight ? "true" : undefined}
      style={mergedStyle}
      {...props}
    >
      {children}
    </div>
  )
}

export { Row, RowItem }
