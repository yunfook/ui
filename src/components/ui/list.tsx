import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ListContextValue {
  value: string | undefined
  onValueChange: ((value: string) => void) | undefined
}

const ListContext = React.createContext<ListContextValue>({
  value: undefined,
  onValueChange: undefined,
})

interface QueryLike<T> {
  data: T[] | undefined
  isLoading?: boolean
  isPending?: boolean
  isError: boolean
  error?: unknown
  refetch?: () => unknown
}

type ListBaseProps = Omit<React.ComponentProps<"ul">, "children"> & {
  value?: string
  onValueChange?: (value: string) => void
}

type ListProps<T> = ListBaseProps &
  (
    | { query?: undefined; children?: React.ReactNode }
    | {
        query: QueryLike<T>
        children: (item: T, index: number) => React.ReactNode
        skeletonCount?: number
        emptyText?: React.ReactNode
        errorText?: React.ReactNode
      }
  )

function List<T>(props: ListProps<T>) {
  const { className, value, onValueChange, ...rest } = props as ListBaseProps & {
    query?: QueryLike<T>
    children?: React.ReactNode | ((item: T, index: number) => React.ReactNode)
    skeletonCount?: number
    emptyText?: React.ReactNode
    errorText?: React.ReactNode
  }

  const isQuery = "query" in props && props.query !== undefined
  const query = isQuery ? props.query : undefined

  let body: React.ReactNode

  if (isQuery && query) {
    const loading = query.isLoading ?? query.isPending ?? false
    const skeletonCount =
      "skeletonCount" in props ? (props.skeletonCount ?? 4) : 4

    if (loading) {
      body = Array.from({ length: skeletonCount }).map((_, i) => (
        <li
          key={`skeleton-${i}`}
          data-slot="list-skeleton"
          className="flex items-center gap-3 border-b px-3 py-3 last:border-0"
        >
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
        </li>
      ))
    } else if (query.isError) {
      const message =
        ("errorText" in props && props.errorText) ||
        (query.error instanceof Error
          ? query.error.message
          : "Something went wrong")
      body = (
        <li
          data-slot="list-error"
          className="flex flex-col items-center justify-center gap-2 py-8 text-sm text-destructive"
        >
          <span>{message}</span>
          {query.refetch && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => query.refetch?.()}
            >
              Retry
            </Button>
          )}
        </li>
      )
    } else if (!query.data || query.data.length === 0) {
      body = (
        <ListEmpty>
          {("emptyText" in props && props.emptyText) || "No results"}
        </ListEmpty>
      )
    } else {
      const renderItem = (props as {
        children: (item: T, index: number) => React.ReactNode
      }).children
      body = query.data.map((item, i) => (
        <React.Fragment key={i}>{renderItem(item, i)}</React.Fragment>
      ))
    }
  } else {
    body = (rest as { children?: React.ReactNode }).children
  }

  return (
    <ListContext.Provider value={{ value, onValueChange }}>
      <ul
        data-slot="list"
        className={cn("flex w-full flex-col text-sm", className)}
      >
        {body}
      </ul>
    </ListContext.Provider>
  )
}

interface ListItemProps extends React.ComponentProps<"li"> {
  value?: string
}

function ListItem({ className, value, onClick, ...props }: ListItemProps) {
  const context = React.useContext(ListContext)
  const isSelectable = value !== undefined && context.onValueChange !== undefined
  const isSelected = value !== undefined && context.value === value

  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    if (isSelectable) {
      context.onValueChange!(value)
    }
    onClick?.(e)
  }

  return (
    <li
      data-slot="list-item"
      data-selected={isSelected ? "" : undefined}
      aria-selected={isSelectable ? isSelected : undefined}
      role={isSelectable ? "option" : undefined}
      className={cn(
        "flex items-center gap-3 border-b px-3 py-3 transition-colors last:border-0 hover:bg-muted/50 data-selected:bg-muted",
        isSelectable && "cursor-pointer",
        className
      )}
      onClick={handleClick}
      {...props}
    />
  )
}

function ListHeader({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="list-header"
      className={cn(
        "flex items-center gap-3 border-b bg-muted/30 px-3 py-2 text-xs font-medium text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function ListEmpty({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="list-empty"
      className={cn(
        "flex items-center justify-center py-8 text-sm text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export { List, ListItem, ListHeader, ListEmpty }
export type { ListProps, ListItemProps, QueryLike }
