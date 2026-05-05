import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface MultiSelectOption {
  value: string
  label: string
}

interface MultiSelectGroup {
  label: string
  options: MultiSelectOption[]
}

interface MultiSelectProps {
  options: MultiSelectOption[]
  groups?: MultiSelectGroup[]
  value: string[]
  onValueChange: (value: string[]) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

function MultiSelect({
  options,
  groups,
  value,
  onValueChange,
  placeholder = "Select...",
  className,
  disabled = false,
  open,
  defaultOpen,
  onOpenChange,
}: MultiSelectProps) {
  const listboxId = React.useId()

  const allOptions = groups
    ? groups.flatMap((g) => g.options)
    : options

  const selectedLabels = allOptions
    .filter((o) => value.includes(o.value))
    .map((o) => o.label)

  const displayText =
    selectedLabels.length === 0
      ? placeholder
      : selectedLabels.length <= 2
        ? selectedLabels.join(", ")
        : `${selectedLabels.slice(0, 2).join(", ")} +${selectedLabels.length - 2}`

  const toggle = (optionValue: string) => {
    onValueChange(
      value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue]
    )
  }

  const renderItem = (option: MultiSelectOption) => (
    <button
      key={option.value}
      type="button"
      role="option"
      aria-selected={value.includes(option.value)}
      onClick={() => toggle(option.value)}
      className="flex w-full cursor-default items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm outline-hidden select-none hover:bg-accent hover:text-accent-foreground"
    >
      <Checkbox
        checked={value.includes(option.value)}
        onCheckedChange={() => toggle(option.value)}
        tabIndex={-1}
      />
      <span className="flex-1 text-left">{option.label}</span>
    </button>
  )

  return (
    <Popover open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger
        render={
          <button
            type="button"
            disabled={disabled}
            aria-haspopup="listbox"
            aria-controls={listboxId}
            className={cn(
              "flex h-9 w-fit items-center justify-between gap-1.5 rounded-3xl border border-transparent bg-input/50 px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow,background-color] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50",
              selectedLabels.length === 0 && "text-muted-foreground",
              className
            )}
          />
        }
      >
        <span className="line-clamp-1 flex-1 text-left">{displayText}</span>
        <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-(--anchor-width) min-w-48 overflow-hidden rounded-xl p-0 shadow-lg ring-1 ring-foreground/5 dark:ring-foreground/10"
      >
        <div
          id={listboxId}
          role="listbox"
          aria-multiselectable
          className="max-h-72 overflow-y-auto p-1.5"
        >
          {groups ? (
            groups.map((group) => (
              <div key={group.label} role="group" aria-label={group.label}>
                <div className="px-2.5 py-1.5 text-xs text-muted-foreground">
                  {group.label}
                </div>
                {group.options.map(renderItem)}
              </div>
            ))
          ) : (
            options.map(renderItem)
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { MultiSelect }
export type { MultiSelectOption, MultiSelectGroup, MultiSelectProps }
