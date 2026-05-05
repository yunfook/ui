import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { CodeBlock } from '@/components/ui/code-block'
import { Row, RowItem } from '@/components/ui/row'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/combo/calendar-rest-days')({ component: CalendarRestDaysPage })

const WEEKDAYS = [
  { value: 1, label: 'Mon' },
  { value: 2, label: 'Tue' },
  { value: 3, label: 'Wed' },
  { value: 4, label: 'Thu' },
  { value: 5, label: 'Fri' },
  { value: 6, label: 'Sat' },
  { value: 0, label: 'Sun' },
] as const

const code = `import { Calendar } from "@/components/ui/calendar"

// 0 = Sunday, 1 = Monday, ... 6 = Saturday
const [restDays, setRestDays] = useState<number[]>([0, 6])

<Calendar mode="single" restDays={restDays} />`

function CalendarRestDaysPage() {
  const [restDays, setRestDays] = useState<number[]>([0, 6])
  const [date, setDate] = useState<Date | undefined>(new Date())

  const toggle = (day: number) =>
    setRestDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    )

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 p-8">
      <h1 className="text-2xl font-bold">Calendar — Rest Days</h1>
      <p className="text-sm text-muted-foreground">
        Mark any weekdays as rest — matching cells render with a yellow background across every week.
      </p>
      <Row>
        <RowItem main>
          <div className="flex flex-col gap-6 rounded-xl border border-border bg-muted/30 p-6">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Rest days</h3>
              <div className="flex flex-wrap gap-2">
                {WEEKDAYS.map((d) => {
                  const active = restDays.includes(d.value)
                  return (
                    <Button
                      key={d.value}
                      type="button"
                      variant={active ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => toggle(d.value)}
                      className={cn(active && 'bg-yellow-400 text-black hover:bg-yellow-500')}
                    >
                      {d.label}
                    </Button>
                  )
                })}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Selected: {restDays.length ? restDays.sort().join(', ') : '(none)'}
              </p>
            </div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              restDays={restDays}
              className="rounded-md border bg-background"
            />
          </div>
        </RowItem>
        <RowItem>
          <CodeBlock filename="calendar-rest-days.tsx" content={code} />
        </RowItem>
      </Row>
    </div>
  )
}
