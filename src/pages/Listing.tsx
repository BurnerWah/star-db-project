import { TypographyH2 } from '@/components/typography'
import ItemTable from '../components/ItemTable'

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
