import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { CodeBlock } from '@/components/ui/code-block'
import { Row, RowItem } from '@/components/ui/row'
import { MonthYearPicker } from '@/components/combo/month-year-picker'

export const Route = createFileRoute('/combo/month-year-picker')({ component: MonthYearPickerPage })

const code = `import { MonthYearPicker } from "@/components/combo/month-year-picker"

const [month, setMonth] = useState(3)
const [year, setYear] = useState(2026)

<MonthYearPicker
  month={month}
  year={year}
  onSelect={(m, y) => { setMonth(m); setYear(y) }}
/>`

function MonthYearPickerPage() {
  const [month, setMonth] = useState(3)
  const [year, setYear] = useState(2026)

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 p-8">
      <h1 className="text-2xl font-bold">MonthYearPicker</h1>
      <Row>
        <RowItem main>
          <div className="rounded-xl border border-border bg-muted/30 p-6">
            <h3 className="mb-4 font-semibold">Selected: {month + 1}/{year}</h3>
            <MonthYearPicker
              month={month}
              year={year}
              onSelect={(m, y) => { setMonth(m); setYear(y) }}
            />
          </div>
        </RowItem>
        <RowItem>
          <CodeBlock filename="month-year-picker.tsx" content={code} />
        </RowItem>
      </Row>
    </div>
  )
}
