import * as React from "react"
import { createFileRoute } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"

import { Badge } from "@/components/ui/badge"
import {
  DataTable,
  type ColumnDef,
  type ColumnGroup,
} from "@/components/combo/data-table"
import { InstallCommand } from "@/components/combo/install-command"

export const Route = createFileRoute("/combo/data-table")({
  component: DataTablePage,
})

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "member" | "viewer"
  country: "US" | "MY" | "SG" | "ID" | "TH" | "JP"
  joinedAt: string
  notes: string
}

const mockUsers: User[] = [
  { id: "u1", name: "Alice Johnson", email: "alice@acme.co", role: "admin", country: "US", joinedAt: "2024-01-12", notes: "Quarterly review pending" },
  { id: "u2", name: "Bob Smith", email: "bob@acme.co", role: "member", country: "MY", joinedAt: "2024-02-03", notes: "Migrated from legacy plan" },
  { id: "u3", name: "Carol Williams", email: "carol@acme.co", role: "viewer", country: "SG", joinedAt: "2024-02-22", notes: "Read-only seat" },
  { id: "u4", name: "Dan Park", email: "dan@acme.co", role: "member", country: "ID", joinedAt: "2024-03-09", notes: "Onboarding in progress" },
  { id: "u5", name: "Eve Davis", email: "eve@acme.co", role: "admin", country: "US", joinedAt: "2024-04-14", notes: "Owner since launch" },
  { id: "u6", name: "Frank Liu", email: "frank@acme.co", role: "member", country: "TH", joinedAt: "2024-05-02", notes: "Submitted feature request" },
  { id: "u7", name: "Grace Kim", email: "grace@acme.co", role: "viewer", country: "JP", joinedAt: "2024-06-30", notes: "Trial converted" },
  { id: "u8", name: "Henry Chen", email: "henry@acme.co", role: "member", country: "MY", joinedAt: "2024-07-18", notes: "Premium upgrade" },
  { id: "u9", name: "Iris Patel", email: "iris@acme.co", role: "admin", country: "SG", joinedAt: "2024-08-05", notes: "Workspace lead" },
  { id: "u10", name: "Jack Tan", email: "jack@acme.co", role: "member", country: "MY", joinedAt: "2024-09-22", notes: "Custom integration" },
  { id: "u11", name: "Kara Lee", email: "kara@acme.co", role: "viewer", country: "ID", joinedAt: "2024-10-11", notes: "Audit observer" },
  { id: "u12", name: "Liam Wong", email: "liam@acme.co", role: "member", country: "TH", joinedAt: "2024-11-04", notes: "Joined via referral" },
]

function roleBadgeVariant(role: User["role"]) {
  return role === "admin" ? "success" : role === "member" ? "default" : "secondary"
}

function useUsersQuery() {
  return useQuery<User[]>({
    queryKey: ["data-table-demo-users"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 600))
      return mockUsers
    },
  })
}

function Section({
  title,
  description,
  children,
}: {
  title: string
  description: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <h3 className="text-base font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="rounded-xl border border-border bg-background p-6">
        {children}
      </div>
    </div>
  )
}

// ─── Example 1: Basic ───────────────────────────────────────────────────────

function BasicExample() {
  const usersQuery = useUsersQuery()
  const columns = React.useMemo<ColumnDef<User>[]>(
    () => [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "email", header: "Email" },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => (
          <Badge variant={roleBadgeVariant(row.original.role)} square size="sm">
            {row.original.role}
          </Badge>
        ),
      },
      { accessorKey: "joinedAt", header: "Joined" },
    ],
    [],
  )
  return (
    <DataTable<User>
      columns={columns}
      query={usersQuery}
      pageSize={5}
      enableSorting
    />
  )
}

// ─── Example 2: Expandable rows ─────────────────────────────────────────────

