import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type Column,
  type ColumnDef,
  type ColumnPinningState,
  type Header,
  type RowData,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ChevronsUpDownIcon,
  PinIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Expandable } from "@/components/ui/expandable"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import type { QueryLike } from "@/components/ui/list"

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    /** Pin column to left/right edge during horizontal scroll. */
    pin?: "left" | "right"
    /**
     * Accent color (any CSS color). Header gets the color as background; cells
     * get a translucent tint of it. Override either side via headerStyle /
     * cellStyle.
     */
    color?: string
    /** Optional header inline style. Wins over `color`. */
    headerStyle?: React.CSSProperties
    /** Optional header class. */
    headerClassName?: string
    /** Optional body cell inline style. Wins over `color`. */
    cellStyle?: React.CSSProperties
    /** Optional body cell class. */
    cellClassName?: string
    /** Internal: marks a parent column as a collapsible group. */
    collapsible?: boolean
    /** Internal: when true, the group starts collapsed. */
    defaultCollapsed?: boolean
    /** Internal: marks a child column as the summary cell when collapsed. */
    collapsedSummary?: boolean
  }
}

/**
 * Declarative grouping over a flat columns list. Reference column ids/accessor
 * keys via `members`; the data-table compiles the group into a collapsible
 * tanstack column tree internally.
 */
interface ColumnGroup<T> {
  /** Stable id for the group (used for the group header). */
  id: string
  /** Header rendered above the members (and as the collapsed-state label). */
  header: ColumnDef<T>["header"]
  /** Ids/accessorKeys of member columns from `columns`, in display order. */
  members: string[]
  /** Cell rendered in the single column shown when the group is collapsed. */
  cell?: ColumnDef<T>["cell"]
  /** When true, the group starts collapsed. */
  defaultCollapsed?: boolean
  /** Width applied to the collapsed summary column. */
  size?: number
  /**
   * Accent color (any CSS color). Header gets the color as background; cells
   * get a translucent tint of it. Override sides individually via
   * headerStyle / cellStyle.
   */
  color?: string
  /** Header style applied to the group + each member. Overrides `color`. */
  headerStyle?: React.CSSProperties
  /** Header class applied to the group + each member. */
  headerClassName?: string
  /** Cell style applied to the collapsed summary + each member. Overrides `color`. */
  cellStyle?: React.CSSProperties
  /** Cell class applied to the collapsed summary + each member. */
  cellClassName?: string
}

/** ColumnDef with a top-level `color` shortcut (hoisted into meta.color). */
type DataTableColumnDef<T> = ColumnDef<T> & { color?: string }

interface DataTableProps<T> {
  columns: DataTableColumnDef<T>[]
  /**
   * Optional column groups. Each group references columns by id and renders as
   * a collapsible single column with a chevron toggle. Click the chevron to
   * expand into the member columns.
   */
  columnGroups?: ColumnGroup<T>[]
  /** Provide directly, or via a tanstack-query result. */
  data?: T[]
  query?: QueryLike<T>
  /** Enables pagination when set. */
  pageSize?: number
  /** Use server-side pagination — pageSize still drives display, but table won't slice. */
  manualPagination?: boolean
  /** Required when manualPagination is true. */
  pageCount?: number
  enableSorting?: boolean
  enableSelection?: boolean
  /** Called whenever row selection changes. */
  onSelectionChange?: (selected: T[]) => void
  /** When provided, each row gets a chevron + expandable detail drawer. */
  expandableContent?: (row: T) => React.ReactNode
  emptyText?: React.ReactNode
  errorText?: React.ReactNode
  skeletonCount?: number
  className?: string
}

function getPinningStyles<T>(
  column: Column<T, unknown>,
  isHeader = false,
): React.CSSProperties {
  const pinned = column.getIsPinned()
  if (!pinned) return {}
  const isLastLeft = pinned === "left" && column.getIsLastColumn("left")
  const isFirstRight = pinned === "right" && column.getIsFirstColumn("right")
  return {
    position: "sticky",
    left: pinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: pinned === "right" ? `${column.getAfter("right")}px` : undefined,
    zIndex: isHeader ? 2 : 1,
    backgroundColor: "var(--background)",
    boxShadow: isLastLeft
      ? "inset -4px 0 4px -4px rgb(0 0 0 / 0.08)"
      : isFirstRight
        ? "inset 4px 0 4px -4px rgb(0 0 0 / 0.08)"
        : undefined,
  }
}

