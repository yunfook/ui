import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/ui/code-block'
import { Row, RowItem } from '@/components/ui/row'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Expandable } from '@/components/ui/expandable'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/ui/expandable')({ component: ExpandablePage })

const code = `import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Expandable } from "@/components/ui/expandable"

// Master-detail: driver row expands to a sub-table of vehicles.
<Table>
  <TableHeader>
    <TableRow>
      <TableHead className="w-10" />
      <TableHead>Driver</TableHead>
      <TableHead>License</TableHead>
      <TableHead>Vehicles</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {drivers.map((d) => (
      <Expandable
        key={d.id}
        fold={
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plate</TableHead>
                <TableHead>Make</TableHead>
                <TableHead>Year</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {d.vehicles.map((v) => (
                <TableRow key={v.plate}>
                  <TableCell>{v.plate}</TableCell>
                  <TableCell>{v.make}</TableCell>
                  <TableCell>{v.year}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        }
      >
        <TableCell>{d.name}</TableCell>
        <TableCell>{d.license}</TableCell>
        <TableCell>{d.vehicles.length}</TableCell>
      </Expandable>
    ))}
  </TableBody>
</Table>`

type Vehicle = {
  plate: string
  make: string
  year: number
  status: 'Active' | 'Service' | 'Retired'
}

type Driver = {
  id: string
  name: string
  license: string
  region: string
  vehicles: Vehicle[]
}

const drivers: Driver[] = [
  {
    id: 'd1',
    name: 'Alice Johnson',
    license: 'AJ-4821',
    region: 'Berlin',
    vehicles: [
      { plate: 'B-AA 1234', make: 'VW Transporter', year: 2021, status: 'Active' },
      { plate: 'B-AA 7788', make: 'Mercedes Sprinter', year: 2019, status: 'Service' },
    ],
  },
  {
    id: 'd2',
    name: 'Bob Smith',
    license: 'BS-9912',
    region: 'Lisbon',
    vehicles: [
      { plate: '12-BB-34', make: 'Renault Trafic', year: 2022, status: 'Active' },
      { plate: '56-BB-78', make: 'Ford Transit', year: 2018, status: 'Active' },
      { plate: '90-BB-12', make: 'Peugeot Boxer', year: 2015, status: 'Retired' },
    ],
  },
  {
    id: 'd3',
    name: 'Carol Williams',
    license: 'CW-3344',
    region: 'New York',
    vehicles: [
      { plate: 'NY-CW 001', make: 'Chevy Express', year: 2023, status: 'Active' },
    ],
  },
]

const statusVariant: Record<Vehicle['status'], 'success' | 'warning' | 'danger'> = {
  Active: 'success',
  Service: 'warning',
  Retired: 'danger',
}

function ExpandablePage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 p-8">
      <h1 className="text-2xl font-bold">Expandable</h1>
      <p className="text-muted-foreground">
        Master-detail table row. Expand a parent row to reveal a nested
        sub-table (or any other content). Click the row or chevron to toggle.
      </p>
      <Row>
        <RowItem main>
          <div className="flex flex-col gap-6 rounded-xl border border-border bg-background p-6">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                Drivers → Vehicles
              </h3>
              <div className="overflow-hidden rounded-xl border border-border bg-background">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10" />
                      <TableHead>Driver</TableHead>
                      <TableHead>License</TableHead>
                      <TableHead>Region</TableHead>
                      <TableHead className="text-right">Vehicles</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {drivers.map((d) => (
                      <Expandable
                        key={d.id}
                        fold={
                          <div className="flex flex-col gap-2">
                           
                            <div >
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Plate</TableHead>
                                    <TableHead>Make</TableHead>
                                    <TableHead>Year</TableHead>
                                    <TableHead>Status</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {d.vehicles.map((v) => (
                                    <TableRow key={v.plate}>
                                      <TableCell className="font-mono text-xs">
                                        {v.plate}
                                      </TableCell>
                                      <TableCell>{v.make}</TableCell>
                                      <TableCell>{v.year}</TableCell>
                                      <TableCell>
                                        <Badge
                                          variant={statusVariant[v.status]}
                                          size="sm"
                                          square
                                        >
                                          {v.status}
                                        </Badge>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </div>
                        }
                      >
                        <TableCell className="font-medium">{d.name}</TableCell>
                        <TableCell className="font-mono text-xs">
                          {d.license}
                        </TableCell>
                        <TableCell>{d.region}</TableCell>
                        <TableCell className="text-right tabular-nums">
                          {d.vehicles.length}
                        </TableCell>
                      </Expandable>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </RowItem>
        <RowItem>
          <CodeBlock filename="expandable.tsx" content={code} />
        </RowItem>
      </Row>
    </div>
  )
}
