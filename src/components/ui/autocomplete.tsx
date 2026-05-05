import * as React from "react"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

interface AutocompleteOption {
  value: string
  label: string
}

interface AutocompleteProps {
  options: AutocompleteOption[]
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

function Autocomplete({
  options,
  value,
  onValueChange,
  placeholder = "Search...",
  className,
  disabled = false,
}: AutocompleteProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [highlightIndex, setHighlightIndex] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const listRef = React.useRef<HTMLDivElement>(null)
  const listboxId = React.useId()
  const optionId = (index: number) => `${listboxId}-opt-${index}`

  const selectedLabel =
    options.find((o) => o.value === value)?.label ?? ""

  const filtered = React.useMemo(() => {
    if (!search) return options
    const lower = search.toLowerCase()
    return options.filter((o) => o.label.toLowerCase().includes(lower))
  }, [options, search])

  // Reset highlight when filtered list changes
  React.useEffect(() => {
    setHighlightIndex(0)
  }, [filtered])

  const handleFocus = () => {
    setSearch("")
    setHighlightIndex(0)
    setOpen(true)
  }

  const handleBlur = (e: React.FocusEvent) => {
    if (containerRef.current?.contains(e.relatedTarget as Node)) return
    setOpen(false)
    setSearch("")
  }

  const handleSelect = (optionValue: string) => {
    onValueChange(optionValue)
    setOpen(false)
    setSearch("")
    inputRef.current?.blur()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setHighlightIndex((i) => (i + 1) % filtered.length)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlightIndex((i) => (i - 1 + filtered.length) % filtered.length)
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (filtered.length > 0) {
        handleSelect(filtered[highlightIndex].value)
      }
    } else if (e.key === "Escape") {
      setOpen(false)
      setSearch("")
      inputRef.current?.blur()
    }
  }

  // Scroll highlighted item into view
  React.useEffect(() => {
    if (!open || !listRef.current) return
    const items = listRef.current.querySelectorAll("[data-slot='autocomplete-item']")
    items[highlightIndex]?.scrollIntoView({ block: "nearest" })
  }, [highlightIndex, open])

  return (
    <div ref={containerRef} className={cn("relative", className)} onBlur={handleBlur}>
      <input
        ref={inputRef}
        type="text"
        disabled={disabled}
        className="h-9 w-full min-w-0 rounded-md border border-input bg-input/30 px-3 py-1 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        placeholder={open ? placeholder : selectedLabel || placeholder}
        value={open ? search : selectedLabel}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
        aria-controls={listboxId}
        aria-activedescendant={
          open && filtered.length > 0 ? optionId(highlightIndex) : undefined
        }
      />
      {open && (
        <div
          ref={listRef}
          id={listboxId}
          role="listbox"
          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl border bg-popover p-1 shadow-lg"
        >
          {filtered.length === 0 ? (
            <div className="py-2 text-center text-sm text-muted-foreground">
              No results found.
            </div>
          ) : (
            filtered.map((option, index) => (
              <div
                key={option.value}
                id={optionId(index)}
                role="option"
                aria-selected={option.value === value}
                data-slot="autocomplete-item"
                data-highlighted={index === highlightIndex ? "" : undefined}
                className={cn(
                  "relative flex cursor-pointer items-center rounded-lg px-3 py-2 text-sm select-none hover:bg-accent hover:text-accent-foreground",
                  index === highlightIndex && "bg-accent text-accent-foreground",
                  option.value === value && "font-medium"
                )}
                onMouseDown={(e) => {
                  e.preventDefault()
                  handleSelect(option.value)
                }}
                onMouseEnter={() => setHighlightIndex(index)}
              >
                {option.label}
                {option.value === value && (
                  <CheckIcon className="ml-auto size-4" />
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export { Autocomplete }
export type { AutocompleteOption, AutocompleteProps }