function walkColumns<T>(
  cols: ColumnDef<T>[],
  cb: (col: ColumnDef<T>) => void,
): void {
  for (const col of cols) {
    cb(col)
    const sub = (col as { columns?: ColumnDef<T>[] }).columns
    if (sub) walkColumns(sub, cb)
  }
}

function getColumnId<T>(col: ColumnDef<T>): string | undefined {
  if ("id" in col && col.id) return col.id
  if ("accessorKey" in col && typeof col.accessorKey === "string") {
    return col.accessorKey
  }
  return undefined
}

type ColumnSideMeta = {
  color?: string
  headerStyle?: React.CSSProperties
  cellStyle?: React.CSSProperties
}

function resolveHeaderStyle(meta?: ColumnSideMeta): React.CSSProperties {
  if (!meta) return {}
  const colorPart = meta.color ? { backgroundColor: meta.color } : null
  return { ...colorPart, ...meta.headerStyle }
}

function resolveCellStyle(meta?: ColumnSideMeta): React.CSSProperties {
  if (!meta) return {}
  const colorPart = meta.color
    ? {
        backgroundColor: `color-mix(in oklab, ${meta.color} 14%, transparent)`,
      }
    : null
  return { ...colorPart, ...meta.cellStyle }
}

interface CollapsibleGroup<T> {
  id: string
  column: ColumnDef<T>
}

