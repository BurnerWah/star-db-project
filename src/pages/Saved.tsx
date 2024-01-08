import ItemTable from '@/components/ItemTable'
import { TypographyH2 } from '@/components/typography'

export default function Saved() {
  return (
    <div className="container">
      <TypographyH2>Listing</TypographyH2>
      <ItemTable action={{ type: 'api/listSavedItems' }} />
    </div>
  )
}
