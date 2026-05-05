import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { InstallCommand } from "@/components/combo/install-command"
import { useQuery } from '@tanstack/react-query'

import { CodeBlock } from '@/components/ui/code-block'
import { Row, RowItem } from '@/components/ui/row'
import { List, ListItem, ListHeader, ListEmpty } from '@/components/ui/list'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/ui/list')({ component: ListPage })

interface Member {
  id: string
  name: string
  email: string
  status: 'active' | 'away' | 'offline'
}

const mockMembers: Member[] = [
  { id: 'alice', name: 'Alice Johnson', email: 'alice@example.com', status: 'active' },
  { id: 'bob', name: 'Bob Smith', email: 'bob@example.com', status: 'away' },
  { id: 'carol', name: 'Carol Williams', email: 'carol@example.com', status: 'offline' },
  { id: 'dan', name: 'Dan Park', email: 'dan@example.com', status: 'active' },
]

const code = `import { useQuery } from "@tanstack/react-query"
import { List, ListItem, ListHeader } from "@/components/ui/list"

const membersQuery = useQuery<Member[]>({
  queryKey: ["members"],
  queryFn: () => fetch("/api/members").then((r) => r.json()),
})

<List query={membersQuery} skeletonCount={4} emptyText="No members yet">
  {(member) => (
    <ListItem key={member.id} value={member.id}>
      <div className="flex-1">
        <span className="font-medium">{member.name}</span>
        <small className="block text-muted-foreground">{member.email}</small>
      </div>
      <Badge variant={member.status === "active" ? "success" : "warning"}>
        {member.status}
      </Badge>
    </ListItem>
  )}
</List>

// Static usage still works:
<List>
  <ListHeader>Team</ListHeader>
  <ListItem>...</ListItem>
  <ListEmpty>No items.</ListEmpty>
</List>`

function ListPage() {
  const [selected, setSelected] = useState('alice')
  const [errorMode, setErrorMode] = useState(false)

  const membersQuery = useQuery<Member[]>({
    queryKey: ['list-demo-members', errorMode],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 1000))
      if (errorMode) throw new Error('Could not load members')
      return mockMembers
    },
  })

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 p-8">
      <h1 className="text-2xl font-bold">List</h1>
      <InstallCommand />
      <Row>
        <RowItem main>
          <div className="flex flex-col gap-6 rounded-xl border border-border bg-background p-6">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-muted-foreground">
                  TanStack-Query bound
                </h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => membersQuery.refetch()}
                  >
                    Refresh
                  </Button>
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => setErrorMode((v) => !v)}
                  >
                    {errorMode ? 'Stop erroring' : 'Force error'}
                  </Button>
                </div>
              </div>
              <div className="overflow-hidden rounded-xl border border-border">
                <List<Member>
                  query={membersQuery}
                  skeletonCount={4}
                  emptyText="No members yet"
                >
                  {(m) => (
                    <ListItem key={m.id}>
                      <div className="flex-1">
                        <span className="font-medium">{m.name}</span>
                        <small className="block text-muted-foreground">
                          {m.email}
                        </small>
                      </div>
                      <Badge
                        variant={
                          m.status === 'active'
                            ? 'success'
                            : m.status === 'away'
                              ? 'warning'
                              : 'danger'
                        }
                        square
                        size="sm"
                      >
                        {m.status}
                      </Badge>
                    </ListItem>
                  )}
                </List>
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                Static — selectable ({selected})
              </h3>
              <div className="overflow-hidden rounded-xl border border-border">
                <List value={selected} onValueChange={setSelected}>
                  <ListHeader>Select a member</ListHeader>
                  <ListItem value="alice">
                    <div className="flex-1">
                      <span className="font-medium">Alice Johnson</span>
                      <small className="block text-muted-foreground">Engineering</small>
                    </div>
                  </ListItem>
                  <ListItem value="bob">
                    <div className="flex-1">
                      <span className="font-medium">Bob Smith</span>
                      <small className="block text-muted-foreground">Design</small>
                    </div>
                  </ListItem>
                  <ListItem value="carol">
                    <div className="flex-1">
                      <span className="font-medium">Carol Williams</span>
                      <small className="block text-muted-foreground">Product</small>
                    </div>
                  </ListItem>
                </List>
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                Empty state
              </h3>
              <div className="overflow-hidden rounded-xl border border-border">
                <List>
                  <ListHeader>Notifications</ListHeader>
                  <ListEmpty>No notifications yet.</ListEmpty>
                </List>
              </div>
            </div>
          </div>
        </RowItem>
        <RowItem>
          <CodeBlock filename="list.tsx" content={code} />
        </RowItem>
      </Row>
    </div>
  )
}
