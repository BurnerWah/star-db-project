import ItemTable from '@/components/ItemTable'
import { RequireAuth } from '@/components/auth'
import { TypographyH2 } from '@/components/typography'

export default function Saved() {
  return (
    <div className="container">
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
