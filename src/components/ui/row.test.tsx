// @vitest-environment jsdom

import { act, render } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

import { Row, RowItem } from "@/components/ui/row"

const originalResizeObserver = globalThis.ResizeObserver
const offsetHeightDescriptor = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  "offsetHeight"
)

afterEach(() => {
  if (originalResizeObserver) {
    globalThis.ResizeObserver = originalResizeObserver
  } else {
    delete (globalThis as { ResizeObserver?: typeof ResizeObserver }).ResizeObserver
  }

  if (offsetHeightDescriptor) {
    Object.defineProperty(HTMLElement.prototype, "offsetHeight", offsetHeightDescriptor)
  } else {
    delete (HTMLElement.prototype as { offsetHeight?: number }).offsetHeight
  }
})

describe("Row", () => {
  it("does not re-register the main item when the measured height updates", () => {
    const observe = vi.fn()
    const disconnect = vi.fn()
    let resizeCallback: ResizeObserverCallback | undefined

    class ResizeObserverMock implements ResizeObserver {
      observe = observe
      unobserve = vi.fn()
      disconnect = disconnect

      constructor(callback: ResizeObserverCallback) {
        resizeCallback = callback
      }
    }

    globalThis.ResizeObserver = ResizeObserverMock

    Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
      configurable: true,
      get() {
        return Number(
          this.getAttribute("data-height") ??
            this.querySelector("[data-height]")?.getAttribute("data-height") ??
            0
        )
      },
    })

    const { container } = render(
      <Row>
        <RowItem main>
          <div data-height="120">Main content</div>
        </RowItem>
        <RowItem>Side content</RowItem>
      </Row>
    )

    expect(observe).toHaveBeenCalledTimes(1)
    expect(disconnect).not.toHaveBeenCalled()

    const mainContent = container.querySelector('[data-height="120"]')
    expect(mainContent).not.toBeNull()

    act(() => {
      mainContent?.setAttribute("data-height", "160")
      resizeCallback?.([], {} as ResizeObserver)
    })

    expect(observe).toHaveBeenCalledTimes(1)
    expect(disconnect).not.toHaveBeenCalled()
    expect(
      (container.firstElementChild as HTMLDivElement).style.getPropertyValue(
        "--yf-row-main-height"
      )
    ).toBe("160px")
  })
})
