import { RequireAuth } from '@/components/auth'
import { ItemTable } from '@/layouts/item-table'

export default function Saved() {
  return <ItemTable title="Saved" action={{ type: 'api/listSavedItems' }} />
}

export function Component() {
  return (
    <RequireAuth>
      <Saved />
    </RequireAuth>
  )
}