function ExpandableExample() {
  const usersQuery = useUsersQuery()
  const columns = React.useMemo<ColumnDef<User>[]>(
    () => [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "email", header: "Email" },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => (
          <Badge variant={roleBadgeVariant(row.original.role)} square size="sm">
            {row.original.role}
          </Badge>
        ),
      },
      { accessorKey: "joinedAt", header: "Joined" },
    ],
    [],
  )
  return (
    <DataTable<User>
      columns={columns}
      query={usersQuery}
      pageSize={5}
      enableSorting
      expandableContent={(user) => (
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          <div>
            <span className="text-muted-foreground">ID:</span>{" "}
            <code className="font-mono text-xs">{user.id}</code>
          </div>
          <div>
            <span className="text-muted-foreground">Country:</span> {user.country}
          </div>
          <div className="col-span-2">
            <span className="text-muted-foreground">Notes:</span> {user.notes}
          </div>
        </div>
      )}
    />
  )
}

// ─── Example 3: Pinned columns ──────────────────────────────────────────────

function PinnedExample() {
  const columns = React.useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 200,
        meta: { pin: "left" },
      },
      { accessorKey: "email", header: "Email", size: 260 },
      { accessorKey: "country", header: "Country", size: 130 },
      { accessorKey: "joinedAt", header: "Joined", size: 150 },
      { accessorKey: "notes", header: "Notes", size: 320 },
      {
        accessorKey: "role",
        header: "Role",
        size: 140,
        meta: { pin: "right" },
        cell: ({ row }) => (
          <Badge variant={roleBadgeVariant(row.original.role)} square size="sm">
            {row.original.role}
          </Badge>
        ),
      },
    ],
    [],
  )
  return <DataTable<User> columns={columns} data={mockUsers.slice(0, 6)} />
}

// ─── Example 4: Collapsible groups ──────────────────────────────────────────

function GroupExample() {
  const columns = React.useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => (
          <code className="font-mono text-xs">{row.original.id}</code>
        ),
      },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "email", header: "Email" },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => (
          <Badge variant={roleBadgeVariant(row.original.role)} square size="sm">
            {row.original.role}
          </Badge>
        ),
      },
      { accessorKey: "country", header: "Country", color: "#dbeafe" },
    ],
    [],
  )
  const columnGroups = React.useMemo<ColumnGroup<User>[]>(
    () => [
      {
        id: "info",
        header: "Info",
        members: ["id", "name", "email"],
        defaultCollapsed: true,
        color: "#dcfce7",
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="font-medium">{row.original.name}</span>
            <span className="text-xs text-muted-foreground">
              {row.original.email}
            </span>
          </div>
        ),
      },
    ],
    [],
  )
  return (
    <DataTable<User>
      columns={columns}
      columnGroups={columnGroups}
      data={mockUsers.slice(0, 6)}
    />
  )
}

// ─── Page ───────────────────────────────────────────────────────────────────

function DataTablePage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 p-8">
      <div>
        <h1 className="text-2xl font-bold">DataTable</h1>
        <p className="text-sm text-muted-foreground">
          tanstack-table-driven combo. Each example below isolates one feature
          so the API stays clear.
        </p>
      </div>
      <InstallCommand />

      <Section
        title="Basic"
        description="Just columns + data (or query). Sorting + pagination opt-in."
      >
        <BasicExample />
      </Section>

      <Section
        title="Expandable rows"
        description="expandableContent={(row) => …} adds a chevron column; click a row to reveal detail."
      >
        <ExpandableExample />
      </Section>

      <Section
        title="Pinned columns"
        description="meta.pin: 'left' | 'right' makes a column sticky during horizontal scroll. A pin icon appears in its header."
      >
        <PinnedExample />
      </Section>

      <Section
        title="Collapsible column groups"
        description="Pass `columnGroups` alongside flat columns. Each group references columns by id, renders a single collapsed cell, and expands into its members on chevron click."
      >
        <GroupExample />
      </Section>
    </div>
  )
}
