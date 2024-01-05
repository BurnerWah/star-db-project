import { TypographyH2 } from '@/components/typography'
import ItemList from '../components/ItemList'

export default function Listing() {
  return (
    <div className="container">
      <TypographyH2>Listing</TypographyH2>
      <ItemList action={{ type: 'listItems/fetch' }} />
    </div>
  )
}

// For lazy-loading
export const Component = Listing
