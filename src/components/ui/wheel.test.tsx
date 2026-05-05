// @vitest-environment jsdom

import * as React from "react"
import { render } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { Wheel } from "@/components/ui/wheel"

describe("Wheel", () => {
  it("renders the highlighted overlay at the controlled value on first paint", () => {
    const { container } = render(
      <Wheel
        items={[0, 1, 2, 3, 4]}
        value={4}
        onSelect={vi.fn()}
        renderItem={(item) => item}
      />
    )

    const overlay = container.querySelector('[aria-hidden="true"] > div')

    expect(overlay).not.toBeNull()
    expect((overlay as HTMLDivElement).style.transform).toBe("translateY(-144px)")
  })
})
