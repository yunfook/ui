import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { InstallCommand } from "@/components/combo/install-command"
import type { DateRange } from 'react-day-picker'
import { CodeBlock } from '@/components/ui/code-block'
import { Row, RowItem } from '@/components/ui/row'
import { Calendar } from '@/components/ui/calendar'

export const Route = createFileRoute('/ui/calendar')({ component: CalendarPage })

const code = `import { Calendar } from "@/components/ui/calendar"

// Single date
const [date, setDate] = useState<Date | undefined>(new Date())
<Calendar mode="single" selected={date} onSelect={setDate} />

// Date range
const [range, setRange] = useState<DateRange | undefined>()
<Calendar mode="range" selected={range} onSelect={setRange} />

// Multiple dates
const [dates, setDates] = useState<Date[] | undefined>([])
<Calendar mode="multiple" selected={dates} onSelect={setDates} />

// Dropdown caption for fast year/month nav
<Calendar mode="single" captionLayout="dropdown" />

// Rest days — 0 = Sun, 6 = Sat
<Calendar mode="single" restDays={[0, 6]} />

// Holidays — ISO 8601 (YYYY-MM-DD)
<Calendar mode="single" holidays={["2026-05-01", "2026-05-25"]} />`

function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [range, setRange] = useState<DateRange | undefined>()
  const [dates, setDates] = useState<Date[] | undefined>([])

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 p-8">
      <h1 className="text-2xl font-bold">Calendar</h1>
      <InstallCommand />
      <Row>
        <RowItem main>
          <div className="flex flex-col gap-6 rounded-xl border border-border bg-muted/30 p-6">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Single</h3>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border bg-background"
              />
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Range</h3>
              <Calendar
                mode="range"
                selected={range}
                onSelect={setRange}
                numberOfMonths={2}
                className="rounded-md border bg-background"
              />
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Multiple</h3>
              <Calendar
                mode="multiple"
                selected={dates}
                onSelect={setDates}
                className="rounded-md border bg-background"
              />
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Dropdown caption</h3>
              <Calendar
                mode="single"
                captionLayout="dropdown"
                className="rounded-md border bg-background"
              />
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Rest days (Sat + Sun)</h3>
              <Calendar
                mode="single"
                restDays={[0, 6]}
                className="rounded-md border bg-background"
              />
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Holidays</h3>
              <Calendar
                mode="single"
                defaultMonth={new Date(2026, 4, 1)}
                holidays={["2026-05-01", "2026-05-25"]}
                className="rounded-md border bg-background"
              />
            </div>
          </div>
        </RowItem>
        <RowItem>
          <CodeBlock filename="calendar.tsx" content={code} />
        </RowItem>
      </Row>
    </div>
  )
}
