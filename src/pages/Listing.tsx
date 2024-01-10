import { ItemTable } from '@/layouts/item-table'

export default function Listing() {
  return <ItemTable title="Listing" action={{ type: 'listItems/fetch' }} />
}

// For lazy-loading
export const Component = Listing
