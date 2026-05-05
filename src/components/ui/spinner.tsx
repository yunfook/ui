import { useId } from "react"
import { cn } from "@/lib/utils"
import { Loader2Icon } from "lucide-react"

interface SpinnerProps extends React.ComponentProps<"svg"> {
  variant?: "default" | "dots" | "bars" | "blocks" | "clock"
}

function Spinner({ variant = "default", className, ...props }: SpinnerProps) {
  const uid = useId().replace(/:/g, "")
  const size = cn("size-4", className)

  if (variant === "dots") {
    const a = `${uid}a`
    const b = `${uid}b`
    return (
      <svg
        role="status"
        aria-label="Loading"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={size}
        {...props}
      >
        <circle cx="4" cy="12" r="3">
          <animate
            id={a}
            begin={`0;${b}.end+0.25s`}
            attributeName="cy"
            calcMode="spline"
            dur="0.6s"
            values="12;6;12"
            keySplines=".33,.66,.66,1;.33,0,.66,.33"
          />
        </circle>
        <circle cx="12" cy="12" r="3">
          <animate
            begin={`${a}.begin+0.1s`}
            attributeName="cy"
            calcMode="spline"
            dur="0.6s"
            values="12;6;12"
            keySplines=".33,.66,.66,1;.33,0,.66,.33"
          />
        </circle>
        <circle cx="20" cy="12" r="3">
          <animate
            id={b}
            begin={`${a}.begin+0.2s`}
            attributeName="cy"
            calcMode="spline"
            dur="0.6s"
            values="12;6;12"
            keySplines=".33,.66,.66,1;.33,0,.66,.33"
          />
        </circle>
      </svg>
    )
  }

  if (variant === "bars") {
    return (
      <svg
        role="status"
        aria-label="Loading"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={size}
        {...props}
      >
        <g>
          <rect x="11" y="1" width="2" height="5" opacity=".14" />
          <rect x="11" y="1" width="2" height="5" transform="rotate(30 12 12)" opacity=".29" />
          <rect x="11" y="1" width="2" height="5" transform="rotate(60 12 12)" opacity=".43" />
          <rect x="11" y="1" width="2" height="5" transform="rotate(90 12 12)" opacity=".57" />
          <rect x="11" y="1" width="2" height="5" transform="rotate(120 12 12)" opacity=".71" />
          <rect x="11" y="1" width="2" height="5" transform="rotate(150 12 12)" opacity=".86" />
          <rect x="11" y="1" width="2" height="5" transform="rotate(180 12 12)" />
          <animateTransform
            attributeName="transform"
            type="rotate"
            calcMode="discrete"
            dur="0.75s"
            values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12"
            repeatCount="indefinite"
          />
        </g>
      </svg>
    )
  }

  if (variant === "blocks") {
    const id = (s: string) => `${uid}${s}`
    return (
      <svg
        role="status"
        aria-label="Loading"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={size}
        {...props}
      >
        <rect x="1" y="1" rx="1" width="10" height="10">
          <animate id={id("a")} begin={`0;${id("l")}.end`} attributeName="x" dur="0.2s" values="1;13" fill="freeze" />
          <animate id={id("d")} begin={`${id("c")}.end`} attributeName="y" dur="0.2s" values="1;13" fill="freeze" />
          <animate id={id("g")} begin={`${id("f")}.end`} attributeName="x" dur="0.2s" values="13;1" fill="freeze" />
          <animate id={id("j")} begin={`${id("i")}.end`} attributeName="y" dur="0.2s" values="13;1" fill="freeze" />
        </rect>
        <rect x="1" y="13" rx="1" width="10" height="10">
          <animate id={id("b")} begin={`${id("a")}.end`} attributeName="y" dur="0.2s" values="13;1" fill="freeze" />
          <animate id={id("e")} begin={`${id("d")}.end`} attributeName="x" dur="0.2s" values="1;13" fill="freeze" />
          <animate id={id("h")} begin={`${id("g")}.end`} attributeName="y" dur="0.2s" values="1;13" fill="freeze" />
          <animate id={id("k")} begin={`${id("j")}.end`} attributeName="x" dur="0.2s" values="13;1" fill="freeze" />
        </rect>
        <rect x="13" y="13" rx="1" width="10" height="10">
          <animate id={id("c")} begin={`${id("b")}.end`} attributeName="x" dur="0.2s" values="13;1" fill="freeze" />
          <animate id={id("f")} begin={`${id("e")}.end`} attributeName="y" dur="0.2s" values="13;1" fill="freeze" />
          <animate id={id("i")} begin={`${id("h")}.end`} attributeName="x" dur="0.2s" values="1;13" fill="freeze" />
          <animate id={id("l")} begin={`${id("k")}.end`} attributeName="y" dur="0.2s" values="1;13" fill="freeze" />
        </rect>
      </svg>
    )
  }

  if (variant === "clock") {
    return (
      <svg
        role="status"
        aria-label="Loading"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={size}
        {...props}
      >
        <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" />
        <rect x="11" y="6" rx="1" width="2" height="7">
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="9s"
            values="0 12 12;360 12 12"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="11" y="11" rx="1" width="2" height="9">
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="0.75s"
            values="0 12 12;360 12 12"
            repeatCount="indefinite"
          />
        </rect>
      </svg>
    )
  }

  // Default: spinning loader icon
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("animate-spin", size)}
      {...props}
    />
  )
}

export { Spinner }
export type { SpinnerProps }
