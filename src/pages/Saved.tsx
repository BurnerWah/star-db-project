import { TypographyH2 } from '@/components/typography'
import ItemList from '../components/ItemList'

export default function Saved() {
  return (
    <div className="container">
      <TypographyH2>Listing</TypographyH2>
      <ItemList action={{ type: 'api/listSavedItems' }} />
    </div>
  )
}
