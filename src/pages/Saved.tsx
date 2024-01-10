import { RequireAuth } from '@/components/auth'
import { TypographyH2 } from '@/components/typography'
import { ItemTable } from '@/layouts/item-table'

export default function Saved() {
  return (
    <div>
      <TypographyH2>Listing</TypographyH2>
      <ItemTable action={{ type: 'api/listSavedItems' }} />
    </div>
  )
}

export function Component() {
  return (
    <RequireAuth>
      <Saved />
    </RequireAuth>
  )
}
