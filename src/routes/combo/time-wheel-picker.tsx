import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { CodeBlock } from '@/components/ui/code-block'
import { Row, RowItem } from '@/components/ui/row'
import { TimeWheelPicker } from '@/components/combo/time-wheel-picker'

export const Route = createFileRoute('/combo/time-wheel-picker')({ component: TimeWheelPickerPage })

const code = `import { TimeWheelPicker } from "@/components/combo/time-wheel-picker"

const [hour, setHour] = useState(14)
const [minute, setMinute] = useState(30)

// 24-hour (default)
<TimeWheelPicker
  hour={hour}
  minute={minute}
  onSelect={(h, m) => { setHour(h); setMinute(m) }}
/>

// 12-hour with seconds
<TimeWheelPicker
  variant="12"
  showSeconds
  hour={hour}
  minute={minute}
  onSelect={(h, m) => { setHour(h); setMinute(m) }}
/>`

function TimeWheelPickerPage() {
  const [hour, setHour] = useState(14)
  const [minute, setMinute] = useState(30)

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 p-8">
      <h1 className="text-2xl font-bold">TimeWheelPicker</h1>
      <Row>
        <RowItem main>
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-muted/30 p-6">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">24-hour</h3>
              <TimeWheelPicker
                hour={hour}
                minute={minute}
                onSelect={(h, m) => { setHour(h); setMinute(m) }}
              />
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">12-hour</h3>
              <TimeWheelPicker
                variant="12"
                hour={hour}
                minute={minute}
                onSelect={(h, m) => { setHour(h); setMinute(m) }}
              />
            </div>
          </div>
        </RowItem>
        <RowItem>
          <CodeBlock filename="time-wheel-picker.tsx" content={code} />
        </RowItem>
      </Row>
    </div>
  )
}
