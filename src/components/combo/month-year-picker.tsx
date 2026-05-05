import * as React from "react"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Wheel, ITEM_HEIGHT, VISIBLE_ITEMS } from "@/components/ui/wheel"

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const START_YEAR = 2000
const END_YEAR = 2060
const MONTH_VALUES = Array.from({ length: MONTHS.length }, (_, i) => i)
const YEARS = Array.from(
  { length: END_YEAR - START_YEAR + 1 },
  (_, i) => START_YEAR + i
)

interface MonthYearPickerProps {
  month: number
  year: number
  onSelect: (month: number, year: number) => void
  className?: string
}

function MonthYearPickerWheel({
  month,
  year,
  onSelect,
  onConfirm,
}: {
  month: number
  year: number
  onSelect: (month: number, year: number) => void
  onConfirm?: () => void
}) {
  const padHeight = Math.floor(VISIBLE_ITEMS / 2) * ITEM_HEIGHT
  const selectionRef = React.useRef({ month, year })

  React.useEffect(() => {
    selectionRef.current = { month, year }
  }, [month, year])

  const handleMonthSelect = (nextMonth: number) => {
    selectionRef.current = { ...selectionRef.current, month: nextMonth }
    onSelect(nextMonth, selectionRef.current.year)
  }

  const handleYearSelect = (nextYear: number) => {
    selectionRef.current = { ...selectionRef.current, year: nextYear }
    onSelect(selectionRef.current.month, nextYear)
  }

  return (
    <div className="relative flex gap-1">
      <div
        className="pointer-events-none absolute inset-x-1 z-5 rounded-md bg-muted"
        style={{ top: padHeight, height: ITEM_HEIGHT }}
      />
      <Wheel
        items={MONTH_VALUES}
        value={month}
        onSelect={handleMonthSelect}
        renderItem={(i) => MONTHS[i]}
        onConfirm={onConfirm}
        className="flex-1"
      />
      <Wheel
        items={YEARS}
        value={year}
        onSelect={handleYearSelect}
        renderItem={(y) => String(y)}
        onConfirm={onConfirm}
        className="w-20 tabular-nums"
      />
    </div>
  )
}

function MonthYearPicker({ month, year, onSelect, className }: MonthYearPickerProps) {
  const [open, setOpen] = React.useState(false)
  const label = `${MONTHS[month]} ${year}`

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            className={cn("justify-start gap-2 font-normal", className)}
          />
        }
      >
        <CalendarIcon className="size-4 text-muted-foreground" />
        {label}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-64 p-2">
        <MonthYearPickerWheel
          month={month}
          year={year}
          onSelect={onSelect}
          onConfirm={() => setOpen(false)}
        />
      </PopoverContent>
    </Popover>
  )
}

export { MonthYearPicker, MonthYearPickerWheel }
export type { MonthYearPickerProps }