function DataTable<T>({
  columns,
  columnGroups,
  data,
  query,
  pageSize,
  manualPagination,
  pageCount,
  enableSorting,
  enableSelection,
  onSelectionChange,
  expandableContent,
  emptyText = "No results",
  errorText,
  skeletonCount,
  className,
}: DataTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})

  // Compile flat columns + columnGroups into the nested form tanstack-table
  // expects. Each group becomes a collapsible parent with a synthesized
  // "summary" leaf (rendered when collapsed) plus the member columns
  // (rendered when expanded). Top-level `color` shortcut is hoisted into
  // meta.color first.
  const enrichedColumns = React.useMemo<ColumnDef<T>[]>(() => {
    const hoisted: ColumnDef<T>[] = columns.map((col) => {
      const { color, ...rest } = col
      if (color === undefined) return rest as ColumnDef<T>
      return {
        ...rest,
        meta: { ...rest.meta, color: rest.meta?.color ?? color },
      } as ColumnDef<T>
    })

    if (!columnGroups || columnGroups.length === 0) return hoisted

    const memberToGroup = new Map<string, ColumnGroup<T>>()
    for (const group of columnGroups) {
      for (const memberId of group.members) {
        memberToGroup.set(memberId, group)
      }
    }

    const styleMember = (
      member: ColumnDef<T>,
      group: ColumnGroup<T>,
    ): ColumnDef<T> => ({
      ...member,
      meta: {
        ...member.meta,
        color: member.meta?.color ?? group.color,
        headerStyle: { ...group.headerStyle, ...member.meta?.headerStyle },
        headerClassName: cn(group.headerClassName, member.meta?.headerClassName),
        cellStyle: { ...group.cellStyle, ...member.meta?.cellStyle },
        cellClassName: cn(group.cellClassName, member.meta?.cellClassName),
      },
    })

    const result: ColumnDef<T>[] = []
    const emittedGroups = new Set<string>()

    for (const col of hoisted) {
      const colId = getColumnId(col)
      if (!colId) {
        result.push(col)
        continue
      }
      const group = memberToGroup.get(colId)
      if (!group) {
        result.push(col)
        continue
      }
      if (emittedGroups.has(group.id)) continue
      emittedGroups.add(group.id)

      const members = group.members
        .map((id) => hoisted.find((c) => getColumnId(c) === id))
        .filter((c): c is ColumnDef<T> => !!c)
        .map((m) => styleMember(m, group))

      const summary: ColumnDef<T> = {
        id: `${group.id}__summary`,
        header: group.header,
        cell: group.cell,
        size: group.size,
        meta: {
          collapsedSummary: true,
          color: group.color,
          headerStyle: group.headerStyle,
          headerClassName: group.headerClassName,
          cellStyle: group.cellStyle,
          cellClassName: group.cellClassName,
        },
      }

      result.push({
        id: group.id,
        header: group.header,
        meta: {
          collapsible: true,
          defaultCollapsed: group.defaultCollapsed,
          color: group.color,
          headerStyle: group.headerStyle,
          headerClassName: group.headerClassName,
        },
        size: group.size,
        columns: [summary, ...members],
      } as ColumnDef<T>)
    }

    return result
  }, [columns, columnGroups])

  const initialPinning = React.useMemo<ColumnPinningState>(() => {
    const left: string[] = []
    const right: string[] = []
    walkColumns(enrichedColumns, (col) => {
      const pin = col.meta?.pin
      if (!pin) return
      const id = getColumnId(col)
      if (!id) return
      if (pin === "left") left.push(id)
      else if (pin === "right") right.push(id)
    })
    return { left, right }
  }, [enrichedColumns])
  const [columnPinning, setColumnPinning] =
    React.useState<ColumnPinningState>(initialPinning)

  const initialCollapsedGroups = React.useMemo(() => {
    const set = new Set<string>()
    walkColumns(enrichedColumns, (col) => {
      const id = getColumnId(col)
      if (id && col.meta?.collapsible && col.meta?.defaultCollapsed) {
        set.add(id)
      }
    })
    return set
  }, [enrichedColumns])
  const [collapsedGroups, setCollapsedGroups] = React.useState(
    initialCollapsedGroups,
  )

  const collapsibleChildGroups = React.useMemo(() => {
    const map = new Map<string, CollapsibleGroup<T>>()
    walkColumns(enrichedColumns, (col) => {
      if (!col.meta?.collapsible) return
      const groupId = getColumnId(col)
      const sub = (col as { columns?: ColumnDef<T>[] }).columns
      if (!groupId || !sub) return
      for (const child of sub) {
        const childId = getColumnId(child)
        if (childId) map.set(childId, { id: groupId, column: col })
      }
    })
    return map
  }, [enrichedColumns])
  const hasCollapsibleGroups = collapsibleChildGroups.size > 0

  // Initial visibility — derived once from columns + initial collapsed groups.
  // After mount, visibility is mutated imperatively via table.getColumn().toggleVisibility().
  const initialVisibility = React.useMemo<VisibilityState>(() => {
    const v: VisibilityState = {}
    walkColumns(enrichedColumns, (col) => {
      if (!col.meta?.collapsible) return
      const groupId = getColumnId(col)
      if (!groupId) return
      const sub = (col as { columns?: ColumnDef<T>[] }).columns
      if (!sub) return
      const isCollapsed = initialCollapsedGroups.has(groupId)
      for (const child of sub) {
        const childId = getColumnId(child)
        if (!childId) continue
        const isSummary = child.meta?.collapsedSummary === true
        v[childId] = isCollapsed ? isSummary : !isSummary
      }
    })
    return v
    // initialCollapsedGroups is itself memoised on enrichedColumns
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enrichedColumns])

  const toggleGroup = React.useCallback((groupId: string) => {
    setCollapsedGroups((prev) => {
      const next = new Set(prev)
      if (next.has(groupId)) next.delete(groupId)
      else next.add(groupId)
      return next
    })
  }, [])

  const fullColumns = React.useMemo<ColumnDef<T>[]>(() => {
    if (!enableSelection) return enrichedColumns
    const selectionColumn: ColumnDef<T> = {
      id: "__select__",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          indeterminate={
            table.getIsSomePageRowsSelected() &&
            !table.getIsAllPageRowsSelected()
          }
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(v) => row.toggleSelected(!!v)}
        />
      ),
      enableSorting: false,
      size: 32,
    }
    return [selectionColumn, ...enrichedColumns]
  }, [enrichedColumns, enableSelection])

  const resolvedData = data ?? query?.data ?? []
  const loading = query ? (query.isLoading ?? query.isPending ?? false) : false
  const isError = query?.isError ?? false

  const table = useReactTable<T>({
    data: resolvedData,
    columns: fullColumns,
    state: {
      sorting,
      rowSelection,
      columnPinning,
    },
    enableSorting: !!enableSorting,
    enableRowSelection: !!enableSelection,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnPinningChange: setColumnPinning,
    manualPagination: !!manualPagination,
    pageCount: manualPagination ? (pageCount ?? -1) : undefined,
    initialState: {
      ...(pageSize ? { pagination: { pageIndex: 0, pageSize } } : {}),
      columnVisibility: initialVisibility,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: pageSize ? getPaginationRowModel() : undefined,
  })

  // Sync collapsed groups → tanstack-table column visibility (imperative).
  React.useEffect(() => {
    walkColumns(enrichedColumns, (col) => {
      if (!col.meta?.collapsible) return
      const groupId = getColumnId(col)
      if (!groupId) return
      const sub = (col as { columns?: ColumnDef<T>[] }).columns
      if (!sub) return
      const isCollapsed = collapsedGroups.has(groupId)
      for (const child of sub) {
        const childId = getColumnId(child)
        if (!childId) continue
        const isSummary = child.meta?.collapsedSummary === true
        const shouldShow = isCollapsed ? isSummary : !isSummary
        table.getColumn(childId)?.toggleVisibility(shouldShow)
      }
    })
  }, [enrichedColumns, collapsedGroups, table])

  React.useEffect(() => {
    if (!enableSelection || !onSelectionChange) return
    const rows = table.getSelectedRowModel().rows.map((r) => r.original)
    onSelectionChange(rows)
  }, [enableSelection, onSelectionChange, rowSelection, table])

  const visibleLeafCount = table.getVisibleLeafColumns().length
  const colCount = visibleLeafCount + (expandableContent ? 1 : 0)

  const renderHeaderContent = React.useCallback(
    (
      header: Header<T, unknown>,
      options?: {
        collapsibleGroup?: CollapsibleGroup<T>
        useGroupHeader?: boolean
        useGroupToggle?: boolean
      },
    ) => {
      const group = options?.collapsibleGroup
      const groupId = group?.id
      const useGroupToggle = !!groupId && options?.useGroupToggle
      const isCollapsed = groupId ? collapsedGroups.has(groupId) : false
      const canSort =
        !useGroupToggle && enableSorting && header.column.getCanSort()
      const sorted = header.column.getIsSorted()
      const pinned = header.column.getIsPinned()
      const pinIcon = pinned ? (
        <PinIcon className="size-3 text-muted-foreground" />
      ) : null
      const content =
        group && options?.useGroupHeader
          ? flexRender(group.column.header, header.getContext())
          : flexRender(header.column.columnDef.header, header.getContext())

      if (useGroupToggle && groupId) {
        return (
          <button
            type="button"
            onClick={() => toggleGroup(groupId)}
            className="flex w-full cursor-pointer items-center justify-center gap-1.5 outline-none select-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            <ChevronRightIcon
              className={cn(
                "size-4 transition-transform",
                !isCollapsed && "rotate-90",
              )}
            />
            {content}
          </button>
        )
      }

      if (canSort) {
        return (
          <button
            type="button"
            onClick={header.column.getToggleSortingHandler()}
            className="flex items-center gap-1 outline-none hover:text-foreground"
          >
            {pinIcon}
            {content}
            {sorted === "asc" ? (
              <ChevronUpIcon className="size-3.5" />
            ) : sorted === "desc" ? (
              <ChevronDownIcon className="size-3.5" />
            ) : (
              <ChevronsUpDownIcon className="size-3.5 text-muted-foreground/60" />
            )}
          </button>
        )
      }

      return (
        <span className="inline-flex items-center gap-1">
          {pinIcon}
          {content}
        </span>
      )
    },
    [collapsedGroups, enableSorting, toggleGroup],
  )

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="overflow-auto rounded-xl border border-border bg-background">
        <Table>
          <TableHeader>
            {hasCollapsibleGroups ? (
              <TableRow>
                {expandableContent && <TableHead className="w-10" />}
                {(() => {
                  // Collapsed parent + leaves are flattened into one header row.
                  // table.getLeafHeaders() yields each leaf once per row it
                  // spans (duplicates for nested structures), so use the last
                  // header group instead.
                  const groups = table.getHeaderGroups()
                  const leafGroup = groups[groups.length - 1]
                  // Only the first visible header in a group renders the
                  // chevron toggle.
                  const seenToggle = new Set<string>()
                  return leafGroup.headers.map((header) => {
                    const group = collapsibleChildGroups.get(header.column.id)
                    const useGroupToggle =
                      !!group && !seenToggle.has(group.id)
                    if (group && useGroupToggle) seenToggle.add(group.id)
                    const useGroupHeader =
                      !!group &&
                      collapsedGroups.has(group.id) &&
                      header.column.columnDef.meta?.collapsedSummary === true
                    const meta = useGroupHeader
                      ? group?.column.meta
                      : header.column.columnDef.meta
                    const size = header.getSize()

                    return (
                      <TableHead
                        key={header.id}
                        className={cn(meta?.headerClassName)}
                        style={{
                          width: size,
                          minWidth: size,
                          ...resolveHeaderStyle(meta),
                          ...getPinningStyles(header.column, true),
                        }}
                      >
                        {renderHeaderContent(header, {
                          collapsibleGroup: group,
                          useGroupHeader,
                          useGroupToggle,
                        })}
                      </TableHead>
                    )
                  })
                })()}
              </TableRow>
            ) : (
              table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id}>
                  {expandableContent && <TableHead className="w-10" />}
                  {hg.headers.map((header) => {
                    const meta = header.column.columnDef.meta
                    const size = header.getSize()

                    return (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        className={cn(meta?.headerClassName)}
                        style={{
                          width: size,
                          minWidth: size,
                          ...resolveHeaderStyle(meta),
                          ...getPinningStyles(header.column, true),
                        }}
                      >
                        {header.isPlaceholder
                          ? null
                          : renderHeaderContent(header)}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))
            )}
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: skeletonCount ?? pageSize ?? 5 }).map(
                (_, i) => (
                  <TableRow key={`skeleton-${i}`}>
                    {expandableContent && <TableCell className="w-10" />}
                    {table.getVisibleLeafColumns().map((col, j) => (
                      <TableCell
                        key={j}
                        style={{
                          width: col.getSize(),
                          minWidth: col.getSize(),
                          ...getPinningStyles(col),
                        }}
                      >
                        <div className="h-4 w-full animate-pulse rounded bg-muted" />
                      </TableCell>
                    ))}
                  </TableRow>
                ),
              )
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={colCount}
                  className="py-8 text-center text-destructive"
                >
                  {errorText ??
                    (query?.error instanceof Error
                      ? query.error.message
                      : "Something went wrong")}
                  {query?.refetch && (
                    <button
                      type="button"
                      onClick={() => query.refetch?.()}
                      className="ml-2 text-xs text-primary underline-offset-4 hover:underline"
                    >
                      Retry
                    </button>
                  )}
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={colCount}
                  className="py-8 text-center text-muted-foreground"
                >
                  {emptyText}
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => {
                const cells = row.getVisibleCells().map((cell) => {
                  const meta = cell.column.columnDef.meta
                  const size = cell.column.getSize()
                  return (
                    <TableCell
                      key={cell.id}
                      className={cn(meta?.cellClassName)}
                      style={{
                        width: size,
                        minWidth: size,
                        ...resolveCellStyle(meta),
                        ...getPinningStyles(cell.column),
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  )
                })
                if (expandableContent) {
                  return (
                    <Expandable
                      key={row.id}
                      fold={expandableContent(row.original)}
                      foldColSpan={colCount}
                      data-state={row.getIsSelected() ? "selected" : undefined}
                    >
                      {cells}
                    </Expandable>
                  )
                }
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() ? "selected" : undefined}
                  >
                    {cells}
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      {pageSize && (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {enableSelection &&
              `${table.getSelectedRowModel().rows.length} of ${
                table.getRowModel().rows.length
              } selected · `}
            Page {table.getState().pagination.pageIndex + 1}
            {table.getPageCount() > 0 && ` of ${table.getPageCount()}`}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export { DataTable, type DataTableProps, type ColumnGroup }
export type { ColumnDef }
