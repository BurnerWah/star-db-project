import { TypographyH2 } from '@/components/typography'
import { ItemTable } from '@/layouts/item-table'

export default function Listing() {
  return (
    <div>
      <TypographyH2>Listing</TypographyH2>
      <ItemTable action={{ type: 'listItems/fetch' }} />
    </div>
  )
}

// For lazy-loading
export const Component = Listing
